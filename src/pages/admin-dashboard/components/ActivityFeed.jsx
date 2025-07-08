import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        type: 'user',
        action: 'User Registration',
        description: 'New herald officer "Sir James Windsor" registered',
        user: 'System',
        timestamp: new Date(Date.now() - 300000),
        severity: 'info'
      },
      {
        id: 2,
        type: 'content',
        action: 'News Post Created',
        description: 'Published "Annual Herald Ceremony Updates"',
        user: 'Admin User',
        timestamp: new Date(Date.now() - 600000),
        severity: 'success'
      },
      {
        id: 3,
        type: 'system',
        action: 'Archive Upload',
        description: '5 new SVG resources added to ceremonial collection',
        user: 'Sir John Herald',
        timestamp: new Date(Date.now() - 900000),
        severity: 'info'
      },
      {
        id: 4,
        type: 'security',
        action: 'Failed Login Attempt',
        description: 'Multiple failed login attempts detected',
        user: 'Security System',
        timestamp: new Date(Date.now() - 1200000),
        severity: 'warning'
      },
      {
        id: 5,
        type: 'user',
        action: 'Portfolio Updated',
        description: 'Dame Sarah Ceremonial updated professional portfolio',
        user: 'Dame Sarah Ceremonial',
        timestamp: new Date(Date.now() - 1800000),
        severity: 'success'
      }
    ];

    setActivities(mockActivities);
  }, []);

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  const getActivityIcon = (type) => {
    const icons = {
      user: 'User',
      content: 'FileText',
      system: 'Settings',
      security: 'Shield'
    };
    return icons[type] || 'Activity';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-primary'
    };
    return colors[severity] || 'text-text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-heading font-heading-medium text-text-primary">
            Recent Activity
          </h3>
          <Button
            variant="ghost"
            iconName="RefreshCw"
            onClick={() => window.location.reload()}
            className="text-text-secondary hover:text-primary"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex items-center space-x-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'user', label: 'Users' },
            { key: 'content', label: 'Content' },
            { key: 'system', label: 'System' },
            { key: 'security', label: 'Security' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`
                px-3 py-1 text-xs rounded-md transition-smooth font-body
                ${filter === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredActivities.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-background transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-background ${getSeverityColor(activity.severity)}`}>
                    <Icon name={getActivityIcon(activity.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-body font-body-medium text-text-primary">
                        {activity.action}
                      </h4>
                      <span className="text-xs text-text-secondary font-mono">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mt-1">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Icon name="User" size={12} className="text-text-secondary" />
                      <span className="text-xs text-text-secondary">
                        {activity.user}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Activity" size={32} className="text-text-secondary mx-auto mb-3" />
            <p className="text-sm text-text-secondary">
              No {filter === 'all' ? '' : filter} activities found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;