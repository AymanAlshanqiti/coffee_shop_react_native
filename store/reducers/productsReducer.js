import * as actionTypes from "../actions/types";

const initialState = {
  products: [],
  productInfo: null,

  productsLoading: true,
  productInfoLoading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsLoading: false
      };

    case actionTypes.GET_PRODUCT_DETAIL:
      return {
        ...state,
        productInfo: action.payload,
        productInfoLoading: false
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        productInfoLoading: true
      };

    default:
      return state;
  }
};

export default reducer;
