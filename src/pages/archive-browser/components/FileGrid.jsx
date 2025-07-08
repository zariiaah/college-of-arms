import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FileGrid = ({ files, onFileSelect, selectedFiles, onBulkDownload }) => {
  const [hoveredFile, setHoveredFile] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFileClick = (file) => {
    onFileSelect(file);
  };

  const handleCheckboxChange = (file, checked) => {
    if (checked) {
      onFileSelect([...selectedFiles, file]);
    } else {
      onFileSelect(selectedFiles.filter(f => f.id !== file.id));
    }
  };

  const selectAllFiles = () => {
    onFileSelect(files);
  };

  const deselectAllFiles = () => {
    onFileSelect([]);
  };

  const downloadFile = (file) => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (files.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="FileX" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
            No files found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your search criteria or browse different categories.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">
            {files.length} files
          </span>
          
          {selectedFiles.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-body font-body-medium text-primary">
                {selectedFiles.length} selected
              </span>
              <Button
                variant="primary"
                onClick={onBulkDownload}
                className="text-sm"
                iconName="Download"
              >
                Download Selected
              </Button>
              <Button
                variant="ghost"
                onClick={deselectAllFiles}
                className="text-sm"
              >
                Deselect All
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {selectedFiles.length === 0 && (
            <Button
              variant="ghost"
              onClick={selectAllFiles}
              className="text-sm"
            >
              Select All
            </Button>
          )}
          
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* File Grid/List */}
      <div className="p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth cursor-pointer group"
                onMouseEnter={() => setHoveredFile(file.id)}
                onMouseLeave={() => setHoveredFile(null)}
                onClick={() => handleFileClick(file)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-square bg-background p-4">
                  <div className="w-full h-full flex items-center justify-center">
                    {file.thumbnail ? (
                      <Image
                        src={file.thumbnail}
                        alt={file.filename}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <Icon name="FileImage" size={48} className="text-text-secondary" />
                    )}
                  </div>
                  
                  {/* Hover Overlay */}
                  {hoveredFile === file.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2">
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(file);
                        }}
                        className="text-sm"
                      >
                        <Icon name="Download" size={16} />
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Preview functionality
                        }}
                        className="text-sm"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                    </div>
                  )}

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedFiles.some(f => f.id === file.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(file, e.target.checked);
                      }}
                      className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </div>

                  {/* File Size Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatFileSize(file.size)}
                  </div>
                </div>

                {/* File Info */}
                <div className="p-3">
                  <h3 className="font-body font-body-medium text-text-primary truncate mb-1">
                    {file.filename}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {file.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>{formatDate(file.uploadDate)}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{file.downloads}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {file.tags && file.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {file.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {file.tags.length > 3 && (
                        <span className="text-xs text-text-secondary">
                          +{file.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-surface border border-border rounded-lg p-4 hover:shadow-card transition-smooth cursor-pointer group"
                onClick={() => handleFileClick(file)}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedFiles.some(f => f.id === file.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(file, e.target.checked);
                    }}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                  />
                  
                  <div className="w-12 h-12 bg-background rounded flex items-center justify-center flex-shrink-0">
                    {file.thumbnail ? (
                      <Image
                        src={file.thumbnail}
                        alt={file.filename}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <Icon name="FileImage" size={20} className="text-text-secondary" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-body-medium text-text-primary truncate">
                      {file.filename}
                    </h3>
                    <p className="text-sm text-text-secondary truncate">
                      {file.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-text-secondary">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{formatDate(file.uploadDate)}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={14} />
                      <span>{file.downloads}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(file);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-smooth"
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileGrid;