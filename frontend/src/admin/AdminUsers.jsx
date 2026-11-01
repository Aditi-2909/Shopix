import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/users', config);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  const deleteUser = async (id) => {
    if (id === user._id) return alert("You can't delete yourself");
    if (!window.confirm('Delete this user?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/users/${id}`, config);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed - Cannot delete admin');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#F9C301] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 lg:px-12 py-10">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-[32px] font-black tracking-tighter">Users</h1>
          <p className="text-white/40 text-[13px] mt-1">{users.length} registered users • {users.filter(u=>u.role==='admin').length} admins</p>
        </div>
        <Link to="/admin" className="text-[11px] font-bold tracking-widest text-white/30 hover:text-white">← DASHBOARD</Link>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-[24px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-[11px] tracking-widest text-white/30 font-bold uppercase">
                <th className="text-left p-5 pl-7">User</th>
                <th className="text-left p-5">Email</th>
                <th className="text-left p-5">Role</th>
                <th className="text-left p-5">Joined</th>
                <th className="text-right p-5 pr-7">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-all group">
                  <td className="p-5 pl-7">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F9C301] text-black flex items-center justify-center font-black text-[13px]">{u.name?.[0]?.toUpperCase()}</div>
                      <p className="text-[13px] font-bold group-hover:text-[#F9C301] transition-colors">{u.name}</p>
                    </div>
                  </td>
                  <td className="p-5 text-[12px] text-white/60">{u.email}</td>
                  <td className="p-5">
                    {u.role === 'admin' || u.email === 'admin@gmail.com' ? (
                      <span className="bg-white text-black text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest">ADMIN</span>
                    ) : (
                      <span className="bg-white/10 border border-white/10 text-white/50 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest">USER</span>
                    )}
                  </td>
                  <td className="p-5 text-[12px] text-white/40">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="p-5 pr-7 text-right">
                    <button onClick={()=>deleteUser(u._id)} disabled={u.email==='admin@gmail.com'} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all text-[12px] ml-auto disabled:opacity-20 disabled:cursor-not-allowed">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-[#F9C301]/10 border border-[#F9C301]/20 rounded-[16px] p-4 flex gap-3">
        <span className="text-[#F9C301]">⚠️</span>
        <p className="text-[12px] text-[#F9C301]/80 leading-relaxed"><b>Note:</b> admin@gmail.com cannot be deleted. This is the primary owner of Shopix store.</p>
      </div>
    </div>
  )
}

export default AdminUsers