import React, { useState } from 'react';
import { Steps, Row, Col, Card } from 'antd';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, Image } from 'antd';

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
import { BREADCRUMB } from './constants';

import emptyCart from '../../../assets/img/emptyCart.png';
import { ROUTER } from '../../../constants/router';

import * as S from './styles';

const CartPage = () => {
  const history = useHistory();
  const [checkoutStep, setCheckoutStep] = useState(0);
  const { cartList } = useSelector(state => state.cartReducer);
  const { userInfo } = useSelector(state => state.authReducer);

  return (
    <>
      <TopWrapper titlePage="Giỏ hàng" breadcrumb={BREADCRUMB} height={180} />
      <S.CartContainer>
        {!!cartList.data.length ? (
          <>
            <div>
              <Steps current={checkoutStep} type="navigation">
                <Steps.Step
                  description="Giỏ hàng"
                  icon={<ShoppingCartOutlined style={{ fontSize: 32 }} />}
                />
                <Steps.Step
                  description="Thông tin"
                  icon={<InfoCircleOutlined style={{ fontSize: 32 }} />}
                />
                <Steps.Step
                  description="Thanh toán"
                  icon={<CreditCardOutlined style={{ fontSize: 32 }} />}
                />
                <Steps.Step
                  description="Hoàn tất"
                  icon={<CheckCircleOutlined style={{ fontSize: 32 }} />}
                />
              </Steps>
            </div>
            <Row gutter={32}>
              <Col span={24}>
                {checkoutStep === 0 && (
                  <Checkout
                    setCheckoutStep={setCheckoutStep}
                    userInfo={userInfo}
                  />
                )}
                {checkoutStep === 1 && (
                  <Information
                    setCheckoutStep={setCheckoutStep}
                    userInfo={userInfo}
                  />
                )}
                {checkoutStep === 2 && (
                  <Payment
                    setCheckoutStep={setCheckoutStep}
                    userInfo={userInfo}
                  />
                )}
                {checkoutStep === 3 && (
                  <Success setCheckoutStep={setCheckoutStep} />
                )}
              </Col>
            </Row>
          </>
        ) : (
          <S.EmptyCart>
            <Image
              preview={false}
              src={emptyCart}
              alt="empty cart"
              style={{ borderRadius: 4, height: '30vh', width: 'auto' }}
            />
            <S.H2>Giỏ hàng trống</S.H2>
            <Button
              type="primary"
              onClick={() => history.push(ROUTER.USER.PRODUCT_LIST)}
            >
              Mua Ngay
            </Button>
          </S.EmptyCart>
        )}
      </S.CartContainer>
    </>
  );
};

export default CartPage;
