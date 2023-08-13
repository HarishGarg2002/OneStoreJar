import { combineReducers } from "redux";

const initialState = {
  likedCart: [],
};

const likedCartReducer = (state = initialState, action) => {
  // console.log("action", action);
  switch (action.type) {
    case "ADD_TO_LIKED_CART":
      return {
        likedCart: [...state.likedCart, action.payload],
      };
    case "REMOVE_FROM_LIKED_CART":
      return {
        likedCart: state.likedCart.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart: likedCartReducer,
});

export default rootReducer;
