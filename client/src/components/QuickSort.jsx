import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickSort = ({ onSortChange, currentSort = 'featured' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const dropdownRef = useRef(null);
  
  // Update selected sort when currentSort prop changes
  useEffect(() => {
    setSelectedSort(currentSort);
  }, [currentSort]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'name-asc', label: 'Name: A to Z' },
    { id: 'name-desc', label: 'Name: Z to A' },
    { id: 'rating-desc', label: 'Highest Rated' },
    { id: 'popularity', label: 'Most Popular' }
  ];

  const handleSortSelect = (sortId) => {
    setSelectedSort(sortId);
    setIsOpen(false);
    onSortChange(sortId);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    }),
    hover: { 
      backgroundColor: '#D4E5F7',
      scale: 1.02,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-56 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-gray-700 font-medium">
          Sort by: <span className="text-primary">{sortOptions.find(option => option.id === selectedSort)?.label}</span>
        </span>
        <motion.svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute z-10 w-full md:w-56 mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="py-1">
              {sortOptions.map((option, index) => (
                <motion.li key={option.id} custom={index} variants={itemVariants} initial="hidden" animate="visible">
                  <motion.button
                    onClick={() => handleSortSelect(option.id)}
                    className={`block w-full text-left px-4 py-2 ${selectedSort === option.id ? 'bg-primary-light text-primary font-medium' : 'text-gray-700'}`}
                    whileHover="hover"
                  >
                    {option.label}
                    {selectedSort === option.id && (
                      <motion.span 
                        className="float-right"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      >
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.span>
                    )}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickSort;