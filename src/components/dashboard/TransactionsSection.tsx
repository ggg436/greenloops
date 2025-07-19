
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';

const recentTransactions = [
  { id: 1, type: 'Fertilizer Purchase', amount: '$249.94', date: 'Jan 17, 2025', status: 'Completed', vendor: 'AgriSupply' },
  { id: 2, type: 'Seed Order', amount: '$182.94', date: 'Jan 17, 2025', status: 'Completed', vendor: 'CropCorp' },
  { id: 3, type: 'Equipment Rental', amount: '$99.00', date: 'Jan 17, 2025', status: 'Completed', vendor: 'FarmTech' },
  { id: 4, type: 'Pesticide Purchase', amount: '$199.24', date: 'Jan 17, 2025', status: 'Pending', vendor: 'GreenCare' },
];

export const TransactionsSection = () => {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Transactions</CardTitle>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            See All Transactions →
          </button>
        </div>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipis.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  transaction.status === 'Completed' ? 'bg-green-500' : 
                  transaction.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-sm text-zinc-900">{transaction.type}</p>
                  <p className="text-xs text-gray-600">{transaction.vendor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm text-zinc-900">{transaction.amount}</p>
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
