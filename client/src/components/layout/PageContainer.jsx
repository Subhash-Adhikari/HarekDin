/**
 * @file PageContainer.jsx
 * @description Container component for consistent page layout
 */

import React from 'react';

/**
 * ✅ PageContainer component - Provides consistent padding and max-width for pages
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.narrow=false] - Whether to use a narrower max-width
 */
const PageContainer = ({ children, className = '', narrow = false }) => {
  return (
    <div 
      className={`
        px-4 sm:px-6 lg:px-8 mx-auto w-full
        ${narrow ? 'max-w-4xl' : 'max-w-7xl'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default PageContainer;