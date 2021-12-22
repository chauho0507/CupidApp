import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';

import { WISHLISTS_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* getWishListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get('http://localhost:4000/wishlists', {
      params: {
        userId,
        // _expand: 'product',
      },
    });
    yield put({
      type: SUCCESS(WISHLISTS_ACTION.GET_WISH_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(WISHLISTS_ACTION.GET_WISH_LIST),
      payload: { error },
    });
  }
}

function* addToWishListSaga(action) {
  try {
    const { userId, productId } = action.payload;
    const result = yield axios.post(`http://localhost:4000/wishlists`, {
      userId,
      productId,
    });
    yield put({
      type: REQUEST(WISHLISTS_ACTION.GET_WISH_LIST),
      payload: {
        userId,
      },
    });
    yield put({
      type: SUCCESS(WISHLISTS_ACTION.ADD_TO_WIST_LIST),
      payload: {
        data: result.data,
      },
    });
    yield notification.success({
      message: 'Đã yêu thích',
      placement: 'bottomRight',
    });
  } catch (error) {
    yield put({
      type: FAIL(WISHLISTS_ACTION.ADD_TO_WIST_LIST),
      payload: { error },
    });
  }
}

function* removeFromWishListSaga(action) {
  try {
    const { id, userId } = action.payload;
    yield axios.delete(`http://localhost:4000/wishlists/${id}`);
    yield put({
      type: REQUEST(WISHLISTS_ACTION.GET_WISH_LIST),
      payload: {
        userId,
      },
    });
    yield put({
      type: SUCCESS(WISHLISTS_ACTION.REMOVE_FROM_WISH_LIST),
    });
  } catch (error) {
    yield put({
      type: FAIL(WISHLISTS_ACTION.REMOVE_FROM_WISH_LIST),
      payload: { error },
    });
  }
}

export function* wishListsSaga() {
  yield takeEvery(REQUEST(WISHLISTS_ACTION.GET_WISH_LIST), getWishListSaga);
  yield takeEvery(
    REQUEST(WISHLISTS_ACTION.ADD_TO_WIST_LIST),
    addToWishListSaga
  );
  yield takeEvery(
    REQUEST(WISHLISTS_ACTION.REMOVE_FROM_WISH_LIST),
    removeFromWishListSaga
  );
}
