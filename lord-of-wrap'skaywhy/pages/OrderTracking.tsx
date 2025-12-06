import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, ChefHat, Bike, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

type TrackingStatus = 'placed' | 'preparing' | 'out_for_delivery' | 'delivered';

export const OrderTracking: React.FC = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState<TrackingStatus>('placed');
  const [activeOrder, setActiveOrder] = useState<any>(null);

  useEffect(() => {
    // Load order details
    const savedOrder = localStorage.getItem('active_order');
    if (savedOrder) {
      setActiveOrder(JSON.parse(savedOrder));
    }

    // Simulate status progression for demo
    const timers = [
      setTimeout(() => setStatus('preparing'), 3000),
      setTimeout(() => setStatus('out_for_delivery'), 8000),
      setTimeout(() => setStatus('delivered'), 15000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    { id: 'placed', label: 'Order Placed', icon: Clock, time: 'Just now' },
    { id: 'preparing', label: 'Being Prepared', icon: ChefHat, time: '10 mins' },
    { id: 'out_for_delivery', label: 'Out for Delivery', icon: Bike, time: '20 mins' },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle2, time: '30 mins' },
  ];

  const getCurrentStepIndex = () => {
    const map = { 'placed': 0, 'preparing': 1, 'out_for_delivery': 2, 'delivered': 3 };
    return map[status];
  };

  if (!activeOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Track Order</h1>
            <p className="text-gray-500 text-sm">Order ID: {orderId}</p>
          </div>
          {status !== 'delivered' && (
             <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Estimated Arrival</p>
                <p className="text-2xl font-bold text-primary-600">30 Mins</p>
             </div>
          )}
        </div>

        {/* Live Map (Placeholder) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
           <div className="h-64 w-full bg-gray-200 relative">
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50">
               <MapPin className="text-primary-600 mb-2 animate-bounce" size={40} />
               <span className="text-gray-500 font-medium">Live Tracking Map (Simulated)</span>
             </div>
             {/* Rider Card overlay */}
             {status === 'out_for_delivery' && (
                <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Bike size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Rider: Vikram Singh</p>
                        <p className="text-xs text-gray-500">Vaccinated • 4.8 ★</p>
                      </div>
                   </div>
                   <button className="p-2 bg-green-100 text-green-700 rounded-full">
                      <Phone size={18} />
                   </button>
                </div>
             )}
           </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
           <div className="relative">
             {steps.map((step, index) => {
               const isActive = index <= getCurrentStepIndex();
               const isCurrent = index === getCurrentStepIndex();
               const Icon = step.icon;

               return (
                 <div key={step.id} className="flex gap-4 mb-8 last:mb-0 relative z-10">
                   {/* Vertical Line */}
                   {index !== steps.length - 1 && (
                     <div className={`absolute left-5 top-10 bottom-[-32px] w-0.5 ${index < getCurrentStepIndex() ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                   )}
                   
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                     <Icon size={20} />
                   </div>
                   
                   <div className="flex-1 pt-2">
                     <div className="flex justify-between">
                       <h3 className={`font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</h3>
                       <span className="text-xs text-gray-400">{step.time}</span>
                     </div>
                     {isCurrent && (
                       <p className="text-sm text-primary-600 mt-1 animate-pulse">In Progress...</p>
                     )}
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href={`tel:${CONTACT_INFO.phone}`} 
            className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-bold text-center text-gray-700 hover:bg-gray-50"
          >
            Call Restaurant
          </a>
          {status === 'delivered' && (
             <Link 
               to="/"
               className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-bold text-center hover:bg-primary-700 shadow-md"
             >
               Order Again
             </Link>
          )}
        </div>

      </div>
    </div>
  );
};
