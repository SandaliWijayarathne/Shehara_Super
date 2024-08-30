import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/addproduct" className="sidebar-link">
        <div className="sidebar-item">Add Product</div>
      </Link>
      <Link to="/admin/listproduct" className="sidebar-link">
        <div className="sidebar-item">Product List</div>
      </Link>
      <Link to="/admin/orders" className="sidebar-link">
        <div className="sidebar-item">Orders List</div>
      </Link>
      <Link to="/admin/addbanner" className="sidebar-link">
        <div className="sidebar-item">Banners</div>
      </Link>
      <Link to="/admin/superdeals" className="sidebar-link">
        <div className="sidebar-item">Super Deals</div>
      </Link>
      <Link to="/admin/deals" className="sidebar-link">
        <div className="sidebar-item">Deals</div>
      </Link>
    </div>
  );
};

export default Sidebar;
