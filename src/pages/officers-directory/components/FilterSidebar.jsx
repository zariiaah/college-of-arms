import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedRank, 
  onRankChange, 
  selectedSpecializations, 
  onSpecializationChange,
  activeOnly,
  onActiveToggle,
  sortBy,
  onSortChange,
  onClearFilters 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const ranks = [
    { value: '', label: 'All Ranks' },
    { value: 'earl-marshal', label: 'Earl Marshal' },
    { value: 'king-of-arms', label: 'King of Arms' },
    { value: 'herald', label: 'Herald' },
    { value: 'pursuivant', label: 'Pursuivant' },
    { value: 'herald-extraordinary', label: 'Herald Extraordinary' }
  ];

  const specializations = [
    { id: 'heraldry', label: 'Heraldry & Armory' },
    { id: 'genealogy', label: 'Genealogy Research' },
    { id: 'ceremonial', label: 'Ceremonial Protocol' },
    { id: 'historical', label: 'Historical Documentation' },
    { id: 'artistic', label: 'Artistic Design' },
    { id: 'legal', label: 'Legal Precedents' },
    { id: 'education', label: 'Educational Outreach' },
    { id: 'digital', label: 'Digital Archives' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'rank', label: 'Rank Hierarchy' },
    { value: 'activity', label: 'Recent Activity' },
    { value: 'projects', label: 'Project Count' }
  ];

  const hasActiveFilters = searchQuery || selectedRank || selectedSpecializations.length > 0 || activeOnly;

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="font-heading font-heading-medium text-text-primary">
            Filter Officers
          </h3>
        </div>
        <Button
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 lg:hidden"
        >
          <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={16} />
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Search Officers
            </label>
            <Input
              type="search"
              placeholder="Search by name, expertise..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Rank Filter */}
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Rank
            </label>
            <select
              value={selectedRank}
              onChange={(e) => onRankChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
            >
              {ranks.map((rank) => (
                <option key={rank.value} value={rank.value}>
                  {rank.label}
                </option>
              ))}
            </select>
          </div>

          {/* Specializations */}
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-3">
              Specializations
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {specializations.map((spec) => (
                <label key={spec.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSpecializations.includes(spec.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onSpecializationChange([...selectedSpecializations, spec.id]);
                      } else {
                        onSpecializationChange(selectedSpecializations.filter(s => s !== spec.id));
                      }
                    }}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{spec.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Status */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => onActiveToggle(e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm font-body font-body-medium text-text-primary">
                Active Officers Only
              </span>
            </label>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              className="w-full"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;