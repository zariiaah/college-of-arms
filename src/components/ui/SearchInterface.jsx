import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const SearchInterface = ({ 
  placeholder = "Search...", 
  onSearch, 
  onResultSelect,
  searchType = "general", // "officers", "archive", "general"
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const debounceRef = useRef(null);

  // Mock search results - replace with actual search logic
  const mockResults = {
    officers: [
      { id: 1, type: 'officer', title: 'Sir John Herald', subtitle: 'Chief Herald Officer', path: '/officer-portfolio/1' },
      { id: 2, type: 'officer', title: 'Dame Sarah Ceremonial', subtitle: 'Senior Herald', path: '/officer-portfolio/2' },
      { id: 3, type: 'officer', title: 'Lord Michael Traditions', subtitle: 'Herald Specialist', path: '/officer-portfolio/3' }
    ],
    archive: [
      { id: 1, type: 'svg', title: 'Royal Crown SVG', subtitle: 'Ceremonial Graphics', path: '/archive-browser/svg/1' },
      { id: 2, type: 'document', title: 'Herald Protocols 2024', subtitle: 'Official Documentation', path: '/archive-browser/doc/1' },
      { id: 3, type: 'template', title: 'Certificate Template', subtitle: 'Design Resources', path: '/archive-browser/template/1' }
    ],
    general: [
      { id: 1, type: 'page', title: 'Officers Directory', subtitle: 'Browse all Herald officers', path: '/officers-directory' },
      { id: 2, type: 'page', title: 'Archive Browser', subtitle: 'SVG resources and documents', path: '/archive-browser' },
      { id: 3, type: 'officer', title: 'Sir John Herald', subtitle: 'Chief Herald Officer', path: '/officer-portfolio/1' }
    ]
  };

  // Debounced search function
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length > 0) {
      debounceRef.current = setTimeout(() => {
        performSearch(query);
      }, 300);
    } else {
      setResults([]);
      setIsResultsOpen(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, searchType]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsResultsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Filter mock results based on query and type
    const searchResults = mockResults[searchType] || mockResults.general;
    const filteredResults = searchResults.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults);
    setIsResultsOpen(filteredResults.length > 0);
    setIsLoading(false);
    setSelectedIndex(-1);

    // Call parent search handler if provided
    if (onSearch) {
      onSearch(searchQuery, filteredResults);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsResultsOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    if (!isResultsOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsResultsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultSelect = (result) => {
    setQuery(result.title);
    setIsResultsOpen(false);
    setSelectedIndex(-1);
    
    if (onResultSelect) {
      onResultSelect(result);
    } else {
      // Default navigation
      window.location.href = result.path;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsResultsOpen(false);
    setSelectedIndex(-1);
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'officer': return 'User';
      case 'svg': return 'Image';
      case 'document': return 'FileText';
      case 'template': return 'Layout';
      case 'page': return 'ExternalLink';
      default: return 'Search';
    }
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent/20 text-accent font-body-medium">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <div className="animate-spin">
              <Icon name="Loader2" size={18} className="text-text-secondary" />
            </div>
          ) : (
            <Icon name="Search" size={18} className="text-text-secondary" />
          )}
        </div>
        
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10"
        />
        
        {query && (
          <Button
            variant="ghost"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 px-3"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {isResultsOpen && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevated z-dropdown max-h-80 overflow-y-auto"
        >
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultSelect(result)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth
                    ${index === selectedIndex 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-background'
                    }
                  `}
                >
                  <Icon 
                    name={getResultIcon(result.type)} 
                    size={18} 
                    className={index === selectedIndex ? 'text-primary-foreground' : 'text-text-secondary'} 
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-body font-body-medium truncate ${
                      index === selectedIndex ? 'text-primary-foreground' : 'text-text-primary'
                    }`}>
                      {highlightMatch(result.title, query)}
                    </p>
                    <p className={`text-xs truncate ${
                      index === selectedIndex ? 'text-primary-foreground/80' : 'text-text-secondary'
                    }`}>
                      {result.subtitle}
                    </p>
                  </div>
                  <Icon 
                    name="ArrowUpRight" 
                    size={14} 
                    className={index === selectedIndex ? 'text-primary-foreground/60' : 'text-text-secondary'} 
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Icon name="Search" size={24} className="text-text-secondary mx-auto mb-2" />
              <p className="text-sm text-text-secondary">
                No results found for "{query}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInterface;