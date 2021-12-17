import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';
import moment from 'moment';

import { DISCOUNT_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* checkDiscountSaga(action) {
  try {
    const { code, callback } = action.payload;
    const result = yield axios.get(
      `http://localhost:4000/discounts?code=${code}`
    );
    if (result.data.length > 0) {
      if (result.data[0].endDate > moment().valueOf()) {
        yield put({
          type: SUCCESS(DISCOUNT_ACTION.CHECK_DISCOUNT),
          payload: {
            data: {
              name: result.data[0].name,
              code: result.data[0].code,
              discountValue: result.data[0].discountValue,
              discountType: result.data[0].discountType,
            },
          },
        });
        yield callback.resetField();
      } else {
        notification.error({
          message: 'Mã giảm giá đã hết hạn',
          placement: 'bottomRight',
        });
        yield put({
          type: FAIL(DISCOUNT_ACTION.CHECK_DISCOUNT),
        });
        yield callback.resetField();
      }
    } else {
      notification.error({
        message: 'Mã giảm giá không hợp lệ',
        placement: 'bottomRight',
      });
      yield put({
        type: FAIL(DISCOUNT_ACTION.CHECK_DISCOUNT),
      });
      yield callback.resetField();
    }
  } catch (error) {
    yield put({
      type: FAIL(DISCOUNT_ACTION.CHECK_DISCOUNT),
    });
  }
}

export function* discountSaga() {
  yield takeEvery(REQUEST(DISCOUNT_ACTION.CHECK_DISCOUNT), checkDiscountSaga);
}
