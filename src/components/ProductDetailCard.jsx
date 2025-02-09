import Button from "./elements/Button";
import { useState } from "react";

const ProductDetailCard = ({ product, onAddProduct }) => {
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://food-order-backend-6az2.onrender.com/api/cart/add", {
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
                onAddProduct(updatedCart.items);
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
        <div className="p-6 rounded-lg bg-white shadow-md transition hover:shadow-lg max-w-xs mx-auto">
            {/*изображения*/}
            <div className="flex justify-center mb-4">
                <img src={product.imageUrl} className="w-48 h-48 rounded-xl object-cover" alt={product.name} />
            </div>

            {/*инфа о блюде*/}
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-500 text-sm mt-2">{product.desciption}</p>
                <div className="mt-3 text-xl font-semibold text-yellow-500">${product.price}</div>
            </div>

            {/*кнопка добавитьб*/}
            <div className="mt-4 flex justify-center">
                <Button 
                    onClick={handleAddToCart} 
                    disabled={loading}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                >
                    {loading ? "Adding..." : "Add to Cart"}
                </Button>
            </div>
        </div>
    );
};

export default ProductDetailCard;
