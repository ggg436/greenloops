import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { fileToBase64, uploadFile, resizeImageFile } from './storage';

export interface ProductComment {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  comment: string;
  rating: number;
  createdAt: Date | any;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;  // Optional original price for discount calculation
  category: string;
  condition: string;
  quantity: number;
  features: string[];
  specifications: string | Record<string, string>;  // Allow for both string and object format
  images: string[];
  coverImage: string;
  sellerId: string;
  sellerName: string;
  sellerPhoto?: string;
  createdAt: Date | any;
  updatedAt: Date | any;
  rating: number;
  reviews: number;
  listingType?: 'sell' | 'giveaway' | 'exchange';  // New field for listing type
  exchangeWith?: string;  // New field for exchange items
  comments: ProductComment[];
  averageRating: number;
  totalRatings: number;
}

// Upload and optimize product images to Firebase Storage
export const uploadProductImages = async (files: File[]): Promise<string[]> => {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const uid = auth.currentUser.uid;
  const uploaded: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Resize to speed up upload and viewing
    const optimized = await resizeImageFile(file, { maxDimension: 1280, outputType: 'image/jpeg', quality: 0.8 });
    const { url } = await uploadFile(optimized, `products/${uid}/${Date.now()}-${i}-${optimized.name}`);
    uploaded.push(url);
  }

  return uploaded;
}

// Convert product images to base64
export const convertImagesToBase64 = async (files: File[]): Promise<string[]> => {
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    console.log(`Converting ${files.length} images to base64`);
    const convertPromises = files.map(async (file) => {
      // Check file size - limit to 1MB
      if (file.size > 1 * 1024 * 1024) {
        throw new Error(`File ${file.name} is too large (max 1MB)`);
      }
      return fileToBase64(file);
    });
    
    const base64Images = await Promise.all(convertPromises);
    console.log('All images converted to base64 successfully');
    return base64Images;
  } catch (error) {
    console.error('Error converting images to base64:', error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'sellerId' | 'sellerName' | 'sellerPhoto'>): Promise<string> => {
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    console.log('Adding product for user:', auth.currentUser.uid, 'with data:', productData);
    console.log('User details:', {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    });
    
    const productDataToSave = {
      ...productData,
      sellerId: auth.currentUser.uid,
      sellerName: auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'Anonymous',
      sellerPhoto: auth.currentUser.photoURL || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    console.log('Saving product data to Firestore:', productDataToSave);
    
    // Verify we're still authenticated before saving
    if (!auth.currentUser) {
      throw new Error("User authentication lost during product creation");
    }
    
    const docRef = await addDoc(collection(db, 'products'), productDataToSave);
    
    console.log('Product added successfully with ID:', docRef.id);
    
    // Verify the product was saved by fetching it back
    try {
      const savedProduct = await getDoc(docRef);
      if (savedProduct.exists()) {
        console.log('Product verified in Firestore:', savedProduct.data());
      } else {
        console.error('Product was not saved properly');
      }
    } catch (verifyError) {
      console.error('Error verifying saved product:', verifyError);
    }
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Get a product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Get all products with pagination
export const getProducts = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData>,
  pageSize: number = 12,
  category?: string
): Promise<{
  products: Product[];
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
}> => {
  try {
    console.log('Getting products with pageSize:', pageSize, 'category:', category, 'lastDoc:', lastDoc ? 'exists' : 'none');
    
    let q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    
    if (category) {
      q = query(
        collection(db, 'products'),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
    }
    
    if (lastDoc) {
      q = query(
        collection(db, 'products'),
        category ? where('category', '==', category) : null as any,
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }
    
    console.log('Query created:', q);
    
    const querySnapshot = await getDocs(q);
    console.log('Products snapshot received with', querySnapshot.docs.length, 'documents');
    
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Processing product document:', doc.id, 'with data:', data);
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Product);
    });
    
    const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    console.log('Returning', products.length, 'products');
    
    return {
      products,
      lastDoc: newLastDoc
    };
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Search products by title or description
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    // Firebase doesn't support full-text search directly
    // This is a simple implementation that fetches all products and filters client-side
    // For a production app, consider using Algolia or similar search service
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const title = data.title.toLowerCase();
      const description = data.description.toLowerCase();
      const term = searchTerm.toLowerCase();
      
      if (title.includes(term) || description.includes(term)) {
        products.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Product);
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId: string, productData: Partial<Product>): Promise<void> => {
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      throw new Error("Product not found");
    }
    
    const product = productSnap.data();
    
    // Verify owner
    if (product.sellerId !== auth.currentUser.uid) {
      throw new Error("You don't have permission to update this product");
    }
    
    await updateDoc(productRef, {
      ...productData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId: string): Promise<void> => {
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      throw new Error("Product not found");
    }
    
    const product = productSnap.data();
    
    // Verify owner
    if (product.sellerId !== auth.currentUser.uid) {
      throw new Error("You don't have permission to delete this product");
    }
    
    // Delete the product document
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get products by seller ID
export const getProductsByUserId = async (userId: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('sellerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Error getting user products:', error);
    throw error;
  }
}; 

// Debug function to check all products in database
export const debugGetAllProducts = async (): Promise<Product[]> => {
  try {
    console.log('Debug: Getting all products from database...');
    const querySnapshot = await getDocs(collection(db, 'products'));
    console.log('Debug: Found', querySnapshot.docs.length, 'products in database');
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Debug: Product document:', doc.id, data);
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Product);
    });
    
    console.log('Debug: Processed products:', products);
    return products;
  } catch (error) {
    console.error('Debug: Error getting all products:', error);
    throw error;
  }
};

