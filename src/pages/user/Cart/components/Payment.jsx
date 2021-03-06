import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Button, Row, Col, Radio, Space, Input } from 'antd';

import {
  UnorderedListOutlined,
  EnvironmentOutlined,
  DeliveredProcedureOutlined,
} from '@ant-design/icons';

import { orderCartAction } from '../../../../redux/actions';

import giaoNhanh from '../../../../assets/img/ship/giao-nhanh.png';
import giaoTietKiem from '../../../../assets/img/ship/giao-tiet-kiem.png';

import { BANK_LIST } from '../constants';
import { COLOR } from '../../../../constants/theme';
import * as S from '../styles';

const Payment = ({ setCheckoutStep }) => {
  const [paymentForm] = Form.useForm();
  const dispatch = useDispatch();
  const [isBanking, setIsBanking] = useState('');

  const { userInfo } = useSelector(state => state.authReducer);
  const { orderInfo } = useSelector(state => state.orderReducer);
  const { selectedCarts } = useSelector(state => state.cartReducer);
  const { orderCheckout } = useSelector(state => state.orderReducer);

  const randomOrderCode = () => {
    return Math.trunc((Math.random() + 1) * 100000);
  };

  const handleCheckATM = value => {
    if (value === 'atm') setIsBanking('atm');
    else if (value === 'visa') setIsBanking('visa');
    else setIsBanking('');
  };

  const handleConfirmPayment = values => {
    const newValues = {
      ...orderInfo,
      ...values,
      userId: userInfo.data.id,
      products: selectedCarts.map(cartItem => {
        return {
          id: cartItem.productId,
          cartId: cartItem.id,
          name: cartItem.name,
          price: cartItem.price,
          quantity: cartItem.quantity,
          productOption: cartItem.productOption,
        };
      }),
      totalPrice: orderCheckout.finalPrice,
      orderCode: randomOrderCode(),
      status: 'pending',
    };
    dispatch(
      orderCartAction({
        data: newValues,
        callback: {
          success: () => setCheckoutStep(3),
        },
      })
    );
  };

  const renderSelectedCarts = () => {
    return selectedCarts.map(cartItem => {
      return (
        <Row key={cartItem.id} justify="space-between">
          <S.H4 key={cartItem.id}>
            {cartItem.name} x {cartItem.quantity}
          </S.H4>
          <S.P>
            {(
              (cartItem.price + (cartItem.productOption?.price || 0)) *
              cartItem.quantity
            ).toLocaleString()}
            ???
          </S.P>
        </Row>
      );
    });
  };

  const renderBankList = () => {
    return BANK_LIST.map(bank => {
      return (
        <Radio.Button value={bank.name} style={{ height: 50 }} key={bank.id}>
          <img
            src={bank.image}
            alt="bank-img"
            style={{ width: 80, height: 'auto' }}
          />
        </Radio.Button>
      );
    });
  };

  return (
    <Card>
      <Row>
        <Col span={14}>
          <Space>
            <Form
              form={paymentForm}
              name="paymentForm"
              layout="vertical"
              initialValues={{ shipper: 'giaohangnhanh', paymentType: 'cod' }}
              onFinish={values => handleConfirmPayment(values)}
            >
              <Form.Item label={<S.H2>????n v??? giao h??ng:</S.H2>} name="shipper">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="giaohangnhanh">
                      <img
                        src={giaoNhanh}
                        alt="giao-nhanh"
                        style={{ height: 30, width: 30 }}
                      />{' '}
                      Giao h??ng nhanh
                    </Radio>
                    <Radio value="giaohangtietkiem">
                      <img
                        src={giaoTietKiem}
                        alt="giao-tiet-kiem"
                        style={{ height: 30, width: 30 }}
                      />{' '}
                      Giao h??ng ti???t ki???m
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<S.H2>Ph????ng th???c thanh to??n:</S.H2>}
                name="paymentType"
              >
                <Radio.Group onChange={e => handleCheckATM(e.target.value)}>
                  <Space direction="vertical">
                    <Radio value="cod">
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                        alt="cash-img"
                      />{' '}
                      Thanh to??n ti???n m???t khi nh???n h??ng
                    </Radio>
                    <Radio value="momo">
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg"
                        alt="momo-img"
                      />
                      Thanh to??n b???ng v?? MoMo
                    </Radio>
                    <Radio value="zaloPay">
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg"
                        alt="momo-img"
                      />
                      Thanh to??n b???ng v?? ZaloPay
                    </Radio>
                    <Radio value="atm">
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg"
                        alt="cash-img"
                      />{' '}
                      Th??? ATM n???i ?????a/Internet Banking (H??? tr??? Internet Banking)
                    </Radio>
                    {isBanking === 'atm' && (
                      <Card size="small">
                        <Radio.Group optionType="button">
                          <Space wrap={true}>{renderBankList()}</Space>
                        </Radio.Group>
                      </Card>
                    )}
                    <Radio value="visa">
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg"
                        alt="cash-img"
                      />{' '}
                      Thanh to??n b???ng th??? qu???c t??? Visa, Master, JCB
                    </Radio>
                    {isBanking === 'visa' && (
                      <Input.Group>
                        <Input
                          style={{ width: 'calc(100% - 100px)' }}
                          placeholder="M?? s??? th??? c???a b???n ..."
                        />
                        <Button
                          type="primary"
                          ghost
                          style={{
                            width: '100px',
                            backgroundColor: '#E6DBDF',
                          }}
                        >
                          X??c nh???n
                        </Button>
                      </Input.Group>
                    )}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Space>
        </Col>
        <Col span={10}>
          <Card
            size="small"
            style={{ marginBottom: 16 }}
            title={
              <S.H3>
                <EnvironmentOutlined /> Th??ng tin giao h??ng
              </S.H3>
            }
            headStyle={{ backgroundColor: COLOR.PRIMARY_DARK }}
            bodyStyle={{ backgroundColor: COLOR.PRIMARY_LIGHT }}
          >
            <Row justify="space-between">
              <S.H4>H??? v?? t??n:</S.H4>
              <p>{orderInfo.fullName}</p>
            </Row>
            <Row justify="space-between">
              <S.H4>??i???n tho???i:</S.H4>
              <p>{orderInfo.phoneNumber}</p>
            </Row>
            <Row justify="space-between">
              <S.H4>?????a ch???:</S.H4>
              <p>{`${orderInfo.address} - ${orderInfo.ward} - ${orderInfo.district} - ${orderInfo.city}`}</p>
            </Row>
          </Card>
          <Card
            size="small"
            style={{ marginBottom: 16 }}
            title={
              <S.H3>
                <UnorderedListOutlined /> Th??ng tin ????n h??ng
              </S.H3>
            }
            headStyle={{ backgroundColor: COLOR.PRIMARY_DARK }}
            bodyStyle={{ backgroundColor: COLOR.PRIMARY_LIGHT }}
          >
            {renderSelectedCarts()}
            <Row justify="space-between">
              <S.H4>Gi???m gi??</S.H4>
              <S.P>{orderCheckout.discountPrice.toLocaleString()}???</S.P>
            </Row>
            <hr />
            <Row justify="space-between">
              <S.H4>T???ng ti???n</S.H4>
              <S.P>{orderCheckout.finalPrice.toLocaleString()}???</S.P>
            </Row>
          </Card>
          <Button
            onClick={() => setCheckoutStep(1)}
            style={{ width: '100%', marginBottom: 8 }}
          >
            Tr??? l???i
          </Button>
          <Button
            type="primary"
            style={{ width: '100%' }}
            onClick={() => paymentForm.submit()}
          >
            Thanh to??n
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Payment;
