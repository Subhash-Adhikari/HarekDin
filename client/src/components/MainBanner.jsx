import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center px-4 md:px-20 lg:px-28 pb-20 md:pb-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left text-black max-w-[90%] md:max-w-[550px] leading-tight lg:leading-[60px]">
          Daily Essentials, Delivered Daily to Your Doorstep
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 font-medium">
          {/* Shop Now Button */}
          <Link
            to="/products"
            className="group flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dull transition duration-300"
          >
            <span className="text-base font-semibold">🛒 Shop Now</span>
            <img
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          {/* Explore Deals Button */}
          <Link
            to="/products"
            className="group flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300 shadow-sm"
          >
            <span className="text-base font-semibold">🔥 Explore Deals</span>
            <img
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
