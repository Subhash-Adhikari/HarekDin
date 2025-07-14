/**
 * @file Button.jsx
 * @description Reusable button component with various styles and sizes
 */

import React from 'react';

/**
 * ✅ Button component - A versatile button with multiple variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button style variant (primary, secondary, outline, text)
 * @param {string} [props.size='medium'] - Button size (small, medium, large)
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * @param {boolean} [props.isLoading=false] - Whether button is in loading state
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Additional props to pass to button element
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  children,
  onClick,
  className = '',
  ...rest
}) => {
  // Base classes for all buttons
  const baseClasses = 'font-medium rounded-full transition-all duration-300 flex items-center justify-center';
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dull',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    text: 'bg-transparent text-primary hover:bg-primary/10'
  };
  
  // Size-specific classes
  const sizeClasses = {
    small: 'text-sm px-4 py-1.5',
    medium: 'px-6 py-2',
    large: 'text-lg px-8 py-3'
  };
  
  // Disabled and loading states
  const stateClasses = disabled || isLoading 
    ? 'opacity-70 cursor-not-allowed' 
    : 'cursor-pointer';
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${stateClasses} ${widthClass} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
};

export default Button;