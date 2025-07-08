import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Default breadcrumb mapping based on routes
  const routeBreadcrumbs = {
    '/homepage': [
      { label: 'Home', path: '/homepage' }
    ],
    '/officers-directory': [
      { label: 'Home', path: '/homepage' },
      { label: 'Officers Directory', path: '/officers-directory' }
    ],
    '/officer-portfolio': [
      { label: 'Home', path: '/homepage' },
      { label: 'Officers Directory', path: '/officers-directory' },
      { label: 'Officer Portfolio', path: '/officer-portfolio' }
    ],
    '/archive-browser': [
      { label: 'Home', path: '/homepage' },
      { label: 'Archive Browser', path: '/archive-browser' }
    ],
    '/admin-dashboard': [
      { label: 'Home', path: '/homepage' },
      { label: 'Admin Dashboard', path: '/admin-dashboard' }
    ],
    '/portfolio-editor': [
      { label: 'Home', path: '/homepage' },
      { label: 'Portfolio Editor', path: '/portfolio-editor' }
    ]
  };

  // Use custom breadcrumbs if provided, otherwise use route-based breadcrumbs
  const breadcrumbs = customBreadcrumbs || routeBreadcrumbs[location.pathname] || [
    { label: 'Home', path: '/homepage' }
  ];

  // Don't show breadcrumbs on homepage or if only one item
  if (location.pathname === '/homepage' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav 
      className="flex items-center space-x-2 px-5 lg:px-8 py-3 bg-background border-b border-border"
      aria-label="Breadcrumb navigation"
    >
      <div className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <React.Fragment key={crumb.path || index}>
              {/* Home icon for first breadcrumb */}
              {isFirst && (
                <Icon 
                  name="Home" 
                  size={16} 
                  className="text-text-secondary mr-1" 
                />
              )}
              
              {/* Breadcrumb item */}
              {isLast ? (
                <span 
                  className="font-body font-body-medium text-text-primary truncate max-w-xs sm:max-w-sm"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="font-body text-text-secondary hover:text-primary transition-smooth truncate max-w-xs sm:max-w-sm"
                >
                  {crumb.label}
                </Link>
              )}
              
              {/* Separator */}
              {!isLast && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-secondary flex-shrink-0" 
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile back button */}
      <div className="ml-auto sm:hidden">
        {breadcrumbs.length > 1 && (
          <Link
            to={breadcrumbs[breadcrumbs.length - 2].path}
            className="flex items-center space-x-1 px-2 py-1 text-text-secondary hover:text-primary transition-smooth"
          >
            <Icon name="ArrowLeft" size={16} />
            <span className="text-sm font-body">Back</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;