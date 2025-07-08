import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import DirectoryHeader from './components/DirectoryHeader';
import FilterSidebar from './components/FilterSidebar';
import OfficersGrid from './components/OfficersGrid';

const OfficersDirectory = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [activeOnly, setActiveOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const itemsPerPage = 12;

  // Mock officers data
  const mockOfficers = [
    {
      id: 1,
      name: "Sir John Herald",
      rank: "earl-marshal",
      status: "active",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specializations: ["Heraldry & Armory", "Ceremonial Protocol", "Historical Documentation"],
      activeProjects: 8,
      joinedYear: 2018,
      email: "john.herald@example.com",
      phone: "+1-555-0101",
      contactMethods: { email: true, phone: true },
      recentActivity: "Updated ceremonial protocols for state functions and reviewed new armorial bearings submissions."
    },
    {
      id: 2,
      name: "Dame Sarah Ceremonial",
      rank: "king-of-arms",
      status: "active",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      specializations: ["Genealogy Research", "Legal Precedents", "Educational Outreach"],
      activeProjects: 12,
      joinedYear: 2019,
      email: "sarah.ceremonial@example.com",
      phone: "+1-555-0102",
      contactMethods: { email: true, phone: false },
      recentActivity: "Completed genealogical research for three noble families and published educational materials."
    },
    {
      id: 3,
      name: "Lord Michael Traditions",
      rank: "herald",
      status: "active",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specializations: ["Artistic Design", "Digital Archives", "Ceremonial Protocol"],
      activeProjects: 6,
      joinedYear: 2020,
      email: "michael.traditions@example.com",
      phone: "+1-555-0103",
      contactMethods: { email: true, phone: true },
      recentActivity: "Designed new ceremonial regalia and digitized historical archive materials."
    },
    {
      id: 4,
      name: "Lady Elizabeth Armory",
      rank: "herald",
      status: "active",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specializations: ["Heraldry & Armory", "Historical Documentation", "Legal Precedents"],
      activeProjects: 9,
      joinedYear: 2017,
      email: "elizabeth.armory@example.com",
      phone: "+1-555-0104",
      contactMethods: { email: true, phone: true },
      recentActivity: "Reviewed armorial submissions and updated historical documentation standards."
    },
    {
      id: 5,
      name: "Sir Robert Genealogy",
      rank: "pursuivant",
      status: "active",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      specializations: ["Genealogy Research", "Historical Documentation", "Educational Outreach"],
      activeProjects: 4,
      joinedYear: 2021,
      email: "robert.genealogy@example.com",
      phone: "+1-555-0105",
      contactMethods: { email: true, phone: false },
      recentActivity: "Conducted extensive genealogical research and created educational workshops."
    },
    {
      id: 6,
      name: "Dame Catherine Protocol",
      rank: "herald-extraordinary",
      status: "active",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      specializations: ["Ceremonial Protocol", "Educational Outreach", "Digital Archives"],
      activeProjects: 7,
      joinedYear: 2019,
      email: "catherine.protocol@example.com",
      phone: "+1-555-0106",
      contactMethods: { email: true, phone: true },
      recentActivity: "Developed new ceremonial protocols and enhanced digital archive accessibility."
    },
    {
      id: 7,
      name: "Sir William Archives",
      rank: "herald",
      status: "inactive",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face",
      specializations: ["Digital Archives", "Historical Documentation", "Artistic Design"],
      activeProjects: 2,
      joinedYear: 2016,
      email: "william.archives@example.com",
      phone: "+1-555-0107",
      contactMethods: { email: true, phone: false },
      recentActivity: "Maintained digital archives and provided historical consultation services."
    },
    {
      id: 8,
      name: "Lady Margaret Research",
      rank: "pursuivant",
      status: "active",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      specializations: ["Genealogy Research", "Legal Precedents", "Historical Documentation"],
      activeProjects: 5,
      joinedYear: 2022,
      email: "margaret.research@example.com",
      phone: "+1-555-0108",
      contactMethods: { email: true, phone: true },
      recentActivity: "Specialized in complex genealogical cases and legal precedent research."
    },
    {
      id: 9,
      name: "Sir James Design",
      rank: "herald-extraordinary",
      status: "active",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      specializations: ["Artistic Design", "Heraldry & Armory", "Digital Archives"],
      activeProjects: 11,
      joinedYear: 2018,
      email: "james.design@example.com",
      phone: "+1-555-0109",
      contactMethods: { email: true, phone: true },
      recentActivity: "Created innovative heraldic designs and enhanced digital presentation methods."
    },
    {
      id: 10,
      name: "Dame Victoria Education",
      rank: "herald",
      status: "active",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      specializations: ["Educational Outreach", "Ceremonial Protocol", "Historical Documentation"],
      activeProjects: 8,
      joinedYear: 2020,
      email: "victoria.education@example.com",
      phone: "+1-555-0110",
      contactMethods: { email: true, phone: false },
      recentActivity: "Developed comprehensive educational programs and ceremonial training materials."
    },
    {
      id: 11,
      name: "Sir Thomas Legal",
      rank: "king-of-arms",
      status: "active",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
      specializations: ["Legal Precedents", "Heraldry & Armory", "Ceremonial Protocol"],
      activeProjects: 10,
      joinedYear: 2017,
      email: "thomas.legal@example.com",
      phone: "+1-555-0111",
      contactMethods: { email: true, phone: true },
      recentActivity: "Established new legal frameworks and reviewed ceremonial precedents."
    },
    {
      id: 12,
      name: "Lady Anne Digital",
      rank: "pursuivant",
      status: "active",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      specializations: ["Digital Archives", "Artistic Design", "Educational Outreach"],
      activeProjects: 6,
      joinedYear: 2021,
      email: "anne.digital@example.com",
      phone: "+1-555-0112",
      contactMethods: { email: true, phone: true },
      recentActivity: "Modernized digital archive systems and created interactive educational content."
    }
  ];

  // Filter and sort officers
  const filteredAndSortedOfficers = useMemo(() => {
    let filtered = mockOfficers.filter(officer => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = officer.name.toLowerCase().includes(query);
        const matchesSpecialization = officer.specializations.some(spec => 
          spec.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesSpecialization) return false;
      }

      // Rank filter
      if (selectedRank && officer.rank !== selectedRank) return false;

      // Specialization filter
      if (selectedSpecializations.length > 0) {
        const hasSpecialization = selectedSpecializations.some(spec =>
          officer.specializations.some(officerSpec =>
            officerSpec.toLowerCase().includes(spec.replace('-', ' '))
          )
        );
        if (!hasSpecialization) return false;
      }

      // Active status filter
      if (activeOnly && officer.status !== 'active') return false;

      return true;
    });

    // Sort officers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rank':
          const rankOrder = ['earl-marshal', 'king-of-arms', 'herald', 'herald-extraordinary', 'pursuivant'];
          return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
        case 'activity':
          return new Date(b.lastActivity || 0) - new Date(a.lastActivity || 0);
        case 'projects':
          return b.activeProjects - a.activeProjects;
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockOfficers, searchQuery, selectedRank, selectedSpecializations, activeOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOfficers.length / itemsPerPage);
  const paginatedOfficers = filteredAndSortedOfficers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRank, selectedSpecializations, activeOnly, sortBy]);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedRank, selectedSpecializations, activeOnly, sortBy, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRank('');
    setSelectedSpecializations([]);
    setActiveOnly(false);
    setSortBy('name');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeOfficersCount = mockOfficers.filter(officer => officer.status === 'active').length;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Officers Directory - Herald Management System</title>
        <meta name="description" content="Browse and discover Herald officers across all ranks and specializations. View portfolios, current projects, and connect with the right expertise." />
        <meta name="keywords" content="herald officers, directory, heraldry, ceremonial, genealogy, armory" />
      </Helmet>

      <Header />
      <BreadcrumbNavigation />

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <DirectoryHeader 
          totalOfficers={mockOfficers.length}
          activeOfficers={activeOfficersCount}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3">
            <FilterSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedRank={selectedRank}
              onRankChange={setSelectedRank}
              selectedSpecializations={selectedSpecializations}
              onSpecializationChange={setSelectedSpecializations}
              activeOnly={activeOnly}
              onActiveToggle={setActiveOnly}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Officers Grid */}
          <div className="lg:col-span-9">
            <OfficersGrid
              officers={paginatedOfficers}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfficersDirectory;