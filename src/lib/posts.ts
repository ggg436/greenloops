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
  orderBy, 
  serverTimestamp,
  increment, 
  arrayUnion, 
  arrayRemove,
  Timestamp,
  DocumentData,
  writeBatch
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { fileToBase64 } from './storage';

export interface PostComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date | Timestamp;
  likes: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date | Timestamp;
  likes: number;
  likedBy: string[]; // Array of user IDs who liked the post
  comments: number;
  shares: number;
  hashtags?: string[];
  imageUrl?: string; // Optional image URL
}

// Convert Firestore document to Post interface
export const postConverter = {
  toFirestore(post: Post): DocumentData {
    return {
      authorId: post.authorId,
      authorName: post.authorName,
      authorHandle: post.authorHandle,
      authorAvatar: post.authorAvatar,
      content: post.content,
      createdAt: post.createdAt,
      likes: post.likes,
      likedBy: post.likedBy,
      comments: post.comments,
      shares: post.shares,
      hashtags: post.hashtags || [],
      imageUrl: post.imageUrl || null
    };
  },
  fromFirestore(snapshot: any, options: any): Post {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      authorId: data.authorId,
      authorName: data.authorName,
      authorHandle: data.authorHandle,
      authorAvatar: data.authorAvatar,
      content: data.content,
      createdAt: data.createdAt,
      likes: data.likes,
      likedBy: data.likedBy || [],
      comments: data.comments,
      shares: data.shares,
      hashtags: data.hashtags || [],
      imageUrl: data.imageUrl || null
    };
  }
};

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        likedBy: data.likedBy || [],
        imageUrl: data.imageUrl || null
      } as Post;
    });
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

// Get a post by ID
export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        likedBy: data.likedBy || [],
        imageUrl: data.imageUrl || null
      } as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting post:", error);
    throw error;
  }
};

// Create a new post
export const createPost = async (
  postData: Omit<Post, 'id' | 'authorId' | 'createdAt' | 'likes' | 'comments' | 'shares' | 'likedBy'>,
  imageFile?: File
): Promise<string> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    
    // Extract hashtags from the content
    const hashtagRegex = /#(\w+)/g;
    const hashtags = [];
    let match;
    while ((match = hashtagRegex.exec(postData.content)) !== null) {
      hashtags.push(match[1]);
    }
    
    // Convert image to base64 if provided
    let imageUrl = null;
    if (imageFile) {
      console.log(`Converting image to base64: ${imageFile.name} (${imageFile.size} bytes)`);
      try {
        imageUrl = await fileToBase64(imageFile);
        console.log('Image successfully converted to base64');
      } catch (error) {
        console.error('Error converting image to base64:', error);
        throw new Error('Failed to process the image');
      }
    }
    
    console.log('Creating post with' + (imageUrl ? '' : 'out') + ' image');
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      authorId: user.uid,
      createdAt: serverTimestamp(),
      likes: 0,
      likedBy: [],
      comments: 0,
      shares: 0,
      hashtags: hashtags.length > 0 ? hashtags : postData.hashtags || [],
      imageUrl: imageUrl
    });
    
    console.log('Post created successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Like/Unlike a post
export const toggleLike = async (postId: string): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (!postSnap.exists()) throw new Error("Post not found");
    
    const post = postSnap.data();
    const likedBy = post.likedBy || [];
    const isLiked = likedBy.includes(user.uid);
    
    if (isLiked) {
      // Unlike the post
      await updateDoc(postRef, {
        likes: increment(-1),
        likedBy: arrayRemove(user.uid)
      });
      return false;
    } else {
      // Like the post
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(user.uid)
      });
      return true;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

// Add a comment to a post
export const addComment = async (postId: string, content: string): Promise<string> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    
    // Create the comment
    const commentRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
      authorId: user.uid,
      authorName: user.displayName || 'Anonymous',
      authorAvatar: user.photoURL || '',
      content,
      createdAt: serverTimestamp(),
      likes: 0
    });
    
    // Increment the comment count on the post
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      comments: increment(1)
    });
    
    return commentRef.id;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Get comments for a post
export const getComments = async (postId: string): Promise<PostComment[]> => {
  try {
    const q = query(
      collection(db, 'posts', postId, 'comments'),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date()
      } as PostComment;
    });
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
}; 

// Delete a post
export const deletePost = async (postId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (!postSnap.exists()) {
      throw new Error("Post not found");
    }
    
    const post = postSnap.data();
    
    // Verify owner
    if (post.authorId !== user.uid) {
      throw new Error("You don't have permission to delete this post");
    }
    
    // Delete comments subcollection first
    const commentsQuery = query(collection(db, 'posts', postId, 'comments'));
    const commentsSnapshot = await getDocs(commentsQuery);
    
    const batch = writeBatch(db);
    commentsSnapshot.forEach((commentDoc) => {
      batch.delete(commentDoc.ref);
    });
    
    // Delete the post document
    batch.delete(postRef);
    await batch.commit();
    
    console.log(`Post ${postId} and its comments deleted successfully`);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}; 