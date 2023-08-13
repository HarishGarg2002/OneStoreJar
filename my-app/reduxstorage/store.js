import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./likedCart/reducers";

const store = configureStore({ reducer: rootReducer });

// store.getState().cart.likedCart.map((item) => console.log(item));

// console.log(store.getState());

export default store;
