
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Shield, Truck, RotateCcw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in a real app this would come from an API
  const product = {
    id: id,
    name: "DJI Phantom 4 Pro",
    price: 739,
    originalPrice: 899,
    rating: 4.5,
    reviewCount: 1002,
    inStock: true,
    description: "The DJI Phantom 4 Pro is a professional drone equipped with a 20-megapixel camera capable of shooting 4K/60fps video and Burst Mode stills at 14 fps. The onboard camera has been redesigned to use a 1-inch 20-megapixel CMOS sensor.",
    features: [
      "4K Ultra HD Video Recording",
      "20MP Camera with 1-inch CMOS Sensor",
      "Obstacle Sensing in 5 Directions",
      "30-Minute Max Flight Time",
      "7km HD Video Transmission",
      "Intelligent Flight Modes"
    ],
    specifications: {
      "Flight Time": "30 minutes",
      "Max Speed": "72 km/h (45 mph)",
      "Camera Resolution": "20 MP",
      "Video Recording": "4K/60fps",
      "Weight": "1388 g",
      "Operating Temperature": "0° to 40°C (32° to 104°F)"
    },
    images: [
      "https://placehold.co/600x600",
      "https://placehold.co/600x600",
      "https://placehold.co/600x600",
      "https://placehold.co/600x600"
    ]
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="border-b border-gray-200 px-6 py-4">
        <button 
          onClick={() => navigate('/dashboard/marketplace')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${
                        star <= Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : star === Math.ceil(product.rating)
                          ? 'fill-yellow-400/50 text-yellow-400'
                          : 'fill-gray-300 text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
              <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About this item</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
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

            {/* Quantity and Actions */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-900">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleAddToCart}
                  variant="outline" 
                  className="flex-1 flex items-center gap-2 py-3"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700"
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Add to Wishlist
                </Button>
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
      </div>
    </div>
  );
};

export default ProductDetails;
