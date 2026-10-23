import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Shopix Logo.jpeg'
import { AuthContext } from '../context/AuthContext'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart?.cartItems || []);
    const [avatar, setAvatar] = useState(localStorage.getItem('shopix_avatar') || null);

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

    return (
        <nav className="bg-black border-b border-white/10 sticky top-0 z-50 w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">

                <Link to="/" className="flex items-center gap-3 group">
                    <img src={logo} alt="Shopix Logo" className="h-11 w-11 object-contain group-hover:scale-110 transition-transform" />
                    <span className="text-white text-[24px] font-black tracking-tight group-hover:text-[#F9C301] transition-colors">Shopix</span>
                </Link>

                <ul className="flex items-center gap-2 sm:gap-4 text-[14px] font-medium">
                    <li>
                        <Link to="/shop" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">Shop</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all flex items-center gap-1.5">
                            Cart <span className="bg-[#F9C301] text-black text-[11px] font-black px-2 py-0.5 rounded-full">{cartItems.reduce((a,c)=>a + (c.qty||1),0)}</span>
                        </Link>
                    </li>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <li>
                                    <Link to="/admin" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-xs font-bold">Admin</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/profile" className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-all group">
                                    <span className="hidden sm:block text-white text-sm font-semibold pl-2">Hi, {user.name?.split(' ')[0]}</span>
                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F9C301] border-2 border-white/20 flex items-center justify-center text-black font-black text-sm group-hover:border-[#F9C301] transition-all">
                                        {avatar ? <img src={avatar} alt="profile" className="w-full h-full object-cover" /> : (user.name ? user.name[0].toUpperCase() : 'U')}
                                    </div>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="bg-white text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#F9C301] transition-all">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;