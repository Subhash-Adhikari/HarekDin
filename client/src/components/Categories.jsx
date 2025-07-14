import React from 'react';
import { categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 px-4 md:px-8">
      {/* Title */}
      <p className="text-2xl md:text-3xl font-semibold mb-6 text-primary">🧺 Browse by Categories</p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer p-4 rounded-xl shadow-md hover:shadow-lg transition bg-white hover:-translate-y-1 duration-300 border"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <img
                src={category.image}
                alt={category.text}
                className="w-20 h-20 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="text-sm md:text-base font-medium text-center text-gray-800 group-hover:text-primary">
                {category.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
