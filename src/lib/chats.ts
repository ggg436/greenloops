import { 
  collection,
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  addDoc,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile, getUserProfile } from './users';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderPhotoURL: string;
  text: string;
  timestamp: Date | Timestamp;
}

export interface Chat {
  id: string;
  participants: string[];
  participantNames: { [userId: string]: string };
  participantPhotos: { [userId: string]: string };
  lastMessage?: string;
  lastMessageTime?: Date | Timestamp;
  lastMessageSenderId?: string;
  unreadCount: { [userId: string]: number };
  createdAt: Date | Timestamp | any;
  updatedAt: Date | Timestamp | any;
}

// Get all registered users (excluding current user)
export const getAllUsers = async (): Promise<UserProfile[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("No current user found");
      return [];
    }

    console.log("Fetching all users, current user:", currentUser.uid);
    const usersRef = collection(db, 'users');
    // Remove orderBy to avoid issues with missing displayName fields
    const querySnapshot = await getDocs(usersRef);
    
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const userId = doc.id; // Use document ID as user ID
      
      console.log("Found user:", userId, data.displayName);
      
      // Exclude current user
      if (userId !== currentUser.uid) {
        users.push({
          id: userId,
          displayName: data.displayName || 'Anonymous',
          photoURL: data.photoURL || '/placeholder.svg',
          handle: data.handle || `@${data.displayName?.toLowerCase().replace(/\s/g, '') || 'anonymous'}`,
          userType: data.userType || 'user',
          followers: data.followers || [],
          following: data.following || [],
          followersCount: data.followersCount || 0,
          followingCount: data.followingCount || 0,
          coffeePoints: data.coffeePoints || 0
        });
      }
    });
    
    console.log("Total users found:", users.length);
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
};

// Get or create a chat between two users
export const getOrCreateChat = async (otherUserId: string): Promise<Chat | null> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("No current user found for creating chat");
      return null;
    }

    console.log("Creating/getting chat between:", currentUser.uid, "and", otherUserId);

    // Check if chat already exists
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUser.uid)
    );
    
    const querySnapshot = await getDocs(q);
    let existingChat: Chat | null = null;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participants.includes(otherUserId)) {
        console.log("Found existing chat:", doc.id);
        existingChat = {
          id: doc.id,
          participants: data.participants,
          participantNames: data.participantNames || {},
          participantPhotos: data.participantPhotos || {},
          lastMessage: data.lastMessage,
          lastMessageTime: data.lastMessageTime,
          lastMessageSenderId: data.lastMessageSenderId,
          unreadCount: data.unreadCount || {},
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      }
    });

    if (existingChat) {
      return existingChat;
    }

    console.log("No existing chat found, creating new one");

    // Create new chat
    const currentUserProfile = await getUserProfile(currentUser.uid);
    const otherUserProfile = await getUserProfile(otherUserId);
    
    if (!currentUserProfile || !otherUserProfile) {
      console.log("Failed to get user profiles:", { currentUserProfile, otherUserProfile });
      return null;
    }

    const newChatData = {
      participants: [currentUser.uid, otherUserId],
      participantNames: {
        [currentUser.uid]: currentUserProfile.displayName,
        [otherUserId]: otherUserProfile.displayName
      },
      participantPhotos: {
        [currentUser.uid]: currentUserProfile.photoURL,
        [otherUserId]: otherUserProfile.photoURL
      },
      unreadCount: {
        [currentUser.uid]: 0,
        [otherUserId]: 0
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    console.log("Creating new chat with data:", newChatData);
    const docRef = await addDoc(collection(db, 'chats'), newChatData);
    console.log("New chat created with ID:", docRef.id);
    
    return {
      id: docRef.id,
      ...newChatData
    };
  } catch (error) {
    console.error("Error getting or creating chat:", error);
    return null;
  }
};

// Get all chats for current user
export const getUserChats = async (): Promise<Chat[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return [];

    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUser.uid)
      // Removed orderBy to avoid issues with missing updatedAt fields
    );
    
    const querySnapshot = await getDocs(q);
    const chats: Chat[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      chats.push({
        id: doc.id,
        participants: data.participants,
        participantNames: data.participantNames || {},
        participantPhotos: data.participantPhotos || {},
        lastMessage: data.lastMessage,
        lastMessageTime: data.lastMessageTime,
        lastMessageSenderId: data.lastMessageSenderId,
        unreadCount: data.unreadCount || {},
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    });
    
    // Sort chats by updatedAt in memory instead
    chats.sort((a, b) => {
      const aTime = a.updatedAt instanceof Date ? a.updatedAt.getTime() : 
                   a.updatedAt?.toDate ? a.updatedAt.toDate().getTime() : 0;
      const bTime = b.updatedAt instanceof Date ? b.updatedAt.getTime() : 
                   b.updatedAt?.toDate ? b.updatedAt.toDate().getTime() : 0;
      return bTime - aTime;
    });
    
    return chats;
  } catch (error) {
    console.error("Error getting user chats:", error);
    return [];
  }
};

