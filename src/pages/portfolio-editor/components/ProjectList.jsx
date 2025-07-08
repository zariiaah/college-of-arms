import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectList = ({ projects, onEdit, onDelete, onReorder, onBulkUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const sortOptions = [
    { value: 'updated', label: 'Last Updated' },
    { value: 'created', label: 'Date Created' },
    { value: 'title', label: 'Title' },
    { value: 'progress', label: 'Progress' },
    { value: 'priority', label: 'Priority' }
  ];

  const filteredAndSortedProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'progress':
          return b.progress - a.progress;
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

  const handleSelectProject = (projectId) => {
    setSelectedProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredAndSortedProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredAndSortedProjects.map(p => p.id));
    }
  };

  const handleBulkStatusUpdate = (newStatus) => {
    if (selectedProjects.length > 0) {
      onBulkUpdate(selectedProjects, { status: newStatus });
      setSelectedProjects([]);
    }
  };

  const handleDragStart = (e, project) => {
    setDraggedItem(project);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetProject) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== targetProject.id) {
      onReorder(draggedItem.id, targetProject.id);
    }
    setDraggedItem(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      planning: 'text-warning bg-warning/10',
      'in-progress': 'text-accent bg-accent/10',
      completed: 'text-success bg-success/10',
      'on-hold': 'text-text-secondary bg-text-secondary/10',
      cancelled: 'text-error bg-error/10'
    };
    return colors[status] || 'text-text-secondary bg-text-secondary/10';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-text-secondary',
      medium: 'text-accent',
      high: 'text-warning',
      urgent: 'text-error'
    };
    return colors[priority] || 'text-text-secondary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
            Project Management
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              {filteredAndSortedProjects.length} projects
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedProjects.length > 0 && (
          <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-body font-body-medium text-text-primary">
                {selectedProjects.length} project{selectedProjects.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => handleBulkStatusUpdate('completed')}
                  className="text-success hover:bg-success/10"
                >
                  Mark Complete
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleBulkStatusUpdate('on-hold')}
                  className="text-warning hover:bg-warning/10"
                >
                  Put on Hold
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedProjects([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredAndSortedProjects.length > 0 ? (
          <>
            {/* Select All Header */}
            <div className="p-4 bg-background">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedProjects.length === filteredAndSortedProjects.length && filteredAndSortedProjects.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm font-body font-body-medium text-text-primary">
                  Select All
                </span>
              </div>
            </div>

            {filteredAndSortedProjects.map((project) => (
              <div
                key={project.id}
                draggable
                onDragStart={(e) => handleDragStart(e, project)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, project)}
                className={`p-4 hover:bg-background transition-smooth cursor-move ${
                  draggedItem?.id === project.id ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => handleSelectProject(project.id)}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2 mt-1"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-body font-body-medium text-text-primary mb-1">
                          {project.title}
                        </h4>
                        <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-text-secondary">
                          <span>Updated {formatDate(project.updatedAt)}</span>
                          <span className={getPriorityColor(project.priority)}>
                            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                          </span>
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex items-center space-x-1">
                              {project.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="px-2 py-0.5 bg-background rounded-full">
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 2 && (
                                <span className="text-text-secondary">+{project.tags.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 ml-4">
                        <div className="text-right">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body font-body-medium ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <div className="text-xs text-text-secondary mt-1">
                            {project.progress}% complete
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            onClick={() => onEdit(project)}
                            className="p-2"
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => onDelete(project.id)}
                            className="p-2 text-error hover:bg-error/10"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                          <Icon name="GripVertical" size={16} className="text-text-secondary cursor-move" />
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-background rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="p-8 text-center">
            <Icon name="FolderOpen" size={32} className="text-text-secondary mx-auto mb-3" />
            <p className="text-sm text-text-secondary">
              {searchQuery || filterStatus !== 'all' ?'No projects match your filters' :'No projects yet. Create your first project to get started.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;