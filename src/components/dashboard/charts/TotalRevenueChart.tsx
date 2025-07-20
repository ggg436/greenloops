
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import { kFormatter, translateDay } from '@/lib/formatters';

// This will be translated in the component
const revenueData = [
  { day: 'Monday', onlineSales: 15, offlineSales: 14 },
  { day: 'Tuesday', onlineSales: 18, offlineSales: 12 },
  { day: 'Wednesday', onlineSales: 6, offlineSales: 22 },
  { day: 'Thursday', onlineSales: 16, offlineSales: 7 },
  { day: 'Friday', onlineSales: 13, offlineSales: 12 },
  { day: 'Saturday', onlineSales: 17, offlineSales: 15 },
  { day: 'Sunday', onlineSales: 21, offlineSales: 11 },
];

export const TotalRevenueChart = () => {
  const { t } = useTranslation();
  
  // Translate days for chart
  const translatedData = revenueData.map(item => ({
    ...item,
    translatedDay: translateDay(item.day)
  }));
  
  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">{t('chart.totalRevenue')}</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>{t('time.thisWeek')}</option>
            <option>{t('time.lastWeek')}</option>
            <option>{t('time.thisMonth')}</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-0 flex-1 flex flex-col">
        <ResponsiveContainer width="99%" height={260}>
          <BarChart 
            data={translatedData} 
            barCategoryGap={20}
            margin={{ top: 10, right: 10, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="translatedDay" 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              tick={{ fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              tick={{ fontSize: 10 }}
              tickFormatter={kFormatter}
              width={30}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [kFormatter(value as number), '']}
              labelFormatter={(label, payload) => {
                const entry = payload[0]?.payload;
                return entry ? entry.translatedDay : '';
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '8px' }}
              iconType="circle"
              verticalAlign="bottom"
              height={25}
              formatter={(value) => {
                if (value === 'onlineSales') return t('chart.onlineSales');
                if (value === 'offlineSales') return t('chart.offlineSales');
                return value;
              }}
            />
            <Bar 
              dataKey="onlineSales" 
              fill="#3b82f6" 
              name="onlineSales"
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
            <Bar 
              dataKey="offlineSales" 
              fill="#10b981" 
              name="offlineSales"
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
