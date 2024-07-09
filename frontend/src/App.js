import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import About from './Pages/AboutUs';
import Location from './Pages/Location';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Delivery from './Pages/Delivery';
import Login from './Pages/Login';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import UserProfile from './Components/UserProfile/UserProfile';
import CartItems from './Components/CartItems/CartItems';
import Checkout from './Components/PaymentPage/PaymentPage';
import PaymentForm from './Components/Paytype/Paytype';
import CategoryPage from './Components/CategoryPage/CategoryPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/category/:category" element={<ShopCategory />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/cart-items" element={<CartItems />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/paytype" element={<PaymentForm />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
