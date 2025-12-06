
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { useCart } from '../context/CartContext';
import { Search, Filter, X } from 'lucide-react';
import { MenuItem, CartOptions, SpiceLevel } from '../types';

const CATEGORIES = ['All', 'Wraps', 'Rolls', 'Sides', 'Beverages', 'Combos'];

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [onlyVeg, setOnlyVeg] = useState(false);
  const { addToCart } = useCart();

  // Customization State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [customOptions, setCustomOptions] = useState<CartOptions>({
    extraCheese: false,
    extraMayo: false,
    spiceLevel: 'Medium'
  });

  const filteredItems = MENU_ITEMS.filter(item => {
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
    const vegMatch = !onlyVeg || item.isVeg;
    return categoryMatch && vegMatch;
  });

  const handleAddItem = (item: MenuItem) => {
    // Beverages usually don't need these specific customizations
    if (item.category === 'Beverages') {
      addToCart(item);
    } else {
      setSelectedItem(item);
      setCustomOptions({
        extraCheese: false,
        extraMayo: false,
        spiceLevel: 'Medium'
      });
    }
  };

  const handleAddToCartWithOptions = () => {
    if (selectedItem) {
      addToCart(selectedItem, customOptions);
      setSelectedItem(null);
    }
  };

  const toggleOption = (key: keyof Pick<CartOptions, 'extraCheese' | 'extraMayo'>) => {
    setCustomOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setSpice = (level: SpiceLevel) => {
    setCustomOptions(prev => ({ ...prev, spiceLevel: level }));
  };

  const getModalPrice = () => {
    if (!selectedItem) return 0;
    let price = selectedItem.price;
    if (customOptions.extraCheese) price += 20;
    if (customOptions.extraMayo) price += 10;
    return price;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Online</h1>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-2 sm:pb-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Veg Toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-sm font-bold ${onlyVeg ? 'text-green-600' : 'text-gray-500'}`}>Veg Only</span>
              <button 
                onClick={() => setOnlyVeg(!onlyVeg)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${onlyVeg ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${onlyVeg ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
              {/* Text Info */}
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-1">
                  <div className={`w-4 h-4 rounded-sm border ${item.isVeg ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'} flex items-center justify-center flex-shrink-0 mt-1`}>
                    <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                  </div>
                  {item.isBestseller && (
                    <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">Bestseller</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                <p className="text-gray-900 font-medium mb-2">₹{item.price}</p>
                <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
              </div>

              {/* Image & Button */}
              <div className="relative w-32 h-24 sm:w-40 sm:h-32 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <button 
                    onClick={() => handleAddItem(item)}
                    className="bg-white text-green-600 font-bold px-6 py-2 rounded-lg shadow-md border border-gray-200 text-sm hover:bg-green-50 uppercase whitespace-nowrap"
                  >
                    {item.category === 'Beverages' ? 'Add' : 'Add +'}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}></div>
          
          <div className="relative bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-in-up sm:animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{selectedItem.name}</h3>
                <p className="text-sm text-gray-500">Customize your order</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-900 shadow-sm">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-6">
              
              {/* Spice Level */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  Spice Level
                  <span className="text-xs font-normal text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Required</span>
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {(['Low', 'Medium', 'High'] as SpiceLevel[]).map(level => (
                    <button
                      key={level}
                      onClick={() => setSpice(level)}
                      className={`py-2 px-4 rounded-lg border font-medium text-sm transition-all ${
                        customOptions.spiceLevel === level 
                          ? 'border-primary-600 bg-primary-50 text-primary-700 ring-1 ring-primary-600' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Add-ons</h4>
                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${customOptions.extraCheese ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${customOptions.extraCheese ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300 bg-white'}`}>
                        {customOptions.extraCheese && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                      </div>
                      <span className={`${customOptions.extraCheese ? 'text-primary-900 font-medium' : 'text-gray-700'}`}>Extra Cheese</span>
                    </div>
                    <span className="text-gray-900 font-medium">+₹20</span>
                    <input type="checkbox" className="hidden" checked={customOptions.extraCheese} onChange={() => toggleOption('extraCheese')} />
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${customOptions.extraMayo ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${customOptions.extraMayo ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300 bg-white'}`}>
                        {customOptions.extraMayo && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                      </div>
                      <span className={`${customOptions.extraMayo ? 'text-primary-900 font-medium' : 'text-gray-700'}`}>Extra Mayo</span>
                    </div>
                    <span className="text-gray-900 font-medium">+₹10</span>
                    <input type="checkbox" className="hidden" checked={customOptions.extraMayo} onChange={() => toggleOption('extraMayo')} />
                  </label>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={handleAddToCartWithOptions}
                className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 active:scale-[0.98] transition-all flex justify-between items-center"
              >
                <span>Add Item to Cart</span>
                <span>₹{getModalPrice()}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
