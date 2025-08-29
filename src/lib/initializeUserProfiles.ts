import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile } from './users';

/**
 * Helper function to ensure that user profiles are properly initialized
 * This should be called when a user logs in or when the app starts
 */
export const initializeUserProfile = async (userId?: string): Promise<UserProfile | null> => {
  try {
    // If no userId is provided, use the current authenticated user
    const currentUser = auth.currentUser;
    if (!currentUser && !userId) {
      console.log("No user is authenticated and no userId provided");
      return null;
    }
    
    const targetUserId = userId || currentUser!.uid;
    const userRef = doc(db, 'users', targetUserId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create a new user profile if it doesn't exist
      const newUserProfile = {
        displayName: currentUser?.displayName || 'Anonymous',
        photoURL: currentUser?.photoURL || '/placeholder.svg',
        handle: `@${currentUser?.displayName?.toLowerCase().replace(/\s/g, '') || 'anonymous'}`,
        email: currentUser?.email || '',
        followers: [],
        following: [],
        followersCount: 0,
        followingCount: 0,
        coffeePoints: 10, // Start with 10 coffee points
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(userRef, newUserProfile);
      console.log(`User profile created for ${targetUserId}`);
      
      return {
        id: targetUserId,
        displayName: newUserProfile.displayName,
        photoURL: newUserProfile.photoURL,
        handle: newUserProfile.handle,
        followers: newUserProfile.followers,
        following: newUserProfile.following,
        followersCount: newUserProfile.followersCount,
        followingCount: newUserProfile.followingCount,
        coffeePoints: newUserProfile.coffeePoints
      };
    } else {
      // Update user profile with followers/following fields if they don't exist
      const userData = userDoc.data();
      let needsUpdate = false;
      const updates: Record<string, any> = {};
      
      if (userData.followers === undefined) {
        updates.followers = [];
        needsUpdate = true;
      }
      
      if (userData.following === undefined) {
        updates.following = [];
        needsUpdate = true;
      }
      
      if (userData.followersCount === undefined) {
        updates.followersCount = 0;
        needsUpdate = true;
      }
      
      if (userData.followingCount === undefined) {
        updates.followingCount = 0;
        needsUpdate = true;
      }
      
      if (userData.coffeePoints === undefined) {
        updates.coffeePoints = 10;
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        updates.updatedAt = new Date();
        await setDoc(userRef, updates, { merge: true });
        console.log(`User profile updated for ${targetUserId}`);
      }
      
      return {
        id: targetUserId,
        displayName: userData.displayName || 'Anonymous',
        photoURL: userData.photoURL || '/placeholder.svg',
        handle: userData.handle || `@${userData.displayName?.toLowerCase().replace(/\s/g, '') || 'anonymous'}`,
        followers: userData.followers || [],
        following: userData.following || [],
        followersCount: userData.followersCount || 0,
        followingCount: userData.followingCount || 0,
        coffeePoints: userData.coffeePoints || 10
      };
    }
  } catch (error) {
    console.error("Error initializing user profile:", error);
    return null;
  }
};

/**
 * Initialize all user profiles in the database
 * This is useful for adding new fields to existing profiles
 */
export const initializeAllUserProfiles = async () => {
  try {
    const usersRef = collection(db, 'users');
    const userDocs = await getDocs(usersRef);
    
    const updatePromises = userDocs.docs.map(doc => initializeUserProfile(doc.id));
    await Promise.all(updatePromises);
    
    console.log(`Updated ${userDocs.size} user profiles`);
    return true;
  } catch (error) {
    console.error("Error initializing all user profiles:", error);
    return false;
  }
}; 