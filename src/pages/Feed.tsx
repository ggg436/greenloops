import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Search,
  MoreHorizontal,
  Plus,
  Users,
  UserPlus,
  TrendingUp,
  Hash,
  X,
  Loader2,
  Image as ImageIcon,
  Trash2,
  MoreVertical,
  UserCheck,
  Edit,
  Flag
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuthContext } from '@/lib/AuthProvider';
import { Post as PostType, getPosts, createPost, toggleLike, addComment, deletePost, subscribeToRecentPosts, debugGetAllPosts, manuallyFetchPosts, fixNegativeLikeCounts, updatePost, reportPost } from '@/lib/posts';
import { getUserProfile, toggleFollowUser, checkIfFollowing, UserProfile, subscribeToUserProfile, getRecommendationUsers } from '@/lib/users';
import { initializeAllUserProfiles } from '@/lib/initializeUserProfiles';
import { formatDistanceToNow } from 'date-fns';
import { PostComments } from '@/components/PostComments';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
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
import { db } from '@/lib/firebase';

interface User {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  isFollowing?: boolean;
}

const mockFavorites: User[] = [
  { id: '1', name: 'Jeff Michaal', avatar: '/placeholder.svg', handle: '@jeff_michaal' },
  { id: '2', name: 'Naomi', avatar: '/placeholder.svg', handle: '@naomi' },
  { id: '3', name: 'Anya Gerald', avatar: '/placeholder.svg', handle: '@anya_gerald' },
  { id: '4', name: '3D Blender', avatar: '/placeholder.svg', handle: '@3d_blender' }
];

const mockCommunity: User[] = [
  { id: '5', name: '3D Blender', avatar: '/placeholder.svg', handle: '@3d_blender' },
  { id: '6', name: 'Logo Designer', avatar: '/placeholder.svg', handle: '@logo_designer' },
  { id: '7', name: 'Brand Designer', avatar: '/placeholder.svg', handle: '@brand_designer' },
  { id: '8', name: 'Photography', avatar: '/placeholder.svg', handle: '@photography' }
];

const mockFollowing: User[] = [
  { id: '9', name: 'Jeff Michaal', avatar: '/placeholder.svg', handle: '@jeff_michaal' },
  { id: '10', name: 'Naomi', avatar: '/placeholder.svg', handle: '@naomi' },
  { id: '11', name: 'Anya Gerald', avatar: '/placeholder.svg', handle: '@anya_gerald' },
  { id: '12', name: 'M. Benar', avatar: '/placeholder.svg', handle: '@m_benar' },
  { id: '13', name: 'Willy Wingku', avatar: '/placeholder.svg', handle: '@willy_wingku' }
];

const mockRecommendations: User[] = [
  { id: '14', name: 'Imari Usmani', avatar: '/placeholder.svg', handle: '@imari_usmani', isFollowing: false },
  { id: '15', name: 'Mado Mane', avatar: '/placeholder.svg', handle: '@mado_mane', isFollowing: false },
  { id: '16', name: 'Javier Ariffin', avatar: '/placeholder.svg', handle: '@javier_ariffin', isFollowing: false },
  { id: '17', name: 'Ismail bin Mail', avatar: '/placeholder.svg', handle: '@ismail_mail', isFollowing: false }
];

const topicTags = ['Design', 'User Experience', 'UI', 'Photography', 'Viral', 'Illustration', 'Print Design', 'Productivity'];

