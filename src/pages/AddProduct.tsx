import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useAuthContext } from '@/lib/AuthProvider';
import { toast } from 'sonner';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { convertImagesToBase64 } from '@/lib/products';
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

const CATEGORIES = [
  'Drones',
  'Cameras',
  'Smartphones',
  'Computers',
  'Audio',
  'Gaming',
  'Smart Home',
  'Wearables',
  'Other'
];

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'New',
    quantity: '1',
    features: '',
    specifications: ''
  });

  // If not logged in, redirect to login
  React.useEffect(() => {
    if (!user) {
      toast.error("Please login to add products");
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Validate file type
    const validTypeFiles = selectedFiles.filter(file => {
      const isValid = file.type.startsWith('image/');
      if (!isValid) toast.error(`${file.name} is not a valid image file`);
      return isValid;
    });

    // Validate file size - max 1MB per file for base64
    const validFiles = validTypeFiles.filter(file => {
      const isValidSize = file.size <= 1 * 1024 * 1024; // 1MB
      if (!isValidSize) toast.error(`${file.name} exceeds the 1MB limit`);
      return isValidSize;
    });

    if (validFiles.length === 0) return;

    // Limit to 5 files
    const totalFiles = [...files, ...validFiles];
    if (totalFiles.length > 5) {
      toast.error('You can upload maximum 5 images');
      return;
    }

    // Create preview URLs for the images
    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    
    setFiles(prev => [...prev, ...validFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeFile = (index: number) => {
    // Remove the file and its preview
    setFiles(files.filter((_, i) => i !== index));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const convertImages = async (): Promise<string[]> => {
    if (files.length === 0) return [];
    
    setIsUploading(true);
    try {
      console.log(`Converting ${files.length} product images to base64`);
      const base64Images = await convertImagesToBase64(files);
      console.log('Images converted to base64 successfully');
      return base64Images;
    } catch (error) {
      console.error('Error converting images to base64:', error);
      toast.error('Failed to process images');
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to add a product');
      return;
    }

    // Validate form data
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!formData.price.trim() || isNaN(parseFloat(formData.price))) {
      toast.error('Please enter a valid price');
      return;
    }
    
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }

    // Images are optional, proceed without validation
    
    setIsSubmitting(true);
    try {
      // Convert images to base64 if any
      const imageUrls = files.length > 0 ? await convertImages() : [];
      
      // Add product to Firestore
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        condition: formData.condition,
        quantity: parseInt(formData.quantity),
        features: formData.features.trim() ? formData.features.split('\n') : [],
        specifications: formData.specifications,
        images: imageUrls,
        // Set a default placeholder image if no images were uploaded
        coverImage: imageUrls.length > 0 ? imageUrls[0] : 'https://placehold.co/400x400?text=No+Image',
        sellerId: user.uid,
        sellerName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        sellerPhoto: user.photoURL || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        rating: 0,
        reviews: 0
      };
      
      const docRef = await addDoc(collection(db, 'products'), productData);
      toast.success('Product added successfully!');
      navigate(`/dashboard/marketplace/${docRef.id}`);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Product</CardTitle>
          <CardDescription>Fill in the details below to list your product in the marketplace.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. DJI Phantom 4 Pro Drone"
                    required
                  />
                </div>
                
                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 599.99"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Condition */}
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select 
                    value={formData.condition}
                    onValueChange={(value) => handleSelectChange('condition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Condition" />
                    </SelectTrigger>
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
                
                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product..."
                  rows={4}
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="features">Key Features (one per line)</Label>
                <Textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="4K Camera&#10;30 Minutes Flight Time&#10;Object Avoidance"
                  rows={3}
                />
                <p className="text-sm text-gray-500">Enter each feature on a new line</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specifications">Technical Specifications</Label>
                <Textarea
                  id="specifications"
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  placeholder="Detailed specifications of your product..."
                  rows={3}
                />
              </div>
            </div>
            
            {/* Product Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Images</h3>
              
              {/* Image upload area */}
              <div 
                onClick={() => fileInputRef.current?.click()} 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <h3 className="text-gray-700 font-medium">Upload Images</h3>
                  <p className="text-sm text-gray-500">
                    Drag & drop or click to upload (max 5 images)
                  </p>
                  <p className="text-xs text-gray-400">
                    Max size: 1MB per image (JPG, PNG, WebP)
                  </p>
                </div>
              </div>
              
              {/* Preview Images */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Info about images */}
              {previewUrls.length === 0 && (
                <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Product Images</AlertTitle>
                  <AlertDescription>
                    Adding product images is recommended but optional. Products with images tend to get more views and sales.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-4 border-t p-6">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/marketplace')}
            disabled={isUploading || isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isUploading || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Add Product
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddProduct; 