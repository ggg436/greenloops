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
import { fileToBase64 } from './storage';

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
export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      sellerId: auth.currentUser.uid,
      sellerName: auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'Anonymous',
      sellerPhoto: auth.currentUser.photoURL || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
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
        category ? where('category', '==', category) : null,
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }
    
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
    
    const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    
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