/**
 * @file CheckoutForm.jsx
 * @description Form component for the checkout process
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import components
import TextField from './TextField';
import RadioButton from './RadioButton';
import Button from '../buttons/Button';

// Import hooks and utilities
import useForm from '../../../hooks/useForm';
import { validateCheckoutForm } from '../../../utils/validation';

/**
 * ✅ CheckoutForm component - Handles checkout form submission
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to call on successful form submission
 * @param {boolean} [props.isProcessing=false] - Whether the form is processing
 * @param {string} [props.className] - Additional CSS classes
 */
const CheckoutForm = ({ onSubmit, isProcessing = false, className = '' }) => {
  const navigate = useNavigate();
  
  // Initialize form with useForm hook
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    validateForm 
  } = useForm(
    {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      paymentMethod: 'cod'
    },
    validateCheckoutForm
  );
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    // Call onSubmit with form values
    onSubmit(values);
  };
  
  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <TextField
          name="fullName"
          label="Full Name"
          value={values.fullName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          touched={touched.fullName}
          placeholder="John Doe"
          required
        />
        
        {/* Email */}
        <TextField
          name="email"
          label="Email Address"
          type="email"
          value={values.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          placeholder="john@example.com"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <TextField
          name="phone"
          label="Phone Number"
          type="tel"
          value={values.phone || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
          placeholder="+1 (555) 123-4567"
          required
        />
        
        {/* City */}
        <TextField
          name="city"
          label="City"
          value={values.city || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.city}
          touched={touched.city}
          placeholder="New York"
          required
        />
      </div>
      
      {/* Address - Editable with clear instructions */}
      <div className="relative">
        <TextField
          name="address"
          label="Delivery Address"
          value={values.address || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address}
          touched={touched.address}
          placeholder="123 Main St, Apt 4B"
          required
        />
        <p className="text-xs text-gray-500 mt-1 italic">You can edit your delivery address before placing the order</p>
      </div>
      
      {/* Payment Method */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method <span className="text-red-500">*</span>
        </label>
        
        <div className="space-y-2">
          <RadioButton
            name="paymentMethod"
            id="payment-cod"
            label="Cash on Delivery"
            value="cod"
            checkedValue={values.paymentMethod}
            onChange={handleChange}
          />
          
          {/* Additional payment methods can be added here */}
        </div>
        
        {errors.paymentMethod && touched.paymentMethod && (
          <p className="mt-1 text-sm text-red-500">{errors.paymentMethod}</p>
        )}
      </div>
      
      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="large"
          isLoading={isProcessing}
          disabled={isProcessing}
        >
          Place Order
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;