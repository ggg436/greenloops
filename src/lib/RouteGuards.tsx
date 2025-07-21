import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuthContext } from './AuthProvider';

// Role-based route protection component
export const FarmerRoute: React.FC<{ 
  children: React.ReactNode, 
  redirectTo?: string 
}> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  const { user, loading: authLoading } = useAuthContext();
  const { profile, loading: profileLoading } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for both auth and profile to load
    if (!authLoading && !profileLoading) {
      // If user is not authenticated, redirect to login
      if (!user) {
        navigate('/login');
        return;
      }
      
      // If user is not a farmer, redirect
      if (profile && profile.userType !== 'farmer') {
        navigate(redirectTo);
      }
    }
  }, [user, profile, authLoading, profileLoading, navigate, redirectTo]);

  if (authLoading || profileLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Only render children if user is authenticated and is a farmer
  return (user && profile && profile.userType === 'farmer') ? <>{children}</> : null;
}; 