// Simple function to manually fetch products (for debugging)
export const manuallyFetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Manually fetching products from database...');
    const querySnapshot = await getDocs(collection(db, 'products'));
    console.log('Manual fetch: Found', querySnapshot.docs.length, 'products');
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Manual fetch: Product', doc.id, 'by', data.sellerName, 'title:', data.title);
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Manual fetch error:', error);
    throw error;
  }
}; 

// Add a comment to a product
export const addProductComment = async (
  productId: string, 
  comment: string, 
  rating: number
): Promise<void> => {
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    const commentData: Omit<ProductComment, 'id'> = {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'Anonymous',
      userPhoto: auth.currentUser.photoURL || '',
      comment,
      rating,
      createdAt: serverTimestamp()
    };

    // Add comment to product's comments subcollection
    await addDoc(collection(db, 'products', productId, 'comments'), commentData);
    
    // Update product's average rating and total ratings
    await updateProductRating(productId);
    
    console.log('Comment added successfully to product:', productId);
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Update product's average rating and total ratings
export const updateProductRating = async (productId: string): Promise<void> => {
  try {
    const commentsSnapshot = await getDocs(collection(db, 'products', productId, 'comments'));
    const comments = commentsSnapshot.docs.map(doc => doc.data() as ProductComment);
    
    if (comments.length === 0) {
      // No comments, set default values
      await updateDoc(doc(db, 'products', productId), {
        averageRating: 0,
        totalRatings: 0,
        updatedAt: serverTimestamp()
      });
      return;
    }
    
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / comments.length;
    
    await updateDoc(doc(db, 'products', productId), {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      totalRatings: comments.length,
      updatedAt: serverTimestamp()
    });
    
    console.log('Product rating updated:', { averageRating, totalRatings: comments.length });
  } catch (error) {
    console.error('Error updating product rating:', error);
    throw error;
  }
};

// Get comments for a product
export const getProductComments = async (productId: string): Promise<ProductComment[]> => {
  try {
    const commentsSnapshot = await getDocs(
      query(
        collection(db, 'products', productId, 'comments'),
        orderBy('createdAt', 'desc')
      )
    );
    
    const comments = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProductComment[];
    
    return comments;
  } catch (error) {
    console.error('Error getting product comments:', error);
    throw error;
  }
};

// Check if user has already commented on a product
export const hasUserCommented = async (productId: string): Promise<boolean> => {
  if (!auth.currentUser) return false;
  
  try {
    const commentsSnapshot = await getDocs(
      query(
        collection(db, 'products', productId, 'comments'),
        where('userId', '==', auth.currentUser.uid)
      )
    );
    
    return !commentsSnapshot.empty;
  } catch (error) {
    console.error('Error checking if user has commented:', error);
    return false;
  }
};

// Get user's existing comment on a product
export const getUserComment = async (productId: string): Promise<ProductComment | null> => {
  if (!auth.currentUser) return null;
  
  try {
    const commentsSnapshot = await getDocs(
      query(
        collection(db, 'products', productId, 'comments'),
        where('userId', '==', auth.currentUser.uid)
      )
    );
    
    if (commentsSnapshot.empty) return null;
    
    const commentDoc = commentsSnapshot.docs[0];
    return {
      id: commentDoc.id,
      ...commentDoc.data()
    } as ProductComment;
  } catch (error) {
    console.error('Error getting user comment:', error);
    return null;
  }
}; 