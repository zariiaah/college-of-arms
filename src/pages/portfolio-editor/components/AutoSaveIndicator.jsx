import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ isDirty, lastSaved, onSave, autoSaveInterval = 30000 }) => {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error', 'dirty'
  const [countdown, setCountdown] = useState(autoSaveInterval / 1000);

  useEffect(() => {
    if (isDirty) {
      setSaveStatus('dirty');
      setCountdown(autoSaveInterval / 1000);
    } else {
      setSaveStatus('saved');
    }
  }, [isDirty, autoSaveInterval]);

  useEffect(() => {
    let interval;
    let countdownInterval;

    if (isDirty && saveStatus === 'dirty') {
      // Start countdown
      countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Auto-save after interval
      interval = setTimeout(async () => {
        setSaveStatus('saving');
        try {
          await onSave();
          setSaveStatus('saved');
        } catch (error) {
          setSaveStatus('error');
          console.error('Auto-save failed:', error);
        }
      }, autoSaveInterval);
    }

    return () => {
      if (interval) clearTimeout(interval);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [isDirty, saveStatus, onSave, autoSaveInterval]);

  const getStatusConfig = () => {
    switch (saveStatus) {
      case 'saving':
        return {
          icon: 'Loader2',
          text: 'Saving...',
          color: 'text-accent',
          animate: 'animate-spin'
        };
      case 'saved':
        return {
          icon: 'Check',
          text: lastSaved ? `Saved ${formatLastSaved(lastSaved)}` : 'All changes saved',
          color: 'text-success',
          animate: ''
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          text: 'Save failed',
          color: 'text-error',
          animate: ''
        };
      case 'dirty':
        return {
          icon: 'Clock',
          text: `Auto-save in ${countdown}s`,
          color: 'text-warning',
          animate: ''
        };
      default:
        return {
          icon: 'Save',
          text: 'Ready to save',
          color: 'text-text-secondary',
          animate: ''
        };
    }
  };

  const formatLastSaved = (timestamp) => {
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInSeconds = Math.floor((now - saved) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else {
      return saved.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const handleManualSave = async () => {
    if (saveStatus === 'saving' || !isDirty) return;

    setSaveStatus('saving');
    try {
      await onSave();
      setSaveStatus('saved');
    } catch (error) {
      setSaveStatus('error');
      console.error('Manual save failed:', error);
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center space-x-3 px-4 py-2 bg-surface border border-border rounded-lg">
      <div className="flex items-center space-x-2">
        <Icon 
          name={config.icon} 
          size={16} 
          className={`${config.color} ${config.animate}`} 
        />
        <span className={`text-sm font-body ${config.color}`}>
          {config.text}
        </span>
      </div>

      {/* Manual Save Button */}
      {(saveStatus === 'dirty' || saveStatus === 'error') && (
        <button
          onClick={handleManualSave}
          disabled={saveStatus === 'saving'}
          className="text-sm text-primary hover:text-primary/80 font-body font-body-medium transition-smooth disabled:opacity-50"
        >
          Save now
        </button>
      )}

      {/* Progress Bar for Auto-save Countdown */}
      {saveStatus === 'dirty' && (
        <div className="w-16 h-1 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-warning transition-all duration-1000 ease-linear"
            style={{ 
              width: `${((autoSaveInterval / 1000 - countdown) / (autoSaveInterval / 1000)) * 100}%` 
            }}
          ></div>
        </div>
      )}

      {/* Version History Indicator */}
      {lastSaved && (
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="History" size={12} />
          <span>v{Math.floor(Date.now() / 1000) % 1000}</span>
        </div>
      )}
    </div>
  );
};

export default AutoSaveIndicator;