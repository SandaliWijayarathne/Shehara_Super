import React, { useEffect, useState } from 'react';
import './OrdersList.css';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get('http://localhost:4000/api/orders');
      setOrders(data);
    } catch (error) {
      setError('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const removeOrder = async (id) => {
    try {
      await axios.post('http://localhost:4000/api/removeorder', { id });
      fetchOrders();
    } catch (error) {
      setError('Error removing order');
    }
  };

  return (
    <div className='orders-list'>
      <h1>All Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
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
