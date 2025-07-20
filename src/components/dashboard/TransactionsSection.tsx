
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/lib/formatters';
import { useLanguage } from '@/hooks/useLanguage';

const recentTransactions = [
  { 
    id: 1, 
    type: 'transactions.fertilizer', 
    amount: 249.94, 
    date: 'Jan 17, 2025', 
    status: 'transactions.completed', 
    vendor: 'AgriSupply' 
  },
  { 
    id: 2, 
    type: 'transactions.seed', 
    amount: 182.94, 
    date: 'Jan 17, 2025', 
    status: 'transactions.completed', 
    vendor: 'CropCorp' 
  },
  { 
    id: 3, 
    type: 'transactions.equipment', 
    amount: 99.00, 
    date: 'Jan 17, 2025', 
    status: 'transactions.completed', 
    vendor: 'FarmTech' 
  },
  { 
    id: 4, 
    type: 'transactions.pesticide', 
    amount: 199.24, 
    date: 'Jan 17, 2025', 
    status: 'transactions.pending', 
    vendor: 'GreenCare' 
  },
];

export const TransactionsSection = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">{t('transactions.title')}</CardTitle>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            {t('transactions.seeAll')}
          </button>
        </div>
        <p className="text-sm text-gray-600">{t('transactions.summary')}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  transaction.status === 'transactions.completed' ? 'bg-green-500' : 
                  transaction.status === 'transactions.pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-sm text-zinc-900">{t(transaction.type)}</p>
                  <p className="text-xs text-gray-600">{transaction.vendor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm text-zinc-900">
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-gray-600">{transaction.date}</p>
              </div>
              <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
