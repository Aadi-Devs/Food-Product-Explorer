import React from 'react';

export const NutritionGrade = ({ grade, size = 'md' }) => {
  if (!grade) return null;

  const normalizedGrade = grade.toUpperCase();
  
  const gradeColors = {
    A: 'bg-green-500 text-white',
    B: 'bg-lime-500 text-white',
    C: 'bg-yellow-500 text-gray-900',
    D: 'bg-orange-500 text-white',
    E: 'bg-red-500 text-white'
  };

  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const colorClass = gradeColors[normalizedGrade] || 'bg-gray-400 text-white';
  const sizeClass = sizes[size];

  return (
    <div className={`${colorClass} ${sizeClass} rounded-full flex items-center justify-center font-bold`}>
      {normalizedGrade}
    </div>
  );
};