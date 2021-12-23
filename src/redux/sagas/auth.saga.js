import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { notification } from 'antd';

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* getUserInfoSaga(action) {
  const { id } = action.payload;
  try {
    const result = yield axios.get(`http://localhost:4000/users/${id}`, {
      params: {
        _embed: 'orderLocations',
      },
    });
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
    // if (result.data.user.role === 'admin') yield callback.redirectDashboard();
    // else yield callback.redirectHome();
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: { error: error.response.data },
    });
  }
}
function* loginSaga(action) {
  const { data, callback } = action.payload;
  try {
    const result = yield axios.post('http://localhost:4000/login', data);
    yield localStorage.setItem(
      'userInfo',
      JSON.stringify({
        accessToken: result.data.accessToken,
        role: result.data.user.role,
      })
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    yield notification.success({
      message: 'Đăng nhập thành công!',
      placement: 'bottomRight',
    });
    yield put({
      type: REQUEST(AUTH_ACTION.GET_USER_INFO),
      payload: {
        id: result.data.user.id,
      },
    });
    if (result.data.user.role === 'admin') yield callback.redirectDashboard();
    else yield callback.redirectHome();
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: { error: error.response.data },
    });
  }
}
function* registerSaga(action) {
  const { data, callback } = action.payload;
  try {
    yield axios.post('http://localhost:4000/register', data);
    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
    });
    yield notification.success({
      message: 'Đăng ký thành công!',
      placement: 'bottomRight',
    });
    yield callback.goBackLogin();
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error:
          error.response.data === 'Email already exists'
            ? 'Email đã tồn tại!'
            : 'Đăng kí không thành công!',
      },
    });
  }
}

function* updateInfoSaga(action) {
  const { id, data, callback } = action.payload;
  try {
    yield axios.patch(`http://localhost:4000/users/${id}`, data);
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
    yield callback.closeModal();
    yield put({
      type: SUCCESS(AUTH_ACTION.UPDATE_INFO),
    });
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.UPDATE_INFO),
      payload: { error: error.response.data },
    });
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post('http://localhost:4000/login', {
      email: data.email,
      password: data.oldPassword,
    });
    yield axios.patch(`http://localhost:4000/users/${id}`, {
      password: data.newPassword,
    });
    yield notification.success({
      message: 'Đổi mật khẩu thành công!',
      placement: 'bottomRight',
    });
    yield callback.clearForm();
    yield put({
      type: SUCCESS(AUTH_ACTION.CHANGE_PASSWORD),
    });
  } catch (error) {
    yield notification.error({
      message: 'Mật khẩu không đúng!',
      placement: 'bottomRight',
    });
    yield put({
      type: FAIL(AUTH_ACTION.CHANGE_PASSWORD),
      payload: {
        error,
      },
    });
  }
}

export function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.UPDATE_INFO), updateInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.CHANGE_PASSWORD), changePasswordSaga);
}
