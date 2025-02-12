import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo_variant_1 from "../assets/images/logo_variant_2.jpg";
import cartIcon from "../assets/icons/cart.svg";
import { motion } from "framer-motion";
// Импорт иконок
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = sessionStorage.getItem("Auth token");
    const user = sessionStorage.getItem("User");

    if (token && user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // загружаем кол товаров в корзине из базы
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("https://food-order-backend-6az2.onrender.com/api/cart",
        // const response = await fetch("http://localhost:8080/api/cart", 
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("Auth token")}` },
        });

        if (response.ok) {
          const data = await response.json();
          setCartCount(data.items.reduce((total, item) => total + item.amount, 0));
        } else {
          console.error("Failed to fetch cart data");
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("Auth token");
    sessionStorage.removeItem("User");
    setIsLoggedIn(false);
    navigate("/login");
    window.location.reload();
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      navigate("/register");
    } else {
      navigate("/cart");
    }
  };

  const handleMyOrdersClick = () => {
    if (!isLoggedIn) {
      navigate("/register");
    } else {
      navigate("/orders");
    }
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/register");
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      {/* Отступы для корректного отображения фиксированного header */}
      <div className="h-20 md:h-24"></div>

      <motion.nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all bg-white shadow-md ${
          isScrolled ? "py-3" : "py-5"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo_variant_1} 
              alt="logo" 
              className={`transition-all ${isScrolled ? "w-20" : "w-28"}`} 
            />
          </Link>

          {/* Навигационное меню */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-red-600 transition">
              Home
            </Link>
            <Link to="/about" className="text-lg font-semibold text-gray-700 hover:text-red-600 transition">
              About
            </Link>
            <button 
              onClick={handleMyOrdersClick} 
              className="text-lg font-semibold text-gray-700 hover:text-red-600 transition"
            >
              My Orders
            </button>
            <Link to="/menu" className="text-lg font-semibold text-gray-700 hover:text-red-600 transition">
              Menu
            </Link>
          </div>

          {/* Корзина и кнопки авторизации */}
          <div className="flex items-center space-x-6">
            <button onClick={handleCartClick} className="relative">
              <img src={cartIcon} alt="cart" className="w-8 h-8" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-gray-700">
                  Hello, {userName}!
                </span>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-1 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition"
                >
                  <FaUserCircle size={20} />
                  {/* Можно скрывать текст на маленьких экранах */}
                  <span className="hidden sm:inline">Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
                >
                  <FiLogOut size={20} />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-lg font-semibold text-gray-700 hover:text-red-600 transition">
                  Log In
                </Link>
                <Link to="/register" className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-600 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
};
