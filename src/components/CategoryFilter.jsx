import React from 'react';
import { Filter } from 'lucide-react';

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isLoading
}) => {
  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Filter size={16} className="inline mr-2" />
        Filter by Category
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        disabled={isLoading}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white disabled:opacity-50"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
          </option>
        ))}
      </select>
    </div>
  );
};