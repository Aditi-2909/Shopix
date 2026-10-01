import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Shopix.png'

const Footer = () => {
    return (
        <footer className="bg-[#131A22] text-gray-300 p-8 mt-10 border-t border-white/10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Logo Part - Navbar er moto boro transparent */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Shopix Logo" className="h-16 w-auto object-contain sm:h-20" />
                    <span className="text-white text-2xl font-extrabold">Shopix</span>
                </Link>

                {/* Menu Part - tor ul li same ache */}
                <ul className="flex items-center gap-6">
                    <li>
                        <Link to="/about" className="text-white/70 hover:text-white transition-colors duration-200 font-medium">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-white/70 hover:text-white transition-colors duration-200 font-medium">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/privacy" className="text-white/70 hover:text-white transition-colors duration-200 font-medium">
                            Privacy Policy
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="border-t border-white/10 mt-6 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Shopix. All rights reserved.
            </div>
        </footer>
    )
}
export default Footer;