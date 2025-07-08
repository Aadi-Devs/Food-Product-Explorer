import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Tag } from 'lucide-react';
import { NutritionGrade } from './NutritionGrade';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.code}`);
  };

  const getImageUrl = () => {
    if (product.image_small_url) return product.image_small_url;
    if (product.image_url) return product.image_url;
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
    >
      <div className="aspect-w-4 aspect-h-3 relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.product_name || 'Product'}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`${imageUrl ? 'hidden' : ''} w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center`}>
          <Package size={48} className="text-gray-400" />
        </div>
        
        {/* Nutrition Grade Overlay */}
        {(product.nutrition_grades || product.nutriscore_grade) && (
          <div className="absolute top-2 right-2">
            <NutritionGrade 
              grade={product.nutrition_grades || product.nutriscore_grade} 
              size="md"
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.product_name || 'Unknown Product'}
        </h3>

        {product.brands && (
          <p className="text-sm text-gray-600 mb-2">
            <Tag size={14} className="inline mr-1" />
            {product.brands}
          </p>
        )}

        {product.categories && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 line-clamp-2">
              {product.categories.split(',').slice(0, 3).join(', ')}
            </p>
          </div>
        )}

        {product.quantity && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-medium text-gray-900">{product.quantity}</span>
          </div>
        )}
      </div>
    </div>
  );
};