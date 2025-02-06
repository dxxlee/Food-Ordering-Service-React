const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = new Order({
      user: req.user.id,
      orderItems: orderItems.map(item => ({
        product: item.product,
        name: item.name,
        amount: item.amount,
        price: item.price,
      })),
      shippingAddress: {
        recipientName: shippingAddress.recipientName,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        apartment: shippingAddress.apartment || "",
        leaveAtDoor: shippingAddress.leaveAtDoor || false,
        city: shippingAddress.city,
      },
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    console.log(`Fetching orders for user: ${req.user.id}`);

    const orders = await Order.find({ user: req.user.id }).populate({
      path: "orderItems.product",
      select: "name price imageUrl"
    });

    const formattedOrders = orders.map(order => ({
      ...order._doc,
      orderItems: order.orderItems.map(item => ({
        ...item._doc,
        product: item.product || null,
      })),
    }));

    res.json(formattedOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders
};
