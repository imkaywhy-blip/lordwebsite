
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { VALID_PINCODES } from '../constants';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, getCartItemPrice } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    houseNo: '',
    street: '',
    area: 'Sector 15', // Default
    pincode: '',
    instructions: ''
  });

  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pincodeError, setPincodeError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'COD'>('ONLINE');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'pincode') {
      setPincodeError('');
    }
  };

  const handleLocationClick = () => {
    setLocationStatus('loading');
    if (!navigator.geolocation) {
      setLocationStatus('error');
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would reverse geocode these coords to get the address
        // For this demo, we simulate success and just show the "Map" UI state
        setLocationStatus('success');
      },
      () => {
        setLocationStatus('error');
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!VALID_PINCODES.includes(formData.pincode)) {
      setPincodeError('Currently we only deliver within selected areas of Chandigarh. Please enter a valid pincode (e.g. 160022).');
      return;
    }

    // Create simulated order
    const orderId = '#LW' + Math.floor(10000 + Math.random() * 90000);
    const orderData = {
      id: orderId,
      items: cart,
      total: cartTotal,
      address: formData,
      status: 'Placed',
      timestamp: new Date().toISOString()
    };
    
    // Persist active order for tracking
    localStorage.setItem('active_order', JSON.stringify(orderData));
    
    clearCart();
    navigate(`/tracking/${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
          <button 
            onClick={() => navigate('/menu')}
            className="text-primary-600 hover:underline"
          >
            Go back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Address Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-gray-500" />
                Delivery Address
              </h2>

              {/* Live Location Button */}
              <div className="mb-6">
                <button 
                  type="button"
                  onClick={handleLocationClick}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-primary-200 bg-primary-50 text-primary-700 rounded-lg font-medium hover:bg-primary-100 transition-colors"
                >
                  <Navigation size={18} />
                  {locationStatus === 'loading' ? 'Detecting Location...' : 'Use Current Location'}
                </button>
                {locationStatus === 'success' && (
                  <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <MapPin size={14} /> Location pinned successfully!
                  </div>
                )}
                {locationStatus === 'success' && (
                    <div className="mt-3 h-32 w-full bg-gray-200 rounded-lg overflow-hidden relative">
                         <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                             <MapPin size={32} className="text-red-500 mb-2" />
                             <span className="sr-only">Map Placeholder</span>
                         </div>
                         <div className="absolute bottom-2 right-2 bg-white px-2 py-1 text-xs shadow rounded">Map View (Simulated)</div>
                    </div>
                )}
              </div>

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">House / Flat No.</label>
                    <input 
                      type="text" 
                      name="houseNo"
                      required
                      value={formData.houseNo}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street / Society</label>
                    <input 
                      type="text" 
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sector / Area</label>
                    <select 
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
                    >
                      <option value="Sector 15">Sector 15</option>
                      <option value="Sector 17">Sector 17</option>
                      <option value="Sector 22">Sector 22</option>
                      <option value="Sector 35">Sector 35</option>
                      <option value="Sector 43">Sector 43</option>
                      <option value="Mohali Phase 7">Mohali Phase 7</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode (Chandigarh)</label>
                    <input 
                      type="text" 
                      name="pincode"
                      required
                      placeholder="1600xx"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${pincodeError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {pincodeError && (
                      <p className="text-red-500 text-xs mt-1 flex items-start gap-1">
                        <AlertCircle size={12} className="mt-0.5" />
                        {pincodeError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions (Optional)</label>
                   <textarea
                      name="instructions"
                      rows={2}
                      value={formData.instructions}
                      onChange={handleInputChange}
                      placeholder="E.g. Don't ring doorbell, Leave at security"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                   />
                </div>
              </form>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h2 className="text-lg font-bold mb-4">Payment Method</h2>
               <div className="space-y-3">
                 <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'ONLINE' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                   <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'ONLINE'}
                      onChange={() => setPaymentMethod('ONLINE')}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                   />
                   <div className="ml-3">
                     <span className="block text-sm font-medium text-gray-900">Pay Online</span>
                     <span className="block text-xs text-gray-500">UPI, Cards, Netbanking (Secure)</span>
                   </div>
                 </label>

                 <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                   <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                   />
                   <div className="ml-3">
                     <span className="block text-sm font-medium text-gray-900">Cash on Delivery</span>
                     <span className="block text-xs text-gray-500">Pay via Cash or UPI at doorstep</span>
                   </div>
                 </label>
               </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="md:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {cart.map(item => {
                    const price = getCartItemPrice(item);
                    return (
                      <div key={item.cartId} className="flex justify-between text-sm">
                        <div className="flex gap-2">
                           <span className="text-gray-500">{item.quantity}x</span>
                           <div className="flex flex-col">
                             <span className="text-gray-800 font-medium">{item.name}</span>
                             {item.options && (
                               <span className="text-xs text-gray-500">
                                 {[item.options.spiceLevel + ' Spice', item.options.extraCheese && 'Extra Cheese', item.options.extraMayo && 'Extra Mayo'].filter(Boolean).join(', ')}
                               </span>
                             )}
                             {item.note && (
                                <span className="text-xs text-orange-600 italic">Note: {item.note}</span>
                             )}
                           </div>
                        </div>
                        <span className="text-gray-900">₹{price * item.quantity}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-gray-100 pt-4 space-y-2">
                   <div className="flex justify-between text-sm text-gray-600">
                      <span>Item Total</span>
                      <span>₹{cartTotal}</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-600">
                      <span>Delivery Partner Fee</span>
                      <span className="text-green-600">FREE</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-600">
                      <span>Govt Taxes (5%)</span>
                      <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                      <span>To Pay</span>
                      <span>₹{(cartTotal * 1.05).toFixed(2)}</span>
                   </div>
                </div>

                <button 
                  type="submit"
                  form="checkout-form"
                  className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-primary-700 transition-colors"
                >
                  Place Order
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
