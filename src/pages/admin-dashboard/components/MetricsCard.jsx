import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20",
      success: "bg-success/10 text-success border-success/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      error: "bg-error/10 text-error border-error/20",
      accent: "bg-accent/10 text-accent border-accent/20"
    };
    return colors[colorType] || colors.primary;
  };

  const getChangeColor = (type) => {
    if (type === 'positive') return 'text-success';
    if (type === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = (type) => {
    if (type === 'positive') return 'TrendingUp';
    if (type === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card hover:shadow-elevated transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon name={getChangeIcon(changeType)} size={16} />
            <span className="text-sm font-mono">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-heading font-heading-semibold text-text-primary mb-1">
          {value}
        </h3>
        <p className="text-sm text-text-secondary font-body">
          {title}
        </p>
      </div>
    </div>
  );
};

export default MetricsCard;