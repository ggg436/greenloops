import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import { getSpecificChartData, getDefaultCropDistributionData, CropDistributionData } from '@/lib/chartData';
import { Skeleton } from '@/components/ui/skeleton';

export const CropDistributionChart = () => {
  const { t } = useTranslation();
  const [cropDistributionData, setCropDistributionData] = useState<CropDistributionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        // Try to get user-specific data from Firestore
        const userData = await getSpecificChartData<CropDistributionData>('cropDistributionData');
        
        if (userData && userData.length > 0) {
          setCropDistributionData(userData);
        } else {
          // Fall back to default data if no user data exists
          setCropDistributionData(getDefaultCropDistributionData());
        }
      } catch (error) {
        console.error('Error loading crop distribution data:', error);
        // Fall back to default data on error
        setCropDistributionData(getDefaultCropDistributionData());
      } finally {
        setLoading(false);
      }
    };
    
    loadChartData();
  }, []);

  // Translate crop names
  const translatedData = cropDistributionData.map(item => ({
    ...item,
    name: t(item.nameKey)
  }));
  
  // Check if there's any non-zero data
  const hasData = translatedData.some(item => item.value > 0);
  
  if (loading) {
    return (
      <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
        <CardHeader className="pb-2 px-4 pt-4">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="px-2 pb-4 flex-1 flex flex-col">
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">{t('chart.cropDistribution')}</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>{t('time.thisMonth')}</option>
            <option>{t('time.lastMonth')}</option>
            <option>{t('time.thisQuarter')}</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4 flex-1 flex flex-col">
        {hasData ? (
          <>
            <ResponsiveContainer width="99%" height={350}>
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={translatedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {translatedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {translatedData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{entry.name}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full flex-col">
            <div className="text-gray-400 text-lg mb-2">{t('chart.noDataAvailable')}</div>
            <p className="text-gray-500 text-sm text-center max-w-md">
              {t('chart.noDataMessage', 'Please add crop distribution data to see the chart')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
