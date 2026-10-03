import React from 'react'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#f6f7ff]">
      {/* HERO - LIGHT COLORFUL, Navbar theke alada */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-violet-100 border-b border-black/5">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-violet-400/30 blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#131A22] px-4 py-1.5 text-xs font-bold tracking-widest text-[#F9C301]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#F9C301]"></span> LEGAL & SECURE
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-[#131A22]">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] text-gray-500">
            We care about your data like it's our own. Here's everything in colorful & clear way.
          </p>
        </div>
      </div>

      {/* CARDS - same colorful but now contrast better */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">

          <div className="group rounded-[24px] bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] hover:-translate-y-1 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F9C301] to-amber-500 text-xl shadow-lg">🔒</div>
            <h2 className="mt-5 text-xl font-black text-[#131A22]">Information We Collect</h2>
            <p className="mt-3 text-[14px] leading-6 text-gray-500">
              Name, email, phone, address, payment info & browsing behavior to make your shopping super personalized and fast.
            </p>
          </div>

          <div className="group rounded-[24px] bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] hover:-translate-y-1 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl shadow-lg">⚡</div>
            <h2 className="mt-5 text-xl font-black text-[#131A22]">How We Use It</h2>
            <ul className="mt-3 space-y-2 text-[13px] font-medium text-gray-600">
              <li>✓ Fast order delivery</li>
              <li>✓ Improve shopping experience</li>
              <li>✓ Exclusive offers & updates</li>
              <li>✓ 24/7 fraud protection</li>
            </ul>
          </div>

          <div className="group rounded-[24px] bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] hover:-translate-y-1 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-xl shadow-lg">🛡️</div>
            <h2 className="mt-5 text-xl font-black text-[#131A22]">Data Security</h2>
            <p className="mt-3 text-[14px] leading-6 text-gray-500">
              256-bit SSL, encrypted storage, no card data saved. Your data is locked like a bank vault.
            </p>
          </div>

          <div className="group rounded-[24px] bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] hover:-translate-y-1 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-xl shadow-lg">🍪</div>
            <h2 className="mt-5 text-xl font-black text-[#131A22]">Cookies</h2>
            <p className="mt-3 text-[14px] leading-6 text-gray-500">
              We use cookies to remember your cart, login & show you what you love. Disable anytime from browser.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-[24px] bg-[#131A22] px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Questions about privacy?</h3>
            <p className="text-sm text-white/50">Our team replies within 2 hours, 24/7</p>
          </div>
          <a href="mailto:shopixecommerce0@gmail.com" className="rounded-full bg-[#F9C301] px-7 py-3 text-sm font-black text-black hover:bg-white transition-colors">
            shopixecommerce0@gmail.com
          </a>
        </div>

      </div>
    </div>
  )
}

export default Privacy