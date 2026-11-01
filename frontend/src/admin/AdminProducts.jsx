import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#F9C301] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 lg:px-12 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[32px] font-black tracking-tighter">Products</h1>
          <p className="text-white/40 text-[13px] mt-1">{products.length} total products • Manage inventory</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="bg-[#111111] border border-white/10 rounded-full pl-10 pr-4 py-3 text-[13px] w-[220px] focus:outline-none focus:border-white/20 placeholder:text-white/30"
            />
            <span className="absolute left-4 top-3.5 text-white/30 text-sm">⌕</span>
          </div>
          <Link to="/admin/add-product" className="bg-white text-black px-6 py-3 rounded-full text-[13px] font-black hover:bg-[#F9C301] transition-all whitespace-nowrap">
            + Add Product
          </Link>
        </div>
      </div>

      {/* Premium Table */}
      <div className="bg-[#111111] border border-white/5 rounded-[24px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-[11px] tracking-widest text-white/30 font-bold uppercase">
                <th className="text-left p-5 pl-7 font-bold">Product</th>
                <th className="text-left p-5 font-bold">Price</th>
                <th className="text-left p-5 font-bold">Stock</th>
                <th className="text-left p-5 font-bold">Category</th>
                <th className="text-right p-5 pr-7 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product._id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-all group">
                  <td className="p-4 pl-7">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover bg-white/5" />
                      <div>
                        <p className="text-[14px] font-bold tracking-tight group-hover:text-[#F9C301] transition-colors">{product.name}</p>
                        <p className="text-[11px] text-white/30 font-mono">#{product._id.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-[14px] font-black">₹{product.price}</span>
                  </td>
                  <td className="p-5">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${product.countInStock > 10 ? 'bg-emerald-500/15 text-emerald-400' : product.countInStock > 0 ? 'bg-yellow-500/15 text-yellow-400' : 'bg-red-500/15 text-red-400'}`}>
                      {product.countInStock > 0 ? `${product.countInStock} IN STOCK` : 'OUT OF STOCK'}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className="text-[12px] text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5">{product.category || 'General'}</span>
                  </td>
                  <td className="p-5 pr-7">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/edit-product/${product._id}`} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-[12px]">✎</Link>
                      <button onClick={() => deleteProduct(product._id)} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all text-[12px]">✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/30 text-[13px]">No products found for "{search}"</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center text-[11px] text-white/30">
        <span>Showing {filtered.length} of {products.length} products</span>
        <Link to="/admin" className="hover:text-white transition-colors">← Back to Dashboard</Link>
      </div>

    </div>
  )
}

export default AdminProducts