import { createAction } from '@reduxjs/toolkit';
import { WISHLISTS_ACTION, REQUEST } from '../constants';

export const getWishListAction = createAction(
  REQUEST(WISHLISTS_ACTION.GET_WISH_LIST)
);
export const addToWishListAction = createAction(
  REQUEST(WISHLISTS_ACTION.ADD_TO_WIST_LIST)
);
export const removeFromWishListAction = createAction(
  REQUEST(WISHLISTS_ACTION.REMOVE_FROM_WISH_LIST)
);
