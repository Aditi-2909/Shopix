import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Package, Truck, Sparkles } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderId] = useState('SN' + Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#f0fdf4] to-[#fafafa] px-4 py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[10%] w-[500px] h-[500px] bg-green-200/40 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] w-[400px] h-[400px] bg-emerald-200/30 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="bg-white w-full max-w-[480px] rounded-[32px] border border-gray-100 shadow-[0_25px_80px_-15px_rgba(34,197,94,0.2)] p-8 md:p-10 text-center relative z-10 animate-[slideUp_0.6s_ease]">

        {/* Success Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          <Sparkles size={14} /> Payment Confirmed
        </div>

        {/* Animated Tick - PREMIUM GREEN */}
        <div className="relative mx-auto w-28 h-28 mb-8">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-green-300 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20 [animation-delay:0.5s]"></div>
          <div className="relative w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(34,197,94,0.6)] shadow-green-500/30">
            <Check className="w-12 h-12 text-white stroke-[3.5] animate-[scaleIn_0.5s_ease_0.3s_both]" />
          </div>
          {/* Small floating dots */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
        </div>

        <h1 className="text-[30px] font-extrabold tracking-tight leading-tight text-zinc-900">
          Order Placed<br/>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Successfully!</span>
        </h1>
        <p className="text-gray-500 text-[14px] mt-3 leading-relaxed">
          Thank you for shopping with <span className="font-semibold text-black">Shopix</span>. Your order has been confirmed and will be shipped soon.
        </p>

        {/* Order Info Card */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-dashed border-gray-200 rounded-2xl p-5 mt-8 text-left relative">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-white border px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-gray-400">ORDER DETAILS</div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 flex items-center gap-2">Order ID</span>
            <span className="font-bold font-mono tracking-wider bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm mt-4">
            <span className="text-gray-500">Payment</span>
            <span className="font-semibold text-green-600 flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Confirmed</span>
          </div>
          <div className="flex justify-between text-sm mt-3">
            <span className="text-gray-500">Estimated Delivery</span>
            <span className="font-semibold">2-3 Days</span>
          </div>
        </div>

        {/* Steps - Green Active */}
        <div className="flex items-center justify-between mt-8 px-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/20"><Package size={18}/></div>
            <span className="text-[11px] font-bold text-green-700">Packed</span>
          </div>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-green-500 to-gray-200 mx-2 -mt-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center"><Truck size={18}/></div>
            <span className="text-[11px] font-medium text-gray-400">Shipped</span>
          </div>
          <div className="flex-1 h-[2px] bg-gray-200 mx-2 -mt-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center"><Check size={18}/></div>
            <span className="text-[11px] font-medium text-gray-400">Delivered</span>
          </div>
        </div>

        <button
          onClick={()=>navigate('/')}
          className="w-full mt-10 bg-black text-white py-4 rounded-full font-semibold hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-xl shadow-black/20 cursor-pointer flex items-center justify-center gap-2 group"
        >
          Continue Shopping <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <p className="text-[11px] text-gray-400 mt-4">A confirmation email has been sent to your inbox</p>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;