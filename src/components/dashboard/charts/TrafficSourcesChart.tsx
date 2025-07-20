import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '@/lib/formatters';

const trafficSources = [
  { nameKey: 'traffic.direct', color: 'bg-blue-600', percentage: 80, value: 143382 },
  { nameKey: 'traffic.referral', color: 'bg-blue-500', percentage: 60, value: 87974 },
  { nameKey: 'traffic.socialMedia', color: 'bg-blue-400', percentage: 30, value: 45211 },
  { nameKey: 'traffic.twitter', color: 'bg-blue-300', percentage: 15, value: 21893 },
];

export const TrafficSourcesChart = () => {
  const { t } = useTranslation();

  // Translate source names
  const translatedSources = trafficSources.map(source => ({
    ...source,
    name: t(source.nameKey)
  }));

  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">{t('chart.trafficSources')}</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>{t('dashboard.last7Days')}</option>
            <option>{t('dashboard.last30Days')}</option>
            <option>{t('dashboard.last90Days')}</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-4">
          {translatedSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 ${source.color} rounded mr-3`}></div>
                <span className="text-sm text-gray-700">{source.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className={`${source.color} h-2 rounded-full`} style={{ width: `${source.percentage}%` }}></div>
                </div>
                <span className="text-sm font-medium text-zinc-900">{formatNumber(source.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
