import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Tag, AlertTriangle, Leaf } from 'lucide-react';
import { api } from '../services/api';
import { NutritionGrade } from '../components/NutritionGrade';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const ProductDetailPage = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!barcode) {
        setError('No product barcode provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const productData = await api.getProductByBarcode(barcode);
        
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [barcode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <ErrorMessage 
            message={error || 'Product not found'} 
            onRetry={() => window.location.reload()}
          />
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
            >
              <ArrowLeft size={16} />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getImageUrl = () => {
    if (product.image_url) return product.image_url;
    if (product.image_small_url) return product.image_small_url;
    return null;
  };

  const imageUrl = getImageUrl();

  const nutritionData = product.nutriments || {};
  const hasNutritionData = Object.keys(nutritionData).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.product_name || 'Product'}
                    className="w-full h-96 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`${imageUrl ? 'hidden' : ''} w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center`}>
                  <Package size={64} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {product.product_name || 'Unknown Product'}
                  </h1>
                  {(product.nutrition_grades || product.nutriscore_grade) && (
                    <NutritionGrade 
                      grade={product.nutrition_grades || product.nutriscore_grade} 
                      size="lg"
                    />
                  )}
                </div>
                
                {product.brands && (
                  <p className="text-lg text-gray-600 mb-2">
                    <Tag size={18} className="inline mr-2" />
                    {product.brands}
                  </p>
                )}

                <p className="text-sm text-gray-500">Barcode: {product.code}</p>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.quantity && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-semibold">{product.quantity}</p>
                  </div>
                )}
                {product.packaging && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Packaging</p>
                    <p className="font-semibold">{product.packaging}</p>
                  </div>
                )}
              </div>

              {/* Categories */}
              {product.categories && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.categories.split(',').slice(0, 6).map((category, index) => (
                      <span
                        key={index}
                        className="inline-block bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full"
                      >
                        {category.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Labels */}
              {product.labels && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Leaf size={20} className="text-green-500" />
                    Labels & Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.labels.split(',').slice(0, 6).map((label, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                      >
                        {label.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ingredients */}
          {product.ingredients_text && (
            <div className="border-t border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
              <p className="text-gray-700 leading-relaxed">{product.ingredients_text}</p>
            </div>
          )}

          {/* Nutrition Information */}
          {hasNutritionData && (
            <div className="border-t border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Facts (per 100g)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nutritionData.energy_100g && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Energy</p>
                    <p className="text-xl font-bold text-blue-600">{nutritionData.energy_100g} kJ</p>
                  </div>
                )}
                {nutritionData.fat_100g !== undefined && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Fat</p>
                    <p className="text-xl font-bold text-red-600">{nutritionData.fat_100g}g</p>
                  </div>
                )}
                {nutritionData.carbohydrates_100g !== undefined && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Carbohydrates</p>
                    <p className="text-xl font-bold text-yellow-600">{nutritionData.carbohydrates_100g}g</p>
                  </div>
                )}
                {nutritionData.proteins_100g !== undefined && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Proteins</p>
                    <p className="text-xl font-bold text-green-600">{nutritionData.proteins_100g}g</p>
                  </div>
                )}
                {nutritionData.salt_100g !== undefined && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Salt</p>
                    <p className="text-xl font-bold text-gray-600">{nutritionData.salt_100g}g</p>
                  </div>
                )}
                {nutritionData.sugars_100g !== undefined && (
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Sugars</p>
                    <p className="text-xl font-bold text-pink-600">{nutritionData.sugars_100g}g</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Allergens & Traces */}
          {(product.allergens || product.traces) && (
            <div className="border-t border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-500" />
                Allergens & Traces
              </h3>
              <div className="space-y-3">
                {product.allergens && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Contains:</p>
                    <p className="text-gray-600">{product.allergens}</p>
                  </div>
                )}
                {product.traces && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">May contain traces of:</p>
                    <p className="text-gray-600">{product.traces}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};