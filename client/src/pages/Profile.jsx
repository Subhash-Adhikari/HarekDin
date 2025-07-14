import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import PageContainer from '../components/layout/PageContainer';
import SectionTitle from '../components/ui/SectionTitle';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Dummy orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1234567',
      date: '2023-05-15',
      status: 'Delivered',
      total: 1250,
      items: [
        { name: 'Fresh Apples', quantity: 2, price: 250 },
        { name: 'Organic Milk', quantity: 1, price: 120 },
        { name: 'Whole Wheat Bread', quantity: 1, price: 80 }
      ]
    },
    {
      id: 'ORD-7654321',
      date: '2023-05-02',
      status: 'Processing',
      total: 850,
      items: [
        { name: 'Basmati Rice', quantity: 1, price: 450 },
        { name: 'Fresh Tomatoes', quantity: 2, price: 200 }
      ]
    }
  ]);

  // User details (using dummy data if not available)
  const [userDetails, setUserDetails] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 234 567 8900',
    address: user?.address || '123 Main St, Anytown, USA'
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <PageContainer>
      <div className="py-8">
        <SectionTitle title="My Profile" subtitle="Manage your account" />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-primary text-white text-center">
                <div className="w-20 h-20 rounded-full bg-white text-primary mx-auto flex items-center justify-center text-2xl font-bold">
                  {userDetails.name.charAt(0)}
                </div>
                <h3 className="mt-4 font-medium text-lg">{userDetails.name}</h3>
                <p className="text-sm opacity-80">{userDetails.email}</p>
              </div>
              
              <div className="p-4">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-md mb-2 ${activeTab === 'orders' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-100'}`}
                >
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`w-full text-left px-4 py-2 rounded-md mb-2 ${activeTab === 'details' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-100'}`}
                >
                  Personal Details
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">My Orders</h3>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <button
                        onClick={() => navigate('/products')}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dull transition"
                      >
                        Browse Products
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {order.status}
                              </span>
                              <p className="font-medium">₹{order.total}</p>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-medium mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <p>{item.name} × {item.quantity}</p>
                                  <p>₹{item.price}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={userDetails.name}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={userDetails.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={userDetails.phone}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        value={userDetails.address}
                        readOnly
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;