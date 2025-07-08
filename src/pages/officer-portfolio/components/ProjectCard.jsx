import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, isOwnProfile, onEditProject, onUpdateProgress }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-accent bg-accent/10';
      case 'on-hold': return 'text-warning bg-warning/10';
      case 'cancelled': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-text-secondary/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-accent';
    if (progress >= 25) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card p-6 hover:shadow-elevated transition-smooth">
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
            {project.name}
          </h3>
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-mono ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <div className="flex items-center space-x-1">
              <Icon name="Flag" size={14} className={getPriorityColor(project.priority)} />
              <span className={`text-xs font-body ${getPriorityColor(project.priority)}`}>
                {project.priority} priority
              </span>
            </div>
          </div>
        </div>
        
        {isOwnProfile && (
          <Button
            variant="ghost"
            onClick={() => onEditProject(project)}
            iconName="Edit"
            className="text-text-secondary hover:text-primary"
          />
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-text-secondary">Progress</span>
          <span className="text-sm font-mono text-text-primary">{project.progress}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-primary">
            Started: {new Date(project.startDate).toLocaleDateString()}
          </span>
        </div>
        
        {project.dueDate && (
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">
              Due: {new Date(project.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <Icon name="Users" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-primary">
            Team: {project.teamMembers.join(', ')}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          {isExpanded ? project.description : `${project.description.substring(0, 150)}...`}
        </p>
        {project.description.length > 150 && (
          <Button
            variant="link"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs mt-2 p-0"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        )}
      </div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-background text-text-secondary text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-text-secondary" />
          <span className="text-xs text-text-secondary font-mono">
            Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
          </span>
        </div>
        
        {isOwnProfile && project.status === 'in-progress' && (
          <Button
            variant="primary"
            onClick={() => onUpdateProgress(project)}
            iconName="TrendingUp"
            className="text-xs"
          >
            Update Progress
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;