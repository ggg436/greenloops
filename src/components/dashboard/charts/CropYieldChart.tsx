import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Download } from 'lucide-react';

const weatherData = [
  { day: 'Feb', temperature: 25, humidity: 60 },
  { day: 'Mar', temperature: 27, humidity: 65 },
  { day: 'Apr', temperature: 23, humidity: 70 },
  { day: 'May', temperature: 26, humidity: 55 },
  { day: 'Jun', temperature: 28, humidity: 50 },
  { day: 'Jul', temperature: 24, humidity: 68 },
  { day: 'Aug', temperature: 22, humidity: 75 },
  { day: 'Sep', temperature: 26, humidity: 65 },
  { day: 'Oct', temperature: 24, humidity: 60 },
  { day: 'Nov', temperature: 22, humidity: 70 },
  { day: 'Dec', temperature: 20, humidity: 75 },
  { day: 'Jan', temperature: 18, humidity: 80 },
];

export const CropYieldChart = () => {
  return (
    <Card className="bg-white border border-gray-200 rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-zinc-900">Crop Yield Report</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">12 Months</button>
              <button className="px-3 py-1 text-sm text-gray-600">6 Months</button>
              <button className="px-3 py-1 text-sm text-gray-600">30 Days</button>
              <button className="px-3 py-1 text-sm text-gray-600">7 Days</button>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
            <YAxis axisLine={false} tickLine={false} className="text-sm text-gray-600" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#6366f1" 
              strokeWidth={2}
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#6366f1' }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center">
          <div className="text-sm text-gray-600">June 2021</div>
          <div className="ml-2 text-lg font-semibold text-zinc-900">$45,591</div>
        </div>
      </CardContent>
    </Card>
  );
};
