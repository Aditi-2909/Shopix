import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Shopix Logo.jpeg'

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 mt-auto border-t border-white/10 w-full">
            <div className="w-full px-4 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Logo - BORO & CLEAN - Navbar er moto */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src={logo}
                        alt="Shopix Logo"
                        className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-white text-[22px] font-black tracking-tight group-hover:text-[#F9C301] transition-colors">Shopix</span>
                </Link>

                {/* Menu */}
                <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
                    <li>
                        <Link to="/about" className="text-[13px] font-bold tracking-widest uppercase text-white/50 hover:text-[#F9C301] transition-colors">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-[13px] font-bold tracking-widest uppercase text-white/50 hover:text-[#F9C301] transition-colors">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/return-policy" className="text-[13px] font-bold tracking-widest uppercase text-white/50 hover:text-[#F9C301] transition-colors">
                            Return Policy
                        </Link>
                    </li>
                    <li>
                        <Link to="/privacy" className="text-[13px] font-bold tracking-widest uppercase text-white/50 hover:text-[#F9C301] transition-colors">
                            Privacy
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="border-t border-white/5 w-full px-4 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
                <p className="text-[12px] text-white/30 font-medium">
                    © {new Date().getFullYear()} Shopix — Crafted with <span className="text-red-500/50">♥</span> for better shopping experience.
                </p>
                <a href="mailto:shopixecommerce0@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    shopixecommerce0@gmail.com
                </a>
            </div>
        </footer>
    )
}
export default Footer;