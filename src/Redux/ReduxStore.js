import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './Slices/ProductSlice'
import WhishListReducer from './Slices/WishListSlice'
import CartListReducer from './Slices/CartListSlice'
import AuthReducer from './Slices/AuthSlice'
import OrderReducer from './Slices/OrderSlice'

export default ReduxStore = configureStore({
    reducer: {
        products :ProductReducer ,
        wishList : WhishListReducer,
        cartList : CartListReducer,
        auth : AuthReducer,
        order : OrderReducer,
    }
  })