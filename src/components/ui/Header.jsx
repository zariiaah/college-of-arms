import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Mock authentication - replace with actual auth logic
  useEffect(() => {
    const mockUser = localStorage.getItem('user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
  }, []);

  const navigationItems = [
    {
      label: 'Home',
      path: '/homepage',
      icon: 'Home',
      requiredRole: null,
      tooltip: 'Herald Management System Home'
    },
    {
      label: 'Officers',
      path: '/officers-directory',
      icon: 'Users',
      requiredRole: null,
      tooltip: 'Browse Herald Officers Directory'
    },
    {
      label: 'Archive',
      path: '/archive-browser',
      icon: 'Archive',
      requiredRole: null,
      tooltip: 'Browse SVG Resources and Archive'
    },
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      requiredRole: 'admin',
      tooltip: 'Administrative Control Center'
    },
    {
      label: 'Portfolio',
      path: '/portfolio-editor',
      icon: 'Edit',
      requiredRole: 'officer',
      tooltip: 'Manage Your Professional Portfolio'
    }
  ];

  const filteredNavigation = navigationItems.filter(item => {
    if (!item.requiredRole) return true;
    return user && (user.role === item.requiredRole || user.role === 'admin');
  });

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/homepage';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-navigation bg-surface border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 transition-smooth hover:opacity-80"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-primary-foreground" 
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                <path d="M12 16L13.09 22.26L20 23L13.09 23.74L12 30L10.91 23.74L4 23L10.91 22.26L12 16Z" opacity="0.6"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-heading-semibold text-primary">
                Herald Management
              </h1>
              <p className="text-xs text-text-secondary font-caption">
                Professional Ceremonial System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                title={item.tooltip}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-body font-body-medium
                  transition-smooth hover:bg-background
                  ${isActiveRoute(item.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-text-primary hover:text-primary'
                  }
                `}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Authentication Indicator */}
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-background rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-body text-text-primary">
                    {user.name}
                  </span>
                  <span className="text-xs text-text-secondary bg-accent/10 px-2 py-0.5 rounded-full">
                    {user.role}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  iconName="LogOut"
                  className="text-text-secondary hover:text-error"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" onClick={() => {}}>
                  Sign In
                </Button>
                <Button variant="primary" onClick={() => {}}>
                  Register
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="md:hidden"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-overlay bg-surface border-t border-border">
          <nav className="p-5 space-y-2">
            {filteredNavigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-body font-body-medium
                  transition-smooth
                  ${isActiveRoute(item.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-text-primary hover:bg-background hover:text-primary'
                  }
                `}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile Authentication */}
            <div className="pt-4 border-t border-border mt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-2 bg-background rounded-lg">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <div>
                      <p className="text-sm font-body font-body-medium text-text-primary">
                        {user.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {user.role} access
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    iconName="LogOut"
                    className="w-full justify-start text-error hover:bg-error/10"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                  <Button variant="primary" className="w-full justify-start">
                    Register
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;