/**
 * @file formatters.js
 * @description Utility functions for formatting data in the application
 */

/**
 * Formats a number as currency with the given currency symbol
 * @param {number} amount - The amount to format
 * @param {string} currencySymbol - The currency symbol to use
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currencySymbol = 'Rs') => {
  if (typeof amount !== 'number') return `${currencySymbol}0.00`;
  return `${currencySymbol}${amount.toFixed(2)}`;
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Calculates discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} Discount percentage
 */
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) return 0;
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};