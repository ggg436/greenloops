import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { getCurrentUserProfile, UserProfile } from '../lib/users';
import { useAuthContext } from '../lib/AuthProvider';

export function useUserProfile() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userProfile = await getCurrentUserProfile();
        
        if (isMounted) {
          setProfile(userProfile);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching user profile:', err);
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return { profile, loading, error, isProfileLoaded: !loading && !!profile };
} 