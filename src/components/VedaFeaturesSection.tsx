import React from 'react';
import { Settings, Headphones, Cloud, Shield, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VedaFeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Features Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <span className="text-orange-500 font-medium text-lg">Features</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6 leading-tight">
              Veda is all you need to auto-pilot your{' '}
              <span className="text-slate-800">school and college.</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-2 leading-relaxed">
              Veda handles every aspect of schools, so you can get back to doing what matters the most -{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600 underline font-medium">
                helping students
              </a>{' '}
              and building their future.
            </p>

            <Button 
              variant="ghost" 
              className="text-orange-500 hover:text-orange-600 p-0 h-auto font-medium mt-6 group"
            >
              Explore Our Features
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Features Grid - Staggered Layout */}
          <div className="relative">
            {/* Exceptional Support - Top Right */}
            <div className="absolute top-0 right-0 w-64 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-700 text-lg mb-3">
                Exceptional Support
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We have a support team of 15+ members, available 24 hours
              </p>
            </div>

            {/* Cloud-Based - Middle Left */}
            <div className="absolute top-32 left-0 w-64 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-700 text-lg mb-3">
                Cloud-Based
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use the latest and greatest servers to secure your data.
              </p>
            </div>

            {/* Extreme Security - Middle Right */}
            <div className="absolute top-48 right-0 w-64 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-700 text-lg mb-3">
                Extreme Security
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our system is regularly security audited and has detailed access-level.
              </p>
            </div>

            {/* Simplicity - Bottom Center */}
            <div className="absolute top-80 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-700 text-lg mb-3">
                Simplicity
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our system is designed with ease of use in mind.
              </p>
            </div>

            {/* Spacer to maintain height */}
            <div className="h-[500px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VedaFeaturesSection;