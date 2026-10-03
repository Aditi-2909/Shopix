import React from 'react'

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f6f7ff]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-violet-100 border-b border-black/5">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl"></div>
        <div className="absolute -bottom-10 right-20 h-80 w-80 rounded-full bg-violet-400/30 blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex rounded-full bg-[#131A22] px-4 py-1.5 text-[11px] md:text-xs font-bold tracking-widest text-[#F9C301] hover:bg-black hover:scale-105 transition-all cursor-pointer">
              7 DAYS EASY RETURN
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-[#131A22] leading-[0.9]">
              Hassle-Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Returns</span>
            </h1>
            <p className="mx-auto mt-4 md:mt-6 max-w-2xl text-[14px] md:text-[16px] leading-6 md:leading-7 text-gray-500 px-2">
              We want you to love what you ordered. If not, returning is super easy and fast.
            </p>
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="group rounded-[20px] bg-white p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/[0.03] hover:bg-gradient-to-br hover:from-[#F9C301] hover:to-amber-500 hover:shadow-[0_20px_50px_rgba(249,195,1,0.5)] hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl md:text-3xl font-black text-[#131A22] group-hover:text-white group-hover:scale-110 transition-all">7 Days</h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-400 mt-1 group-hover:text-white/80">RETURN WINDOW</p>
            </div>
            <div className="group rounded-[20px] bg-[#131A22] p-6 text-center shadow-xl hover:shadow-[0_20px_50px_rgba(19,26,34,0.4)] hover:-translate-y-2 hover:bg-black transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl md:text-3xl font-black text-[#F9C301] group-hover:scale-110 transition-all">3-5 Days</h3>
              <p className="text-[11px] font-bold tracking-widest text-white/50 mt-1">REFUND TIME</p>
            </div>
            <div className="group rounded-[20px] bg-white p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/[0.03] hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 hover:shadow-[0_20px_50px_rgba(124,58,237,0.5)] hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl md:text-3xl font-black text-[#131A22] group-hover:text-white group-hover:scale-110 transition-all">100%</h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-400 mt-1 group-hover:text-white/80">SAFE & SECURE</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-3">

          <div className="group rounded-[24px] bg-white p-7 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] hover:shadow-[0_30px_60px_rgba(249,195,1,0.25)] hover:-translate-y-3 hover:border-[#F9C301]/30 transition-all duration-500 cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F9C301] to-amber-500 text-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">📦</div>
            <h3 className="mt-5 text-lg font-black text-[#131A22] group-hover:text-amber-500 transition-colors">Eligible for Return</h3>
            <ul className="mt-3 space-y-2 text-[13px] leading-6 text-gray-500">
              <li>• Damaged or defective product</li>
              <li>• Wrong size or color delivered</li>
              <li>• Unused with original tags intact</li>
            </ul>
            <div className="mt-4 h-1 w-0 bg-[#F9C301] group-hover:w-full transition-all duration-500 rounded-full"></div>
          </div>

          <div className="group rounded-[24px] bg-white p-7 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] hover:shadow-[0_30px_60px_rgba(124,58,237,0.3)] hover:-translate-y-3 hover:border-violet-300/50 transition-all duration-500 cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">🚫</div>
            <h3 className="mt-5 text-lg font-black text-[#131A22] group-hover:text-violet-600 transition-colors">Not Returnable</h3>
            <ul className="mt-3 space-y-2 text-[13px] leading-6 text-gray-500">
              <li>• Used or washed products</li>
              <li>• Innerwear, socks, earrings</li>
              <li>• Items without original packaging</li>
            </ul>
            <div className="mt-4 h-1 w-0 bg-violet-600 group-hover:w-full transition-all duration-500 rounded-full"></div>
          </div>

          <div className="group rounded-[24px] bg-[#131A22] p-7 md:p-8 hover:bg-black hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-3 transition-all duration-500 cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl group-hover:bg-[#F9C301] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">💸</div>
            <h3 className="mt-5 text-lg font-black text-white group-hover:text-[#F9C301] transition-colors">Refund Process</h3>
            <p className="mt-3 text-[13px] leading-6 text-white/60">Once your return is approved, the refund will be credited to your original payment method within 3-5 business days. For faster processing, please share an unboxing video as proof.</p>
            <div className="mt-4 h-1 w-0 bg-[#F9C301] group-hover:w-full transition-all duration-500 rounded-full"></div>
          </div>

        </div>

        <div className="mt-8 rounded-[20px] bg-white p-6 md:p-8 border border-black/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
          <div>
            <h4 className="font-black text-[#131A22]">Need Help with Return?</h4>
            <p className="mt-1 text-[13px] text-gray-500">Contact us via email, we will reply within 24 hours.</p>
          </div>
          <a href="mailto:shopixecommerce0@gmail.com" className="rounded-full bg-[#131A22] px-6 py-3 text-sm font-bold text-white hover:bg-black hover:text-[#F9C301] transition-colors">shopixecommerce0@gmail.com</a>
        </div>

      </div>
    </div>
  )
}

export default ReturnPolicy