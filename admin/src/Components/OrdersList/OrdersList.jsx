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
      <div className="orders-table">
        <div className="orders-header">
          <div>Order ID</div>
          <div>Address</div>
          <div>Contact Number</div>
          <div>Total Amount</div>
          <div>Items</div>
          <div>Actions</div>
        </div>
        {orders.map((order) => (
          <div key={order._id} className="orders-row">
            <div>{order._id}</div>
            <div>{order.address}</div>
            <div>{order.contactNumber}</div>
            <div>Rs.{order.totalAmount}</div>
            <div>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} - {item.quantity} x Rs.{item.price}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button className="remove-order-button" onClick={() => removeOrder(order._id)}>Remove Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersList;
