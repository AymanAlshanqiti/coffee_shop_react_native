import * as actionTypes from "../actions/types";

const initialState = {
  user: null,
  userLoading: true,

  userOrders: [],
  userOrdersLoading: true,

  userOrderStatusCart: null,
  userOrderStatusCartLoading: true,

  profile: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_DETAIL:
      return {
        ...state,
        order: action.payload
      };

    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        userLoading: false
      };
    case actionTypes.FETCH_PROFILE_DETAIL:
      return {
        ...state,
        profile: action.payload
      };
    case actionTypes.PROFILE_UPDATE:
      return {
        ...state,
        profile: action.payload
      };

    case actionTypes.GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
        userOrdersLoading: false
      };

    case actionTypes.GET_USER_CART_ORDER:
      return {
        ...state,
        userOrderStatusCart: action.payload,
        userOrderStatusCartLoading: false
      };

    case actionTypes.CREATE_ORDER:
      return {
        ...state,
        userOrderStatusCart: action.payload
      };

    case actionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        userOrderProduct: action.payload
      };

    default:
      return state;
  }
};

export default profileReducer;
