import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-[#f6f7ff]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-violet-100 border-b border-black/5">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl"></div>
        <div className="absolute -bottom-10 right-20 h-80 w-80 rounded-full bg-violet-400/30 blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex rounded-full bg-[#131A22] px-4 py-1.5 text-[11px] md:text-xs font-bold tracking-widest text-[#F9C301] hover:bg-black hover:scale-105 transition-all cursor-pointer">
              OUR STORY • 2026
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-[#131A22] leading-[0.9]">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Shopping</span> That Feels Good
            </h1>
            <p className="mx-auto mt-4 md:mt-6 max-w-2xl text-[14px] md:text-[16px] leading-6 md:leading-7 text-gray-500 px-2">
              Shopix started with a simple idea - shopping should be fast, colorful and honest. No fake discounts, just real products.
            </p>
          </div>

          {/* STATS - Responsive */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {/* 10K+ - GOLD PREMIUM HOVER */}
            <div className="group rounded-[20px] bg-white p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/[0.03] hover:bg-gradient-to-br hover:from-[#F9C301] hover:to-amber-500 hover:shadow-[0_20px_50px_rgba(249,195,1,0.5)] hover:-translate-y-2 hover:border-[#F9C301] transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl md:text-3xl font-black text-[#131A22] group-hover:text-white group-hover:scale-110 transition-all duration-300">1K+</h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-400 mt-1 group-hover:text-white/80 transition-colors">CUSTOMERS</p>
            </div>

            {/* 500+ - BLACK */}
            <div className="group rounded-[20px] bg-[#131A22] p-6 text-center shadow-xl hover:shadow-[0_20px_50px_rgba(19,26,34,0.4)] hover:-translate-y-2 hover:bg-black transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl md:text-3xl font-black text-[#F9C301] group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-300">500+</h3>
              <p className="text-[11px] font-bold tracking-widest text-white/50 mt-1">PRODUCTS</p>
            </div>

            {/* 4.9/5 - VIOLET PREMIUM HOVER */}
            <div className="group rounded-[20px] bg-white p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/[0.03] hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 hover:shadow-[0_20px_50px_rgba(124,58,237,0.5)] hover:-translate-y-2 hover:border-violet-500 transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl md:text-3xl font-black text-[#131A22] group-hover:text-white group-hover:scale-110 transition-all duration-300">4.7/5</h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-400 mt-1 group-hover:text-white/80 transition-colors">RATING</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* MISSION CARDS - Responsive */}
        <div className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-3">
          <div className="group rounded-[24px] bg-white p-7 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] hover:shadow-[0_30px_60px_rgba(249,195,1,0.25)] hover:-translate-y-3 hover:border-[#F9C301]/30 transition-all duration-500 cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F9C301] to-amber-500 text-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">🚀</div>
            <h3 className="mt-5 text-lg font-black text-[#131A22] group-hover:text-amber-500 transition-colors">Our Mission</h3>
            <p className="mt-2 text-[13px] leading-6 text-gray-500">Make premium quality products affordable for every student and family in India.</p>
            <div className="mt-4 h-1 w-0 bg-[#F9C301] group-hover:w-full transition-all duration-500 rounded-full"></div>
          </div>

          <div className="group rounded-[24px] bg-white p-7 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] hover:shadow-[0_30px_60px_rgba(124,58,237,0.3)] hover:-translate-y-3 hover:border-violet-300/50 transition-all duration-500 cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">💜</div>
            <h3 className="mt-5 text-lg font-black text-[#131A22] group-hover:text-violet-600 transition-colors">Our Promise</h3>
            <p className="mt-2 text-[13px] leading-6 text-gray-500">No dropshipping junk. We check every product before listing.</p>
            <div className="mt-4 h-1 w-0 bg-violet-600 group-hover:w-full transition-all duration-500 rounded-full"></div>
          </div>

          <div className="group rounded-[24px] bg-[#131A22] p-7 md:p-8 hover:bg-black hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-3 transition-all duration-500 cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl group-hover:bg-[#F9C301] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">🌍</div>
            <h3 className="mt-5 text-lg font-black text-white group-hover:text-[#F9C301] transition-colors">Our Vision</h3>
            <p className="mt-2 text-[13px] leading-6 text-white/60">To be India's most loved personal e-commerce brand.</p>
            <div className="mt-4 h-1 w-0 bg-[#F9C301] group-hover:w-full transition-all duration-500 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About