
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

const visitorData = [
  { month: 'months.jan', loyalCustomers: 280, newCustomers: 250, uniqueCustomers: 320 },
  { month: 'months.feb', loyalCustomers: 290, newCustomers: 220, uniqueCustomers: 340 },
  { month: 'months.mar', loyalCustomers: 310, newCustomers: 200, uniqueCustomers: 350 },
  { month: 'months.apr', loyalCustomers: 285, newCustomers: 180, uniqueCustomers: 330 },
  { month: 'months.may', loyalCustomers: 270, newCustomers: 160, uniqueCustomers: 310 },
  { month: 'months.jun', loyalCustomers: 255, newCustomers: 170, uniqueCustomers: 290 },
  { month: 'months.jul', loyalCustomers: 280, newCustomers: 380, uniqueCustomers: 320 },
  { month: 'months.aug', loyalCustomers: 300, newCustomers: 350, uniqueCustomers: 310 },
  { month: 'months.sep', loyalCustomers: 320, newCustomers: 330, uniqueCustomers: 290 },
  { month: 'months.oct', loyalCustomers: 290, newCustomers: 310, uniqueCustomers: 270 },
  { month: 'months.nov', loyalCustomers: 260, newCustomers: 280, uniqueCustomers: 250 },
  { month: 'months.dec', loyalCustomers: 240, newCustomers: 260, uniqueCustomers: 230 },
];

export const VisitorInsightsChart = () => {
  const { t } = useTranslation();

  // Translate the month names
  const translatedData = visitorData.map(item => ({
    ...item,
    translatedMonth: t(item.month)
  }));

  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full">
      <CardHeader className="pb-3 px-4 pt-4">
        <CardTitle className="text-lg font-semibold text-zinc-900">{t('dashboard.visitorInsights')}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-4 flex-1 flex flex-col">
        <ResponsiveContainer width="99%" height={200}>
          <LineChart data={translatedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="translatedMonth" 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              domain={[0, 400]}
            />
            <Tooltip 
              formatter={(value) => [value, '']}
              labelFormatter={(label) => label}
            />
            <Line
              type="monotone"
              dataKey="loyalCustomers"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              name={t('dashboard.loyalCustomers')}
            />
            <Line
              type="monotone"
              dataKey="newCustomers"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name={t('dashboard.newCustomers')}
            />
            <Line
              type="monotone"
              dataKey="uniqueCustomers"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name={t('dashboard.uniqueCustomers')}
            />
            <Legend 
              formatter={(value) => value} 
              wrapperStyle={{ paddingTop: '10px', marginBottom: '-5px' }}
              iconType="circle"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
