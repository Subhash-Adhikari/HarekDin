import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, getCartAmount, removeFromCart } = useAppContext();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    paymentMethod: 'cash'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill all required fields');
      return;
    }

    // Simulate order processing
    setLoading(true);
    
    setTimeout(() => {
      // Clear cart (in a real app, this would happen after successful order creation)
      Object.keys(cartItems).forEach(productId => {
        removeFromCart(productId);
      });
      
      setLoading(false);
      toast.success('Order placed successfully!');
      
      // Redirect to success page or home
      navigate('/');
    }, 1500);
  };

  // Animation variants removed

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6"
    >
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-primary-dark border-b pb-2">Shipping Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-group">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+977 98XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street address, apartment, suite, etc."
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Kathmandu"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1.5">
              Province
            </label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white"
            >
              <option value="">Select Province</option>
              <option value="province1">Province 1</option>
              <option value="province2">Madhesh</option>
              <option value="province3">Bagmati</option>
              <option value="province4">Gandaki</option>
              <option value="province5">Lumbini</option>
              <option value="province6">Karnali</option>
              <option value="province7">Sudurpashchim</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1.5">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              placeholder="44600"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-primary-dark border-b pb-2">Payment Method</h2>
        
        <div className="space-y-4">
          <div className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={handleChange}
              className="h-5 w-5 text-primary focus:ring-primary border-gray-300"
            />
            <label htmlFor="cash" className="ml-3 flex flex-1 justify-between">
              <span className="font-medium text-gray-700">Cash on Delivery</span>
              <span className="text-green-600 text-sm font-medium">Available</span>
            </label>
          </div>
          
          <div className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50 opacity-70 cursor-not-allowed">
            <input
              type="radio"
              id="online"
              name="paymentMethod"
              value="online"
              disabled
              className="h-5 w-5 text-primary focus:ring-primary border-gray-300"
            />
            <label htmlFor="online" className="ml-3 flex flex-1 justify-between">
              <span className="font-medium text-gray-700">Online Payment</span>
              <span className="text-yellow-600 text-sm font-medium">Coming Soon</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => navigate('/cart')}
          className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Back to Cart
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-primary hover:bg-primary-dull text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 flex items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>Place Order - Rs. {getCartAmount()}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;