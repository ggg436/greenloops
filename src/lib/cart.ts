import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Product } from './products';
import { toast } from 'sonner';

// Cart item interface
export interface CartItem {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  price: number;
  title: string;
  coverImage: string;
  createdAt: Date | Timestamp;
}

// Get current user's cart
export const getCart = async (): Promise<CartItem[]> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const q = query(
      collection(db, 'cart'),
      where('userId', '==', user.uid)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as CartItem;
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (product: Product, quantity: number): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Prevent users from adding their own products to cart
  if (user.uid === product.sellerId) {
    throw new Error("You cannot add your own products to cart");
  }

  try {
    // Check if the item already exists in the cart
    const q = query(
      collection(db, 'cart'),
      where('userId', '==', user.uid),
      where('productId', '==', product.id)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Update quantity
      const cartItem = querySnapshot.docs[0];
      const currentQuantity = cartItem.data().quantity;
      
      await updateDoc(doc(db, 'cart', cartItem.id), {
        quantity: currentQuantity + quantity
      });
      
      return cartItem.id;
    } else {
      // Add new item
      const cartData = {
        productId: product.id,
        userId: user.uid,
        quantity,
        price: product.price,
        title: product.title,
        coverImage: product.coverImage || 'https://placehold.co/400x400?text=No+Image',
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'cart'), cartData);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId: string, quantity: number): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const cartRef = doc(db, 'cart', cartItemId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      throw new Error("Cart item not found");
    }
    
    // Verify owner
    if (cartSnap.data().userId !== user.uid) {
      throw new Error("You don't have permission to update this cart item");
    }
    
    // Update quantity
    await updateDoc(cartRef, { quantity });
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (cartItemId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const cartRef = doc(db, 'cart', cartItemId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      throw new Error("Cart item not found");
    }
    
    // Verify owner
    if (cartSnap.data().userId !== user.uid) {
      throw new Error("You don't have permission to remove this item");
    }
    
    await deleteDoc(cartRef);
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

// Get cart count for UI badges
export const getCartCount = async (): Promise<number> => {
  try {
    const cart = await getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Error getting cart count:", error);
    return 0;
  }
};

// Clear the entire cart
export const clearCart = async (): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const q = query(
      collection(db, 'cart'),
      where('userId', '==', user.uid)
    );
    const querySnapshot = await getDocs(q);
    
    const deletePromises = querySnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}; 