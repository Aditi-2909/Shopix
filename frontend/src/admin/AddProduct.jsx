import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const AddProduct = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState("")
  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "Shopix",
    category: "Fashion",
    countInStock: "10",
    description: "",
    image: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'image') setPreview(value)
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result
      setForm(prev => ({ ...prev, image: base64 }))
      setPreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const submit = async (e) => {
    e.preventDefault()
    const img = (form.image || preview || "").trim()
    if (!img) return alert("Image dao! File upload koro, best hobe")

    setLoading(true)
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } }
      await axios.post('http://localhost:5000/api/products', {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        brand: form.brand,
        category: form.category,
        countInStock: Number(form.countInStock),
       
        image: img,
        imageUrl: img,
        stock: Number(form.countInStock)
      }, config)
      alert("Product Added!")
      navigate('/admin/products')
    } catch (err) {
      console.error(err.response?.data)
      alert(err.response?.data?.message || "Failed to add")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[32px] font-black tracking-tighter">Add Product</h1>
          <p className="text-white/40 text-[13px] mt-1">BlackBook er moto product add koro</p>
        </div>
        <Link to="/admin/products" className="text-[11px] font-bold tracking-widest text-white/30 hover:text-white border border-white/10 px-4 py-2 rounded-full">← BACK</Link>
      </div>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="bg-[#111111] border border-white/5 rounded-[24px] p-7 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[11px] font-bold tracking-widest text-white/30">PRODUCT NAME</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Product Name" className="mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#F9C301]/50"/>
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-widest text-white/30">BRAND</label>
              <input name="brand" value={form.brand} onChange={handleChange} className="mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-[14px]"/>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="text-[11px] font-bold tracking-widest text-white/30">PRICE (₹)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required placeholder="999" className="mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-[14px]"/>
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-widest text-white/30">STOCK</label>
              <input name="countInStock" type="number" value={form.countInStock} onChange={handleChange} className="mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-[14px]"/>
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-widest text-white/30">CATEGORY</label>
              <select name="category" value={form.category} onChange={handleChange} className="mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-[13px]">
                <option>Fashion</option>
                <option>Electronics</option>
                <option>Accessories</option>
                <option>Education</option>
                <option>Home</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold tracking-widest text-white/30">DESCRIPTION</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows="4" placeholder="Enter product description" className="mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-[14px]"></textarea>
          </div>

          <button disabled={loading} className="w-full bg-white text-black py-4 rounded-full font-black text-[14px] tracking-wide hover:bg-[#F9C301] transition-all disabled:opacity-50">
            {loading ? "Adding..." : "Add Product →"}
          </button>
        </div>

        <div className="bg-[#111111] border border-white/5 rounded-[24px] p-7">
          <label className="text-[11px] font-bold tracking-widest text-white/30">PRODUCT IMAGE</label>
          <div className="mt-3 aspect-[4/5] rounded-[20px] bg-[#0a0a0a] border border-dashed border-white/10 overflow-hidden flex items-center justify-center">
            {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover"/> : <p className="text-white/20 text-[12px] text-center px-6">No image selected<br/>Upload File</p>}
          </div>

          <div className="mt-5 space-y-3">
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer"/>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-full py-3 text-center text-[12px] font-bold hover:bg-white/5">📁 Upload File</div>
            </div>
            <div className="text-center text-[10px] text-white/20 tracking-widest">— OR —</div>
            <input name="image" value={form.image.startsWith('data:') ? '' : form.image} onChange={handleChange} placeholder="Direct .jpg link" className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-3 text-[12px]"/>
            <p className="text-[11px] text-white/30">File upload korle 100% kaj korbe. Bing OIP link use koris na.</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct