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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration Successfull! Please check your email for the Welcome OTP.');
        login(data);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#f9fafb] px-4">
      {/* Same Animated Light Border as Login */}
      <div className="relative w-full max-w-[360px] p-[1.5px] rounded-[16px] overflow-hidden">
        <div className="absolute inset-0 -top-1/2 -left-1/2 w-[200%] h-[200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#FFC107_85%,#000_90%,transparent_100%)]"></div>

        <div className="relative bg-white p-7 rounded-[15px]">
          <h2 className="text-[18px] font-bold text-center">Create Account</h2>
          <p className="text-[12.5px] text-gray-500 text-center mt-1 mb-6">
            Join Shopix to start shopping
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <input
              className="w-full p-3 bg-[#eef4ff] border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition-all"
              placeholder="Full Name"
              value={name}
              onChange={e=>setName(e.target.value)}
              required
            />
            <input
              className="w-full p-3 bg-[#eef4ff] border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition-all"
              placeholder="hello@gmail.com"
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />
            <input
              className="w-full p-3 bg-[#eef4ff] border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition-all"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
            />
            <button className="w-full bg-black text-white py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-zinc-800 transition-all">
              Register
            </button>
          </form>

          <p className="text-center text-[13px] mt-4 text-gray-600">
            Already have account? <Link to="/login" className="font-bold text-black">Login</Link>
          </p>
        </div>
      </div>

      <style>{` @keyframes spin { to { transform: rotate(360deg); } } `}</style>
    </div>
  );
};

export default Register;