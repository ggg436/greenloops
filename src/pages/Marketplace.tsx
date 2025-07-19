
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Package, Star, MapPin, Filter, LayoutGrid, List, ShoppingCart } from 'lucide-react';

const Marketplace = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/dashboard/marketplace/${productId}`);
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
              <h1 className="text-lg font-semibold text-gray-800">What a Market!</h1>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input
                  type="text"
                  placeholder="DJI phantom"
                  className="w-full pl-12 pr-4 py-3 text-sm bg-gray-50 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 rounded">
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 rounded">
                <Heart className="w-4 h-4" />
                <span>Favorites</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 rounded relative">
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
                <span className="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-800">
                Sign In
              </button>
            </div>
          </div>

          {/* Navigation row */}
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-800">California</span>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-semibold">
              <Filter className="w-4 h-4" />
              <span>Categories</span>
            </button>

            <nav className="flex items-center gap-6">
              <button className="text-sm text-gray-800 hover:text-blue-500">Best Sellers</button>
              <button className="text-sm text-gray-800 hover:text-blue-500">New Releases</button>
              <button className="text-sm text-gray-800 hover:text-blue-500">Books</button>
              <button className="text-sm text-gray-800 hover:text-blue-500">Computers</button>
              <button className="text-sm text-gray-800 hover:text-blue-500">Fashion</button>
              <button className="text-sm text-gray-800 hover:text-blue-500">Health</button>
              <button className="text-sm text-gray-800 hover:text-blue-500">Pharmacy</button>
              <button className="text-sm text-gray-800 hover:text-blue-500">Toys & Games</button>
            </nav>

            <button className="ml-auto text-sm text-gray-800 hover:text-blue-500">
              Become a seller
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-full px-6 py-8">
        {/* Results header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">
            <span className="text-gray-800">Found 376 results for </span>
            <span className="text-blue-500">dji phantom</span>
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

            {/* Features filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Quadcopter Features</h3>
              <div className="space-y-3">
                {['App-Controlled', 'Obstacle Avoidance', 'Video Downlink Capable', 'Wi-Fi'].map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" />
                    <span className="text-sm text-gray-800">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resolution filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Video Capture Resolution</h3>
              <div className="space-y-3">
                {['4K UHD 2160p', 'FHD 1080p', 'HD 720p'].map((resolution) => (
                  <label key={resolution} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" />
                    <span className="text-sm text-gray-800">{resolution}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skill level filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Operator Skill Level</h3>
              <div className="space-y-3">
                {['Beginner', 'Intermediate', 'Expert'].map((level) => (
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
                {['DJI', 'Holy Stone', 'Potensic', 'Ruko', 'aovo', 'OXOXO', 'DEERC'].map((brand) => (
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
            <div className="grid grid-cols-3 gap-6">
              {/* Product card 1 */}
              <div 
                className="group bg-white border border-gray-200 rounded-3xl p-6 relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleProductClick('dji-phantom-2-vision')}
              >
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Package className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black/70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic
                      }}
                      className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Buy now logic
                      }}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                <img src="https://placehold.co/250x250" alt="Product" className="w-64 h-64 object-cover mb-4" />
                <h3 className="text-sm text-gray-800 mb-2">DJI Phantom 2 Vision+</h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">$599</p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2, 3].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
                  <Star className="w-3 h-3 fill-gray-300 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500">243</span>
              </div>

              {/* Product card 2 */}
              <div 
                className="group bg-white border border-gray-200 rounded-3xl p-6 relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleProductClick('dji-phantom-4-multispectral')}
              >
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Package className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black/70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic
                      }}
                      className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Buy now logic
                      }}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                <img src="https://placehold.co/250x250" alt="Product" className="w-64 h-64 object-cover mb-4" />
                <h3 className="text-sm text-gray-800 mb-2">DJI Phantom 4 Multispectral</h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">$1,449</p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">98</span>
              </div>

              {/* Product card 3 */}
              <div 
                className="group bg-white border border-gray-200 rounded-3xl p-6 relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleProductClick('dji-phantom-4-pro')}
              >
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Package className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black/70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic
                      }}
                      className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Buy now logic
                      }}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                <img src="https://placehold.co/250x250" alt="Product" className="w-64 h-64 object-cover mb-4" />
                <h3 className="text-sm text-gray-800 mb-2">DJI Phantom 4 PRO</h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">$739</p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-gray-300 text-gray-300" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">1,002</span>
              </div>

              {/* Second row products */}
              <div 
                className="group bg-white border border-gray-200 rounded-3xl p-6 relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleProductClick('dji-intelligent-flight-battery')}
              >
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Package className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black/70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic
                      }}
                      className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Buy now logic
                      }}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                <img src="https://placehold.co/250x250" alt="Product" className="w-64 h-64 object-cover mb-4" />
                <h3 className="text-sm text-gray-800 mb-2">4 Series — Intelligent Flight Battery (5…</h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">$186</p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2, 3].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
                  <Star className="w-3 h-3 fill-gray-300 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500">243</span>
              </div>

              <div 
                className="group bg-white border border-gray-200 rounded-3xl p-6 relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleProductClick('dji-phantom-3-battery')}
              >
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Package className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black/70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic
                      }}
                      className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Buy now logic
                      }}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                <img src="https://placehold.co/250x250" alt="Product" className="w-64 h-64 object-cover mb-4" />
                <h3 className="text-sm text-gray-800 mb-2">DJI Phantom 3 — Intelligent Flight Bat…</h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">$98</p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">98</span>
              </div>

              <div 
                className="group bg-white border border-gray-200 rounded-3xl p-6 relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleProductClick('dji-phantom-4-pro-v2')}
              >
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Package className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black/70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic
                      }}
                      className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Buy now logic
                      }}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                <img src="https://placehold.co/250x250" alt="Product" className="w-64 h-64 object-cover mb-4" />
                <h3 className="text-sm text-gray-800 mb-2">DJI Phantom 4 PRO</h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">$739</p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-gray-300 text-gray-300" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">1,002</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
        <div className="w-7 h-6 bg-white rounded" />
      </button>
    </div>
  );
};

export default Marketplace;
