/**
 * @file AddToCart.jsx
 * @description Button component for adding products to cart with quantity controls
 */

import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { motion } from 'framer-motion';

/**
 * ✅ AddToCart component - Handles adding products to cart with quantity controls
 * 
 * @param {Object} props - Component props
 * @param {Object} props.product - Product to add to cart
 * @param {string} [props.variant='default'] - Button style variant (default, compact, icon)
 * @param {string} [props.size='medium'] - Button size (small, medium, large)
 * @param {string} [props.className] - Additional CSS classes
 */
const AddToCart = ({ product, variant = 'default', size = 'medium', className = '' }) => {
  const { addToCart, updateCartItemQuantity, removeFromCart, getCartItemById } = useAppContext();
  
  const cartItem = getCartItemById(product._id);
  const isInCart = !!cartItem;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleIncreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateCartItemQuantity(product._id, cartItem.quantity + 1);
  };
  
  const handleDecreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem.quantity === 1) {
      removeFromCart(product._id);
    } else {
      updateCartItemQuantity(product._id, cartItem.quantity - 1);
    }
  };
  
  // Size classes for the main button
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };
  
  // Size classes for quantity controls
  const quantitySizeClasses = {
    small: 'h-6 w-6 text-xs',
    medium: 'h-8 w-8 text-sm',
    large: 'h-10 w-10 text-base'
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-primary text-white hover:bg-primary-dull',
    compact: 'bg-white border border-primary text-primary hover:bg-primary hover:text-white',
    icon: 'bg-white shadow-md hover:shadow-lg'
  };
  
  // Render quantity controls if item is in cart
  if (isInCart) {
    return (
      <div className={`flex items-center ${className}`}>
        <motion.button
          onClick={handleDecreaseQuantity}
          className={`${quantitySizeClasses[size]} rounded-full bg-gray-100 flex items-center justify-center`}
          whileTap={{ scale: 0.9 }}
          aria-label="Decrease quantity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        <span className={`mx-2 font-medium ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}`}>
          {cartItem.quantity}
        </span>
        
        <motion.button
          onClick={handleIncreaseQuantity}
          className={`${quantitySizeClasses[size]} rounded-full bg-primary text-white flex items-center justify-center`}
          whileTap={{ scale: 0.9 }}
          aria-label="Increase quantity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    );
  }
  
  // Render appropriate button based on variant
  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleAddToCart}
        className={`${quantitySizeClasses[size]} ${variantClasses[variant]} rounded-full flex items-center justify-center ${className}`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Add to cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
          <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
        </svg>
      </motion.button>
    );
  }
  
  return (
    <motion.button
      onClick={handleAddToCart}
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full font-medium transition-colors duration-300 ${className}`}
      whileTap={{ scale: 0.95 }}
      aria-label="Add to cart"
    >
      {variant === 'compact' ? 'Add' : 'Add to Cart'}
    </motion.button>
  );
};

export default AddToCart;