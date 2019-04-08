import * as actionTypes from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import { setErrors } from "./errorsActions";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

export const checkForExpiredToken = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        setAuthToken(token);
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

const setAuthToken = async token => {
  if (token) {
    await AsyncStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});

export const login = (userData, navigation) => {
  console.log("TCL: login -> userData", userData);
  return async dispatch => {
    try {
      const response = await instance.post("login/", userData);
      const token = response.data.token;
      let decodedUser = jwt_decode(token);

      setAuthToken(token);
      dispatch(setCurrentUser(decodedUser));

      navigation.replace("MyProfile", { user: true });
    } catch (error) {
      dispatch(setErrors(error));
      console.error(error);
    }
  };
};

export const signup = (userData, navigation) => {
  return async dispatch => {
    try {
      let response = await instance.post("register/", userData);
      let user = response.data;
      let decodedUser = jwt_decode(user.token);

      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));

      navigation.replace("MyProfile", { user: true });

      // dispatch(login(userData, history));
    } catch (error) {
      dispatch(setErrors(error));
      console.error(error);
    }
  };
};
export const logout = navigation => {
  return dispatch => {
    setAuthToken();
    dispatch(setCurrentUser());

    // TODO: Make sure to name the nav screen to Login
    navigation.replace("Login");
  };
};

export const fetchProfileDetail = () => {
  return async dispatch => {
    try {
      const res = await instance.get("profile/detail/");

      const userprofile = res.data;
      console.log("TCL: fetchProfileDetail -> userprofile", userprofile);
      dispatch({
        type: actionTypes.FETCH_PROFILE_DETAIL,
        payload: userprofile
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const ProfileUpdate = profilePK => {
  return async dispatch => {
    try {
      const res = await instance.put(`profile/update/${profilePK}/`);
      const profile = res.data;
      dispatch({
        type: actionTypes.PROFILE_UPDATE,
        payload: profile
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchOrderDetail = orderID => {
  return async dispatch => {
    try {
      const res = await instance.get(`orders/detail/${orderID}/`);
      const order = res.data;

      dispatch({
        type: actionTypes.FETCH_ORDER_DETAIL,
        payload: order
      });
    } catch (error) {
      console.error(error.response);
    }
  };
};

export const getUserOrders = () => {
  return async dispatch => {
    try {
      const res = await instance.get("orders/list/");
      const orders = res.data;
      dispatch({
        type: actionTypes.GET_USER_ORDERS,
        payload: orders
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUserCartOrder = order => {
  return {
    type: actionTypes.GET_USER_CART_ORDER,
    payload: order
  };
};

export const createOrder = order => {
  return async dispatch => {
    try {
      const res = await instance.post("orders/create/", order);
      const newOrder = res.data;
      dispatch({
        type: actionTypes.CREATE_ORDER,
        payload: newOrder
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const addProductToCart = product => {
  return async dispatch => {
    try {
      const res = await instance.post("orderproduct/create/", product);
      const newProduct = res.data;

      dispatch({
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: newProduct
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const orderCheckout = orderID => {
  return async dispatch => {
    try {
      await instance.post("orders/update/", orderID);
      getUserOrders();
    } catch (error) {
      console.error(error);
    }
  };
};
