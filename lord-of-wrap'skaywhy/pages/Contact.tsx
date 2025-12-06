import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
           <h1 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h1>
           <p className="text-gray-600">Have a query? Want to book a bulk order? We are here to help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Info */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
               <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                 <Phone size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Phone</h3>
                 <a href={`tel:${CONTACT_INFO.phone}`} className="text-primary-600 hover:underline">{CONTACT_INFO.phone}</a>
               </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
               <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                 <Mail size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Email</h3>
                 <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary-600 hover:underline">{CONTACT_INFO.email}</a>
               </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
               <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                 <MapPin size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Location</h3>
                 <p className="text-gray-600">{CONTACT_INFO.address}</p>
               </div>
             </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                 <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                 <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                 <textarea rows={4} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"></textarea>
               </div>
               <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700">Send Message</button>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-4 rounded-lg shadow-sm group">
               <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                 Where do you deliver?
                 <span className="transition group-open:rotate-180">▼</span>
               </summary>
               <p className="text-gray-600 mt-2 text-sm">We currently deliver to major sectors in Chandigarh including Sector 15, 17, 22, 35, and 43. Check your pincode at checkout.</p>
            </details>
            <details className="bg-white p-4 rounded-lg shadow-sm group">
               <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                 Do you accept Cash on Delivery?
                 <span className="transition group-open:rotate-180">▼</span>
               </summary>
               <p className="text-gray-600 mt-2 text-sm">Yes, we accept both Cash on Delivery and online payments (UPI/Cards).</p>
            </details>
            <details className="bg-white p-4 rounded-lg shadow-sm group">
               <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                 Do you take party orders?
                 <span className="transition group-open:rotate-180">▼</span>
               </summary>
               <p className="text-gray-600 mt-2 text-sm">Yes! For bulk orders, please call us directly at {CONTACT_INFO.phone} at least 24 hours in advance.</p>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
};
