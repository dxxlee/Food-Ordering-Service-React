import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi"; // иконка мусорки

export const ProductSummaryCard = ({ product, updateCart }) => {
    const handleIncrement = async () => {
        try {
            const response = await fetch("https://food-order-backend-6az2.onrender.com/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
                },
                body: JSON.stringify({
                    productId: product.product,
                    name: product.name,
                    price: product.price
                }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                updateCart(updatedCart.items);
            }
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };

    const handleDecrement = async () => {
        try {
            const response = await fetch("https://food-order-backend-6az2.onrender.com/api/cart/decrease", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
                },
                body: JSON.stringify({ productId: product.product }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                updateCart(updatedCart.items);
            }
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };

    const handleRemove = async () => {
        try {
            const response = await fetch(`https://food-order-backend-6az2.onrender.com/api/cart/remove-item/${product.product}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
                },
            });

            if (response.ok) {
                const updatedCart = await response.json();
                updateCart(updatedCart.items);
            }
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    return (
        <motion.div
            className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/*изображения*/}
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/*инфа о блюде*/}
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-gray-800 font-bold">{`${product.price}$`}</p>
            </div>

            {/*управление количеством*/}
            <div className="flex items-center space-x-2">
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-lg transition"
                    disabled={product.amount <= 1}
                    onClick={handleDecrement}
                >
                    -
                </button>
                <span className="text-lg font-bold">{product.amount}</span>
                <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition"
                    onClick={handleIncrement}
                >
                    +
                </button>
            </div>

            {/*кнопка удалить*/}
            <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition flex items-center justify-center"
                onClick={handleRemove}
            >
                <FiTrash2 size={20} />
            </button>
        </motion.div>
    );
};
