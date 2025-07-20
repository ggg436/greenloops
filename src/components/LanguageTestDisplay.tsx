import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageTestDisplay = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      <h3 className="font-semibold mb-2">Language Test</h3>
      <p>
        Current language: {i18n.language} <br />
        Language: {t('common.language')} <br />
        English: {t('common.english')} <br />
        Nepali: {t('common.nepali')} <br />
        Dashboard: {t('common.dashboard')} <br />
        Weather: {t('common.weather')}
      </p>
    </div>
  );
}; 