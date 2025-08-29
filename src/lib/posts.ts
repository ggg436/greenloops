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
	writeBatch,
	limit as fsLimit,
	startAfter,
	onSnapshot,
	QueryDocumentSnapshot
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { resizeImageFile } from './storage';

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
};

// Helper function to resize image
const resizeImage = async (file: File, maxDimension: number = 800): Promise<File> => {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();
		
		img.onload = () => {
			let { width, height } = img;
			
			// Calculate new dimensions
			if (width > height) {
				if (width > maxDimension) {
					height = (height * maxDimension) / width;
					width = maxDimension;
				}
			} else {
				if (height > maxDimension) {
					width = (width * maxDimension) / height;
					height = maxDimension;
				}
			}
			
			canvas.width = width;
			canvas.height = height;
			
			// Draw resized image
			ctx?.drawImage(img, 0, 0, width, height);
			
			// Convert to blob
			canvas.toBlob((blob) => {
				if (blob) {
					const resizedFile = new File([blob], file.name, {
						type: 'image/jpeg',
						lastModified: Date.now()
					});
					resolve(resizedFile);
				} else {
					reject(new Error('Failed to resize image'));
				}
			}, 'image/jpeg', 0.8);
		};
		
		img.onerror = reject;
		img.src = URL.createObjectURL(file);
	});
};

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

// Real-time subscribe to recent posts
export const subscribeToRecentPosts = (
	onPosts: (posts: Post[], lastDoc?: QueryDocumentSnapshot<DocumentData>) => void,
	pageSize: number = 25
) => {
	console.log('Subscribing to recent posts with page size:', pageSize);
	
	const q = query(
		collection(db, 'posts'),
		orderBy('createdAt', 'desc'),
		fsLimit(pageSize)
	);
	
	console.log('Query created:', q);
	
	return onSnapshot(q, (snapshot) => {
		console.log('Posts snapshot received with', snapshot.docs.length, 'documents');
		console.log('Snapshot metadata:', {
			empty: snapshot.empty,
			size: snapshot.size,
			docs: snapshot.docs.map(doc => ({ id: doc.id, exists: doc.exists() }))
		});
		
		const posts: Post[] = snapshot.docs.map((docSnap) => {
			const data = docSnap.data();
			console.log('Processing post document:', docSnap.id, 'with data:', data);
			return {
				id: docSnap.id,
				...data,
				createdAt: data.createdAt?.toDate() || new Date(),
				likedBy: data.likedBy || [],
				imageUrl: data.imageUrl || null
			} as Post;
		});
		
		const last = snapshot.docs[snapshot.docs.length - 1];
		console.log('Calling onPosts callback with', posts.length, 'posts');
		console.log('Posts to be displayed:', posts.map(p => ({ id: p.id, authorName: p.authorName, content: p.content.substring(0, 50) })));
		onPosts(posts, last);
	}, (error) => {
		console.error('Error in posts subscription:', error);
		console.error('Error details:', {
			code: error.code,
			message: error.message,
			stack: error.stack
		});
	});
};

