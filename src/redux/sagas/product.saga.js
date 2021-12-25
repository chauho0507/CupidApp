import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';
import { DEFAULT_PRICE_FILTER } from '../../pages/user/ProductList/constants';

function* getProductListSaga(action) {
  try {
    const {
      limit,
      page,
      categoryFilter,
      priceFilter,
      sortFilter,
      keyword,
      more,
    } = action.payload;

    let categoryParam = '';
    if (categoryFilter) {
      categoryFilter.forEach((filterItem, filterIndex) => {
        const paramAnd = filterIndex === 0 ? '' : '&';
        categoryParam =
          categoryParam + `${paramAnd}categoryId=${filterItem.id}`;
      });
    }

    const result = yield axios.get(
      `https://cupid-bakery-api.herokuapp.com/products?${categoryParam}`,
      {
        params: {
          _limit: limit,
          _page: page,
          _expand: 'category',
          ...(keyword && { q: keyword }),
          ...(priceFilter &&
            (priceFilter[0] !== DEFAULT_PRICE_FILTER[0] ||
              priceFilter[1] !== DEFAULT_PRICE_FILTER[1]) && {
              price_gte: priceFilter[0],
              price_lte: priceFilter[1],
            }),
          ...(sortFilter && { _sort: 'price', _order: sortFilter }),
        },
      }
    );
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          total: parseInt(result.headers['x-total-count']),
        },
        more,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: { error },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(
      `https://cupid-bakery-api.herokuapp.com/products/${id}`,
      {
        params: {
          _expand: 'category',
          _embed: 'productOptions',
        },
      }
    );

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: { error },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    console.log(data);
    yield axios.post('https://cupid-bakery-api.herokuapp.com/products', data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
    });
    yield put({
      type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: { limit: 10, page: 1 },
    });

    yield callback.goBackList();
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: { error },
    });
  }
}

function* updateProductSaga(action) {
  const { id, data, callback } = action.payload;
  try {
    yield axios.patch(
      `https://cupid-bakery-api.herokuapp.com/products/${id}`,
      data
    );
    yield put({
      type: SUCCESS(PRODUCT_ACTION.UPDATE_PRODUCT),
    });
    yield put({
      type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: { limit: 10, page: 1 },
    });

    yield callback.goBackList();
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.UPDATE_PRODUCT),
      payload: { error },
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`https://cupid-bakery-api.herokuapp.com/products/${id}`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT),
    });
    yield put({
      type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: { limit: 10, page: 1 },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.DELETE_PRODUCT),
      payload: { error },
    });
  }
}

function* getTopSaleListSaga(action) {
  const { limit, page } = action.payload;
  try {
    const result = yield axios.get(
      'https://cupid-bakery-api.herokuapp.com/products',
      {
        params: {
          _limit: limit,
          _page: page,
          _sort: 'rating',
          _order: 'desc',
        },
      }
    );

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_TOP_SALE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_TOP_SALE_LIST),
      payload: { error },
    });
  }
}

export function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT), updateProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_TOP_SALE_LIST),
    getTopSaleListSaga
  );
}
