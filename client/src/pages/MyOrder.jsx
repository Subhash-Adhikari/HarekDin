import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext(); // Fetch currency from the app context

  const fetchMyOrders = () => {
    // Fetch orders and set state to dummyOrders for now
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []); // Fetch orders once when component mounts

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      
      {/* Map through orders and display order details */}
      {myOrders.length > 0 ? (
        myOrders.map((order, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 mb-10 py-5 max-w-4xl">
            <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
              <span>Order ID: <span className="font-semibold">{order._id || 'N/A'}</span></span>
              <span>Payment: <span className="font-semibold">{order._paymentType || 'N/A'}</span></span>
              <span>Total Amount: <span className="font-semibold">{currency}{order.amount || '0.00'}</span></span>
            </p>

            {/* Display status and other optional details */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">Order Status: <span className="font-semibold">{order.status || 'N/A'}</span></p>
              <p className="text-sm text-gray-600">Placed On: <span className="font-semibold">{order.date || 'N/A'}</span></p>
              {order.items.map((item, index)=>(
                <div key={index} className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 &&
                    "border-b"} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl
                }`}>
                    <div className='flex items-center mb-4 md:mb-0'>
                        <div className='bg-primary/10 p-4 rounded-lg'>
                            <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                            <div>
                                <h2 className='text-xl font-medium text-gray-800'>{item.product.name}
                                </h2>
                                <p>Category : {item.product.category}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                        <p>Quantity :{item.quantity || "1"}</p>
                        <p>Status :{order.status}</p>
                        <p>Date :{new Date (order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className='text-primary text-lg font-medium'>
                    Amount : {currency}{item.product.price * item.quantity}
                    </p>
                   
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrder;
