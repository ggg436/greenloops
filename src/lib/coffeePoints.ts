import { 
  doc, 
  updateDoc, 
  increment, 
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  setDoc
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { toast } from 'sonner';

export interface CoffeeTransaction {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  points: number;
  productId?: string;
  productTitle?: string;
  message?: string;
  createdAt: Date | any;
}

export interface CoffeeRedemption {
  id: string;
  userId: string;
  userName: string;
  rewardId: string;
  rewardName: string;
  rewardDescription: string;
  pointsCost: number;
  redeemedAt: Date | any;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface CoffeeReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'discount' | 'feature' | 'badge' | 'gift';
  isActive: boolean;
  maxRedemptions?: number;
  currentRedemptions: number;
  imageUrl?: string;
  createdAt: Date | any;
  createdBy?: string; // User ID who created this reward
  isUserCreated?: boolean; // Flag to distinguish user-created rewards
}

export interface CoffeeMilestone {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  reward: string;
  icon: string;
  isAchieved: boolean;
  achievedAt?: Date | any;
}

// Predefined rewards that users can redeem
const DEFAULT_REWARDS: Omit<CoffeeReward, 'id' | 'createdAt' | 'currentRedemptions'>[] = [
  // 🎁 Physical Rewards
  {
    name: "Wireless Earpods",
    description: "Get a pair of premium wireless earpods delivered to your address",
    pointsCost: 50,
    category: "gift",
    isActive: true,
    maxRedemptions: 100,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop"
  },
  {
    name: "Smart Watch",
    description: "Receive a stylish smartwatch with fitness tracking features",
    pointsCost: 200,
    category: "gift",
    isActive: true,
    maxRedemptions: 50,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
  },
  {
    name: "Coffee Mug Set",
    description: "Beautiful ceramic coffee mug set (4 pieces) with your name engraved",
    pointsCost: 75,
    category: "gift",
    isActive: true,
    maxRedemptions: 200,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop"
  },
  {
    name: "Plant Seeds Pack",
    description: "Premium organic seeds pack with 10 different vegetable varieties",
    pointsCost: 30,
    category: "gift",
    isActive: true,
    maxRedemptions: 500,
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
  },
  {
    name: "Garden Tools Kit",
    description: "Complete gardening toolkit with gloves, trowel, and watering can",
    pointsCost: 150,
    category: "gift",
    isActive: true,
    maxRedemptions: 75,
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
  },
  
  // 💰 Discounts & Savings
  {
    name: "Marketplace Discount",
    description: "Get 15% off on your next marketplace purchase (up to $50)",
    pointsCost: 100,
    category: "discount",
    isActive: true,
    maxRedemptions: 1000,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  },
  {
    name: "Free Shipping",
    description: "Free shipping on your next 3 marketplace orders",
    pointsCost: 80,
    category: "discount",
    isActive: true,
    maxRedemptions: 300,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  },
  {
    name: "Bulk Purchase Discount",
    description: "20% off when you buy 3 or more items from the same seller",
    pointsCost: 120,
    category: "discount",
    isActive: true,
    maxRedemptions: 200,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  },
  
  // ⭐ Premium Features
  {
    name: "Premium Badge",
    description: "Display a special premium badge on your profile for 30 days",
    pointsCost: 100,
    category: "badge",
    isActive: true,
    maxRedemptions: 500,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  },
  {
    name: "Featured Product",
    description: "Your product will be featured at the top of marketplace for 48 hours",
    pointsCost: 250,
    category: "feature",
    isActive: true,
    maxRedemptions: 100,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  },
  {
    name: "Profile Boost",
    description: "Your profile will appear higher in search results for 14 days",
    pointsCost: 150,
    category: "feature",
    isActive: true,
    maxRedemptions: 300,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  },
  {
    name: "Priority Support",
    description: "Get priority customer support for 30 days with faster response times",
    pointsCost: 180,
    category: "feature",
    isActive: true,
    maxRedemptions: 150,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  },
  
  // 🎯 Special Rewards
  {
    name: "Coffee Gift",
    description: "Receive a virtual coffee gift that you can send to other users",
    pointsCost: 25,
    category: "gift",
    isActive: true,
    maxRedemptions: 2000,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop"
  },
  {
    name: "Charity Donation",
    description: "We'll donate $5 to agricultural education programs in your name",
    pointsCost: 60,
    category: "gift",
    isActive: true,
    maxRedemptions: 1000,
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
  },
  {
    name: "Tree Planting",
    description: "We'll plant 5 trees in your name to support reforestation",
    pointsCost: 90,
    category: "gift",
    isActive: true,
    maxRedemptions: 800,
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
  },
  {
    name: "Farmer Workshop",
    description: "Free access to premium farming workshop videos for 30 days",
    pointsCost: 200,
    category: "feature",
    isActive: true,
    maxRedemptions: 100,
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
  }
];

// Predefined milestones that users can achieve
const DEFAULT_MILESTONES: Omit<CoffeeMilestone, 'id' | 'isAchieved' | 'achievedAt'>[] = [
  {
    name: "Coffee Beginner",
    description: "Earn your first 25 coffee points",
    pointsRequired: 25,
    reward: "Welcome Badge + 5 Bonus Points",
    icon: "☕"
  },
  {
    name: "Coffee Enthusiast",
    description: "Reach 100 coffee points",
    pointsRequired: 100,
    reward: "Premium Badge + 10 Bonus Points",
    icon: "🌟"
  },
  {
    name: "Coffee Master",
    description: "Achieve 250 coffee points",
    pointsRequired: 250,
    reward: "Master Badge + 25 Bonus Points",
    icon: "👑"
  },
  {
    name: "Coffee Legend",
    description: "Reach 500 coffee points",
    pointsRequired: 500,
    reward: "Legend Badge + 50 Bonus Points",
    icon: "🔥"
  },
  {
    name: "Coffee Champion",
    description: "Achieve 1000 coffee points",
    pointsRequired: 1000,
    reward: "Champion Badge + 100 Bonus Points",
    icon: "🏆"
  },
  {
    name: "Coffee Hero",
    description: "Reach 2000 coffee points",
    pointsRequired: 2000,
    reward: "Hero Badge + 200 Bonus Points",
    icon: "💎"
  },
  {
    name: "Coffee God",
    description: "Achieve 5000 coffee points",
    pointsRequired: 5000,
    reward: "God Badge + 500 Bonus Points + Special Profile Frame",
    icon: "⚡"
  }
];

// Initialize default rewards in Firestore
export const initializeDefaultRewards = async (): Promise<void> => {
  try {
    const rewardsRef = collection(db, 'coffeeRewards');
    const existingRewards = await getDocs(rewardsRef);
    
    // Check if we need to add any default rewards
    const existingRewardNames = new Set();
    existingRewards.forEach(doc => {
      const data = doc.data();
      existingRewardNames.add(data.name);
    });
    
    const rewardsToAdd = DEFAULT_REWARDS.filter(reward => !existingRewardNames.has(reward.name));
    
    if (rewardsToAdd.length > 0) {
      console.log(`Initializing ${rewardsToAdd.length} default coffee rewards...`);
      const batch = [];
      
      for (const reward of rewardsToAdd) {
        const rewardData = {
          ...reward,
          currentRedemptions: 0,
          createdAt: serverTimestamp()
        };
        batch.push(addDoc(rewardsRef, rewardData));
      }
      
      await Promise.all(batch);
      console.log('Default coffee rewards initialized successfully');
    } else {
      console.log('All default rewards already exist');
    }
  } catch (error) {
    console.error('Error initializing default rewards:', error);
  }
};

// Initialize default milestones in Firestore
export const initializeDefaultMilestones = async (): Promise<void> => {
  try {
    const milestonesRef = collection(db, 'coffeeMilestones');
    const existingMilestones = await getDocs(milestonesRef);
    
    if (existingMilestones.empty) {
      console.log('Initializing default coffee milestones...');
      const batch = [];
      
      for (const milestone of DEFAULT_MILESTONES) {
        const milestoneData = {
          ...milestone,
          isAchieved: false,
          createdAt: serverTimestamp()
        };
        batch.push(addDoc(milestonesRef, milestoneData));
      }
      
      await Promise.all(batch);
      console.log('Default coffee milestones initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing default milestones:', error);
  }
};

// Get all rewards (for debugging - includes inactive ones)
export const getAllRewards = async (): Promise<CoffeeReward[]> => {
  try {
    console.log('Fetching ALL rewards (including inactive)...');
    const rewardsRef = collection(db, 'coffeeRewards');
    const querySnapshot = await getDocs(rewardsRef);
    
    console.log('Total rewards found:', querySnapshot.size);
    
    const rewards: CoffeeReward[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const reward = {
        id: doc.id,
        name: data.name,
        description: data.description,
        pointsCost: data.pointsCost,
        category: data.category,
        isActive: data.isActive,
        maxRedemptions: data.maxRedemptions,
        currentRedemptions: data.currentRedemptions || 0,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        isUserCreated: data.isUserCreated || false
      };
      
      console.log('Reward details:', reward);
      rewards.push(reward);
    });
    
    return rewards;
  } catch (error) {
    console.error('Error getting all rewards:', error);
    return [];
  }
};

// Get all available rewards
export const getAvailableRewards = async (): Promise<CoffeeReward[]> => {
  try {
    console.log('Fetching available rewards...');
    const rewardsRef = collection(db, 'coffeeRewards');
    
    // First, let's get ALL rewards to see what's in the collection
    const allRewardsSnapshot = await getDocs(rewardsRef);
    console.log('Total rewards in collection:', allRewardsSnapshot.size);
    
    allRewardsSnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Reward found:', {
        id: doc.id,
        name: data.name,
        isActive: data.isActive,
        createdBy: data.createdBy,
        isUserCreated: data.isUserCreated
      });
    });
    
    // If no rewards at all, initialize defaults first
    if (allRewardsSnapshot.empty) {
      console.log('No rewards found in collection, initializing defaults...');
      await initializeDefaultRewards();
      // Get all rewards again after initialization
      const newAllRewardsSnapshot = await getDocs(rewardsRef);
      console.log('Rewards after initialization:', newAllRewardsSnapshot.size);
    }
    
    // Now get the filtered rewards with proper error handling
    let querySnapshot;
    try {
      const q = query(
        rewardsRef,
        where('isActive', '==', true),
        orderBy('pointsCost', 'asc')
      );
      querySnapshot = await getDocs(q);
    } catch (queryError) {
      console.error('Error with filtered query, trying without orderBy:', queryError);
      // Try without orderBy if there's an error
      const q = query(
        rewardsRef,
        where('isActive', '==', true)
      );
      querySnapshot = await getDocs(q);
    }
    
    console.log('Active rewards found:', querySnapshot.size);
    
    const rewards: CoffeeReward[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      rewards.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        pointsCost: data.pointsCost,
        category: data.category,
        isActive: data.isActive,
        maxRedemptions: data.maxRedemptions,
        currentRedemptions: data.currentRedemptions || 0,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        isUserCreated: data.isUserCreated || false
      });
    });
    
    console.log('Processed rewards:', rewards);
    
    return rewards;
  } catch (error) {
    console.error('Error getting available rewards:', error);
    // Try to initialize defaults on error
    try {
      await initializeDefaultRewards();
    } catch (initError) {
      console.error('Error initializing default rewards:', initError);
    }
    return [];
  }
};

