import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./elements/Button";
import BannerImage from "../assets/images/chef.jpg";

export const Banner = () => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem("Auth token"); 

    const handleOrderNow = () => {
        if (isLoggedIn) {
            navigate("/menu"); 
        } else {
            navigate("/register"); 
        }
    };

    return (
        <div className="relative bg-gradient-to-r from-yellow-100 via-yellow-50 to-white py-16 px-6 md:px-12">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
                
                {/*текстовый блок*/}
                <motion.div 
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl font-bold text-gray-800 leading-tight">
                        Delicious Food, <span className="text-yellow-500">Delivered Fast</span>
                    </h2>
                    <p className="text-lg text-gray-600 mt-4">
                        Get your favorite meals delivered right to your door, fresh and tasty.  
                    </p>
                    
                    {/*кнопки*/}
                    <div className="mt-6 flex justify-center md:justify-start space-x-4">
                        <Button className="px-6 py-3 text-lg" onClick={handleOrderNow}>
                            Order Now
                        </Button>
                        <a 
                            href="/menu" 
                            className="text-yellow-600 hover:text-yellow-700 font-semibold text-lg border-b-2 border-yellow-500"
                        >
                            See Menu
                        </a>
                    </div>
                </motion.div>

                {/*картинка*/}
                <motion.div 
                    className="w-full md:w-1/2 flex justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img 
                        src={BannerImage} 
                        alt="banner" 
                        className="w-full mt-6 max-w-md md:max-w-lg rounded-lg shadow-lg"
                    />
                </motion.div>
            </div>
        </div>
    );
};
