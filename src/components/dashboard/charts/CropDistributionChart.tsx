import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

const cropDistribution = [
  { nameKey: 'crops.wheat', value: 35, color: '#8884d8' },
  { nameKey: 'crops.corn', value: 28, color: '#82ca9d' },
  { nameKey: 'crops.rice', value: 20, color: '#ffc658' },
  { nameKey: 'crops.barley', value: 12, color: '#ff7300' },
  { nameKey: 'crops.others', value: 5, color: '#8dd1e1' },
];

export const CropDistributionChart = () => {
  const { t } = useTranslation();

  // Translate crop names
  const translatedData = cropDistribution.map(item => ({
    ...item,
    name: t(item.nameKey)
  }));

  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">{t('chart.cropDistribution')}</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>{t('dashboard.currentSeason')}</option>
            <option>{t('dashboard.lastSeason')}</option>
            <option>{t('dashboard.yearlyAverage')}</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-6">
        <div className="w-full" style={{ height: '280px' }}>
          <ResponsiveContainer width="99%" height="100%">
            <PieChart>
              <Pie
                data={translatedData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {translatedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, t('dashboard.distribution')]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2 px-4">
          {translatedData.map((crop, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded mr-3" 
                  style={{ backgroundColor: crop.color }}
                ></div>
                <span className="text-sm text-gray-700">{crop.name}</span>
              </div>
              <span className="text-sm font-medium text-zinc-900">{crop.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