// Send a message
export const sendMessage = async (chatId: string, text: string): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("No current user found for sending message");
      return false;
    }

    console.log("Sending message to chat:", chatId, "Text:", text);
    
    const currentUserProfile = await getUserProfile(currentUser.uid);
    if (!currentUserProfile) {
      console.log("No user profile found for current user");
      return false;
    }

    // Add message to chat
    const messageData = {
      chatId,
      senderId: currentUser.uid,
      senderName: currentUserProfile.displayName,
      senderPhotoURL: currentUserProfile.photoURL,
      text,
      timestamp: serverTimestamp()
    };

    console.log("Adding message to Firestore:", messageData);
    const messageRef = await addDoc(collection(db, 'messages'), messageData);
    console.log("Message added successfully:", messageRef.id);

    // Update chat with last message
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      lastMessage: text,
      lastMessageTime: serverTimestamp(),
      lastMessageSenderId: currentUser.uid,
      updatedAt: serverTimestamp()
    });
    console.log("Chat updated successfully");

    return true;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
};

// Subscribe to messages in real-time
export const subscribeToMessages = (
  chatId: string,
  onMessagesChange: (messages: ChatMessage[]) => void
) => {
  const messagesRef = collection(db, 'messages');
  const q = query(
    messagesRef,
    where('chatId', '==', chatId)
    // Removed orderBy to avoid issues with missing timestamp fields
  );
  
  return onSnapshot(q, (snapshot) => {
    const messages: ChatMessage[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        senderId: data.senderId,
        senderName: data.senderName,
        senderPhotoURL: data.senderPhotoURL,
        text: data.text,
        timestamp: data.timestamp
      });
    });
    
    // Sort messages by timestamp in memory instead
    messages.sort((a, b) => {
      const aTime = a.timestamp instanceof Date ? a.timestamp.getTime() : 
                   a.timestamp?.toDate ? a.timestamp.toDate().getTime() : 0;
      const bTime = b.timestamp instanceof Date ? b.timestamp.getTime() : 
                   b.timestamp?.toDate ? b.timestamp.toDate().getTime() : 0;
      return aTime - bTime;
    });
    
    onMessagesChange(messages);
  });
};

// Subscribe to user chats in real-time
export const subscribeToUserChats = (
  onChatsChange: (chats: Chat[]) => void
) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return () => {};

  const chatsRef = collection(db, 'chats');
  const q = query(
    chatsRef,
    where('participants', 'array-contains', currentUser.uid)
    // Removed orderBy to avoid issues with missing updatedAt fields
  );
  
  return onSnapshot(q, (snapshot) => {
    const chats: Chat[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      chats.push({
        id: doc.id,
        participants: data.participants,
        participantNames: data.participantNames || {},
        participantPhotos: data.participantPhotos || {},
        lastMessage: data.lastMessage,
        lastMessageTime: data.lastMessageTime,
        lastMessageSenderId: data.lastMessageSenderId,
        unreadCount: data.unreadCount || {},
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    });
    
    // Sort chats by updatedAt in memory instead
    chats.sort((a, b) => {
      const aTime = a.updatedAt instanceof Date ? a.updatedAt.getTime() : 
                   a.updatedAt?.toDate ? a.updatedAt.toDate().getTime() : 0;
      const bTime = b.updatedAt instanceof Date ? b.updatedAt.getTime() : 
                   b.updatedAt?.toDate ? b.updatedAt.toDate().getTime() : 0;
      return bTime - aTime;
    });
    
    onChatsChange(chats);
  });
};

// Mark messages as read
export const markChatAsRead = async (chatId: string): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      [`unreadCount.${currentUser.uid}`]: 0
    });

    return true;
  } catch (error) {
    console.error("Error marking chat as read:", error);
    return false;
  }
};

// Get other participant in a chat
export const getOtherParticipant = (chat: Chat): string | null => {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  
  return chat.participants.find(participant => participant !== currentUser.uid) || null;
};

// Format relative time
export const formatRelativeTime = (timestamp: Date | Timestamp): string => {
  const now = new Date();
  const messageTime = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
  return `${Math.floor(diffInMinutes / 1440)}d`;
}; 