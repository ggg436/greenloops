
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, CheckCircle, Users } from 'lucide-react';
import { VisitorInsightsChart } from './charts/VisitorInsightsChart';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatNumber } from '@/lib/formatters';

export const SalesSummarySection = () => {
  const { t } = useTranslation();
  
  const salesData = [
    {
      title: 'dashboard.totalSales',
      value: 1000,
      isCurrency: true,
      change: 5,
      icon: ShoppingBag,
      bgColor: "bg-pink-200",
      iconColor: "text-pink-700"
    },
    {
      title: 'dashboard.totalOrder',
      value: 300,
      isCurrency: false,
      change: 5,
      icon: Package,
      bgColor: "bg-orange-200",
      iconColor: "text-orange-700"
    },
    {
      title: 'dashboard.productSold',
      value: 5,
      isCurrency: false,
      change: 12,
      icon: CheckCircle,
      bgColor: "bg-green-200",
      iconColor: "text-green-700"
    },
    {
      title: 'dashboard.newCustomers',
      value: 8,
      isCurrency: false,
      change: 0.5,
      icon: Users,
      bgColor: "bg-purple-200",
      iconColor: "text-purple-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Today's Sales */}
      <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full">
        <CardHeader className="pb-3 px-4 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-zinc-900">{t('dashboard.todaySales')}</CardTitle>
            <button className="text-sm text-gray-600 border border-gray-100 rounded-md px-3 py-1 bg-gray-50 hover:bg-gray-100">
              {t('dashboard.export')}
            </button>
          </div>
          <p className="text-sm text-gray-600">{t('dashboard.salesSummary')}</p>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesData.map((item, index) => {
              // Format value based on type (currency or regular number)
              const formattedValue = item.isCurrency 
                ? formatCurrency(item.value) 
                : formatNumber(item.value);
                
              return (
                <div key={index} className={`${item.bgColor} rounded-xl p-4 shadow-sm`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                      <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-zinc-900 mb-1">{formattedValue}</div>
                  <div className="text-sm text-gray-600 mb-1">{t(item.title)}</div>
                  <div className="text-xs text-blue-600">+{item.change}% {t('dashboard.fromYesterday')}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Visitor Insights */}
      <VisitorInsightsChart />
    </div>
  );
};
