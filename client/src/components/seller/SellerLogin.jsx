import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/appContext';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (email && password) {
      setIsSeller(true);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center text-sm text-gray-600"
    >
      <div className="flex flex-col gap-5 items-start p-8 py-12 min-w-80 sm:min-w-96 rounded-lg shadow-xl border border-gray-200">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">Seller</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>
      </div>
    </form>
  );
};

export default SellerLogin;
