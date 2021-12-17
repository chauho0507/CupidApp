import { createReducer } from '@reduxjs/toolkit';
import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  userList: {
    data: [],
    loading: false,
    error: null,
  },
  userInfo: {
    data: {},
    loading: false,
    error: null,
  },
  responseAction: {
    register: {
      loading: false,
      error: null,
    },
    login: {
      loading: false,
      error: null,
    },
    updateInfo: {
      loading: false,
      error: null,
    },
    changePassword: {
      loading: false,
      error: null,
    },
  },
};

const authReducer = createReducer(initialState, {
  [REQUEST(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
        loading: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          loading: true,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          loading: false,
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          loading: false,
          error,
        },
      },
    };
  },
  [REQUEST(AUTH_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          loading: true,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
      },
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          loading: false,
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;

    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          loading: false,
          error,
        },
      },
    };
  },

  [REQUEST(AUTH_ACTION.UPDATE_INFO)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        updateInfo: {
          ...state.responseAction.updateInfo,
          loading: true,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.UPDATE_INFO)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        updateInfo: {
          ...state.responseAction.updateInfo,
          loading: false,
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.UPDATE_INFO)]: (state, action) => {
    const { error } = action.payload;

    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        updateInfo: {
          ...state.responseAction.updateInfo,
          loading: false,
          error,
        },
      },
    };
  },

  [REQUEST(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        changePassword: {
          ...state.responseAction.changePassword,
          loading: true,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        changePassword: {
          ...state.responseAction.changePassword,
          loading: false,
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        changePassword: {
          ...state.responseAction.changePassword,
          loading: false,
          error,
        },
      },
    };
  },

  [REQUEST(AUTH_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: {},
      },
    };
  },
});

export default authReducer;