// Get all posts
export const getPosts = async (pageSize: number = 25): Promise<Post[]> => {
	try {
		const q = query(
			collection(db, 'posts'),
			orderBy('createdAt', 'desc'),
			fsLimit(pageSize)
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
		
		console.log('Creating post for user:', user.uid, 'with data:', postData);
		console.log('User details:', {
			uid: user.uid,
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL
		});
		
		// Extract hashtags from the content
		const hashtagRegex = /#(\w+)/g;
		const hashtags = [];
		let match;
		while ((match = hashtagRegex.exec(postData.content)) !== null) {
			hashtags.push(match[1]);
		}
		
		// Upload image to Firebase Storage if provided
		let imageUrl = null;
		if (imageFile) {
			try {
				console.log('Processing image for post...');
				// Resize image first
				const resizedFile = await resizeImage(imageFile, 800);
				// Convert resized image to base64
				imageUrl = await fileToBase64(resizedFile);
				console.log('Image processed successfully, size:', imageUrl.length);
			} catch (error) {
				console.error('Error processing image:', error);
				throw new Error('Failed to process the image. Please try with a smaller image or without an image.');
			}
		}
		
		const postDataToSave = {
			...postData,
			authorId: user.uid,
			authorName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
			authorHandle: user.displayName || user.email?.split('@')[0] || 'Anonymous',
			authorAvatar: user.photoURL || '',
			createdAt: serverTimestamp(),
			likes: 0,
			likedBy: [],
			comments: 0,
			shares: 0,
			hashtags: hashtags.length > 0 ? hashtags : postData.hashtags || [],
			imageUrl: imageUrl
		};
		
		console.log('Saving post data to Firestore:', postDataToSave);
		
		// Verify we're still authenticated before saving
		if (!auth.currentUser) {
			throw new Error("User authentication lost during post creation");
		}
		
		const docRef = await addDoc(collection(db, 'posts'), postDataToSave);
		
		console.log('Post created successfully with ID:', docRef.id);
		
		// Verify the post was saved by fetching it back
		try {
			const savedPost = await getDoc(docRef);
			if (savedPost.exists()) {
				console.log('Post verified in Firestore:', savedPost.data());
			} else {
				console.error('Post was not saved properly');
			}
		} catch (verifyError) {
			console.error('Error verifying saved post:', verifyError);
		}
		
		return docRef.id;
	} catch (error) {
		console.error('Error creating post:', error);
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
		const currentLikes = Math.max(0, post.likes || 0); // Ensure likes is never negative
		const isLiked = likedBy.includes(user.uid);
		
		if (isLiked) {
			// Unlike the post
			const newLikedBy = likedBy.filter(id => id !== user.uid);
			const newLikes = Math.max(0, currentLikes - 1); // Ensure likes never goes below 0
			
			await updateDoc(postRef, {
				likes: newLikes,
				likedBy: newLikedBy
			});
			return false;
		} else {
			// Like the post
			const newLikedBy = [...likedBy, user.uid];
			const newLikes = currentLikes + 1;
			
			await updateDoc(postRef, {
				likes: newLikes,
				likedBy: newLikedBy
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

export const getMorePosts = async (
	lastDoc: QueryDocumentSnapshot<DocumentData>,
	pageSize: number = 25
): Promise<{ posts: Post[]; lastDoc?: QueryDocumentSnapshot<DocumentData> }> => {
	try {
		const q = query(
			collection(db, 'posts'),
			orderBy('createdAt', 'desc'),
			startAfter(lastDoc),
			fsLimit(pageSize)
		);
		const querySnapshot = await getDocs(q);
		const posts: Post[] = querySnapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				...data,
				createdAt: data.createdAt?.toDate() || new Date(),
				likedBy: data.likedBy || [],
				imageUrl: data.imageUrl || null
			} as Post;
		});
		const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
		return { posts, lastDoc: newLastDoc };
	} catch (error) {
		console.error('Error getting more posts:', error);
		throw error;
	}
}; 

// Debug function to check all posts in database
export const debugGetAllPosts = async (): Promise<Post[]> => {
	try {
		console.log('Debug: Getting all posts from database...');
		const querySnapshot = await getDocs(collection(db, 'posts'));
		console.log('Debug: Found', querySnapshot.docs.length, 'posts in database');
		
		const posts: Post[] = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			console.log('Debug: Post document:', doc.id, data);
			posts.push({
				id: doc.id,
				...data,
				createdAt: data.createdAt?.toDate() || new Date(),
				likedBy: data.likedBy || [],
				imageUrl: data.imageUrl || null
			} as Post);
		});
		
		console.log('Debug: Processed posts:', posts);
		return posts;
	} catch (error) {
		console.error('Debug: Error getting all posts:', error);
		throw error;
	}
};

// Simple function to manually fetch posts (for debugging)
export const manuallyFetchPosts = async (): Promise<Post[]> => {
	try {
		console.log('Manually fetching posts from database...');
		const querySnapshot = await getDocs(collection(db, 'posts'));
		console.log('Manual fetch: Found', querySnapshot.docs.length, 'posts');
		
		const posts: Post[] = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			console.log('Manual fetch: Post', doc.id, 'by', data.authorName, 'content:', data.content?.substring(0, 50));
			posts.push({
				id: doc.id,
				...data,
				createdAt: data.createdAt?.toDate() || new Date(),
				likedBy: data.likedBy || [],
				imageUrl: data.imageUrl || null
			} as Post);
		});
		
		return posts;
	} catch (error) {
		console.error('Manual fetch error:', error);
		throw error;
	}
}; 

