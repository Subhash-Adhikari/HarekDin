import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 py-12 bg-white">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
      
      <p className="text-gray-600 mb-8">
        Have questions, feedback, or need help? Fill out the form below or reach out to us directly.
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-700">Name</label>
          <input type="text" placeholder="Your Name" className="border border-gray-300 px-4 py-2 rounded-md outline-primary-dull" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-700">Email</label>
          <input type="email" placeholder="you@example.com" className="border border-gray-300 px-4 py-2 rounded-md outline-primary-dull" />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="mb-1 text-sm text-gray-700">Message</label>
          <textarea rows="5" placeholder="Your message..." className="border border-gray-300 px-4 py-2 rounded-md outline-primary-dull"></textarea>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="bg-primary-dull hover:bg-primary text-white px-6 py-2 rounded-full transition">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