const Feed = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({});
  const [authorProfiles, setAuthorProfiles] = useState<Record<string, UserProfile>>({});
  const [lastDocRef, setLastDocRef] = useState<any>(null);
  const authorUnsubsRef = useRef<Map<string, () => void>>(new Map());
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showCommentInputs, setShowCommentInputs] = useState<Record<string, boolean>>({});
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editedPostText, setEditedPostText] = useState<string>('');
  const [editedPostImageFile, setEditedPostImageFile] = useState<File | null>(null);
  const [editedPostImagePreviewUrl, setEditedPostImagePreviewUrl] = useState<string | null>(null);
  const [isEditingImageCleared, setIsEditingImageCleared] = useState<boolean>(false);
  const [reportPostId, setReportPostId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState<string>('');
  const [showReportDialog, setShowReportDialog] = useState<boolean>(false);
  const [recommendationUsers, setRecommendationUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    // Initialize all user profiles when component mounts
    // This ensures the follow system works even for older users
    initializeAllUserProfiles().catch(error => 
      console.error("Error initializing user profiles:", error)
    );
    
    console.log('Feed component: Setting up real-time posts subscription');
    
    // Real-time posts subscription
    const unsubscribe = subscribeToRecentPosts((livePosts, lastDoc) => {
      console.log('Feed component: Received posts update with', livePosts.length, 'posts');
      console.log('Posts data:', livePosts);
      
      setPosts(livePosts);
      setLastDocRef(lastDoc || null);
      
      // If no posts received from subscription, try manual fetch as fallback
      if (livePosts.length === 0) {
        console.log('Feed component: No posts from subscription, trying manual fetch...');
        manuallyFetchPosts().then(manualPosts => {
          console.log('Feed component: Manual fetch returned', manualPosts.length, 'posts');
          if (manualPosts.length > 0) {
            setPosts(manualPosts);
            toast({
              title: "Posts Loaded",
              description: `Loaded ${manualPosts.length} posts manually`,
            });
          }
        }).catch(error => {
          console.error('Feed component: Manual fetch fallback failed:', error);
        });
      }
      
      // Load author profiles for the first 10 posts eagerly
      const uniqueAuthorIds = [...new Set(livePosts.slice(0, 10).map(post => post.authorId))];
      console.log('Feed component: Loading profiles for authors:', uniqueAuthorIds);
      
      Promise.all(uniqueAuthorIds.map(async (authorId) => {
        try {
          const profile = await getUserProfile(authorId);
          return profile ? { authorId, profile } : null;
        } catch (e) {
          console.error('Error loading profile for author:', authorId, e);
          return null;
        }
      })).then(results => {
        const profilesMap: Record<string, UserProfile> = {};
        results.forEach(r => { if (r) profilesMap[r.authorId] = r.profile; });
        console.log('Feed component: Loaded author profiles:', profilesMap);
        setAuthorProfiles(prev => ({ ...profilesMap, ...prev }));
      });
    }, 10);

    if (user) {
      console.log('Feed component: User authenticated, loading profile');
      loadUserProfile();
    } else {
      console.log('Feed component: No user authenticated');
    }

    return () => {
      console.log('Feed component: Cleaning up subscription');
      unsubscribe();
    };
  }, [user]);

  // Subscribe to author profiles in real-time when posts change
  useEffect(() => {
    const currentSubs = authorUnsubsRef.current;
    const authorIds = new Set(posts.map(p => p.authorId));

    // Unsubscribe authors no longer present
    for (const [authorId, unsub] of currentSubs.entries()) {
      if (!authorIds.has(authorId)) {
        unsub();
        currentSubs.delete(authorId);
      }
    }

    // Subscribe to new authors
    authorIds.forEach(authorId => {
      if (!currentSubs.has(authorId)) {
        const unsub = subscribeToUserProfile(authorId, (profile) => {
          if (!profile) return;
          setAuthorProfiles(prev => ({ ...prev, [authorId]: profile }));
          // Also refresh follow status cache for current viewer
          if (user && authorId !== user.uid) {
            checkFollowStatus(authorId).catch(() => {});
          }
        });
        currentSubs.set(authorId, unsub);
      }
    });

    return () => {
      // Do not clear here to preserve subscriptions across minor post updates
      // Cleanup happens on component unmount below
    };
  }, [posts, user]);

  // Cleanup all subscriptions on unmount
  useEffect(() => {
    return () => {
      for (const unsub of authorUnsubsRef.current.values()) {
        try { unsub(); } catch {}
      }
      authorUnsubsRef.current.clear();
    };
  }, []);

  const loadUserProfile = async () => {
    if (!user) return;
    
    try {
      const profile = await getUserProfile(user.uid);
      if (profile) {
        setUserProfile(profile);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  // Load posts from Firestore
  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const postsData = await getPosts(25);
      setPosts(postsData);
      
      // Load author profiles for each post
      const uniqueAuthorIds = [...new Set(postsData.map(post => post.authorId))];
      const profilePromises = uniqueAuthorIds.map(async (authorId) => {
        try {
          const profile = await getUserProfile(authorId);
          if (profile) {
            return { authorId, profile };
          }
          return null;
        } catch (error) {
          console.error(`Error loading profile for ${authorId}:`, error);
          return null;
        }
      });
      
      const authorProfileResults = await Promise.all(profilePromises);
      const profilesMap: Record<string, UserProfile> = {};
      
      authorProfileResults.forEach(result => {
        if (result) {
          profilesMap[result.authorId] = result.profile;
        }
      });
      
      setAuthorProfiles(profilesMap);
    } catch (error: any) {
      console.error("Error loading posts:", error);
      toast({
        title: "Error loading posts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to like posts",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Find the current post
      const currentPost = posts.find(post => post.id === postId);
      if (!currentPost) return;
      
      const isCurrentlyLiked = currentPost.likedBy.includes(user.uid);
      const currentLikes = Math.max(0, currentPost.likes || 0); // Ensure likes is never negative
      
      // Optimistic update
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                likes: isCurrentlyLiked 
                  ? Math.max(0, currentLikes - 1) // Ensure likes never goes below 0
                  : currentLikes + 1,
                likedBy: isCurrentlyLiked 
                  ? post.likedBy.filter(id => id !== user.uid)
                  : [...post.likedBy, user.uid]
              }
            : post
        )
      );
      
      // Update in Firestore
      await toggleLike(postId);
    } catch (error: any) {
      console.error("Error liking post:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      
      // Reload posts to revert if there was an error
      const postsData = await getPosts(25);
      setPosts(postsData);
    }
  };

  const handleComment = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to comment on posts",
        variant: "destructive",
      });
      return;
    }

    const commentText = commentInputs[postId]?.trim();
    if (!commentText) {
      toast({
        title: "Comment cannot be empty",
        description: "Please enter a comment before posting",
        variant: "destructive",
      });
      return;
    }

    try {
      // Add comment to Firestore
      await addComment(postId, commentText);
      
      // Update local state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: post.comments + 1 }
            : post
        )
      );
      
      // Clear comment input and hide input field
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      setShowCommentInputs(prev => ({ ...prev, [postId]: false }));
      
      toast({
        title: "Comment added!",
        description: "Your comment has been posted successfully.",
      });
    } catch (error: any) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (post: PostType) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to share posts",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create shareable content
      const shareText = `${post.authorName}: ${post.content}`;
      const shareUrl = `${window.location.origin}/post/${post.id}`;
      
      // Try to use native sharing if available
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${post.authorName}`,
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        toast({
          title: "Link copied!",
          description: "Post link has been copied to your clipboard.",
        });
      }
      
      // Update share count in Firestore
      await updateDoc(doc(db, 'posts', post.id), {
        shares: increment(1)
      });
      
      // Update local state
      setPosts(prevPosts =>
        prevPosts.map(p =>
          p.id === post.id
            ? { ...p, shares: p.shares + 1 }
            : p
        )
      );
      
    } catch (error: any) {
      console.error("Error sharing post:", error);
      toast({
        title: "Error",
        description: "Failed to share post",
        variant: "destructive",
      });
    }
  };

  const toggleCommentInput = (postId: string) => {
    setShowCommentInputs(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    
    // Focus on comment input when showing
    if (!showCommentInputs[postId]) {
      setTimeout(() => {
        const input = document.getElementById(`comment-input-${postId}`);
        if (input) input.focus();
      }, 100);
    }
  };

  const handleFollow = async (userId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to follow users",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = await toggleFollowUser(userId);
      
      // Update follow status in state
      setFollowStatus(prev => ({
        ...prev,
        [userId]: result.isFollowing
      }));
      
      // Update author profile followers count in state
      if (authorProfiles[userId]) {
        setAuthorProfiles(prev => ({
          ...prev,
          [userId]: {
            ...prev[userId],
            followersCount: result.isFollowing 
              ? (prev[userId].followersCount + 1)
              : Math.max(0, prev[userId].followersCount - 1)
          }
        }));
      }
      
      // Update current user profile
      loadUserProfile();
      
      toast({
        title: result.isFollowing ? "Following user" : "Unfollowed user",
        description: result.isFollowing 
          ? "You are now following this user." 
          : "You are no longer following this user.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update follow status",
        variant: "destructive",
      });
    }
  };

  // Check if current user is following a specific user
  const checkFollowStatus = async (userId: string) => {
    if (!user) return false;
    
    try {
      const isFollowing = await checkIfFollowing(userId);
      setFollowStatus(prev => ({
        ...prev,
        [userId]: isFollowing
      }));
      return isFollowing;
    } catch (error) {
      console.error("Error checking follow status:", error);
      return false;
    }
  };

  useEffect(() => {
    // Check follow status for post authors when posts load
    if (user && posts.length > 0) {
      posts.forEach(post => {
        if (post.authorId !== user.uid) {
          checkFollowStatus(post.authorId);
        }
      });
    }
  }, [posts, user]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size - stricter limit for base64 storage (max 1MB)
      const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Image must be smaller than 1MB when storing as base64",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Only image files are allowed",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() && !selectedImage) {
      toast({
        title: "Cannot create empty post",
        description: "Please add some text or an image to your post",
        variant: "destructive",
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to create posts",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create post data
      const postData = {
        authorName: user.displayName || 'Anonymous',
        authorHandle: `@${user.displayName?.toLowerCase().replace(/\s/g, '') || 'anonymous'}`,
        authorAvatar: user.photoURL || '/placeholder.svg',
        content: newPost,
      };
      
      console.log('Creating post with data:', postData);
      console.log('Image attached:', selectedImage ? 'Yes' : 'No');
      
      // Try to create the post
      const postId = await createPost(postData, selectedImage || undefined);
      console.log('Post created successfully with ID:', postId);
      
      // Clear input fields
      setNewPost('');
      removeSelectedImage();
      toast({
        title: "Post created!",
        description: "Your post has been shared with the community.",
      });
    } catch (error: any) {
      console.error("Error creating post:", error);
      
      // More detailed error information
      if (error.code) {
        console.error("Error code:", error.code);
      }
      
      let errorMessage = 'Failed to create post';
      
      if (error.message.includes('firestore/permission-denied')) {
        errorMessage = 'Database access denied. Check Firestore rules.';
      } else if (error.message.includes('auth/')) {
        errorMessage = 'Authentication error: Please log in again.';
      } else if (error.message.includes('Failed to process the image')) {
        errorMessage = 'Failed to process the image. Please try with a smaller image or without an image.';
      } else {
        errorMessage = error.message || 'An unexpected error occurred.';
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format the timestamp for display
  const formatTimestamp = (timestamp: Date) => {
    try {
      return formatDistanceToNow(timestamp, { addSuffix: true });
    } catch (e) {
      return 'just now';
    }
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete);
      setPosts(posts.filter(post => post.id !== postToDelete));
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully",
      });
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: error.message || 'Failed to delete post',
        variant: "destructive",
      });
    } finally {
      setPostToDelete(null);
      setIsAlertOpen(false);
    }
  };

  // Debug function to check all posts in database
  const handleDebugPosts = async () => {
    try {
      console.log('Feed: Testing debug function...');
      const allPosts = await debugGetAllPosts();
      console.log('Feed: Debug function returned', allPosts.length, 'posts');
      toast({
        title: "Debug Info",
        description: `Found ${allPosts.length} posts in database`,
      });
    } catch (error) {
      console.error('Feed: Debug function error:', error);
      toast({
        title: "Debug Error",
        description: "Debug function failed",
        variant: "destructive",
      });
    }
  };

  // Test manual fetching of posts
  const handleManualFetch = async () => {
    try {
      console.log('Feed: Testing manual fetch...');
      const manualPosts = await manuallyFetchPosts();
      console.log('Feed: Manual fetch returned', manualPosts.length, 'posts');
      
      // Update the posts state with manually fetched posts
      setPosts(manualPosts);
      
      toast({
        title: "Manual Fetch Success",
        description: `Fetched ${manualPosts.length} posts manually`,
      });
    } catch (error) {
      console.error('Feed: Manual fetch error:', error);
      toast({
        title: "Manual Fetch Error",
        description: "Manual fetch failed",
        variant: "destructive",
      });
    }
  };

  const handleManualFetchPosts = async () => {
    try {
      const postsData = await manuallyFetchPosts(25);
      setPosts(postsData);
      toast({
        title: "Posts loaded manually",
        description: `Loaded ${postsData.length} posts`,
      });
    } catch (error: any) {
      console.error("Error manually fetching posts:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFixNegativeLikes = async () => {
    try {
      const fixedCount = await fixNegativeLikeCounts();
      if (fixedCount > 0) {
        toast({
          title: "Fixed negative likes!",
          description: `Fixed ${fixedCount} posts with negative like counts`,
        });
        // Reload posts to show corrected counts
        await loadPosts();
      } else {
        toast({
          title: "No issues found",
          description: "All posts have valid like counts",
        });
      }
    } catch (error: any) {
      console.error("Error fixing negative likes:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fix negative likes",
        variant: "destructive",
      });
    }
  };

  // Edit post functionality
  const handleEditPost = (post: PostType) => {
    setEditingPostId(post.id);
    setEditedPostText(post.content);
    setEditedPostImageFile(null);
    setEditedPostImagePreviewUrl(null);
    setIsEditingImageCleared(false);
  };

  const handleSaveEdit = async () => {
    if (!editingPostId || !editedPostText.trim()) {
      toast({
        title: "Cannot save empty post",
        description: "Please add some text to your post",
        variant: "destructive",
      });
      return;
    }

    try {
      await updatePost(
        editingPostId,
        editedPostText.trim(),
        editedPostImageFile,
        isEditingImageCleared
      );

      // Update local state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === editingPostId
            ? {
                ...post,
                content: editedPostText.trim(),
                imageUrl: isEditingImageCleared ? null : 
                  editedPostImageFile ? editedPostImagePreviewUrl : post.imageUrl
              }
            : post
        )
      );

      // Clear editing state
      setEditingPostId(null);
      setEditedPostText('');
      setEditedPostImageFile(null);
      setEditedPostImagePreviewUrl(null);
      setIsEditingImageCleared(false);

      toast({
        title: "Post updated!",
        description: "Your post has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedPostText('');
    setEditedPostImageFile(null);
    setEditedPostImagePreviewUrl(null);
    setIsEditingImageCleared(false);
  };

  const handleEditedImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size - stricter limit for base64 storage (max 1MB)
      const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Image must be smaller than 1MB when storing as base64",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Only image files are allowed",
          variant: "destructive",
        });
        return;
      }
      
      setEditedPostImageFile(file);
      setEditedPostImagePreviewUrl(URL.createObjectURL(file));
      setIsEditingImageCleared(false);
    }
  };

  const handleClearEditedImage = () => {
    setEditedPostImageFile(null);
    if (editedPostImagePreviewUrl) {
      URL.revokeObjectURL(editedPostImagePreviewUrl);
      setEditedPostImagePreviewUrl(null);
    }
    setIsEditingImageCleared(true);
  };

  // Report post functionality
  const handleReportPost = (postId: string) => {
    setReportPostId(postId);
    setReportReason('');
    setShowReportDialog(true);
  };

  const handleSubmitReport = async () => {
    if (!reportPostId || !reportReason.trim()) {
      toast({
        title: "Report reason required",
        description: "Please provide a reason for reporting this post",
        variant: "destructive",
      });
      return;
    }

    try {
      await reportPost(reportPostId, reportReason.trim());
      
      setShowReportDialog(false);
      setReportPostId(null);
      setReportReason('');
      
      toast({
        title: "Post reported!",
        description: "Thank you for your report. We'll review it shortly.",
      });
    } catch (error: any) {
      console.error("Error reporting post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to report post",
        variant: "destructive",
      });
    }
  };

  // Add this outside of the JSX return, but inside the component
  const openDeleteDialog = (postId: string) => {
    setPostToDelete(postId);
    setIsAlertOpen(true);
  };

  const handleLoadMore = async () => {
    try {
      if (!lastDocRef) return;
      const { getMorePosts } = await import('@/lib/posts');
      const result = await getMorePosts(lastDocRef, 25);
      setPosts(prev => [...prev, ...result.posts]);
      setLastDocRef(result.lastDoc || null);
    } catch (e) {
      console.error('Error loading more posts', e);
    }
  };

  // Load recommendation users
  const loadRecommendationUsers = async () => {
    if (!user) return;
    
    try {
      const users = await getRecommendationUsers(user.uid, 8);
      setRecommendationUsers(users);
    } catch (error) {
      console.error("Error loading recommendation users:", error);
    }
  };

  // Load recommendation users when component mounts
  useEffect(() => {
    loadRecommendationUsers();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        {/* Left Sidebar */}
        <div className="w-64 p-6 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search post and comments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-gray-200"
              />
            </div>
          </div>

          {/* Debug buttons removed for production */}

          {/* Favourites */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">FAVOURITES</h3>
            <div className="space-y-3">
              {mockFavorites.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Heart className="w-4 h-4 text-blue-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">COMMUNITY</h3>
            <div className="space-y-3">
              {mockCommunity.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Heart className="w-4 h-4 text-blue-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Following */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">FOLLOWING</h3>
            <div className="space-y-3">
              {mockFollowing.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Heart className="w-4 h-4 text-blue-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1 p-6">
          {/* Create Post */}
          <Card className="mb-6 rounded-3xl border-gray-200">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user?.photoURL || "/placeholder.svg"} />
                  <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write your post..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[80px] resize-none border-0 shadow-none focus-visible:ring-0 text-lg placeholder:text-gray-400"
                  />
                  
                  {/* Image Preview */}
                  {imagePreviewUrl && (
                    <div className="mt-3 relative">
                      <img 
                        src={imagePreviewUrl} 
                        alt="Preview" 
                        className="rounded-lg w-full object-contain max-h-[400px]"
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                      />
                      <button
                        type="button"
                        onClick={removeSelectedImage}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-opacity"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4">
                    {/* Image Upload Button */}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleImageClick}
                        className="rounded-full hover:bg-gray-100"
                      >
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                      </Button>
                    </div>
                    
                    {/* Post Button */}
                    <Button 
                      onClick={handleCreatePost} 
                      disabled={(!newPost.trim() && !selectedImage) || isSubmitting || !user}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        'Create Post'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No posts found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="rounded-3xl border-gray-200 overflow-hidden">
                  <CardHeader className="bg-white p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.authorName?.[0] || "?"}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div>
                            <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
                            <div className="flex items-center gap-1">
                              <p className="text-sm text-gray-500">
                                {post.authorHandle} • {formatTimestamp(post.createdAt as Date)}
                              </p>
                              <p className="text-sm text-gray-500 hidden sm:inline-block">
                                • {authorProfiles[post.authorId]?.followersCount || 0} followers
                              </p>
                            </div>
                          </div>
                          {user && post.authorId !== user.uid && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`mt-2 sm:mt-0 sm:ml-3 rounded-full px-3 text-xs ${followStatus[post.authorId] ? 'bg-blue-50 text-blue-600' : ''}`}
                              onClick={() => handleFollow(post.authorId)}
                            >
                              {followStatus[post.authorId] ? (
                                <>
                                  <UserCheck className="h-3 w-3 mr-1" />
                                  Following
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-3 w-3 mr-1" />
                                  Follow
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {/* Show dropdown menu with edit/delete options for post owner */}
                        {user && post.authorId === user.uid ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full hover:bg-gray-100"
                              >
                                <MoreVertical className="h-5 w-5 text-gray-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => handleEditPost(post)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600 cursor-pointer"
                                onClick={() => openDeleteDialog(post.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full hover:bg-gray-100"
                              >
                                <MoreHorizontal className="h-5 w-5 text-gray-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem 
                                className="text-orange-600 cursor-pointer"
                                onClick={() => handleReportPost(post.id)}
                              >
                                <Flag className="h-4 w-4 mr-2" />
                                Report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    
                    {/* Edit Post Interface */}
                    {editingPostId === post.id && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Edit your post..."
                            value={editedPostText}
                            onChange={(e) => setEditedPostText(e.target.value)}
                            className="min-h-[100px] resize-none"
                          />
                          
                          {/* Image handling for edit */}
                          <div className="space-y-3">
                            {post.imageUrl && !isEditingImageCleared && (
                              <div className="relative">
                                <img 
                                  src={post.imageUrl} 
                                  alt="Current post image" 
                                  className="rounded-lg w-full object-contain max-h-[300px]"
                                />
                                <button
                                  type="button"
                                  onClick={handleClearEditedImage}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            
                            {editedPostImagePreviewUrl && (
                              <div className="relative">
                                <img 
                                  src={editedPostImagePreviewUrl} 
                                  alt="New image preview" 
                                  className="rounded-lg w-full object-contain max-h-[300px]"
                                />
                                <button
                                  type="button"
                                  onClick={handleClearEditedImage}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            
                            <div className="flex space-x-2">
                              <input
                                type="file"
                                onChange={handleEditedImageSelect}
                                accept="image/*"
                                className="hidden"
                                id={`edit-image-${post.id}`}
                              />
                              <label
                                htmlFor={`edit-image-${post.id}`}
                                className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                              >
                                <ImageIcon className="h-4 w-4 mr-2" />
                                {post.imageUrl && !isEditingImageCleared ? 'Replace Image' : 'Add Image'}
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              onClick={handleSaveEdit}
                              disabled={!editedPostText.trim()}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                            >
                              Save Changes
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              variant="outline"
                              className="px-4"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Display post image if available */}
                    {post.imageUrl && editingPostId !== post.id && (
                      <div className="mb-4">
                        <img 
                          src={post.imageUrl} 
                          alt="Post attachment" 
                          loading="lazy"
                          className="rounded-lg w-full object-contain max-h-[600px]"
                          style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        />
                      </div>
                    )}
                    
                    <div className="flex space-x-6">
                      <div className="flex space-x-2 items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`rounded-full ${post.likedBy?.includes(user?.uid || '') ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 hover:bg-red-50`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className="h-5 w-5" fill={post.likedBy?.includes(user?.uid || '') ? 'currentColor' : 'none'} />
                        </Button>
                        <span className="text-sm text-gray-500">{post.likes}</span>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50"
                          onClick={() => toggleCommentInput(post.id)}
                        >
                          <MessageCircle className="h-5 w-5" />
                        </Button>
                        <span className="text-sm text-gray-500">{post.comments}</span>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50"
                          onClick={() => handleShare(post)}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                        <span className="text-sm text-gray-500">{post.shares}</span>
                      </div>
                    </div>

                    {/* Comment Input Section */}
                    {showCommentInputs[post.id] && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex space-x-2">
                          <Textarea
                            id={`comment-input-${post.id}`}
                            placeholder="Write a comment..."
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs(prev => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))}
                            className="flex-1 min-h-[60px] resize-none"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleComment(post.id);
                              }
                            }}
                          />
                          <Button
                            onClick={() => handleComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Show existing comments */}
                    {post.comments > 0 && (
                      <div className="mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCommentInput(post.id)}
                          className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                        >
                          View all {post.comments} comments
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {posts.length > 0 && lastDocRef && (
            <div className="flex justify-center py-6">
              <Button onClick={handleLoadMore} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6">
                Load more
              </Button>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-6 bg-white border-l border-gray-200 h-screen sticky top-0 overflow-y-auto">
          {/* Profile Summary */}
          <Card className="mb-6 rounded-3xl border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={user?.photoURL || "/placeholder.svg"} />
                  <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{user?.displayName || "Anonymous"}</h3>
              <p className="text-sm text-gray-500 mb-4">@{user?.displayName?.toLowerCase().replace(/\s/g, '') || "anonymous"}</p>
              <div className="text-sm text-blue-600 mb-4">👑 You had 20% visitors this week</div>
              
              <div className="flex justify-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{posts.filter(post => post.authorId === user?.uid).length}</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{userProfile?.followersCount || 0}</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{userProfile?.followingCount || 0}</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">RECOMMENDATION</h3>
            <div className="space-y-4">
              {recommendationUsers.length > 0 ? (
                recommendationUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{user.displayName}</div>
                        <div className="text-xs text-gray-500">{user.handle}</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFollow(user.id)}
                      className="text-xs px-3 py-1"
                    >
                      {followStatus[user.id] ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Loading recommendations...</p>
                </div>
              )}
            </div>
          </div>

          {/* Topics You Follow */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">TOPICS YOU FOLLOW</h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                <Hash className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {topicTags.map((topic) => (
                <Badge key={topic} variant="secondary" className="rounded-full text-xs px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {topic}
                  <X className="w-3 h-3 ml-1 cursor-pointer" />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700" 
              onClick={handleDeletePost}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Report Dialog */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Post</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for reporting this post. This helps us take appropriate action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter reason for reporting (e.g., inappropriate content, spam, harassment)..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowReportDialog(false);
              setReportPostId(null);
              setReportReason('');
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSubmitReport}
              disabled={!reportReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              Submit Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Feed;