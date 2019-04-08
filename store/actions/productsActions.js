import * as actionTypes from "./types";

import axios from "axios";
import { setErrors } from "./errorsActions";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

export const getAllProducts = () => {
  return async dispatch => {
    dispatch(setLoading());
    try {
      let res = await instance.get("products/list/");
      let products = res.data;

      dispatch({
        type: actionTypes.GET_ALL_PRODUCTS,
        payload: products
      });
    } catch (error) {
      dispatch(setErrors(error));
      console.error(error);
    }
  };
};

export const getProductDetail = prodID => {
  return async dispatch => {
    dispatch(setLoading());
    try {
      let res = await instance.get(`products/detail/${prodID}/`);
      let productInfo = res.data;

      dispatch({
        type: actionTypes.GET_PRODUCT_DETAIL,
        payload: productInfo
      });
    } catch (error) {
      dispatch(setErrors(error));
      console.error(error);
    }
  };
};

export const setLoading = () => ({
  type: actionTypes.SET_LOADING
});
