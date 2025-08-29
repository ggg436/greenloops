import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AiVideoRec: React.FC = () => {
  return (
    <div className=\"min-h-screen bg-gray-50 p-6\">
      <Card className=\"rounded-3xl border-gray-200\">
        <CardHeader>
          <CardTitle className=\"text-2xl font-bold text-gray-800\">AI Video Rec</CardTitle>
        </CardHeader>
        <CardContent>
          <p className=\"text-gray-600\">Coming soon: AI-powered video recommendations and insights.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiVideoRec;
