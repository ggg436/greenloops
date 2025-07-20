
import React from 'react';
import { 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Tractor,
  Wheat,
  Sprout,
  Star,
  BarChart3,
  Rss,
  Stethoscope,
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  CloudSun,
  DollarSign,
  Settings,
  HelpCircle,
  Home
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '@/context/SidebarContext';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

export const AppSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigationItems = [
    { 
      title: t('common.dashboard'), 
      url: '/dashboard',
      icon: BarChart3
    },
    { 
      title: t('common.feed'), 
      url: '/dashboard/feed',
      icon: Rss
    },
    { 
      title: t('common.drPlant'), 
      url: '/dashboard/dr-plant',
      icon: Stethoscope
    },
    { 
      title: t('common.marketplace'), 
      url: '/dashboard/marketplace',
      icon: ShoppingCart
    },
    { 
      title: t('common.orders'), 
      url: '/dashboard/orders',
      icon: ShoppingBag
    },
    { 
      title: t('common.transactions'), 
      url: '/dashboard/transactions',
      icon: CreditCard
    },
    { 
      title: t('common.weather'), 
      url: '/dashboard/weather',
      icon: CloudSun
    },
    { 
      title: t('common.pricing'), 
      url: '/dashboard/pricing',
      icon: DollarSign
    },
    { 
      title: t('common.help'), 
      url: '/dashboard/help',
      icon: HelpCircle
    },
  ];

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
    <aside className={`${isCollapsed ? 'w-[110px]' : 'w-[300px]'} fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-10 transform scale-90 origin-left`}>
      {/* Custom Sidebar Slider */}
      <div className="absolute -right-3 top-6 z-50">
        <button 
          onClick={toggleSidebar}
          className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-fadeIn"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-blue-600 transition-colors duration-200" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-blue-600 transition-colors duration-200" />
          )}
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-10 animate-pulse"></div>
        </button>
      </div>

      {/* Brand Section - positioned above top edge */}
      <NavLink to="/dashboard" className="flex items-center px-6 h-[50px] flex-shrink-0 bg-white -mt-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <Tractor className="w-6 h-6 text-white absolute" />
          <Wheat className="w-4 h-4 text-white absolute bottom-1 right-1" />
          <Sprout className="w-3 h-3 text-white absolute top-1 right-1" />
        </div>
        <span className={`ml-3 text-2xl font-semibold transition-opacity duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 block'}`}>
          Krishak AI
        </span>
      </NavLink>

      {/* Scrollable Section - Contains navigation, pro card, and language switcher */}
      <div className="flex-1 overflow-y-auto pt-2 flex flex-col justify-between">
        {/* Navigation Section */}
        <div>
          <nav className="px-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={`flex items-center ${isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-5'} py-4 rounded-2xl cursor-pointer transition-colors ${
                    isActive(item.url)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  title={isCollapsed ? item.title : ''}
                >
                  <item.icon className={`w-7 h-7 flex-shrink-0 ${isActive(item.url) ? 'text-white' : 'text-gray-400'}`} />
                  <span className={`text-lg font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                    {!isCollapsed && item.title}
                  </span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Pro Version Card */}
          <div className={`p-5 ${isCollapsed ? 'hidden' : 'block'}`}>
            <div className="bg-blue-600 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="text-lg font-semibold">Krishak AI {t('common.pro')}</span>
              </div>
              <p className="text-base text-blue-100 mb-4">
                {t('common.access')}
              </p>
              <Button 
                className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-2xl text-base py-3"
                onClick={handleGetPro}
              >
                {t('common.get')} {t('common.pro')}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Sign Out - Now positioned at the bottom of scrollable area */}
        <div className="p-4 pb-8">
          <button 
            onClick={handleSignOut}
            className={`flex items-center ${isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-5'} py-4 text-gray-600 rounded-2xl cursor-pointer hover:bg-gray-50 w-full`}
            title={isCollapsed ? t('common.signOut') : ''}
          >
            <LogOut className="w-7 h-7 flex-shrink-0 text-gray-400" />
            <span className={`text-lg font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              {!isCollapsed && t('common.signOut')}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
