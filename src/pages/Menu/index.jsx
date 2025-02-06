import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../../stores/menu/productsSlice";
import ProductDetailCard from "../../components/ProductDetailCard";
import { Tabs } from "../../components/Tabs";
import { addToCart } from "../../stores/cart/cartSlice";
import { motion } from "framer-motion";

const Menu = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const [activeTab, setActiveTab] = useState("");
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const onAddProduct = (product) => {
        dispatch(addToCart(product));
    };

    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        let categories = products.products.map((product) => product.name.name);
        let index = categories.findIndex(category => newActiveTab === category);
        setActiveTabIndex(index > -1 ? index : 0);
    };

    return (
        <div className="bg-white min-h-screen p-6">
            {products.status !== "fulfilled" ? (
                <div className="text-center text-lg text-gray-500">Loading menu...</div>
            ) : (
                <div className="menu-wrapper">
                    {products.products && (
                        <Tabs
                            list={products.products.map((product) => product.name.name)}
                            activeTab={activeTab}
                            onTabSwitch={onTabSwitch}
                        />
                    )}
                    
                    <motion.div
                        key={activeTabIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
                    >
                        {products.products &&
                            products.products[activeTabIndex].products.map((product, index) => (
                                <ProductDetailCard key={index} product={product} onAddProduct={onAddProduct} />
                            ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Menu;
