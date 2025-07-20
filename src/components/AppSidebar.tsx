
import React from 'react';
import { 
  Home, 
  BarChart3, 
  Users,
  Wheat,
  ShoppingCart, 
  CreditCard, 
  FileText,
  Calendar,
  Bell,
  Settings, 
  HelpCircle, 
  Stethoscope, 
  Rss,
  DollarSign,
  CloudSun,
  Star,
  LogOut,
  Trophy,
  Package,
  MessageSquare,
  Box,
  ShoppingBag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useSidebar } from '@/context/SidebarContext';

export const AppSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
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
      title: t('common.settings'), 
      url: '/dashboard/settings', 
      icon: Settings 
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

  return (
    <aside className={`${isCollapsed ? 'w-[90px]' : 'w-[320px]'} fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-10`}>
      {/* Custom Sidebar Slider */}
      <div className="absolute -right-3 top-6 z-50">
        <button 
          onClick={toggleSidebar}
          className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-fadeIn"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-indigo-600 transition-colors duration-200" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-indigo-600 transition-colors duration-200" />
          )}
          <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-10 animate-pulse"></div>
        </button>
      </div>

      {/* Brand Section - Keep outside scrollable area */}
      <div className="px-6 py-8 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Box className="w-6 h-6 text-white" />
          </div>
          <span className={`text-2xl font-semibold transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            {!isCollapsed && 'Krishak AI'}
          </span>
        </div>
      </div>

      {/* Scrollable Section - Contains navigation, pro card, and language switcher */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation Section */}
        <nav className="px-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={`flex items-center ${isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-5'} py-4 rounded-2xl cursor-pointer transition-colors ${
                  isActive(item.url)
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={isCollapsed ? item.title : ''}
              >
                <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive(item.url) ? 'text-white' : 'text-gray-400'}`} />
                <span className={`text-base font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                  {!isCollapsed && item.title}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Pro Version Card */}
        <div className={`p-5 ${isCollapsed ? 'hidden' : 'block'}`}>
          <div className="bg-indigo-600 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-lg font-semibold">Krishak AI {t('common.pro')}</span>
            </div>
            <p className="text-base text-indigo-100 mb-4">
              {t('common.access')}
            </p>
            <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl text-base py-3">
              {t('common.get')} {t('common.pro')}
            </Button>
          </div>
        </div>

        {/* Language Switcher */}
        {!isCollapsed && (
          <div className="px-5 pt-2 pb-2">
            <LanguageSwitcher />
          </div>
        )}
        
        {/* Extra space to ensure everything is visible when scrolled to bottom */}
        <div className="h-4"></div>
      </div>

      {/* Sign Out - Fixed at bottom */}
      <div className="p-5 border-t flex-shrink-0">
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-5'} py-4 text-gray-600 rounded-2xl cursor-pointer hover:bg-gray-50`}
             title={isCollapsed ? t('common.signOut') : ''}>
          <LogOut className="w-6 h-6 flex-shrink-0 text-gray-400" />
          <span className={`text-base font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            {!isCollapsed && t('common.signOut')}
          </span>
        </div>
      </div>
    </aside>
  );
};
