import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Shopix Logo.jpeg'
import { AuthContext } from '../context/AuthContext'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user, isAdmin } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart?.cartItems || []);
    const [avatar, setAvatar] = useState(localStorage.getItem('shopix_avatar') || null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateAvatar = () => setAvatar(localStorage.getItem('shopix_avatar'));
        window.addEventListener('storage', updateAvatar);
        window.addEventListener('avatarUpdated', updateAvatar);
        window.addEventListener('userUpdated', updateAvatar);
        const interval = setInterval(updateAvatar, 1000);
        return () => {
            window.removeEventListener('storage', updateAvatar);
            window.removeEventListener('avatarUpdated', updateAvatar);
            window.removeEventListener('userUpdated', updateAvatar);
            clearInterval(interval);
        };
    }, []);

    const cartCount = cartItems.reduce((a, c) => a + (c.qty || 1), 0);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="bg-black border-b border-white/10 sticky top-0 z-50 w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">

                <Link to="/" onClick={closeMenu} className="flex items-center gap-2 sm:gap-3 group shrink-0">
                    <img src={logo} alt="Shopix Logo" className="h-9 w-9 sm:h-11 sm:w-11 object-contain group-hover:scale-110 transition-transform" />
                    <span className="text-white text-[20px] sm:text-[24px] font-black tracking-tight group-hover:text-[#F9C301] transition-colors">Shopix</span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-2 sm:gap-4 text-[14px] font-medium">
                    <li>
                        <Link to="/shop" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">Shop</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all flex items-center gap-1.5">
                            Cart <span className="bg-[#F9C301] text-black text-[11px] font-black px-2 py-0.5 rounded-full">{cartCount}</span>
                        </Link>
                    </li>

                    {user ? (
                        <>
                            {isAdmin && (
                                <li>
                                    <Link to="/admin" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-xs font-bold">Admin</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/profile" className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-all group">
                                    <span className="hidden lg:block text-white text-sm font-semibold pl-2">Hi, {user.name?.split(' ')[0]}</span>
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

                {/* Mobile Right Side - Cart + Hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <Link to="/cart" className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                        🛒
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#F9C301] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
                        )}
                    </Link>

                    <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-full bg-white/10 flex flex-col items-center justify-center gap-[5px]">
                        <span className={`w-5 h-[2px] bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                        <span className={`w-5 h-[2px] bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-5 h-[2px] bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-black border-t border-white/10 px-4 pb-5 pt-2 animate-in slide-in-from-top-2">
                    <div className="flex flex-col gap-2">
                        <Link to="/shop" onClick={closeMenu} className="text-white font-bold px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10">🛍️ Shop</Link>
                        <Link to="/cart" onClick={closeMenu} className="text-white font-bold px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 flex justify-between">🛒 Cart <span className="bg-[#F9C301] text-black text-xs font-black px-2.5 py-1 rounded-full">{cartCount}</span></Link>

                        {user ? (
                            <>
                                {isAdmin && (
                                    <Link to="/admin" onClick={closeMenu} className="bg-white text-black font-bold px-4 py-3 rounded-xl text-center">Admin Dashboard</Link>
                                )}
                                <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F9C301] flex items-center justify-center text-black font-black">
                                        {avatar ? <img src={avatar} alt="profile" className="w-full h-full object-cover" /> : (user.name ? user.name[0].toUpperCase() : 'U')}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Hi, {user.name?.split(' ')[0]}</p>
                                        <p className="text-white/50 text-xs">View Profile</p>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <Link to="/login" onClick={closeMenu} className="bg-white text-black font-bold px-4 py-3 rounded-xl text-center">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;