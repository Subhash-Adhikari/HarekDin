/**
 * @file Checkout.jsx
 * @description Checkout page for completing orders
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

// Import components
import PageContainer from '../components/layout/PageContainer';
import SectionTitle from '../components/ui/SectionTitle';
import CheckoutForm from '../components/ui/forms/CheckoutForm';

// Import utilities
import { formatCurrency } from '../utils/formatters';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, products, getCartAmount, currency, clearCart } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate order totals
  const subtotal = getCartAmount();
  const deliveryFee = 5; // Fixed delivery fee
  const total = subtotal + deliveryFee;
  
  // Redirect if cart is empty
  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      toast.info('Your cart is empty');
      navigate('/');
    }
  }, [cartItems, navigate]);
  
  // If cart is empty (for immediate check before useEffect runs)
  if (Object.keys(cartItems).length === 0) {
    return (
      <PageContainer>
        <div className="py-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="mb-6 text-gray-600">Add some products to your cart before checking out.</p>
          <button 
            onClick={() => navigate('/products')} 
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dull transition"
          >
            Browse Products
          </button>
        </div>
      </PageContainer>
    );
  }

  // Handle checkout form submission
  const handleCheckout = (formData) => {
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create order object
      const order = {
        items: cartProducts,
        shipping: {
          ...formData,
          address: formData.address || '',
          isAddressEditable: true
        },
        payment: {
          method: formData.paymentMethod,
          status: 'pending'
        },
        subtotal,
        deliveryFee,
        total,
        status: 'processing',
        orderId: `ORD-${Date.now()}`,
        date: new Date().toISOString()
      };
      
      // Log order for demonstration
      console.log('Order placed:', order);
      
      // Clear cart and show success message
      clearCart();
      toast.success('Order placed successfully!');
      
      // Redirect to home page
      navigate('/');
      
      setIsProcessing(false);
    }, 2000);
  };

  // Calculate cart items for display
  const cartProducts = Object.keys(cartItems).map(itemId => {
    const product = products.find(p => p._id === itemId);
    return {
      ...product,
      quantity: cartItems[itemId],
      totalPrice: product.offerPrice * cartItems[itemId]
    };
  });

  return (
    <div className="py-8">
      <PageContainer>
        <SectionTitle 
          title="Checkout" 
          subtitle="Complete your order"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
              <CheckoutForm 
                onSubmit={handleCheckout} 
                isProcessing={isProcessing} 
              />
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-4">
                {cartProducts.map(item => (
                  <div key={item._id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} × {formatCurrency(item.offerPrice, currency)}</p>
                    </div>
                    <p className="font-medium">{formatCurrency(item.totalPrice, currency)}</p>
                  </div>
                ))}
              </div>
              
              {/* Order Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal, currency)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">{formatCurrency(deliveryFee, currency)}</span>
                </div>
                
                <div className="flex justify-between text-base font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Checkout;