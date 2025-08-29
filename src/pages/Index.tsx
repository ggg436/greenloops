
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import IntegrationsSection from '@/components/IntegrationsSection';
// import DifferenceSection from '@/components/DifferenceSection';
// import DiscoverSection from '@/components/DiscoverSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import DashboardSection from '@/components/DashboardSection';
import StatsSection from '@/components/StatsSection';
import MobileAppSection from '@/components/MobileAppSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import BlogSection from '@/components/BlogSection';
import TestimonialsColumnsDemo from '@/components/ui/testimonials-columns-demo';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <div className="px-6 mt-8"><TestimonialsColumnsDemo /></div>
      {/* <DifferenceSection /> */}
      {/* <DiscoverSection /> */}
      <HowItWorksSection />
      <IntegrationsSection />
      <DashboardSection />
      <StatsSection />
      <MobileAppSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
