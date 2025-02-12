import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch("https://food-order-backend-6az2.onrender.com/api/orders",
            // const response = await fetch("http://localhost:8080/api/orders",
             {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("Auth token")}` },
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Orders</h1>
            {orders.length === 0 ? (
                <p className="text-lg font-semibold text-center text-gray-500">No orders found.</p>
            ) : (
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white"
                        >
                            <div className="mb-4">
                                <p className="text-lg font-semibold text-gray-800">
                                    Order ID: <span className="text-yellow-600">{order._id}</span>
                                </p>
                                <p className="text-md text-gray-700">
                                    Total Price: <span className="font-bold">${order.totalPrice.toFixed(2)}</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Delivery Address: {order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.apartment}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Contact Information: {order.shippingAddress.phone}, {order.shippingAddress.recipientName}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {order.orderItems.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        className="bg-gray-50 p-4 rounded-lg shadow-md border"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {item.product ? (
                                            <>
                                                <div className="w-full h-40 flex justify-center">
                                                    <img
                                                        src={item.product.imageUrl}
                                                        alt={item.product.name}
                                                        className="max-h-full object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <p className="text-lg font-semibold text-gray-800">{item.product.name}</p>
                                                    <p className="text-sm text-gray-500">Amount: {item.amount}</p>
                                                    <p className="font-bold text-gray-700">${item.product.price}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-red-500 text-center">Product not available</p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Orders;
