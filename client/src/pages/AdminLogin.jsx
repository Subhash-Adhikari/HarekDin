import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../api/auth';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Attempt to login with admin credentials
      const loginData = {
        email: email,
        password: password
      };
      
      const response = await login(loginData);
      
      // Store tokens in localStorage
      localStorage.setItem('tokens', JSON.stringify({
        access: response.access,
        refresh: response.refresh
      }));
      
      // Check if user has admin privileges
      // For now, we'll just check if the email matches a specific admin email or use is_staff from the user object
      if (email === "admin@harekdin.com" || response.user.is_staff) {
        localStorage.setItem("admin", JSON.stringify(response.user));
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/admin");
        toast.success("Admin login successful!");
      } else {
        // Remove tokens if not admin
        localStorage.removeItem('tokens');
        toast.error("You don't have admin privileges");
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error(error.message || "Invalid credentials!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 bg-white shadow-md rounded-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Admin <span className="text-primary-dull">Login</span></h2>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            placeholder="admin@harekdin.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dull transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
