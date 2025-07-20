
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check, Leaf, Cloud, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define keyframe animations as a CSS-in-JS object
const keyframeStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0) rotate(15deg); }
    50% { transform: translateY(-30px) rotate(15deg); }
  }
`;

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email submission here
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Add keyframes to the document */}
      <style dangerouslySetInnerHTML={{ __html: keyframeStyles }} />
      
      {/* Background decorative elements - now with distinct shapes, colors and animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right blue circle */}
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl animate-pulse" 
             style={{ animationDuration: '15s' }}></div>
        
        {/* Middle left green hexagon */}
        <div className="absolute -left-20 top-1/3 w-60 h-60 bg-green-100 opacity-30 blur-3xl"
             style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', 
                      animation: 'float 20s infinite ease-in-out' }}></div>
        
        {/* Bottom right yellow triangle */}
        <div className="absolute right-1/4 bottom-0 w-40 h-40 bg-yellow-100 opacity-20 blur-2xl"
             style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', 
                      animation: 'spin 30s infinite linear' }}></div>
        
        {/* Top left purple square */}
        <div className="absolute left-1/4 top-20 w-32 h-32 bg-purple-100 rounded-lg opacity-20 blur-xl"
             style={{ transform: 'rotate(15deg)', 
                      animation: 'bounce 25s infinite ease-in-out' }}></div>
        
        {/* Bottom left cyan diamond */}
        <div className="absolute left-10 bottom-20 w-48 h-48 bg-cyan-100 opacity-20 blur-2xl"
             style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 
                      animation: 'float 18s infinite ease-in-out' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              AI-Powered Agriculture Platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Revolutionizing <span className="text-blue-600">Agriculture</span> with AI Technology
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Empower your farming with data-driven insights. Increase yields, reduce costs, and make better decisions through AI-driven crop monitoring, disease detection, and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto rounded-xl font-medium text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                onClick={() => navigate('/signup')}
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-6 h-auto rounded-xl font-medium text-lg"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="pt-6">
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white bg-blue-${(i+5)*100}`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Trusted by 10,000+ farmers</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 font-medium ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Dashboard image */}
          <div className="relative">
            {/* Feature highlights */}
            <div className="absolute -left-12 top-1/4 z-10 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 animate-pulse">
              <div className="bg-green-100 p-2 rounded-lg">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Crop Health</div>
                <div className="text-sm font-medium">98% Healthy</div>
              </div>
            </div>
            
            <div className="absolute -right-8 top-10 z-10 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Cloud className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Weather</div>
                <div className="text-sm font-medium">Optimal Conditions</div>
              </div>
            </div>
            
            <div className="absolute -right-4 bottom-10 z-10 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Yield Forecast</div>
                <div className="text-sm font-medium">+24% This Season</div>
              </div>
            </div>
            
            {/* Main dashboard image */}
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
              <div className="rounded-xl overflow-hidden" style={{ 
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                border: "3px solid rgba(59, 130, 246, 0.3)"
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vZGVybiUyMGFncmljdWx0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&h=500&q=80" 
                  alt="Modern Agriculture Technology"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 bg-blue-600 rounded-full p-3 shadow-lg">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
