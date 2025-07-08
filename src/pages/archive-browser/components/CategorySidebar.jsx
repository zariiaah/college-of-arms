import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategorySidebar = ({ categories, selectedCategory, onCategorySelect, fileStats }) => {
  const [expandedCategories, setExpandedCategories] = useState(['ceremonial', 'official']);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCategoryIcon = (type) => {
    const iconMap = {
      ceremonial: 'Crown',
      official: 'FileText',
      templates: 'Layout',
      symbols: 'Star',
      badges: 'Shield',
      decorative: 'Sparkles',
      historical: 'Clock',
      modern: 'Zap'
    };
    return iconMap[type] || 'Folder';
  };

  return (
    <div className="bg-surface border-r border-border h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Archive" size={20} className="text-primary" />
          <h2 className="font-heading font-heading-semibold text-text-primary">
            Archive Categories
          </h2>
        </div>
        <p className="text-sm text-text-secondary">
          {fileStats.total} SVG resources available
        </p>
      </div>

      {/* All Files Option */}
      <div className="p-2">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
          onClick={() => onCategorySelect('all')}
          className="w-full justify-start"
        >
          <Icon name="Grid3X3" size={18} />
          <span>All Files</span>
          <span className="ml-auto text-xs bg-background px-2 py-0.5 rounded-full">
            {fileStats.total}
          </span>
        </Button>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {categories.map((category) => (
            <div key={category.id}>
              {/* Main Category */}
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => toggleCategory(category.id)}
                  className="flex-1 justify-start"
                >
                  <Icon 
                    name={expandedCategories.includes(category.id) ? 'ChevronDown' : 'ChevronRight'} 
                    size={16} 
                  />
                  <Icon name={getCategoryIcon(category.type)} size={18} />
                  <span className="flex-1 text-left">{category.name}</span>
                  <span className="text-xs bg-background px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </Button>
              </div>

              {/* Subcategories */}
              {expandedCategories.includes(category.id) && category.subcategories && (
                <div className="ml-4 mt-1 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <Button
                      key={subcategory.id}
                      variant={selectedCategory === subcategory.id ? 'primary' : 'ghost'}
                      onClick={() => onCategorySelect(subcategory.id)}
                      className="w-full justify-start text-sm"
                    >
                      <Icon name="Minus" size={14} />
                      <span className="flex-1 text-left">{subcategory.name}</span>
                      <span className="text-xs bg-background px-1.5 py-0.5 rounded-full">
                        {subcategory.count}
                      </span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section (for authenticated users) */}
      <div className="p-4 border-t border-border">
        <Button
          variant="primary"
          onClick={() => {}}
          className="w-full"
          iconName="Upload"
        >
          Upload SVG
        </Button>
        <p className="text-xs text-text-secondary mt-2 text-center">
          Herald officers only
        </p>
      </div>
    </div>
  );
};

export default CategorySidebar;