// Get all milestones
export const getAllMilestones = async (): Promise<CoffeeMilestone[]> => {
  try {
    const milestonesRef = collection(db, 'coffeeMilestones');
    const q = query(milestonesRef, orderBy('pointsRequired', 'asc'));
    
    const querySnapshot = await getDocs(q);
    const milestones: CoffeeMilestone[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      milestones.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        pointsRequired: data.pointsRequired,
        reward: data.reward,
        icon: data.icon,
        isAchieved: data.isAchieved || false,
        achievedAt: data.achievedAt
      });
    });
    
    return milestones;
  } catch (error) {
    console.error('Error getting milestones:', error);
    return [];
  }
};

// Check and award milestones based on current points
export const checkAndAwardMilestones = async (userId: string, currentPoints: number): Promise<CoffeeMilestone[]> => {
  try {
    const milestonesRef = collection(db, 'coffeeMilestones');
    const q = query(milestonesRef, orderBy('pointsRequired', 'asc'));
    
    const querySnapshot = await getDocs(q);
    const newlyAchieved: CoffeeMilestone[] = [];
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      const milestoneId = docSnapshot.id;
      
      // Check if milestone is achieved but not yet marked
      if (currentPoints >= data.pointsRequired && !data.isAchieved) {
        // Mark milestone as achieved
        await updateDoc(doc(db, 'coffeeMilestones', milestoneId), {
          isAchieved: true,
          achievedAt: serverTimestamp()
        });
        
        newlyAchieved.push({
          id: milestoneId,
          name: data.name,
          description: data.description,
          pointsRequired: data.pointsRequired,
          reward: data.reward,
          icon: data.icon,
          isAchieved: true,
          achievedAt: serverTimestamp()
        });
        
        // Award bonus points based on milestone
        const bonusPoints = getMilestoneBonusPoints(data.pointsRequired);
        if (bonusPoints > 0) {
          const userRef = doc(db, 'users', userId);
          await updateDoc(userRef, {
            coffeePoints: increment(bonusPoints),
            updatedAt: serverTimestamp()
          });
        }
      }
    }
    
    return newlyAchieved;
  } catch (error) {
    console.error('Error checking milestones:', error);
    return [];
  }
};

