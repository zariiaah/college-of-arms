import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ onSearch, onFilterChange, activeFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [dateRange, setDateRange] = useState('all');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    onFilterChange({ ...activeFilters, sortBy: newSort });
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    onFilterChange({ ...activeFilters, dateRange: range });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('newest');
    setDateRange('all');
    onSearch('');
    onFilterChange({ sortBy: 'newest', dateRange: 'all' });
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: 'ArrowDown' },
    { value: 'oldest', label: 'Oldest First', icon: 'ArrowUp' },
    { value: 'name', label: 'Name A-Z', icon: 'ArrowUpAZ' },
    { value: 'size', label: 'File Size', icon: 'HardDrive' },
    { value: 'downloads', label: 'Most Downloaded', icon: 'Download' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <div className="bg-surface border-b border-border">
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={18} className="text-text-secondary" />
          </div>
          <Input
            type="search"
            placeholder="Search SVG files, descriptions, or tags..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery('');
                onSearch('');
              }}
              className="absolute inset-y-0 right-0 px-3"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-body font-body-medium text-text-primary">
              Sort by:
            </span>
            <div className="flex items-center space-x-1">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? 'primary' : 'ghost'}
                  onClick={() => handleSortChange(option.value)}
                  className="text-sm"
                >
                  <Icon name={option.icon} size={14} />
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 ml-4">
            <span className="text-sm font-body font-body-medium text-text-primary">
              Date:
            </span>
            <select
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-1.5 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm"
            >
              <Icon name="Filter" size={14} />
              Advanced
              <Icon 
                name={showAdvanced ? 'ChevronUp' : 'ChevronDown'} 
                size={14} 
              />
            </Button>
            
            {(searchQuery || sortBy !== 'newest' || dateRange !== 'all') && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm text-text-secondary hover:text-error"
              >
                <Icon name="X" size={14} />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
                  File Size
                </label>
                <select className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="all">Any Size</option>
                  <option value="small">Small (&lt; 50KB)</option>
                  <option value="medium">Medium (50KB - 200KB)</option>
                  <option value="large">Large (&gt; 200KB)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
                  Created By
                </label>
                <select className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="all">Any Officer</option>
                  <option value="john-herald">Sir John Herald</option>
                  <option value="sarah-ceremonial">Dame Sarah Ceremonial</option>
                  <option value="michael-traditions">Lord Michael Traditions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
                  Usage Rights
                </label>
                <select className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="all">All Rights</option>
                  <option value="public">Public Domain</option>
                  <option value="restricted">Restricted Use</option>
                  <option value="officer-only">Officers Only</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;