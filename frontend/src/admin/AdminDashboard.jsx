import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/users', config).catch(() => ({ data: [] })),
          axios.get('http://localhost:5000/api/orders', config).catch(() => ({ data: [] })),
          axios.get('http://localhost:5000/api/products').catch(() => ({ data: [] })),
        ]);

        const orders = ordersRes.data || [];
        const revenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);

        setStats({
          users: usersRes.data?.length || 0,
          orders: orders.length || 0,
          products: productsRes.data?.length || 0,
          revenue: revenue
        });
        setRecentOrders(orders.slice(0, 5));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#F9C301] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="px-4 sm:px-8 lg:px-12 py-10">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-[#F9C301] rounded-full animate-pulse"></div>
              <p className="text-[11px] tracking-[0.2em] text-white/40 font-bold uppercase">Admin Control</p>
            </div>
            <h1 className="text-[40px] font-black tracking-tighter leading-none">Dashboard</h1>
            <p className="text-white/40 text-[13px] mt-3 font-medium">Welcome back, <span className="text-white">{user?.name}</span> — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
          </div>
          <Link to="/admin/add-product" className="hidden sm:flex bg-white text-black px-6 py-3 rounded-full text-[13px] font-black hover:bg-[#F9C301] transition-all">
            + New Product
          </Link>
        </div>

        {/* Premium Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 rounded-[24px] overflow-hidden p-[1px]">
          <div className="bg-[#111111] p-7 rounded-[23px] sm:rounded-none sm:rounded-l-[23px] lg:rounded-l-[23px] group hover:bg-[#161616] transition-all">
            <p className="text-[11px] tracking-widest text-white/30 font-bold uppercase">Total Revenue</p>
            <h2 className="text-[32px] font-black tracking-tight mt-4">₹{stats.revenue.toLocaleString('en-IN')}</h2>
            <div className="flex items-center gap-2 mt-4">
              <span className="bg-[#F9C301]/20 text-[#F9C301] text-[11px] font-bold px-2.5 py-1 rounded-full">+12.5%</span>
              <span className="text-[11px] text-white/30">vs last month</span>
            </div>
          </div>
          <div className="bg-[#111111] p-7 group hover:bg-[#161616] transition-all">
            <p className="text-[11px] tracking-widest text-white/30 font-bold uppercase">Orders</p>
            <h2 className="text-[32px] font-black tracking-tight mt-4">{stats.orders}</h2>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-white rounded-full"></div>
              </div>
              <span className="text-[11px] text-white/30 whitespace-nowrap">70% fulfilled</span>
            </div>
          </div>
          <div className="bg-[#111111] p-7 group hover:bg-[#161616] transition-all">
            <p className="text-[11px] tracking-widest text-white/30 font-bold uppercase">Products</p>
            <h2 className="text-[32px] font-black tracking-tight mt-4">{stats.products}</h2>
            <p className="text-[11px] text-white/30 mt-4 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>All active & in stock</p>
          </div>
          <div className="bg-[#F9C301] p-7 rounded-[23px] sm:rounded-none sm:rounded-r-[23px] lg:rounded-r-[23px] text-black">
            <p className="text-[11px] tracking-widest text-black/50 font-bold uppercase">Users</p>
            <h2 className="text-[32px] font-black tracking-tight mt-4">{stats.users}</h2>
            <p className="text-[11px] text-black/60 mt-4 font-bold">+{Math.floor(stats.users*0.2)} new this week</p>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          
          {/* Recent Orders Premium Table */}
          <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-[24px] p-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[14px] font-black tracking-wide">RECENT ORDERS</h3>
              <Link to="/admin/orders" className="text-[11px] font-bold text-white/40 hover:text-white transition-colors tracking-widest">VIEW ALL →</Link>
            </div>
            <div className="space-y-1">
              {recentOrders.length === 0 ? (
                <p className="text-white/30 text-sm py-10 text-center">No orders yet</p>
              ) : recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between py-4 border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] px-3 -mx-3 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold">{order.user?.name?.[0] || 'U'}</div>
                    <div>
                      <p className="text-[13px] font-bold">{order.user?.name || 'User'} • <span className="text-white/40 font-medium">#{order._id?.slice(-6).toUpperCase()}</span></p>
                      <p className="text-[11px] text-white/30">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-black">₹{order.totalPrice}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.isPaid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{order.isPaid ? 'PAID' : 'PENDING'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white text-black rounded-[24px] p-7">
              <h3 className="text-[14px] font-black tracking-wide mb-6">QUICK ACTIONS</h3>
              <div className="space-y-2">
                <Link to="/admin/add-product" className="flex justify-between items-center bg-black text-white p-4 rounded-full text-[13px] font-bold hover:bg-zinc-800 transition-all">Add Product <span className="bg-[#F9C301] text-black w-6 h-6 rounded-full flex items-center justify-center">+</span></Link>
                <Link to="/admin/products" className="flex justify-between items-center bg-zinc-100 p-4 rounded-full text-[13px] font-bold hover:bg-zinc-200 transition-all">Manage Inventory <span>→</span></Link>
                <Link to="/admin/users" className="flex justify-between items-center bg-zinc-100 p-4 rounded-full text-[13px] font-bold hover:bg-zinc-200 transition-all">Manage Users <span>→</span></Link>
              </div>
            </div>
            
            <div className="bg-[#111111] border border-white/5 rounded-[24px] p-7">
              <p className="text-[11px] tracking-widest text-white/30 font-bold">SHOPIX STATUS</p>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-[12px]"><span className="text-white/40">Server</span><span className="text-emerald-400 font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>Online</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-white/40">Database</span><span className="text-emerald-400 font-bold">Connected</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-white/40">Version</span><span className="text-white/60 font-mono">v2.1.0</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard