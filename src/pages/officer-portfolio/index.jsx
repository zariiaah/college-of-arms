import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import OfficerHeader from './components/OfficerHeader';
import TabNavigation from './components/TabNavigation';
import ProjectCard from './components/ProjectCard';
import ProjectFilter from './components/ProjectFilter';
import AchievementCard from './components/AchievementCard';
import ArchiveContribution from './components/ArchiveContribution';
import ActivityTimeline from './components/ActivityTimeline';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OfficerPortfolio = () => {
  const { officerId } = useParams();
  const navigate = useNavigate();
  const [officer, setOfficer] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    sort: 'newest'
  });

  // Mock officer data
  const mockOfficer = {
    id: officerId || '1',
    name: "Sir John Herald",
    rank: "Chief Herald Officer",
    email: "john.herald@heraldry.gov",
    phone: "+1 (555) 123-4567",
    location: "London, United Kingdom",
    department: "Royal Heraldry Division",
    appointmentDate: "2020-03-15",
    status: "active",
    robloxUsername: "JohnHerald2024",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: `Sir John Herald serves as the Chief Herald Officer with over 15 years of experience in ceremonial protocols and heraldic design. He specializes in royal ceremonies, state functions, and maintains the official registry of heraldic achievements. His expertise spans traditional heraldry, modern ceremonial requirements, and digital archive management.`
  };

  // Mock projects data
  const mockProjects = [
    {
      id: 1,
      name: "Royal Coronation Ceremony Planning",
      description: `Comprehensive planning and coordination for the upcoming Royal Coronation ceremony, including protocol development, ceremonial arrangements, and heraldic displays. This project involves collaboration with multiple departments and international dignitaries to ensure a flawless execution of this historic event.`,
      status: "in-progress",
      priority: "high",
      progress: 75,
      startDate: "2024-01-15",
      dueDate: "2024-06-01",
      lastUpdated: "2024-01-20",
      teamMembers: ["Dame Sarah Ceremonial", "Lord Michael Traditions"],
      tags: ["ceremony", "royal", "protocol", "high-priority"]
    },
    {
      id: 2,
      name: "Digital Archive Modernization",
      description: `Modernizing the heraldic archive system with digital cataloging, SVG conversion of historical designs, and implementation of advanced search capabilities. This initiative will preserve centuries of heraldic tradition while making resources accessible to future generations.`,
      status: "completed",
      priority: "medium",
      progress: 100,
      startDate: "2023-09-01",
      dueDate: "2023-12-31",
      lastUpdated: "2023-12-30",
      teamMembers: ["Tech Team", "Archive Specialists"],
      tags: ["digital", "archive", "modernization", "svg"]
    },
    {
      id: 3,
      name: "Herald Training Program Development",
      description: `Development of comprehensive training materials and certification programs for new Herald officers. Includes curriculum design, practical exercises, and assessment frameworks to maintain high standards of heraldic knowledge and ceremonial expertise.`,
      status: "in-progress",
      priority: "medium",
      progress: 45,
      startDate: "2024-01-01",
      dueDate: "2024-04-30",
      lastUpdated: "2024-01-18",
      teamMembers: ["Education Committee", "Senior Heralds"],
      tags: ["training", "education", "certification"]
    }
  ];

  // Mock achievements data
  const mockAchievements = [
    {
      id: 1,
      title: "Excellence in Ceremonial Protocol",
      description: "Awarded for outstanding performance in organizing and executing state ceremonies with precision and attention to heraldic tradition.",
      type: "award",
      dateEarned: "2023-12-01",
      issuedBy: "Royal Heraldry Council",
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&h=200&fit=crop",
      verificationUrl: "https://heraldry.gov/verify/award-2023-001"
    },
    {
      id: 2,
      title: "Digital Archive Innovation Certificate",
      description: "Recognized for leading the digital transformation of heraldic archives and implementing modern cataloging systems.",
      type: "certification",
      dateEarned: "2023-10-15",
      issuedBy: "International Archive Association",
      verificationUrl: "https://archive.org/verify/cert-2023-045"
    },
    {
      id: 3,
      title: "15 Years of Distinguished Service",
      description: "Milestone achievement recognizing fifteen years of dedicated service to the Royal Heraldry Division.",
      type: "milestone",
      dateEarned: "2023-03-15",
      issuedBy: "Royal Heraldry Division"
    }
  ];

  // Mock archive contributions
  const mockArchiveContributions = [
    {
      id: 1,
      title: "Royal Crown SVG Collection",
      description: "Comprehensive collection of royal crown designs in SVG format, including historical variations and modern interpretations.",
      type: "svg",
      category: "Royal Regalia",
      uploadDate: "2024-01-10",
      fileSize: 2048576,
      downloadCount: 156,
      viewCount: 892,
      preview: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
      previewUrl: "/archive/preview/royal-crowns",
      downloadUrl: "/archive/download/royal-crowns.zip",
      tags: ["royal", "crown", "regalia", "svg"]
    },
    {
      id: 2,
      title: "Ceremonial Protocol Handbook",
      description: "Complete guide to ceremonial protocols for state functions, including step-by-step procedures and heraldic requirements.",
      type: "document",
      category: "Documentation",
      uploadDate: "2023-12-20",
      fileSize: 5242880,
      downloadCount: 89,
      viewCount: 445,
      previewUrl: "/archive/preview/protocol-handbook",
      downloadUrl: "/archive/download/protocol-handbook.pdf",
      tags: ["protocol", "ceremony", "handbook", "guide"]
    },
    {
      id: 3,
      title: "Certificate Design Templates",
      description: "Professional certificate templates for heraldic achievements and ceremonial recognitions.",
      type: "template",
      category: "Design Resources",
      uploadDate: "2023-11-15",
      fileSize: 1048576,
      downloadCount: 234,
      viewCount: 678,
      preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop",
      previewUrl: "/archive/preview/certificate-templates",
      downloadUrl: "/archive/download/certificate-templates.zip",
      tags: ["certificate", "template", "design", "achievement"]
    }
  ];

  // Mock activity timeline
  const mockActivities = [
    {
      id: 1,
      type: "project_updated",
      title: "Updated Royal Coronation Project",
      description: "Progress increased to 75% with completion of venue arrangements and protocol finalization.",
      timestamp: new Date(Date.now() - 300000),
      metadata: {
        project: "Royal Coronation Ceremony Planning",
        impact: "High"
      },
      link: {
        text: "View project details",
        url: "#projects"
      }
    },
    {
      id: 2,
      type: "archive_uploaded",
      title: "Uploaded Royal Crown SVG Collection",
      description: "Added comprehensive collection of royal crown designs to the archive system.",
      timestamp: new Date(Date.now() - 3600000),
      metadata: {
        category: "Royal Regalia"
      },
      link: {
        text: "View in archive",
        url: "/archive-browser"
      }
    },
    {
      id: 3,
      type: "achievement_earned",
      title: "Earned Excellence in Ceremonial Protocol",
      description: "Recognized for outstanding performance in organizing state ceremonies.",
      timestamp: new Date(Date.now() - 86400000),
      metadata: {
        category: "Award"
      }
    },
    {
      id: 4,
      type: "project_completed",
      title: "Completed Digital Archive Modernization",
      description: "Successfully modernized the heraldic archive system with digital cataloging capabilities.",
      timestamp: new Date(Date.now() - 172800000),
      metadata: {
        project: "Digital Archive Modernization",
        impact: "High"
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchOfficerData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOfficer(mockOfficer);
      setLoading(false);
    };

    fetchOfficerData();

    // Check if user is viewing their own profile
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
    }
  }, [officerId]);

  // Custom breadcrumbs
  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Officers Directory', path: '/officers-directory' },
    { label: officer?.name || 'Officer Portfolio', path: '/officer-portfolio' }
  ];

  const tabs = [
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: 'FolderOpen',
      count: mockProjects.length
    },
    { 
      id: 'achievements', 
      label: 'Achievements', 
      icon: 'Award',
      count: mockAchievements.length
    },
    { 
      id: 'archive', 
      label: 'Archive Contributions', 
      icon: 'Archive',
      count: mockArchiveContributions.length
    },
    { 
      id: 'activity', 
      label: 'Activity Timeline', 
      icon: 'Activity',
      count: mockActivities.length
    }
  ];

  const isOwnProfile = currentUser && currentUser.id === officer?.id;

  const handleEditProfile = () => {
    navigate('/portfolio-editor');
  };

  const handleEditProject = (project) => {
    navigate(`/portfolio-editor?project=${project.id}`);
  };

  const handleUpdateProgress = (project) => {
    // Mock progress update
    console.log('Updating progress for project:', project.name);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      sort: 'newest'
    });
    setSearchQuery('');
  };

  // Filter and sort projects
  const filteredProjects = mockProjects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filters.status === 'all' || project.status === filters.status;
      const matchesPriority = filters.priority === 'all' || project.priority === filters.priority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'oldest':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'progress':
          return b.progress - a.progress;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'name':
          return a.name.localeCompare(b.name);
        default: // newest
          return new Date(b.startDate) - new Date(a.startDate);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin mb-4">
                <Icon name="Loader2" size={32} className="text-primary mx-auto" />
              </div>
              <p className="text-text-secondary">Loading officer portfolio...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!officer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
          <div className="text-center py-20">
            <Icon name="UserX" size={48} className="text-text-secondary mx-auto mb-4" />
            <h2 className="text-xl font-heading font-heading-medium text-text-primary mb-2">
              Officer Not Found
            </h2>
            <p className="text-text-secondary mb-6">
              The requested officer profile could not be found.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/officers-directory')}
              iconName="ArrowLeft"
            >
              Back to Directory
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div>
            <ProjectFilter
              filters={filters}
              onFilterChange={setFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
            />
            
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isOwnProfile={isOwnProfile}
                    onEditProject={handleEditProject}
                    onUpdateProgress={handleUpdateProgress}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="FolderOpen" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
                  No Projects Found
                </h3>
                <p className="text-text-secondary">
                  {searchQuery || filters.status !== 'all' || filters.priority !== 'all' ?'Try adjusting your filters or search terms.' :'No projects have been created yet.'
                  }
                </p>
              </div>
            )}
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            {mockAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        );

      case 'archive':
        return (
          <div className="space-y-6">
            {mockArchiveContributions.map((contribution) => (
              <ArchiveContribution key={contribution.id} contribution={contribution} />
            ))}
          </div>
        );

      case 'activity':
        return <ActivityTimeline activities={mockActivities} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
      
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        {/* Officer Header */}
        <div className="mb-8">
          <OfficerHeader
            officer={officer}
            isOwnProfile={isOwnProfile}
            onEditProfile={handleEditProfile}
          />
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />

        {/* Tab Content */}
        <div className="mb-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default OfficerPortfolio;