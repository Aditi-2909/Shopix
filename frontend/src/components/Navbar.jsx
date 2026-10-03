import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Shopix Logo.jpeg' 

const Navbar = () => {
    return (
        <nav className="bg-black border-b border-white/5 sticky top-0 z-50 w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">

                {/* Logo - BORO & CLEAN */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src={logo}
                        alt="Shopix Logo"
                        className="h-11 w-11 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-white text-[24px] font-black tracking-tight group-hover:text-[#F9C301] transition-colors">Shopix</span>
                </Link>

                <ul className="flex items-center gap-7">
                    <li>
                        <Link to="/shop" className="text-white/70 hover:text-[#F9C301] font-bold uppercase text-[13px] tracking-widest transition-colors">Shop</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-white/70 hover:text-[#F9C301] font-bold uppercase text-[13px] tracking-widest transition-colors">Cart</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="bg-[#F9C301] text-black font-black px-6 py-2.5 rounded-full text-[13px] tracking-wide hover:bg-[#ffcf1f] transition-all hover:scale-105">Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;