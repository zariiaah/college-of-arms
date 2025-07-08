import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OfficerCard = ({ officer }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRankColor = (rank) => {
    const colors = {
      'earl-marshal': 'bg-error text-error-foreground',
      'king-of-arms': 'bg-warning text-warning-foreground',
      'herald': 'bg-primary text-primary-foreground',
      'pursuivant': 'bg-success text-success-foreground',
      'herald-extraordinary': 'bg-accent text-accent-foreground'
    };
    return colors[rank] || 'bg-secondary text-secondary-foreground';
  };

  const formatRank = (rank) => {
    const rankMap = {
      'earl-marshal': 'Earl Marshal',
      'king-of-arms': 'King of Arms',
      'herald': 'Herald',
      'pursuivant': 'Pursuivant',
      'herald-extraordinary': 'Herald Extraordinary'
    };
    return rankMap[rank] || rank;
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-text-secondary';
  };

  return (
    <div
      className="bg-surface border border-border rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Officer Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={officer.image}
          alt={`${officer.name} - ${formatRank(officer.rank)}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Status Indicator */}
        <div className="absolute top-3 right-3">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-body font-body-medium ${
            officer.status === 'active' ?'bg-success/10 text-success border border-success/20' :'bg-text-secondary/10 text-text-secondary border border-text-secondary/20'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              officer.status === 'active' ? 'bg-success' : 'bg-text-secondary'
            }`}></div>
            <span className="capitalize">{officer.status}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-center text-primary-foreground">
              <Icon name="Eye" size={24} className="mx-auto mb-2" />
              <p className="text-sm font-body font-body-medium">View Portfolio</p>
            </div>
          </div>
        )}
      </div>

      {/* Officer Details */}
      <div className="p-4">
        {/* Name and Rank */}
        <div className="mb-3">
          <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-1 line-clamp-1">
            {officer.name}
          </h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-body font-body-medium ${getRankColor(officer.rank)}`}>
            {formatRank(officer.rank)}
          </span>
        </div>

        {/* Specializations */}
        <div className="mb-3">
          <p className="text-xs text-text-secondary font-body font-body-medium mb-1">
            Specializations
          </p>
          <div className="flex flex-wrap gap-1">
            {officer.specializations.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-background text-text-secondary text-xs rounded-md border border-border"
              >
                {spec}
              </span>
            ))}
            {officer.specializations.length > 3 && (
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md">
                +{officer.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Briefcase" size={14} />
            <span>{officer.activeProjects} active projects</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>Joined {officer.joinedYear}</span>
          </div>
        </div>

        {/* Quick Contact & Portfolio Button */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {officer.contactMethods.email && (
              <Button
                variant="ghost"
                onClick={() => window.open(`mailto:${officer.email}`, '_blank')}
                className="p-2"
                title="Send Email"
              >
                <Icon name="Mail" size={16} />
              </Button>
            )}
            {officer.contactMethods.phone && (
              <Button
                variant="ghost"
                onClick={() => window.open(`tel:${officer.phone}`, '_blank')}
                className="p-2"
                title="Call Officer"
              >
                <Icon name="Phone" size={16} />
              </Button>
            )}
          </div>
          
          <Link to={`/officer-portfolio?id=${officer.id}`} className="flex-1">
            <Button
              variant="primary"
              className="w-full"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View Portfolio
            </Button>
          </Link>
        </div>

        {/* Recent Activity Preview */}
        {isHovered && officer.recentActivity && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-text-secondary font-body font-body-medium mb-1">
              Recent Activity
            </p>
            <p className="text-sm text-text-primary line-clamp-2">
              {officer.recentActivity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerCard;