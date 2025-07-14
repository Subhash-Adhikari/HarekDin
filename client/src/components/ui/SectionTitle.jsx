/**
 * @file SectionTitle.jsx
 * @description Component for consistent section headings
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ✅ SectionTitle component - Displays a section heading with optional link
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The section title text
 * @param {string} [props.subtitle] - Optional subtitle text
 * @param {string} [props.linkText] - Text for the optional link
 * @param {string} [props.linkUrl] - URL for the optional link
 * @param {string} [props.className] - Additional CSS classes
 */
const SectionTitle = ({ 
  title, 
  subtitle, 
  linkText, 
  linkUrl, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between mb-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      
      {linkText && linkUrl && (
        <Link 
          to={linkUrl}
          className="mt-2 sm:mt-0 text-primary hover:text-primary-dull font-medium text-sm flex items-center transition-colors duration-200"
        >
          {linkText}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;