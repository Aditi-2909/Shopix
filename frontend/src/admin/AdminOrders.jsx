import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/orders', config);
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const markDelivered = async (orderId) => {
    if(!window.confirm('Mark as Delivered?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/orders/${orderId}/deliver`, {}, config);
      setOrders(orders.map(o => o._id === orderId ? {...o, isDelivered: true, deliveredAt: new Date().toISOString()} : o));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  const filtered = orders.filter(o => {
    if(filter === 'paid') return o.isPaid
    if(filter === 'pending') return !o.isDelivered
    if(filter === 'delivered') return o.isDelivered
    return true
  })

  if (loading) return (
    <div className="flex items-center justify-center py-40">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#F9C301] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-[32px] font-black tracking-tighter">Orders</h1>
          <p className="text-white/40 text-[13px] mt-1">{orders.length} total • Revenue ₹{orders.reduce((a,c)=>a+c.totalPrice,0).toLocaleString('en-IN')}</p>
        </div>
        <div className="flex gap-1 bg-[#111111] border border-white/5 p-1 rounded-full">
          {[
            {k:'all', l:'All'},
            {k:'paid', l:'Paid'},
            {k:'pending', l:'Pending'},
            {k:'delivered', l:'Delivered'},
          ].map(f=>(
            <button key={f.k} onClick={()=>setFilter(f.k)} className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${filter===f.k ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>{f.l}</button>
          ))}
        </div>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-[24px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-[10px] tracking-[0.15em] text-white/30 font-bold uppercase">
                <th className="text-left p-5 pl-7">Order ID</th>
                <th className="text-left p-5">Customer</th>
                <th className="text-left p-5">Date</th>
                <th className="text-left p-5">Amount</th>
                <th className="text-left p-5">Status</th>
                <th className="text-right p-5 pr-7">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order._id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-all">
                  <td className="p-5 pl-7 font-mono text-[12px] text-white/80">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="p-5">
                    <p className="text-[13px] font-bold">{order.user?.name || order.shippingAddress?.fullName || 'Guest'}</p>
                    <p className="text-[11px] text-white/30">{order.user?.email || ''}</p>
                  </td>
                  <td className="p-5 text-[12px] text-white/50">{new Date(order.createdAt).toLocaleDateString('en-IN', {day:'2-digit', month:'short'})}</td>
                  <td className="p-5 text-[14px] font-black">₹{order.totalPrice}</td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide ${order.isPaid ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/15 text-red-400 border border-red-500/20'}`}>{order.isPaid ? 'PAID' : 'UNPAID'}</span>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide ${order.isDelivered ? 'bg-white text-black' : 'bg-[#F9C301]/15 text-[#F9C301] border border-[#F9C301]/20'}`}>{order.isDelivered ? 'DELIVERED' : 'PROCESSING'}</span>
                    </div>
                  </td>
                  <td className="p-5 pr-7 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/order/${order._id}`} className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-bold hover:bg-white hover:text-black transition-all">View</Link>
                      {!order.isDelivered && <button onClick={()=>markDelivered(order._id)} className="bg-[#F9C301] text-black px-3.5 py-1.5 rounded-full text-[11px] font-black hover:bg-white transition-all">Deliver</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="py-20 text-center text-white/30 text-sm">No {filter} orders</p>}
      </div>
    </div>
  )
}

export default AdminOrders