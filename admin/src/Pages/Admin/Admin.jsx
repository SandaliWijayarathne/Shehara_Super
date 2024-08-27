import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import OrderList from '../../Components/OrdersList/OrdersList'
import Banner from '../../Components/Advertise/Banner';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
          <Route path='/orders' element={<OrderList />} />
          <Route path='/addbanner' element={<Banner/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
