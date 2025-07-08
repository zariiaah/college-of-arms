import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkDownloadModal = ({ files, isOpen, onClose, onDownload }) => {
  const [downloadFormat, setDownloadFormat] = useState('zip');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  if (!isOpen || !files || files.length === 0) return null;

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsDownloading(false);
          onDownload(files, { format: downloadFormat, includeMetadata });
          onClose();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadOptions = [
    {
      value: 'zip',
      label: 'ZIP Archive',
      description: 'All files compressed in a single ZIP file',
      icon: 'Archive'
    },
    {
      value: 'individual',
      label: 'Individual Files',
      description: 'Download each file separately',
      icon: 'Files'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-lg shadow-elevated max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
                Bulk Download
              </h2>
              <p className="text-sm text-text-secondary">
                {files.length} files • {formatFileSize(totalSize)}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            disabled={isDownloading}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File List Preview */}
          <div>
            <h3 className="font-heading font-heading-medium text-text-primary mb-3">
              Selected Files
            </h3>
            <div className="bg-background rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {files.slice(0, 10).map((file) => (
                  <div key={file.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="FileImage" size={16} className="text-text-secondary" />
                      <span className="text-text-primary truncate">{file.filename}</span>
                    </div>
                    <span className="text-text-secondary">{formatFileSize(file.size)}</span>
                  </div>
                ))}
                {files.length > 10 && (
                  <div className="text-sm text-text-secondary text-center pt-2 border-t border-border">
                    ... and {files.length - 10} more files
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div>
            <h3 className="font-heading font-heading-medium text-text-primary mb-3">
              Download Format
            </h3>
            <div className="space-y-3">
              {downloadOptions.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-smooth
                    ${downloadFormat === option.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="downloadFormat"
                    value={option.value}
                    checked={downloadFormat === option.value}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="w-4 h-4 text-primary bg-surface border-border focus:ring-primary focus:ring-2"
                  />
                  <Icon name={option.icon} size={20} className="text-text-secondary" />
                  <div className="flex-1">
                    <div className="font-body font-body-medium text-text-primary">
                      {option.label}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {option.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="font-heading font-heading-medium text-text-primary mb-3">
              Additional Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={includeMetadata}
                  onChange={(e) => setIncludeMetadata(e.target.checked)}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                />
                <div>
                  <div className="font-body font-body-medium text-text-primary">
                    Include metadata file
                  </div>
                  <div className="text-sm text-text-secondary">
                    Add a JSON file with file information and usage rights
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Download Progress */}
          {isDownloading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-body font-body-medium text-text-primary">
                  Preparing download...
                </span>
                <span className="text-sm text-text-secondary">
                  {downloadProgress}%
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Size Warning */}
          {totalSize > 50 * 1024 * 1024 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
                <div>
                  <div className="font-body font-body-medium text-warning">
                    Large Download
                  </div>
                  <div className="text-sm text-text-secondary">
                    This download is {formatFileSize(totalSize)}. It may take some time to complete.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Total size: {formatFileSize(totalSize)}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isDownloading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleDownload}
              disabled={isDownloading}
              iconName={isDownloading ? "Loader2" : "Download"}
              className={isDownloading ? "animate-spin" : ""}
            >
              {isDownloading ? 'Preparing...' : 'Start Download'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkDownloadModal;