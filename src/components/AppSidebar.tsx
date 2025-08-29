
import React, { useEffect, useState } from 'react';
import { 
  LogOut,
  Menu,
  X,
  Tractor,
  Wheat,
  Sprout,
  Star,
  BarChart3,
  Rss,
  ShoppingCart,
  CloudSun,
  DollarSign,
  Settings,
  HelpCircle,
  Home,
  LineChart,
  Bell,
  MessageSquare,
  Coffee
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '@/context/SidebarContext';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { useUserProfile } from '@/hooks/useUserProfile';

export const AppSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { profile, loading } = useUserProfile();
  const [navigationItems, setNavigationItems] = useState<Array<{
    title: string;
    url: string;
    icon: React.ElementType;
    showFor: string[];
  }>>([]);

  useEffect(() => {
    // Define all navigation items
    const allItems = [
      { 
        title: t('common.dashboard'), 
        url: '/dashboard',
        icon: BarChart3,
        showFor: ['farmer', 'user']  // Show for all users
      },
      { 
        title: t('common.feed'), 
        url: '/dashboard/feed',
        icon: Rss,
        showFor: ['farmer', 'user']
      },

      {
        title: t('common.data'),
        url: '/dashboard/data',
        icon: LineChart,
        showFor: ['farmer']  // Only show for farmers
      },
      { 
        title: t('common.marketplace'), 
        url: '/dashboard/marketplace',
        icon: ShoppingCart,
        showFor: ['farmer', 'user']
      },

      { 
        title: 'Notifications', 
        url: '/dashboard/notifications',
        icon: Bell,
        showFor: ['farmer', 'user']
      },
      { 
        title: 'My Chats', 
        url: '/dashboard/my-chats',
        icon: MessageSquare,
        showFor: ['farmer', 'user']
      },
      { 
        title: 'Leafcoin Redemption', 
        url: '/dashboard/coffee-redemption',
        icon: Coffee,
        showFor: ['farmer', 'user']
      },
      { 
        title: 'AI Video Rec', 
        url: '/dashboard/ai-video-rec',
        icon: LineChart,
        showFor: ['farmer', 'user']
      },
      { 
        title: t('common.weather'), 
        url: '/dashboard/weather',
        icon: CloudSun,
        showFor: ['farmer', 'user']
      },
      { 
        title: t('common.pricing'), 
        url: '/dashboard/pricing',
        icon: DollarSign,
        showFor: ['farmer', 'user']
      },
      { 
        title: t('common.help'), 
        url: '/dashboard/help',
        icon: HelpCircle,
        showFor: ['farmer', 'user']
      },
    ];

    // Filter navigation items based on user type
    const userType = profile?.userType || 'user';
    const filteredItems = allItems.filter(item => 
      item.showFor.includes(userType)
    );

    setNavigationItems(filteredItems);
  }, [profile, t]);

  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(url);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success(t('common.signedOut'));
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error(t('common.signOutError'));
    }
  };

  const handleGetPro = () => {
    navigate('/dashboard/pricing');
  };

  return (
    <>
      {/* YouTube-style Hamburger Menu Button - Fixed Top Left */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? (
          <Menu className="w-6 h-6 text-gray-700" />
        ) : (
          <X className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Main Sidebar - YouTube-style sliding animation */}
      <aside 
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-out z-40 ${
          isCollapsed 
            ? '-translate-x-full lg:translate-x-0 lg:w-[80px]' 
            : 'translate-x-0 w-[280px]'
        }`}
      >
        {/* Desktop Toggle Button - Only visible on large screens */}
        <div className="hidden lg:block absolute -right-3 top-6 z-40">
          <button 
            onClick={toggleSidebar}
            className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4 text-blue-600" />
            ) : (
              <X className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>

        {/* Brand Section */}
        <NavLink to="/dashboard" className="flex items-center px-6 h-[70px] flex-shrink-0 bg-white border-b border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            <Tractor className="w-6 h-6 text-white absolute" />
            <Wheat className="w-4 h-4 text-white absolute bottom-1 right-1" />
            <Sprout className="w-3 h-3 text-white absolute top-1 right-1" />
          </div>
          <span className={`ml-3 text-xl font-bold text-gray-800 transition-all duration-300 ${
            isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
          }`}>
            GreenLoop
          </span>
        </NavLink>

        {/* Scrollable Section */}
        <div className="flex-1 overflow-y-auto pt-4 flex flex-col justify-between">
          {/* Navigation Section */}
          <div>
            <nav className="px-4">
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.url}
                    to={item.url}
                    className={`flex items-center ${
                      isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-4'
                    } py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      isActive(item.url)
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                    title={isCollapsed ? item.title : ''}
                  >
                    <item.icon className={`w-6 h-6 flex-shrink-0 ${
                      isActive(item.url) ? 'text-white' : 'text-gray-500'
                    }`} />
                    <span className={`font-medium transition-all duration-300 ${
                      isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
                    }`}>
                      {!isCollapsed && item.title}
                    </span>
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Pro Version Card */}
            <div className={`p-4 ${isCollapsed ? 'hidden' : 'block'}`}>
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold">GreenLoop Pro</span>
                </div>
                <p className="text-xs text-green-100 mb-3">
                  Get access to all features and benefits
                </p>
                <Button 
                  className="w-full bg-white text-green-600 hover:bg-green-50 rounded-lg text-sm py-2"
                  onClick={handleGetPro}
                >
                  Get Pro
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sign Out */}
          <div className="p-4 pb-6">
            <button 
              onClick={handleSignOut}
              className={`flex items-center ${
                isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-4'
              } py-3 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 hover:text-gray-800 w-full transition-all duration-200`}
              title={isCollapsed ? t('common.signOut') : ''}
            >
              <LogOut className="w-6 h-6 flex-shrink-0 text-gray-500" />
              <span className={`font-medium transition-all duration-300 ${
                isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                {!isCollapsed && t('common.signOut')}
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile - YouTube-style */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};
