import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp,
  DocumentData,
  DocumentReference
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { CartItem, clearCart } from './cart';

// Order status types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order item interface
export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  coverImage: string;
}

// Order interface
export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

// Shipping address interface
export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Payment method interface
export interface PaymentMethod {
  type: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  details?: {
    lastFourDigits?: string;
    cardType?: string;
    email?: string;
  };
}

// Create a new order from cart items
export const createOrder = async (
  shippingAddress: ShippingAddress,
  paymentMethod: PaymentMethod,
  cartItems: CartItem[]
): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );

    // Map cart items to order items
    const orderItems: OrderItem[] = cartItems.map(item => ({
      productId: item.productId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      coverImage: item.coverImage
    }));

    // Create order document
    const orderData = {
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      userEmail: user.email || 'No email provided',
      items: orderItems,
      totalAmount,
      status: 'pending' as OrderStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      shippingAddress,
      paymentMethod
    };

    const docRef = await addDoc(collection(db, 'orders'), orderData);
    
    // Clear the cart after successful order
    await clearCart();
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get orders for current user
export const getUserOrders = async (): Promise<Order[]> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Order;
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
};

// Get a specific order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    // Verify the order belongs to the current user
    const data = docSnap.data();
    if (data.userId !== user.uid) {
      throw new Error("You don't have permission to access this order");
    }
    
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    } as Order;
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
};

// Get order count for current user
export const getOrderCount = async (): Promise<number> => {
  try {
    const orders = await getUserOrders();
    return orders.length;
  } catch (error) {
    console.error("Error getting order count:", error);
    return 0;
  }
}; 