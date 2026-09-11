const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
//const userRoutes = require('./routes/authRoutes');
dotenv.config();


connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) => {
    res.send("shopix Backend is working properly!");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/payment', require('./routes/paymentRoutes'));
// app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Multer error handler - jate Unexpected field e server crash na kore
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message} - Field name must be 'image'` });
  }
  if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
});

const PORT = process.env.PORT ||5000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});