import { Link, useLocation, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const location = useLocation()
  const menu = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Add Product', path: '/admin/add-product' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Users', path: '/admin/users' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar - Fixed */}
      <div className="w-[240px] bg-[#111111] border-r border-white/5 p-6 hidden lg:block sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-2 h-2 bg-[#F9C301] rounded-full animate-pulse"></div>
          <h2 className="text-[14px] font-black tracking-[0.2em]">SHOPIX</h2>
        </div>
        <div className="space-y-1">
          {menu.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-full text-[13px] font-bold transition-all ${
                  active ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/" className="block text-center text-[11px] tracking-widest text-white/20 font-bold hover:text-white/40">← BACK TO STORE</Link>
        </div>
      </div>

      {/* Mobile top nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-white/5 p-2 flex justify-around z-50">
        {menu.map(item => (
          <Link key={item.path} to={item.path} className={`px-3 py-2 rounded-full text-[11px] font-bold ${location.pathname===item.path?'bg-white text-black':'text-white/40'}`}>
            {item.name.split(' ')[0]}
          </Link>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout