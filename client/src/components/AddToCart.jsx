import React from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const AddToCart = ({ product, showQuantity = true, size = 'normal', variant = 'default' }) => {
  const { cartItems, addToCart, updateCartItem, removeFromCart } = useAppContext();
  const quantity = cartItems[product._id] || 0;

  const handleAddToCart = () => {
    addToCart(product._id);
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity === 0) {
      // Remove from cart if quantity is 0
      updateCartItem(product._id, 0);
    } else {
      // Update quantity
      updateCartItem(product._id, newQuantity);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
  };

  // Button sizes
  const buttonClasses = {
    small: 'px-3 py-1 text-xs',
    normal: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };
  
  // Variants for different UI contexts
  const variants = {
    default: {
      container: '',
      button: `bg-primary hover:bg-primary-dull text-white rounded-md transition`,
      quantityContainer: 'flex items-center border border-gray-300 rounded-md overflow-hidden'
    },
    productCard: {
      container: '',
      button: `flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 ${size === 'small' ? 'md:w-[80px] w-[64px] h-[34px]' : ''} rounded cursor-pointer`,
      quantityContainer: `flex items-center justify-center gap-2 ${size === 'small' ? 'md:w-20 w-16 h-[34px]' : ''} bg-primary/25 rounded select-none`
    }
  };

  return (
    <div className={`${variants[variant].container}`}>
      {quantity > 0 && showQuantity ? (
        variant === 'productCard' ? (
          <div className={variants[variant].quantityContainer}>
            <button
              onClick={handleRemoveFromCart}
              className="cursor-pointer text-md px-2 h-full"
            >
              -
            </button>
            <span className="w-5 text-center">{quantity}</span>
            <button
              onClick={handleAddToCart}
              className="cursor-pointer text-md px-2 h-full"
            >
              +
            </button>
          </div>
        ) : (
          <div className={variants[variant].quantityContainer}>
            <button
              onClick={handleRemoveFromCart}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleUpdateQuantity(parseInt(e.target.value))}
              className="w-12 text-center border-x border-gray-300 py-1"
            />
            
            <button
              onClick={handleAddToCart}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )
      ) : (
        variant === 'productCard' ? (
          <button
            className={variants[variant].button}
            onClick={handleAddToCart}
          >
            <img src={assets.cart_icon} alt="cart_icon" />
            Add
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className={`${variants[variant].button} ${buttonClasses[size]}`}
          >
            Add to Cart
          </button>
        )
      )}
    </div>
  );
};

export default AddToCart;