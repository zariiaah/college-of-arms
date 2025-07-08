import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ArchivePreview = () => {
  // Mock archive items
  const recentArchiveItems = [
    {
      id: 1,
      title: "Royal Crown Vector",
      category: "Crowns",
      type: "SVG",
      thumbnail: "/assets/images/no_image.png",
      uploadDate: "2024-01-15",
      downloadCount: 234
    },
    {
      id: 2,
      title: "Medieval Shield Design",
      category: "Shields",
      type: "SVG",
      thumbnail: "/assets/images/no_image.png",
      uploadDate: "2024-01-14",
      downloadCount: 187
    },
    {
      id: 3,
      title: "Heraldic Lion Rampant",
      category: "Animals",
      type: "SVG",
      thumbnail: "/assets/images/no_image.png",
      uploadDate: "2024-01-13",
      downloadCount: 456
    },
    {
      id: 4,
      title: "Ceremonial Sword",
      category: "Weapons",
      type: "SVG",
      thumbnail: "/assets/images/no_image.png",
      uploadDate: "2024-01-12",
      downloadCount: 89
    },
    {
      id: 5,
      title: "Noble Coat of Arms",
      category: "Coats of Arms",
      type: "SVG",
      thumbnail: "/assets/images/no_image.png",
      uploadDate: "2024-01-11",
      downloadCount: 567
    },
    {
      id: 6,
      title: "Royal Scepter",
      category: "Regalia",
      type: "SVG",
      thumbnail: "/assets/images/no_image.png",
      uploadDate: "2024-01-10",
      downloadCount: 123
    }
  ];

  const archiveStats = [
    { label: "Total SVG Files", value: "12,450", icon: "Archive" },
    { label: "Categories", value: "24", icon: "FolderOpen" },
    { label: "Downloads This Month", value: "8,234", icon: "Download" },
    { label: "New Additions", value: "156", icon: "Plus" }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
              Archive Preview
            </h2>
            <p className="text-text-secondary font-body">
              Explore our comprehensive collection of heraldic SVG resources
            </p>
          </div>
          <Link to="/archive-browser">
            <Button variant="outline" iconName="Archive">
              Browse Full Archive
            </Button>
          </Link>
        </div>

        {/* Archive Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {archiveStats.map((stat, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg p-6 text-center hover:shadow-card transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-heading-bold text-text-primary mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-text-secondary font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Archive Items */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-heading-semibold text-text-primary">
              Recently Added
            </h3>
            <Link to="/archive-browser">
              <Button variant="ghost" iconName="ArrowRight" className="text-primary">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentArchiveItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer hover:shadow-card transition-all duration-300 bg-background border border-border rounded-lg overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative h-24 bg-background flex items-center justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* File Type Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-body font-body-medium">
                      {item.type}
                    </span>
                  </div>

                  {/* Download Overlay */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Icon name="Download" size={20} className="text-primary-foreground" />
                  </div>
                </div>

                {/* Item Details */}
                <div className="p-3">
                  <h4 className="text-sm font-heading font-heading-medium text-text-primary mb-1 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary font-body mb-2">
                    {item.category}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{formatDate(item.uploadDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{item.downloadCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Archive Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-2">
              Advanced Search
            </h3>
            <p className="text-text-secondary font-body">
              Find specific heraldic elements using our comprehensive search and filtering system
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Download" size={32} className="text-success" />
            </div>
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-2">
              Bulk Downloads
            </h3>
            <p className="text-text-secondary font-body">
              Download multiple SVG files at once for efficient project management
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Bookmark" size={32} className="text-warning" />
            </div>
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-2">
              Collections
            </h3>
            <p className="text-text-secondary font-body">
              Create and manage custom collections of your favorite heraldic resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivePreview;