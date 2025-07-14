/**
 * @file WishlistButton.jsx
 * @description Button component for adding/removing products from wishlist
 */

import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { motion } from 'framer-motion';

/**
 * ✅ WishlistButton component - Toggles products in the wishlist
 * 
 * @param {Object} props - Component props
 * @param {string} props.productId - ID of the product to toggle in wishlist
 * @param {string} [props.size='small'] - Button size (small, medium, large)
 * @param {string} [props.className] - Additional CSS classes
 */
const WishlistButton = ({ productId, size = 'small', className = '' }) => {
  const { toggleWishlist, isInWishlist } = useAppContext();
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const isWishlisted = isInWishlist(productId);
  
  // Define sizes for the button
  const sizeClasses = {
    small: 'w-7 h-7',
    medium: 'w-9 h-9',
    large: 'w-11 h-11'
  };

  // Define sizes for the icon
  const iconSizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  return (
    <motion.button 
      onClick={handleToggleWishlist}
      className={`${sizeClasses[size]} ${className} flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      {isWishlisted ? (
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="#e53e3e" 
          className={iconSizeClasses[size]}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </motion.svg>
      ) : (
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className={iconSizeClasses[size]}
          whileHover={{ scale: 1.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </motion.svg>
      )}
    </motion.button>
  );
};

export default WishlistButton;