// Get bonus points for achieving a milestone
const getMilestoneBonusPoints = (pointsRequired: number): number => {
  switch (pointsRequired) {
    case 25: return 5;
    case 100: return 10;
    case 250: return 25;
    case 500: return 50;
    case 1000: return 100;
    case 2000: return 200;
    case 5000: return 500;
    default: return 0;
  }
};

// Create a new user reward
export const createUserReward = async (
  name: string,
  description: string,
  pointsCost: number,
  category: 'discount' | 'feature' | 'badge' | 'gift',
  maxRedemptions?: number,
  imageUrl?: string
): Promise<boolean> => {
  if (!auth.currentUser) {
    console.error('No authenticated user found');
    toast.error("User not authenticated");
    return false;
  }

  try {
    console.log('Creating reward for user:', auth.currentUser.uid);
    console.log('Reward data:', { name, description, pointsCost, category, maxRedemptions, imageUrl });
    
    const rewardData = {
      name: name.trim(),
      description: description.trim(),
      pointsCost: pointsCost,
      category: category,
      isActive: true,
      maxRedemptions: maxRedemptions || 100,
      currentRedemptions: 0,
      imageUrl: imageUrl || '',
      createdBy: auth.currentUser.uid,
      isUserCreated: true,
      createdAt: serverTimestamp()
    };

    console.log('Saving reward data to Firestore:', rewardData);
    
    // Verify we're still authenticated before saving
    if (!auth.currentUser) {
      throw new Error("User authentication lost during reward creation");
    }
    
    const rewardsRef = collection(db, 'coffeeRewards');
    const docRef = await addDoc(rewardsRef, rewardData);
    
    console.log('Reward added successfully with ID:', docRef.id);
    
    // Verify the reward was saved by fetching it back
    try {
      const savedReward = await getDoc(docRef);
      if (savedReward.exists()) {
        console.log('Reward verified in Firestore:', savedReward.data());
      } else {
        console.error('Reward was not saved properly');
      }
    } catch (verifyError) {
      console.error('Error verifying saved reward:', verifyError);
    }
    
    toast.success(`🎉 Reward "${name}" created successfully!`);
    return true;
  } catch (error: any) {
    console.error('Error creating user reward:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    toast.error(error.message || 'Failed to create reward');
    return false;
  }
};

// Get user-created rewards
export const getUserCreatedRewards = async (): Promise<CoffeeReward[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return [];
    }

    const rewardsRef = collection(db, 'coffeeRewards');
    const q = query(
      rewardsRef,
      where('createdBy', '==', currentUser.uid),
      where('isUserCreated', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CoffeeReward));
  } catch (error) {
    console.error('Error getting user created rewards:', error);
    return [];
  }
};

