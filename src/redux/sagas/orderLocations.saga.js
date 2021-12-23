import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';

import { ORDER_LOCATION_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* getOrderLocationListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get('http://localhost:4000/orderLocations', {
      params: {
        userId,
      },
    });
    yield put({
      type: SUCCESS(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST),
      payload: { error },
    });
  }
}

function* createOrderLocation(action) {
  try {
    const { userId, info, callback, locationIds, defaultLocation } =
      action.payload;
    if (defaultLocation) {
      yield locationIds.forEach(id => {
        axios.patch(`http://localhost:4000/orderLocations/${id}`, {
          defaultLocation: false,
        });
      });
    }
    yield axios.post(`http://localhost:4000/orderLocations`, {
      userId,
      info,
      defaultLocation,
    });
    yield put({
      type: REQUEST(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST),
      payload: { userId },
    });
    yield put({
      type: SUCCESS(ORDER_LOCATION_ACTION.CREATE_ORDER_LOCATION),
    });
    yield notification.success({
      message: 'Đã thêm địa chỉ giao hàng!',
      placement: 'bottomRight',
    });
    yield callback.closeModal();
  } catch (error) {
    yield put({
      type: FAIL(ORDER_LOCATION_ACTION.CREATE_ORDER_LOCATION),
      payload: { error },
    });
  }
}
function* updateOrderLocation(action) {
  try {
    const { locationId, userId, info, callback, locationIds, defaultLocation } =
      action.payload;

    const newLocationIds = locationIds.filter(id => id !== locationId);

    yield newLocationIds.forEach(id => {
      axios.patch(`http://localhost:4000/orderLocations/${id}`, {
        defaultLocation: false,
      });
    });

    yield axios.patch(`http://localhost:4000/orderLocations/${locationId}`, {
      info,
      defaultLocation,
    });

    yield put({
      type: REQUEST(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST),
      payload: {
        userId,
      },
    });
    yield put({
      type: SUCCESS(ORDER_LOCATION_ACTION.UPDATE_ORDER_LOCATION),
    });
    yield notification.success({
      message: 'Cập nhật thành công',
      placement: 'bottomRight',
    });
    yield callback.closeModal();
  } catch (error) {
    yield put({
      type: FAIL(ORDER_LOCATION_ACTION.UPDATE_ORDER_LOCATION),
      payload: { error },
    });
  }
}

function* deleteOrderLocation(action) {
  try {
    const { locationId, userId } = action.payload;
    console.log(locationId, userId);
    yield axios.delete(`http://localhost:4000/orderLocations/${locationId}`);

    yield put({
      type: REQUEST(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST),
      payload: {
        userId,
      },
    });
    yield put({
      type: SUCCESS(ORDER_LOCATION_ACTION.DELETE_ORDER_LOCATION),
    });
  } catch (error) {
    yield put({
      type: FAIL(ORDER_LOCATION_ACTION.DELETE_ORDER_LOCATION),
      payload: { error },
    });
  }
}

export function* orderLocationsSaga() {
  yield takeEvery(
    REQUEST(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST),
    getOrderLocationListSaga
  );
  yield takeEvery(
    REQUEST(ORDER_LOCATION_ACTION.CREATE_ORDER_LOCATION),
    createOrderLocation
  );
  yield takeEvery(
    REQUEST(ORDER_LOCATION_ACTION.UPDATE_ORDER_LOCATION),
    updateOrderLocation
  );
  yield takeEvery(
    REQUEST(ORDER_LOCATION_ACTION.DELETE_ORDER_LOCATION),
    deleteOrderLocation
  );
}
