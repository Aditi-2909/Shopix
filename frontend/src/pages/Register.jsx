import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
      const data = await res.json();
      if (res.ok) { alert('Registration Successfull! Please check your email for the Welcome OTP.'); login(data); navigate('/'); } else { alert(data.message); }
    } catch (error) { console.error(error); }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#fffdf0] to-[#fff9c2]">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#FFC300]/30 to-yellow-200/30 rounded-full blur-[80px] animate-[float1_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-black/5 to-zinc-200/40 rounded-full blur-[80px] animate-[float2_10s_ease-in-out_infinite]"></div>
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-[#FFC300]/20 rounded-full blur-[60px] animate-[float3_7s_ease-in-out_infinite]"></div>

      <div className="w-full max-w-[400px] relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight">Shopix<span className="text-[#FFC300]">.</span></h1>
          <p className="text-sm text-gray-500 font-medium mt-2">Join Shopix today</p>
        </div>

        <div className="relative bg-white/80 backdrop-blur-xl rounded-[28px] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC300]/15 rounded-full blur-[30px] -mr-10 -mt-10"></div>
          <div className="relative">
            <h2 className="text-[20px] font-black tracking-tight">Create Account</h2>
            <p className="text-[13px] text-gray-500 font-medium mt-1 mb-7">Start your shopping journey</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-[11px] font-black tracking-widest text-gray-400 uppercase ml-1">Full Name</label><input className="w-full mt-2 p-4 bg-[#f9f9f9] border border-gray-100 rounded-2xl text-[14px] font-medium outline-none focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 transition-all" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} required /></div>
              <div><label className="text-[11px] font-black tracking-widest text-gray-400 uppercase ml-1">Email</label><input className="w-full mt-2 p-4 bg-[#f9f9f9] border border-gray-100 rounded-2xl text-[14px] font-medium outline-none focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 transition-all" placeholder="hello@gmail.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
              <div><label className="text-[11px] font-black tracking-widest text-gray-400 uppercase ml-1">Password</label><input className="w-full mt-2 p-4 bg-[#f9f9f9] border border-gray-100 rounded-2xl text-[14px] font-medium outline-none focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 transition-all" placeholder="••••••••" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
              <button className="w-full bg-black text-white py-4 rounded-full text-[14px] font-black tracking-tight hover:bg-zinc-900 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] mt-2 flex items-center justify-center gap-2">Create Account <span className="bg-[#FFC300] text-black text-[10px] px-2 py-0.5 rounded-full font-black">FREE</span></button>
            </form>
            <div className="flex items-center gap-3 my-6"><div className="h-[1px] flex-1 bg-gray-100"></div><span className="text-[11px] font-bold text-gray-400">OR</span><div className="h-[1px] flex-1 bg-gray-100"></div></div>
            <p className="text-center text-[13px] font-medium text-gray-600">Already have account? <Link to="/login" className="font-black text-black hover:text-[#FFC300] transition-colors">Login</Link></p>
          </div>
        </div>
        <p className="text-center text-[11px] text-gray-400 font-medium mt-6">By registering, you agree to our Terms • Shopix © 2026</p>
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px, 30px) scale(1.1); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px, -20px) scale(1.15); } }
        @keyframes float3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px, -30px); } }
      `}</style>
    </div>
  );
};
export default Register;