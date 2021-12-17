import { createReducer } from '@reduxjs/toolkit';
import { ORDER_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  orderList: {
    data: [],
    loading: false,
    error: null,
  },
  orderCheckout: {},
  orderInfo: {},
};

const orderReducer = createReducer(initialState, {
  [REQUEST(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: true,
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: false,
        error,
      },
    };
  },
  [REQUEST(ORDER_ACTION.ORDER_CART)]: (state, action) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: true,
      },
    };
  },
  [SUCCESS(ORDER_ACTION.ORDER_CART)]: (state, action) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(ORDER_ACTION.ORDER_CART)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(ORDER_ACTION.SET_CHECKOUT_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderCheckout: {
        ...data,
      },
    };
  },
  [REQUEST(ORDER_ACTION.SET_ORDER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderInfo: {
        ...data,
      },
    };
  },
});

export default orderReducer;
