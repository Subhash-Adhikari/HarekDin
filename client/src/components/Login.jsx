import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LoginSignup = () => {
  const { setShowUserLogin,setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Check if email and password are provided
    if (email && password) {
      // Set user data in localStorage for persistence
      const userData = {
        email: email,
        name: isLogin ? email.split('@')[0] : name // Use name if provided, otherwise use email username
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setShowUserLogin(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={() => setShowUserLogin(false)}
    >
      <form 
        className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md text-sm text-gray-600"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
      >
        <h2 className="text-2xl md:text-3xl text-gray-900 font-semibold text-center">
          {isLogin ? "Sign in" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-500 mt-1 text-center">
          {isLogin ? "Welcome back! Please login." : "Create a new account."}
        </p>

        {/* Name field only for Sign Up */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="mt-5 w-full h-11 px-4 rounded-full border border-gray-300 text-sm outline-primary"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="mt-5 w-full h-11 px-4 rounded-full border border-gray-300 text-sm outline-primary"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full h-11 px-4 rounded-full border border-gray-300 text-sm outline-primary"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login or Signup Button */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-primary hover:bg-primary-dull transition"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {/* Toggle Option */}
        <p className="text-gray-500 text-sm mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
