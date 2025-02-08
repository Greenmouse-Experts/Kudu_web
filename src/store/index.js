import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import usersReducer from '../reducers/userSlice';
import cartReducer from "../reducers/cartSlice";
import { storeSlice } from "../reducers/storeSlice";
// import { cartApi } from '../reducers/cartApi';

const persistConfig = {
    key: 'root', // Key for the persisted data in storage
    storage,      // Storage method (localStorage)
};

const rootReducer = combineReducers({
    user: usersReducer,
    cart: cartReducer,
    [storeSlice.reducerPath]: storeSlice.reducer,
    // [cartApi.reducerPath]: cartApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeSlice.middleware),
});


export const persistor = persistStore(store);
export default store;
