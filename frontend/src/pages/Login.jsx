import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
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
            {/* Animated Border Wrapper */}
            <div className="relative w-full max-w-[360px] p-[1.5px] rounded-[16px] overflow-hidden group">
                {/* Rotating Light */}
                <div className="absolute inset-0 -top-1/2 -left-1/2 w-[200%] h-[200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#FFC107_85%,#000_90%,transparent_100%)]"></div>
                <div className="absolute inset-0 -top-1/2 -left-1/2 w-[200%] h-[200%] animate-[spin_3s_linear_infinite_reverse] bg-[conic-gradient(from_180deg,transparent_0%,transparent_70%,#fff_85%,#FFC107_90%,transparent_100%)] opacity-60"></div>

                {/* Inner Card - Tomar ager style */}
                <div className="relative bg-white p-7 rounded-[15px] shadow-lg">
                    <h2 className="text-[18px] font-bold text-center mb-6">Sign In</h2>
                    <p className="text-[12px] text-gray-500 text-center mt-1 mb-6">
                        Login to continue to Shopix
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        <input
                            className="w-full p-3 bg-[#eef4ff] border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition-all"
                            placeholder="hello@gmail.com"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="w-full p-3 bg-[#eef4ff] border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition-all"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button className="w-full bg-black text-white py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-zinc-800 transition-all">
                            Login
                        </button>
                    </form>

                    <p className="text-center text-[13px] mt-4">
                        Don't have an account? <Link to="/register" className="font-bold">Register</Link>
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes spin_reverse {
          to { transform: rotate(-360deg); }
        }
      `}</style>
        </div>
    );
};

export default Login;