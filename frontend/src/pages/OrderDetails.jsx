import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const userInfo = user || JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token || userInfo?.user?.token;

  useEffect(() => {
    fetch(`/api/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setOrder(d.order || d))
      .finally(()=>setLoading(false));
  }, [id]);

  if(loading) return <div className="py-20 text-center">Loading...</div>;
  if(!order) return <div className="py-20 text-center">Order not found</div>;

  const items = order.items || [];
  const total = order.totalAmount || 0;
  const addr = order.address;
  const addressStr = typeof addr === 'string' ? addr : `${addr?.fullName || ''}, ${addr?.street || ''}, ${addr?.city || ''}, ${addr?.postalCode || ''}`;

  const getImg = (item) => {
    if(item.image) return item.image;
    if(item.productId?.image) return item.productId.image;
    if(item.productId?.images?.[0]) {
      const f = item.productId.images[0];
      return typeof f === 'string' ? f : f.url;
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button onClick={()=>navigate(-1)} className="mb-6 bg-gray-900 text-white px-6 py-2 rounded-full cursor-pointer">← Back</button>
      <h1 className="text-3xl font-extrabold">Order <span className="text-[#FFC300]">#{order._id.slice(-6).toUpperCase()}</span></h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border rounded-[20px] p-6">
          <h3 className="font-bold mb-4">Items ({items.length})</h3>
          {items.map((item,i)=>{
            const img = getImg(item);
            const name = item.productId?.name || item.name;
            return (
              <div key={i} className="flex justify-between items-center py-4 border-b last:border-0">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-xl bg-gray-100 border flex items-center justify-center overflow-hidden">
                    {img ? <img src={img} className="w-full h-full object-cover" /> : <span className="font-bold text-gray-500">{name?.[0]}</span>}
                  </div>
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty || item.quantity || 1} × ₹{item.productId?.price || item.price}</p>
                  </div>
                </div>
                <p className="font-bold">₹{item.productId?.price || item.price}</p>
              </div>
            )
          })}
        </div>
        <div className="bg-[#0f172a] text-white rounded-[20px] p-6 h-fit">
          <h3 className="font-bold">Order Summary</h3>
          <p className="mt-4 text-sm">Total: ₹{total}</p>
          <div className="mt-6 bg-[#FFC300] text-black rounded-xl p-4 text-xs">{addressStr}</div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;