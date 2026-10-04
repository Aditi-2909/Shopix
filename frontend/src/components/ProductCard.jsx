import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="bg-gray-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-[#131A22] text-[15px] line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-bold text-[#131A22]">
          ${product.price.toFixed(2)}
        </p>

        <Link
          to={`/products/${product._id}`}
          className="mt-4 text-center bg-[#131A22] text-white text-sm font-bold py-2.5 rounded-full hover:bg-black transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;