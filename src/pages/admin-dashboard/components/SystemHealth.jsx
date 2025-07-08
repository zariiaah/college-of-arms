import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealth = () => {
  const [healthData, setHealthData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const mockHealthData = {
      server: {
        status: 'healthy',
        uptime: '99.9%',
        responseTime: '45ms',
        load: '23%'
      },
      database: {
        status: 'healthy',
        connections: '12/100',
        queryTime: '2.3ms',
        storage: '67%'
      },
      storage: {
        status: 'warning',
        used: '78%',
        available: '2.1GB',
        backup: 'healthy'
      },
      security: {
        status: 'healthy',
        threats: '0',
        lastScan: '2 hours ago',
        ssl: 'valid'
      }
    };

    setHealthData(mockHealthData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Randomly update some metrics
      setHealthData(prev => ({
        ...prev,
        server: {
          ...prev.server,
          responseTime: `${Math.floor(Math.random() * 50) + 20}ms`,
          load: `${Math.floor(Math.random() * 30) + 15}%`
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      healthy: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    };
    return colors[status] || 'text-text-secondary';
  };

  const getStatusIcon = (status) => {
    const icons = {
      healthy: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle'
    };
    return icons[status] || 'Circle';
  };

  const getStatusBg = (status) => {
    const backgrounds = {
      healthy: 'bg-success/10',
      warning: 'bg-warning/10',
      error: 'bg-error/10'
    };
    return backgrounds[status] || 'bg-background';
  };

  const healthItems = [
    {
      name: 'Server',
      icon: 'Server',
      ...healthData.server,
      metrics: [
        { label: 'Uptime', value: healthData.server?.uptime },
        { label: 'Response', value: healthData.server?.responseTime },
        { label: 'Load', value: healthData.server?.load }
      ]
    },
    {
      name: 'Database',
      icon: 'Database',
      ...healthData.database,
      metrics: [
        { label: 'Connections', value: healthData.database?.connections },
        { label: 'Query Time', value: healthData.database?.queryTime },
        { label: 'Storage', value: healthData.database?.storage }
      ]
    },
    {
      name: 'Storage',
      icon: 'HardDrive',
      ...healthData.storage,
      metrics: [
        { label: 'Used', value: healthData.storage?.used },
        { label: 'Available', value: healthData.storage?.available },
        { label: 'Backup', value: healthData.storage?.backup }
      ]
    },
    {
      name: 'Security',
      icon: 'Shield',
      ...healthData.security,
      metrics: [
        { label: 'Threats', value: healthData.security?.threats },
        { label: 'Last Scan', value: healthData.security?.lastScan },
        { label: 'SSL', value: healthData.security?.ssl }
      ]
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-heading-medium text-text-primary">
              System Health
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>Updated {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthItems.map((item) => (
            <div key={item.name} className={`p-4 rounded-lg border ${getStatusBg(item.status)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={item.icon} size={18} className="text-text-primary" />
                  <h4 className="font-body font-body-medium text-text-primary">
                    {item.name}
                  </h4>
                </div>
                <div className={`flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                  <Icon name={getStatusIcon(item.status)} size={16} />
                  <span className="text-sm font-body capitalize">
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {item.metrics?.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{metric.label}:</span>
                    <span className="font-mono text-text-primary">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Info" size={14} />
            <span>All systems operational</span>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;