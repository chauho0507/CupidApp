import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

import { BackTop } from 'antd';

import * as S from './styles';

const DefaultLayout = ({ component: Component, ...rest }) => {
  const { isShowSidebar } = useSelector(state => state.commonReducer);

  return (
    <Route
      {...rest}
      render={routeProps => (
        <S.MainWrapper>
          <Header />
          <S.MainContainer>
            <Sidebar />
            <S.MainContent isShowSidebar={isShowSidebar}>
              <Component {...routeProps} />
            </S.MainContent>
          </S.MainContainer>
          <BackTop visibilityHeight={800} duration={600} />
          <Footer />
        </S.MainWrapper>
      )}
    />
  );
};

export default DefaultLayout;
