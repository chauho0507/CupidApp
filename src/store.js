import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {
  productReducer,
  commonReducer,
  authReducer,
  categoryReducer,
  commentReducer,
  cartReducer,
  blogReducer,
  orderReducer,
  discountReducer,
  wishListsReducer,
  orderLocationsReducer,
} from './redux/reducers';

import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authReducer,
    commonReducer,
    productReducer,
    categoryReducer,
    commentReducer,
    cartReducer,
    blogReducer,
    orderReducer,
    discountReducer,
    wishListsReducer,
    orderLocationsReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);
