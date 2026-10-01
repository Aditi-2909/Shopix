import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-[70vh] px-6 py-20 text-center sm:text-left sm:px-16 bg-white">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#131A22]">
            Welcome to <span className="text-[#F9C301]">Shopix</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto sm:mx-0">
            Your one-stop shop for all your needs!
        </p>
        <Link to="/Shop" className="inline-block bg-[#131A22] text-white font-bold px-8 py-3.5 rounded-full mt-10 hover:bg-black hover:scale-105 transition-all duration-200 shadow-lg">
            Start Shopping
        </Link>
    </div>
  )
}

export default Home