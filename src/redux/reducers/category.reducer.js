import { createReducer } from '@reduxjs/toolkit';
import { CATEGORY_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  categoryList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },

  categoryDetail: {
    data: [],
    loading: false,
    error: null,
  },
};

const categoryReducer = createReducer(initialState, {
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: true,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data,
        meta,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        error,
      },
    };
  },
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_DETAIL)]: (state, action) => {
    return {
      ...state,
      categoryDetail: {
        ...state.categoryDetail,
        loading: true,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryDetail: {
        ...state.categoryDetail,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.GET_CATEGORY_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryDetail: {
        ...state.categoryDetail,
        loading: false,
        error,
      },
    };
  },
});

export default categoryReducer;
