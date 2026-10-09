import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const authState = useSelector((state) => state.auth);
    const userState = useSelector((state) => state.user);
    const userInfo = authState?.userInfo || authState?.user || userState?.userInfo || userState?.user || authState;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({ fullName: '', phone: '', pincode: '', address: '', city: '', state: '' });

    const subtotal = Number(cartItems.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2));
    const shipping = subtotal > 500? 0 : 49;
    const total = Number((subtotal + shipping).toFixed(2));

    const isLoggedIn = () => {
        if (userInfo && (userInfo.email || userInfo.name || userInfo._id || userInfo.token)) return true;
        return!!(localStorage.getItem('userInfo') || localStorage.getItem('user'));
    };
    const getToken = () => {
        try {
            const raw = localStorage.getItem('userInfo') || localStorage.getItem('user');
            const parsed = JSON.parse(raw || '{}');
            return parsed.token || parsed?.user?.token || userInfo?.token;
        } catch { return userInfo?.token; }
    };

    const handlePlaceOrder = async () => {
        if (!isLoggedIn()) { alert("Please login first"); navigate('/login?redirect=/checkout'); return; }
        if (!address.fullName ||!address.phone ||!address.address ||!address.pincode ||!address.city ||!address.state) {
            alert("Please fill all address fields *"); return;
        }

        // Payload matching backend Order model
        const payload = {
            items: cartItems.map(i => ({
                productId: i.productId || i._id || i.id,
                qty: Number(i.qty),
                price: Number(Number(i.price).toFixed(2))
            })),
            totalAmount: total,
            address: {
                fullName: address.fullName,
                street: address.address,
                city: address.city,
                postalCode: address.pincode,
                country: "India"
            },
            paymentId: paymentMethod === 'cod'? `COD-${Date.now()}` : `ONLINE-${Date.now()}`,
        };

        if (paymentMethod === 'cod') {
            setLoading(true);
            try {
                const API = import.meta.env.VITE_API_URL || '';
                const res = await fetch(`${API}/api/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                navigate('/order-success', { replace: true, state: { orderId: data.order?._id } });
                setTimeout(() => dispatch(clearCart()), 100);
            } catch (err) { alert(err.message); } finally { setLoading(false); }
            return;
        }

        // Online payment with Razorpay
        setLoading(true);
        try {
            const API = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${API}/api/payment/order`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: Math.round(total) }) });
            const order = await res.json();
            if (!res.ok ||!order.id) throw new Error(order.message || "Payment order failed");

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount, currency: 'INR', name: 'Shopix',
                description: 'Shopix Order Payment', order_id: order.id,
                handler: async (response) => {
                    const verifyRes = await fetch(`${API}/api/payment/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(response) });
                    if (!verifyRes.ok) { alert("Payment verification failed"); setLoading(false); return; }
                    const saveRes = await fetch(`${API}/api/orders`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
                        body: JSON.stringify({...payload, paymentId: response.razorpay_payment_id })
                    });
                    const saved = await saveRes.json();
                    if (!saveRes.ok) throw new Error(saved.message);
                    navigate('/order-success', { replace: true });
                    dispatch(clearCart());
                },
                prefill: { name: address.fullName, contact: address.phone, email: userInfo?.email },
                theme: { color: '#000000' },
                modal: { ondismiss: () => setLoading(false) }
            };
            new window.Razorpay(options).open();
        } catch (err) { alert(err.message); setLoading(false); }
    };

    if (cartItems.length === 0) {
        return <div className="min-h-[80vh] flex flex-col items-center justify-center"><h2 className="text-xl font-bold">Cart is Empty</h2><button onClick={() => navigate('/')} className="mt-4 bg-black text-white px-6 py-2 rounded-full">Shop Now</button></div>
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-black tracking-tight">Checkout <span className="text-[#FFC300]">.</span></h1>
                <p className="text-gray-500 text-sm mt-1 font-medium">Complete your order</p>
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 mt-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6">
                            <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">1</div><h2 className="font-black">Shipping Address</h2></div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} placeholder="Full Name *" className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black" />
                                <input value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} placeholder="Phone *" className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black" />
                                <input value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} placeholder="Pincode *" className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black" />
                                <input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="City *" className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black" />
                                <input value={address.state} onChange={e => setAddress({...address, state: e.target.value})} placeholder="State *" className="w-full md:col-span-2 bg-[#f9f9f9] border border-gray-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black" />
                                <textarea value={address.address} onChange={e => setAddress({...address, address: e.target.value})} placeholder="Full Address *" rows={3} className="md:col-span-2 w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black resize-none"></textarea>
                            </div>
                        </div>
                        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6">
                            <div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">2</div><h2 className="font-black">Payment Method</h2></div>
                            <div className="space-y-3">
                                <div onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between ${paymentMethod==='cod'?'border-black bg-gray-50':'border-gray-100'}`}><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod==='cod'?'border-black bg-black':''}`}>{paymentMethod==='cod'&&<div className="w-2 h-2 bg-white rounded-full"/>}</div><div><p className="font-bold text-sm">Cash on Delivery</p><p className="text-xs text-gray-500">Pay when you receive</p></div></div>💵</div>
                                <div onClick={() => setPaymentMethod('online')} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between ${paymentMethod==='online'?'border-black bg-yellow-50/50':'border-gray-100'}`}><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod==='online'?'border-black bg-black':''}`}>{paymentMethod==='online'&&<div className="w-2 h-2 bg-white rounded-full"/>}</div><div><p className="font-bold text-sm">Pay Online</p><p className="text-xs text-gray-500">UPI / Card / Net Banking</p></div></div>⚡</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black rounded-[24px] p-6 h-fit lg:sticky top-6 text-white">
                        <h2 className="font-bold text-lg flex justify-between">Order Summary <span className="text-xs font-normal bg-white/10 px-3 py-1 rounded-full">{cartItems.length} items</span></h2>
                        <div className="space-y-3 mt-5 max-h-[260px] overflow-auto">
                            {cartItems.map(i=><div key={i.productId || i._id} className="flex gap-3 text-sm"><img src={i.imageUrl || i.image} className="w-12 h-12 rounded-xl bg-white object-cover"/><div className="flex-1"><p className="font-medium line-clamp-1">{i.name}</p><p className="text-xs text-zinc-400">Qty {i.qty} • ₹{Number(i.price).toFixed(2)}</p></div><p className="font-bold">₹{(i.price*i.qty).toFixed(2)}</p></div>)}
                        </div>
                        <div className="border-t border-white/10 border-dashed my-5"></div>
                        <div className="flex justify-between text-sm text-zinc-400"><span>Subtotal</span><span className="text-white">₹{subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm text-zinc-400 mt-2"><span>Shipping</span><span className="text-[#FFC300] font-bold">{shipping===0?'FREE':`₹${shipping}`}</span></div>
                        <div className="flex justify-between font-black text-base border-t border-white/10 pt-4 mt-4"><span>Total</span><span className="text-[#FFC300] text-xl">₹{total.toFixed(2)}</span></div>
                        <button disabled={loading} onClick={handlePlaceOrder} className="w-full mt-6 bg-[#FFC300] text-black py-3.5 rounded-full font-black cursor-pointer">{loading?'Processing...': paymentMethod==='cod'? `Place Order • ₹${total.toFixed(2)}`:`Pay Now • ₹${total.toFixed(2)}`}</button>
                        <p className="text-[11px] text-zinc-500 text-center mt-3">🔒 100% Secure Payment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Checkout;