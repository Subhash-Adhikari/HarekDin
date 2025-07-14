import React from 'react';

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-3 mt-24 pb-16 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-primary">
        Never Miss a Deal!
      </h1>
      <p className="md:text-lg text-gray-600 max-w-xl">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>
      <form className="flex w-full max-w-2xl h-12 md:h-14 shadow-md rounded-md overflow-hidden">
        <input
          type="email"
          required
          placeholder="Enter your email id"
          className="flex-grow px-4 text-gray-700 outline-none border border-r-0 border-gray-300 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull text-white px-8 md:px-12 transition-colors duration-300 font-medium"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
