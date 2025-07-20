import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  const changeLanguage = (language: string) => {
    console.log("Changing language to:", language);
    i18n.changeLanguage(language);
    
    // Store the language preference
    localStorage.setItem('i18nextLng', language);
    
    // For complete site translation, reload the page
    // This ensures all components properly re-render with the new language
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };
  
  // Get current language code (first 2 characters)
  const langCode = currentLanguage.substring(0, 2);
  
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <Select
        value={langCode}
        onValueChange={changeLanguage}
      >
        <SelectTrigger className="w-[120px] bg-white border-gray-200">
          <SelectValue>{t('common.language')}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t('common.english')}</SelectItem>
          <SelectItem value="ne">{t('common.nepali')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}; 