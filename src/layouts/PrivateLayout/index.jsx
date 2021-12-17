import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { notification } from 'antd';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

import { ROUTER } from '../../constants/router';
import * as S from './styles';

const PrivateLayout = ({ component: Component, ...rest }) => {
  const { isShowSidebar } = useSelector(state => state.commonReducer);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    return <Redirect to={ROUTER.USER.HOME} />;
  }

  return (
    <Route
      {...rest}
      render={routeProps => (
        <>
          <Header />
          <S.MainContainer>
            <Sidebar />
            <S.MainContent isShowSidebar={isShowSidebar}>
              <Component {...routeProps} />
            </S.MainContent>
          </S.MainContainer>
          <Footer />
        </>
      )}
    />
  );
};

export default PrivateLayout;