// Update user reward
export const updateUserReward = async (
  rewardId: string,
  updates: {
    name?: string;
    description?: string;
    pointsCost?: number;
    category?: 'discount' | 'feature' | 'badge' | 'gift';
    isActive?: boolean;
    maxRedemptions?: number;
    imageUrl?: string;
  }
): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Verify ownership
    const rewardRef = doc(db, 'coffeeRewards', rewardId);
    const rewardDoc = await getDoc(rewardRef);
    
    if (!rewardDoc.exists()) {
      throw new Error("Reward not found");
    }

    const rewardData = rewardDoc.data();
    if (rewardData.createdBy !== currentUser.uid) {
      throw new Error("You can only edit your own rewards");
    }

    await updateDoc(rewardRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });

    toast.success("Reward updated successfully!");
    return true;
  } catch (error: any) {
    console.error('Error updating user reward:', error);
    toast.error(error.message || 'Failed to update reward');
    return false;
  }
};

// Delete any reward (admin or owner)
export const deleteReward = async (rewardId: string): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    console.log('Attempting to delete reward:', rewardId);

    // Get the reward to check ownership and permissions
    const rewardRef = doc(db, 'coffeeRewards', rewardId);
    const rewardDoc = await getDoc(rewardRef);
    
    if (!rewardDoc.exists()) {
      throw new Error("Reward not found");
    }

    const rewardData = rewardDoc.data();
    console.log('Reward data:', rewardData);

    // Check if user can delete this reward
    // Users can delete their own rewards or if they're admin
    const canDelete = rewardData.createdBy === currentUser.uid || 
                     rewardData.createdBy === currentUser.uid; // For now, allow users to delete their own rewards

    if (!canDelete) {
      throw new Error("You can only delete rewards you created");
    }

    // Check if anyone has redeemed this reward
    if (rewardData.currentRedemptions > 0) {
      throw new Error("Cannot delete reward that has been redeemed");
    }

    // Delete the reward
    await deleteDoc(rewardRef);
    console.log('Reward deleted successfully');
    
    toast.success("Reward deleted successfully!");
    return true;
  } catch (error: any) {
    console.error('Error deleting reward:', error);
    toast.error(error.message || 'Failed to delete reward');
    return false;
  }
};

