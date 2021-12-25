import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { BLOG_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* getBlogListSaga(action) {
  const { limit, page, more } = action.payload;
  try {
    const result = yield axios.get(
      'https://cupid-bakery-api.herokuapp.com/blogs',
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );
    yield put({
      type: SUCCESS(BLOG_ACTION.GET_BLOG_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          total: parseInt(result.headers['x-total-count']),
        },
        more,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(BLOG_ACTION.GET_BLOG_LIST),
      payload: { error },
    });
  }
}

function* getBlogDetailSaga(action) {
  const { id } = action.payload;
  try {
    const result = yield axios.get(
      `https://cupid-bakery-api.herokuapp.com/blogs/${id}`
    );
    yield put({
      type: SUCCESS(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: { error },
    });
  }
}
export function* blogSaga() {
  yield takeEvery(REQUEST(BLOG_ACTION.GET_BLOG_LIST), getBlogListSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.GET_BLOG_DETAIL), getBlogDetailSaga);
}
