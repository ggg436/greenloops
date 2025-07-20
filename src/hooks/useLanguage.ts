import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  
  useEffect(() => {
    // This will force components using this hook to re-render when language changes
    const handleLanguageChanged = (lng: string) => {
      console.log('Language changed to:', lng);
      setCurrentLanguage(lng);
    };

    // Subscribe to language changes
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Cleanup
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return { 
    currentLanguage,
    isNepali: currentLanguage.startsWith('ne'),
    isEnglish: currentLanguage.startsWith('en'),
    changeLanguage: i18n.changeLanguage
  };
}; 