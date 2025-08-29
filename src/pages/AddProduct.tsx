import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  Check,
  Loader2,
  AlertCircle,
  TriangleAlert
} from 'lucide-react';
import { useAuthContext } from '@/lib/AuthProvider';
import { toast } from 'sonner';
import { addProduct } from '@/lib/products';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertNotification } from '@/components/ui/alert-notification';

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Helper function to resize image on client side
const resizeImage = async (file: File, maxSize: number = 800): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw resized image
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
          resolve(resizedFile);
        } else {
          reject(new Error('Failed to resize image'));
        }
      }, 'image/jpeg', 0.8);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

const CATEGORIES = [
  'Seeds',
  'Fertilizers',
  'Pesticides',
  'Farming Tools',
  'Irrigation Equipment',
  'Harvesting Equipment',
  'Organic Products',
  'Animal Feed',
  'Agricultural Machinery'
];

type ListingType = 'sell' | 'giveaway' | 'exchange';

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [showPriceNotice, setShowPriceNotice] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'New',
    quantity: '1',
    features: '',
    specifications: '',
    listingType: 'sell' as ListingType,
    exchangeWith: ''
  });

  React.useEffect(() => {
    if (!user) {
      toast.error("Please login to add products");
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'price' && formData.listingType !== 'sell') {
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceAttempt = () => {
    if (formData.listingType !== 'sell') {
      setShowPriceNotice(true);
      setTimeout(() => setShowPriceNotice(false), 2500);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Check file sizes (limit to 5MB total for base64 storage)
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (totalSize > maxSize) {
      toast.error('Total file size must be less than 5MB for base64 storage');
      return;
    }
    
    // Check individual file sizes
    const oversizedFiles = selectedFiles.filter(file => file.size > 2 * 1024 * 1024); // 2MB per file
    if (oversizedFiles.length > 0) {
      toast.error('Individual files must be less than 2MB. Images will be automatically resized.');
    }
    
    setFiles(selectedFiles);
    
    // Create preview URLs
    const urls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const removeSelectedImage = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeAllImages = () => {
    setFiles([]);
    setPreviewUrls([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to add products");
      return;
    }

    if (!formData.title.trim() || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.listingType === 'sell' && !formData.price.trim()) {
      toast.error('Please enter a price for selling');
      return;
    }

    if (formData.listingType === 'exchange' && !formData.exchangeWith.trim()) {
      toast.error('Please specify what you want to exchange with');
      return;
    }

    setIsSubmitting(true);
    try {
      setIsUploading(true);
      
      // Process images: resize and convert to base64
      let imageUrls: string[] = [];
      if (files.length > 0) {
        console.log('Processing', files.length, 'images...');
        imageUrls = await Promise.all(
          files.map(async (file) => {
            try {
              // Resize image first
              const resizedFile = await resizeImage(file, 800);
              // Convert resized image to base64
              const base64 = await fileToBase64(resizedFile);
              console.log('Image processed successfully:', file.name);
              return base64;
            } catch (error) {
              console.error('Error processing image:', file.name, error);
              // Fallback to original file if resizing fails
              return await fileToBase64(file);
            }
          })
        );
        console.log('All images processed successfully');
      }
      
      setIsUploading(false);
      
      const normalizedPrice = formData.listingType === 'sell' ? parseFloat(formData.price) : 0;
      
      const productData = {
        title: formData.title,
        description: formData.description,
        price: normalizedPrice,
        category: formData.category,
        condition: formData.condition,
        quantity: parseInt(formData.quantity),
        features: formData.features.trim() ? formData.features.split('\n') : [],
        specifications: formData.specifications,
        images: imageUrls,
        coverImage: imageUrls.length > 0 ? imageUrls[0] : 'https://placehold.co/400x400?text=No+Image',
        rating: 0,
        reviews: 0,
        listingType: formData.listingType,
        comments: [],
        averageRating: 0,
        totalRatings: 0,
        ...(formData.listingType === 'exchange' && { exchangeWith: formData.exchangeWith.trim() })
      };

      console.log('Creating product with data:', productData);
      const productId = await addProduct(productData);
      console.log('Product created successfully with ID:', productId);
      
      toast.success('Product added successfully!');
      navigate(`/dashboard/marketplace/${productId}`);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: General + Pricing */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">General Information</CardTitle>
                <CardDescription>Provide basic details about your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 1. Product Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. DJI Phantom 4 Pro Drone" required />
                </div>
                {/* 2. Listing Type & 3. Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="listingType">Listing Type *</Label>
                    <Select value={formData.listingType} onValueChange={(value) => handleSelectChange('listingType', value)}>
                      <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sell">Sell</SelectItem>
                        <SelectItem value="giveaway">Giveaway</SelectItem>
                        <SelectItem value="exchange">Exchange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (Rs) {formData.listingType === 'sell' ? '*' : ''}</Label>
                    <div className="relative">
                      <Input id="price" name="price" type="number" step="0.01" min="0" value={formData.listingType === 'sell' ? formData.price : '0'} onChange={handleInputChange} onFocus={handlePriceAttempt} onClick={handlePriceAttempt} placeholder={formData.listingType === 'giveaway' ? 'Free' : '0.00'} readOnly={formData.listingType !== 'sell'} className={formData.listingType !== 'sell' ? 'cursor-not-allowed opacity-70' : ''} required={formData.listingType === 'sell'} />
                      {formData.listingType !== 'sell' && (
                        <Alert className="absolute top-full left-0 mt-2 w-full" variant="warning">
                          <TriangleAlert className="h-4 w-4 mr-2" />
                          <AlertDescription>
                            For Exchange, specify what you want to exchange with. Price is not required.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
                {formData.listingType === 'exchange' && (
                  <div className="space-y-2">
                    <Label htmlFor="exchangeWith">Exchange With *</Label>
                    <Input id="exchangeWith" name="exchangeWith" value={formData.exchangeWith} onChange={handleInputChange} placeholder="e.g. Seeds, Tools, Fertilizer..." required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe your product..." rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="features">Key Features (one per line)</Label>
                    <Textarea id="features" name="features" value={formData.features} onChange={handleInputChange} placeholder="4K Camera\n30 Minutes Flight Time\nObject Avoidance" rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specifications">Technical Specifications</Label>
                    <Textarea id="specifications" name="specifications" value={formData.specifications} onChange={handleInputChange} placeholder="Detailed specifications of your product..." rows={3} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Pricing & Stock</CardTitle>
                <CardDescription>Control availability information.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={handleInputChange} placeholder="1" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
                    <SelectTrigger><SelectValue placeholder="Select Condition" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="For Parts">For Parts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Upload Images + Category (sticky) */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-6 self-start">
            {/* Image Upload Section */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Product Images</CardTitle>
                <CardDescription>Upload up to 5 images. Images will be automatically resized for optimal storage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" multiple className="hidden" />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Click to upload images</p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 2MB each</p>
                    </div>
                  </div>
                </div>

                {/* Image Previews */}
                {previewUrls.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Selected Images ({previewUrls.length}/5)</h4>
                      <button
                        type="button"
                        onClick={removeAllImages}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove All
                      </button>
                    </div>
                    
                    {/* Processing indicator */}
                    {isUploading && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing images... Please wait.
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => removeSelectedImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="category">Product Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard/marketplace')} disabled={isSubmitting || isUploading}>Cancel</Button>
          <Button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Create Product'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct; 