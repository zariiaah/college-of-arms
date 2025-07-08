import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ projectId, onRestore, isOpen, onClose }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState([]);

  // Mock version history data
  useEffect(() => {
    if (isOpen && projectId) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockVersions = [
          {
            id: 'v1.5',
            timestamp: new Date(Date.now() - 300000), // 5 minutes ago
            author: 'Sir John Herald',
            changes: ['Updated project description', 'Increased progress to 75%'],
            changeCount: 2,
            size: '2.1 KB',
            isCurrent: true
          },
          {
            id: 'v1.4',
            timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
            author: 'Sir John Herald',
            changes: ['Added new project milestone', 'Updated end date'],
            changeCount: 2,
            size: '2.0 KB',
            isCurrent: false
          },
          {
            id: 'v1.3',
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            author: 'Sir John Herald',
            changes: ['Modified project tags', 'Updated priority to high'],
            changeCount: 2,
            size: '1.9 KB',
            isCurrent: false
          },
          {
            id: 'v1.2',
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            author: 'Sir John Herald',
            changes: ['Initial project setup', 'Added basic description'],
            changeCount: 2,
            size: '1.8 KB',
            isCurrent: false
          },
          {
            id: 'v1.1',
            timestamp: new Date(Date.now() - 14400000), // 4 hours ago
            author: 'Sir John Herald',
            changes: ['Project created'],
            changeCount: 1,
            size: '1.5 KB',
            isCurrent: false
          }
        ];
        
        setVersions(mockVersions);
        setIsLoading(false);
      }, 500);
    }
  }, [isOpen, projectId]);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const handleVersionSelect = (version) => {
    if (compareMode) {
      if (compareVersions.includes(version.id)) {
        setCompareVersions(prev => prev.filter(id => id !== version.id));
      } else if (compareVersions.length < 2) {
        setCompareVersions(prev => [...prev, version.id]);
      }
    } else {
      setSelectedVersion(version);
    }
  };

  const handleRestore = (version) => {
    if (window.confirm(`Are you sure you want to restore to ${version.id}? This will overwrite your current changes.`)) {
      onRestore(version);
      onClose();
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setCompareVersions([]);
    setSelectedVersion(null);
  };

  const getChangeIcon = (change) => {
    if (change.includes('Added') || change.includes('created')) return 'Plus';
    if (change.includes('Updated') || change.includes('Modified')) return 'Edit';
    if (change.includes('Deleted') || change.includes('Removed')) return 'Minus';
    return 'FileText';
  };

  const getChangeColor = (change) => {
    if (change.includes('Added') || change.includes('created')) return 'text-success';
    if (change.includes('Updated') || change.includes('Modified')) return 'text-accent';
    if (change.includes('Deleted') || change.includes('Removed')) return 'text-error';
    return 'text-text-primary';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface border border-border rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-heading font-heading-semibold text-text-primary">
                Version History
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                View and restore previous versions of your project
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={compareMode ? "primary" : "ghost"}
                onClick={toggleCompareMode}
                iconName="GitCompare"
              >
                Compare
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                iconName="X"
              />
            </div>
          </div>

          {compareMode && (
            <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
              <p className="text-sm text-text-primary">
                Select up to 2 versions to compare ({compareVersions.length}/2 selected)
              </p>
              {compareVersions.length === 2 && (
                <Button
                  variant="primary"
                  className="mt-2"
                  iconName="Eye"
                >
                  Compare Selected Versions
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Version List */}
          <div className="w-1/2 border-r border-border overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <Icon name="Loader2" size={32} className="text-text-secondary mx-auto mb-3 animate-spin" />
                <p className="text-sm text-text-secondary">Loading version history...</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {versions.map((version) => (
                  <div
                    key={version.id}
                    onClick={() => handleVersionSelect(version)}
                    className={`p-4 cursor-pointer transition-smooth hover:bg-background ${
                      selectedVersion?.id === version.id ? 'bg-primary/5 border-r-2 border-r-primary' : ''
                    } ${
                      compareMode && compareVersions.includes(version.id) ? 'bg-accent/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm font-body-medium text-text-primary">
                            {version.id}
                          </span>
                          {version.isCurrent && (
                            <span className="px-2 py-0.5 bg-success text-success-foreground text-xs rounded-full">
                              Current
                            </span>
                          )}
                          {compareMode && compareVersions.includes(version.id) && (
                            <Icon name="Check" size={16} className="text-accent" />
                          )}
                        </div>
                        
                        <p className="text-sm text-text-secondary mb-2">
                          {formatTimestamp(version.timestamp)} by {version.author}
                        </p>
                        
                        <div className="space-y-1">
                          {version.changes.slice(0, 2).map((change, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Icon 
                                name={getChangeIcon(change)} 
                                size={12} 
                                className={getChangeColor(change)} 
                              />
                              <span className="text-xs text-text-secondary">{change}</span>
                            </div>
                          ))}
                          {version.changes.length > 2 && (
                            <p className="text-xs text-text-secondary">
                              +{version.changes.length - 2} more changes
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-text-secondary">{version.size}</p>
                        <p className="text-xs text-text-secondary">
                          {version.changeCount} change{version.changeCount > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Version Details */}
          <div className="w-1/2 overflow-y-auto">
            {selectedVersion ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-lg font-heading font-heading-semibold text-text-primary">
                      {selectedVersion.id}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {formatTimestamp(selectedVersion.timestamp)} by {selectedVersion.author}
                    </p>
                  </div>
                  
                  {!selectedVersion.isCurrent && (
                    <Button
                      variant="primary"
                      onClick={() => handleRestore(selectedVersion)}
                      iconName="RotateCcw"
                    >
                      Restore
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-body font-body-medium text-text-primary mb-2">
                      Changes in this version:
                    </h5>
                    <div className="space-y-2">
                      {selectedVersion.changes.map((change, index) => (
                        <div key={index} className="flex items-start space-x-3 p-2 bg-background rounded-lg">
                          <Icon 
                            name={getChangeIcon(change)} 
                            size={16} 
                            className={getChangeColor(change)} 
                          />
                          <span className="text-sm text-text-primary">{change}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h5 className="text-sm font-body font-body-medium text-text-primary mb-2">
                      Version Information:
                    </h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Size:</span>
                        <span className="ml-2 text-text-primary">{selectedVersion.size}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Changes:</span>
                        <span className="ml-2 text-text-primary">{selectedVersion.changeCount}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Author:</span>
                        <span className="ml-2 text-text-primary">{selectedVersion.author}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Status:</span>
                        <span className="ml-2 text-text-primary">
                          {selectedVersion.isCurrent ? 'Current' : 'Historical'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="border-t border-border pt-4">
                    <h5 className="text-sm font-body font-body-medium text-text-primary mb-2">
                      Preview:
                    </h5>
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <p className="text-sm text-text-secondary">
                        Version preview would show the project state at this point in time.
                        This could include project details, progress, and other relevant information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Icon name="History" size={32} className="text-text-secondary mx-auto mb-3" />
                <p className="text-sm text-text-secondary">
                  Select a version to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;