import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  deleteDoc, 
  query, 
  where, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Product } from './products';

// Wishlist item interface
export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  title: string;
  price: number;
  coverImage: string;
  createdAt: Date | Timestamp;
}

// Get current user's wishlist
export const getWishlist = async (): Promise<WishlistItem[]> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const q = query(
      collection(db, 'wishlist'),
      where('userId', '==', user.uid)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as WishlistItem;
    });
  } catch (error) {
    console.error("Error getting wishlist:", error);
    throw error;
  }
};

// Add item to wishlist
export const addToWishlist = async (product: Product): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Prevent users from adding their own products to wishlist
  if (user.uid === product.sellerId) {
    throw new Error("You cannot add your own products to wishlist");
  }

  try {
    // Check if the item already exists in the wishlist
    const q = query(
      collection(db, 'wishlist'),
      where('userId', '==', user.uid),
      where('productId', '==', product.id)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Item already in wishlist
      return querySnapshot.docs[0].id;
    } else {
      // Add new item
      const wishlistData = {
        productId: product.id,
        userId: user.uid,
        title: product.title,
        price: product.price,
        coverImage: product.coverImage || 'https://placehold.co/400x400?text=No+Image',
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'wishlist'), wishlistData);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (itemId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const wishlistRef = doc(db, 'wishlist', itemId);
    const wishlistSnap = await getDoc(wishlistRef);
    
    if (!wishlistSnap.exists()) {
      throw new Error("Wishlist item not found");
    }
    
    // Verify owner
    if (wishlistSnap.data().userId !== user.uid) {
      throw new Error("You don't have permission to remove this item");
    }
    
    await deleteDoc(wishlistRef);
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

// Check if product is in wishlist
export const isInWishlist = async (productId: string): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) {
    return false;
  }

  try {
    const q = query(
      collection(db, 'wishlist'),
      where('userId', '==', user.uid),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return false;
  }
};

// Toggle wishlist item (add if not exists, remove if exists)
export const toggleWishlistItem = async (product: Product): Promise<{ added: boolean }> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Prevent users from adding their own products to wishlist
  if (user.uid === product.sellerId) {
    throw new Error("You cannot add your own products to wishlist");
  }

  try {
    const q = query(
      collection(db, 'wishlist'),
      where('userId', '==', user.uid),
      where('productId', '==', product.id)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Item exists, remove it
      await deleteDoc(querySnapshot.docs[0].ref);
      return { added: false };
    } else {
      // Item doesn't exist, add it
      const wishlistData = {
        productId: product.id,
        userId: user.uid,
        title: product.title,
        price: product.price,
        coverImage: product.coverImage || 'https://placehold.co/400x400?text=No+Image',
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'wishlist'), wishlistData);
      return { added: true };
    }
  } catch (error) {
    console.error("Error toggling wishlist item:", error);
    throw error;
  }
};

// Get wishlist count for UI badges
export const getWishlistCount = async (): Promise<number> => {
  try {
    const wishlist = await getWishlist();
    return wishlist.length;
  } catch (error) {
    console.error("Error getting wishlist count:", error);
    return 0;
  }
}; 