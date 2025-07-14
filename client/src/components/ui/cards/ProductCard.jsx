/**
 * @file ProductCard.jsx
 * @description Card component for displaying product information
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import components
import WishlistButton from '../buttons/WishlistButton';
import AddToCart from '../buttons/AddToCart';

// Import utilities
import { formatCurrency, calculateDiscountPercentage, truncateText } from '../../../utils/formatters';

/**
 * ✅ ProductCard component - Displays product information in a card format
 * 
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data to display
 * @param {boolean} [props.showBadge=false] - Whether to show a badge (e.g., "Top 1")
 * @param {number} [props.badgeNumber] - Number to display on the badge
 * @param {string} [props.className] - Additional CSS classes
 */
const ProductCard = ({ product, showBadge = false, badgeNumber, className = '' }) => {
  if (!product) return null;
  
  const {
    _id,
    name,
    category,
    image,
    price,
    offerPrice,
    rating
  } = product;
  
  const discountPercentage = calculateDiscountPercentage(price, offerPrice);
  
  return (
    <motion.div 
      className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${_id}`} className="block h-full">
        {/* Product Image with Badges */}
        <div className="relative pt-[100%] bg-gray-100">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="absolute inset-0 w-full h-full object-contain p-4"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discountPercentage}% OFF
            </div>
          )}
          
          {/* Top Seller Badge */}
          {showBadge && badgeNumber && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
              Top {badgeNumber}
            </div>
          )}
          
          {/* Wishlist Button */}
          <div className="absolute bottom-2 right-2">
            <WishlistButton productId={_id} size="small" />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <div className="text-xs text-gray-500 mb-1">{category}</div>
          
          {/* Product Name */}
          <h3 className="font-medium text-gray-900 mb-1">{truncateText(name, 40)}</h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={i < Math.floor(rating) ? '#FBBF24' : '#E5E7EB'} 
                className="w-4 h-4"
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-900">{formatCurrency(offerPrice)}</span>
              {discountPercentage > 0 && (
                <span className="text-xs text-gray-500 line-through ml-2">{formatCurrency(price)}</span>
              )}
            </div>
            
            {/* Add to Cart Button */}
            <AddToCart product={product} variant="icon" size="small" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;