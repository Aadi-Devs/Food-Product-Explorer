import React, { useState } from 'react';
import { Search, Scan } from 'lucide-react';

export const SearchBar = ({ onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), searchType);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex">
          {/* Search Type Toggle */}
          <div className="flex bg-white rounded-l-lg border border-r-0 border-gray-300 overflow-hidden">
            <button
              type="button"
              onClick={() => setSearchType('name')}
              className={`px-4 py-3 flex items-center gap-2 text-sm font-medium transition-colors ${
                searchType === 'name'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Search size={16} />
              Name
            </button>
            <button
              type="button"
              onClick={() => setSearchType('barcode')}
              className={`px-4 py-3 flex items-center gap-2 text-sm font-medium transition-colors ${
                searchType === 'barcode'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Scan size={16} />
              Barcode
            </button>
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchType === 'name' 
                ? 'Search for food products...' 
                : 'Enter product barcode...'
            }
            className="flex-1 px-4 py-3 border border-l-0 border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            disabled={isLoading}
          />

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="px-6 py-3 bg-emerald-500 text-white rounded-r-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Search size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};