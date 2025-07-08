import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import CategorySidebar from './components/CategorySidebar';
import SearchFilters from './components/SearchFilters';
import FileGrid from './components/FileGrid';
import FilePreviewModal from './components/FilePreviewModal';
import BulkDownloadModal from './components/BulkDownloadModal';

const ArchiveBrowser = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    sortBy: 'newest',
    dateRange: 'all'
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showBulkDownloadModal, setShowBulkDownloadModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);

  // Mock data for categories
  const categories = [
    {
      id: 'ceremonial',
      name: 'Ceremonial Graphics',
      type: 'ceremonial',
      count: 45,
      subcategories: [
        { id: 'crowns', name: 'Crowns & Regalia', count: 12 },
        { id: 'ceremonies', name: 'Ceremony Elements', count: 18 },
        { id: 'banners', name: 'Banners & Flags', count: 15 }
      ]
    },
    {
      id: 'official',
      name: 'Official Documents',
      type: 'official',
      count: 32,
      subcategories: [
        { id: 'seals', name: 'Official Seals', count: 8 },
        { id: 'letterheads', name: 'Letterheads', count: 12 },
        { id: 'certificates', name: 'Certificate Templates', count: 12 }
      ]
    },
    {
      id: 'symbols',
      name: 'Herald Symbols',
      type: 'symbols',
      count: 28,
      subcategories: [
        { id: 'coats-of-arms', name: 'Coats of Arms', count: 15 },
        { id: 'emblems', name: 'Emblems', count: 8 },
        { id: 'insignia', name: 'Rank Insignia', count: 5 }
      ]
    },
    {
      id: 'decorative',
      name: 'Decorative Elements',
      type: 'decorative',
      count: 38,
      subcategories: [
        { id: 'borders', name: 'Borders & Frames', count: 20 },
        { id: 'ornaments', name: 'Ornamental Design', count: 12 },
        { id: 'patterns', name: 'Background Patterns', count: 6 }
      ]
    }
  ];

  // Mock data for files
  const mockFiles = [
    {
      id: 1,
      filename: 'royal-crown-ceremonial.svg',
      description: 'Traditional royal crown design for ceremonial use in official documents and presentations.',
      category: 'Ceremonial Graphics',
      subcategory: 'crowns',
      size: 45678,
      uploadDate: new Date('2024-01-15'),
      uploadedBy: 'Sir John Herald',
      downloads: 234,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
      previewUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      downloadUrl: '/assets/svg/royal-crown-ceremonial.svg',
      tags: ['crown', 'royal', 'ceremonial', 'gold'],
      usageRights: 'Herald Officers Only',
      dimensions: '512x512'
    },
    {
      id: 2,
      filename: 'official-seal-template.svg',
      description: 'Customizable official seal template with placeholder text for various Herald departments.',
      category: 'Official Documents',
      subcategory: 'seals',
      size: 32145,
      uploadDate: new Date('2024-01-12'),
      uploadedBy: 'Dame Sarah Ceremonial',
      downloads: 189,
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=200&fit=crop',
      previewUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
      downloadUrl: '/assets/svg/official-seal-template.svg',
      tags: ['seal', 'official', 'template', 'customizable'],
      usageRights: 'Public Domain',
      dimensions: '400x400'
    },
    {
      id: 3,
      filename: 'herald-coat-of-arms.svg',
      description: 'Traditional Herald coat of arms featuring heraldic symbols and motto banner.',
      category: 'Herald Symbols',
      subcategory: 'coats-of-arms',
      size: 67890,
      uploadDate: new Date('2024-01-10'),
      uploadedBy: 'Lord Michael Traditions',
      downloads: 156,
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop',
      previewUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      downloadUrl: '/assets/svg/herald-coat-of-arms.svg',
      tags: ['coat-of-arms', 'heraldic', 'tradition', 'motto'],
      usageRights: 'Herald Officers Only',
      dimensions: '600x800'
    },
    {
      id: 4,
      filename: 'ceremonial-banner-design.svg',
      description: 'Elegant ceremonial banner design with customizable text areas for special events.',
      category: 'Ceremonial Graphics',
      subcategory: 'banners',
      size: 54321,
      uploadDate: new Date('2024-01-08'),
      uploadedBy: 'Sir John Herald',
      downloads: 98,
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop',
      previewUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      downloadUrl: '/assets/svg/ceremonial-banner-design.svg',
      tags: ['banner', 'ceremonial', 'event', 'customizable'],
      usageRights: 'Public Domain',
      dimensions: '1200x400'
    },
    {
      id: 5,
      filename: 'decorative-border-ornate.svg',
      description: 'Ornate decorative border perfect for certificates, invitations, and formal documents.',
      category: 'Decorative Elements',
      subcategory: 'borders',
      size: 23456,
      uploadDate: new Date('2024-01-05'),
      uploadedBy: 'Dame Sarah Ceremonial',
      downloads: 267,
      thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop',
      previewUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      downloadUrl: '/assets/svg/decorative-border-ornate.svg',
      tags: ['border', 'decorative', 'ornate', 'certificate'],
      usageRights: 'Public Domain',
      dimensions: '800x600'
    },
    {
      id: 6,
      filename: 'rank-insignia-set.svg',
      description: 'Complete set of rank insignia for different Herald officer positions and hierarchies.',
      category: 'Herald Symbols',
      subcategory: 'insignia',
      size: 78901,
      uploadDate: new Date('2024-01-03'),
      uploadedBy: 'Lord Michael Traditions',
      downloads: 145,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
      previewUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      downloadUrl: '/assets/svg/rank-insignia-set.svg',
      tags: ['insignia', 'rank', 'hierarchy', 'officer'],
      usageRights: 'Herald Officers Only',
      dimensions: '400x600'
    },
    {
      id: 7,
      filename: 'certificate-template-formal.svg',
      description: 'Formal certificate template with elegant typography and decorative elements.',
      category: 'Official Documents',
      subcategory: 'certificates',
      size: 41234,
      uploadDate: new Date('2024-01-01'),
      uploadedBy: 'Sir John Herald',
      downloads: 312,
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=200&fit=crop',
      previewUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
      downloadUrl: '/assets/svg/certificate-template-formal.svg',
      tags: ['certificate', 'template', 'formal', 'typography'],
      usageRights: 'Public Domain',
      dimensions: '1200x900'
    },
    {
      id: 8,
      filename: 'heraldic-emblem-collection.svg',
      description: 'Collection of traditional heraldic emblems and symbols for various ceremonial uses.',
      category: 'Herald Symbols',
      subcategory: 'emblems',
      size: 56789,
      uploadDate: new Date('2023-12-28'),
      uploadedBy: 'Dame Sarah Ceremonial',
      downloads: 178,
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop',
      previewUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      downloadUrl: '/assets/svg/heraldic-emblem-collection.svg',
      tags: ['emblem', 'heraldic', 'collection', 'traditional'],
      usageRights: 'Herald Officers Only',
      dimensions: '800x800'
    }
  ];

  // File statistics
  const fileStats = {
    total: mockFiles.length,
    byCategory: categories.reduce((acc, cat) => {
      acc[cat.id] = cat.count;
      return acc;
    }, {})
  };

  // Initialize files
  useEffect(() => {
    setFiles(mockFiles);
    setFilteredFiles(mockFiles);
  }, []);

  // Filter files based on category, search, and filters
  useEffect(() => {
    let filtered = [...files];

    // Filter by category
    if (selectedCategory !== 'all') {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        filtered = filtered.filter(file => 
          file.category === category.name || 
          file.subcategory === selectedCategory
        );
      } else {
        // Check if it's a subcategory
        filtered = filtered.filter(file => file.subcategory === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(file =>
        file.filename.toLowerCase().includes(query) ||
        file.description.toLowerCase().includes(query) ||
        file.tags.some(tag => tag.toLowerCase().includes(query)) ||
        file.uploadedBy.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (activeFilters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
        break;
      case 'name':
        filtered.sort((a, b) => a.filename.localeCompare(b.filename));
        break;
      case 'size':
        filtered.sort((a, b) => b.size - a.size);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      default:
        break;
    }

    // Apply date range filter
    if (activeFilters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (activeFilters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(file => new Date(file.uploadDate) >= filterDate);
    }

    setFilteredFiles(filtered);
  }, [files, selectedCategory, searchQuery, activeFilters]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedFiles([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleFileSelect = (file) => {
    if (Array.isArray(file)) {
      setSelectedFiles(file);
    } else {
      setPreviewFile(file);
      setShowPreviewModal(true);
    }
  };

  const handleFileDownload = (file) => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update download count
    setFiles(prev => prev.map(f => 
      f.id === file.id ? { ...f, downloads: f.downloads + 1 } : f
    ));
  };

  const handleBulkDownload = () => {
    if (selectedFiles.length > 0) {
      setShowBulkDownloadModal(true);
    }
  };

  const handleBulkDownloadConfirm = (files, options) => {
    // Mock bulk download functionality
    console.log('Bulk downloading:', files, options);
    
    // Update download counts
    setFiles(prev => prev.map(f => {
      const selectedFile = files.find(sf => sf.id === f.id);
      return selectedFile ? { ...f, downloads: f.downloads + 1 } : f;
    }));
    
    setSelectedFiles([]);
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Archive Browser', path: '/archive-browser' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Archive Browser - Herald Management System</title>
        <meta name="description" content="Browse and download SVG Herald resources through our organized archive system with advanced search and filtering capabilities." />
        <meta name="keywords" content="herald, archive, svg, resources, download, ceremonial, graphics" />
      </Helmet>

      <Header />
      <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Category Sidebar */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            fileStats={fileStats}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Filters */}
          <SearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />

          {/* File Grid */}
          <FileGrid
            files={filteredFiles}
            onFileSelect={handleFileSelect}
            selectedFiles={selectedFiles}
            onBulkDownload={handleBulkDownload}
          />
        </div>
      </div>

      {/* Mobile Category Sidebar - Hidden on desktop */}
      <div className="lg:hidden">
        {/* Mobile category selector would go here */}
      </div>

      {/* Modals */}
      <FilePreviewModal
        file={previewFile}
        isOpen={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setPreviewFile(null);
        }}
        onDownload={handleFileDownload}
      />

      <BulkDownloadModal
        files={selectedFiles}
        isOpen={showBulkDownloadModal}
        onClose={() => setShowBulkDownloadModal(false)}
        onDownload={handleBulkDownloadConfirm}
      />
    </div>
  );
};

export default ArchiveBrowser;