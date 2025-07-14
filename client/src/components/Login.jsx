import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { login, register } from '../api/auth';
import toast from 'react-hot-toast';

const LoginSignup = () => {
  const { setShowUserLogin,setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        // Handle login
        if (email && password) {
          const data = await login({ email, password });
          localStorage.setItem('tokens', JSON.stringify({
            access: data.access,
            refresh: data.refresh
          }));
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          toast.success('Login successful!');
          setShowUserLogin(false);
        }
      } else {
        // Handle registration
        if (name && email && password) {
          const data = await register({ name, email, password });
          localStorage.setItem('tokens', JSON.stringify({
            access: data.access,
            refresh: data.refresh
          }));
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          toast.success('Registration successful!');
          setShowUserLogin(false);
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed');
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
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
          className="mt-6 w-full h-11 rounded-full text-white bg-primary hover:bg-primary-dull transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : null}
          {isLogin ? "Login" : "Create Account"}
        </button>
        
        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

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
