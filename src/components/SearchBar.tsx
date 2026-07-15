import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, ChevronRight, Settings, Cpu, Package } from 'lucide-react';
import { searchSite, SearchResultItem } from '../services/search';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length > 1) {
        const searchRes = await searchSite(query);
        setResults(searchRes);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    const debounce = setTimeout(fetchResults, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (url: string) => {
    navigate(url);
    setQuery('');
    setIsOpen(false);
  };

  const getResultIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'printer':
        return <Settings className="w-4 h-4 text-brand-primary" />;
      case 'material':
        return <Package className="w-4 h-4 text-brand-accent" />;
      case 'application':
        return <Cpu className="w-4 h-4 text-brand-primary" />;
      case 'download':
      default:
        return <FileText className="w-4 h-4 text-text-secondary" />;
    }
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-md z-30">
      {/* Search Input Container */}
      <div className="relative flex items-center bg-bg-base border border-border-primary rounded overflow-hidden focus-within:border-brand-primary/60 transition-all duration-300">
        <div className="pl-3 text-text-muted">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 1 && setIsOpen(true)}
          placeholder="Search materials, printers, documentation..."
          className="w-full bg-transparent border-none text-text-primary text-xs px-3 py-2.5 focus:outline-none placeholder-text-muted"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="pr-3 text-text-muted hover:text-text-primary text-xs cursor-pointer select-none"
          >
            Clear
          </button>
        )}
      </div>

      {/* Suggestion Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1.5 bg-glass border border-border-glass rounded shadow-lg max-h-[300px] overflow-y-auto divide-y divide-border-primary/50 scrollbar-thin">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleResultClick(item.url)}
                className="flex items-center gap-3 p-3 hover:bg-brand-primary/5 cursor-pointer transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  {getResultIcon(item.type)}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-xs font-semibold text-text-primary truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-text-secondary truncate mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-text-muted font-outfit uppercase">
              No matching telemetry found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
