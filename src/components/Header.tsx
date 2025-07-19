
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full px-8 py-6 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <h1 className="text-xl font-extrabold text-zinc-900 tracking-[4px] uppercase">
            DR. KRISHAK
          </h1>
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
                            Who we are and our journey
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
                             Our approach and impact
                           </p>
                         </div>
                       </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                          <h3 className="text-lg font-bold">Career</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            Join our team
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a href="#" className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors text-base">
              Features
            </a>
            <a href="#" className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors text-base">
              Products
            </a>
            <a 
              href="/team" 
              className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors text-base"
              onClick={(e) => {
                e.preventDefault();
                navigate('/team');
              }}
            >
              Team
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
                          <h3 className="text-lg font-bold">Dealership Program</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            Partner with us
                          </p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                          <h3 className="text-lg font-bold">Help Center</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            Get answers on your Veda's queries
                          </p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div 
                          className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md"
                          onClick={() => navigate('/blog')}
                        >
                          <h3 className="text-lg font-bold">Blog</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            News, articles, updates and stories
                          </p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                          <h3 className="text-lg font-bold">FAQ</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            Our most asked questions answered
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
                          <h3 className="text-lg font-bold">Contact Support</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            Reach out to support team
                          </p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <div className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
                          <h3 className="text-lg font-bold">Contact Us</h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            Reach out to Us
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
          <Button 
            className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-3 rounded-lg font-bold text-base shadow-lg"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
