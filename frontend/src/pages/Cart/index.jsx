import { useEffect, useState } from "react";
import { Tabs } from "../../components/Tabs";
import Button from "../../components/elements/Button";
import { ReactComponent as ArrowRightSvg } from "../../assets/icons/arrow-right-long-svgrepo-com.svg";
import useTabSwitch from "../../hooks/useTabSwitch";
import { AddressForm } from "../../components/AddressForm";
import { ProductsSummary } from "../../components/ProductsSummary";
import PaymentForm from "../../components/PaymentForm";

const Cart = () => {
    const tabs = ['Summary', 'Delivery', 'Payment'];
    const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/cart", {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("Auth token")}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Cart loaded:", data); 
            setCart(data.items || []);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className="bg-white min-h-screen flex flex-col items-center">
            {/* отступ, чтобы контейнер не был слишком близко к хедеру */}
            <div className="mt-32 md:mt-10"></div>  

            <div className="md:w-2/3 w-full mx-auto border border-gray-200 p-4 rounded-lg shadow-md sm:p-6 lg:p-8">
                <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />

                <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}`}>
                    
                    <ProductsSummary cart={cart} updateCart={setCart} />
                    <div className="flex justify-end p-4">
                        <Button variant="dark" className="flex items-center" onClick={() => handleTabSwitch('Delivery')}>
                            <span className="mr-1">Next</span>
                            <ArrowRightSvg />
                        </Button>
                    </div>
                </div>

                <div className={`tabs ${currentTab !== 'Delivery' ? 'hidden' : ''}`}>
                    <AddressForm onTabSwitch={handleTabSwitch} />
                </div>

                <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''}`}>
                    <PaymentForm cart={cart} setCart={setCart} />
                </div>
            </div>
        </div>
    );
};

export default Cart;
