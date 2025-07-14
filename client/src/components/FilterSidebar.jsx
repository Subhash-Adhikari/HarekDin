import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const FilterSidebar = ({ onFilterChange, activeFilters }) => {
  const { products } = useAppContext();

  const [filters, setFilters] = useState({
    categories: activeFilters?.category ? [activeFilters.category] : [],
    priceRange: {
      min: 0,
      max: 1000,
      current: {
        min: activeFilters?.minPrice?.toString() || '0',
        max: activeFilters?.maxPrice?.toString() || '1000'
      }
    }
  });

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.offerPrice);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));

      setFilters(prev => ({
        ...prev,
        priceRange: {
          min,
          max,
          current: {
            min: activeFilters?.minPrice?.toString() || min.toString(),
            max: activeFilters?.maxPrice?.toString() || max.toString()
          }
        }
      }));
    }
  }, [products, activeFilters]);

  const categories = [...new Set(products.map(p => p.category))];

  const updateFilters = (updates) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);

    onFilterChange({
      category: newFilters.categories.length === 1 ? newFilters.categories[0] : '',
      minPrice: parseInt(newFilters.priceRange.current.min),
      maxPrice: parseInt(newFilters.priceRange.current.max),
      rating: 0
    });
  };

  const toggleCategory = (cat) => {
    const updated = filters.categories.includes(cat) ? [] : [cat];
    updateFilters({ categories: updated });
  };

  const changePrice = (type, val) => {
    setFilters(prev => {
      const updated = {
        ...prev,
        priceRange: {
          ...prev.priceRange,
          current: {
            ...prev.priceRange.current,
            [type]: val
          }
        }
      };
      return updated;
    });
  };

  const applyPriceValidation = () => {
    const { min, max } = filters.priceRange;
    let currMin = parseInt(filters.priceRange.current.min);
    let currMax = parseInt(filters.priceRange.current.max);

    if (isNaN(currMin) || currMin < min) currMin = min;
    if (isNaN(currMax) || currMax > max) currMax = max;
    if (currMin > currMax) currMin = currMax;

    updateFilters({
      priceRange: {
        ...filters.priceRange,
        current: {
          min: currMin.toString(),
          max: currMax.toString()
        }
      }
    });
  };

  const clear = () => {
    const reset = {
      categories: [],
      priceRange: {
        ...filters.priceRange,
        current: {
          min: filters.priceRange.min.toString(),
          max: filters.priceRange.max.toString()
        }
      }
    };
    setFilters(reset);
    onFilterChange({
      category: '',
      minPrice: filters.priceRange.min,
      maxPrice: filters.priceRange.max,
      rating: 0
    });
  };

  return (
    <aside className="bg-white rounded-lg shadow-md p-4 sticky top-24">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          onClick={clear}
          className="text-sm text-primary hover:underline hover:text-primary-dark transition-colors duration-200"
        >
          Clear All
        </button>
      </header>

      <section className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700 border-b pb-2">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {categories.map(cat => (
            <label
              key={cat}
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                filters.categories.includes(cat)
                  ? 'bg-primary-light'
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="mr-2 accent-primary"
              />
              <span className="capitalize">{cat}</span>
              <span className="ml-auto text-xs text-gray-500">
                {products.filter(p => p.category === cat).length}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700 border-b pb-2">Price Range</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Min Price</label>
            <input
              type="number"
              value={filters.priceRange.current.min}
              onChange={(e) => changePrice('min', e.target.value)}
              onBlur={applyPriceValidation}
              min={filters.priceRange.min}
              max={filters.priceRange.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Max Price</label>
            <input
              type="number"
              value={filters.priceRange.current.max}
              onChange={(e) => changePrice('max', e.target.value)}
              onBlur={applyPriceValidation}
              min={filters.priceRange.min}
              max={filters.priceRange.max}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all duration-200"
            />
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>${filters.priceRange.min}</span>
          <span>${filters.priceRange.max}</span>
        </div>
        <button
          className="w-full mt-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={applyPriceValidation}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Apply Price Range
        </button>
      </section>

      <div className="mt-6 block md:hidden">
        <button
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={applyPriceValidation}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Apply All Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
