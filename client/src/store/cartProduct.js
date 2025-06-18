import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : []
}

const cartSlice = createSlice({
    name : "cartItem",
    initialState : initialState,
    reducers : {
        handleAddItemCart : (state,action)=>{
           state.cart = [...action.payload]
        },
        clearCart : (state) => {
            state.cart = []
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(item => item._id === action.payload);
            if (item) {
                item.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else if (item && item.quantity === 1) {
                state.cart = state.cart.filter(item => item._id !== action.payload);
            }
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
        }
    }
})

export const { handleAddItemCart, clearCart, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions

export default cartSlice.reducer