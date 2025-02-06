import { useSelector } from "react-redux";
import { getAddress } from "../stores/userInfo/addressSlice";
import { useNavigate } from "react-router-dom";
import Button from "./elements/Button";
import { motion } from "framer-motion";

const PaymentForm = ({ cart, setCart }) => {
  const address = useSelector(getAddress);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const order = {
        orderItems: cart,
        shippingAddress: address,
        totalPrice: cart.reduce((sum, item) => sum + item.price * item.amount, 0),
      };

      const response = await fetch("http://localhost:8080/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        setCart([]); // очистить корзину на фронте
        navigate("/payment-success");
      } else {
        const error = await response.json();
        console.error("Error creating order:", error.message);
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>

      {/*список товаров*/}
      <div className="max-h-60 overflow-y-auto space-y-3">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
            <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
            <div className="text-gray-800 flex-1 px-3">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm">Amount: {item.amount}</p>
            </div>
            <p className="font-bold text-gray-900">${(item.price * item.amount).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/*общ сумма*/}
      <div className="mt-4 p-3 bg-yellow-100 text-gray-900 font-bold text-lg text-center rounded-lg">
        Total: ${cart.reduce((sum, item) => sum + item.price * item.amount, 0).toFixed(2)}
      </div>

      {/*кнопка оплаты*/}
      <div className="mt-6 flex justify-center">
        <Button 
          onClick={handlePayment}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-lg transition-all"
        >
          Pay Now
        </Button>
      </div>
    </motion.div>
  );
};

export default PaymentForm;
