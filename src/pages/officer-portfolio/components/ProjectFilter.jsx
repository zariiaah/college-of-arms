import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectFilter = ({ 
  filters, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  onClearFilters 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'progress', label: 'By Progress' },
    { value: 'priority', label: 'By Priority' },
    { value: 'name', label: 'By Name' }
  ];

  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.priority !== 'all' || 
    searchQuery.trim() !== '';

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              className="px-3 py-2 text-sm font-body text-text-primary bg-background border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary min-w-32"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={14}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
            />
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
              className="px-3 py-2 text-sm font-body text-text-primary bg-background border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary min-w-36"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={14}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
              className="px-3 py-2 text-sm font-body text-text-primary bg-background border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary min-w-32"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={14}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              iconName="X"
              className="text-text-secondary hover:text-error"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;