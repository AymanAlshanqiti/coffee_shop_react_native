import * as actionTypes from "./types";

export const setErrors = errors => ({
  type: actionTypes.SET_ERRORS,
  payload: errors
});
