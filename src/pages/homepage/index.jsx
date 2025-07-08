import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import FeaturedOfficers from './components/FeaturedOfficers';
import ArchivePreview from './components/ArchivePreview';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Herald Management System - Professional Ceremonial Platform</title>
        <meta 
          name="description" 
          content="Professional ceremonial management platform for Herald officers featuring comprehensive portfolios, archival resources, and collaborative tools for traditional protocol administration."
        />
        <meta 
          name="keywords" 
          content="herald, ceremonial, protocol, management, officers, archive, heraldic, SVG, resources"
        />
        <meta property="og:title" content="Herald Management System" />
        <meta property="og:description" content="Professional ceremonial management platform for Herald officers" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Global Navigation Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-0">
          {/* Hero Section with Featured Officer Spotlight */}
          <HeroSection />

          {/* News and Updates Section */}
          <NewsSection />

          {/* Featured Officers Sidebar */}
          <FeaturedOfficers />

          {/* Archive Preview Section */}
          <ArchivePreview />
        </main>

        {/* Footer */}
        <footer className="bg-surface border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-6 h-6 text-primary-foreground" 
                      fill="currentColor"
                    >
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                      <path d="M12 16L13.09 22.26L20 23L13.09 23.74L12 30L10.91 23.74L4 23L10.91 22.26L12 16Z" opacity="0.6"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
                    Herald Management
                  </h3>
                </div>
                <p className="text-text-secondary font-body text-sm">
                  Professional ceremonial management platform for distinguished Herald officers.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-heading font-heading-medium text-text-primary mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/officers-directory" className="text-text-secondary hover:text-primary transition-colors">Officers Directory</a></li>
                  <li><a href="/archive-browser" className="text-text-secondary hover:text-primary transition-colors">Archive Browser</a></li>
                  <li><a href="/portfolio-editor" className="text-text-secondary hover:text-primary transition-colors">Portfolio Editor</a></li>
                  <li><a href="/admin-dashboard" className="text-text-secondary hover:text-primary transition-colors">Admin Dashboard</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-heading font-heading-medium text-text-primary mb-4">
                  Resources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Protocol Guidelines</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Ceremonial Handbook</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Historical Archives</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Training Materials</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-heading font-heading-medium text-text-primary mb-4">
                  Contact
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="mailto:admin@herald.gov" className="text-text-secondary hover:text-primary transition-colors">admin@herald.gov</a></li>
                  <li><a href="tel:+1234567890" className="text-text-secondary hover:text-primary transition-colors">+1 (234) 567-890</a></li>
                  <li><span className="text-text-secondary">Herald House, Royal District</span></li>
                  <li><span className="text-text-secondary">Westminster, London</span></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-text-secondary text-sm">
                © 2024 Herald Management System. All rights reserved. Professional ceremonial services since 1485.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;