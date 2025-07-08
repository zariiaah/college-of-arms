import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import ManagementModule from './components/ManagementModule';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import SystemHealth from './components/SystemHealth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication and admin role
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
      navigate('/homepage');
      return;
    }

    const userData = JSON.parse(currentUser);
    if (userData.role !== 'admin') {
      navigate('/homepage');
      return;
    }

    setUser(userData);

    // Load dashboard data
    const mockDashboardData = {
      metrics: {
        totalUsers: { value: 247, change: '+12%', changeType: 'positive' },
        activeProjects: { value: 89, change: '+5%', changeType: 'positive' },
        newsArticles: { value: 156, change: '+8%', changeType: 'positive' },
        systemHealth: { value: '99.9%', change: '0%', changeType: 'neutral' }
      },
      userManagement: {
        stats: [
          { label: 'Total Officers', value: '247' },
          { label: 'Pending Approval', value: '12' }
        ],
        actions: [
          { label: 'Approve Registrations', icon: 'UserCheck', onClick: () => console.log('Approve registrations') },
          { label: 'Manage Roles', icon: 'Settings', onClick: () => console.log('Manage roles') },
          { label: 'View All Users', icon: 'Users', onClick: () => navigate('/officers-directory') }
        ]
      },
      contentManagement: {
        stats: [
          { label: 'Published Posts', value: '156' },
          { label: 'Pending Review', value: '8' }
        ],
        actions: [
          { label: 'Moderate Content', icon: 'Shield', onClick: () => console.log('Moderate content') },
          { label: 'Create News Post', icon: 'Plus', onClick: () => console.log('Create news') },
          { label: 'Manage Archive', icon: 'Archive', onClick: () => navigate('/archive-browser') }
        ]
      },
      analytics: {
        stats: [
          { label: 'Page Views', value: '12.5K' },
          { label: 'Active Sessions', value: '89' }
        ],
        actions: [
          { label: 'View Reports', icon: 'BarChart3', onClick: () => console.log('View reports') },
          { label: 'Export Data', icon: 'Download', onClick: () => console.log('Export data') },
          { label: 'Usage Analytics', icon: 'TrendingUp', onClick: () => console.log('Usage analytics') }
        ]
      }
    };

    setDashboardData(mockDashboardData);
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin">
            <Icon name="Loader2" size={24} className="text-primary" />
          </div>
          <span className="text-text-primary font-body">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-heading-semibold text-text-primary mb-2">
                Admin Dashboard
              </h1>
              <p className="text-text-secondary font-body">
                Comprehensive system oversight and management
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg">
                <Icon name="Shield" size={16} />
                <span className="text-sm font-body font-body-medium">
                  Admin Access
                </span>
              </div>
              
              <Button
                variant="primary"
                iconName="Plus"
                onClick={() => console.log('Quick create')}
              >
                Quick Create
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Herald Officers"
            value={dashboardData.metrics?.totalUsers.value}
            change={dashboardData.metrics?.totalUsers.change}
            changeType={dashboardData.metrics?.totalUsers.changeType}
            icon="Users"
            color="primary"
          />
          <MetricsCard
            title="Active Projects"
            value={dashboardData.metrics?.activeProjects.value}
            change={dashboardData.metrics?.activeProjects.change}
            changeType={dashboardData.metrics?.activeProjects.changeType}
            icon="Briefcase"
            color="success"
          />
          <MetricsCard
            title="News Articles"
            value={dashboardData.metrics?.newsArticles.value}
            change={dashboardData.metrics?.newsArticles.change}
            changeType={dashboardData.metrics?.newsArticles.changeType}
            icon="FileText"
            color="accent"
          />
          <MetricsCard
            title="System Uptime"
            value={dashboardData.metrics?.systemHealth.value}
            change={dashboardData.metrics?.systemHealth.change}
            changeType={dashboardData.metrics?.systemHealth.changeType}
            icon="Activity"
            color="success"
          />
        </div>

        {/* Management Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ManagementModule
            title="User Management"
            description="Manage herald officers, roles, and permissions"
            icon="Users"
            color="primary"
            stats={dashboardData.userManagement?.stats}
            actions={dashboardData.userManagement?.actions}
            onViewAll={() => navigate('/officers-directory')}
          />
          
          <ManagementModule
            title="Content Management"
            description="Oversee news posts, archive, and content moderation"
            icon="FileText"
            color="success"
            stats={dashboardData.contentManagement?.stats}
            actions={dashboardData.contentManagement?.actions}
            onViewAll={() => navigate('/archive-browser')}
          />
          
          <ManagementModule
            title="System Analytics"
            description="Monitor usage statistics and system performance"
            icon="BarChart3"
            color="accent"
            stats={dashboardData.analytics?.stats}
            actions={dashboardData.analytics?.actions}
            onViewAll={() => console.log('View analytics')}
          />
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ActivityFeed />
          <SystemHealth />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Footer Actions */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-1">
                System Administration
              </h3>
              <p className="text-sm text-text-secondary">
                Advanced system configuration and maintenance tools
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                iconName="Settings"
                onClick={() => console.log('System settings')}
              >
                System Settings
              </Button>
              
              <Button
                variant="ghost"
                iconName="Download"
                onClick={() => console.log('Generate report')}
              >
                Generate Report
              </Button>
              
              <Button
                variant="outline"
                iconName="Database"
                onClick={() => console.log('System backup')}
              >
                System Backup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;