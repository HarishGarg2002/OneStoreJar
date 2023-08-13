import store from "../store";

export const addToLikedCart = (item) => {
  store.dispatch({
    type: "ADD_TO_LIKED_CART",
    payload: item,
  });
};

export const removeFromLikedCart = (item) => {
  store.dispatch({
    type: "REMOVE_FROM_LIKED_CART",
    payload: item,
  });
};
