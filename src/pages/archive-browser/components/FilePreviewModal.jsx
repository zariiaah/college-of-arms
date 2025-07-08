import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FilePreviewModal = ({ file, isOpen, onClose, onDownload }) => {
  const [activeTab, setActiveTab] = useState('preview');

  if (!isOpen || !file) return null;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = () => {
    onDownload(file);
    onClose();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const tabs = [
    { id: 'preview', label: 'Preview', icon: 'Eye' },
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'usage', label: 'Usage', icon: 'Code' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="FileImage" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
                {file.filename}
              </h2>
              <p className="text-sm text-text-secondary">
                {file.category} • {formatFileSize(file.size)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              onClick={handleDownload}
              iconName="Download"
            >
              Download
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-6 py-3 text-sm font-body font-body-medium transition-smooth
                ${activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-background'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {/* SVG Preview */}
              <div className="bg-background rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                {file.previewUrl ? (
                  <Image
                    src={file.previewUrl}
                    alt={file.filename}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <Icon name="FileImage" size={64} className="text-text-secondary mx-auto mb-4" />
                    <p className="text-text-secondary">Preview not available</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-center space-x-4">
                <Button variant="ghost" iconName="ZoomIn">
                  Zoom In
                </Button>
                <Button variant="ghost" iconName="ZoomOut">
                  Zoom Out
                </Button>
                <Button variant="ghost" iconName="RotateCw">
                  Rotate
                </Button>
                <Button variant="ghost" iconName="Maximize2">
                  Fullscreen
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* File Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary">
                    File Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Filename:</span>
                      <span className="text-text-primary font-body-medium">{file.filename}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">File Size:</span>
                      <span className="text-text-primary">{formatFileSize(file.size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Format:</span>
                      <span className="text-text-primary">SVG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Dimensions:</span>
                      <span className="text-text-primary">{file.dimensions || 'Vector'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Downloads:</span>
                      <span className="text-text-primary">{file.downloads}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary">
                    Upload Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Uploaded by:</span>
                      <span className="text-text-primary font-body-medium">{file.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Upload Date:</span>
                      <span className="text-text-primary">{formatDate(file.uploadDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Category:</span>
                      <span className="text-text-primary">{file.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Usage Rights:</span>
                      <span className="text-text-primary">{file.usageRights}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {file.description && (
                <div>
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-3">
                    Description
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {file.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {file.tags && file.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {file.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-heading-medium text-text-primary">
                Usage Guidelines
              </h3>

              {/* Usage Rights */}
              <div className="bg-background rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Shield" size={20} className="text-success" />
                  <span className="font-body font-body-medium text-text-primary">
                    {file.usageRights}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  This SVG resource is available for use according to the Herald Management System usage policy. 
                  Please ensure proper attribution when using in official documents.
                </p>
              </div>

              {/* HTML Embed Code */}
              <div>
                <h4 className="font-body font-body-medium text-text-primary mb-2">
                  HTML Embed Code
                </h4>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <code className="text-text-primary">
                    {`<img src="${file.downloadUrl}" alt="${file.filename}" />`}
                  </code>
                  <Button
                    variant="ghost"
                    onClick={() => copyToClipboard(`<img src="${file.downloadUrl}" alt="${file.filename}" />`)}
                    className="ml-2 text-xs"
                  >
                    <Icon name="Copy" size={14} />
                  </Button>
                </div>
              </div>

              {/* Direct Link */}
              <div>
                <h4 className="font-body font-body-medium text-text-primary mb-2">
                  Direct Link
                </h4>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <code className="text-text-primary break-all">
                    {file.downloadUrl}
                  </code>
                  <Button
                    variant="ghost"
                    onClick={() => copyToClipboard(file.downloadUrl)}
                    className="ml-2 text-xs"
                  >
                    <Icon name="Copy" size={14} />
                  </Button>
                </div>
              </div>

              {/* Attribution */}
              <div>
                <h4 className="font-body font-body-medium text-text-primary mb-2">
                  Suggested Attribution
                </h4>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <code className="text-text-primary">
                    {`"${file.filename}" by ${file.uploadedBy}, Herald Management System`}
                  </code>
                  <Button
                    variant="ghost"
                    onClick={() => copyToClipboard(`"${file.filename}" by ${file.uploadedBy}, Herald Management System`)}
                    className="ml-2 text-xs"
                  >
                    <Icon name="Copy" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;