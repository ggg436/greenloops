
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Package, Star, MapPin, Filter, LayoutGrid, List, ShoppingCart, ChevronDown, User, Loader2, Trash2, Coffee } from 'lucide-react';
import { useAuthContext } from '@/lib/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Product, getProducts, deleteProduct, debugGetAllProducts, manuallyFetchProducts } from '@/lib/products';
import { sendProductPurchaseNotification } from '@/lib/notifications';
import { toast } from 'sonner';
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
import { addToCart } from '@/lib/cart';
import { toggleWishlistItem, isInWishlist } from '@/lib/wishlist';
import { CoffeeIcon } from '@/components/CoffeeIcon';
import { getCoffeePointsBalance } from '@/lib/coffeePoints';

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistStatus, setWishlistStatus] = useState<Record<string, boolean>>({});
  const [processingProductId, setProcessingProductId] = useState<string | null>(null);
  const [coffeePointsBalance, setCoffeePointsBalance] = useState(0);

  // Get user's display name or email
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest';
  
  // Get user's initials for fallback avatar
  const getInitials = () => {
    if (!user) return 'G';
    if (user.displayName) {
      return user.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return user.email ? user.email[0].toUpperCase() : 'U';
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Marketplace: Fetching products with category:', selectedCategory);
      setLoading(true);
      try {
        const result = await getProducts(undefined, 12, selectedCategory || undefined);
        console.log('Marketplace: Received products result:', result);
        console.log('Marketplace: Products count:', result.products.length);
        console.log('Marketplace: Products data:', result.products);
        setProducts(result.products);
        
        // If no products received, try manual fetch as fallback
        if (result.products.length === 0) {
          console.log('Marketplace: No products from regular fetch, trying manual fetch...');
          try {
            const manualProducts = await manuallyFetchProducts();
            console.log('Marketplace: Manual fetch returned', manualProducts.length, 'products');
            if (manualProducts.length > 0) {
              setProducts(manualProducts);
              toast.success(`Loaded ${manualProducts.length} products manually`);
            }
          } catch (manualError) {
            console.error('Marketplace: Manual fetch fallback failed:', manualError);
          }
        }
      } catch (error) {
        console.error('Marketplace: Error fetching products:', error);
        toast.error('Failed to load products');
        
        // Try manual fetch as fallback on error
        console.log('Marketplace: Trying manual fetch as fallback...');
        try {
          const manualProducts = await manuallyFetchProducts();
          console.log('Marketplace: Manual fetch fallback returned', manualProducts.length, 'products');
          if (manualProducts.length > 0) {
            setProducts(manualProducts);
            toast.success(`Loaded ${manualProducts.length} products manually`);
          }
        } catch (manualError) {
          console.error('Marketplace: Manual fetch fallback failed:', manualError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Add this useEffect to check wishlist status for products
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        if (!user) return;
        
        const statusMap: Record<string, boolean> = {};
        await Promise.all(
          products.map(async (product) => {
            const inWishlist = await isInWishlist(product.id);
            statusMap[product.id] = inWishlist;
          })
        );
        setWishlistStatus(statusMap);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };
    
    if (products.length > 0) {
      checkWishlistStatus();
    }
  }, [products, user]);

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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just filter the products client-side
    // In a real app, you might want to use a search service like Algolia
    if (searchTerm.trim()) {
      navigate(`/dashboard/marketplace?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/dashboard/marketplace/${productId}`);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete);
      
      // Update the products list to remove the deleted product
      setProducts(products.filter(product => product.id !== productToDelete));
      
      toast.success('Product deleted successfully');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Failed to delete product');
    } finally {
      setProductToDelete(null);
      setIsAlertOpen(false);
    }
  };

  // Debug function to check all products in database
  const handleDebugProducts = async () => {
    try {
      console.log('Marketplace: Testing debug function...');
      const allProducts = await debugGetAllProducts();
      console.log('Marketplace: Debug function returned', allProducts.length, 'products');
      toast.success(`Debug: Found ${allProducts.length} products in database`);
    } catch (error) {
      console.error('Marketplace: Debug function error:', error);
      toast.error('Debug function failed');
    }
  };

  // Test manual fetching of products
  const handleManualFetch = async () => {
    try {
      console.log('Marketplace: Testing manual fetch...');
      const manualProducts = await manuallyFetchProducts();
      console.log('Marketplace: Manual fetch returned', manualProducts.length, 'products');
      
      // Update the products state with manually fetched products
      setProducts(manualProducts);
      
      toast.success(`Manual Fetch: Found ${manualProducts.length} products in database`);
    } catch (error) {
      console.error('Marketplace: Manual fetch error:', error);
      toast.error('Manual fetch failed');
    }
  };

  // Add these handler functions
  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please log in to add items to cart');
      return;
    }
    
    // Prevent users from adding their own products to cart
    if (user.uid === product.sellerId) {
      toast.error('You cannot add your own products to cart');
      return;
    }
    
    setProcessingProductId(product.id);
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
      
      // Add to cart
      await addToCart(product, 1);
      toast.success(`${product.title} added to cart! Seller notified of your interest.`);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add to cart');
    } finally {
      setProcessingProductId(null);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please log in to add items to wishlist');
      return;
    }
    
    // Prevent users from adding their own products to wishlist
    if (user.uid === product.sellerId) {
      toast.error('You cannot add your own products to wishlist');
      return;
    }
    
    setProcessingProductId(product.id);
    try {
      const { added } = await toggleWishlistItem(product);
      setWishlistStatus({
        ...wishlistStatus,
        [product.id]: added
      });
      toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (error: any) {
      console.error('Error updating wishlist:', error);
      toast.error(error.message || 'Failed to update wishlist');
    } finally {
      setProcessingProductId(null);
    }
  };

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      {/* Marketplace Header */}
      <div className="w-full h-28 bg-white border-b border-gray-200">
        <div className="max-w-full px-6">
          {/* Top header row */}
          <div className="flex items-center justify-between pt-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-400 rounded" />
              <h1 className="text-lg font-semibold text-gray-800">Marketplace</h1>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 text-sm bg-gray-50 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                />
              </form>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 rounded">
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </button>
              <Link
                to="#"
                className="flex items-center gap-4 text-gray-600 hover:text-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlistOpen(true);
                }}
              >
                <Heart className="h-5 w-5" />
                <span>Favorites</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 text-gray-600 hover:text-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCartOpen(true);
                }}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Cart</span>
              </Link>
              
              {user ? (
                // Show user profile when logged in
                <div className="flex items-center gap-3 ml-2">
                  {/* Coffee points display */}
                  <Link to="/dashboard/coffee-redemption" className="flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full hover:bg-orange-100 transition-colors cursor-pointer">
                    <Coffee className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">{coffeePointsBalance}</span>
                  </Link>
                  
                  <Avatar className="h-9 w-9">
                    {user?.photoURL ? (
                      <AvatarImage src={user.photoURL} referrerPolicy="no-referrer" />
                    ) : (
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getInitials()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{displayName}</span>
                    <ChevronDown size={12} className="text-gray-500" />
                  </div>
                </div>
              ) : (
                // Show sign in button when not logged in
                <Link to="/login">
                  <button className="px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800 hover:bg-gray-50">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Navigation row */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800">Nepal</span>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-semibold">
                <Filter className="w-4 h-4" />
                <span>Categories</span>
              </button>

              <nav className="flex items-center gap-6">
                <button className="text-sm text-gray-800 hover:text-blue-500">Best Sellers</button>
                <button className="text-sm text-gray-800 hover:text-blue-500">New Releases</button>
                <button className="text-sm text-gray-800 hover:text-blue-500">Seeds</button>
                <button className="text-sm text-gray-800 hover:text-blue-500">Fertilizers</button>
                <button className="text-sm text-gray-800 hover:text-blue-500">Tools</button>
                <button className="text-sm text-gray-800 hover:text-blue-500">Equipments</button>
                <button className="text-sm text-gray-800 hover:text-blue-500">Pesticides</button>
                <button className="text-sm text-gray-800 hover:text-blue-500">Irrigation</button>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => user ? navigate('/dashboard/marketplace/add-product') : navigate('/login')}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Add Product
              </button>
              
              <button 
                onClick={handleDebugProducts}
                className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Debug Products
              </button>
              
              <button 
                onClick={handleManualFetch}
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Manual Fetch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-full px-6 py-8">
        {/* Results header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                <span className="text-gray-800">Loading products...</span>
              </div>
            ) : (
              <>
                <span className="text-gray-800">
                  {products.length > 0 
                    ? `Found ${products.length} products` 
                    : 'No products found'}
                  {selectedCategory ? ` in ${selectedCategory}` : ''}
                  {searchTerm ? ` for "${searchTerm}"` : ''}
                </span>
              </>
            )}
          </h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-md">
              <span className="text-sm text-gray-400">Sort by</span>
              <span className="text-sm text-gray-800">Featured</span>
              <div className="w-2 h-1 border-b border-gray-500" />
            </div>
            
            <div className="flex">
              <button className="p-2 bg-gray-200 rounded-l-md">
                <LayoutGrid className="w-4 h-4 text-gray-800" />
              </button>
              <button className="p-2 bg-gray-50 rounded-r-md">
                <List className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <div className="w-72 flex-shrink-0">
            {/* Price filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Price, $</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Product Type filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Product Type</h3>
              <div className="space-y-3">
                {['Organic', 'Non-GMO', 'Certified', 'Local', 'Hybrid'].map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" />
                    <span className="text-sm text-gray-800">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Crop Type filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Crop Type</h3>
              <div className="space-y-3">
                {['Cereals', 'Pulses', 'Oilseeds', 'Vegetables', 'Fruits', 'Cash Crops'].map((resolution) => (
                  <label key={resolution} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" />
                    <span className="text-sm text-gray-800">{resolution}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Farming System filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Farming System</h3>
              <div className="space-y-3">
                {['Organic', 'Conventional', 'Integrated', 'Precision'].map((level) => (
                  <label key={level} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" />
                    <span className="text-sm text-gray-800">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand filter */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Brand</h3>
              <div className="space-y-3">
                {['John Deere', 'Mahindra', 'Syngenta', 'Bayer', 'TAFE', 'Sonalika', 'Kubota'].map((brand) => (
                  <label key={brand} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" />
                    <span className="text-sm text-gray-800">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <div className="col-span-3 flex flex-col items-center justify-center h-64">
                    <Package className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500">No products found</h3>
                    <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  products.map((product) => (
                    <div 
                      key={product.id}
                      className="group bg-white border border-gray-200 rounded-3xl p-6 relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                        {/* Coffee icon - only show for products not owned by current user */}
                        {user && user.uid !== product.sellerId && (
                          <CoffeeIcon
                            toUserId={product.sellerId}
                            toUserName={product.sellerName}
                            productId={product.id}
                            productTitle={product.title}
                            size="sm"
                            onPointsSent={fetchCoffeePointsBalance}
                          />
                        )}
                        
                        {/* Only show wishlist button for products not owned by current user */}
                        {user && user.uid !== product.sellerId && (
                          <button 
                            className="p-2 hover:bg-gray-100 rounded"
                            onClick={(e) => handleToggleWishlist(e, product)}
                            disabled={processingProductId === product.id}
                          >
                            <Heart 
                              className={`w-4 h-4 ${wishlistStatus[product.id] ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
                            />
                          </button>
                        )}
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Package className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {/* Delete button - only visible to product owner */}
                        {user && user.uid === product.sellerId && (
                          <button 
                            className="p-2 hover:bg-gray-100 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProductToDelete(product.id);
                              setIsAlertOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        )}
                      </div>
                      
                      {/* Hover overlay with buttons */}
                      <div className="absolute inset-0 bg-black/70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <div className="flex flex-col gap-3">
                          {/* Only show Add to Cart and Buy Now for products not owned by current user */}
                          {user && user.uid !== product.sellerId ? (
                            <>
                              <button 
                                onClick={(e) => handleAddToCart(e, product)}
                                disabled={processingProductId === product.id}
                                className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                              >
                                {processingProductId === product.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <ShoppingCart className="w-4 h-4" />
                                )}
                                Add to Cart
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Buy now logic
                                  navigate(`/dashboard/marketplace/${product.id}?buy=true`);
                                }}
                                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                              >
                                Buy Now
                              </button>
                            </>
                          ) : (
                            /* Show message for own products */
                            <div className="text-center text-white">
                              <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                              <p className="text-sm">This is your product</p>
                              <p className="text-xs text-gray-300 mt-1">You cannot buy your own items</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <img 
                        src={product.coverImage || 'https://placehold.co/250x250?text=No+Image'} 
                        alt={product.title} 
                        className="w-64 h-64 object-cover mb-4 rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/250x250?text=No+Image';
                        }}
                      />
                      <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 h-10">{product.title}</h3>
                      <p className="text-lg font-semibold text-gray-800 mb-2">Rs. {product.price.toFixed(2)}</p>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3 h-3 ${
                              idx < Math.floor(product.averageRating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : idx < (product.averageRating || 0)
                                  ? 'fill-yellow-400/50 text-yellow-400'
                                  : 'fill-gray-300 text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{product.totalRatings || 0} reviews</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
        <div className="w-7 h-6 bg-white rounded" />
      </button>

      {/* Delete product confirmation dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this product from the marketplace. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteProduct}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cart sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Wishlist sidebar */}
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </div>
  );
};

export default Marketplace;
