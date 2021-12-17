import { createAction } from '@reduxjs/toolkit';
import { BLOG_ACTION, REQUEST } from '../constants';

export const getBlogListAction = createAction(
  REQUEST(BLOG_ACTION.GET_BLOG_LIST)
);
export const getBlogDetailAction = createAction(
  REQUEST(BLOG_ACTION.GET_BLOG_DETAIL)
);