// Fix posts with negative like counts (utility function)
export const fixNegativeLikeCounts = async () => {
	try {
		const postsRef = collection(db, 'posts');
		const q = query(postsRef, where('likes', '<', 0));
		const querySnapshot = await getDocs(q);
		
		const batch = writeBatch(db);
		let fixedCount = 0;
		
		querySnapshot.forEach((doc) => {
			const post = doc.data();
			const fixedLikes = Math.max(0, post.likes || 0);
			const fixedLikedBy = post.likedBy || [];
			
			// Only update if likes is negative
			if (post.likes < 0) {
				batch.update(doc.ref, {
					likes: fixedLikes,
					likedBy: fixedLikedBy
				});
				fixedCount++;
			}
		});
		
		if (fixedCount > 0) {
			await batch.commit();
			console.log(`Fixed ${fixedCount} posts with negative like counts`);
		}
		
		return fixedCount;
	} catch (error) {
		console.error("Error fixing negative like counts:", error);
		throw error;
	}
};

// Get posts with proper like count validation
export const getPostsWithValidLikes = async (pageSize: number = 25): Promise<Post[]> => {
	try {
		const posts = await getPosts(pageSize);
		
		// Fix any posts with negative likes in the returned data
		return posts.map(post => ({
			...post,
			likes: Math.max(0, post.likes || 0),
			likedBy: post.likedBy || []
		}));
	} catch (error) {
		console.error("Error getting posts with valid likes:", error);
		throw error;
	}
}; 

// New: Update a post
export const updatePost = async (
	postId: string,
	newText: string,
	newImageFile: File | null,
	clearImage: boolean
): Promise<void> => {
	try {
		const user = auth.currentUser;
		if (!user) throw new Error("User not authenticated");

		const postRef = doc(db, 'posts', postId);
		const postSnap = await getDoc(postRef);

		if (!postSnap.exists()) throw new Error("Post not found");

		const postData = postSnap.data();
		if (postData?.authorId !== user.uid) {
			throw new Error("Unauthorized: You can only edit your own posts.");
		}

		let updatedImageUrl: string | null = postData.imageUrl;

		if (clearImage) {
			updatedImageUrl = null;
		} else if (newImageFile) {
			console.log('Processing new image for post update...');
			const resizedFile = await resizeImage(newImageFile, 800);
			updatedImageUrl = await fileToBase64(resizedFile);
			console.log('New image processed successfully for update, size:', updatedImageUrl.length);
		}

		await updateDoc(postRef, {
			content: newText,
			imageUrl: updatedImageUrl,
			// Optionally add an 'updatedAt' field
			// updatedAt: serverTimestamp(),
		});
		console.log(`Post ${postId} updated by user ${user.uid}`);
	} catch (error) {
		console.error("Error updating post:", error);
		throw error;
	}
}; 

// New: Report a post
export const reportPost = async (
	postId: string,
	reason: string
): Promise<void> => {
	try {
		const user = auth.currentUser;
		if (!user) throw new Error("User not authenticated");

		// Check if user has already reported this post
		const reportsRef = collection(db, 'reports');
		const existingReportQuery = query(
			reportsRef,
			where('postId', '==', postId),
			where('reporterId', '==', user.uid)
		);
		const existingReport = await getDocs(existingReportQuery);

		if (!existingReport.empty) {
			throw new Error("You have already reported this post.");
		}

		// Create the report
		await addDoc(reportsRef, {
			postId,
			reporterId: user.uid,
			reporterName: user.displayName || 'Anonymous',
			reason,
			createdAt: serverTimestamp(),
			status: 'pending' // pending, reviewed, resolved
		});

		console.log(`Post ${postId} reported by user ${user.uid} for reason: ${reason}`);
	} catch (error) {
		console.error("Error reporting post:", error);
		throw error;
	}
}; 