import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    usertoken:AuthSlice
})

const persistRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,
                    REGISTER],
            },
        }),

});

// persist all data to local storage
const persistor = persistStore(store)

export { store, persistor };
