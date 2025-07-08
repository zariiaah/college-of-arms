import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationIndicator = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // Mock authentication and notifications - replace with actual logic
  useEffect(() => {
    const mockUser = localStorage.getItem('user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
      // Mock notifications for authenticated users
      setNotifications([
        {
          id: 1,
          type: 'portfolio',
          message: 'Portfolio updated successfully',
          timestamp: new Date(Date.now() - 300000),
          read: false
        },
        {
          id: 2,
          type: 'system',
          message: 'System maintenance scheduled',
          timestamp: new Date(Date.now() - 3600000),
          read: true
        }
      ]);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setNotifications([]);
    setIsDropdownOpen(false);
    window.location.href = '/homepage';
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'portfolio': return 'User';
      case 'system': return 'Settings';
      case 'archive': return 'Archive';
      default: return 'Bell';
    }
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

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => {}}>
          Sign In
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Register
        </Button>
      </div>
    );
  }

  return (
    <div className="relative flex items-center space-x-3" ref={dropdownRef}>
      {/* Notification Bell */}
      <div className="relative">
        <Button
          variant="ghost"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative p-2"
        >
          <Icon name="Bell" size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-mono">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-2 px-3 py-1.5 bg-background rounded-lg cursor-pointer hover:bg-border transition-smooth">
        <div className="w-2 h-2 bg-success rounded-full"></div>
        <div className="hidden sm:block">
          <p className="text-sm font-body font-body-medium text-text-primary">
            {user.name}
          </p>
          <p className="text-xs text-text-secondary">
            {user.role}
          </p>
        </div>
        <Icon name="ChevronDown" size={16} className="text-text-secondary" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-elevated z-dropdown">
          {/* Notifications Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-heading font-heading-medium text-text-primary">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    className={`
                      flex items-start space-x-3 p-2 rounded-lg cursor-pointer transition-smooth
                      ${notification.read ? 'hover:bg-background' : 'bg-accent/5 hover:bg-accent/10'}
                    `}
                  >
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={16} 
                      className={notification.read ? 'text-text-secondary' : 'text-accent'} 
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${notification.read ? 'text-text-secondary' : 'text-text-primary font-body-medium'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-text-secondary font-mono">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-secondary text-center py-4">
                  No notifications
                </p>
              )}
            </div>
          </div>

          {/* User Actions */}
          <div className="p-4 space-y-2">
            {user.role === 'officer' && (
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/portfolio-editor'}
                iconName="Edit"
                className="w-full justify-start"
              >
                Edit Portfolio
              </Button>
            )}
            
            <Button
              variant="ghost"
              onClick={() => {}}
              iconName="Settings"
              className="w-full justify-start"
            >
              Account Settings
            </Button>
            
            <div className="border-t border-border pt-2 mt-2">
              <Button
                variant="ghost"
                onClick={handleLogout}
                iconName="LogOut"
                className="w-full justify-start text-error hover:bg-error/10"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationIndicator;