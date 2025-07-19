import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PostComment, addComment, getComments } from '@/lib/posts';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface PostCommentsProps {
  postId: string;
  commentCount: number;
}

export function PostComments({ postId, commentCount }: PostCommentsProps) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load comments when expanded
  useEffect(() => {
    if (expanded && comments.length === 0) {
      loadComments();
    }
  }, [expanded]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const commentsData = await getComments(postId);
      setComments(commentsData);
    } catch (error: any) {
      console.error("Error loading comments:", error);
      toast({
        title: "Error loading comments",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "You need to be logged in to add comments",
          variant: "destructive",
        });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addComment(postId, newComment);
      setNewComment('');
      loadComments(); // Reload comments after adding
    } catch (error: any) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error adding comment",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    try {
      return formatDistanceToNow(timestamp, { addSuffix: true });
    } catch (e) {
      return 'just now';
    }
  };

  if (!expanded) {
    return (
      <Button 
        variant="link" 
        onClick={() => setExpanded(true)} 
        className="text-blue-600 text-sm hover:text-blue-700 font-medium p-0"
      >
        {commentCount > 0 ? `View All ${commentCount} Comments` : 'Add a Comment'}
      </Button>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <Separator />
      
      {/* Add Comment */}
      <div className="flex space-x-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.photoURL || "/placeholder.svg"} />
          <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Input 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 h-9 text-sm"
            />
            <Button 
              size="sm" 
              onClick={handleAddComment}
              disabled={!newComment.trim() || isSubmitting || !user}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Post'
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Comments */}
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-blue-600">Loading comments...</span>
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-2">No comments yet. Be the first to comment!</p>
      ) : (
        <>
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{comment.authorName}</span>
                  <span className="text-sm text-gray-500">
                    {formatTimestamp(comment.createdAt instanceof Date ? comment.createdAt : new Date())}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                  <Heart className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{comment.likes}</span>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setExpanded(false)}
            className="text-gray-500 text-sm w-full"
          >
            Hide Comments
          </Button>
        </>
      )}
    </div>
  );
} 