import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const GoogleTranslateButton = () => {
  const translatePage = () => {
    // Get the current URL
    const currentUrl = window.location.href;
    
    // Google Translate URL format
    const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=ne&u=${encodeURIComponent(currentUrl)}`;
    
    // Open Google Translate in a new tab
    window.open(googleTranslateUrl, '_blank');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center bg-white border border-gray-200"
      onClick={translatePage}
    >
      <Globe className="mr-2 h-4 w-4" />
      Translate to Nepali
    </Button>
  );
}; 