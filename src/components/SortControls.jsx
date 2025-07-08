import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const SortControls = ({
  sortBy,
  onSortChange,
  isLoading
}) => {
  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <ArrowUpDown size={16} className="inline mr-2" />
        Sort by
      </label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        disabled={isLoading}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white disabled:opacity-50"
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="grade-asc">Nutrition Grade (A-E)</option>
        <option value="grade-desc">Nutrition Grade (E-A)</option>
      </select>
    </div>
  );
};