import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { Loader2, Save, BarChart3, PieChart, LineChart, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  getUserChartData, 
  saveUserChartData, 
  getDefaultRevenueData,
  getDefaultCropDistributionData,
  getDefaultCropYieldData,
  getDefaultCustomerSatisfactionData,
  getDefaultTargetVsRealityData,
  getDefaultTrafficSourceData,
  getDefaultTopProductData,
  RevenueData,
  CropDistributionData,
  CropYieldData,
  CustomerSatisfactionData,
  TargetVsRealityData,
  TrafficSourceData,
  TopProductData
} from '@/lib/chartData';

const Data = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('revenue');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Chart data states
  const [revenueData, setRevenueData] = useState<RevenueData[]>(getDefaultRevenueData());
  const [cropDistributionData, setCropDistributionData] = useState<CropDistributionData[]>(getDefaultCropDistributionData());
  const [cropYieldData, setCropYieldData] = useState<CropYieldData[]>(getDefaultCropYieldData());
  const [customerSatisfactionData, setCustomerSatisfactionData] = useState<CustomerSatisfactionData[]>(getDefaultCustomerSatisfactionData());
  const [targetVsRealityData, setTargetVsRealityData] = useState<TargetVsRealityData[]>(getDefaultTargetVsRealityData());
  const [trafficSourceData, setTrafficSourceData] = useState<TrafficSourceData[]>(getDefaultTrafficSourceData());
  const [topProductData, setTopProductData] = useState<TopProductData[]>(getDefaultTopProductData());
  
  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const userData = await getUserChartData();
        if (userData) {
          if (userData.revenueData) setRevenueData(userData.revenueData);
          if (userData.cropDistributionData) setCropDistributionData(userData.cropDistributionData);
          if (userData.cropYieldData) setCropYieldData(userData.cropYieldData);
          if (userData.customerSatisfactionData) setCustomerSatisfactionData(userData.customerSatisfactionData);
          if (userData.targetVsRealityData) setTargetVsRealityData(userData.targetVsRealityData);
          if (userData.trafficSourceData) setTrafficSourceData(userData.trafficSourceData);
          if (userData.topProductData) setTopProductData(userData.topProductData);
        }
      } catch (error) {
        console.error("Error loading user chart data:", error);
        toast.error(t('data.loadError'));
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [t]);
  
  const handleSave = async () => {
    setSaving(true);
    try {
      // Save the data for the active tab
      switch (activeTab) {
        case 'revenue':
          await saveUserChartData('revenueData', revenueData);
          break;
        case 'cropDistribution':
          await saveUserChartData('cropDistributionData', cropDistributionData);
          break;
        case 'cropYield':
          await saveUserChartData('cropYieldData', cropYieldData);
          break;
        case 'customerSatisfaction':
          await saveUserChartData('customerSatisfactionData', customerSatisfactionData);
          break;
        case 'targetVsReality':
          await saveUserChartData('targetVsRealityData', targetVsRealityData);
          break;
        case 'trafficSources':
          await saveUserChartData('trafficSourceData', trafficSourceData);
          break;
        case 'topProducts':
          await saveUserChartData('topProductData', topProductData);
          break;
        default:
          break;
      }
      
      toast.success(t('data.saveSuccess'));
    } catch (error) {
      console.error("Error saving chart data:", error);
      toast.error(t('data.saveError'));
    } finally {
      setSaving(false);
    }
  };
  
  // Update revenue data
  const updateRevenueData = (index: number, field: 'onlineSales' | 'offlineSales', value: string) => {
    const newData = [...revenueData];
    newData[index][field] = Number(value);
    setRevenueData(newData);
  };
  
  // Update crop distribution data
  const updateCropDistributionData = (index: number, value: string) => {
    const newData = [...cropDistributionData];
    newData[index].value = Number(value);
    setCropDistributionData(newData);
  };
  
  // Update crop yield data
  const updateCropYieldData = (index: number, value: string) => {
    const newData = [...cropYieldData];
    newData[index].yield = Number(value);
    setCropYieldData(newData);
  };
  
  // Update customer satisfaction data
  const updateCustomerSatisfactionData = (index: number, field: 'lastMonth' | 'thisMonth', value: string) => {
    const newData = [...customerSatisfactionData];
    newData[index][field] = Number(value);
    setCustomerSatisfactionData(newData);
  };
  
  // Update target vs reality data
  const updateTargetVsRealityData = (index: number, field: 'reality' | 'target', value: string) => {
    const newData = [...targetVsRealityData];
    newData[index][field] = Number(value);
    setTargetVsRealityData(newData);
  };
  
  // Update traffic source data
  const updateTrafficSourceData = (index: number, value: string) => {
    const newData = [...trafficSourceData];
    newData[index].value = Number(value);
    setTrafficSourceData(newData);
  };
  
  // Update top product data
  const updateTopProductName = (index: number, value: string) => {
    const newData = [...topProductData];
    newData[index].name = value;
    setTopProductData(newData);
  };
  
  const updateTopProductSales = (index: number, value: string) => {
    const newData = [...topProductData];
    newData[index].sales = Number(value);
    setTopProductData(newData);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t('data.title')}</h1>
        <p className="text-gray-500">{t('data.description')}</p>
      </div>
      
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="revenue" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                {t('data.revenue')}
              </TabsTrigger>
              <TabsTrigger value="cropDistribution" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                {t('data.cropDistribution')}
              </TabsTrigger>
              <TabsTrigger value="cropYield" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                {t('data.cropYield')}
              </TabsTrigger>
              <TabsTrigger value="customerSatisfaction" className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4" />
                {t('data.customerSatisfaction')}
              </TabsTrigger>
              <TabsTrigger value="targetVsReality" className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4" />
                {t('data.targetVsReality')}
              </TabsTrigger>
              <TabsTrigger value="trafficSources" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                {t('data.trafficSources')}
              </TabsTrigger>
              <TabsTrigger value="topProducts" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                {t('data.topProducts')}
              </TabsTrigger>
            </TabsList>
            
            <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {t('common.save')}
            </Button>
          </div>
          
          {/* Revenue Data Form */}
          <TabsContent value="revenue">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">{t('data.editRevenueData')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {revenueData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{t(`days.${item.day.toLowerCase()}`)}</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`online-${index}`}>{t('chart.onlineSales')}</Label>
                        <Input 
                          id={`online-${index}`}
                          type="number" 
                          value={item.onlineSales} 
                          onChange={(e) => updateRevenueData(index, 'onlineSales', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`offline-${index}`}>{t('chart.offlineSales')}</Label>
                        <Input 
                          id={`offline-${index}`}
                          type="number" 
                          value={item.offlineSales} 
                          onChange={(e) => updateRevenueData(index, 'offlineSales', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Crop Distribution Data Form */}
          <TabsContent value="cropDistribution">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">{t('data.editCropDistribution')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cropDistributionData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <h4 className="font-medium">{t(item.nameKey)}</h4>
                    </div>
                    <div>
                      <Label htmlFor={`crop-value-${index}`}>{t('data.value')}</Label>
                      <Input 
                        id={`crop-value-${index}`}
                        type="number" 
                        value={item.value} 
                        onChange={(e) => updateCropDistributionData(index, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Crop Yield Data Form */}
          <TabsContent value="cropYield">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">{t('data.editCropYield')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cropYieldData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{t(item.month)}</h4>
                    <div>
                      <Label htmlFor={`yield-${index}`}>{t('data.yield')}</Label>
                      <Input 
                        id={`yield-${index}`}
                        type="number" 
                        value={item.yield} 
                        onChange={(e) => updateCropYieldData(index, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Customer Satisfaction Data Form */}
          <TabsContent value="customerSatisfaction">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">{t('data.editCustomerSatisfaction')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customerSatisfactionData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{t(item.month)}</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`last-month-${index}`}>{t('chart.lastMonth')}</Label>
                        <Input 
                          id={`last-month-${index}`}
                          type="number" 
                          value={item.lastMonth} 
                          onChange={(e) => updateCustomerSatisfactionData(index, 'lastMonth', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`this-month-${index}`}>{t('chart.thisMonth')}</Label>
                        <Input 
                          id={`this-month-${index}`}
                          type="number" 
                          value={item.thisMonth} 
                          onChange={(e) => updateCustomerSatisfactionData(index, 'thisMonth', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Target vs Reality Data Form */}
          <TabsContent value="targetVsReality">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">{t('data.editTargetVsReality')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {targetVsRealityData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{t(item.month)}</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`reality-${index}`}>{t('chart.reality')}</Label>
                        <Input 
                          id={`reality-${index}`}
                          type="number" 
                          value={item.reality} 
                          onChange={(e) => updateTargetVsRealityData(index, 'reality', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`target-${index}`}>{t('chart.target')}</Label>
                        <Input 
                          id={`target-${index}`}
                          type="number" 
                          value={item.target} 
                          onChange={(e) => updateTargetVsRealityData(index, 'target', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Traffic Sources Data Form */}
          <TabsContent value="trafficSources">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">{t('data.editTrafficSources')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trafficSourceData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <h4 className="font-medium">{t(item.source)}</h4>
                    </div>
                    <div>
                      <Label htmlFor={`traffic-value-${index}`}>{t('data.value')}</Label>
                      <Input 
                        id={`traffic-value-${index}`}
                        type="number" 
                        value={item.value} 
                        onChange={(e) => updateTrafficSourceData(index, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Top Products Data Form */}
          <TabsContent value="topProducts">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">{t('data.editTopProducts')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topProductData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`product-name-${index}`}>{t('data.productName')}</Label>
                        <Input 
                          id={`product-name-${index}`}
                          value={item.name} 
                          onChange={(e) => updateTopProductName(index, e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`product-sales-${index}`}>{t('data.sales')}</Label>
                        <Input 
                          id={`product-sales-${index}`}
                          type="number" 
                          value={item.sales} 
                          onChange={(e) => updateTopProductSales(index, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Data; 