// Delete user reward (existing function - for backward compatibility)
export const deleteUserReward = async (rewardId: string): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Verify ownership
    const rewardRef = doc(db, 'coffeeRewards', rewardId);
    const rewardDoc = await getDoc(rewardRef);
    
    if (!rewardDoc.exists()) {
      throw new Error("Reward not found");
    }

    const rewardData = rewardDoc.data();
    if (rewardData.createdBy !== currentUser.uid) {
      throw new Error("You can only delete your own rewards");
    }

    // Check if anyone has redeemed this reward
    if (rewardData.currentRedemptions > 0) {
      throw new Error("Cannot delete reward that has been redeemed");
    }

    await deleteDoc(rewardRef);
    toast.success("Reward deleted successfully!");
    return true;
  } catch (error: any) {
    console.error('Error deleting user reward:', error);
    toast.error(error.message || 'Failed to delete reward');
    return false;
  }
};

// Redeem coffee points for a reward
export const redeemCoffeePoints = async (
  rewardId: string,
  rewardName: string,
  rewardDescription: string,
  pointsCost: number
): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Check if user has enough points
    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error("User profile not found");
    }

    const userData = userDoc.data();
    const currentCoffeePoints = userData.coffeePoints || 0;

    if (currentCoffeePoints < pointsCost) {
      throw new Error(`Insufficient coffee points. You have ${currentCoffeePoints} points, but need ${pointsCost} points.`);
    }

    // Check if reward is still available
    const rewardRef = doc(db, 'coffeeRewards', rewardId);
    const rewardDoc = await getDoc(rewardRef);
    
    if (!rewardDoc.exists()) {
      throw new Error("Reward not found");
    }

    const rewardData = rewardDoc.data();
    
    if (!rewardData.isActive) {
      throw new Error("This reward is no longer available");
    }

    if (rewardData.maxRedemptions && rewardData.currentRedemptions >= rewardData.maxRedemptions) {
      throw new Error("This reward has reached its maximum redemptions");
    }

    // Deduct points from user
    await updateDoc(userRef, {
      coffeePoints: increment(-pointsCost),
      updatedAt: serverTimestamp()
    });

    // Update reward redemption count
    await updateDoc(rewardRef, {
      currentRedemptions: increment(1),
      updatedAt: serverTimestamp()
    });

    // Create redemption record
    const redemptionData = {
      userId: currentUser.uid,
      userName: userData.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
      rewardId,
      rewardName,
      rewardDescription,
      pointsCost,
      redeemedAt: serverTimestamp(),
      status: 'completed' as const
    };

    await addDoc(collection(db, 'coffeeRedemptions'), redemptionData);

    toast.success(`🎉 Successfully redeemed "${rewardName}" for ${pointsCost} coffee points!`);
    return true;
  } catch (error: any) {
    console.error('Error redeeming coffee points:', error);
    toast.error(error.message || 'Failed to redeem coffee points');
    return false;
  }
};

// Get user's redemption history
export const getUserRedemptions = async (): Promise<CoffeeRedemption[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return [];

    const redemptionsRef = collection(db, 'coffeeRedemptions');
    const q = query(
      redemptionsRef,
      where('userId', '==', currentUser.uid),
      orderBy('redeemedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const redemptions: CoffeeRedemption[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      redemptions.push({
        id: doc.id,
        userId: data.userId,
        userName: data.userName,
        rewardId: data.rewardId,
        rewardName: data.rewardName,
        rewardDescription: data.rewardDescription,
        pointsCost: data.pointsCost,
        redeemedAt: data.redeemedAt,
        status: data.status
      });
    });
    
    return redemptions;
  } catch (error) {
    console.error('Error getting user redemptions:', error);
    return [];
  }
};

