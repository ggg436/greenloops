
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Shield, Truck, RotateCcw, Award, Loader2, Trash2, Edit, Package, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProductById, deleteProduct } from '@/lib/products';
import { toast } from 'sonner';
import { useAuthContext } from '@/lib/AuthProvider';
import { Product } from '@/lib/products';
import { sendProductPurchaseNotification } from '@/lib/notifications';
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
import Cart from '@/components/Cart';
import Wishlist from '@/components/Wishlist';
import ProductComments from '@/components/ProductComments';
import { addToCart } from '@/lib/cart';
import { isInWishlist, toggleWishlistItem } from '@/lib/wishlist';
import { CoffeeIcon } from '@/components/CoffeeIcon';
import { getCoffeePointsBalance } from '@/lib/coffeePoints';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isInWish, setIsInWish] = useState(false);
  const [processingWishlist, setProcessingWishlist] = useState(false);
  const [processingCart, setProcessingCart] = useState(false);
  const [coffeePointsBalance, setCoffeePointsBalance] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(id);
        
        if (!productData) {
          setError('Product not found');
          toast.error('Product not found');
        } else {
          setProduct(productData);
          
          // Check if user came from marketplace with buy=true parameter
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('buy') === 'true' && user && user.uid !== productData.sellerId) {
            // Auto-trigger buy now flow
            setTimeout(() => {
              handleBuyNow();
            }, 500); // Small delay to ensure component is fully loaded
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct();
  }, [id, user]);

  // Check if product is in wishlist
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (user && product) {
        try {
          const inWishlist = await isInWishlist(product.id);
          setIsInWish(inWishlist);
        } catch (error) {
          console.error('Error checking wishlist status:', error);
        }
      }
    };
    
    if (product) {
      checkWishlistStatus();
    }
  }, [product, user]);

  // Fetch coffee points balance
  const fetchCoffeePointsBalance = async () => {
    if (!user) {
      setCoffeePointsBalance(0);
      return;
    }
    
    try {
      const balance = await getCoffeePointsBalance();
      setCoffeePointsBalance(balance);
    } catch (error) {
      console.error('Error fetching coffee points balance:', error);
      setCoffeePointsBalance(0);
    }
  };

  useEffect(() => {
    fetchCoffeePointsBalance();
  }, [user]);

  const handleAddToCart = async () => {
    if (!product || !user) {
      toast.error('Please log in to add items to cart');
      return;
    }
    
    // Prevent users from adding their own products to cart
    if (user.uid === product.sellerId) {
      toast.error('You cannot add your own products to cart');
      return;
    }
    
    setProcessingCart(true);
    try {
      // Send notification to product owner about cart addition
      await sendProductPurchaseNotification(
        product.id,
        product.title,
        product.sellerId,
        user.uid,
        user.displayName || user.email?.split('@')[0] || 'Anonymous',
        user.photoURL || '',
        product.listingType || 'sell'
      );
      
      // Add to cart
      await addToCart(product, quantity);
      toast.success('Product added to cart! Seller notified of your interest.');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add to cart');
    } finally {
      setProcessingCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product || !user) {
      toast.error('Please log in to make a purchase');
      return;
    }
    
    // Prevent users from buying their own products
    if (user.uid === product.sellerId) {
      toast.error('You cannot buy your own products');
      return;
    }
    
    setProcessingCart(true);
    try {
      // Send notification to product owner
      await sendProductPurchaseNotification(
        product.id,
        product.title,
        product.sellerId,
        user.uid,
        user.displayName || user.email?.split('@')[0] || 'Anonymous',
        user.photoURL || '',
        product.listingType || 'sell'
      );
      
      // Add to cart and proceed to checkout
      await addToCart(product, quantity);
      toast.success('Purchase successful! Notification sent to seller.');
      navigate('/dashboard/checkout');
    } catch (error: any) {
      console.error('Error processing purchase:', error);
      toast.error(error.message || 'Failed to process purchase');
    } finally {
      setProcessingCart(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product || !user) return;
    
    try {
      await deleteProduct(product.id);
      toast.success('Product deleted successfully');
      navigate('/dashboard/marketplace');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const handleToggleWishlist = async () => {
    if (!product || !user) {
      toast.error('Please log in to use wishlist');
      return;
    }
    
    // Prevent users from adding their own products to wishlist
    if (user.uid === product.sellerId) {
      toast.error('You cannot add your own products to wishlist');
      return;
    }
    
    setProcessingWishlist(true);
    try {
      const { added } = await toggleWishlistItem(product);
      setIsInWish(added);
      toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (error: any) {
      console.error('Error updating wishlist:', error);
      toast.error(error.message || 'Failed to update wishlist');
    } finally {
      setProcessingWishlist(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/dashboard/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/dashboard/marketplace')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
        
        {/* Coffee points display */}
        {user && (
          <Link to="/dashboard/coffee-redemption" className="flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full hover:bg-orange-100 transition-colors cursor-pointer">
            <Coffee className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">{coffeePointsBalance}</span>
          </Link>
        )}
        
        {/* Show delete/edit buttons if user is the product owner */}
        {user && product && user.uid === product.sellerId && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => navigate(`/dashboard/marketplace/edit/${product.id}`)}
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this product from the marketplace. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleDeleteProduct}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={product.images && product.images.length > 0 
                  ? product.images[selectedImage] 
                  : 'https://placehold.co/600x600?text=No+Image'} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))
              ) : (
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img src="https://placehold.co/600x600?text=No+Image" alt="No image" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            
            {/* Add delete button below images if user is the product owner */}
            {user && product && user.uid === product.sellerId && (
              <div className="mt-4 flex justify-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-2 w-full"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete This Product
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this product from the marketplace. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleDeleteProduct}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${
                        star <= Math.floor(product.averageRating || 0) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : star === Math.ceil(product.averageRating || 0) && (product.averageRating || 0) % 1 !== 0
                          ? 'fill-yellow-400/50 text-yellow-400'
                          : 'fill-gray-300 text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.averageRating || 0} ({product.totalRatings || 0} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">Rs. {product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">Rs. {product.originalPrice}</span>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                    {discountPercentage}% off
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${product.quantity > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.quantity > 0 && (
                <span className="text-sm text-gray-500">({product.quantity} available)</span>
              )}
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Sold by:</span>
              <span className="text-sm font-medium">{product.sellerName}</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About this item</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-900">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                    disabled={product.quantity === 0}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                    disabled={product.quantity === 0 || quantity >= product.quantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                {/* Only show Add to Cart and Buy Now for products not owned by current user */}
                {user && user.uid !== product.sellerId ? (
                  <>
                    <Button 
                      onClick={handleAddToCart}
                      variant="outline" 
                      className="flex-1 flex items-center justify-center gap-2 py-3"
                      disabled={product.quantity === 0 || processingCart}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                    <Button 
                      onClick={handleBuyNow}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700"
                      disabled={product.quantity === 0 || processingCart}
                    >
                      Buy Now
                    </Button>
                  </>
                ) : (
                  /* Show message for own products */
                  <div className="flex-1 text-center py-3 px-4 bg-gray-50 rounded-lg border">
                    <Package className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-medium text-gray-600">This is your product</p>
                    <p className="text-xs text-gray-500">You cannot buy your own items</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {/* Coffee icon - only show for products not owned by current user */}
                {user && user.uid !== product.sellerId && (
                  <CoffeeIcon
                    toUserId={product.sellerId}
                    toUserName={product.sellerName}
                    productId={product.id}
                    productTitle={product.title}
                    size="md"
                    onPointsSent={fetchCoffeePointsBalance}
                  />
                )}
                
                {/* Only show wishlist button for products not owned by current user */}
                {user && user.uid !== product.sellerId && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleToggleWishlist}
                    disabled={processingWishlist}
                  >
                    {processingWishlist ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Heart className={`w-4 h-4 ${isInWish ? 'fill-red-500 text-red-500' : ''}`} />
                    )}
                    {isInWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t pt-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm font-medium">Secure Payment</div>
                  <div className="text-xs text-gray-500">SSL Protected</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm font-medium">Fast Shipping</div>
                  <div className="text-xs text-gray-500">2-3 Days</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-sm font-medium">Easy Returns</div>
                  <div className="text-xs text-gray-500">30 Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {product.specifications && (
          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Seller Information */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  {product.sellerPhoto ? (
                    <img src={product.sellerPhoto} alt={product.sellerName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xl">
                      {product.sellerName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{product.sellerName}</h3>
                  <p className="text-sm text-gray-500">Seller since {new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
                <Button variant="outline" className="ml-auto">
                  Contact Seller
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Comments */}
        <div className="mt-12">
          <ProductComments productId={product.id} productTitle={product.title} />
        </div>
      </div>
      
      {/* Cart sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Wishlist sidebar */}
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </div>
  );
};

export default ProductDetails;
