import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OfficerHeader = ({ officer, isOwnProfile, onEditProfile }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-text-secondary bg-text-secondary/10';
      case 'on-leave': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-text-secondary/10';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank.toLowerCase()) {
      case 'earl marshal': return 'Crown';
      case 'king of arms': return 'Shield';
      case 'herald': return 'Award';
      case 'pursuivant': return 'Star';
      default: return 'User';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        {/* Officer Portrait */}
        <div className="flex-shrink-0 mb-6 lg:mb-0">
          <div className="relative">
            <Image
              src={officer.portrait}
              alt={`${officer.name} portrait`}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg object-cover border-2 border-border"
            />
            <div className={`absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-mono ${getStatusColor(officer.status)}`}>
              {officer.status}
            </div>
          </div>
        </div>

        {/* Officer Information */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-heading-semibold text-text-primary mb-2">
                {officer.name}
              </h1>
              <div className="flex items-center space-x-2 mb-3">
                <Icon name={getRankIcon(officer.rank)} size={20} className="text-accent" />
                <span className="text-lg font-body font-body-medium text-accent">
                  {officer.rank}
                </span>
              </div>
            </div>
            
            {isOwnProfile && (
              <Button
                variant="outline"
                onClick={onEditProfile}
                iconName="Edit"
                className="mt-4 sm:mt-0"
              >
                Edit Profile
              </Button>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{officer.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{officer.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={18} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{officer.location}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={18} className="text-text-secondary" />
                <span className="text-sm text-text-primary">
                  Appointed: {new Date(officer.appointmentDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Users" size={18} className="text-text-secondary" />
                <span className="text-sm text-text-primary">
                  Department: {officer.department}
                </span>
              </div>
              {officer.robloxUsername && (
                <div className="flex items-center space-x-3">
                  <Icon name="Gamepad2" size={18} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">
                    Roblox: {officer.robloxUsername}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          {officer.bio && (
            <div className="bg-background p-4 rounded-lg">
              <h3 className="text-sm font-heading font-heading-medium text-text-primary mb-2">
                Biography
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {officer.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficerHeader;