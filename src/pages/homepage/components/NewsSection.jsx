import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "New Ceremonial Protocol Guidelines Released",
      excerpt: "Updated protocols for state ceremonies have been published, incorporating modern accessibility standards while maintaining traditional dignity.",
      category: "protocol",
      author: "Sir Edmund Blackwell",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/assets/images/no_image.png"
    },
    {
      id: 2,
      title: "Digital Archive Expansion Project Completed",
      excerpt: "The comprehensive digitization of historical heraldic documents has been completed, making over 10,000 SVG resources accessible online.",
      category: "archive",
      author: "Dame Margaret Thornfield",
      date: "2024-01-12",
      readTime: "3 min read",
      image: "/assets/images/no_image.png"
    },
    {
      id: 3,
      title: "Annual Herald Assembly Scheduled",
      excerpt: "The annual gathering of Herald officers will take place next month, featuring workshops on modern ceremonial practices.",
      category: "events",
      author: "Sir William Ashford",
      date: "2024-01-10",
      readTime: "4 min read",
      image: "/assets/images/no_image.png"
    },
    {
      id: 4,
      title: "New Officers Inducted to Herald Corps",
      excerpt: "Three distinguished individuals have been inducted as Herald officers, bringing fresh expertise to the ceremonial management system.",
      category: "officers",
      author: "Herald Administration",
      date: "2024-01-08",
      readTime: "6 min read",
      image: "/assets/images/no_image.png"
    },
    {
      id: 5,
      title: "Historical Research Grant Awarded",
      excerpt: "Significant funding has been secured for research into medieval ceremonial traditions and their modern applications.",
      category: "research",
      author: "Research Department",
      date: "2024-01-05",
      readTime: "4 min read",
      image: "/assets/images/no_image.png"
    }
  ];

  const categories = [
    { id: 'all', label: 'All News', count: newsItems.length },
    { id: 'protocol', label: 'Protocol', count: newsItems.filter(item => item.category === 'protocol').length },
    { id: 'archive', label: 'Archive', count: newsItems.filter(item => item.category === 'archive').length },
    { id: 'events', label: 'Events', count: newsItems.filter(item => item.category === 'events').length },
    { id: 'officers', label: 'Officers', count: newsItems.filter(item => item.category === 'officers').length },
    { id: 'research', label: 'Research', count: newsItems.filter(item => item.category === 'research').length }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      protocol: 'bg-primary text-primary-foreground',
      archive: 'bg-success text-success-foreground',
      events: 'bg-warning text-warning-foreground',
      officers: 'bg-error text-error-foreground',
      research: 'bg-accent text-accent-foreground'
    };
    return colors[category] || 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
              Latest News & Updates
            </h2>
            <p className="text-text-secondary font-body">
              Stay informed about Herald activities, protocol updates, and ceremonial developments
            </p>
          </div>
          <Button variant="outline" iconName="Rss" className="hidden sm:flex">
            Subscribe to Updates
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-body font-body-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-text-secondary hover:bg-surface hover:text-text-primary'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-surface border border-border rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group"
            >
              {/* Article Image */}
              <div className="relative h-48 bg-background">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-body font-body-medium ${getCategoryColor(item.category)}`}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-text-secondary font-body mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={14} />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {formatDate(item.date)}
                  </span>
                  <Button variant="ghost" iconName="ArrowRight" className="text-primary">
                    Read More
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" iconName="Plus">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;