import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import LivePreview from './components/LivePreview';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import VersionHistory from './components/VersionHistory';

const PortfolioEditor = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [selectedProjectForHistory, setSelectedProjectForHistory] = useState(null);
  const [websocketStatus, setWebsocketStatus] = useState('disconnected');

  // Mock WebSocket connection
  useEffect(() => {
    // Simulate WebSocket connection
    setWebsocketStatus('connecting');
    setTimeout(() => {
      setWebsocketStatus('connected');
    }, 1000);

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        // Simulate external update
        setProjects(prev => prev.map(project => ({
          ...project,
          updatedAt: new Date().toISOString()
        })));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Authentication check
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/homepage');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'officer' && parsedUser.role !== 'admin') {
      navigate('/homepage');
      return;
    }

    setUser(parsedUser);
    loadProjects(parsedUser.id);
  }, [navigate]);

  // Mock data loading
  const loadProjects = (userId) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockProjects = [
        {
          id: 1,
          title: "Royal Ceremony Protocol Update",
          description: `Comprehensive review and update of royal ceremony protocols for the upcoming coronation season. This project involves researching historical precedents, consulting with senior heralds, and drafting new guidelines that maintain traditional values while accommodating modern requirements.\n\nKey deliverables include updated protocol documentation, training materials for junior heralds, and coordination with palace staff for implementation.`,
          status: "in-progress",
          progress: 75,
          priority: "high",
          category: "ceremonial",
          startDate: "2024-01-15",
          endDate: "2024-03-30",
          tags: ["protocol", "ceremony", "documentation"],
          robloxIntegration: true,
          assets: [
            { id: 1, name: "protocol_draft_v2.pdf", type: "application/pdf", size: 245760 },
            { id: 2, name: "ceremony_timeline.xlsx", type: "application/vnd.ms-excel", size: 89432 }
          ],
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-20T14:30:00Z"
        },
        {
          id: 2,
          title: "Herald Badge Design System",
          description: `Development of a comprehensive badge design system for Herald officers across all ranks. This project aims to standardize visual identity while respecting traditional heraldic principles.\n\nThe system will include digital assets, usage guidelines, and implementation standards for both physical and digital applications.`,
          status: "planning",
          progress: 25,
          priority: "medium",
          category: "administrative",
          startDate: "2024-02-01",
          endDate: "2024-05-15",
          tags: ["design", "branding", "standards"],
          robloxIntegration: false,
          assets: [
            { id: 3, name: "badge_concepts.png", type: "image/png", size: 156789 }
          ],
          createdAt: "2024-02-01T09:00:00Z",
          updatedAt: "2024-02-05T16:45:00Z"
        },
        {
          id: 3,
          title: "Historical Archive Digitization",
          description: `Digitization of historical herald documents and artifacts for preservation and accessibility. This project involves cataloging, scanning, and creating digital metadata for centuries of herald history.\n\nThe digitized archive will serve as a valuable resource for research, education, and public engagement with herald traditions.`,
          status: "completed",
          progress: 100,
          priority: "low",
          category: "research",
          startDate: "2023-09-01",
          endDate: "2024-01-10",
          tags: ["archive", "digitization", "history"],
          robloxIntegration: true,
          assets: [
            { id: 4, name: "archive_catalog.csv", type: "text/csv", size: 67890 },
            { id: 5, name: "digitization_report.pdf", type: "application/pdf", size: 334567 }
          ],
          createdAt: "2023-09-01T08:00:00Z",
          updatedAt: "2024-01-10T17:00:00Z"
        }
      ];

      setProjects(mockProjects);
      setIsLoading(false);
      setLastSaved(new Date().toISOString());
    }, 1000);
  };

  const handleSaveProject = async (projectData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingProject) {
        // Update existing project
        setProjects(prev => prev.map(p => 
          p.id === editingProject.id 
            ? { ...projectData, updatedAt: new Date().toISOString() }
            : p
        ));
      } else {
        // Add new project
        const newProject = {
          ...projectData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setProjects(prev => [newProject, ...prev]);
      }
      
      setShowForm(false);
      setEditingProject(null);
      setIsDirty(false);
      setLastSaved(new Date().toISOString());
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProjects(prev => prev.filter(p => p.id !== projectId));
      setLastSaved(new Date().toISOString());
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorderProjects = (draggedId, targetId) => {
    const draggedIndex = projects.findIndex(p => p.id === draggedId);
    const targetIndex = projects.findIndex(p => p.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    const newProjects = [...projects];
    const [draggedProject] = newProjects.splice(draggedIndex, 1);
    newProjects.splice(targetIndex, 0, draggedProject);
    
    setProjects(newProjects);
    setIsDirty(true);
  };

  const handleBulkUpdate = async (projectIds, updates) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProjects(prev => prev.map(project => 
        projectIds.includes(project.id)
          ? { ...project, ...updates, updatedAt: new Date().toISOString() }
          : project
      ));
      
      setLastSaved(new Date().toISOString());
    } catch (error) {
      console.error('Failed to bulk update projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoSave = async () => {
    // Auto-save current state
    setLastSaved(new Date().toISOString());
    setIsDirty(false);
    
    // Simulate saving to backend
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleVersionRestore = async (version) => {
    setIsLoading(true);
    
    try {
      // Simulate version restore
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would restore the project to the selected version
      console.log('Restoring to version:', version.id);
      
      setShowVersionHistory(false);
      setSelectedProjectForHistory(null);
      setLastSaved(new Date().toISOString());
    } catch (error) {
      console.error('Failed to restore version:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openVersionHistory = (project) => {
    setSelectedProjectForHistory(project);
    setShowVersionHistory(true);
  };

  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Portfolio Editor', path: '/portfolio-editor' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="text-primary mx-auto mb-4 animate-spin" />
          <p className="text-text-secondary">Loading portfolio editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
      
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
              Portfolio Editor
            </h1>
            <p className="text-text-secondary">
              Manage your projects and track progress in real-time
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* WebSocket Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                websocketStatus === 'connected' ? 'bg-success animate-pulse' :
                websocketStatus === 'connecting'? 'bg-warning animate-pulse' : 'bg-error'
              }`}></div>
              <span className="text-sm text-text-secondary">
                {websocketStatus === 'connected' ? 'Live' : 
                 websocketStatus === 'connecting' ? 'Connecting...' : 'Offline'}
              </span>
            </div>
            
            {/* Auto-save Indicator */}
            <AutoSaveIndicator
              isDirty={isDirty}
              lastSaved={lastSaved}
              onSave={handleAutoSave}
            />
            
            <Button
              variant="primary"
              onClick={() => {
                setEditingProject(null);
                setShowForm(true);
              }}
              iconName="Plus"
            >
              New Project
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Panel - Project Management */}
          <div className="space-y-6">
            {showForm ? (
              <ProjectForm
                project={editingProject}
                onSave={handleSaveProject}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
                isLoading={isLoading}
              />
            ) : (
              <ProjectList
                projects={projects}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onReorder={handleReorderProjects}
                onBulkUpdate={handleBulkUpdate}
              />
            )}

            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="text-sm font-body font-body-medium text-text-primary mb-3">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  onClick={() => openVersionHistory(projects[0])}
                  iconName="History"
                  className="justify-start"
                  disabled={projects.length === 0}
                >
                  Version History
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {}}
                  iconName="Download"
                  className="justify-start"
                >
                  Export Data
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {}}
                  iconName="Upload"
                  className="justify-start"
                >
                  Import Projects
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/officer-portfolio')}
                  iconName="Eye"
                  className="justify-start"
                >
                  View Public
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="xl:sticky xl:top-24 xl:h-fit">
            <LivePreview
              projects={projects}
              officerData={user}
              isPreviewMode={true}
            />
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <div className="text-2xl font-heading font-heading-bold text-primary mb-1">
              {projects.length}
            </div>
            <div className="text-sm text-text-secondary">Total Projects</div>
          </div>
          
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <div className="text-2xl font-heading font-heading-bold text-success mb-1">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-text-secondary">Completed</div>
          </div>
          
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <div className="text-2xl font-heading font-heading-bold text-accent mb-1">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="text-sm text-text-secondary">In Progress</div>
          </div>
          
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <div className="text-2xl font-heading font-heading-bold text-warning mb-1">
              {projects.length > 0 
                ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
                : 0}%
            </div>
            <div className="text-sm text-text-secondary">Avg Progress</div>
          </div>
        </div>
      </div>

      {/* Version History Modal */}
      <VersionHistory
        projectId={selectedProjectForHistory?.id}
        onRestore={handleVersionRestore}
        isOpen={showVersionHistory}
        onClose={() => {
          setShowVersionHistory(false);
          setSelectedProjectForHistory(null);
        }}
      />
    </div>
  );
};

export default PortfolioEditor;