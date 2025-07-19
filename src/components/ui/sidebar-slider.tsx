import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarSliderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarSlider: React.FC<SidebarSliderProps> = ({
  isCollapsed,
  onToggle,
}) => {
  return (
    <button 
      onClick={onToggle}
      className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group"
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-600 transition-colors duration-200 group-hover:text-indigo-600" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-600 transition-colors duration-200 group-hover:text-indigo-600" />
        )}
      </div>
      
      {/* Animated background pulse on hover */}
      <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
};