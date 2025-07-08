import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ className = "" }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'portfolio', 'system'
  const notificationRef = useRef(null);

  // Mock notifications - replace with actual notification system
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'portfolio',
        title: 'Portfolio Updated',
        message: 'Your professional portfolio has been successfully updated with new achievements.',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        read: false,
        priority: 'normal',
        actionUrl: '/portfolio-editor'
      },
      {
        id: 2,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: true,
        priority: 'high',
        actionUrl: null
      },
      {
        id: 3,
        type: 'archive',
        title: 'New SVG Resources',
        message: '15 new ceremonial SVG graphics have been added to the archive.',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        read: false,
        priority: 'normal',
        actionUrl: '/archive-browser'
      },
      {
        id: 4,
        type: 'admin',
        title: 'User Registration',
        message: 'New Herald officer registration requires approval.',
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        read: false,
        priority: 'high',
        actionUrl: '/admin-dashboard'
      },
      {
        id: 5,
        type: 'portfolio',
        title: 'Profile Review',
        message: 'Your portfolio is scheduled for quarterly review next week.',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        read: true,
        priority: 'low',
        actionUrl: '/officer-portfolio'
      }
    ];

    setNotifications(mockNotifications);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: ['portfolio', 'system', 'archive'][Math.floor(Math.random() * 3)],
        title: 'Real-time Update',
        message: 'This is a simulated real-time notification.',
        timestamp: new Date(),
        read: false,
        priority: 'normal',
        actionUrl: null
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 notifications
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Close notification center when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    setIsOpen(false);
  };

  const getNotificationIcon = (type, priority) => {
    const iconMap = {
      portfolio: 'User',
      system: 'Settings',
      archive: 'Archive',
      admin: 'Shield'
    };

    return iconMap[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'low') return 'text-text-secondary';
    
    const colorMap = {
      portfolio: 'text-accent',
      system: 'text-primary',
      archive: 'text-success',
      admin: 'text-warning'
    };

    return colorMap[type] || 'text-text-primary';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className={`relative ${className}`} ref={notificationRef}>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-mono font-mono-normal">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-surface border border-border rounded-lg shadow-elevated z-dropdown max-h-96 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={18} className="text-text-primary" />
              <h3 className="font-heading font-heading-medium text-text-primary">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="bg-error text-error-foreground text-xs px-2 py-0.5 rounded-full font-mono">
                  {unreadCount}
                </span>
              )}
            </div>
            
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                onClick={markAllAsRead}
                className="text-xs text-accent hover:text-accent"
              >
                Mark all read
              </Button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 p-2 border-b border-border bg-background">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'portfolio', label: 'Portfolio' },
              { key: 'system', label: 'System' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`
                  px-3 py-1 text-xs rounded-md transition-smooth font-body
                  ${filter === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      relative p-4 cursor-pointer transition-smooth
                      ${notification.read ? 'hover:bg-background' : 'bg-accent/5 hover:bg-accent/10'}
                    `}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon
                        name={getNotificationIcon(notification.type, notification.priority)}
                        size={18}
                        className={getNotificationColor(notification.type, notification.priority)}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-body font-body-medium ${
                            notification.read ? 'text-text-secondary' : 'text-text-primary'
                          }`}>
                            {notification.title}
                          </h4>
                          
                          <div className="flex items-center space-x-1 ml-2">
                            <span className="text-xs text-text-secondary font-mono">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <Button
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 opacity-0 group-hover:opacity-100 hover:text-error"
                            >
                              <Icon name="X" size={12} />
                            </Button>
                          </div>
                        </div>
                        
                        <p className={`text-sm mt-1 ${
                          notification.read ? 'text-text-secondary' : 'text-text-primary'
                        }`}>
                          {notification.message}
                        </p>
                        
                        {notification.actionUrl && (
                          <div className="flex items-center space-x-1 mt-2 text-accent">
                            <span className="text-xs font-body">View details</span>
                            <Icon name="ArrowUpRight" size={12} />
                          </div>
                        )}
                      </div>
                      
                      {!notification.read && (
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-text-secondary mx-auto mb-3" />
                <p className="text-sm text-text-secondary">
                  {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-3 border-t border-border bg-background">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="w-full text-sm text-text-secondary hover:text-text-primary"
              >
                Close notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;