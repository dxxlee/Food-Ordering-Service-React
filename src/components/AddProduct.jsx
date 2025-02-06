import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const AddProduct = ({ onAddProduct }) => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem("Auth token"); 

    const handleAddToCart = () => {
        if (isLoggedIn) {
            onAddProduct(); 
        } else {
            navigate("/register"); 
        }
    };

    return (
        <motion.div 
            className="flex justify-end"
            whileTap={{ scale: 0.9 }} 
        >
            <button 
                onClick={handleAddToCart} 
                className="bg-yellow-500 hover:bg-yellow-600 transition-all transform hover:scale-110 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-xl text-white"
            >
                +
            </button>
        </motion.div>
    );
};
