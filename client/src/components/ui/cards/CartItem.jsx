/**
 * @file CartItem.jsx
 * @description Card component for displaying items in the shopping cart
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../../../context/AppContext';

// Import utilities
import { formatCurrency } from '../../../utils/formatters';

/**
 * ✅ CartItem component - Displays cart item with quantity controls
 * 
 * @param {Object} props - Component props
 * @param {Object} props.item - Cart item data
 * @param {string} [props.className] - Additional CSS classes
 */
const CartItem = ({ item, className = '' }) => {
  const { updateCartItemQuantity, removeFromCart, currency } = useAppContext();
  
  if (!item || !item.product) return null;
  
  const { product, quantity } = item;
  const { _id, name, image, offerPrice } = product;
  
  const handleIncreaseQuantity = () => {
    updateCartItemQuantity(_id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      removeFromCart(_id);
    } else {
      updateCartItemQuantity(_id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(_id);
  };
  
  return (
    <motion.div 
      className={`flex items-center p-4 bg-white rounded-lg shadow-sm mb-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <Link to={`/product/${_id}`} className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-contain p-2"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="flex-grow ml-4">
        <Link to={`/product/${_id}`} className="block">
          <h3 className="font-medium text-gray-900">{name}</h3>
        </Link>
        <div className="text-primary font-bold mt-1">
          {formatCurrency(offerPrice, currency)}
        </div>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center">
        <button 
          onClick={handleDecreaseQuantity}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Decrease quantity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
        
        <span className="mx-3 font-medium w-5 text-center">{quantity}</span>
        
        <button 
          onClick={handleIncreaseQuantity}
          className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dull transition-colors"
          aria-label="Increase quantity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Total Price */}
      <div className="ml-6 text-right">
        <div className="font-bold text-gray-900">
          {formatCurrency(offerPrice * quantity, currency)}
        </div>
        
        {/* Remove Button */}
        <button 
          onClick={handleRemove}
          className="text-xs text-red-500 hover:text-red-700 mt-1 transition-colors"
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;