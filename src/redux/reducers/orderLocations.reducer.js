import { createReducer } from '@reduxjs/toolkit';
import { ORDER_LOCATION_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  orderLocationsList: {
    data: [],
    loading: false,
    error: null,
  },
  actionLoading: {
    createLocation: false,
    updateLocation: false,
    deleteLocation: false,
  },
};

const orderLocationsReducer = createReducer(initialState, {
  [REQUEST(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST)]: (state, action) => {
    return {
      ...state,
      orderLocationsList: {
        ...state.orderLocationsList,
        loading: true,
      },
    };
  },
  [SUCCESS(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderLocationsList: {
        ...state.orderLocationsList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(ORDER_LOCATION_ACTION.GET_ORDER_LOCATION_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderLocationsList: {
        ...state.orderLocationsList,
        loading: false,
        error,
      },
    };
  },
  [REQUEST(ORDER_LOCATION_ACTION.CREATE_ORDER_LOCATION)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        createLocation: true,
      },
    };
  },
  [SUCCESS(ORDER_LOCATION_ACTION.CREATE_ORDER_LOCATION)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        createLocation: false,
      },
    };
  },
  [FAIL(ORDER_LOCATION_ACTION.CREATE_ORDER_LOCATION)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        createLocation: false,
      },
    };
  },

  [SUCCESS(ORDER_LOCATION_ACTION.UPDATE_ORDER_LOCATION)]: (state, action) => {
    const { locationId, userId, info, defaultLocation } = action.payload;
    const newOrderLocationsList = [...state.orderLocationsList.data];
    newOrderLocationsList.forEach(
      location => (location.defaultLocation = false)
    );

    const orderIndex = newOrderLocationsList.findIndex(
      location => location.id === locationId
    );
    newOrderLocationsList.splice(orderIndex, 1, {
      userId,
      info,
      id: locationId,
      defaultLocation,
    });

    return {
      ...state,
      orderLocationsList: {
        ...state.orderLocationsList,
        data: newOrderLocationsList,
        loading: false,
        error: null,
      },
      actionLoading: {
        ...state.actionLoading,
        updateLocation: false,
      },
    };
  },
  [SUCCESS(ORDER_LOCATION_ACTION.DELETE_ORDER_LOCATION)]: (state, action) => {
    const { locationId } = action.payload;
    const newOrderLocationsList = [...state.orderLocationsList.data];
    const orderIndex = newOrderLocationsList.findIndex(
      location => location.id === locationId
    );
    newOrderLocationsList.splice(orderIndex, 1);

    return {
      ...state,
      orderLocationsList: {
        ...state.orderLocationsList,
        data: newOrderLocationsList,
        loading: false,
        error: null,
      },
      actionLoading: {
        ...state.actionLoading,
        deleteLocation: false,
      },
    };
  },
});

export default orderLocationsReducer;
