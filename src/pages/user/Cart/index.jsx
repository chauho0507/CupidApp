import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Steps, Row, Col } from 'antd';
import jwtDecode from 'jwt-decode';

import { useDispatch, useSelector } from 'react-redux';

import {
  ShoppingCartOutlined,
  InfoCircleOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import TopWrapper from '../../../components/TopWrapper';
import Checkout from './components/Checkout';
import Information from './components/Information';
import Payment from './components/Payment';
import Success from './components/Success';

import { getUserInfoAction } from '../../../redux/actions';
import { BREADCRUMB } from './constants';

import * as S from './styles';

const CartPage = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      const decodedUserData = jwtDecode(userInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
  }, []);

  useEffect(() => {
    setCheckoutStep(state.checkoutStep);
  }, [state]);

  const [checkoutStep, setCheckoutStep] = useState(0);
  const { userInfo } = useSelector(state => state.authReducer);

  return (
    <>
      <TopWrapper titlePage="Giỏ hàng" breadcrumb={BREADCRUMB} height={180} />
      <S.StepContainer>
        <S.StepContent>
          <Steps current={checkoutStep} type="navigation">
            <Steps.Step
              title="Giỏ hàng"
              icon={<ShoppingCartOutlined style={{ fontSize: 32 }} />}
            />
            <Steps.Step
              title="Thông tin"
              icon={<InfoCircleOutlined style={{ fontSize: 32 }} />}
            />
            <Steps.Step
              title="Thanh toán"
              icon={<CreditCardOutlined style={{ fontSize: 32 }} />}
            />
            <Steps.Step
              title="Hoàn tất"
              icon={<CheckCircleOutlined style={{ fontSize: 32 }} />}
            />
          </Steps>
        </S.StepContent>
      </S.StepContainer>
      <S.CartContainer>
        <Row gutter={32}>
          <Col span={24}>
            {checkoutStep === 0 && (
              <Checkout setCheckoutStep={setCheckoutStep} userInfo={userInfo} />
            )}
            {checkoutStep === 1 && (
              <Information
                setCheckoutStep={setCheckoutStep}
                userInfo={userInfo}
              />
            )}
            {checkoutStep === 2 && (
              <Payment setCheckoutStep={setCheckoutStep} userInfo={userInfo} />
            )}
            {checkoutStep === 3 && (
              <Success setCheckoutStep={setCheckoutStep} />
            )}
          </Col>
        </Row>
      </S.CartContainer>
    </>
  );
};

export default CartPage;
