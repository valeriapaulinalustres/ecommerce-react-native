import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import counterReducer from '../Features/Counter/counterSlice'
import shopReducer from '../Features/Shop/shopSlice'
import cartReducer from '../Features/Cart/cartSlice'
import { shopApi } from '../Services/shopServices'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from '../Services/authServices'
import userReducer from '../Features/User/userSlice'

const store = configureStore({
    reducer: {
        counterReducer,
        shopReducer,
        cartReducer,
        userReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
})

setupListeners(store.dispatch)

export default store