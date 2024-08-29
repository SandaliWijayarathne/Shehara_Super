
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} className='sidebar-link'>
        <div className="sidebar-item">
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} className='sidebar-link'>
        <div className="sidebar-item">
          <p>Product List</p>
        </div>
      </Link>
      <Link to={'/orders'} className='sidebar-link'>
        <div className="sidebar-item">
          <p>Orders List</p>
        </div>
      </Link>
      <Link to={'/addbanner'} className='sidebar-link'>
        <div className="sidebar-item">
          <p>Banners</p>
        </div>
      </Link>
      <Link to={'/superdeals'} className='sidebar-link'>
        <div className="sidebar-item">
          <p>Super Deals</p>
        </div>
      </Link>
    </div>
    
  );
}

export default Sidebar;
