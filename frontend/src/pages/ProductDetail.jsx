import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: qty
      }));
      navigate('/cart');
    }
  };

  if (loading) return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#fcfcfc]">
      <div className="w-10 h-10 border-4 border-black border-t-[#FFC300] rounded-full animate-spin"></div>
    </div>
  );
  if (!product) return <div className="min-h-[80vh] flex items-center justify-center font-black">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb - Home er moto simple */}
        <div className="flex items-center gap-2 text-[13px] font-medium text-gray-500 mb-6">
          <span onClick={()=>navigate('/')} className="hover:text-black cursor-pointer">Home</span>
          <span>/</span>
          <span onClick={()=>navigate('/')} className="hover:text-black cursor-pointer">Shop</span>
          <span>/</span>
          <span className="text-black font-bold truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-5 md:p-8 grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image - Home featured product card style */}
          <div className="relative bg-[#f9f9f9] rounded-[22px] p-6 md:p-10 flex items-center justify-center group overflow-hidden">
            <div className="absolute top-4 left-4 bg-[#FFC300] text-black text-[11px] font-black px-3 py-1 rounded-full">NEW</div>
            <div className="absolute top-4 right-4 bg-black text-white text-[11px] font-bold px-3 py-1 rounded-full">FREE DELIVERY</div>
            <img src={product.imageUrl} alt={product.name} className="max-h-[420px] object-contain group-hover:scale-[1.03] transition-transform duration-500" />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div>
              <h1 className="text-[26px] md:text-[32px] font-black tracking-tight leading-tight text-gray-900">{product.name}</h1>

              <div className="flex items-center gap-3 mt-4">
                <p className="text-[28px] font-black">₹{product.price}</p>
                <p className="text-[15px] text-gray-400 line-through font-medium">₹{Math.round(product.price * 1.4)}</p>
                <span className="bg-black text-[#FFC300] text-[11px] font-black px-2.5 py-1 rounded-full">30% OFF</span>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex text-[#FFC300] text-sm">★★★★★</div>
                <span className="text-xs font-bold text-gray-500">(124 reviews)</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> In Stock: {product.countInStock? `${product.countInStock} Available` : 'Available'}</span>
              </div>

              <p className="text-[13.5px] text-gray-600 mt-6 leading-6 font-medium bg-[#fafafa] border border-gray-100 rounded-xl p-4">
                {product.description}
              </p>

              {/* Features - like home perks */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-[#f9f9f9] border border-gray-100 rounded-xl p-3 text-center"><p className="text-lg">🚚</p><p className="text-[11px] font-bold mt-1">Free Delivery</p></div>
                <div className="bg-[#f9f9f9] border border-gray-100 rounded-xl p-3 text-center"><p className="text-lg">↩️</p><p className="text-[11px] font-bold mt-1">7 Days Return</p></div>
                <div className="bg-[#f9f9f9] border border-gray-100 rounded-xl p-3 text-center"><p className="text-lg">🔒</p><p className="text-[11px] font-bold mt-1">Secure Pay</p></div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <div className="flex items-center gap-4 mb-5">
                <p className="text-sm font-black">Qty:</p>
                <div className="flex items-center border border-gray-200 rounded-full p-1">
                  <button onClick={()=> setQty(q=> Math.max(1,q-1))} className="w-8 h-8 rounded-full bg-white shadow-sm border flex items-center justify-center font-bold hover:bg-black hover:text-white transition-all">-</button>
                  <span className="px-5 text-sm font-black">{qty}</span>
                  <button onClick={()=> setQty(q=> q+1)} className="w-8 h-8 rounded-full bg-white shadow-sm border flex items-center justify-center font-bold hover:bg-black hover:text-white transition-all">+</button>
                </div>
                <p className="text-xs text-gray-500 font-medium">Only {product.countInStock || 10} left!</p>
              </div>

              <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
                <button onClick={handleAddToCart} className="cursor-pointer w-full bg-black text-white py-4 rounded-full font-black text-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                  Add to Cart <span className="bg-[#FFC300] text-black text-xs px-2 py-0.5 rounded-full">₹{product.price * qty}</span>
                </button>
                <button onClick={()=> { handleAddToCart(); navigate('/checkout'); }} className="cursor-pointer w-full bg-[#FFC300] text-black py-4 rounded-full font-black text-[14px] hover:bg-yellow-400 hover:scale-[1.01] active:scale-[0.99] transition-all">
                  Buy Now
                </button>
              </div>
              <p className="text-[11px] text-center text-gray-400 font-medium mt-3">🔒 100% Secure Checkout • Powered by Shopix</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;