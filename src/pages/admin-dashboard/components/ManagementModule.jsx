import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ManagementModule = ({ 
  title, 
  description, 
  icon, 
  stats, 
  actions, 
  color = "primary",
  onViewAll 
}) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: "border-primary/20 hover:border-primary/40",
      success: "border-success/20 hover:border-success/40",
      warning: "border-warning/20 hover:border-warning/40",
      error: "border-error/20 hover:border-error/40",
      accent: "border-accent/20 hover:border-accent/40"
    };
    return colors[colorType] || colors.primary;
  };

  const getIconColor = (colorType) => {
    const colors = {
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
      accent: "text-accent"
    };
    return colors[colorType] || colors.primary;
  };

  return (
    <div className={`bg-surface border-2 rounded-lg p-6 transition-smooth ${getColorClasses(color)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-background rounded-lg ${getIconColor(color)}`}>
            <Icon name={icon} size={24} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-heading-medium text-text-primary">
              {title}
            </h3>
            <p className="text-sm text-text-secondary">
              {description}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={onViewAll}
          iconName="ArrowUpRight"
          className="text-text-secondary hover:text-primary"
        />
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-background rounded-lg">
              <div className="text-xl font-heading font-heading-semibold text-text-primary">
                {stat.value}
              </div>
              <div className="text-xs text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {actions && actions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-body font-body-medium text-text-primary mb-2">
            Quick Actions
          </h4>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={action.onClick}
              iconName={action.icon}
              className="w-full justify-start text-sm"
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagementModule;