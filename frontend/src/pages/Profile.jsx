import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [profilePic, setProfilePic] = useState(localStorage.getItem('shopix_avatar') || null);
  const [displayName, setDisplayName] = useState('');
  const [editName, setEditName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  const userInfoRaw = user || JSON.parse(localStorage.getItem('userInfo') || localStorage.getItem('user') || 'null');
  const userInfo = userInfoRaw?.user || userInfoRaw;

  const getOrderTotal = (order) => {
    return order.totalPrice || order.totalAmount || order.total || order.amount || order.grandTotal || 0;
  };

  // STATUS COLOR LOGIC
  const getStatusStyle = (status) => {
    const s = (status || 'pending').toLowerCase();
    if (s === 'delivered') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'shipped') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s === 'processing') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (s === 'cancelled' || s === 'canceled') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'pending') return 'bg-[#FFF8D6] text-[#B89600] border-[#FFC300]/40';
    return 'bg-zinc-100 text-zinc-600 border-zinc-200';
  };

  const getStatusDot = (status) => {
    const s = (status || 'pending').toLowerCase();
    if (s === 'delivered') return 'bg-green-500';
    if (s === 'shipped') return 'bg-blue-500';
    if (s === 'processing') return 'bg-orange-500';
    if (s === 'cancelled') return 'bg-red-500';
    return 'bg-[#FFC300]';
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setDisplayName(userInfo.name || userInfo.username || '');
    setEditName(userInfo.name || userInfo.username || '');
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      setLoadingOrders(true);
      const API = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${userInfo.token || user?.token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } else {
        if (res.status === 401) {
          logout();
          navigate('/login');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
      localStorage.setItem('shopix_avatar', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const totalSpent = orders.reduce((a,c) => a + Number(getOrderTotal(c)), 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          My <span className="text-[#FFC300]">Profile</span>
        </h1>
        <p className="text-gray-500 mt-3 text-[15px]">Manage your account and track your orders.</p>
        
        <div className="flex justify-center gap-3 mt-8">
           <button onClick={()=>setActiveTab('overview')} className={`cursor-pointer px-7 py-2.5 rounded-full text-sm font-semibold transition-all shadow ${activeTab==='overview' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border text-gray-700 hover:bg-gray-50'}`}>Overview</button>
           <button onClick={()=>setActiveTab('orders')} className={`cursor-pointer px-7 py-2.5 rounded-full text-sm font-semibold transition-all shadow ${activeTab==='orders' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border text-gray-700 hover:bg-gray-50'}`}>Orders <span className="ml-1 bg-[#FFC300] text-black text-[11px] px-2 py-0.5 rounded-full">{orders.length}</span></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-7 sticky top-24 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FFC300]"></div>
            
            <div className="flex flex-col items-center text-center mt-2">
              <div className="relative group">
                <img
                  src={profilePic || `https://ui-avatars.com/api/?name=${displayName}&background=111&color=FFC300&bold=true`}
                  className="w-28 h-28 rounded-full object-cover border-[5px] border-white shadow-xl"
                  alt="avatar"
                />
                <button onClick={() => fileRef.current.click()} className="absolute -bottom-1 -right-1 bg-gray-900 text-white p-2.5 rounded-full shadow-lg hover:bg-black transition cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                </button>
              </div>
              <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleAvatarChange} />
              
              <h2 className="font-bold text-xl mt-5 text-gray-900">{displayName}</h2>
              <p className="text-sm text-gray-500">{userInfo?.email}</p>
              
              <div className="mt-4 flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase">
                <span className="bg-black text-white px-3 py-1 rounded-full">Verified</span>
                <span className="bg-[#FFC300] text-black px-3 py-1 rounded-full">Shopix Member</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">Total Spent</p>
                <p className="text-xl font-extrabold mt-1">₹{totalSpent.toLocaleString()}</p>
              </div>
              <button onClick={logout} className="w-full mt-2 bg-red-50 text-red-600 hover:bg-red-100 py-3 rounded-xl font-semibold text-sm transition cursor-pointer">Logout Account</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {activeTab === 'overview' && (
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8">
              <h3 className="text-xl font-bold text-gray-900">Account Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white border rounded-2xl p-5">
                  <p className="text-[11px] tracking-widest text-gray-400 uppercase font-bold">Full Name</p>
                  <p className="font-semibold text-gray-900 mt-2">{displayName}</p>
                </div>
                <div className="bg-white border rounded-2xl p-5">
                  <p className="text-[11px] tracking-widest text-gray-400 uppercase font-bold">Email Address</p>
                  <p className="font-semibold text-gray-900 mt-2">{userInfo?.email}</p>
                </div>
                <div className="bg-gray-900 rounded-2xl p-5 text-white">
                  <p className="text-[11px] tracking-widest text-gray-400 uppercase font-bold">Total Orders</p>
                  <p className="font-bold text-3xl mt-2">{orders.length} <span className="text-[#FFC300] text-lg">Orders</span></p>
                </div>
                <div className="bg-[#FFC300] rounded-2xl p-5">
                  <p className="text-[11px] tracking-widest text-black/60 uppercase font-bold">Quick Action</p>
                  <Link to="/shop" className="font-bold text-black mt-2 block cursor-pointer">Start Shopping →</Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className="text-[22px] font-bold text-gray-900 mb-6">Featured Orders</h3>
              {loadingOrders ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[1,2,3,4].map(i => <div key={i} className="h-48 bg-gray-100 rounded-[20px] animate-pulse"></div>)}
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-[24px] p-16 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center text-2xl">🛒</div>
                  <p className="text-gray-900 font-bold mt-4">No orders yet</p>
                  <p className="text-sm text-gray-500 mt-1">Your order history will appear here like products.</p>
                  <Link to="/shop" className="mt-6 inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg cursor-pointer">Start Shopping</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {orders.map((order) => (
                    <div key={order._id} className="group bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">Order #{order._id.slice(-6).toUpperCase()}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()} • {order.isPaid ? 'Paid' : 'COD'}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border ${getStatusStyle(order.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(order.status)}`}></span>
                            {order.status || 'pending'}
                          </span>
                        </div>
                        <div className="mt-5 space-y-3">
                          {(order.items || order.orderItems)?.slice(0, 2).map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 border flex items-center justify-center overflow-hidden">
                                <img src={item.image || item.imageUrl || `https://via.placeholder.com/100`} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.name || 'Product'}</p>
                                <p className="text-xs text-gray-500">Qty: {item.qty || item.quantity || 1}</p>
                              </div>
                              <p className="text-sm font-bold">₹{item.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-4 flex justify-between items-center border-t">
                        <p className="font-extrabold text-[15px]">₹{getOrderTotal(order)}</p>
                        <Link to={`/order/${order._id}`} className="bg-gray-900 group-hover:bg-[#FFC300] group-hover:text-black text-white text-xs font-bold px-5 py-2.5 rounded-full transition cursor-pointer">VIEW DETAILS</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;