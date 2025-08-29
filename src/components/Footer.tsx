import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Github, 
  Linkedin, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ChevronRight,
  Globe,
  Clock
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Top Wave Pattern */}
      <div className="w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 text-blue-50"
          style={{ fill: 'currentColor' }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      {/* Main Footer Content */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-8">
          {/* Top Section with Logo and Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">G</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">GREENLOOP</h2>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                GreenLoop – Empowering people to build sustainable communities through smarter recycling and eco-friendly innovation.
              </p>
              <div className="flex space-x-4 mb-6">
                <a href="https://www.facebook.com/sanjok.gc.98" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>About Us</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>Services</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>Products</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>Blog</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>Contact</span>
                    </a>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>Careers</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>Privacy Policy</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>Terms of Service</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>FAQ</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                      <span>Support</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with the latest recycling tips, sustainability updates, and exclusive eco-friendly offers.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-lg bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </form>
            </div>
          </div>
          
          {/* Contact Info and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 pt-8 border-t border-gray-200">
            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                Contact Information
              </h3>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Kathmandu, Nepal
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">+977-XXXXXXXXX</p>
                  <p className="text-gray-500 text-sm">Monday to Friday, 9am to 6pm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:info@greenloop.com" className="text-gray-600 hover:text-green-600 transition-colors">info@greenloop.com</a>
                  <br />
                  <a href="mailto:sanjokgharti01@gmail.com" className="text-gray-600 hover:text-green-600 transition-colors">sanjokgharti01@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">www.greenloop.com</a>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">Working Hours:</p>
                  <p className="text-gray-500 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-500 text-sm">Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="lg:col-span-3 h-64 bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625953634!2d85.29111337466!3d27.70895594441315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1653138128672!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="GreenLoop Location"
              ></iframe>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © Copyright {new Date().getFullYear()} GreenLoop. All Rights Reserved | Designed by <a href="https://www.facebook.com/sanjok.gc.98" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Sanjok Gharti</a>
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Payment Methods:</span>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;