import * as actionTypes from "../actions/types";

const initialState = {
  userCart: null,
  userCartLoading: true
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_CART:
      return {
        ...state,
        userCart: action.payload,
        userCartLoading: false
      };
    default:
      return state;
  }
};

export default ordersReducer;
