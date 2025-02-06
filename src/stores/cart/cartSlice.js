import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productWithID = { ...action.payload, product: action.payload.id, amount: 1 };
            return { products: [...state.products, productWithID] };
        },
        clearCart: (state) => {
            return { products: [] };
        },
        incrementProductAmount: (state, action) => {
            return { products: state.products.map(product => product.id === action.payload.id ? { ...product, amount: product.amount + 1 } : product) };
        },
        decrementProductAmount: (state, action) => {
            return { products: state.products.map(product => product.id === action.payload.id ? { ...product, amount: product.amount - 1 } : product) };
        }
    }
})

export const cartProducts = state => state.cart.products;

export const { addToCart, clearCart, incrementProductAmount, decrementProductAmount } = cartSlice.actions;

export default cartSlice.reducer;
