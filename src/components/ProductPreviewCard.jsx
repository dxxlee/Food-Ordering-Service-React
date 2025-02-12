// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Button from "./elements/Button";

// export const ProductPreviewCard = ({ product, updateCartCount }) => {
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const isLoggedIn = sessionStorage.getItem("Auth token"); // проверка на залогинен ли пользователь

//     const addProduct = async () => {
//         if (!isLoggedIn) {
//             navigate("/register"); // если нет, редиректим на регистрацию
//             return;
//         }

//         setLoading(true);
//         try {
//             // const response = await fetch("https://food-order-backend-6az2.onrender.com/api/cart/add",
//             const response = await fetch("http://localhost:8080/api/cart/add", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
//                 },
//                 body: JSON.stringify({
//                     productId: product._id,
//                     name: product.name,
//                     price: product.price,
//                     imageUrl: product.imageUrl,
//                 }),
//             });

//             if (response.ok) {
//                 const updatedCart = await response.json();
//                 updateCartCount(updatedCart.items.length); // обновляем счетчик корзины
//             } else {
//                 const error = await response.json();
//                 console.error("Error adding to cart:", error.message);
//             }
//         } catch (err) {
//             console.error("Something went wrong:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <motion.div 
//             className="p-6 rounded-xl bg-white shadow-lg transition transform hover:scale-105 hover:shadow-xl max-w-xs mx-auto mt-12"
//             whileHover={{ scale: 1.05 }}
//         >
//             {/* Изображение товара */}
//             <div className="flex justify-center mb-4">
//                 <img 
//                     src={product.imageUrl} 
//                     className="w-32 h-32 rounded-lg object-cover" 
//                     alt={product.name} 
//                 />
//             </div>

//             {/* Информация о товаре */}
//             <div className="text-center">
//                 <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
//                 <p className="text-gray-500 text-sm mt-2">{product.description}</p>
//                 <div className="mt-2 text-xl text-green-600 font-bold">{product.price} ₸</div>
//             </div>

//             {/* Кнопка добавить */}
//             <motion.div 
//                 className="mt-4 flex justify-center"
//                 whileTap={{ scale: 0.95 }}
//             >
//                 <Button 
//                     onClick={addProduct} 
//                     disabled={loading}
//                     className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-all duration-300"
//                 >
//                     {loading ? "Adding..." : "Add to Cart"}
//                 </Button>
//             </motion.div>
//         </motion.div>
//     );
// };


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
            const response = await fetch("https://food-order-backend-6az2.onrender.com/api/cart/add",
            // const response = await fetch("http://localhost:8080/api/cart/add",
             {
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
            className="p-6 rounded-lg bg-white shadow-lg transition hover:shadow-xl max-w-xs mx-auto"
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
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    {loading ? "Adding..." : "Add to Cart"}
                </Button>
            </motion.div>
        </motion.div>
    );
};
