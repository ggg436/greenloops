import React from 'react';
import { Twitter, Facebook, Instagram, Github } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "JOHN FARMER",
      role: "CEO & Founder",
      avatar: "JF",
      gradient: "bg-gradient-to-br from-orange-400 to-pink-500"
    },
    {
      name: "SARAH GREENE",
      role: "CTO",
      avatar: "SG",
      gradient: "bg-gradient-to-br from-green-400 to-blue-500"
    },
    {
      name: "MIKE HARVEST",
      role: "Head of Agriculture",
      avatar: "MH",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      name: "ANNA SEEDS",
      role: "Lead Data Scientist",
      avatar: "AS",
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">The Team Behind It</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className={`w-24 h-24 rounded-full ${member.gradient} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-lg">{member.avatar}</span>
                </div>
              </div>
              
              {/* Info */}
              <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-6">{member.role}</p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;