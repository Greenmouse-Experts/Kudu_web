import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import usersReducer from '../reducers/userSlice';
import { storeSlice } from "../reducers/storeSlice";

const persistConfig = {
    key: 'root', // Key for the persisted data in storage
    storage,      // Storage method (localStorage)
};

const rootReducer = combineReducers({
    userData: usersReducer,
    [storeSlice.reducerPath]: storeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: ['persist/PERSIST'], // Ignore persist actions
            },
        }).concat(storeSlice.middleware),
});


export const persistor = persistStore(store);
export default store;
