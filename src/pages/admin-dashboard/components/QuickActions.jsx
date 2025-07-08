import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Create News Post',
      description: 'Publish new announcement or update',
      icon: 'Plus',
      color: 'success',
      onClick: () => console.log('Create news post')
    },
    {
      id: 2,
      title: 'Add New Officer',
      description: 'Register new herald officer',
      icon: 'UserPlus',
      color: 'primary',
      onClick: () => console.log('Add new officer')
    },
    {
      id: 3,
      title: 'Upload Archive',
      description: 'Add SVG resources to archive',
      icon: 'Upload',
      color: 'accent',
      onClick: () => console.log('Upload archive')
    },
    {
      id: 4,
      title: 'System Backup',
      description: 'Create system backup',
      icon: 'Database',
      color: 'warning',
      onClick: () => console.log('System backup')
    },
    {
      id: 5,
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: 'BarChart3',
      color: 'primary',
      onClick: () => console.log('Generate report')
    },
    {
      id: 6,
      title: 'Moderate Content',
      description: 'Review pending content',
      icon: 'Shield',
      color: 'error',
      onClick: () => console.log('Moderate content')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      error: 'bg-error/10 text-error hover:bg-error/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-accent" />
          <h3 className="text-lg font-heading font-heading-medium text-text-primary">
            Quick Actions
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`
                p-4 rounded-lg text-left transition-smooth border-2 border-transparent
                hover:border-current ${getColorClasses(action.color)}
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={action.icon} size={20} />
                <h4 className="font-body font-body-medium text-text-primary">
                  {action.title}
                </h4>
              </div>
              <p className="text-sm text-text-secondary">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border bg-background">
        <Button
          variant="ghost"
          iconName="Settings"
          className="w-full justify-center text-text-secondary hover:text-primary"
        >
          Advanced Settings
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;