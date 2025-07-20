import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const topProducts = [
  { id: '01', nameKey: 'products.homeDecor', color: 'bg-blue-500', percentage: 45, sales: 45 },
  { id: '02', nameKey: 'products.disneyBag', color: 'bg-green-500', percentage: 29, sales: 29 },
  { id: '03', nameKey: 'products.bathroomEssentials', color: 'bg-purple-500', percentage: 18, sales: 18 },
  { id: '04', nameKey: 'products.appleWatches', color: 'bg-orange-500', percentage: 23, sales: 23 },
];

export const TopProductsChart = () => {
  const { t } = useTranslation();
  
  // Translate product names
  const translatedProducts = topProducts.map(product => ({
    ...product,
    name: t(product.nameKey)
  }));
  
  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full">
      <CardHeader className="pb-3 px-4 pt-4">
        <CardTitle className="text-lg font-semibold text-zinc-900">{t('chart.topProducts')}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-8">
        <div className="space-y-8">
          <div className="grid grid-cols-12 gap-4 text-sm text-gray-500 mb-6">
            <div className="col-span-1 font-medium">#</div>
            <div className="col-span-5 font-medium">{t('dashboard.name')}</div>
            <div className="col-span-4 font-medium">{t('dashboard.popularity')}</div>
            <div className="col-span-2 font-medium">{t('dashboard.sales')}</div>
          </div>
          {translatedProducts.map((product, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <span className="text-sm text-gray-700 font-medium">{product.id}</span>
              </div>
              <div className="col-span-5">
                <span className="text-sm text-gray-700">{product.name}</span>
              </div>
              <div className="col-span-4">
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className={`${product.color} h-3 rounded-full`} style={{ width: `${product.percentage}%` }}></div>
                </div>
              </div>
              <div className="col-span-2">
                <span className={`text-sm font-medium px-2 py-1 rounded text-white ${product.color}`}>
                  {product.sales}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};