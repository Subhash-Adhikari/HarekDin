import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import { getUserProfile, refreshToken } from "../api/auth";
import { getProducts } from "../api/products";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY ;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      // Try to fetch products from API
      const response = await getProducts();
      if (response && response.length > 0) {
        setProducts(response);
      } else {
        // Fallback to dummy products if API returns empty
        setProducts(dummyProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to dummy products on error
      setProducts(dummyProducts);
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        toast.success("Removed from wishlist");
        return prevWishlist.filter(id => id !== productId);
      } else {
        toast.success("Added to wishlist");
        return [...prevWishlist, productId];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const addToCart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Removed from Cart");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, val) => acc + val, 0);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        totalAmount += product.offerPrice * cartItems[itemId];
      }
    }
    return parseFloat(totalAmount.toFixed(2));
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  // Function to check if token is valid and refresh if needed
  const checkAuthStatus = async () => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    const savedUser = localStorage.getItem('user');
    
    if (tokens && savedUser) {
      try {
        // Try to get user profile to verify token is valid
        await getUserProfile();
        setUser(JSON.parse(savedUser));
      } catch (error) {
        // If token is expired, try to refresh
        if (tokens.refresh) {
          try {
            const newTokens = await refreshToken(tokens.refresh);
            localStorage.setItem('tokens', JSON.stringify({
              access: newTokens.access,
              refresh: tokens.refresh
            }));
            setUser(JSON.parse(savedUser));
          } catch (refreshError) {
            // If refresh fails, logout
            logout();
          }
        } else {
          // No refresh token, logout
          logout();
        }
      }
    }
  };

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    // Check authentication status
    checkAuthStatus();
    
    // Fetch products
    fetchProducts();
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <AppContext.Provider
      value={{
        navigate,
        user,
        setUser,
        setIsSeller,
        isSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartCount,
        getCartAmount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        logout,
        fetchProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);