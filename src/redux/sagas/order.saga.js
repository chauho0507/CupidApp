import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { ORDER_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';
import { notification } from 'antd';

function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get(
      `https://cupid-bakery-api.herokuapp.com/orders`,
      {
        params: {
          _sort: 'id',
          _order: 'desc',
          userId,
        },
      }
    );
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_LIST),
      payload: { error: 'Lấy không được' },
    });
  }
}

function* orderCartSaga(action) {
  const { data, callback } = action.payload;
  try {
    yield axios.post('https://cupid-bakery-api.herokuapp.com/orders', data);

    yield data.products.forEach(productItem => {
      axios.delete(
        `https://cupid-bakery-api.herokuapp.com/carts/${productItem.cartId}`
      );
    });
    yield notification.success({
      message: 'Đặt hàng thành công!',
      placement: 'bottomRight',
    });
    yield callback.success();

    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_CART),
      payload: {
        cartIds: data.products.map(productItem => productItem.cartId),
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(ORDER_ACTION.ORDER_CART),
      payload: { error },
    });
  }
}

export function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getOrderListSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_CART), orderCartSaga);
}
