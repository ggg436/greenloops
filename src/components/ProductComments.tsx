import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthContext } from '@/lib/AuthProvider';
import { 
  ProductComment, 
  addProductComment, 
  getProductComments, 
  hasUserCommented, 
  getUserComment 
} from '@/lib/products';
import { toast } from 'sonner';

interface ProductCommentsProps {
  productId: string;
  productTitle: string;
}

const ProductComments: React.FC<ProductCommentsProps> = ({ productId, productTitle }) => {
  const { user } = useAuthContext();
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [userHasCommented, setUserHasCommented] = useState(false);
  const [existingComment, setExistingComment] = useState<ProductComment | null>(null);

  useEffect(() => {
    loadComments();
    checkUserComment();
  }, [productId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const productComments = await getProductComments(productId);
      setComments(productComments);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const checkUserComment = async () => {
    if (!user) return;
    
    try {
      const hasCommented = await hasUserCommented(productId);
      setUserHasCommented(hasCommented);
      
      if (hasCommented) {
        const userComment = await getUserComment(productId);
        setExistingComment(userComment);
      }
    } catch (error) {
      console.error('Error checking user comment:', error);
    }
  };

  const handleSubmitComment = async () => {
    if (!user) {
      toast.error('Please login to comment');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error('Please select a valid rating');
      return;
    }

    try {
      setSubmitting(true);
      await addProductComment(productId, comment.trim(), rating);
      
      toast.success('Comment added successfully!');
      setComment('');
      setRating(5);
      setShowCommentForm(false);
      
      // Reload comments and check user comment status
      await loadComments();
      await checkUserComment();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditComment = () => {
    if (existingComment) {
      setComment(existingComment.comment);
      setRating(existingComment.rating);
      setShowCommentForm(true);
    }
  };

  const formatCommentTime = (timestamp: Date | any) => {
    if (!timestamp) return 'Recently';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : 'button'}
            onClick={interactive && onStarClick ? () => onStarClick(star) : undefined}
            disabled={!interactive}
            className={`${
              interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
            }`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Comments Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Comments & Reviews</h3>
          <Badge variant="secondary">{comments.length} comments</Badge>
        </div>
        
        {user && !userHasCommented && (
          <Button 
            onClick={() => setShowCommentForm(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Add Comment
          </Button>
        )}
        
        {user && userHasCommented && (
          <Button 
            onClick={handleEditComment}
            variant="outline"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Edit Comment
          </Button>
        )}
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">
              {existingComment ? 'Edit Your Comment' : 'Add a Comment'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex items-center gap-2">
                {renderStars(rating, true, setRating)}
                <span className="text-sm text-gray-600 ml-2">
                  {rating} out of 5
                </span>
              </div>
            </div>

            {/* Comment Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment *
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSubmitComment}
                disabled={submitting || !comment.trim()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {existingComment ? 'Update Comment' : 'Submit Comment'}
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  setShowCommentForm(false);
                  setComment('');
                  setRating(5);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Comment Display */}
      {existingComment && !showCommentForm && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">Your Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={existingComment.userPhoto} />
                <AvatarFallback className="bg-green-500 text-white">
                  {existingComment.userName[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium text-green-800">{existingComment.userName}</span>
                  <span className="text-sm text-gray-500">
                    {formatCommentTime(existingComment.createdAt)}
                  </span>
                </div>
                
                <div className="mb-2">
                  {renderStars(existingComment.rating)}
                </div>
                
                <p className="text-green-800">{existingComment.comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h4>
            <p className="text-gray-500">
              Be the first to share your thoughts about this product!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.userPhoto} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {comment.userName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-900">{comment.userName}</span>
                      <span className="text-sm text-gray-500">
                        {formatCommentTime(comment.createdAt)}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      {renderStars(comment.rating)}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductComments; 