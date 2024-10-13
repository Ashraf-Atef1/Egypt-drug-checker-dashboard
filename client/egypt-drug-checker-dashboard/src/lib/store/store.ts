import { rootReducer } from "./root.reducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Store } from "@reduxjs/toolkit";
import { Persistor } from "redux-persist";

interface EnhancedStore extends Store {
	__persistor?: Persistor;
}
const persistConfig = {
	key: "root",
	storage,
};
const makeConfiguredStore = () =>
	configureStore({
		reducer: rootReducer,
	});

export const makeStore = (): EnhancedStore => {
	const isServer = typeof window === "undefined";
	if (isServer) {
		return makeConfiguredStore();
	} else {
		const persistedReducer = persistReducer(persistConfig, rootReducer);
		const store = configureStore({
			reducer: persistedReducer,
		}) as EnhancedStore;
		store.__persistor = persistStore(store);
		return store as EnhancedStore;
	}
};

const store = makeStore();
export const persistor = persistStore(store);
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
