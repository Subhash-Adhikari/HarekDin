import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { id, name, image, productCount } = category;

  return (
    <Link 
      to={`/products?category=${id}`}
      className="group flex flex-col items-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 mb-3 rounded-full bg-primary/10 flex items-center justify-center">
        <img 
          src={image} 
          alt={name} 
          className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform"
        />
      </div>
      <h3 className="text-sm md:text-base font-medium text-gray-800 text-center">{name}</h3>
      {productCount && (
        <p className="text-xs text-gray-500 mt-1">{productCount} items</p>
      )}
    </Link>
  );
};

export default CategoryCard;