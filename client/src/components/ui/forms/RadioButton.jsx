/**
 * @file RadioButton.jsx
 * @description Reusable radio button component with custom styling
 */

import React from 'react';

/**
 * ✅ RadioButton component - A styled radio button input
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Input name attribute
 * @param {string} props.id - Input id attribute
 * @param {string} props.label - Radio button label text
 * @param {string} props.value - Radio button value
 * @param {string} props.checkedValue - Currently selected value
 * @param {Function} props.onChange - Change handler function
 * @param {boolean} [props.disabled=false] - Whether the radio button is disabled
 * @param {string} [props.className] - Additional CSS classes
 */
const RadioButton = ({
  name,
  id,
  label,
  value,
  checkedValue,
  onChange,
  disabled = false,
  className = '',
}) => {
  const isChecked = value === checkedValue;
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        {/* Hidden native radio button for accessibility */}
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        
        {/* Custom radio button */}
        <div 
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center
            ${isChecked 
              ? 'border-primary' 
              : 'border-gray-300'}
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer'}
          `}
        >
          {isChecked && (
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
          )}
        </div>
        
        {/* Label */}
        <label 
          htmlFor={id} 
          className={`ml-2 text-sm font-medium ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer'}`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default RadioButton;