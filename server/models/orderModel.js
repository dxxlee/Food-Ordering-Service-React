const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    recipientName: { type: String, required: true }, 
    phone: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String, required: false },
    leaveAtDoor: { type: Boolean, default: false },
    city: { type: String, required: true },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
