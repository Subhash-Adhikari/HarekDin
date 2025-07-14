import React from 'react';

const About = () => {
  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About HarekDin</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
        <p className="mb-4 text-gray-700">
          At HarekDin, our mission is to make daily essentials accessible to every Nepali household. 
          We believe that everyone deserves convenient access to quality products at fair prices, 
          delivered right to their doorstep.
        </p>
        <p className="text-gray-700">
          Our name "HarekDin" (हरेक दिन) reflects our commitment to serving your everyday needs, 
          because we understand that life's essentials are needed every day.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Our Story</h2>
        <p className="mb-4 text-gray-700">
          Founded in 2023 by a group of CSIT students from Tribhuvan University, HarekDin 
          started with a simple observation: many Nepali families struggle to get their daily 
          essentials without spending hours in traffic or waiting in long lines.
        </p>
        <p className="text-gray-700">
          We built HarekDin to solve this problem, creating a platform that connects local vendors 
          with customers, ensuring that quality products reach homes efficiently and affordably.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium mb-2">Quality Assurance</h3>
            <p className="text-gray-700">We carefully select vendors and products to ensure only the best reaches your home.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Timely Delivery</h3>
            <p className="text-gray-700">We understand the importance of receiving your essentials when you need them.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Supporting Local</h3>
            <p className="text-gray-700">We prioritize local vendors and products, supporting Nepal's economy.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Customer First</h3>
            <p className="text-gray-700">Your satisfaction is our priority, and we're always here to help.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;