// Get coffee points balance
export const getCoffeePointsBalance = async (): Promise<number> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return 0;
    }

    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return 0;
    }

    const userData = userDoc.data();
    const coffeePoints = userData.coffeePoints || 0;
    
    // If user doesn't have coffeePoints field, initialize it
    if (userData.coffeePoints === undefined) {
      console.log('Initializing coffee points for user:', currentUser.uid);
      await updateDoc(userRef, {
        coffeePoints: 0,
        updatedAt: serverTimestamp()
      });
    }
    
    return coffeePoints;
  } catch (error) {
    console.error('Error getting coffee points balance:', error);
    return 0;
  }
};

// Send coffee points to another user
export const sendCoffeePoints = async (
  toUserId: string,
  toUserName: string,
  points: number,
  productId?: string,
  productTitle?: string,
  message?: string
): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    if (currentUser.uid === toUserId) {
      throw new Error("You cannot send coffee points to yourself");
    }

    if (points <= 0) {
      throw new Error("Coffee points must be greater than 0");
    }

    const currentUserRef = doc(db, 'users', currentUser.uid);
    const currentUserDoc = await getDoc(currentUserRef);
    
    if (!currentUserDoc.exists()) {
      throw new Error("User profile not found");
    }

    const currentUserData = currentUserDoc.data();
    const currentCoffeePoints = currentUserData.coffeePoints || 0;

    if (currentCoffeePoints < points) {
      throw new Error(`Insufficient coffee points. You have ${currentCoffeePoints} points, but trying to send ${points} points.`);
    }

    await updateDoc(currentUserRef, {
      coffeePoints: increment(-points),
      updatedAt: serverTimestamp()
    });

    const toUserRef = doc(db, 'users', toUserId);
    // Get recipient's current balance before updating
    const recipientDoc = await getDoc(toUserRef);
    const recipientData = recipientDoc.data();
    const currentRecipientBalance = recipientData?.coffeePoints || 0;
    
    await updateDoc(toUserRef, {
      coffeePoints: increment(points),
      updatedAt: serverTimestamp()
    });

    // Check for milestones for the recipient
    const newBalance = currentRecipientBalance + points;
    const newlyAchieved = await checkAndAwardMilestones(toUserId, newBalance);
    
    if (newlyAchieved.length > 0) {
      const milestoneNames = newlyAchieved.map(m => m.name).join(', ');
      toast.success(`🎉 ${toUserName} achieved new milestones: ${milestoneNames}!`);
    }

    const transactionData = {
      fromUserId: currentUser.uid,
      fromUserName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
      toUserId,
      toUserName,
      points,
      productId,
      productTitle,
      message,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, 'coffeeTransactions'), transactionData);

    toast.success(`☕ Sent ${points} coffee points to ${toUserName}!`);
    return true;
  } catch (error: any) {
    console.error('Error sending coffee points:', error);
    toast.error(error.message || 'Failed to send coffee points');
    return false;
  }
};

// Get coffee transactions history
export const getCoffeeTransactions = async (): Promise<CoffeeTransaction[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return [];

    const transactionsRef = collection(db, 'coffeeTransactions');
    const q = query(
      transactionsRef,
      where('fromUserId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const transactions: CoffeeTransaction[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({
        id: doc.id,
        fromUserId: data.fromUserId,
        fromUserName: data.fromUserName,
        toUserId: data.toUserId,
        toUserName: data.toUserName,
        points: data.points,
        productId: data.productId,
        productTitle: data.productTitle,
        message: data.message,
        createdAt: data.createdAt
      });
    });
    
    return transactions;
  } catch (error) {
    console.error('Error getting coffee transactions:', error);
    return [];
  }
};

// Ensure user profile exists with coffee points field
export const ensureUserProfile = async (): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create user profile if it doesn't exist
      console.log('Creating user profile for:', currentUser.uid);
      await setDoc(userRef, {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
        coffeePoints: 100, // Give new users 100 coffee points to start
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      toast.success('🎉 Welcome! You received 100 coffee points to get started!');
      return true;
    } else {
      // Check if coffeePoints field exists
      const userData = userDoc.data();
      if (userData.coffeePoints === undefined) {
        console.log('Adding coffeePoints field to existing user profile');
        await updateDoc(userRef, {
          coffeePoints: 100, // Give existing users 100 coffee points
          updatedAt: serverTimestamp()
        });
        toast.success('🎉 You received 100 coffee points!');
      }
      return true;
    }
  } catch (error) {
    console.error('Error ensuring user profile:', error);
    return false;
  }
};