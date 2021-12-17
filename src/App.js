import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import DefaultLayout from './layouts/DefaultLayout';
import PrivateLayout from './layouts/PrivateLayout';

import LoginLayout from './layouts/LoginLayout';

import HomePage from './pages/user/Home';
import ProductListPage from './pages/user/ProductList';
import ProductDetailPage from './pages/user/ProductDetail';
import LoginAndRegisterAntDPage from './pages/LoginAndRegisterAntD';
import ContactPage from './pages/user/Contact';
import CartPage from './pages/user/Cart';
import TermsPage from './pages/user/Terms';
import BlogsPage from './pages/user/Blogs';
import BlogDetailPage from './pages/user/BlogDetail';
import ProfilePage from './pages/user/Profile';
import IntroductionPage from './pages/user/Introduction';
import NotFoundPage from './pages/NotFound';
import 'moment/locale/vi';

import './App.css';
import 'antd/dist/antd.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ROUTER } from './constants/router';
import { getUserInfoAction, getCartListAction } from './redux/actions';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo } = useSelector(state => state.authReducer);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      const decodedUserData = jwtDecode(userInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getCartListAction({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Switch>
        <DefaultLayout exact path={ROUTER.USER.HOME} component={HomePage} />
        <DefaultLayout
          exact
          path={ROUTER.USER.PRODUCT_LIST}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={ROUTER.USER.PRODUCT_DETAIL}
          component={ProductDetailPage}
        />
        <DefaultLayout
          exact
          path={ROUTER.USER.CONTACT}
          component={ContactPage}
        />
        <DefaultLayout exact path={ROUTER.USER.TERMS} component={TermsPage} />
        <DefaultLayout exact path={ROUTER.USER.BLOGS} component={BlogsPage} />
        <DefaultLayout
          exact
          path={ROUTER.USER.BLOG_DETAIL}
          component={BlogDetailPage}
        />
        <DefaultLayout
          exact
          path={ROUTER.USER.INTRODUCTION}
          component={IntroductionPage}
        />

        <PrivateLayout exact path={ROUTER.USER.CART} component={CartPage} />
        <PrivateLayout
          exact
          path={ROUTER.USER.PROFILE}
          component={ProfilePage}
        />

        <LoginLayout
          exact
          path={ROUTER.LOGIN}
          component={LoginAndRegisterAntDPage}
        />

        <Route path={ROUTER.NOT_FOUND} component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;
