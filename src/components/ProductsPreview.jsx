import React, { useState, useEffect } from "react";
import { ProductPreviewCard } from "./ProductPreviewCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const ProductsPreview = ({ updateCartCount }) => {
    const [products, setProducts] = useState([]);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    useEffect(() => {
        fetch("https://food-order-backend-6az2.onrender.com/api/products")
        // fetch("http://localhost:8080/api/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setProducts(data?.data || []))
            .catch((e) => console.error("Fetch error:", e));
    }, []);

    return (
        <div className="container mx-auto pb-4 w-2/3 text-black">
            <h2 className="text-center text-2xl font-bold mb-4 mt-5">Our Menu</h2>
            <Carousel responsive={responsive}>
                {products.length > 0 &&
                    products.map((product) => (
                        <div className="w-full p-3 mt-10" key={product._id}>
                            <ProductPreviewCard product={product} updateCartCount={updateCartCount} />
                        </div>
                    ))}
            </Carousel>
        </div>
    );
};
