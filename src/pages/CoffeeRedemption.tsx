import React, { useState, useEffect } from 'react';
import { Coffee, Gift, Star, Zap, Percent, Badge as BadgeIcon, Plus, Edit, Trash2, MoreVertical, RefreshCw, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/lib/AuthProvider';
import { 
  getAvailableRewards, 
  redeemCoffeePoints, 
  getUserRedemptions,
  getCoffeePointsBalance,
  getCoffeeTransactions,
  getAllMilestones,
  createUserReward,
  getUserCreatedRewards,
  updateUserReward,
  deleteUserReward,
  deleteReward,
  initializeDefaultRewards,
  initializeDefaultMilestones,
  ensureUserProfile,
  getAllRewards,
  type CoffeeReward,
  type CoffeeRedemption,
  type CoffeeTransaction,
  type CoffeeMilestone
} from '@/lib/coffeePoints';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { resizeImageFile, uploadFile } from '@/lib/storage';
import { doc, updateDoc, increment, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'discount':
      return <Percent className="w-5 h-5 text-green-600" />;
    case 'badge':
      return <BadgeIcon className="w-5 h-5 text-blue-600" />;
    case 'feature':
      return <Zap className="w-5 h-5 text-yellow-600" />;
    case 'gift':
      return <Gift className="w-5 h-5 text-purple-600" />;
    default:
      return <Star className="w-5 h-5 text-gray-600" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'discount':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'badge':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'feature':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'gift':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function CoffeeRedemption() {
  const { user } = useAuthContext();
  const [rewards, setRewards] = useState<CoffeeReward[]>([]);
  const [redemptions, setRedemptions] = useState<CoffeeRedemption[]>([]);
  const [transactions, setTransactions] = useState<CoffeeTransaction[]>([]);
  const [milestones, setMilestones] = useState<CoffeeMilestone[]>([]);
  const [userRewards, setUserRewards] = useState<CoffeeReward[]>([]);
  const [coffeePoints, setCoffeePoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReward, setEditingReward] = useState<CoffeeReward | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [showDemoRewards, setShowDemoRewards] = useState(false);
  const [showUserRewardsOnly, setShowUserRewardsOnly] = useState(true);
  const [activeTab, setActiveTab] = useState('rewards');

  // Function to enhance light images for better visibility
  const enhanceImageVisibility = (imgElement: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0);
    
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let totalBrightness = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        totalBrightness += (r + g + b) / 3;
      }
      
      const averageBrightness = totalBrightness / (data.length / 4);
      
      if (averageBrightness > 200) {
        imgElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        imgElement.style.border = '2px solid #d1d5db';
        imgElement.style.backgroundColor = '#f9fafb';
      } else {
        imgElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        imgElement.style.border = '1px solid #e5e7eb';
        imgElement.style.backgroundColor = 'white';
      }
    } catch (error) {
      imgElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      imgElement.style.border = '1px solid #e5e7eb';
      imgElement.style.backgroundColor = 'white';
    }
  }; 

  useEffect(() => {
    if (user) {
      ensureUserProfile().then(() => {
        initializeDefaultRewards();
        initializeDefaultMilestones();
        loadData();
      });
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [rewardsData, redemptionsData, transactionsData, milestonesData, userRewardsData, pointsBalance] = await Promise.all([
        getAvailableRewards(),
        getUserRedemptions(),
        getCoffeeTransactions(),
        getAllMilestones(),
        getUserCreatedRewards(),
        getCoffeePointsBalance()
      ]);

      setRewards(rewardsData);
      setRedemptions(redemptionsData);
      setTransactions(transactionsData);
      setMilestones(milestonesData);
      setUserRewards(userRewardsData);
      setCoffeePoints(pointsBalance);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeem = async (reward: CoffeeReward) => {
    if (!user) {
      toast.error('Please log in to redeem rewards');
      return;
    }

    if (coffeePoints < reward.pointsCost) {
      toast.error('Insufficient leafcoin');
      return;
    }

    setIsRedeeming(true);
    try {
      const success = await redeemCoffeePoints(reward.id, reward.pointsCost);
      if (success) {
        toast.success(`Successfully redeemed "${reward.name}"!`);
        await loadData();
      } else {
        toast.error('Failed to redeem reward');
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      toast.error('Failed to redeem reward');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }
      
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageSelection = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!selectedImage) return null;
    
    setIsUploading(true);
    try {
      const base64Image = await fileToBase64(selectedImage);
      return base64Image;
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmitReward = async (data: {
    name: string;
    description: string;
    pointsCost: number;
    category: 'discount' | 'feature' | 'badge' | 'gift';
    maxRedemptions?: number;
    imageUrl?: string;
  }) => {
    if (!user) {
      toast.error('Please log in to create rewards');
      return;
    }

    try {
      let imageUrl = data.imageUrl || '';
      
      if (selectedImage) {
        const uploadedImage = await handleImageUpload();
        if (uploadedImage) {
          imageUrl = uploadedImage;
        }
      }

      const success = await createUserReward(
        data.name,
        data.description,
        data.pointsCost,
        data.category,
        data.maxRedemptions || 100,
        imageUrl
      );

      if (success) {
        toast.success('Reward created successfully!');
        setShowAddForm(false);
        clearImageSelection();
        await loadData();
      } else {
        toast.error('Failed to create reward');
      }
    } catch (error) {
      console.error('Error creating reward:', error);
      toast.error('Failed to create reward');
    }
  };

  const handleDeleteAvailableReward = async (reward: CoffeeReward) => {
    const confirmMessage = `Are you sure you want to delete "${reward.name}"?\n\n` +
      `• Leafcoin Cost: ${reward.pointsCost} 🍃\n` +
      `• Category: ${reward.category}\n` +
      `• Redemptions: ${reward.currentRedemptions}/${reward.maxRedemptions || '∞'}\n\n` +
      `This action cannot be undone.`;
    
    if (confirm(confirmMessage)) {
      try {
        const success = await deleteReward(reward.id);
        if (success) {
          toast.success(`Reward "${reward.name}" deleted successfully!`);
          await loadData();
        }
      } catch (error) {
        console.error('Error deleting reward:', error);
        toast.error('Failed to delete reward');
      }
    }
  };

  const resetFormState = () => {
    setShowAddForm(false);
    setEditingReward(null);
    clearImageSelection();
  };

  const refreshRewards = async () => {
    await loadData();
    toast.success('Rewards refreshed!');
  };

  const filteredRewards = rewards.filter(reward => {
    if (showUserRewardsOnly) return reward.isUserCreated;
    if (!showDemoRewards) return reward.isUserCreated;
    return true;
  });

  const userCreatedRewards = userRewards.filter(reward => reward.createdBy === user?.uid);
  const affordableRewards = userCreatedRewards.filter(reward => reward.pointsCost <= coffeePoints);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leafcoin Redemption</h1>
            <p className="text-gray-600 mt-2">Redeem your leafcoin for exclusive rewards and benefits.</p>
          </div>
          <Button onClick={loadData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Leafcoin Summary */}
        <Card className="mb-8 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🍃</div>
                <div>
                  <h2 className="text-2xl font-bold text-orange-900">
                    {coffeePoints} Leafcoin
                  </h2>
                  <p className="text-orange-700">Available for redemption</p>
                  <p className="text-sm text-orange-600 mt-1">
                    Next milestone bonus: 5 at 25 leafcoin
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-orange-600">Current Balance</div>
                <div className="text-3xl font-bold text-orange-900">{coffeePoints} 🍃</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="add">Add Products</TabsTrigger>
            <TabsTrigger value="redemptions">My Redemptions</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          {/* Available Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            {/* Rewards Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <h3 className="font-semibold text-blue-900">
                        Rewards Summary
                      </h3>
                      <p className="text-sm text-blue-700">
                        {userRewards.length} user-created rewards available • 
                        You can afford {affordableRewards.length} user-created rewards with your current balance • 
                        You created {userCreatedRewards.length} reward(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={refreshRewards}
                      className="text-blue-700 border-blue-300 hover:bg-blue-50"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Rewards
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Rewards Grid */}
            {filteredRewards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
                {filteredRewards.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    {/* Reward Image */}
                    {reward.imageUrl && (
                      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200 overflow-hidden">
                        <img
                          src={reward.imageUrl}
                          alt={reward.name}
                          className="w-full h-full object-contain p-3 rounded-t-lg transition-all duration-200 hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                          onLoad={(e) => {
                            const target = e.target as HTMLImageElement;
                            enhanceImageVisibility(target);
                          }}
                          style={{
                            backgroundColor: 'white',
                            objectFit: 'contain',
                            maxHeight: '100%',
                            maxWidth: '100%',
                            borderRadius: '8px'
                          }}
                        />
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg">
                          <div className="text-center">
                            <Gift className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">Image not available</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-4">
                      {/* Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <BadgeUI 
                          variant={reward.isUserCreated ? "default" : "secondary"}
                          className={reward.isUserCreated ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                        >
                          {reward.isUserCreated ? "Your Reward" : "Demo Reward"}
                        </BadgeUI>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {reward.isUserCreated && (
                              <>
                                <DropdownMenuItem onClick={() => handleDeleteAvailableReward(reward)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Reward Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{reward.name}</h3>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-orange-600">
                            {reward.pointsCost} 🍃
                          </div>
                          <div className="text-sm text-gray-500">
                            {reward.currentRedemptions}/{reward.maxRedemptions || '∞'} redeemed
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress to afford:</span>
                            <span className="font-medium">{coffeePoints}/{reward.pointsCost}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((coffeePoints / reward.pointsCost) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Call to Action */}
                        {coffeePoints >= reward.pointsCost ? (
                          <Button 
                            onClick={() => handleRedeem(reward)}
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={isRedeeming}
                          >
                            {isRedeeming ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Redeeming...
                              </>
                            ) : (
                              <>
                                <Gift className="mr-2 h-4 w-4" />
                                Redeem Reward
                              </>
                            )}
                          </Button>
                        ) : (
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">
                              Support other users in the marketplace to earn more leafcoin!
                            </p>
                            <Button 
                              variant="outline" 
                              className="w-full text-green-600 border-green-300"
                              disabled
                            >
                              Insufficient Points
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Rewards Available
                  </h3>
                  <p className="text-gray-600 mb-6">
                    No rewards are currently available for redemption.
                  </p>
                  <Button onClick={() => setActiveTab('add')} className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Reward
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Add Products Tab */}
          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Reward</CardTitle>
                <CardDescription>
                  Create a new reward that users can redeem with their leafcoin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Reward
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs can be added here */}
        </Tabs>

        {/* Add/Edit Reward Dialog */}
        <Dialog open={showAddForm} onOpenChange={(open) => {
          if (!open) {
            resetFormState();
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Reward</DialogTitle>
              <DialogDescription>
                Create a new reward that users can redeem with their leafcoin
              </DialogDescription>
            </DialogHeader>
            
            <RewardForm 
              reward={editingReward}
              onSubmit={handleSubmitReward}
              onCancel={() => {
                resetFormState();
              }}
              selectedImage={selectedImage}
              imagePreview={imagePreview}
              isUploading={isUploading}
              onImageSelect={handleImageSelect}
              onClearImage={clearImageSelection}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Reward Form Component
interface RewardFormProps {
  reward?: CoffeeReward | null;
  onSubmit: (data: {
    name: string;
    description: string;
    pointsCost: number;
    category: 'discount' | 'feature' | 'badge' | 'gift';
    maxRedemptions?: number;
    imageUrl?: string;
  }) => void;
  onCancel: () => void;
  selectedImage: File | null;
  imagePreview: string;
  isUploading: boolean;
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
}

function RewardForm({ reward, onSubmit, onCancel, selectedImage, imagePreview, isUploading, onImageSelect, onClearImage }: RewardFormProps) {
  const [formData, setFormData] = useState({
    name: reward?.name || '',
    description: reward?.description || '',
    pointsCost: reward?.pointsCost || 50,
    category: reward?.category || 'gift' as const,
    maxRedemptions: reward?.maxRedemptions || 100,
    imageUrl: reward?.imageUrl || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error in form submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Reward Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter reward name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pointsCost">Leafcoin Cost</Label>
          <Input
            id="pointsCost"
            type="number"
            min="1"
            value={formData.pointsCost}
            onChange={(e) => handleInputChange('pointsCost', parseInt(e.target.value) || 0)}
            placeholder="50"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your reward"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gift">Gift</SelectItem>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="feature">Feature</SelectItem>
              <SelectItem value="badge">Badge</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxRedemptions">Max Redemptions</Label>
          <Input
            id="maxRedemptions"
            type="number"
            min="1"
            value={formData.maxRedemptions}
            onChange={(e) => handleInputChange('maxRedemptions', parseInt(e.target.value) || 0)}
            placeholder="100"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Product Image</Label>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={onImageSelect}
              className="flex-1"
              disabled={isUploading}
            />
            {selectedImage && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClearImage}
                disabled={isUploading}
              >
                Clear
              </Button>
            )}
          </div>
          
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-w-xs h-32 object-cover rounded-lg border border-gray-200"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          )}
          
          <p className="text-xs text-gray-500">
            Supported formats: JPG, PNG, GIF. Max size: 10MB.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            'Create Reward'
          )}
        </Button>
      </div>
    </form>
  );
} 