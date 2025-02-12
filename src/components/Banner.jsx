import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./elements/Button";
import BannerImage from "../assets/images/pizzafromtop.png";

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

    // Состояние для обратного отсчёта
    const [countdown, setCountdown] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        // Задаем целевое время для скидки (например, через 24 часа от текущего момента)
        const targetTime = new Date();
        targetTime.setHours(targetTime.getHours() + 24);
        
        const interval = setInterval(() => {
          const now = new Date().getTime();
          const distance = targetTime.getTime() - now;
    
          if (distance < 0) {
            clearInterval(interval);
            setCountdown({ hours: "00", minutes: "00", seconds: "00" });
          } else {
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            setCountdown({
              hours: String(hours).padStart(2, "0"),
              minutes: String(minutes).padStart(2, "0"),
              seconds: String(seconds).padStart(2, "0"),
            });
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    return (
        <div className="relative bg-gradient-to-b from-red-100 via-green-70 to-white py-16 px-6 md:px-12 mb-20">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
                
                {/*текстовый блок*/}
                <motion.div 
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl font-bold text-gray-800 leading-tight">
                        Hungry?, <span className="text-red-500">Click & Savor – Your Meal, Delivered Fast.</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-bold mt-12">
                        Order 2 dishes and get a <span className="text-red-500">free coke🥤</span>. 
                    </p>
                    <p className="text-lg text-gray-600  mt-2">
                        The discount is still available: <span className="text-red-500 font-bold">{countdown.hours}  : {countdown.minutes}  : {countdown.seconds} </span> 
                    </p>
                    
                    {/*кнопки*/}
                    <div className="mt-6 flex justify-center md:justify-start space-x-4">
                        <Button className="px-6 py-3 text-lg" variant="primary" onClick={handleOrderNow}>
                            Order Now
                        </Button>
                        <a 
                            href="/menu" 
                            className="text-red-500 hover:text-red-600 font-semibold text-xl border-b-2 border-red-500"
                        >
                            See Menu
                        </a>
                    </div>
                </motion.div>

                {/*картинка*/}
                <motion.div 
                    className="absolute top-0 right-0 w-1/2 md:w-1/3 mt-12 md:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img 
                        src={BannerImage} 
                        alt="banner" 
                        className="w-full max-w-xl md:max-w-2xl"
                    />
                </motion.div>
            </div>
        </div>
    );
};
