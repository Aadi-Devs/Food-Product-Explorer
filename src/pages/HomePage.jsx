import React, { useState, useEffect, useCallback } from 'react';
import { Package } from 'lucide-react';
import { api } from '../services/api';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortControls } from '../components/SortControls';
import { ProductGrid } from '../components/ProductGrid';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Loading categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await api.getCategories();
        setCategories(categoryList);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    loadCategories();
  }, []);

  // Sorting products
  const sortProducts = useCallback((productsToSort, sortOption) => {
    return [...productsToSort].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return (a.product_name || '').localeCompare(b.product_name || '');
        case 'name-desc':
          return (b.product_name || '').localeCompare(a.product_name || '');
        case 'grade-asc':
          return (a.nutrition_grades || a.nutriscore_grade || 'Z').localeCompare(
            b.nutrition_grades || b.nutriscore_grade || 'Z'
          );
        case 'grade-desc':
          return (b.nutrition_grades || b.nutriscore_grade || 'A').localeCompare(
            a.nutrition_grades || a.nutriscore_grade || 'A'
          );
        default:
          return 0;
      }
    });
  }, []);

  // Loading products
  const loadProducts = useCallback(async (page = 1, append = false) => {
    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      let response;

      if (searchQuery && searchType === 'barcode') {
        // Handle barcode search - single product
        const product = await api.getProductByBarcode(searchQuery);
        if (product) {
          const sortedProducts = sortProducts([product], sortBy);
          setProducts(sortedProducts);
          setHasMore(false);
        } else {
          setProducts([]);
          setHasMore(false);
          setError('Product not found with this barcode');
        }
        return;
      } else if (searchQuery) {
        // Handle name search
        response = await api.searchProducts(searchQuery, page);
      } else if (selectedCategory) {
        // Handle category filter
        response = await api.getProductsByCategory(selectedCategory, page);
      } else {
        // Handle general product listing
        response = await api.getProducts(page);
      }

      if (response && response.products) {
        const validProducts = response.products.filter(p => p.product_name && p.product_name.trim());
        const sortedProducts = sortProducts(validProducts, sortBy);
        
        if (append && page > 1) {
          setProducts(prev => sortProducts([...prev, ...sortedProducts], sortBy));
        } else {
          setProducts(sortedProducts);
        }

        // Check if there are more pages
        setHasMore(page < (response.page_count || 1));
      } else {
        if (!append) setProducts([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
      if (!append) setProducts([]);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [searchQuery, searchType, selectedCategory, sortBy, sortProducts]);

  // Loading more products
  const loadMore = () => {
    if (hasMore && !isLoadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadProducts(nextPage, true);
    }
  };

  // Handling search
  const handleSearch = (query, type) => {
    setSearchQuery(query);
    setSearchType(type);
    setCurrentPage(1);
    setSelectedCategory(''); // Clear category filter when searching
  };

  // Handling category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery(''); // Clear search when filtering by category
  };

  // Handling sort change
  const handleSortChange = (sort) => {
    setSortBy(sort);
    setProducts(prev => sortProducts(prev, sort));
  };

  // Loading products when dependencies change
  useEffect(() => {
    setCurrentPage(1);
    loadProducts(1, false);
  }, [loadProducts]);

  // Handling retry
  const handleRetry = () => {
    setCurrentPage(1);
    loadProducts(1, false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center mb-6">
            <Package size={32} className="text-emerald-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Food Product Explorer</h1>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            isLoading={isLoading}
          />
          <SortControls
            sortBy={sortBy}
            onSortChange={handleSortChange}
            isLoading={isLoading}
          />
        </div>

        {/* Results */}
        {error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        ) : (
          <ProductGrid
            products={products}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoadingMore}
          />
        )}
      </div>
    </div>
  );
};