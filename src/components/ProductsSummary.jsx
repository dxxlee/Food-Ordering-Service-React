import { ProductSummaryCard } from "./ProductSummaryCard";
import { motion } from "framer-motion";

export const ProductsSummary = ({ cart, updateCart }) => {
    const handleClearCart = async () => {
        try {
            const response = await fetch("https://food-order-backend-6az2.onrender.com/api/cart/clear", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
                },
            });

            if (response.ok) {
                updateCart([]); // очищаем корзину на фронте
            }
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
    };

    return (
        <motion.div
            className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/*текст*/}
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                Your Cart 🛒
            </h2>

            {/*кнопка очистки*/}
            {cart.length > 0 && (
                <motion.button
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300 w-full mb-4"
                    onClick={handleClearCart}
                    whileHover={{ scale: 1.05 }}
                >
                    Clear Cart
                </motion.button>
            )}

            {/*список блюд*/}
            <div className="space-y-4">
                {cart && cart.map((product, index) => (
                    <ProductSummaryCard product={product} key={index} updateCart={updateCart} />
                ))}
            </div>
        </motion.div>
    );
};
