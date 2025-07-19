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
  MoreVertical
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuthContext } from '@/lib/AuthProvider';
import { Post as PostType, getPosts, createPost, toggleLike, addComment, deletePost } from '@/lib/posts';
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
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  // Inside the Feed component, add a new state to track which post is being deleted
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Load posts from Firestore
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const postsData = await getPosts();
        setPosts(postsData);
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

    loadPosts();
  }, [toast]);

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
      // Optimistic update
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.likedBy.includes(user.uid),
                likes: post.likedBy.includes(user.uid) ? post.likes - 1 : post.likes + 1,
                likedBy: post.likedBy.includes(user.uid) 
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
      const postsData = await getPosts();
      setPosts(postsData);
    }
  };

  const handleFollow = (userId: string) => {
    toast({
      title: "Following user",
      description: "You are now following this user.",
    });
  };

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
      
      // Refetch posts to include the new one
      const postsData = await getPosts();
      setPosts(postsData);
      
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
    if (!user || !postToDelete) return;

    try {
      await deletePost(postToDelete);
      
      // Update the posts state to remove the deleted post
      setPosts(posts.filter(post => post.id !== postToDelete));
      
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      // Reset the post to delete
      setPostToDelete(null);
      setIsAlertOpen(false);
    }
  };

  // Add this outside of the JSX return, but inside the component
  const openDeleteDialog = (postId: string) => {
    setPostToDelete(postId);
    setIsAlertOpen(true);
  };

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
                        className="max-h-64 rounded-lg object-cover"
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
                        <div>
                          <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
                          <p className="text-sm text-gray-500">
                            {post.authorHandle} • {formatTimestamp(post.createdAt as Date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {/* Show dropdown menu with delete option for post owner */}
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
                                className="text-red-600 cursor-pointer"
                                onClick={() => openDeleteDialog(post.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full hover:bg-gray-100"
                            onClick={() => handleFollow(post.authorId)}
                          >
                            <MoreHorizontal className="h-5 w-5 text-gray-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    
                    {/* Display post image if available */}
                    {post.imageUrl && (
                      <div className="mb-4">
                        <img 
                          src={post.imageUrl} 
                          alt="Post attachment" 
                          className="rounded-lg max-h-96 w-full object-cover"
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
                        <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50">
                          <MessageCircle className="h-5 w-5" />
                        </Button>
                        <span className="text-sm text-gray-500">{post.comments}</span>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50">
                          <Share2 className="h-5 w-5" />
                        </Button>
                        <span className="text-sm text-gray-500">{post.shares}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                  <div className="text-2xl font-bold text-gray-900">201</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">11.2K</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">501</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">RECOMMENDATION</h3>
            <div className="space-y-4">
              {mockRecommendations.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500">12 minutes</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFollow(user.id)}
                    className="rounded-full px-4 text-xs"
                  >
                    Follow
                  </Button>
                </div>
              ))}
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
    </div>
  );
};

export default Feed;