import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, BookOpen, Globe, Target, TreePine } from 'lucide-react';

const SocialImpact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Social Impact</h1>
          <p className="text-xl leading-relaxed max-w-3xl">
            We're dedicated to using technology to solve real-world challenges, 
            bringing sustainable change to the agricultural sector and 
            creating opportunities to empower people everywhere.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Commitment Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Veda's Commitment to a Digital and Sustainable Future
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We're here with one specific goal—ensuring that every farmer in this digital world 
              prosper. We stand strongly for the vision of empowering the modern traditional 
              farmers with futuristic technology, sustainable practices and digital solutions. 
              Our mission is to support you as we journey together forward and believe in 
              "Building the World".
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Supporting the community, helping with work progress, empowering more positive 
              technological culture, innovation, creating sustainable and customer-centric solutions, 
              and enabling humanity and the environment—we invest our efforts towards the 
              greater good.
            </p>
          </div>
        </section>

        {/* Digital Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Contribution to Digital Education
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                <div className="flex items-center mb-4">
                  <span className="text-4xl font-bold text-blue-600">1100+</span>
                  <span className="text-lg text-gray-600 ml-2">schools and colleges</span>
                </div>
                <p className="text-gray-700">
                  providing sustainable training to farmers engaging with our platform, 
                  both in-house and more through digital platforms.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <div className="flex items-center mb-4">
                  <span className="text-4xl font-bold text-green-600">50,000+</span>
                  <span className="text-lg text-gray-600 ml-2">people</span>
                </div>
                <p className="text-gray-700">
                  trained globally on everything from technology, apps, solving problems, 
                  to enhancing skills through training.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Student Outreach Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Going Beyond the Students
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We focus on digital development and innovation, engaging and supporting students' 
              unique spirit to all 100+ students over 1,000 parents locally to be trained, 
              informed and educated. We are fueled to the student community engaging in the 
              way to learn our new technology.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Who said Schools could not be Smart?
              </h3>
              <p className="text-blue-800">
                We support a number of educational activities by providing quality modules 
                to enhance efficiency through our programs.
              </p>
            </div>
          </div>
        </section>

        {/* Sustainable Development Goals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Commitment to Sustainability and World Transformation
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <TreePine className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-3">
                  Sustainable Development Goal 4 - "Quality Education"
                </h3>
                <p className="text-green-800 text-sm">
                  Through Veda, we have reached and educated over 100+ schools and colleges 
                  through our educational outreach programs.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <Globe className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Sustainable Development Goal 8 - "Decent Work and Economic Growth"
                </h3>
                <p className="text-blue-800 text-sm">
                  Veda's vast farming provides sustainable employment opportunities 
                  for farmers and employees.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardContent className="p-6">
                <Target className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-purple-900 mb-3">
                  Sustainable Development Goal 13 - "Climate Action"
                </h3>
                <p className="text-purple-800 text-sm">
                  Commitment to promoting sustainable farming practices and reducing 
                  environmental impact through our platforms.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Eliminating Disruptions on the Way to Achieving Quality
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span className="text-lg font-semibold">10,000 farmers</span>
                </div>
                <p className="text-gray-700 mb-4">
                  training and supporting during cultivation, harvesting, and marketing their produce.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span className="text-lg font-semibold">50,000 students</span>
                </div>
                <p className="text-gray-700 mb-4">
                  educated through our digital education platforms and agricultural awareness programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">
            See Veda in action: We'd love to demonstrate what we can do for you
          </h2>
          <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg">
            Get your demo
          </Button>
        </section>
      </div>
    </div>
  );
};

export default SocialImpact;