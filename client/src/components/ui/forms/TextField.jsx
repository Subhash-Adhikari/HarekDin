/**
 * @file TextField.jsx
 * @description Reusable text input component with various styles and validation
 */

import React from 'react';

/**
 * ✅ TextField component - A versatile text input with validation support
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Input name attribute
 * @param {string} props.label - Input label text
 * @param {string} [props.type='text'] - Input type (text, email, password, etc.)
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.value] - Input value
 * @param {Function} props.onChange - Change handler function
 * @param {Function} [props.onBlur] - Blur handler function
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.touched] - Whether the field has been touched
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {boolean} [props.disabled=false] - Whether the field is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Additional props to pass to input element
 */
const TextField = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  // Determine if we should show an error
  const showError = error && touched;
  
  // Generate a unique ID for the input
  const id = `field-${name}`;
  
  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input */}
      <div className="relative">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2 rounded-lg border transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${showError 
              ? 'border-red-500 text-red-500' 
              : 'border-gray-300 text-gray-900'}
          `}
          {...rest}
        />
        
        {/* Error Icon */}
        {showError && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {showError && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextField;