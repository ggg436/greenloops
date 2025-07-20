
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  Leaf, 
  Droplets,
  Clock,
  ThermometerSun,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { analyzePlantDisease } from '@/services/plantDiseaseService';

interface PlantAnalysis {
  disease: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  symptoms: string[];
  treatment: {
    immediate: string[];
    preventive: string[];
    organic: string[];
  };
  timeframe: string;
  isHealthy?: boolean;
}

const DrPlant = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PlantAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Reset previous analysis and errors
      setAnalysis(null);
      setError(null);
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.onerror = () => {
        toast.error('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      toast('Analyzing your plant image...', {
        duration: 3000
      });
      
      console.log('Starting plant analysis in DrPlant component');
      
      // Call the plant disease detection service
      const result = await analyzePlantDisease(selectedImage);
      
      console.log('Analysis result received in DrPlant:', result);
      
      setAnalysis({
        disease: result.disease,
        confidence: result.confidence,
        severity: result.severity,
        description: result.description,
        symptoms: result.symptoms,
        treatment: result.treatment,
        timeframe: result.timeframe,
        isHealthy: result.isHealthy
      });
      
      toast.message(`Analysis Complete: ${result.isHealthy ? 'Plant appears healthy!' : 'Issue detected'}`);
    } catch (error: any) {
      console.error('Error analyzing image in DrPlant component:', error);
      setError(error.message || 'Failed to analyze image');
      
      // Show a more user-friendly error message
      if (error.message.includes('timeout') || error.message.includes('Network Error')) {
        toast.error('Connection to plant analysis service timed out. Please try again later.');
      } else if (error.message.includes('API key')) {
        toast.error('Authentication error with plant analysis service.');
      } else {
        toast.error(`Analysis failed: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl animate-bounce">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dr. Plant</h1>
              <p className="text-gray-600">AI-Powered Plant Disease Detection</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Diagnose Plant Diseases Instantly
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a photo of your plant to get instant AI-powered disease diagnosis and personalized treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Section */}
          <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
            <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                Upload Plant Photo
              </CardTitle>
              <CardDescription className="text-base">
                Take a clear photo of the affected plant parts for accurate diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="border-3 border-dashed border-gray-300 rounded-3xl p-10 text-center bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                {selectedImage ? (
                  <div className="space-y-6">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded plant" 
                      className="max-w-full h-64 object-cover mx-auto rounded-2xl shadow-xl"
                    />
                    <div className="flex gap-4 justify-center">
                      <Button 
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-xl rounded-2xl px-8 py-4 text-lg"
                        size="lg"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-3" />
                            Analyze Plant
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedImage(null);
                          setAnalysis(null);
                          setError(null);
                        }}
                        className="rounded-2xl px-8 py-4 text-lg border-2 hover:bg-gray-50"
                        size="lg"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-28 h-28 mx-auto flex items-center justify-center animate-pulse">
                      <Upload className="w-12 h-12 text-green-600 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-gray-900">Upload a photo</p>
                      <p className="text-gray-500 mt-2 text-lg">PNG, JPG up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload">
                      <Button className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-2xl px-10 py-4 text-lg shadow-xl" size="lg" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>

              {error && (
                <Alert className="bg-gradient-to-r from-red-50 to-pink-50 border-red-300 rounded-2xl">
                  <Info className="h-5 w-5 text-red-600" />
                  <AlertDescription className="text-red-800 text-base">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 rounded-2xl">
                <Leaf className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800 text-base">
                  For best results, take photos in good lighting with clear focus on affected areas
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
            <CardHeader className="pb-6 bg-gradient-to-r from-amber-50 to-orange-50">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                Diagnosis Results
              </CardTitle>
              <CardDescription className="text-base">
                AI-powered analysis and treatment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysis ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                    <Stethoscope className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium">Upload a plant photo to get diagnosis</p>
                  <p className="text-sm mt-1">Our AI will analyze your plant's health</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{analysis.disease}</h3>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getSeverityColor(analysis.severity)} border font-medium`}>
                        {analysis.isHealthy ? 'Healthy' : `${analysis.severity} Risk`}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {analysis.confidence}% confident
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{analysis.description}</p>

                  <Separator className="bg-gray-200" />

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      {analysis.isHealthy ? 'Health Indicators' : 'Symptoms Detected'}
                    </h4>
                    <ul className="space-y-2">
                      {analysis.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-semibold text-blue-900">Recovery Time:</span>
                      <p className="text-blue-800 text-sm">{analysis.timeframe}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Treatment Recommendations */}
        {analysis && (
          <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
            <CardHeader className="pb-6 bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                Treatment Recommendations
              </CardTitle>
              <CardDescription className="text-base">
                Step-by-step treatment plan for your plant
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Tabs defaultValue="immediate" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 h-14 rounded-2xl p-1">
                  <TabsTrigger value="immediate" className="text-base font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">🚨 Immediate</TabsTrigger>
                  <TabsTrigger value="preventive" className="text-base font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">🛡️ Prevention</TabsTrigger>
                  <TabsTrigger value="organic" className="text-base font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">🌱 Organic</TabsTrigger>
                </TabsList>
                
                <TabsContent value="immediate" className="mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-red-700 text-xl">Immediate Treatment Steps</h4>
                      </div>
                      <ul className="space-y-5">
                        {analysis.treatment.immediate.map((step, index) => (
                          <li key={index} className="flex items-start gap-5 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border-2 border-red-100 hover:shadow-lg transition-all duration-300">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <span className="text-gray-800 leading-relaxed flex-1 text-base">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                </TabsContent>
                
                <TabsContent value="preventive" className="mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl">
                          <ShieldCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-blue-700 text-xl">Preventive Measures</h4>
                      </div>
                      <ul className="space-y-5">
                        {analysis.treatment.preventive.map((step, index) => (
                          <li key={index} className="flex items-start gap-5 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <span className="text-gray-800 leading-relaxed flex-1 text-base">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                </TabsContent>
                
                <TabsContent value="organic" className="mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
                          <Leaf className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-green-700 text-xl">Organic Treatment Options</h4>
                      </div>
                      <ul className="space-y-5">
                        {analysis.treatment.organic.map((step, index) => (
                          <li key={index} className="flex items-start gap-5 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 hover:shadow-lg transition-all duration-300">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <span className="text-gray-800 leading-relaxed flex-1 text-base">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DrPlant;
