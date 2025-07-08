import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectForm = ({ project = null, onSave, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'in-progress',
    progress: 0,
    startDate: '',
    endDate: '',
    category: 'ceremonial',
    priority: 'medium',
    tags: '',
    robloxIntegration: false,
    assets: []
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        status: project.status || 'in-progress',
        progress: project.progress || 0,
        startDate: project.startDate || '',
        endDate: project.endDate || '',
        category: project.category || 'ceremonial',
        priority: project.priority || 'medium',
        tags: project.tags?.join(', ') || '',
        robloxIntegration: project.robloxIntegration || false,
        assets: project.assets || []
      });
    }
  }, [project]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    
    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = 'Progress must be between 0 and 100';
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const projectData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      id: project?.id || Date.now()
    };
    
    onSave(projectData);
    setIsDirty(false);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAssets = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      assets: [...prev.assets, ...newAssets]
    }));
    setIsDirty(true);
  };

  const removeAsset = (assetId) => {
    setFormData(prev => ({
      ...prev,
      assets: prev.assets.filter(asset => asset.id !== assetId)
    }));
    setIsDirty(true);
  };

  const statusOptions = [
    { value: 'planning', label: 'Planning', color: 'text-warning' },
    { value: 'in-progress', label: 'In Progress', color: 'text-accent' },
    { value: 'completed', label: 'Completed', color: 'text-success' },
    { value: 'on-hold', label: 'On Hold', color: 'text-text-secondary' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-error' }
  ];

  const categoryOptions = [
    { value: 'ceremonial', label: 'Ceremonial' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'research', label: 'Research' },
    { value: 'training', label: 'Training' },
    { value: 'community', label: 'Community' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-text-secondary' },
    { value: 'medium', label: 'Medium', color: 'text-accent' },
    { value: 'high', label: 'High', color: 'text-warning' },
    { value: 'urgent', label: 'Urgent', color: 'text-error' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
          {project ? 'Edit Project' : 'Add New Project'}
        </h3>
        {isDirty && (
          <div className="flex items-center space-x-2 text-warning">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-body">Unsaved changes</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Project Title *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter project title"
              className={errors.title ? 'border-error' : ''}
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your project in detail..."
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg bg-surface text-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.description ? 'border-error' : 'border-border'
            }`}
          />
          {errors.description && (
            <p className="text-error text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress */}
        <div>
          <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
            Progress: {formData.progress}%
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => handleInputChange('progress', parseInt(e.target.value))}
              className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer"
            />
            <Input
              type="number"
              value={formData.progress}
              onChange={(e) => handleInputChange('progress', parseInt(e.target.value) || 0)}
              min="0"
              max="100"
              className="w-20"
            />
          </div>
          {errors.progress && (
            <p className="text-error text-sm mt-1">{errors.progress}</p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Start Date
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              End Date
            </label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className={errors.endDate ? 'border-error' : ''}
            />
            {errors.endDate && (
              <p className="text-error text-sm mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
            Tags (comma-separated)
          </label>
          <Input
            type="text"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            placeholder="e.g., heraldry, ceremony, research"
          />
        </div>

        {/* Roblox Integration */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="robloxIntegration"
            checked={formData.robloxIntegration}
            onChange={(e) => handleInputChange('robloxIntegration', e.target.checked)}
            className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
          />
          <label htmlFor="robloxIntegration" className="text-sm font-body text-text-primary">
            Enable Roblox integration for this project
          </label>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
            Project Assets
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-4">
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Icon name="Upload" size={32} className="text-text-secondary mb-2" />
              <p className="text-sm text-text-secondary">
                Click to upload files or drag and drop
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Supports: JPG, PNG, PDF, DOC, DOCX
              </p>
            </label>
          </div>

          {/* Uploaded Files */}
          {formData.assets.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.assets.map(asset => (
                <div key={asset.id} className="flex items-center justify-between p-2 bg-background rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="File" size={16} className="text-text-secondary" />
                    <span className="text-sm font-body text-text-primary">{asset.name}</span>
                    <span className="text-xs text-text-secondary">
                      ({(asset.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => removeAsset(asset.id)}
                    className="text-error hover:bg-error/10"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isLoading}
            disabled={!isDirty}
          >
            {project ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;