import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import PaymentSuccess from "../pages/PaymentSuccess";
import AdminDashboard from "../pages/AdminDashboard";  

import { useSelector } from "react-redux";
import { cartProducts } from "../stores/cart/cartSlice";
import { Footer } from "../components/Footer";
import  Profile from "../pages/Profile"; // Import Profile page


const Navigation = () => {
    const productsInCart = useSelector(cartProducts);

    return (
        <BrowserRouter>
            <Header cartCount={productsInCart ? productsInCart.length : 0} />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/menu" element={<Menu />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/payment-success" element={<PaymentSuccess />}/>
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default Navigation;