import React from 'react';
import { assets, features } from '../assets/assets';

const BottomBanner = () => {

  return (
    <div className="relative mt-24">
      {/* Background Images */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block object-cover h-[500px]"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden object-cover"
      />

      {/* Text & Features overlay - Fixed alignment and visibility */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center px-6 md:px-16 lg:px-24 py-16 md:py-0 bg-gradient-to-t md:bg-gradient-to-l from-white/90 to-white/40 md:from-white/80 md:to-transparent">
        <div className="max-w-md md:max-w-sm text-center md:text-right bg-white/80 md:bg-transparent p-6 md:p-0 rounded-lg md:rounded-none shadow-lg md:shadow-none"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold text-primary mb-8 drop-shadow-md">
            Why We Are The Best?
          </h1>

          <div className="space-y-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-row md:flex-row-reverse items-center justify-center md:justify-start gap-4 md:gap-6"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-primary/10 rounded-full">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-8 md:w-10"
                  />
                </div>
                <div className="text-left md:text-right flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-primary-dark">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="text-sm md:text-base text-gray-700 mt-1">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
