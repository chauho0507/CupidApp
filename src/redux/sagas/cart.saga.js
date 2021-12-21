import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';

import { CART_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* getCartListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get(
      'http://localhost:4000/carts?_expand=product&_expand=productOption',
      {
        params: {
          userId,
        },
      }
    );
    yield put({
      type: SUCCESS(CART_ACTION.GET_CART_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CART_ACTION.GET_CART_LIST),
      payload: { error },
    });
  }
}

function* addToCartSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.post(
      `http://localhost:4000/carts`,
      action.payload
    );
    yield put({
      type: SUCCESS(CART_ACTION.ADD_TO_CART),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(CART_ACTION.GET_CART_LIST),
      payload: {
        userId,
      },
    });
    yield notification.success({
      message: 'Thêm vào giỏ hàng thành công',
      placement: 'bottomRight',
    });
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.ADD_TO_CART),
      payload: { error: 'Lấy không được' },
    });
  }
}

function* updateCartProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.patch(`http://localhost:4000/carts/${data.id}`, {
      quantity: data.quantity,
    });
    yield callback.showSuccess();
    yield put({
      type: SUCCESS(CART_ACTION.UPDATE_CART_PRODUCT),
      payload: {
        data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.UPDATE_CART_PRODUCT),
      payload: { error: 'Lấy không được' },
    });
  }
}

function* removeFromCartSaga(action) {
  try {
    const { cartId } = action.payload;
    const result = yield axios.delete(`http://localhost:4000/carts/${cartId}`);
    yield console.log(result);
    yield put({
      type: SUCCESS(CART_ACTION.REMOVE_FROM_CART),
      payload: {
        cartId,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.REMOVE_FROM_CART),
      payload: { error: 'Lấy không được' },
    });
  }
}

export function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_CART_LIST), getCartListSaga);
  yield takeEvery(REQUEST(CART_ACTION.ADD_TO_CART), addToCartSaga);
  yield takeEvery(REQUEST(CART_ACTION.REMOVE_FROM_CART), removeFromCartSaga);
  yield takeEvery(
    REQUEST(CART_ACTION.UPDATE_CART_PRODUCT),
    updateCartProductSaga
  );
}
