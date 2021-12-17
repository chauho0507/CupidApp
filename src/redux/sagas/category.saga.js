import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { CATEGORY_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get('http://localhost:4000/categories');
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: { error },
    });
  }
}

function* getCategoryDetailSaga(action) {
  const { id } = action.payload;
  try {
    const result = yield axios.get(`http://localhost:4000/categories/${id}`, {
      params: {
        _embed: 'products',
      },
    });
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_DETAIL),
      payload: {
        data: result.data.products,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CATEGORY_ACTION.GET_CATEGORY_DETAIL),
      payload: { error },
    });
  }
}
export function* categorySaga() {
  yield takeEvery(
    REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST),
    getCategoryListSaga
  );
  yield takeEvery(
    REQUEST(CATEGORY_ACTION.GET_CATEGORY_DETAIL),
    getCategoryDetailSaga
  );
}
