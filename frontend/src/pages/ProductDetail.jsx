import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
        qty: 1
      }));
      alert('Successfully added to your cart!');
    }
  };

  if (loading) return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-[80vh] flex items-center justify-center">Product not found</div>;

  return (
    <div className="min-h-[85vh] bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border p-6 md:p-10 grid md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center">
          <img src={product.imageUrl} alt={product.name} className="max-h-[400px] object-contain" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-3xl font-bold mt-4">₹{product.price}</p>
          <p className="text-sm text-gray-600 mt-4 leading-6">{product.description}</p>

          <div className="mt-8 flex gap-3">
            <button onClick={handleAddToCart} className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-zinc-800 cursor-pointer">
              Add to Cart
            </button>
            <button className="flex-1 border border-black py-3 rounded-xl font-semibold cursor-pointer">
              Buy Now
            </button>
          </div>

          {/* Stock Available - Green */}
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-sm font-semibold text-green-600">
              In Stock: {product.countInStock ? `${product.countInStock} Available` : 'Available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;