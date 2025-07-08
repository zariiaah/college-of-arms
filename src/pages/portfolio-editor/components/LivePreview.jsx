import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LivePreview = ({ projects, officerData, isPreviewMode = false }) => {
  const [viewMode, setViewMode] = useState('desktop');
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock officer data if not provided
  const defaultOfficerData = {
    id: 1,
    name: "Sir John Herald",
    title: "Chief Herald Officer",
    rank: "Earl Marshal",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: `Dedicated Herald Officer with over 15 years of experience in ceremonial protocols and heraldic traditions. Specializes in royal ceremonies, state functions, and historical research.`,
    contact: {
      email: "john.herald@heraldry.gov",
      phone: "+1 (555) 123-4567",
      office: "Royal Herald Chamber, Westminster"
    },
    achievements: [
      "Royal Victorian Order (RVO)",
      "Herald Excellence Award 2023",
      "Ceremonial Protocol Certification"
    ],
    robloxProfile: {
      username: "HeraldMaster2024",
      joinDate: "2019-03-15",
      badges: 47,
      visits: 12500
    }
  };

  const officer = officerData || defaultOfficerData;

  const getStatusColor = (status) => {
    const colors = {
      planning: 'text-warning bg-warning/10 border-warning/20',
      'in-progress': 'text-accent bg-accent/10 border-accent/20',
      completed: 'text-success bg-success/10 border-success/20',
      'on-hold': 'text-text-secondary bg-text-secondary/10 border-text-secondary/20',
      cancelled: 'text-error bg-error/10 border-error/20'
    };
    return colors[status] || 'text-text-secondary bg-text-secondary/10 border-text-secondary/20';
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      low: 'ArrowDown',
      medium: 'Minus',
      high: 'ArrowUp',
      urgent: 'AlertTriangle'
    };
    return icons[priority] || 'Minus';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
  const totalProgress = projects.length > 0 
    ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
    : 0;

  const viewModeStyles = {
    desktop: 'max-w-4xl',
    tablet: 'max-w-2xl',
    mobile: 'max-w-sm'
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Preview Controls */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
            Live Preview
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-surface border border-border rounded-lg p-1">
              {[
                { mode: 'desktop', icon: 'Monitor', label: 'Desktop' },
                { mode: 'tablet', icon: 'Tablet', label: 'Tablet' },
                { mode: 'mobile', icon: 'Smartphone', label: 'Mobile' }
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-md transition-smooth ${
                    viewMode === mode
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-background'
                  }`}
                  title={label}
                >
                  <Icon name={icon} size={16} />
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-1 text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-body">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6 bg-background min-h-96 overflow-y-auto">
        <div className={`mx-auto transition-all duration-300 ${viewModeStyles[viewMode]}`}>
          {/* Officer Header */}
          <div className="bg-surface border border-border rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Image
                  src={officer.avatar}
                  alt={officer.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-2 border-surface rounded-full"></div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-heading font-heading-bold text-text-primary mb-1">
                  {officer.name}
                </h1>
                <p className="text-lg text-accent font-body font-body-medium mb-2">
                  {officer.title}
                </p>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="Shield" size={16} />
                    <span>{officer.rank}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Mail" size={16} />
                    <span>{officer.contact.email}</span>
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-heading font-heading-bold text-primary">
                    {projects.length}
                  </div>
                  <div className="text-xs text-text-secondary">Projects</div>
                </div>
                <div>
                  <div className="text-xl font-heading font-heading-bold text-success">
                    {completedProjects}
                  </div>
                  <div className="text-xs text-text-secondary">Completed</div>
                </div>
                <div>
                  <div className="text-xl font-heading font-heading-bold text-accent">
                    {totalProgress}%
                  </div>
                  <div className="text-xs text-text-secondary">Average</div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
                Current Projects
              </h2>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-body font-body-semibold text-text-primary line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getPriorityIcon(project.priority)} 
                          size={14} 
                          className={`${
                            project.priority === 'urgent' ? 'text-error' :
                            project.priority === 'high' ? 'text-warning' :
                            project.priority === 'medium' ? 'text-accent' : 'text-text-secondary'
                          }`}
                        />
                        <div className={`px-2 py-1 rounded-full text-xs font-body border ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span>Progress</span>
                        <span className="font-mono">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-xs text-text-secondary">
                      <span>Started: {formatDate(project.startDate)}</span>
                      {project.endDate && (
                        <span>Due: {formatDate(project.endDate)}</span>
                      )}
                    </div>

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-background text-xs text-text-secondary rounded-full">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-background text-xs text-text-secondary rounded-full">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="FolderOpen" size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">No projects to display</p>
                <p className="text-sm text-text-secondary mt-1">
                  Projects will appear here as you create them
                </p>
              </div>
            )}
          </div>

          {/* Roblox Integration */}
          {officer.robloxProfile && (
            <div className="bg-surface border border-border rounded-lg p-6 mt-6">
              <h2 className="text-xl font-heading font-heading-semibold text-text-primary mb-4">
                Roblox Integration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-heading font-heading-bold text-primary">
                    {officer.robloxProfile.badges}
                  </div>
                  <div className="text-sm text-text-secondary">Badges Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-heading-bold text-success">
                    {officer.robloxProfile.visits.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">Profile Visits</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-body font-body-medium text-text-primary">
                    @{officer.robloxProfile.username}
                  </div>
                  <div className="text-sm text-text-secondary">
                    Joined {formatDate(officer.robloxProfile.joinDate)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
          <div className="bg-surface border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-heading font-heading-semibold text-text-primary">
                  {selectedProject.title}
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedProject(null)}
                  className="p-2"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-text-secondary">{selectedProject.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Status:</span>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body ml-2 border ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Priority:</span>
                    <span className="ml-2 text-text-primary">
                      {selectedProject.priority.charAt(0).toUpperCase() + selectedProject.priority.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Start Date:</span>
                    <span className="ml-2 text-text-primary">{formatDate(selectedProject.startDate)}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">End Date:</span>
                    <span className="ml-2 text-text-primary">{formatDate(selectedProject.endDate)}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-text-secondary">Progress</span>
                    <span className="font-mono text-text-primary">{selectedProject.progress}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-3">
                    <div
                      className="bg-accent h-3 rounded-full transition-all duration-500"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                </div>

                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div>
                    <span className="text-sm text-text-secondary mb-2 block">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-background text-sm text-text-primary rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivePreview;