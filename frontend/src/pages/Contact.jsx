import React, { useState } from 'react'

const Contact = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Message sent successfully! We'll get back to you within 2 hours. ✅");
        form.reset();
      } else {
        setStatus("Failed to send. Please try again!");
      }
    } catch (err) {
      setStatus("Network error! Please check your connection.");
    } finally {
      setLoading(false);
      // 5 sec por message auto hide
      setTimeout(() => setStatus(""), 5000);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7ff]">
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-violet-100 border-b border-black/5">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-violet-400/30 blur-3xl"></div>
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <div className="mx-auto inline-flex rounded-full bg-[#131A22] px-4 py-1.5 text-xs font-bold tracking-widest text-[#F9C301]">GET IN TOUCH</div>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-[#131A22]">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-gray-500">Have a question? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="rounded-[24px] bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F9C301] to-amber-500">📧</div>
              <h3 className="mt-4 font-bold text-[#131A22]">Email Us</h3>
              <p className="mt-1 text-sm text-gray-500 break-all">shopixecommerce0@gmail.com</p>
            </div>
            <div className="rounded-[24px] bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white">📞</div>
              <h3 className="mt-4 font-bold text-[#131A22]">Call Us</h3>
              <p className="mt-1 text-sm text-gray-500">+91 98765 43210</p>
              <p className="text-sm text-gray-400">Mon - Sat, 10AM to 7PM</p>
            </div>
            <div className="rounded-[24px] bg-[#131A22] p-6">
              <h3 className="font-bold text-white">Fast Response</h3>
              <p className="mt-2 text-sm text-white/60">Average reply time is 2 hours.</p>
              <div className="mt-4 flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs text-white/50">Online Now</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-2 rounded-[24px] bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/[0.03]">
            <h2 className="text-2xl font-black text-[#131A22]">Send a Message</h2>
            <div className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-400">FIRST NAME</label>
                  <input name="firstName" required placeholder="John" className="mt-2 w-full rounded-full bg-[#EEF2FF] px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#F9C301]" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-400">LAST NAME</label>
                  <input name="lastName" required placeholder="Doe" className="mt-2 w-full rounded-full bg-[#EEF2FF] px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#F9C301]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-gray-400">EMAIL</label>
                <input name="email" type="email" required placeholder="john.doe@example.com" className="mt-2 w-full rounded-full bg-[#EEF2FF] px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#F9C301]" />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-gray-400">MESSAGE</label>
                <textarea name="message" required rows="4" placeholder="Your message here..." className="mt-2 w-full rounded-[20px] bg-[#EEF2FF] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#F9C301] resize-none"></textarea>
              </div>

              <button type="submit" disabled={loading} className="mt-2 w-full rounded-full bg-[#131A22] py-4 text-sm font-black cursor-pointer tracking-widest text-white hover:bg-black transition-all disabled:opacity-60">
                {loading? "SENDING..." : "SEND MESSAGE →"}
              </button>

              {status && (
                <div className={`text-center rounded-full py-3 px-4 text-sm font-bold border mt-2 ${status.includes("sent")? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                  {status}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact