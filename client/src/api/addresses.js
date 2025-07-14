import api from './auth';

// Address API calls
export const getAddresses = async () => {
  try {
    const response = await api.get('/addresses/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch addresses' };
  }
};

export const createAddress = async (addressData) => {
  try {
    const response = await api.post('/addresses/', addressData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create address' };
  }
};

export const updateAddress = async (addressId, addressData) => {
  try {
    const response = await api.put(`/addresses/${addressId}/`, addressData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update address' };
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const response = await api.delete(`/addresses/${addressId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete address' };
  }
};