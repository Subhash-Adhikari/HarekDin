import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import QuickSort from '../components/QuickSort';
import { useSearchParams } from 'react-router-dom';

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: 0,
    maxPrice: 10000,
    rating: 0
  });
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    const query = searchQuery?.toLowerCase() || '';
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );

    if (activeFilters.category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === activeFilters.category.toLowerCase()
      );
    }

    filtered = filtered.filter(product =>
      product.offerPrice >= activeFilters.minPrice &&
      product.offerPrice <= activeFilters.maxPrice
    );

    if (activeFilters.rating > 0) {
      filtered = filtered.filter(product =>
        product.rating >= activeFilters.rating
      );
    }

    setFilteredProducts(filtered);
    
    // Log for debugging
    console.log('Filters applied:', activeFilters);
    console.log('Filtered products:', filtered.length);
  }, [products, searchQuery, activeFilters]);

  useEffect(() => {
    let sorted = [...filteredProducts];

    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        sorted.sort((a, b) => b.sold - a.sold);
        break;
      default:
        break;
    }

    setSortedProducts(sorted);
  }, [filteredProducts, sortOption]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (activeFilters.category) {
      params.set('category', activeFilters.category);
    } else {
      params.delete('category');
    }

    setSearchParams(params);
  }, [activeFilters.category, setSearchParams]);

  const handleFilterChange = (filters) => {
    // Update active filters with the new values
    setActiveFilters(prev => ({ ...prev, ...filters }));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const inStockProducts = sortedProducts.filter(product => product.inStock);

  // Animation variants removed to fix ESLint errors

  return (
    <div
      className='mt-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 max-w-7xl mx-auto'
    >
      <div className='mb-8'>
        <div className='text-center mb-6'>
          <p className='text-2xl font-semibold uppercase'>All Products</p>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
          <div className='flex items-center gap-2'>
            <p className='text-gray-500'>
              Showing {inStockProducts.length} {inStockProducts.length === 1 ? 'product' : 'products'}
            </p>
            {activeFilters.category && (
              <div className='flex items-center bg-primary-light text-primary px-3 py-1 rounded-full text-sm'>
                <span>{activeFilters.category}</span>
                <button 
                  onClick={() => setActiveFilters(prev => ({ ...prev, category: '' }))}
                  className='ml-2 focus:outline-none'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <QuickSort onSortChange={handleSortChange} currentSort={sortOption} />
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <div 
          className='w-full md:w-1/4 lg:w-1/5'
        >
          <FilterSidebar
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div 
          className='w-full md:w-3/4 lg:w-4/5'
        >
          {inStockProducts.length === 0 ? (
            <div 
              className='bg-gray-50 p-8 rounded-lg text-center shadow-sm'
            >
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className='text-gray-500 mb-2'>
                No products found {searchQuery ? `for "${searchQuery}"` : ''}
                {activeFilters.category ? ` in category "${activeFilters.category}"` : ''}
              </p>
              <button
                onClick={() => {
                  setActiveFilters({
                    category: '',
                    minPrice: 0,
                    maxPrice: 10000,
                    rating: 0
                  });
                  setSortOption('featured');
                }}
                className='mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200'
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div 
              className='grid gap-4 xs:gap-5 sm:gap-6 md:gap-4 lg:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
            >
              {inStockProducts.map((product, index) => (
                <div
                  key={product._id || product.id}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
