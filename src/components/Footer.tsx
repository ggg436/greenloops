import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Twitter, Facebook, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Logo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900">
            AGRITECH
          </h2>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-zinc-900 mb-4 uppercase tracking-wide text-sm">
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">About</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Features</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Works</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Career</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-zinc-900 mb-4 uppercase tracking-wide text-sm">
              HELP
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Customer Support</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Delivery Details</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-zinc-900 mb-4 uppercase tracking-wide text-sm">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Free eBooks</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Development Tutorial</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">How to - Blog</a></li>
              <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">Youtube Playlist</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-zinc-900 mb-4 uppercase tracking-wide text-sm">
              SUBSCRIBE TO NEWSLETTER
            </h3>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl bg-white border-zinc-300"
                required
              />
              <Button 
                type="submit" 
                className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 rounded-xl"
              >
                Join
              </Button>
            </form>

            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="font-semibold text-zinc-900 text-sm mb-1">CALL US</h4>
                <p className="text-zinc-600">(239) 555-0108</p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 text-sm mb-1">EMAIL US</h4>
                <p className="text-zinc-600">info@agritech.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © Copyright 2024. All Rights Reserved
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;