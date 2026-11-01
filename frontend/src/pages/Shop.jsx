import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')
  const [priceRange, setPriceRange] = useState(50000)

  const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  const getImage = (p) => {
    let img = p.image || p.images?.[0] || p.imageUrl || p.thumbnail || ""
    if(!img) return "https://via.placeholder.com/400x500/111111/FFFFFF?text=Shopix"
    if(img.startsWith("http")) return img
    if(img.startsWith("/")) return `${API}${img}`
    return `${API}/${img}`
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API}/api/products`)
        const list = Array.isArray(data) ? data : data.products || []
        setProducts(list)
        setFiltered(list)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [API])

  useEffect(() => {
    let result = [...products]
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'All') result = result.filter(p => (p.category || '').toLowerCase() === category.toLowerCase())
    result = result.filter(p => Number(p.price) <= Number(priceRange))
    
    if (sort === 'low') result.sort((a,b) => a.price - b.price)
    if (sort === 'high') result.sort((a,b) => b.price - a.price)
    if (sort === 'newest') result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

    setFiltered(result)
  }, [search, category, sort, priceRange, products])

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))]

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#F9C301] rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="px-4 sm:px-8 lg:px-12 pt-10 pb-8 border-b border-white/5">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-[#F9C301] rounded-full animate-pulse"></div>
              <p className="text-[11px] tracking-[0.2em] text-white/40 font-bold uppercase">Shop Collection</p>
            </div>
            <h1 className="text-[44px] sm:text-[64px] font-black tracking-tighter leading-[0.9]">SHOP ALL<br/><span className="text-white/20">PRODUCTS</span></h1>
            <p className="text-white/40 text-[14px] mt-4 max-w-md">Curated premium streetwear, accessories and essentials. {filtered.length} products found.</p>
          </div>
          
          <div className="lg:w-[380px]">
            <div className="relative bg-[#111111] border border-white/10 rounded-[16px] overflow-hidden focus-within:border-white/20 transition-all">
              <span className="absolute left-5 top-4 text-white/30">⌕</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, brands..." className="w-full bg-transparent pl-12 pr-5 py-4 text-[14px] placeholder:text-white/30 focus:outline-none"/>
            </div>
            <div className="flex gap-2 mt-3">
              <select value={sort} onChange={e=>setSort(e.target.value)} className="flex-1 bg-[#111111] border border-white/10 rounded-full px-4 py-2.5 text-[12px] font-bold outline-none">
                <option value="newest">Newest</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <div className="flex-1 bg-[#111111] border border-white/10 rounded-full px-4 py-2.5 text-[12px] font-bold flex justify-between items-center">
                <span className="text-white/40">Max:</span>
                <input type="range" min="100" max="50000" value={priceRange} onChange={e=>setPriceRange(Number(e.target.value))} className="w-20 accent-[#F9C301]"/>
                <span>₹{priceRange}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-8 overflow-x-auto scrollbar-hide pb-2">
          {categories.map(cat => (
            <button key={cat} onClick={()=>setCategory(cat)} className={`px-6 py-2.5 rounded-full text-[12px] font-black tracking-wide whitespace-nowrap transition-all border ${category===cat ? 'bg-white text-black border-white' : 'bg-[#111111] text-white/50 border-white/10 hover:text-white hover:border-white/20'}`}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-8">
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-[18px] font-bold">No products found</p>
            <p className="text-white/30 text-[13px] mt-2">Try changing filters or search</p>
            <button onClick={()=>{setSearch(''); setCategory('All'); setPriceRange(50000)}} className="mt-6 bg-white text-black px-6 py-2.5 rounded-full text-[12px] font-black">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px] bg-white/5 border border-white/5 rounded-[24px] overflow-hidden p-[1px]">
            {filtered.map(product => (
              <Link key={product._id} to={`/products/${product._id}`} className="group bg-[#0a0a0a] p-4 hover:bg-[#111111] transition-all duration-300">
                <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-[#1a1a1a]">
                  <img src={getImage(product)} alt={product.name} onError={(e)=>{e.target.src="https://via.placeholder.com/400x500/111111/FFFFFF?text=Shopix"}} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full tracking-widest">{product.category || 'NEW'}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex justify-between items-end">
                      <div className="pr-2">
                        <p className="text-[10px] tracking-widest text-white/40 font-bold">{product.brand || 'SHOPIX'}</p>
                        <h3 className="text-[15px] font-bold leading-tight mt-1 line-clamp-1">{product.name}</h3>
                      </div>
                      <p className="text-[16px] font-black whitespace-nowrap">₹{product.price}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 px-1">
                  <div className="flex gap-1 items-center">
                    <span className="text-[#F9C301] text-[11px]">★★★★★</span>
                    <span className="text-white/20 text-[11px] ml-1">({product.numReviews || 24})</span>
                  </div>
                  <span className="text-[11px] text-white/30 group-hover:text-white transition-colors font-bold tracking-widest">VIEW →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop