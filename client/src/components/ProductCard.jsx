import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
  const { currency } = useAppContext();

  return product && (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full h-full relative group shadow-sm hover:shadow-md transition-shadow">
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <WishlistButton productId={product._id} />
      </div>
      
      <Link to={`/products/${product.category.toLowerCase()}/${product._id}`} className="block h-full flex flex-col">
        <div className="cursor-pointer flex items-center justify-center px-2 py-2 flex-shrink-0">
          <img
            className="group-hover:scale-105 transition object-contain h-32 sm:h-36 md:h-40 w-auto"
            src={product.image[0]}
            alt={product.name}
            loading="lazy"
          />
        </div>

      <div className="text-gray-500/60 text-sm flex-grow flex flex-col">
        <p className="text-xs">{product.category}</p>
        <p className="text-gray-700 font-medium text-base sm:text-lg truncate w-full">{product.name}</p>

        <div className="flex items-center gap-0.5 my-1">
          {Array(5).fill('').map((_, i) => (
            <img
              key={i}
              className="md:w-3.5 w-3"
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt="star"
            />
          ))}
          <p className="text-xs">(4)</p>
        </div>

        <div className="flex items-end justify-between mt-auto pt-2">
          <p className="text-sm sm:text-base md:text-lg font-medium text-primary">
            {currency} {product.offerPrice}{" "}
            <span className="text-gray-500/60 text-xs sm:text-sm line-through">
              Rs{product.price}
            </span>
          </p>

          <div onClick={(e) => e.stopPropagation()} className="text-primary">
            <AddToCart product={product} size="small" variant="productCard" />
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default ProductCard;
