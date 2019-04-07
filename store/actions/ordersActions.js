import * as actionTypes from "./types";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

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
      await instance.delete(`/orderproduct/delete/${orderProductID}/`);
    } catch (error) {
      console.error(error);
    }
  };
};
