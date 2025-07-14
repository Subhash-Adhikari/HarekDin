/**
 * @file validation.js
 * @description Utility functions for form validation
 */

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a phone number (basic validation)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
  // Allow digits, spaces, dashes, parentheses, and plus sign
  const phoneRegex = /^[\d\s\-()+]+$/;
  return phoneRegex.test(phone) && phone.replace(/[\s\-()+]/g, '').length >= 10;
};

/**
 * Validates checkout form fields
 * @param {Object} values - Form values to validate
 * @returns {Object} Validation errors
 */
export const validateCheckoutForm = (values) => {
  const errors = {};
  
  // Full Name validation
  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  } else if (values.fullName.length < 3) {
    errors.fullName = 'Full name must be at least 3 characters';
  }
  
  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Address validation
  if (!values.address) {
    errors.address = 'Address is required';
  } else if (values.address.length < 5) {
    errors.address = 'Please enter a complete address';
  }
  
  // City validation
  if (!values.city) {
    errors.city = 'City is required';
  }
  
  // Payment method validation
  if (!values.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method';
  }
  
  return errors;
};

/**
 * Validates login form fields
 * @param {Object} values - Form values to validate
 * @returns {Object} Validation errors
 */
export const validateLoginForm = (values) => {
  const errors = {};
  
  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return errors;
};

/**
 * Validates registration form fields
 * @param {Object} values - Form values to validate
 * @returns {Object} Validation errors
 */
export const validateRegistrationForm = (values) => {
  const errors = {};
  
  // Name validation
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }
  
  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  // Confirm password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};