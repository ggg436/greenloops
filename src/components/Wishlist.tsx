import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Loader2, ShoppingCart, X } from 'lucide-react';
import { WishlistItem, getWishlist, removeFromWishlist } from '@/lib/wishlist';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { addToCart } from '@/lib/cart';
import { getProductById } from '@/lib/products';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ isOpen, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingItem, setProcessingItem] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      loadWishlist();
    }
  }, [isOpen]);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const items = await getWishlist();
      setWishlistItems(items);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setProcessingItem(itemId);
    try {
      await removeFromWishlist(itemId);
      // Update local state
      setWishlistItems(prev => prev.filter(item => item.id !== itemId));
      toast.success('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    } finally {
      setProcessingItem(null);
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    setProcessingItem(item.id);
    try {
      // Fetch the complete product data
      const product = await getProductById(item.productId);
      if (product) {
        // Add to cart with quantity 1
        await addToCart(product, 1);
        toast.success(`${item.title} added to cart`);
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setProcessingItem(null);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Your Wishlist
          </SheetTitle>
          <SheetDescription>
            {wishlistItems.length === 0 ? 'Your wishlist is empty' : `${wishlistItems.length} item(s) in your wishlist`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
              <p className="text-sm text-gray-500 mt-2 mb-4">Save items you like to your wishlist</p>
              <Button onClick={() => {
                onClose();
                navigate('/dashboard/marketplace');
              }}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex items-start py-4 border-b border-gray-200">
                  <div className="h-20 w-20 flex-shrink-0 rounded-md border border-gray-200 overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                      onClick={() => {
                        onClose();
                        navigate(`/dashboard/marketplace/${item.productId}`);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 
                      className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        onClose();
                        navigate(`/dashboard/marketplace/${item.productId}`);
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddToCart(item)}
                        disabled={processingItem === item.id}
                        className="text-xs px-2"
                      >
                        {processingItem === item.id ? (
                          <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        ) : (
                          <ShoppingCart className="h-3 w-3 mr-1" />
                        )}
                        Add to Cart
                      </Button>
                      
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={processingItem === item.id}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="mt-6">
          <div className="w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Wishlist; 