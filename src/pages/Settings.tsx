import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'Rafiqur',
    lastName: 'Rahman',
    email: 'rafiqur31is.jla.com',
    phone: '+1 (555) 123-4567'
  });

  // Handle tab change with loading effect
  useEffect(() => {
    // Simulate loading data for the selected tab
    const loadTabData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // This would be where you fetch data specific to the tab
      if (activeSection === 'profile') {
        // Example: fetch user profile data
        console.log('Loading profile data');
      } else if (activeSection === 'applications') {
        // Example: fetch connected applications
        console.log('Loading applications data');
      }
      
      setIsLoading(false);
    };
    
    loadTabData();
  }, [activeSection]);

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
    // Simulate saving with a brief loading state
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // Show appropriate success message based on active section
      let successMessage = '';
      let descriptionMessage = '';
      
      switch (activeSection) {
        case 'general':
          successMessage = 'General settings saved!';
          descriptionMessage = 'Your notification preferences have been updated.';
          break;
        case 'profile':
          successMessage = 'Profile updated successfully!';
          descriptionMessage = 'Your personal information has been saved.';
          break;
        case 'preferences':
          successMessage = 'Preferences saved!';
          descriptionMessage = 'Your application preferences have been updated.';
          break;
        case 'applications':
          successMessage = 'Application settings saved!';
          descriptionMessage = 'Your connected applications have been updated.';
          break;
        case 'workspace-settings':
          successMessage = 'Workspace settings saved!';
          descriptionMessage = 'Your workspace configuration has been updated.';
          break;
        default:
          successMessage = 'Settings saved successfully!';
          descriptionMessage = 'Your changes have been saved.';
      }
      
      toast({
        title: successMessage,
        description: descriptionMessage,
      });
    }, 600);
  };

  const renderMainContent = () => {
    // Update the breadcrumb display based on active section
    const activeItem = sidebarItems.flatMap(section => section.items).find(item => item.id === activeSection);
    
    // Update the breadcrumb in DOM
    const breadcrumbCategory = document.querySelector('.settings-breadcrumb-category');
    if (breadcrumbCategory && activeItem) {
      breadcrumbCategory.textContent = activeItem.label;
    }
    
    switch (activeSection) {
      case 'general':
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

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">My Profile</h2>
              <Button variant="outline">View Public Profile</Button>
            </div>

            {/* Profile Picture */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">R</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-medium">Profile Picture</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Change</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                    <input 
                      id="firstName" 
                      type="text" 
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={userData.firstName}
                      onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                    <input 
                      id="lastName" 
                      type="text" 
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={userData.lastName}
                      onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    className="w-full p-2 border border-border rounded-md bg-background"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <input 
                    id="phone" 
                    type="tel" 
                    className="w-full p-2 border border-border rounded-md bg-background"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Preferences</h2>
            </div>

            {/* Notification Channels */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Mobile</p>
                        <p className="text-sm text-muted-foreground">Push notifications to your device</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.mobile}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, mobile: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Desktop</p>
                        <p className="text-sm text-muted-foreground">Browser notifications on this device</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.desktop}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, desktop: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, email: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card>
              <CardHeader>
                <CardTitle>Language & Region</CardTitle>
                <CardDescription>Set your language and regional preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select defaultValue="english">
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Zone</label>
                    <Select defaultValue="utc-8">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                        <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Connected Applications</h2>
              <Button variant="outline">Connect New App</Button>
            </div>

            {/* Connected Apps */}
            <Card>
              <CardHeader>
                <CardTitle>Connected Applications</CardTitle>
                <CardDescription>Manage apps that have access to your account</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* App 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Weather Service</h4>
                      <p className="text-sm text-muted-foreground">Connected on April 23, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>

                {/* App 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Document Scanner</h4>
                      <p className="text-sm text-muted-foreground">Connected on May 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>

                {/* App 3 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Calendar Integration</h4>
                      <p className="text-sm text-muted-foreground">Connected on June 7, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
              </CardContent>
            </Card>

            {/* API Access */}
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Manage API tokens and access</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Personal Access Token</h4>
                    <p className="text-sm text-muted-foreground">Created on July 12, 2023</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Regenerate</Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Revoke</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'overview':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Analytics Overview</h2>
              <div className="flex items-center gap-2">
                <Select defaultValue="30d">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export</Button>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">12,543</p>
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <span>↑</span>
                      <span>12.5%</span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">Engagement Rate</p>
                    <p className="text-2xl font-bold">64%</p>
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <span>↓</span>
                      <span>2.3%</span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold">$34,245</p>
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <span>↑</span>
                      <span>8.7%</span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Trends</CardTitle>
                <CardDescription>User activity over the selected period</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive chart will render here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      // Add more case handlers for other sections here
      case 'workspace-settings':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Workspace Settings</h2>
              <Button variant="outline">Export Workspace</Button>
            </div>

            {/* Workspace Info */}
            <Card>
              <CardHeader>
                <CardTitle>Workspace Information</CardTitle>
                <CardDescription>Manage your workspace details</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="workspace-name" className="text-sm font-medium">Workspace Name</label>
                  <input 
                    id="workspace-name" 
                    type="text" 
                    className="w-full p-2 border border-border rounded-md bg-background"
                    defaultValue="GreenLoop Team"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="workspace-url" className="text-sm font-medium">Workspace URL</label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md border border-border border-r-0 text-muted-foreground">greenloop.com/</span>
                    <input 
                      id="workspace-url" 
                      type="text" 
                      className="flex-1 p-2 border border-border rounded-r-md bg-background"
                      defaultValue="team-workspace"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="workspace-description" className="text-sm font-medium">Description</label>
                  <textarea 
                    id="workspace-description" 
                    className="w-full p-2 border border-border rounded-md bg-background min-h-[100px]"
                    defaultValue="Our team's collaborative workspace for agricultural project management and data analysis."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Permissions & Access</CardTitle>
                <CardDescription>Control who can access your workspace</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Public Access</h4>
                    <p className="text-sm text-muted-foreground">Allow anyone to view your workspace</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Member Invitations</h4>
                    <p className="text-sm text-muted-foreground">Allow members to invite others</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        );
      
      case 'members':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Team Members</h2>
              <Button>Invite Members</Button>
            </div>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>Manage your team members and their access</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead className="text-left">
                      <tr className="border-b border-border">
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Role</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>R</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Rafiqur Rahman</p>
                              <p className="text-sm text-muted-foreground">rafiqur31is.jla.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline">Admin</Badge>
                        </td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Remove</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>J</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">John Doe</p>
                              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline">Editor</Badge>
                        </td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Remove</Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Sarah Smith</p>
                              <p className="text-sm text-muted-foreground">sarah.smith@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline">Viewer</Badge>
                        </td>
                        <td className="py-3">
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Remove</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      // Default case for any tab that doesn't have specific content yet
      default:
        return (
          <div className="space-y-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/-/g, ' ')}</CardTitle>
                <CardDescription>
                  This feature is currently being developed. We're working to make it available soon.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-center text-muted-foreground max-w-md">
                    The {activeSection.replace(/-/g, ' ')} section is coming soon. Our team is working hard to deliver this feature as quickly as possible.
                  </p>
                  <Button variant="outline" onClick={() => setActiveSection('general')}>
                    Return to General Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
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
              <span className="text-sm text-muted-foreground settings-breadcrumb-category">
                {sidebarItems.flatMap(section => section.items).find(item => item.id === activeSection)?.label || 'General'}
              </span>
            </div>

            {/* Main content */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-sm text-muted-foreground">Loading {activeSection.replace(/-/g, ' ')} settings...</p>
                </div>
              </div>
            ) : (
              renderMainContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;