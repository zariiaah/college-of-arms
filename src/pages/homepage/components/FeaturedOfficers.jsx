import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedOfficers = () => {
  // Mock featured officers data
  const featuredOfficers = [
    {
      id: 1,
      name: "Sir Edmund Blackwell",
      rank: "Earl Marshal",
      image: "/assets/images/no_image.png",
      specializations: ["Ceremonial Protocol", "Royal Ceremonies"],
      activeProjects: 8,
      status: "active"
    },
    {
      id: 2,
      name: "Dame Margaret Thornfield",
      rank: "King of Arms",
      image: "/assets/images/no_image.png",
      specializations: ["Heraldic Law", "Grant of Arms"],
      activeProjects: 12,
      status: "active"
    },
    {
      id: 3,
      name: "Sir William Ashford",
      rank: "Herald",
      image: "/assets/images/no_image.png",
      specializations: ["Medieval Traditions", "Historical Research"],
      activeProjects: 6,
      status: "active"
    },
    {
      id: 4,
      name: "Lady Catherine Pemberton",
      rank: "Pursuivant",
      image: "/assets/images/no_image.png",
      specializations: ["Genealogy", "Armorial Research"],
      activeProjects: 4,
      status: "active"
    }
  ];

  const getRankColor = (rank) => {
    const colors = {
      'Earl Marshal': 'bg-error text-error-foreground',
      'King of Arms': 'bg-warning text-warning-foreground',
      'Herald': 'bg-primary text-primary-foreground',
      'Pursuivant': 'bg-success text-success-foreground'
    };
    return colors[rank] || 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
              Featured Officers
            </h2>
            <p className="text-text-secondary font-body">
              Meet our distinguished Herald officers and their specializations
            </p>
          </div>
          <Link to="/officers-directory">
            <Button variant="outline" iconName="Users">
              View All Officers
            </Button>
          </Link>
        </div>

        {/* Officers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredOfficers.map((officer) => (
            <div
              key={officer.id}
              className="bg-surface border border-border rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group"
            >
              {/* Officer Image */}
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={officer.image}
                  alt={`${officer.name} - ${officer.rank}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Status Indicator */}
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <Icon name="Eye" size={24} className="mx-auto mb-2" />
                    <p className="text-sm font-body font-body-medium">View Portfolio</p>
                  </div>
                </div>
              </div>

              {/* Officer Details */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-1 line-clamp-1">
                    {officer.name}
                  </h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-body font-body-medium ${getRankColor(officer.rank)}`}>
                    {officer.rank}
                  </span>
                </div>

                {/* Specializations */}
                <div className="mb-3">
                  <p className="text-xs text-text-secondary font-body font-body-medium mb-1">
                    Specializations
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {officer.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-background text-text-secondary text-xs rounded-md border border-border"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active Projects */}
                <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Briefcase" size={14} />
                    <span>{officer.activeProjects} projects</span>
                  </div>
                  <Link to={`/officer-portfolio?id=${officer.id}`}>
                    <Button variant="ghost" iconName="ArrowRight" className="text-primary p-1">
                      <span className="sr-only">View Portfolio</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-surface border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <Icon name="Users" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-heading font-heading-semibold text-text-primary mb-2">
              Join the Herald Corps
            </h3>
            <p className="text-text-secondary font-body mb-6">
              Are you interested in ceremonial protocol and heraldic traditions? 
              Discover opportunities to contribute to our distinguished organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" iconName="Plus">
                Apply Now
              </Button>
              <Button variant="outline" iconName="Info">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedOfficers;