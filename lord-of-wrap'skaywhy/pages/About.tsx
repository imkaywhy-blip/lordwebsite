import React from 'react';
import { CONTACT_INFO } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-64 bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Our Story */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in 2013, <strong>Lord of Wrap's</strong> started with a simple vision: to serve Chandigarh the most authentic, hygienic, and flavor-packed wraps and rolls. What began as a small takeaway counter in Sector 22 has now grown into one of the city's most loved fast-food brands.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For over a decade, we have stayed true to our roots – prioritizing taste over everything else. We don't just make food; we craft experiences that you can enjoy in the comfort of your home.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-gray-50 rounded-lg">
             <h3 className="text-xl font-bold text-primary-600 mb-2">Quality First</h3>
             <p className="text-gray-600 text-sm">We use only fresh vegetables, premium quality paneer, and meats sourced daily from trusted local vendors.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
             <h3 className="text-xl font-bold text-primary-600 mb-2">Hygiene</h3>
             <p className="text-gray-600 text-sm">Our kitchen follows strict hygiene protocols. We believe clean food is the only food worth serving.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
             <h3 className="text-xl font-bold text-primary-600 mb-2">Local Love</h3>
             <p className="text-gray-600 text-sm">We are 100% Chandigarh. We know every sector, every street, ensuring your order reaches you fast.</p>
          </div>
        </div>

        {/* Founder Note */}
        <div className="bg-primary-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">A Note from the Founder</h2>
          <blockquote className="italic text-gray-700 text-lg mb-4">
            "I started Lord of Wrap's because I couldn't find a decent roll that wasn't just oil and chili. I wanted to make something my own family would love to eat. 10 years later, that promise still stands."
          </blockquote>
          <p className="font-bold text-primary-700">– Founder Name</p>
        </div>

      </div>
    </div>
  );
};
