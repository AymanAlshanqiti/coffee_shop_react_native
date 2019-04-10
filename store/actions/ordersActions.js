import * as actionTypes from "./types";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

import { setErrors } from "./errorsActions";
export const getUserCart = orderID => {
  return async dispatch => {
    try {
      const res = await instance.get(`/orders/detail/${orderID}/`);
      const cartObj = res.data;
      dispatch({
        type: actionTypes.GET_USER_CART,
        payload: cartObj
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCartProduct = orderProductID => {
  return async dispatch => {
    try {
      await instance.delete(`orderproduct/delete/${orderProductID}/`);
    } catch (error) {
      console.error(error);
    }
  };
};

export const orderCheckout = (orderID, orderStatus) => {
  return async dispatch => {
    try {
      await instance.put(`orders/update/${orderID}`, orderStatus);

      dispatch({
        type: actionTypes.ORDER_CHECKOUT
      });
    } catch (error) {
      dispatch(setErrors(error));
      console.error(error);
    }
  };
};
