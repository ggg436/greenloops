
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/lib/formatters';

const recentFarmers = [
  { 
    name: 'John Wilson', 
    email: 'j.wilson@example.com', 
    location: 'Austin', 
    revenue: 11234 
  },
  { 
    name: 'Maria Garcia', 
    email: 'dat.roberts@example.com', 
    location: 'New York', 
    revenue: 11159 
  },
  { 
    name: 'James Cooper', 
    email: 'jgraham@example.com', 
    location: 'Toledo', 
    revenue: 10483 
  },
  { 
    name: 'Sarah Russell', 
    email: 'curtis.d@example.com', 
    location: 'Naperville', 
    revenue: 9084 
  },
];

export const RecentFarmersSection = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">{t('farmers.title')}</CardTitle>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            {t('farmers.seeAll')}
          </button>
        </div>
        <p className="text-sm text-gray-600">{t('farmers.summary')}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentFarmers.map((farmer, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {farmer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-zinc-900">{farmer.name}</p>
                  <p className="text-xs text-gray-600">{farmer.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm text-zinc-900">{formatCurrency(farmer.revenue)}</p>
                <p className="text-xs text-gray-600">{farmer.location}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
