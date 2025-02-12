// В начале файла AdminDashboard/index.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheck, FiX } from 'react-icons/fi';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    adjective: ''
  });
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'users', 'products'

  // Получаем токен из sessionStorage (убедитесь, что он сохраняется корректно)
  const token = sessionStorage.getItem('Auth token');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        
        // const orderRes = await axios.get('http://localhost:8080/api/admin/orders', 
        const orderRes = await axios.get('https://food-order-backend-6az2.onrender.com/api/admin/orders', 
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        // const userRes = await axios.get('http://localhost:8080/api/admin/users', 
        const userRes = await axios.get('https://food-order-backend-6az2.onrender.com/api/admin/users', 
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        // const productRes = await axios.get('http://localhost:8080/api/admin/menu',
        const productRes = await axios.get('https://food-order-backend-6az2.onrender.com/api/admin/menu',
         {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Orders response:", orderRes.data);
        console.log("Users response:", userRes.data);
        console.log("Products response:", productRes.data);

        setOrders(orderRes.data);
        setUsers(userRes.data);
        setProducts(productRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (token) {
      fetchAdminData();
    } else {
      console.error("No admin token found");
    }
  }, [token]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('http://localhost:8080/api/admin/menu', newProduct,
      const res = await axios.post('https://food-order-backend-6az2.onrender.com/api/admin/menu', newProduct,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, res.data.product]);
      setNewProduct({ name: '', description: '', price: '', imageUrl: '', adjective: '' });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      // await axios.delete(`http://localhost:8080/api/admin/menu/${id}`, 
      await axios.delete(`https://food-order-backend-6az2.onrender.com/api/admin/menu/${id}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Orders</button>
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 ml-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Users</button>
        <button onClick={() => setActiveTab('products')} className={`px-4 py-2 ml-2 ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Products</button>
      </div>

      {activeTab === 'orders' && (
  <div>
    <h3 className="text-2xl font-semibold mb-2">Orders</h3>
    {orders.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      orders.map(order => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-green-600">Order ID: {order._id}</p>
          </div>
          
          <div className="flex items-center">
              <span className="text-lg font-semibold mr-2">Delivered:</span>
              {order.isDelivered ? (
                <FiCheck className="text-green-500" size={25} />
              ) : (
                <FiX className="text-red-500" size={25} />
              )}
            </div>

          {/* Форматированный вывод адреса */}
          <div className="mt-2">
            <p className="font-semibold">Shipping Address:</p>
            {order.shippingAddress ? (
              <div className="ml-4">
                <p>
                  <span className="font-semibold">Recipient:</span> {order.shippingAddress.recipientName}{" "}
                  (<span>{order.shippingAddress.phone}</span>)
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {order.shippingAddress.address}
                  {order.shippingAddress.apartment ? `, Apt ${order.shippingAddress.apartment}` : ""}
                </p>
                <p>
                  <span className="font-semibold">City:</span> {order.shippingAddress.city}
                </p>
                <p>
                  <span className="font-semibold">Leave at Door:</span> {order.shippingAddress.leaveAtDoor ? "Yes" : "No"}
                </p>
              </div>
            ) : (
              <p>No address provided</p>
            )}
          </div>

          {/* Вывод заказанных товаров */}
          <div className="mt-2">
            <p className="font-semibold">Order Items:</p>
            <ul className="list-disc ml-5">
              {order.orderItems && order.orderItems.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} - ${item.price}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-2">
            <span className="font-semibold">Total Price:</span> ${order.totalPrice}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))
    )}
  </div>
)}

      
      {activeTab === 'users' && (
        <div>
          <h3 className="text-2xl font-semibold mb-2">Users</h3>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map(user => (
              <div key={user._id} className="border p-2 mb-2">
                <p>{user.name} - {user.email}</p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <h3 className="text-2xl font-semibold mb-2">Products</h3>
          
          {/* Форма добавления продукта */}
          <form onSubmit={handleAddProduct} className="mb-4">
            <input 
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              className="border p-2 mr-2"
              required
            />
            <input 
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              className="border p-2 mr-2"
              required
            />
            <input 
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={e => setNewProduct({...newProduct, price: e.target.value})}
              className="border p-2 mr-2"
              required
            />
            <input 
              type="text"
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
              className="border p-2 mr-2"
              required
            />
            <input 
              type="text"
              placeholder="Adjective"
              value={newProduct.adjective}
              onChange={e => setNewProduct({...newProduct, adjective: e.target.value})}
              className="border p-2 mr-2"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Product</button>
          </form>

          {/* Список продуктов */}
  {products.length === 0 ? (
  <p>No products found.</p>
  ) : (
  products.map(product => (
    <div
      key={product._id}
      className="border p-2 mb-2 flex items-center justify-between"
    >
      <div className="flex items-center">
        {/* Изображение продукта */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm text-gray-400">{product.desciption}</p>
          <p className="text-green-500">${product.price}</p>
        </div>
      </div>
      <div>
        <button
          onClick={() => handleDeleteProduct(product._id)}
          className="bg-red-500 text-white px-3 py-1 rounded mr-2"
        >
          Delete
        </button>
        {/* Добавьте кнопку Edit и логику редактирования по необходимости */}
      </div>
    </div>
  ))
  )}

        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
