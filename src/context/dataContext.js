import createContext from "./createContext";
import * as actionTypes from "./actionTypes";
import { updateObject } from "./utility";

const dataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DATA_FROM_SERVER:
      return updateObject(state, {
        data: action.payload,
      });
    case actionTypes.ADD_TO_CART:
      return updateObject(state, {
        cartItems: action.payload.items,
        totalCost: action.payload.cost,
      });
    default:
      return state;
  }
};

const getDataFromServer = (dispatch) => async () => {
  const res = await fetch("http://localhost:5000/data");
  const data = await res.json();
  dispatch({ type: actionTypes.DATA_FROM_SERVER, payload: data });
};

const addItemToCart = (dispatch) => (items, cost) => {
  dispatch({ type: actionTypes.ADD_TO_CART, payload: { items, cost } });
};

export const { Provider, Context } = createContext(
  dataReducer,
  {
    getDataFromServer,
    addItemToCart,
  },
  {
    data: null,
    cartItems: [],
    totalCost: 0,
  }
);
