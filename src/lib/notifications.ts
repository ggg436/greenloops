import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';

export interface Notification {
  id: string;
  recipientId: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  type: 'product_purchase' | 'product_interest' | 'product_exchange' | 'product_giveaway' | 'general';
  title: string;
  message: string;
  productId?: string;
  productTitle?: string;
  read: boolean;
  createdAt: any;
  actionUrl?: string;
}

// Send a notification to a user
export const sendNotification = async (notificationData: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<string> => {
  try {
    console.log('Sending notification:', notificationData);
    
    const notification = {
      ...notificationData,
      read: false,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'notifications'), notification);
    console.log('Notification sent successfully with ID:', docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

// Send product purchase notification
export const sendProductPurchaseNotification = async (
  productId: string,
  productTitle: string,
  sellerId: string,
  buyerId: string,
  buyerName: string,
  buyerPhoto?: string,
  listingType: 'sell' | 'giveaway' | 'exchange' = 'sell'
): Promise<string> => {
  try {
    let actionVerb = 'buy';
    let message = '';
    
    switch (listingType) {
      case 'sell':
        actionVerb = 'buy';
        message = `${buyerName} wants to buy your product "${productTitle}"`;
        break;
      case 'giveaway':
        actionVerb = 'take';
        message = `${buyerName} wants to take your product "${productTitle}"`;
        break;
      case 'exchange':
        actionVerb = 'exchange';
        message = `${buyerName} wants to exchange for your product "${productTitle}"`;
        break;
    }
    
    const notification = {
      recipientId: sellerId,
      senderId: buyerId,
      senderName: buyerName,
      senderPhoto: buyerPhoto,
      type: 'product_purchase' as const,
      title: 'Product Interest',
      message: message,
      productId: productId,
      productTitle: productTitle,
      actionUrl: `/dashboard/marketplace/${productId}`
    };
    
    return await sendNotification(notification);
  } catch (error) {
    console.error('Error sending product purchase notification:', error);
    throw error;
  }
};

// Get notifications for a user
export const getUserNotifications = (
  userId: string,
  onNotifications: (notifications: Notification[]) => void
) => {
  const q = query(
    collection(db, 'notifications'),
    where('recipientId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifications: Notification[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      notifications.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date()
      } as Notification);
    });
    
    onNotifications(notifications);
  });
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Mark all notifications as read for a user
export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  try {
    // Get all unread notifications for the user
    const q = query(
      collection(db, 'notifications'),
      where('recipientId', '==', userId),
      where('read', '==', false)
    );
    
    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map(doc => 
      updateDoc(doc.ref, { read: true })
    );
    
    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Get unread notification count
export const getUnreadNotificationCount = (
  userId: string,
  onCount: (count: number) => void
) => {
  const q = query(
    collection(db, 'notifications'),
    where('recipientId', '==', userId),
    where('read', '==', false)
  );
  
  return onSnapshot(q, (snapshot) => {
    onCount(snapshot.size);
  });
}; 