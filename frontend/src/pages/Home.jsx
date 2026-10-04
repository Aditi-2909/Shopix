import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const res = await fetch('/api/products');
                const data = await res.json();
                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-[70vh] px-6 py-20 sm:px-16 bg-white">
            {/* Welcome Part - Ekdom Majhkhane */}
            <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#131A22]">
                    Welcome to <span className="text-[#F9C301]">Shopix</span>
                </h1>
                <p className="mt-4 text-lg text-gray-500 mx-auto max-w-2xl">
                    Discover the best products at unbeatable prices.
                </p>
                <Link to="/Shop" className="inline-block bg-[#131A22] text-white font-bold px-8 py-3.5 rounded-full mt-10 hover:bg-black hover:scale-105 transition-all duration-200 shadow-lg">
                    Start Shopping
                </Link>
            </div>

            {/* Featured Products - Grid */}
            <div className="mt-20 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-[#131A22] mb-8 text-center sm:text-left">Featured Products</h2>
                {loading? (
                    <div className="text-gray-500 text-center py-10">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;