import { useEffect, useState } from 'react';
import './OrdersList.css';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/orders');
      console.log('Fetched orders:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Remove an order
  const removeOrder = async (id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/removeorder', { id });
      console.log('Remove response:', response.data);
      fetchOrders(); // Refresh the list after removal
    } catch (error) {
      console.error('Error removing order:', error);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='orders-list'>
      <h1>All Orders</h1>
      {orders.map((order, index) => (
        <div key={index} className="order-item">
          <h2>Order {index + 1}</h2>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Contact Number:</strong> {order.contactNumber}</p>
          <p><strong>Total Amount:</strong> Rs.{order.totalAmount}</p>
          <h3>Items:</h3>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} - {item.quantity} x Rs.{item.price}
              </li>
            ))}
          </ul>
          <button className="remove-order-button" onClick={() => removeOrder(order._id)}>Remove Order</button>
        </div>
      ))}
    </div>
  );
}

export default OrdersList;
