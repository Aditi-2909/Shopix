import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = cartTotal > 500? 0 : 49;
  const finalTotal = cartTotal + shipping;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#fffdf0] to-[#fff9c2] flex flex-col items-center justify-center px-4">
     
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#FFC300]/30 to-yellow-200/30 rounded-full blur-[80px] animate-[float1_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-black/5 to-zinc-200/50 rounded-full blur-[80px] animate-[float2_10s_ease-in-out_infinite]"></div>
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#FFC300]/10 rounded-full blur-[60px]"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFC300]/20 rounded-[28px] blur-[25px] scale-110"></div>
            <div className="relative w-[88px] h-[88px] bg-black rounded-[26px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.25)] rotate-[-4deg]">
              <span className="text-[38px]">🛒</span>
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-white border border-gray-100 rounded-full flex items-center justify-center text-[11px] font-black shadow-[0_4px_12px_rgba(0,0,0,0.1)]">0</div>
          </div>

          <h2 className="text-[28px] font-black tracking-tight mt-8">Your Cart is Empty <span className="text-[#FFC300]">.</span></h2>
          <p className="text-gray-500 text-[14px] font-medium mt-2 max-w-[320px]">Looks like you haven't added anything yet</p>
          <p className="text-gray-400 text-[13px] mt-1">Explore more products on Shopix ✨</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-8 py-3.5 rounded-full font-black text-[14px] hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue Shopping <span>→</span>
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="bg-white/80 backdrop-blur-xl border border-white text-black px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all cursor-pointer"
            >
              Explore Shop
            </button>
          </div>

          <div className="mt-12 flex items-center gap-2 text-[10px] font-black tracking-[0.15em] text-gray-400 uppercase">
            <span className="w-8 h-[1px] bg-gray-300"></span> 100% Secure • Fast Delivery <span className="w-8 h-[1px] bg-gray-300"></span>
          </div>
        </div>

        <style>{`
          @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,30px) scale(1.1); } }
          @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,-20px) scale(1.15); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black tracking-tight">My Cart <span className="text-[#FFC300]">({cartItems.length})</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 mt-8">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex gap-4 bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-xl border bg-gray-50" />
                <div className="flex-1">
                  <h4 className="font-bold text-[15px]">{item.name}</h4>
                  <p className="font-black mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gray-200 rounded-full p-1">
                      <button onClick={() => dispatch(updateQty({ productId: item.productId, qty: item.qty - 1 }))} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold cursor-pointer">-</button>
                      <span className="px-3 text-sm font-bold">{item.qty}</span>
                      <button onClick={() => dispatch(updateQty({ productId: item.productId, qty: item.qty + 1 }))} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold cursor-pointer">+</button>
                    </div>
                    <button onClick={() => dispatch(removeFromCart(item.productId))} className="ml-auto text-xs font-bold bg-gray-100 hover:bg-red-50 hover:text-red-500 px-3 py-1.5 rounded-full transition-all cursor-pointer">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black rounded-[24px] p-6 h-fit lg:sticky top-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFC300]/20 rounded-full blur-[40px] -mr-10 -mt-10"></div>
            <div className="relative">
              <h3 className="font-bold text-lg">Price Details</h3>
              <div className="space-y-3 mt-5 text-sm">
                <div className="flex justify-between text-zinc-400"><span>Price ({cartItems.length} items)</span><span className="text-white font-medium">₹{cartTotal}</span></div>
                <div className="flex justify-between text-zinc-400"><span>Delivery</span><span className="text-[#FFC300] font-bold">{shipping===0?'FREE':`₹${shipping}`}</span></div>
                <div className="flex justify-between font-black text-base border-t border-white/10 pt-4 mt-4"><span>Total</span><span className="text-[#FFC300] text-xl">₹{finalTotal}</span></div>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full cursor-pointer bg-[#FFC300] text-black py-3.5 rounded-full mt-6 font-black hover:bg-yellow-400 transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;