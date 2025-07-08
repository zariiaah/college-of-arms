import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArchiveContribution = ({ contribution }) => {
  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'svg': return 'Image';
      case 'document': return 'FileText';
      case 'template': return 'Layout';
      case 'design': return 'Palette';
      default: return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'svg': return 'text-accent bg-accent/10';
      case 'document': return 'text-primary bg-primary/10';
      case 'template': return 'text-success bg-success/10';
      case 'design': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-text-secondary/10';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start space-x-4">
        {/* File Preview */}
        <div className="flex-shrink-0">
          {contribution.preview ? (
            <Image
              src={contribution.preview}
              alt={contribution.title}
              className="w-20 h-20 rounded-lg object-cover border border-border"
            />
          ) : (
            <div className={`w-20 h-20 rounded-lg flex items-center justify-center ${getFileTypeColor(contribution.type)}`}>
              <Icon name={getFileTypeIcon(contribution.type)} size={28} />
            </div>
          )}
        </div>

        {/* Contribution Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-heading font-heading-medium text-text-primary">
              {contribution.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-mono ${getFileTypeColor(contribution.type)}`}>
              {contribution.type.toUpperCase()}
            </span>
          </div>

          <p className="text-sm text-text-secondary mb-3 leading-relaxed">
            {contribution.description}
          </p>

          {/* File Information */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">
                {new Date(contribution.uploadDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="HardDrive" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">
                {formatFileSize(contribution.fileSize)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">
                {contribution.downloadCount} downloads
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">
                {contribution.category}
              </span>
            </div>
          </div>

          {/* Tags */}
          {contribution.tags && contribution.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {contribution.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-background text-text-secondary text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">
                {contribution.viewCount} views
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => window.open(contribution.previewUrl, '_blank')}
                iconName="Eye"
                className="text-xs"
              >
                Preview
              </Button>
              <Button
                variant="primary"
                onClick={() => window.open(contribution.downloadUrl, '_blank')}
                iconName="Download"
                className="text-xs"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveContribution;