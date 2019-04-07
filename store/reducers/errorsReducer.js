import * as actionTypes from "../actions/types";

const initialState = {
  errors: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERRORS:
      return {
        errors: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
