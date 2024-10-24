import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Shopping from './Components/Shopping/Shopping';
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
import Selection from './Components/Selection/Selection';
import FAQ from './Components/FAQ/FAQ';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './Components/Terms&Conditions/Terms&Conditions';
import Success from './Components/Success/Success';
import Failure from './Components/Failure/Failure';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/shopping' element={<Shopping />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
          <Route path='/location' element={<Location />} />
          <Route path='/category/:category' element={<ShopCategory />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<LoginSignup />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/cart-items' element={<CartItems />} />
          <Route path='/checkout' element={<Checkout />} />  
          <Route path='/paytype' element={<PaymentForm />} /> 
          <Route path='/selection' element={<Selection />} /> 
          <Route path='/faq' element={<FAQ />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/success' element={<Success/>}/>
          <Route path='/fail' element={<Failure/>}/>

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
