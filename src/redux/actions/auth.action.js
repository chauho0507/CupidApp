import { createAction } from '@reduxjs/toolkit';
import { AUTH_ACTION, REQUEST } from '../constants';

export const getUserListAction = createAction(
  REQUEST(AUTH_ACTION.GET_USER_LIST)
);
export const getUserInfoAction = createAction(
  REQUEST(AUTH_ACTION.GET_USER_INFO)
);
export const registerAction = createAction(REQUEST(AUTH_ACTION.REGISTER));
export const loginAction = createAction(REQUEST(AUTH_ACTION.LOGIN));
export const logoutAction = createAction(REQUEST(AUTH_ACTION.LOGOUT));
export const updateInfoAction = createAction(REQUEST(AUTH_ACTION.UPDATE_INFO));
export const changePasswordAction = createAction(
  REQUEST(AUTH_ACTION.CHANGE_PASSWORD)
);
