const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  brand: { 
    type: String, 
    default: "Shopix" 
  },
  category: { 
    type: String, 
    default: "Fashion"
  },
  description: { 
    type: String,
    default: ""
  },
  // Extra fields for Shop page gorgeous look
  countInStock: {
    type: Number,
    default: 10
  },
  rating: {
    type: Number,
    default: 5
  },
  numReviews: {
    type: Number,
    default: 24
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;