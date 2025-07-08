import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AchievementCard = ({ achievement }) => {
  const getAchievementIcon = (type) => {
    switch (type) {
      case 'award': return 'Award';
      case 'certification': return 'Certificate';
      case 'milestone': return 'Target';
      case 'recognition': return 'Star';
      default: return 'Trophy';
    }
  };

  const getAchievementColor = (type) => {
    switch (type) {
      case 'award': return 'text-accent bg-accent/10';
      case 'certification': return 'text-success bg-success/10';
      case 'milestone': return 'text-primary bg-primary/10';
      case 'recognition': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-text-secondary/10';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start space-x-4">
        {/* Achievement Icon/Image */}
        <div className="flex-shrink-0">
          {achievement.image ? (
            <Image
              src={achievement.image}
              alt={achievement.title}
              className="w-16 h-16 rounded-lg object-cover border border-border"
            />
          ) : (
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getAchievementColor(achievement.type)}`}>
              <Icon name={getAchievementIcon(achievement.type)} size={24} />
            </div>
          )}
        </div>

        {/* Achievement Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-heading font-heading-medium text-text-primary">
              {achievement.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-mono ${getAchievementColor(achievement.type)}`}>
              {achievement.type}
            </span>
          </div>

          <p className="text-sm text-text-secondary mb-3 leading-relaxed">
            {achievement.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-primary">
                  {new Date(achievement.dateEarned).toLocaleDateString()}
                </span>
              </div>
              
              {achievement.issuedBy && (
                <div className="flex items-center space-x-2">
                  <Icon name="Building" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">
                    {achievement.issuedBy}
                  </span>
                </div>
              )}
            </div>

            {achievement.verificationUrl && (
              <a
                href={achievement.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-accent hover:text-accent/80 transition-smooth"
              >
                <span className="text-sm font-body">Verify</span>
                <Icon name="ExternalLink" size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;