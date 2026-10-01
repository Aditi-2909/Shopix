import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Shopix.png'

const Navbar = () => {
    return (
        <nav className="bg-[#131A22] p-2 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Shopix Logo" className="h-16 w-auto object-contain sm:h-20" />
                    <span className="text-white text-2xl font-extrabold">Shopix</span>
                </Link>
            
                <ul className="flex items-center gap-7">
                    <li>
                        <Link to="/Shop" className="text-white/90 hover:text-white font-semibold uppercase">Shop</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-white/90 hover:text-white font-semibold uppercase">Cart</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="bg-[#F9C301] text-black font-bold px-6 py-2 rounded-sm">Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;