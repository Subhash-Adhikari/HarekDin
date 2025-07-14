/**
 * @file api.js
 * @description Utility functions for API requests
 */

// Base URL for API requests
const API_BASE_URL = '/api';

/**
 * Makes a fetch request with standard options
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} Fetch promise
 */
const fetchWithOptions = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
    
    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An unknown error occurred',
      }));
      
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    // Check if response is empty
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * API request methods
 */
export const api = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Fetch promise
   */
  get: (endpoint, options = {}) => {
    return fetchWithOptions(endpoint, {
      method: 'GET',
      ...options,
    });
  },

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Fetch promise
   */
  post: (endpoint, data, options = {}) => {
    return fetchWithOptions(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Fetch promise
   */
  put: (endpoint, data, options = {}) => {
    return fetchWithOptions(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Fetch promise
   */
  delete: (endpoint, options = {}) => {
    return fetchWithOptions(endpoint, {
      method: 'DELETE',
      ...options,
    });
  },
};