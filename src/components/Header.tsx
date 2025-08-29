
import React from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail, MapPin, Tractor, Wheat, Sprout, Cpu, Users, BookOpen } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      {/* Main Header */}
      <header className="w-full px-8 py-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-12">
            <div className="flex items-center gap-3" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <Tractor className="w-6 h-6 text-white absolute" />
                <Wheat className="w-4 h-4 text-white absolute bottom-1 right-1" />
                <Sprout className="w-3 h-3 text-white absolute top-1 right-1" />
              </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 tracking-normal">
              GreenLoop
            </h1>
          </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors bg-transparent text-base">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                          <h3 className="text-lg font-bold">Our Story</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            Founded by Sanjok Gharti, GreenLoop is dedicated to transforming agriculture in Nepal and beyond through technology and innovation.
                          </p>
                        </div>
                      </NavigationMenuLink>
                       <NavigationMenuLink asChild>
                         <div 
                           className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md"
                           onClick={() => navigate('/social-impact')}
                         >
                           <h3 className="text-lg font-bold">Social Impact</h3>
                           <p className="text-sm text-muted-foreground font-medium">
                              How we're improving agricultural sustainability and farmer livelihoods across Nepal
                           </p>
                         </div>
                       </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                          <div 
                            className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md"
                            onClick={() => navigate('/team')}
                          >
                            <h3 className="text-lg font-bold">Our Team</h3>
                            <p className="text-sm text-muted-foreground font-medium">
                              Meet the experts and innovators behind GreenLoop
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors bg-transparent text-base">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px]">
                        <NavigationMenuLink asChild>
                          <div 
                            className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md"
                            onClick={() => navigate('/services')}
                          >
                            <div className="flex items-center gap-2">
                              <Tractor className="h-5 w-5 text-green-600" />
                              <h3 className="text-lg font-bold">Our Services</h3>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                              Comprehensive agricultural solutions for Nepali farmers
                            </p>
                          </div>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <div 
                            className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md"
                            onClick={() => navigate('/technology')}
                          >
                            <div className="flex items-center gap-2">
                              <Cpu className="h-5 w-5 text-blue-600" />
                              <h3 className="text-lg font-bold">Our Technology</h3>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                              Discover the innovation behind GreenLoop's agricultural tools
                            </p>
                          </div>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <div 
                            className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md"
                            onClick={() => navigate('/success-stories')}
                          >
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-amber-600" />
                              <h3 className="text-lg font-bold">Success Stories</h3>
                            </div>
                          <p className="text-sm text-muted-foreground font-medium">
                              See how real farmers are transforming their practices with our solutions
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
              
              <a 
                onClick={() => navigate('/services')}
                className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors text-base cursor-pointer"
              >
              Products
            </a>
              
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors bg-transparent text-base">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-green-600" />
                              <h3 className="text-lg font-bold">Farming Knowledge Base</h3>
                            </div>
                          <p className="text-sm text-muted-foreground font-medium">
                              Agricultural guides, crop calendars and farming best practices
                          </p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                          <h3 className="text-lg font-bold">Help Center</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                              Get support for all your GreenLoop platform questions
                          </p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div 
                          className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md"
                          onClick={() => navigate('/blog')}
                        >
                            <h3 className="text-lg font-bold">Agricultural Blog</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                              Latest farming news, crop insights and success stories
                          </p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                            <h3 className="text-lg font-bold">Farming FAQ</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                              Common agricultural questions answered by experts
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors bg-transparent text-base">
                    Contact
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                            <h3 className="text-lg font-bold">Farmer Support</h3>
                            <p className="text-sm text-muted-foreground font-medium">
                              24/7 agricultural assistance for all your farming needs
                            </p>
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                            <h3 className="text-lg font-bold">Business Inquiries</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                              Partnership opportunities and B2B solutions
                          </p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                            <h3 className="text-lg font-bold">Regional Offices</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                              Find GreenLoop representatives in your district
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        
        <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <Button 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 mr-4"
                onClick={() => user ? navigate('/dashboard') : navigate('/signup')}
              >
                Register
              </Button>
            </div>
          <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-base shadow-lg"
            onClick={() => user ? navigate('/dashboard') : navigate('/login')}
          >
            {user ? 'Dashboard' : 'Login'}
          </Button>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
