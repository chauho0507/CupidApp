import { createReducer } from '@reduxjs/toolkit';
import { WISHLISTS_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  wishLists: {
    data: [],
    loading: false,
    error: null,
  },
  actionLoading: {
    addToWishList: false,
    removeFromWishList: false,
  },
};

const wishListsReducer = createReducer(initialState, {
  [REQUEST(WISHLISTS_ACTION.GET_WISH_LIST)]: (state, action) => {
    return {
      ...state,
      wishLists: {
        ...state.wishLists,
        loading: true,
      },
    };
  },
  [SUCCESS(WISHLISTS_ACTION.GET_WISH_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wishLists: {
        ...state.wishLists,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(WISHLISTS_ACTION.GET_WISH_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      wishLists: {
        ...state.wishLists,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(WISHLISTS_ACTION.ADD_TO_WIST_LIST)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToWishList: true,
      },
    };
  },
  [SUCCESS(WISHLISTS_ACTION.ADD_TO_WIST_LIST)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToWishList: false,
      },
    };
  },
  [FAIL(WISHLISTS_ACTION.ADD_TO_WIST_LIST)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToWishList: false,
      },
    };
  },

  [SUCCESS(WISHLISTS_ACTION.REMOVE_FROM_WISH_LIST)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        removeFromWishList: false,
      },
    };
  },
});

export default wishListsReducer;
