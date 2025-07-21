
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import { kFormatter, translateDay } from '@/lib/formatters';
import { getSpecificChartData, getDefaultRevenueData, RevenueData } from '@/lib/chartData';
import { Skeleton } from '@/components/ui/skeleton';

export const TotalRevenueChart = () => {
  const { t } = useTranslation();
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadChartData = async () => {
      try {
        // Try to get user-specific data from Firestore
        const userData = await getSpecificChartData<RevenueData>('revenueData');
        
        if (userData && userData.length > 0) {
          setRevenueData(userData);
        } else {
          // Fall back to default data if no user data exists
          setRevenueData(getDefaultRevenueData());
        }
      } catch (error) {
        console.error('Error loading revenue data:', error);
        // Fall back to default data on error
        setRevenueData(getDefaultRevenueData());
      } finally {
        setLoading(false);
      }
    };
    
    loadChartData();
  }, []);
  
  // Translate days for chart
  const translatedData = revenueData.map(item => ({
    ...item,
    translatedDay: translateDay(item.day)
  }));
  
  if (loading) {
    return (
      <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
        <CardHeader className="pb-2 px-4 pt-4">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="px-2 pb-4 flex-1 flex flex-col">
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
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
      <CardContent className="px-2 pb-4 flex-1 flex flex-col">
        <ResponsiveContainer width="99%" height={300}>
          <BarChart 
            data={translatedData} 
            barCategoryGap={20}
            margin={{ top: 10, right: 10, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="translatedDay" 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              tick={{ fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              tick={{ fontSize: 12 }}
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
              wrapperStyle={{ paddingTop: '15px' }}
              iconType="circle"
              verticalAlign="bottom"
              height={40}
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
