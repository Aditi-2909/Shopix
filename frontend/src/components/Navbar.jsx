import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Shopix Logo.jpeg'
import { AuthContext } from '../context/AuthContext'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart?.cartItems || []);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(localStorage.getItem('shopix_avatar') || null);

    // Avatar sync - profile theke change korle navbar e auto asbe
    useEffect(() => {
        const updateAvatar = () => setAvatar(localStorage.getItem('shopix_avatar'));
        window.addEventListener('storage', updateAvatar);
        window.addEventListener('avatarUpdated', updateAvatar);
        const interval = setInterval(updateAvatar, 1000);
        return () => {
            window.removeEventListener('storage', updateAvatar);
            window.removeEventListener('avatarUpdated', updateAvatar);
            clearInterval(interval);
        };
    }, []);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('shopix_avatar');
        navigate('/login');
    };

    return (
        <nav className="bg-black border-b border-white/10 sticky top-0 z-50 w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">

                {/* Logo - Tor style tai rakhlm */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src={logo}
                        alt="Shopix Logo"
                        className="h-11 w-11 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-white text-[24px] font-black tracking-tight group-hover:text-[#F9C301] transition-colors">
                        Shopix
                    </span>
                </Link>

                {/* Links */}
                <ul className="flex items-center gap-2 sm:gap-5 text-[14px] font-medium">
                    <li>
                        <Link to="/shop" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all flex items-center gap-1">
                            Cart <span className="bg-[#F9C301] text-black text-xs font-bold px-2 py-0.5 rounded-full">{cartItems.length}</span>
                        </Link>
                    </li>

                    {user? (
                        <>
                            <li>
                                <Link to="/profile" className="flex items-center gap-2.5 text-white/80 hover:text-white px-2 py-1 rounded-full hover:bg-white/10 transition-all group">
                                    <span className="hidden sm:block">Hi, {user.name?.split(' ')[0]}</span>
                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F9C301] border-2 border-[#F9C301]/30 flex items-center justify-center text-black font-black text-sm group-hover:border-[#F9C301] group-hover:scale-105 transition-all">
                                        {avatar? (
                                            <img src={avatar} alt="profile" className="w-full h-full object-cover" />
                                        ) : (
                                            user.name? user.name[0].toUpperCase() : 'U'
                                        )}
                                    </div>
                                </Link>
                            </li>
                            {user.role === 'admin' && (
                                <li>
                                    <Link to="/admin" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                                        Admin
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button onClick={handleLogout} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full transition-all">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="bg-white text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#F9C301] transition-all">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar