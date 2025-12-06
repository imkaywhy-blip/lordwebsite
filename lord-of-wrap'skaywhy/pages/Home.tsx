
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Award, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { useCart } from '../context/CartContext';

export const Home: React.FC = () => {
  const { addToCart } = useCart();
  // Ensure we get up to 8 bestsellers
  const bestsellers = MENU_ITEMS.filter(item => item.isBestseller).slice(0, 8);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=2000&auto=format&fit=crop" 
            alt="Delicious Wrap" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in-up">
            Serving Chandigarh since 2013
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight max-w-2xl animate-fade-in-up delay-100">
            Chandigarh ka favourite <span className="text-primary-500">Wraps & Rolls</span> spot
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl animate-fade-in-up delay-200">
            30 minutes me garma-garam wraps aapke ghar tak. Fast local delivery across Chandigarh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <Link 
              to="/menu" 
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
            >
              Order Now <ArrowRight size={20} />
            </Link>
            <Link 
              to="/menu" 
              className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-lg transition-all flex items-center justify-center"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">10 Years of Trust</h3>
              <p className="text-gray-600">Serving authentic flavors to Chandigarh since 2013 with consistent quality.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">30 Min Delivery</h3>
              <p className="text-gray-600">Lightning fast delivery system optimized for Chandigarh traffic and sectors.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Focus</h3>
              <p className="text-gray-600">We don't aggregate; we specialize. 100% focus on local Chandigarh delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Bestsellers</h2>
          
          {/* Changed grid-cols to 2 for mobile to make items smaller and compact */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestsellers.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  {item.isBestseller && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                      Bestseller
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1">{item.name}</h3>
                    <div className={`w-3 h-3 rounded-sm border ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2 h-8">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm md:text-base text-gray-900">₹{item.price}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="px-3 py-1.5 bg-white border border-primary-600 text-primary-600 font-bold rounded-md hover:bg-primary-50 transition-colors text-xs uppercase"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/menu" className="inline-block px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
              View All Items
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Promise */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Delivery Promise</h2>
          <p className="text-lg text-gray-600 mb-8">
            We currently deliver to select sectors in Chandigarh to ensure your food arrives hot and fresh.
            Please check your pincode at checkout.
          </p>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 inline-block">
            <div className="flex flex-col md:flex-row items-center gap-4 text-orange-800">
              <MapPin size={24} />
              <span className="font-medium">Currently serving pincodes starting with 1600xx</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
