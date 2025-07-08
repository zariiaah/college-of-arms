import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_created': return 'Plus';
      case 'project_updated': return 'Edit';
      case 'project_completed': return 'CheckCircle';
      case 'achievement_earned': return 'Award';
      case 'archive_uploaded': return 'Upload';
      case 'profile_updated': return 'User';
      case 'news_posted': return 'MessageSquare';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'project_created': return 'text-accent bg-accent/10';
      case 'project_updated': return 'text-primary bg-primary/10';
      case 'project_completed': return 'text-success bg-success/10';
      case 'achievement_earned': return 'text-warning bg-warning/10';
      case 'archive_uploaded': return 'text-secondary bg-secondary/10';
      case 'profile_updated': return 'text-text-primary bg-text-primary/10';
      case 'news_posted': return 'text-accent bg-accent/10';
      default: return 'text-text-secondary bg-text-secondary/10';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - activityTime) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return activityTime.toLocaleDateString();
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card p-6">
      <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-6">
        Recent Activity
      </h3>
      
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative">
            {/* Timeline Line */}
            {index < activities.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
            )}
            
            <div className="flex items-start space-x-4">
              {/* Activity Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={20} />
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-body font-body-medium text-text-primary">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-text-secondary font-mono flex-shrink-0 ml-2">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary leading-relaxed mb-2">
                  {activity.description}
                </p>
                
                {/* Activity Metadata */}
                {activity.metadata && (
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    {activity.metadata.project && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Folder" size={12} />
                        <span>Project: {activity.metadata.project}</span>
                      </div>
                    )}
                    
                    {activity.metadata.category && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Tag" size={12} />
                        <span>Category: {activity.metadata.category}</span>
                      </div>
                    )}
                    
                    {activity.metadata.impact && (
                      <div className="flex items-center space-x-1">
                        <Icon name="TrendingUp" size={12} />
                        <span>Impact: {activity.metadata.impact}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Activity Link */}
                {activity.link && (
                  <a
                    href={activity.link.url}
                    className="inline-flex items-center space-x-1 text-accent hover:text-accent/80 transition-smooth text-xs mt-2"
                  >
                    <span>{activity.link.text}</span>
                    <Icon name="ArrowUpRight" size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={32} className="text-text-secondary mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;