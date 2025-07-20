import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

const customerSatisfactionData = [
  { month: 'months.jan', lastMonth: 65, thisMonth: 72 },
  { month: 'months.feb', lastMonth: 70, thisMonth: 68 },
  { month: 'months.mar', lastMonth: 58, thisMonth: 78 },
  { month: 'months.apr', lastMonth: 62, thisMonth: 65 },
  { month: 'months.may', lastMonth: 68, thisMonth: 82 },
  { month: 'months.jun', lastMonth: 64, thisMonth: 58 },
  { month: 'months.jul', lastMonth: 72, thisMonth: 85 },
];

export const CustomerSatisfactionChart = () => {
  const { t } = useTranslation();

  // Translate month names
  const translatedData = customerSatisfactionData.map(item => ({
    ...item,
    translatedMonth: t(item.month)
  }));

  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">{t('chart.customerSatisfaction')}</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>{t('dashboard.last7Months')}</option>
            <option>{t('dashboard.last6Months')}</option>
            <option>{t('dashboard.last12Months')}</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-0 flex-1 flex flex-col">
        <ResponsiveContainer width="99%" height={260}>
          <AreaChart 
            data={translatedData}
            margin={{ top: 10, right: 10, bottom: 2, left: 0 }}
          >
            <defs>
              <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="translatedMonth" 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              domain={[0, 100]}
              width={30}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`${value}%`, '']}
              labelFormatter={(label) => label}
            />
            <Area
              type="monotone"
              dataKey="lastMonth"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorLastMonth)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              name={t('dashboard.lastMonth')}
            />
            <Area
              type="monotone"
              dataKey="thisMonth"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorThisMonth)"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name={t('dashboard.thisMonth')}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '8px' }}
              iconType="circle"
              verticalAlign="bottom"
              height={25}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
