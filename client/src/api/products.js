import api from './auth';

// Product API calls
export const getProducts = async (category = null) => {
  try {
    const url = category ? `/products/?category=${category}` : '/products/';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch products' };
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch product details' };
  }
};