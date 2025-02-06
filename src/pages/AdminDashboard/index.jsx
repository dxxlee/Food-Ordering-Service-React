import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // получаем заказы, пользователей и продукты
    const fetchAdminData = async () => {
      try {
        const orderRes = await axios.get('/api/admin/orders', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("Auth token")}` },
        });
        const userRes = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("Auth token")}` },
        });
        const productRes = await axios.get('/api/admin/menu', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("Auth token")}` },
        });

        setOrders(orderRes.data);
        setUsers(userRes.data);
        setProducts(productRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Вывод заказов */}
      <div>
        <h3>Orders</h3>
        {orders.map(order => (
          <div key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>

      {/* Вывод пользователей */}
      <div>
        <h3>Users</h3>
        {users.map(user => (
          <div key={user._id}>
            <p>{user.name} - {user.email}</p>
          </div>
        ))}
      </div>

      {/* Вывод продуктов */}
      <div>
        <h3>Products</h3>
        {products.map(product => (
          <div key={product._id}>
            <p>{product.name} - ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
