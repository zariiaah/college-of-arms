import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [currentOfficer, setCurrentOfficer] = useState(0);

  // Mock featured officers data
  const featuredOfficers = [
    {
      id: 1,
      name: "Sir Edmund Blackwell",
      rank: "Earl Marshal",
      image: "/assets/images/no_image.png",
      description: "Leading the ceremonial protocols for the realm with distinguished service spanning over two decades.",
      specializations: ["Ceremonial Protocol", "Heraldic Design", "Royal Ceremonies"],
      achievements: "Order of the Garter, Royal Victorian Order"
    },
    {
      id: 2,
      name: "Dame Margaret Thornfield",
      rank: "King of Arms",
      image: "/assets/images/no_image.png",
      description: "Master of heraldic law and genealogy, overseeing the granting of armorial bearings.",
      specializations: ["Heraldic Law", "Genealogy", "Grant of Arms"],
      achievements: "Commander of the Royal Victorian Order"
    },
    {
      id: 3,
      name: "Sir William Ashford",
      rank: "Herald",
      image: "/assets/images/no_image.png",
      description: "Expert in medieval traditions and ceremonial arrangements for state occasions.",
      specializations: ["Medieval Traditions", "State Ceremonies", "Historical Research"],
      achievements: "Member of the Royal Victorian Order"
    }
  ];

  // Auto-rotate through officers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfficer((prev) => (prev + 1) % featuredOfficers.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const officer = featuredOfficers[currentOfficer];

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
    <div className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-heading font-heading-bold text-text-primary mb-4">
                Herald Management
                <span className="block text-primary">System</span>
              </h1>
              <p className="text-lg text-text-secondary font-body mb-6">
                Professional ceremonial management platform for Herald officers, 
                featuring comprehensive portfolios, archival resources, and collaborative tools.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/officers-directory">
                <Button variant="primary" iconName="Users" className="w-full sm:w-auto">
                  Browse Officers
                </Button>
              </Link>
              <Link to="/archive-browser">
                <Button variant="outline" iconName="Archive" className="w-full sm:w-auto">
                  Explore Archive
                </Button>
              </Link>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-body font-body-medium text-text-primary">Officer Portfolios</p>
                  <p className="text-sm text-text-secondary">Professional profiles & achievements</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Archive" size={20} className="text-success" />
                </div>
                <div>
                  <p className="font-body font-body-medium text-text-primary">SVG Archive</p>
                  <p className="text-sm text-text-secondary">Comprehensive heraldic resources</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Officer */}
          <div className="relative">
            <div className="bg-surface border border-border rounded-2xl shadow-card overflow-hidden">
              {/* Officer Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <AppImage
                  src={officer?.image}
                  alt={`${officer?.name} - ${officer?.rank}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {featuredOfficers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentOfficer(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentOfficer ? 'bg-primary-foreground' : 'bg-primary-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Officer Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-heading-semibold text-text-primary mb-1">
                      {officer?.name}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-body font-body-medium ${getRankColor(officer?.rank)}`}>
                      {officer?.rank}
                    </span>
                  </div>
                  <Link to={`/officer-portfolio?id=${officer?.id}`}>
                    <Button variant="ghost" iconName="ArrowRight" className="text-primary">
                      View Portfolio
                    </Button>
                  </Link>
                </div>

                <p className="text-text-secondary font-body mb-4 line-clamp-3">
                  {officer?.description}
                </p>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {officer?.specializations?.slice(0, 3).map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-background text-text-secondary text-xs rounded-md border border-border"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Award" size={16} />
                  <span className="line-clamp-1">{officer?.achievements}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;