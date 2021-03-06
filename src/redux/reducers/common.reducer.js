import { createReducer } from '@reduxjs/toolkit';
import { COMMON_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  isShowSidebar: false,

  cityList: {
    data: [],
    loading: false,
    error: null,
  },
  districtList: {
    data: [],
    loading: false,
    error: null,
  },
  wardList: {
    data: [],
    loading: false,
    error: null,
  },
};

const commonReducer = createReducer(initialState, {
  [COMMON_ACTION.TOGGLE_SIDEBAR]: (state, action) => {
    return {
      ...state,
      isShowSidebar: !state.isShowSidebar,
    };
  },
  [SUCCESS(COMMON_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cityList: {
        data: data,
        loading: false,
        error: null,
      },
    };
  },

  [SUCCESS(COMMON_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      districtList: {
        data: data,
        loading: false,
        error: null,
      },
    };
  },

  [SUCCESS(COMMON_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wardList: {
        data: data,
        loading: false,
        error: null,
      },
    };
  },
});

export default commonReducer;
