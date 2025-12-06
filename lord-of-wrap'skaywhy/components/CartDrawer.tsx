
import React from 'react';
import { X, Plus, Minus, ShoppingBag, Info, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, updateItemNote, cartTotal, getCartItemPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag size={20} />
              Your Cart
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                <p>Your cart is empty.</p>
                <p className="text-sm mt-2">Add some delicious wraps to get started!</p>
                <button 
                  onClick={() => { setIsCartOpen(false); navigate('/menu'); }}
                  className="mt-6 text-primary-600 font-semibold hover:underline"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map(item => {
                const itemPrice = getCartItemPrice(item);
                return (
                  <div key={item.cartId} className="bg-white border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex gap-4">
                      <div className={`w-3 h-3 mt-1.5 rounded-sm border ${item.isVeg ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'} flex-shrink-0 flex items-center justify-center`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-900 font-medium">₹{itemPrice}</p>
                        
                        {/* Options Display */}
                        {item.options && (
                          <div className="mt-1 flex flex-wrap gap-1 mb-2">
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{item.options.spiceLevel} Spice</span>
                            {item.options.extraCheese && <span className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-100 px-1.5 py-0.5 rounded">Extra Cheese</span>}
                            {item.options.extraMayo && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded">Extra Mayo</span>}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => {
                              if(item.quantity === 1) removeFromCart(item.cartId);
                              else updateQuantity(item.cartId, -1);
                            }}
                            className="p-1 px-2 text-gray-600 hover:text-primary-600"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="p-1 px-2 text-gray-600 hover:text-primary-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">₹{itemPrice * item.quantity}</span>
                      </div>
                    </div>
                    
                    {/* Item Note Input */}
                    <div className="mt-2 ml-7">
                        <input
                            type="text"
                            placeholder="Add note (e.g. no onions)"
                            value={item.note || ''}
                            onChange={(e) => updateItemNote(item.cartId, e.target.value)}
                            className="w-full text-xs border border-gray-200 bg-gray-50 rounded px-2 py-1.5 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
                        />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Item Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
