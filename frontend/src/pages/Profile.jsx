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
  const [uploading, setUploading] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const userInfoRaw = user || JSON.parse(localStorage.getItem('userInfo') || localStorage.getItem('user') || 'null');
  const [userInfo, setUserInfoState] = useState(userInfoRaw);

  const getToken = () => {
    try {
      const raw = localStorage.getItem('userInfo') || localStorage.getItem('user');
      const parsed = JSON.parse(raw || '{}');
      return parsed.token || parsed?.user?.token || userInfo?.token;
    } catch { return userInfo?.token; }
  };

  useEffect(() => {
    if (userInfoRaw) {
      const name = userInfoRaw.name || userInfoRaw.user?.name || '';
      setDisplayName(name);
      setEditName(name);
      setUserInfoState(userInfoRaw);
    }
  }, []);

  useEffect(() => {
    if (!userInfoRaw) {
      navigate('/login?redirect=/profile');
      return;
    }
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await fetch(`/api/orders/myorders`, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` }
        });
        const data = await res.json();
        const orderList = Array.isArray(data)? data : data.orders || data.data || [];
        setOrders(orderList);
      } catch (e) {
        console.log("Order fetch error", e);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const totalSpent = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  const updateLocalUser = (newName) => {
    setDisplayName(newName);
    setUserInfoState(prev => ({...prev, name: newName, user: {...(prev?.user||{}), name: newName}}));
    setEditName(newName);

    if (setUser) {
      setUser(prev => {
        if (!prev) return { name: newName, email: userInfoRaw?.email };
        if (prev.user) {
          return {...prev, user: {...prev.user, name: newName}, name: newName };
        }
        return {...prev, name: newName };
      });
    }

    ['userInfo', 'user'].forEach(key => {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      try {
        let parsed = JSON.parse(raw);
        if (parsed.name) parsed.name = newName;
        if (parsed.user) parsed.user.name = newName;
        localStorage.setItem(key, JSON.stringify(parsed));
      } catch {}
    });

    window.dispatchEvent(new Event('avatarUpdated'));
    window.dispatchEvent(new Event('userUpdated'));
  };

  // ✅ FINAL FIXED - PERMANENT SAVE TO /api/auth/profile
  const handleUpdateName = async () => {
    const newName = editName.trim();
    if (!newName) { alert("Name cannot be empty"); return; }
    if (newName === displayName) { setIsEditingName(false); return; }

    setSavingName(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newName })
      });

      const data = await res.json();
      console.log("Update response:", data);

      if (!res.ok) throw new Error(data.message || 'Update failed');

      // Backend success - permanent
      updateLocalUser(data.name);
      setIsEditingName(false);

    } catch (e) {
      console.error("Update error:", e);
      alert("Failed: " + e.message);
    } finally {
      setSavingName(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Max 2MB"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
      localStorage.setItem('shopix_avatar', reader.result);
      window.dispatchEvent(new Event('avatarUpdated'));
    };
    reader.readAsDataURL(file);
    setUploading(true);
    try {
      const fd = new FormData(); fd.append('avatar', file);
      await fetch(`/api/user/avatar`, { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: fd });
    } catch {} finally { setUploading(false); }
  };

  const handleLogout = () => {
    logout? logout() : localStorage.clear();
    localStorage.removeItem('shopix_avatar');
    navigate('/');
  };

  if (!userInfoRaw) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#fffdf0] to-[#fff9c2] py-8 px-4">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#FFC300]/30 to-yellow-200/30 rounded-full blur-[80px] animate-[float1_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-black/5 to-zinc-200/40 rounded-full blur-[80px] animate-[float2_10s_ease-in-out_infinite]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-black rounded-[28px] p-7 md:p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC300]/20 rounded-full blur-[50px] -mr-20 -mt-20"></div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-[22px] overflow-hidden bg-[#FFC300] flex items-center justify-center text-black font-black text-3xl shadow-lg border-2 border-[#FFC300]">
                {profilePic? <img src={profilePic} className="w-full h-full object-cover" /> : (displayName? displayName[0].toUpperCase() : 'U')}
              </div>
              <button onClick={() => fileRef.current.click()} className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                {uploading? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span> : <span className="text-[14px]">📷</span>}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black tracking-tight">{displayName || 'Shopix User'} <span className="text-[#FFC300]">.</span></h1>
              <p className="text-zinc-400 text-sm font-medium mt-1">{userInfo.email}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide">VERIFIED</span>
                <span className="bg-[#FFC300] text-black px-3 py-1 rounded-full text-[11px] font-black">{loadingOrders? '...' : `${orders.length} ORDERS`}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-white/10 hover:bg-white/15 border border-white/10 px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer">Logout</button>
          </div>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-6 mt-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-3 h-fit">
            {[
              { id: 'overview', label: 'Overview', icon: '◧' },
              { id: 'orders', label: 'My Orders', icon: '📦' },
              { id: 'address', label: 'Addresses', icon: '📍' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-4 py-3.5 rounded-xl font-bold text-sm flex items-center gap-3 transition-all cursor-pointer ${activeTab === tab.id? 'bg-black text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${activeTab === tab.id? 'bg-[#FFC300] text-black' : 'bg-gray-100'}`}>{tab.icon}</span>{tab.label}
              </button>
            ))}
            <div className="border-t border-gray-100 mt-3 pt-3"><Link to="/" className="w-full px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 text-gray-500 hover:bg-gray-50"><span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">←</span>Back to Shop</Link></div>
          </div>

          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 backdrop-blur-xl rounded-[20px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-5"><p className="text-2xl font-black">{loadingOrders? '...' : orders.length}</p><p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mt-1">Total Orders</p></div>
                  <div className="bg-[#FFC300] rounded-[20px] shadow-[0_8px_30px_rgba(255,195,0,0.3)] p-5"><p className="text-2xl font-black text-black">₹{loadingOrders? '...' : totalSpent.toFixed(2)}</p><p className="text-[11px] font-black text-black/60 tracking-widest uppercase mt-1">Total Spent</p></div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-[15px]">Personal Info</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setIsEditingName(!isEditingName)} className="text-[12px] font-black bg-white border border-gray-200 text-black px-4 py-2 rounded-full hover:bg-gray-50 transition-all cursor-pointer">
                        {isEditingName? 'Cancel' : 'Edit Name'}
                      </button>
                      <button onClick={() => fileRef.current.click()} className="text-[12px] font-black bg-black text-white px-4 py-2 rounded-full hover:bg-zinc-800 cursor-pointer">Change Photo</button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-5">
                    <div className="bg-[#f9f9f9] border border-gray-100 rounded-2xl p-4">
                      <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Full Name</p>
                      {isEditingName? (
                        <div className="flex gap-2 mt-2">
                          <input autoFocus value={editName} onChange={e=>setEditName(e.target.value)} onKeyDown={e=> e.key==='Enter' && handleUpdateName()} className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none focus:border-black focus:ring-2 focus:ring-black/5" placeholder="Enter new name" />
                          <button onClick={handleUpdateName} disabled={savingName} className="bg-[#FFC300] text-black px-5 py-2.5 rounded-xl font-black text-xs hover:bg-yellow-400 disabled:opacity-50 transition-all cursor-pointer">
                            {savingName? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      ) : (
                        <p className="font-bold text-sm mt-1 flex items-center gap-2">{displayName} <span onClick={()=>setIsEditingName(true)} className="text-[11px] text-gray-400 cursor-pointer hover:text-black">✏️</span></p>
                      )}
                    </div>
                    <div className="bg-[#f9f9f9] border border-gray-100 rounded-2xl p-4"><p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Email</p><p className="font-bold text-sm mt-1">{userInfo.email}</p></div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-6">
                <h3 className="font-black text-[16px]">My Orders ({orders.length})</h3>
                {loadingOrders? <div className="text-center py-14"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div></div>
                : orders.length === 0? (
                  <div className="text-center py-14"><p className="font-bold">No orders yet</p><button onClick={() => navigate('/')} className="mt-5 bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm cursor-pointer">Start Shopping</button></div>
                ) : (
                  <div className="space-y-3 mt-5">
                    {orders.map(o => (
                      <div key={o._id} className="border border-gray-100 rounded-2xl p-4 flex justify-between items-center bg-[#fcfcfc]">
                        <div><p className="font-bold text-sm">#{o._id?.slice(-6).toUpperCase()} • ₹{o.totalAmount?.toFixed(2)}</p><p className="text-xs text-gray-500 mt-1">{new Date(o.createdAt).toLocaleDateString()} • {o.address?.city}</p></div>
                        <span className={`text-[11px] font-black px-3 py-1 rounded-full ${o.status === 'delivered'? 'bg-green-100 text-green-700' : 'bg-[#FFC300] text-black'}`}>{o.status?.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,30px) scale(1.1); } } @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,-20px) scale(1.15); } }`}</style>
    </div>
  );
};
export default Profile;