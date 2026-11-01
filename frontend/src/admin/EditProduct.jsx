import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    name: '',
    price: '',
    countInStock: '',
    category: 'General',
    brand: 'Shopix',
    description: '',
    image: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setForm({
          name: data.name,
          price: data.price,
          countInStock: data.countInStock,
          category: data.category || 'General',
          brand: data.brand || 'Shopix',
          description: data.description,
          image: data.image
        });
      } catch (err) {
        alert('Product not found');
        navigate('/admin/products');
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock)
      }, config);
      navigate('/admin/products');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#F9C301] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 lg:px-12 py-10">
      
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/admin/products" className="w-9 h-9 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">←</Link>
          <div>
            <h1 className="text-[28px] font-black tracking-tighter">Edit Product</h1>
            <p className="text-white/40 text-[12px] mt-0.5 font-mono">ID: {id.slice(-8).toUpperCase()} • Update details</p>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 bg-emerald-500/15 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> EDIT MODE
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          
          {/* Left */}
          <div className="bg-[#111111] border border-white/5 rounded-[24px] p-7 space-y-6">
            
            <div>
              <label className="text-[11px] tracking-widest font-bold text-white/30 uppercase mb-2.5 block">Product Name</label>
              <input name="name" value={form.name} onChange={handleChange} required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:border-[#F9C301]/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] tracking-widest font-bold text-white/30 uppercase mb-2.5 block">Price (₹)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:border-white/20"
                />
              </div>
              <div>
                <label className="text-[11px] tracking-widest font-bold text-white/30 uppercase mb-2.5 block">Stock Qty</label>
                <input name="countInStock" type="number" value={form.countInStock} onChange={handleChange} required
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:border-white/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] tracking-widest font-bold text-white/30 uppercase mb-2.5 block">Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:border-white/20"
                >
                  <option>General</option>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Accessories</option>
                  <option>Footwear</option>
                  <option>Electronics</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] tracking-widest font-bold text-white/30 uppercase mb-2.5 block">Brand</label>
                <input name="brand" value={form.brand} onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3.5 text-[14px] focus:outline-none focus:border-white/20"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] tracking-widest font-bold text-white/30 uppercase mb-2.5 block">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="5" required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-[20px] px-5 py-4 text-[14px] focus:outline-none focus:border-white/20 resize-none"
              ></textarea>
            </div>

          </div>

          {/* Right */}
          <div className="space-y-6">
            
            <div className="bg-[#111111] border border-white/5 rounded-[24px] p-7">
              <label className="text-[11px] tracking-widest font-bold text-white/30 uppercase mb-2.5 block">Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3.5 text-[13px] focus:outline-none focus:border-white/20"
              />
              
              <div className="mt-5 aspect-[4/3] rounded-[16px] bg-[#0a0a0a] border border-white/10 flex items-center justify-center overflow-hidden">
                {form.image ? (
                  <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <p className="text-[11px] text-white/30">No image</p>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <div className="flex-1 h-1 bg-emerald-500 rounded-full"></div>
                <div className="flex-1 h-1 bg-white/10 rounded-full"></div>
                <div className="flex-1 h-1 bg-white/10 rounded-full"></div>
              </div>
              <p className="text-[10px] text-white/30 mt-2">Live product image • Changes reflect instantly</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/products" className="bg-[#111111] border border-white/10 text-white rounded-full py-4 text-[13px] font-bold hover:bg-white/10 transition-all text-center">
                Cancel
              </Link>
              <button disabled={loading} type="submit"
                className="bg-[#F9C301] text-black rounded-full py-4 text-[13px] font-black hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span> : 'Save →'}
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  )
}

export default EditProduct