import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Resources using flat translation keys which is the recommended approach
const resources = {
  en: {
    translation: {
      // Common translations
      'common.language': 'Language',
      'common.english': 'English',
      'common.nepali': 'Nepali',
      'common.dashboard': 'Dashboard',
      'common.feed': 'Feed',
      'common.data': 'Data',
      'common.marketplace': 'Marketplace',
      'common.weather': 'Weather',
      'common.pricing': 'Pricing',
      'common.settings': 'Settings',
      'common.help': 'Help',
      'common.coffeeRedemption': 'Coffee Redemption',
      'common.signOut': 'Sign Out',
      'common.save': 'Save',

      'common.loading': 'Loading',
      

      
      // Time periods
      'time.thisWeek': 'This Week',
      'time.lastWeek': 'Last Week',
      'time.thisMonth': 'This Month',
      'time.lastMonth': 'Last Month',
      'time.thisQuarter': 'This Quarter',
      
      // Data page
      'data.title': 'Dashboard Data Management',
      'data.description': 'Customize your dashboard charts with your own data',
      'data.revenue': 'Revenue',
      'data.cropDistribution': 'Crop Distribution',
      'data.cropYield': 'Crop Yield',
      'data.customerSatisfaction': 'Customer Satisfaction',
      'data.targetVsReality': 'Target vs Reality',
      'data.trafficSources': 'Traffic Sources',
      'data.topProducts': 'Top Products',
      'data.editRevenueData': 'Edit Revenue Data',
      'data.editCropDistribution': 'Edit Crop Distribution Data',
      'data.editCropYield': 'Edit Crop Yield Data',
      'data.editCustomerSatisfaction': 'Edit Customer Satisfaction Data',
      'data.editTargetVsReality': 'Edit Target vs Reality Data',
      'data.editTrafficSources': 'Edit Traffic Sources Data',
      'data.editTopProducts': 'Edit Top Products Data',
      'data.value': 'Value',
      'data.yield': 'Yield',
      'data.productName': 'Product Name',
      'data.sales': 'Sales',
      'data.loadError': 'Failed to load your chart data',
      'data.saveSuccess': 'Chart data saved successfully',
      'data.saveError': 'Failed to save chart data',
      
      // Days of the week
      'days.monday': 'Monday',
      'days.tuesday': 'Tuesday',
      'days.wednesday': 'Wednesday',
      'days.thursday': 'Thursday',
      'days.friday': 'Friday',
      'days.saturday': 'Saturday',
      'days.sunday': 'Sunday',
      
      // Chart titles
      'chart.totalRevenue': 'Total Revenue',
      'chart.onlineSales': 'Online Sales',
      'chart.offlineSales': 'Offline Sales',
      'chart.customerSatisfaction': 'Customer Satisfaction',
      'chart.targetVsReality': 'Target vs Reality',
      'chart.reality': 'Reality',
      'chart.target': 'Target',
      'chart.cropYield': 'Crop Yield Report',
      'chart.cropDistribution': 'Crop Distribution',
      'chart.trafficSources': 'Traffic Sources',
      'chart.topProducts': 'Top Products',
      'chart.lastMonth': 'Last Month',
      'chart.thisMonth': 'This Month',
      'chart.noDataAvailable': 'No data available',
      'chart.noDataMessage': 'Please add data to view the chart visualization',
      
      // Stats cards
      'stats.todaysYield': "TODAY'S YIELD",
      'stats.totalRevenue': 'TOTAL REVENUE',
      'stats.totalFarmers': 'TOTAL FARMERS',
      
      // Currency
      'currency.symbol': '$',
      'currency.code': 'USD',
      
      // Other common words
      'common.get': 'Get',
      'common.pro': 'Pro',
      'common.access': 'Get access to all features and benefits',
      
      // Dashboard components
      'dashboard.visitorInsights': 'Visitor Insights',
      'dashboard.loyalCustomers': 'Loyal Customers',
      'dashboard.newCustomers': 'New Customers',
      'dashboard.uniqueCustomers': 'Unique Customers',
      'dashboard.todaySales': 'Today\'s Sales',
      'dashboard.salesSummary': 'Summary of sales activity today',
      'dashboard.totalSales': 'Total Sales',
      'dashboard.totalOrder': 'Total Order',
      'dashboard.productSold': 'Product Sold',
      'dashboard.fromYesterday': 'from yesterday',
      'dashboard.export': 'Export',
      'dashboard.lastMonth': 'Last Month',
      'dashboard.thisMonth': 'This Month',
      'dashboard.last7Days': 'Last 7 Days',
      'dashboard.last30Days': 'Last 30 Days',
      'dashboard.last90Days': 'Last 90 Days',
      'dashboard.last7Months': 'Last 7 Months',
      'dashboard.last6Months': 'Last 6 Months',
      'dashboard.last12Months': 'Last 12 Months',
      'dashboard.thisYear': 'This Year',
      'dashboard.lastYear': 'Last Year',
      'dashboard.name': 'Name',
      'dashboard.popularity': 'Popularity',
      'dashboard.sales': 'Sales',
      'dashboard.realitySales': 'Reality Sales',
      'dashboard.targetSales': 'Target Sales',
      'dashboard.currentSeason': 'Current Season',
      'dashboard.lastSeason': 'Last Season',
      'dashboard.yearlyAverage': 'Yearly Average',
      'dashboard.distribution': 'Distribution',
      'dashboard.temperature': 'Temperature',
      'dashboard.exportPDF': 'Export PDF',
      'dashboard.12Months': '12 Months',
      'dashboard.6Months': '6 Months',
      'dashboard.30Days': '30 Days',
      'dashboard.7Days': '7 Days',
      

      
      // Farmers Section
      'farmers.title': 'Recent Farmers',
      'farmers.seeAll': 'SEE ALL FARMERS →',
      'farmers.summary': 'Top farmers by revenue this month',
      'farmers.name': 'Name',
      'farmers.email': 'Email',
      'farmers.location': 'Location',
      'farmers.revenue': 'Revenue',
      
      // Months
      'months.jan': 'Jan',
      'months.feb': 'Feb',
      'months.mar': 'Mar',
      'months.apr': 'Apr',
      'months.may': 'May',
      'months.jun': 'Jun',
      'months.jul': 'Jul',
      'months.aug': 'Aug',
      'months.sep': 'Sep',
      'months.oct': 'Oct',
      'months.nov': 'Nov',
      'months.dec': 'Dec',

      // Crop types
      'crops.wheat': 'Wheat',
      'crops.corn': 'Corn',
      'crops.rice': 'Rice',
      'crops.barley': 'Barley',
      'crops.others': 'Others',

      // Traffic sources
      'traffic.direct': 'Direct',
      'traffic.referral': 'Referral',
      'traffic.socialMedia': 'Social Media',
      'traffic.twitter': 'Twitter',

      // Products
      'products.homeDecor': 'Home Decor Range',
      'products.disneyBag': 'Disney Princess Pink Bag IB',
      'products.bathroomEssentials': 'Bathroom Essentials',
      'products.appleWatches': 'Apple Smartwatches',
    }
  },
  ne: {
    translation: {
      // Common translations
      'common.language': 'भाषा',
      'common.english': 'अंग्रेजी',
      'common.nepali': 'नेपाली',
      'common.dashboard': 'ड्यासबोर्ड',
      'common.feed': 'फिड',
      'common.data': 'डाटा',
      'common.marketplace': 'मार्केटप्लेस',
      'common.weather': 'मौसम',
      'common.pricing': 'मूल्य निर्धारण',
      'common.settings': 'सेटिङ्स',
      'common.help': 'मद्दत',
      'common.coffeeRedemption': 'कफी पोइन्ट रिडेम्प्शन',
      'common.signOut': 'साइन आउट',
      'common.save': 'सुरक्षित गर्नुहोस्',
      'common.messaging': 'संदेशहरू',
      'common.loading': 'लोड गर्दै',
      
      // Messaging translations
      'messaging.description': 'अन्य उपभोक्ता सहकारी र वास्तविक समयमा चैट गर्नुहोस्',
      'messaging.searchChats': 'चैटहरू खोज्नुहोस्',
      'messaging.recentChats': 'हालैका चैटहरू',
      'messaging.newChat': 'नयाँ चैट',
      'messaging.noChats': 'कुनै चैट भेटिएन',
      'messaging.noChat': 'कुनै चैट चयन गरिएन',
      'messaging.selectChat': 'सूचीमा चैट चयन गर्नुहोस् वा नयाँ चैट सुरु गर्नुहोस्',
      'messaging.startChat': 'नयाँ चैट सुरु गर्नुहोस्',
      'messaging.typeMessage': 'संदेश प्रकार गर्नुहोस्...',
      'messaging.selectUser': 'उपभोक्ता चयन गर्नुहोस्',
      'messaging.searchUsers': 'उपभोक्ता खोज्नुहोस्',
      'messaging.noUsers': 'कुनै उपभोक्ता भेटिएन',
      'messaging.noMessages': 'कुनै संदेश भेटिएन। चैट सुरु गर्नुहोस्!',
      'messaging.allUsers': 'सबै उपभोक्ताहरू',
      
      // Time periods
      'time.thisWeek': 'यो हप्ता',
      'time.lastWeek': 'गत हप्ता',
      'time.thisMonth': 'यो महिना',
      'time.lastMonth': 'गत महिना',
      'time.thisQuarter': 'यो त्रैमासिक',
      
      // Data page
      'data.title': 'ड्यासबोर्ड डाटा व्यवस्थापन',
      'data.description': 'आफ्नो ड्यासबोर्ड चार्टहरू आफ्नै डाटा सँग अनुकूलन गर्नुहोस्',
      'data.revenue': 'आम्दानी',
      'data.cropDistribution': 'फसल वितरण',
      'data.cropYield': 'फसल उत्पादन',
      'data.customerSatisfaction': 'ग्राहक सन्तुष्टि',
      'data.targetVsReality': 'लक्ष्य बनाम वास्तविकता',
      'data.trafficSources': 'ट्राफिक स्रोतहरू',
      'data.topProducts': 'शीर्ष उत्पादनहरू',
      'data.editRevenueData': 'आम्दानी डाटा सम्पादन गर्नुहोस्',
      'data.editCropDistribution': 'फसल वितरण डाटा सम्पादन गर्नुहोस्',
      'data.editCropYield': 'फसल उत्पादन डाटा सम्पादन गर्नुहोस्',
      'data.editCustomerSatisfaction': 'ग्राहक सन्तुष्टि डाटा सम्पादन गर्नुहोस्',
      'data.editTargetVsReality': 'लक्ष्य बनाम वास्तविकता डाटा सम्पादन गर्नुहोस्',
      'data.editTrafficSources': 'ट्राफिक स्रोतहरू डाटा सम्पादन गर्नुहोस्',
      'data.editTopProducts': 'शीर्ष उत्पादनहरू डाटा सम्पादन गर्नुहोस्',
      'data.value': 'मान',
      'data.yield': 'उत्पादन',
      'data.productName': 'उत्पादन नाम',
      'data.sales': 'बिक्री',
      'data.loadError': 'तपाईंको चार्ट डाटा लोड गर्न असफल',
      'data.saveSuccess': 'चार्ट डाटा सफलतापूर्वक सुरक्षित गरियो',
      'data.saveError': 'चार्ट डाटा सुरक्षित गर्न असफल',
      
      // Days of the week
      'days.monday': 'सोमबार',
      'days.tuesday': 'मंगलबार',
      'days.wednesday': 'बुधबार',
      'days.thursday': 'बिहिबार',
      'days.friday': 'शुक्रबार',
      'days.saturday': 'शनिबार',
      'days.sunday': 'आइतबार',
      
      // Chart titles
      'chart.totalRevenue': 'कुल राजस्व',
      'chart.onlineSales': 'अनलाइन बिक्री',
      'chart.offlineSales': 'अफलाइन बिक्री',
      'chart.customerSatisfaction': 'ग्राहक सन्तुष्टि',
      'chart.targetVsReality': 'लक्ष्य बनाम वास्तविकता',
      'chart.cropYield': 'बाली उत्पादन प्रतिवेदन',
      'chart.cropDistribution': 'बाली वितरण',
      'chart.trafficSources': 'ट्राफिक स्रोतहरू',
      'chart.topProducts': 'शीर्ष उत्पादनहरू',
      'chart.noDataAvailable': 'कुनै डाटा उपलब्ध छैन',
      'chart.noDataMessage': 'चार्ट हेर्न कृपया डाटा थप्नुहोस्',
      
      // Stats cards
      'stats.todaysYield': "आजको उत्पादन",
      'stats.totalRevenue': 'कुल राजस्व',
      'stats.totalFarmers': 'कुल किसानहरू',
      
      // Currency
      'currency.symbol': 'रू',
      'currency.code': 'NPR',
      
      // Other common words
      'common.get': 'प्राप्त गर्नुहोस्',
      'common.pro': 'प्रो',
      'common.access': 'सबै सुविधाहरू र लाभहरूमा पहुँच प्राप्त गर्नुहोस्',
      
      // Dashboard components
      'dashboard.visitorInsights': 'आगन्तुक अन्तर्दृष्टि',
      'dashboard.loyalCustomers': 'नियमित ग्राहकहरू',
      'dashboard.newCustomers': 'नयाँ ग्राहकहरू',
      'dashboard.uniqueCustomers': 'विशिष्ट ग्राहकहरू',
      'dashboard.todaySales': 'आजको बिक्री',
      'dashboard.salesSummary': 'आज बिक्री गतिविधिको सारांश',
      'dashboard.totalSales': 'कुल बिक्री',
      'dashboard.totalOrder': 'कुल अर्डर',
      'dashboard.productSold': 'बिक्री भएको उत्पादन',
      'dashboard.fromYesterday': 'हिजोको तुलनामा',
      'dashboard.export': 'निर्यात गर्नुहोस्',
      'dashboard.lastMonth': 'पछिल्लो महिना',
      'dashboard.thisMonth': 'यो महिना',
      'dashboard.last7Days': 'पछिल्लो ७ दिन',
      'dashboard.last30Days': 'पछिल्लो ३० दिन',
      'dashboard.last90Days': 'पछिल्लो ९० दिन',
      'dashboard.last7Months': 'पछिल्लो ७ महिना',
      'dashboard.last6Months': 'पछिल्लो ६ महिना',
      'dashboard.last12Months': 'पछिल्लो १२ महिना',
      'dashboard.thisYear': 'यो वर्ष',
      'dashboard.lastYear': 'गत वर्ष',
      'dashboard.name': 'नाम',
      'dashboard.popularity': 'लोकप्रियता',
      'dashboard.sales': 'बिक्री',
      'dashboard.realitySales': 'वास्तविक बिक्री',
      'dashboard.targetSales': 'लक्ष्य बिक्री',
      'dashboard.currentSeason': 'हालको ऋतु',
      'dashboard.lastSeason': 'गत ऋतु',
      'dashboard.yearlyAverage': 'वार्षिक औसत',
      'dashboard.distribution': 'वितरण',
      'dashboard.temperature': 'तापक्रम',
      'dashboard.exportPDF': 'पिडिएफ निर्यात गर्नुहोस्',
      'dashboard.12Months': '१२ महिना',
      'dashboard.6Months': '६ महिना',
      'dashboard.30Days': '३० दिन',
      'dashboard.7Days': '७ दिन',
      

      
      // Farmers Section
      'farmers.title': 'हालका किसानहरू',
      'farmers.seeAll': 'सबै किसानहरू हेर्नुहोस् →',
      'farmers.summary': 'यस महिना राजस्वको आधारमा शीर्ष किसानहरू',
      'farmers.name': 'नाम',
      'farmers.email': 'इमेल',
      'farmers.location': 'स्थान',
      'farmers.revenue': 'राजस्व',
      
      // Months
      'months.jan': 'जनवरी',
      'months.feb': 'फेब्रुअरी',
      'months.mar': 'मार्च',
      'months.apr': 'अप्रिल',
      'months.may': 'मे',
      'months.jun': 'जुन',
      'months.jul': 'जुलाई',
      'months.aug': 'अगस्त',
      'months.sep': 'सेप्टेम्बर',
      'months.oct': 'अक्टोबर',
      'months.nov': 'नोभेम्बर',
      'months.dec': 'डिसेम्बर',

      // Crop types
      'crops.wheat': 'गहुँ',
      'crops.corn': 'मकै',
      'crops.rice': 'चामल',
      'crops.barley': 'जौ',
      'crops.others': 'अन्य',

      // Traffic sources
      'traffic.direct': 'प्रत्यक्ष',
      'traffic.referral': 'रेफरल',
      'traffic.socialMedia': 'सामाजिक संजाल',
      'traffic.twitter': 'ट्विटर',

      // Products
      'products.homeDecor': 'गृह सजावट रेन्ज',
      'products.disneyBag': 'डिज्नी प्रिन्सेस गुलाबी झोला',
      'products.bathroomEssentials': 'बाथरुम आवश्यकताहरू',
      'products.appleWatches': 'एप्पल स्मार्टघडीहरू',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.MODE === 'development',
    interpolation: {
      escapeValue: false, // not needed for React
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

// Helper functions for number formatting
export const formatNumber = (number: number, language: string): string => {
  if (language.startsWith('ne')) {
    // Format for Nepali
    return new Intl.NumberFormat('ne-NP').format(number);
  }
  // Default format
  return new Intl.NumberFormat('en-US').format(number);
};

export const formatCurrency = (number: number, language: string): string => {
  if (language.startsWith('ne')) {
    // Format for Nepali (NPR)
    return `रू ${new Intl.NumberFormat('ne-NP').format(number)}`;
  }
  // Default format (USD)
  return `$${new Intl.NumberFormat('en-US').format(number)}`;
};

export default i18n; 