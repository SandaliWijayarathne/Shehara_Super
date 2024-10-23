import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/dashboard'} className='sidebar-link'>
        <div className="sidebar-item">Dashboard</div>
      </Link>
      <Link to={'/addproduct'} className='sidebar-link'>
        <div className="sidebar-item">Add Product</div>
      </Link>
      <Link to={'/listproduct'} className='sidebar-link'>
        <div className="sidebar-item">Product List</div>
      </Link>
      <Link to={'/orders'} className='sidebar-link'>
        <div className="sidebar-item">Orders List</div>
      </Link>
      <Link to={'/addbanner'} className='sidebar-link'>
        <div className="sidebar-item">Banners</div>
      </Link>
      <Link to={'/superdeals'} className='sidebar-link'>
        <div className="sidebar-item">Flash Deals
        </div>
      </Link>
      
    </div>
  );
}

export default Sidebar;
