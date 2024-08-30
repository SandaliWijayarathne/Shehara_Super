import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import OrdersList from '../../Components/OrdersList/OrdersList';
import AddBanner from '../../Components/Advertise/Banner';
import Deals from '../../Components/Deals/Deals';
import SuperDeals from '../../Components/Superdeals/superDeals';

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="addbanner" element={<AddBanner />} />
          <Route path="deals" element={<Deals />} />
          <Route path="superdeals" element={<SuperDeals />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
