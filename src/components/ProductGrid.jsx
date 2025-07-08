import React from 'react';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from './LoadingSpinner';

export const ProductGrid = ({
  products,
  isLoading,
  onLoadMore,
  hasMore
}) => {
  if (products.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2" />
          </svg>
        </div>
        <p className="text-gray-600 text-lg">No products found</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.code} product={product} />
        ))}
      </div>

      {/* Load More Section */}
      {(hasMore || isLoading) && (
        <div className="flex justify-center py-8">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <LoadingSpinner size="md" />
              <span className="text-gray-600">Loading products...</span>
            </div>
          ) : hasMore ? (
            <button
              onClick={onLoadMore}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Load More Products
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};