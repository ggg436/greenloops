
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProcessSection from '@/components/ProcessSection';
import FeaturesSection from '@/components/FeaturesSection';
import IntegrationsSection from '@/components/IntegrationsSection';
import DifferenceSection from '@/components/DifferenceSection';
import DiscoverSection from '@/components/DiscoverSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import DashboardSection from '@/components/DashboardSection';
import StatsSection from '@/components/StatsSection';
import MobileAppSection from '@/components/MobileAppSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';
import BlogSection from '@/components/BlogSection';
import AnalyticsSection from '@/components/AnalyticsSection';
import CollaborateSection from '@/components/CollaborateSection';
import CustomReportSection from '@/components/CustomReportSection';
import VedaFeaturesSection from '@/components/VedaFeaturesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <DifferenceSection />
      <DiscoverSection />
      <HowItWorksSection />
      <ProcessSection />
      <FeaturesSection />
      <IntegrationsSection />
      <DashboardSection />
      <StatsSection />
      <MobileAppSection />
      <TestimonialsSection />
      <TeamSection />
      <BlogSection />
      <AnalyticsSection />
      <CollaborateSection />
      <CustomReportSection />
      <VedaFeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
