import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import OrderList from '../../Components/OrdersList/OrdersList'
import AddBanner from '../../Components/Advertise/Banner';
import Deals from '../../Components/Deals/Deals';
import SuperDeals '../Components/SuperDeals/SuperDeals';


const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
          <Route path='/orders' element={<OrderList />} />
          <Route path='/addbanner' element={<AddBanner/>}/>
          <Route path='/superdeals' element={<SuperDeals/>}/>
          <Route path='/deals' elements={<Deals/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
