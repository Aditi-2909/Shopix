import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import About from './pages/About'
import ReturnPolicy from './pages/ReturnPolicy'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Profile from './pages/Profile'
import OrderDetails from './pages/OrderDetails'
import Shop from './pages/Shop'

import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AddProduct from './admin/AddProduct'
import AdminProducts from './admin/AdminProducts'
import EditProduct from './admin/EditProduct'
import AdminOrders from './admin/AdminOrders'
import AdminUsers from './admin/AdminUsers'
import { AuthContext } from './context/AuthContext'

// Admin Protection
const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

// Normal User Protection
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Public + User Routes with Navbar/Footer */}
        <Route path="/*" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                <Route path="/order-success" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/order/:id" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Routes with AdminLayout (No public Navbar/Footer) */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App