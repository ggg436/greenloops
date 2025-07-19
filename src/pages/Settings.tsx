import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Settings as SettingsIcon, 
  Calendar, 
  BarChart3, 
  Users, 
  FileText, 
  PieChart, 
  Shield, 
  CreditCard, 
  Zap,
  ChevronRight,
  Check,
  Smartphone,
  Monitor,
  Mail,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('general');
  const [notifications, setNotifications] = useState({
    dailyUpdate: true,
    newEvent: true,
    newTeam: true,
    mobile: true,
    desktop: true,
    email: false,
    twoFactor: true
  });

  const sidebarItems = [
    {
      category: 'ANALYTICS',
      items: [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'team-insights', label: 'Team Insights', icon: Users },
        { id: 'engagement', label: 'Engagement', icon: PieChart },
        { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 }
      ]
    },
    {
      category: 'ACCOUNT',
      items: [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'general', label: 'General', icon: SettingsIcon },
        { id: 'preferences', label: 'Preferences', icon: FileText },
        { id: 'applications', label: 'Applications', icon: Zap }
      ]
    },
    {
      category: 'WORKSPACE',
      items: [
        { id: 'workspace-settings', label: 'Settings', icon: SettingsIcon },
        { id: 'members', label: 'Members', icon: Users },
        { id: 'upgrade', label: 'Upgrade', icon: Zap }
      ]
    },
    {
      category: 'CONTEXT',
      items: [
        { id: 'calendar', label: 'Calendar Events', icon: Calendar },
        { id: 'insights', label: 'Insights', icon: BarChart3 },
        { id: 'spreadsheet', label: 'Spreadsheet', icon: FileText }
      ]
    },
    {
      category: 'OTHERS',
      items: [
        { id: 'apps', label: 'Apps', icon: Zap },
        { id: 'properties', label: 'Properties', icon: FileText },
        { id: 'settings', label: 'Settings', icon: SettingsIcon }
      ]
    }
  ];

  const handleSave = () => {
    toast({
      title: "Settings saved successfully! ✨",
      description: "Your preferences have been updated.",
    });
  };

  const renderMainContent = () => {
    if (activeSection === 'general') {
      return (
        <div className="space-y-8">
          {/* My Notifications Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">My Notifications</h2>
              <Button variant="link" className="text-primary text-sm">
                About notifications?
              </Button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Notify me when...</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm">Daily productivity update</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm">New event created</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm">When added on new team</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile push notifications */}
          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Mobile push notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive push notification whenever your organisation requires your attentions
                  </p>
                </div>
                <Switch
                  checked={notifications.mobile}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, mobile: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Desktop Notification */}
          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Desktop Notification</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive desktop notification whenever your organisation requires your attentions
                  </p>
                </div>
                <Switch
                  checked={notifications.desktop}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, desktop: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Notification */}
          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Email Notification</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive email whenever your organisation requires your attentions
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* My Settings Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">My Settings</h2>
            
            {/* Appearance */}
            <Card className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Appearance</h3>
                    <p className="text-sm text-muted-foreground">
                      Customize how you theming looks on your device
                    </p>
                  </div>
                  <Select defaultValue="light">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Two-factor authentication */}
            <Card className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Two-factor authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (TOTP)
                    </p>
                  </div>
                  <Switch
                    checked={notifications.twoFactor}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, twoFactor: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Language */}
            <Card className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Language</h3>
                    <p className="text-sm text-muted-foreground">
                      Customize how you theming looks on your device
                    </p>
                  </div>
                  <Select defaultValue="english">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              This section is under development. Please check back later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card">
        <div className="flex items-center gap-4 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">R</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">Rafiqur...</p>
              <p className="text-xs text-muted-foreground">rafiqur31is.jla.com</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search item"
                className="w-full pl-4 pr-8 py-2 text-sm border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                ⌘ K
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">R</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-card border-r border-border/50 p-4">
          <div className="space-y-6">
            {sidebarItems.map((section) => (
              <div key={section.category} className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground tracking-wider">
                  {section.category}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">J</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 -ml-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-accent text-accent-foreground text-xs">K</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">+</span>
              <Button variant="outline" size="sm" className="ml-auto">
                Invite +
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xl font-semibold text-foreground">Settings</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">General</span>
            </div>

            {/* Main content */}
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;