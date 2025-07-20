import i18n from './i18n';

// Function to translate day names
export const translateDay = (day: string): string => {
  const dayMap: Record<string, string> = {
    "Monday": i18n.t('days.monday'),
    "Tuesday": i18n.t('days.tuesday'),
    "Wednesday": i18n.t('days.wednesday'),
    "Thursday": i18n.t('days.thursday'),
    "Friday": i18n.t('days.friday'),
    "Saturday": i18n.t('days.saturday'),
    "Sunday": i18n.t('days.sunday'),
  };
  
  return dayMap[day] || day;
};

// Format numbers with thousand separators
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat(i18n.language).format(num);
};

// Format currency based on current language
export const formatCurrency = (amount: number): string => {
  const currencySymbol = i18n.t('currency.symbol');
  const formattedAmount = new Intl.NumberFormat(i18n.language).format(amount);
  
  // In English, currency symbol goes before the amount
  if (i18n.language.startsWith('en')) {
    return `${currencySymbol}${formattedAmount}`;
  }
  
  // In Nepali, currency symbol goes after the amount with a space
  return `${formattedAmount} ${currencySymbol}`;
};

// Format percentages
export const formatPercent = (value: number): string => {
  return `${new Intl.NumberFormat(i18n.language, { 
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value / 100)}`;
};

// Helper for chart tick formatters
export const kFormatter = (value: number): string => {
  const absValue = Math.abs(value);
  
  if (absValue >= 1000) {
    return `${new Intl.NumberFormat(i18n.language).format(value / 1000)}k`;
  }
  
  return new Intl.NumberFormat(i18n.language).format(value);
}; 