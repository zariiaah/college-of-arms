import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-card mb-6">
      {/* Desktop Tab Navigation */}
      <div className="hidden md:flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-6 py-4 text-sm font-body font-body-medium
              border-b-2 transition-smooth
              ${activeTab === tab.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-background'
              }
            `}
          >
            <Icon name={tab.icon} size={18} />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-mono
                ${activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-text-secondary'
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden">
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => onTabChange(e.target.value)}
            className="w-full px-4 py-3 text-sm font-body font-body-medium text-text-primary bg-surface border-0 appearance-none focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label} {tab.count !== undefined ? `(${tab.count})` : ''}
              </option>
            ))}
          </select>
          <Icon
            name="ChevronDown"
            size={16}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;