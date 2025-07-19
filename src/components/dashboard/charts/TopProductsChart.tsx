import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const topProducts = [
  { id: '01', name: 'Home Decor Range', color: 'bg-blue-500', percentage: 45, sales: '45%' },
  { id: '02', name: 'Disney Princess Pink Bag IB', color: 'bg-green-500', percentage: 29, sales: '29%' },
  { id: '03', name: 'Bathroom Essentials', color: 'bg-purple-500', percentage: 18, sales: '18%' },
  { id: '04', name: 'Apple Smartwatches', color: 'bg-orange-500', percentage: 23, sales: '23%' },
];

export const TopProductsChart = () => {
  return (
    <Card className="bg-white border border-gray-200 rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-zinc-900">Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 text-sm text-gray-500 mb-4">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Name</div>
            <div className="col-span-4">Popularity</div>
            <div className="col-span-2">Sales</div>
          </div>
          {topProducts.map((product, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <span className="text-sm text-gray-700">{product.id}</span>
              </div>
              <div className="col-span-5">
                <span className="text-sm text-gray-700">{product.name}</span>
              </div>
              <div className="col-span-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${product.color} h-2 rounded-full`} style={{ width: `${product.percentage}%` }}></div>
                </div>
              </div>
              <div className="col-span-2">
                <span className={`text-sm font-medium px-2 py-1 rounded text-white ${product.color}`}>
                  {product.sales}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};