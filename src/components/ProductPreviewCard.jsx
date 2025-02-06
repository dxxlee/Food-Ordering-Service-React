import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./elements/Button";

export const ProductPreviewCard = ({ product, updateCartCount }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem("Auth token"); // опять проверяем залогинен ли чел

    const addProduct = async () => {
        if (!isLoggedIn) {
            navigate("/register"); // если нет то рег
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
                },
                body: JSON.stringify({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                updateCartCount(updatedCart.items.length); // обновляем счетчик в корзине
            } else {
                const error = await response.json();
                console.error("Error adding to cart:", error.message);
            }
        } catch (err) {
            console.error("Something went wrong:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="p-6 rounded-lg bg-white shadow-md transition hover:shadow-lg max-w-xs mx-auto"
            whileHover={{ scale: 1.05 }}
        >
            {/*изображения*/}
            <div className="flex justify-center mb-4">
                <img src={product.imageUrl} className="w-40 h-40 rounded-xl object-cover" alt={product.name} />
            </div>

            {/*инфа о продукте*/}
            <div className="text-center">
                <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-500 text-sm mt-2">{product.description}</p>
                <div className="mt-2 text-lg text-green-500">{product.price} ₸</div>
            </div>

            {/*кнопка добавить*/}
            <motion.div 
                className="mt-4 flex justify-center"
                whileTap={{ scale: 0.9 }}
            >
                <Button 
                    onClick={addProduct} 
                    disabled={loading}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                >
                    {loading ? "Adding..." : "Add to Cart"}
                </Button>
            </motion.div>
        </motion.div>
    );
};
