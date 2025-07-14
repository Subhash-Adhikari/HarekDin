import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useAppContext();

  const bestSellers = products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  return (
    <div className="mt-20 px-4 md:px-8">
      {/* Section Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
          🔥 Best Sellers
        </h2>
        {products.length > 5 && (
          <p className="text-sm md:text-base text-primary-dull hover:underline cursor-pointer">
            View All
          </p>
        )}
      </div>

      {/* Product Grid / Scroll Container */}
      <div className="mt-6">
        {/* Mobile: horizontal scroll, larger screens: grid with flex-wrap for better responsiveness */}
        <div className="flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible scrollbar-hide no-scrollbar md:min-w-0">
          {bestSellers.length > 0 ? (
            bestSellers.map((product, index) => (
              <div
                key={product._id}
                className="relative flex-shrink-0 w-full sm:w-1/2 md:w-auto transition-transform hover:-translate-y-1 duration-300 ease-in-out mb-4 md:mb-0"
              >
                {index < 3 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-md">
                    Top {index + 1}
                  </span>
                )}
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
