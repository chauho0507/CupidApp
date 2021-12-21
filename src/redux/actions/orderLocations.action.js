import { createAction } from '@reduxjs/toolkit';
import { ORDER_LOCATION_ACTION, REQUEST } from '../constants';

export const getOrderLocationListAction = createAction(
  REQUEST(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST)
);
export const createOrderLocationAction = createAction(
  REQUEST(ORDER_LOCATION_ACTION.CREATE_ORDER_LOCATION)
);

export const updateOrderLocationAction = createAction(
  REQUEST(ORDER_LOCATION_ACTION.UPDATE_ORDER_LOCATION)
);
export const deleteOrderLocationAction = createAction(
  REQUEST(ORDER_LOCATION_ACTION.DELETE_ORDER_LOCATION)
);
