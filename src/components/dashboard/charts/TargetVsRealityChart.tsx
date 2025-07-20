import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

const targetVsRealityData = [
  { month: 'months.jan', reality: 6.2, target: 8.5 },
  { month: 'months.feb', reality: 5.8, target: 7.2 },
  { month: 'months.mar', reality: 4.9, target: 9.1 },
  { month: 'months.apr', reality: 6.8, target: 7.3 },
  { month: 'months.may', reality: 8.2, target: 11.8 },
  { month: 'months.jun', reality: 7.9, target: 12.5 },
  { month: 'months.jul', reality: 8.8, target: 12.1 },
];

export const TargetVsRealityChart = () => {
  const { t } = useTranslation();

  // Translate month names
  const translatedData = targetVsRealityData.map(item => ({
    ...item,
    translatedMonth: t(item.month)
  }));

  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">{t('chart.targetVsReality')}</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>{t('dashboard.thisYear')}</option>
            <option>{t('dashboard.lastYear')}</option>
            <option>{t('dashboard.last6Months')}</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-0 flex-1 flex flex-col">
        <ResponsiveContainer width="99%" height={260}>
          <BarChart 
            data={translatedData} 
            barCategoryGap={20}
            margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="translatedMonth" 
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
              width={30}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelFormatter={(label) => label}
            />
            <Bar 
              dataKey="reality" 
              fill="#10b981" 
              name={t('dashboard.realitySales')}
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
            <Bar 
              dataKey="target" 
              fill="#fbbf24" 
              name={t('dashboard.targetSales')}
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '8px' }}
              iconType="circle"
              verticalAlign="bottom"
              height={25}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
