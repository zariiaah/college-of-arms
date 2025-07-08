import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DirectoryHeader = ({ totalOfficers, activeOfficers }) => {
  const stats = [
    {
      label: 'Total Officers',
      value: totalOfficers,
      icon: 'Users',
      color: 'text-primary'
    },
    {
      label: 'Active Officers',
      value: activeOfficers,
      icon: 'UserCheck',
      color: 'text-success'
    },
    {
      label: 'Specializations',
      value: 8,
      icon: 'Award',
      color: 'text-accent'
    },
    {
      label: 'Ranks Available',
      value: 5,
      icon: 'Shield',
      color: 'text-warning'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card p-6 mb-6">
      {/* Header Content */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-heading-bold text-text-primary mb-2">
            Officers Directory
          </h1>
          <p className="text-text-secondary font-body max-w-2xl">
            Discover and connect with Herald officers across all ranks and specializations. 
            Browse portfolios, view current projects, and find the right expertise for your ceremonial needs.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button
            variant="outline"
            iconName="Download"
            onClick={() => {}}
          >
            Export Directory
          </Button>
          <Button
            variant="primary"
            iconName="UserPlus"
            onClick={() => {}}
          >
            Request Access
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-4 bg-background rounded-lg border border-border"
          >
            <div className={`p-2 rounded-lg bg-surface border border-border ${stat.color}`}>
              <Icon name={stat.icon} size={20} />
            </div>
            <div>
              <p className="text-xl font-heading font-heading-semibold text-text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-text-secondary font-body">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-border">
        <span className="text-sm text-text-secondary font-body font-body-medium">
          Quick Filters:
        </span>
        <Button variant="ghost" className="text-sm">
          Earl Marshal
        </Button>
        <Button variant="ghost" className="text-sm">
          King of Arms
        </Button>
        <Button variant="ghost" className="text-sm">
          Active Projects
        </Button>
        <Button variant="ghost" className="text-sm">
          Recent Joiners
        </Button>
      </div>
    </div>
  );
};

export default DirectoryHeader;