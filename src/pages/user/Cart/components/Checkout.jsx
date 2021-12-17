import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Row,
  Col,
  Table,
  Input,
  Form,
  InputNumber,
  Button,
  Image,
  Checkbox,
  notification,
  Descriptions,
  Popconfirm,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import {
  updateCartProductAction,
  removeFromCartAction,
  setSelectedCartsAction,
  checkDiscountAction,
  setCheckoutInfoAction,
  getUserInfoAction,
} from '../../../../redux/actions';

import fallbackImg from '../../../../assets/img/fallback.png';
import { COLOR } from '../../../../constants/theme';
import * as S from '../styles';

const Checkout = ({ setCheckoutStep, userInfo }) => {
  const [discountForm] = Form.useForm();
  const dispatch = useDispatch();
  const { cartList, actionLoading, selectedCarts } = useSelector(
    state => state.cartReducer
  );
  const { discountInfo } = useSelector(state => state.discountReducer);

  const handleChangeQuantity = (id, quantity) => {
    dispatch(
      updateCartProductAction({
        data: { id, quantity },
      })
    );
  };

  const handleSelectCart = (e, item) => {
    const { checked } = e.target;

    console.log(item);

    if (checked) {
      dispatch(setSelectedCartsAction([...selectedCarts, item]));
    } else {
      const newSelectedCarts = selectedCarts.filter(
        selectedCart => selectedCart.id !== item.id
      );

      dispatch(setSelectedCartsAction(newSelectedCarts));
    }
  };

  const handleSelectAll = e => {
    const { checked } = e.target;
    if (checked) {
      const newCartList = cartList.data.map(cartItem => {
        return {
          id: cartItem.id,
          productId: cartItem.product.id,
          balance: cartItem.product.balance,
          image: cartItem.product.image,
          name: cartItem.product.name,
          price: cartItem.product.price,
          quantity: cartItem.quantity,
        };
      });
      dispatch(setSelectedCartsAction([...newCartList]));
    } else {
      dispatch(setSelectedCartsAction([]));
    }
  };

  const handleConfirmCart = () => {
    if (!selectedCarts.length) {
      notification.error({
        message: 'Bạn chưa chọn sản phẩm để mua!',
        placement: 'bottomRight',
      });
    } else {
      setCheckoutStep(1);
    }
  };

  const handleCheckDiscount = values => {
    dispatch(
      checkDiscountAction({
        code: values.discount,
        callback: { resetField: () => discountForm.resetFields() },
      })
    );
  };

  const columns = [
    {
      title: (
        <Checkbox
          onChange={e => handleSelectAll(e)}
          indeterminate={
            selectedCarts.length > 0 &&
            selectedCarts.length !== cartList.data.length
          }
          checked={
            selectedCarts.length === cartList.data.length &&
            cartList.data.length !== 0
          }
        />
      ),
      key: 'checked',
      render: (_, record) => (
        <Checkbox
          onChange={e => {
            console.log(record);
            handleSelectCart(e, record);
          }}
          checked={
            selectedCarts.findIndex(
              selectedCart => selectedCart.id === record.id
            ) !== -1
          }
        />
      ),
      width: '5%',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <Image
          fallback={fallbackImg}
          preview={false}
          src={record.image}
          alt="img"
          style={{ height: '100px', width: '100px', borderRadius: 4 }}
        />
      ),
      width: '16%',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <>
          <S.H2>{record.name}</S.H2>
          <S.Span>{record.productOption?.name}</S.Span>
        </>
      ),
      width: '34%',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <S.P>{`${(record.productOption
          ? record.price + record.productOption.price
          : record.price
        ).toLocaleString()} ₫`}</S.P>
      ),

      width: '12%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          style={{ width: 50 }}
          defaultValue={record.quantity}
          step={1}
          min={1}
          max={record.balance}
          onChange={value => {
            handleChangeQuantity(record.id, value);
          }}
        />
      ),
      width: '11%',
    },
    {
      title: 'Còn',
      dataIndex: 'balance',
      key: 'balance',
      width: '5%',
    },

    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <Popconfirm
          title="Bạn muốn xóa sản phẩm chứ?"
          cancelText="Hủy"
          okText="Xác nhận"
          onConfirm={() => {
            console.log(record);
            dispatch(
              removeFromCartAction({
                cartId: record.id,
              })
            );
          }}
        >
          <Button
            size="small"
            icon={
              <CloseOutlined style={{ fontSize: 20, color: COLOR.PRIMARY }} />
            }
            type="text"
          />
        </Popconfirm>
      ),
      width: '5%',
    },
  ];

  const cartTable = cartList.data.map(cart => {
    return {
      id: cart.id,
      key: cart.id,
      productId: cart.product.id,
      image: cart.product.image,
      name: cart.product.name,
      price: cart.product.price,
      quantity: cart.quantity,
      balance: cart.product.balance,
      productOption: cart.productOption || false,
    };
  });

  const RenderCartTableFooter = useMemo(() => {
    return (
      <S.CartFooter>
        <Form
          form={discountForm}
          onFinish={handleCheckDiscount}
          layout="inline"
        >
          <Form.Item label="Mã giảm giá" name="discount">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" ghost htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
          {discountInfo.data.code && <S.P>{discountInfo.data.name}</S.P>}
        </Form>
      </S.CartFooter>
    );
  }, [discountInfo.data.code]);

  const renderCartList = useMemo(() => {
    return (
      <Table
        size="small"
        loading={
          cartList.loading ||
          actionLoading.addToCart ||
          actionLoading.removeFromCart ||
          actionLoading.updateCartProduct
        }
        columns={columns}
        dataSource={cartTable}
        pagination={{ defaultPageSize: 10 }}
        footer={() => RenderCartTableFooter}
      />
    );
  }, [
    cartList.data,
    cartList.loading,
    actionLoading,
    selectedCarts,
    discountInfo.data.code,
  ]);

  const renderTotalPrice = useMemo(() => {
    let discountPrice = 0;
    const totalPrice = cartList.data.reduce((totalPrice, cartItem) => {
      const isChecked =
        selectedCarts.findIndex(
          selectedCart => selectedCart.id === cartItem.id
        ) !== -1;
      const unitPrice = cartItem.productOption
        ? cartItem.product.price + cartItem.productOption.price
        : cartItem.product.price;
      return (totalPrice += isChecked ? cartItem.quantity * unitPrice : 0);
    }, 0);

    if (discountInfo.data.discountType === 'percent') {
      discountPrice = totalPrice * (discountInfo.data.discountValue / 100);
    }
    if (discountInfo.data.discountType === 'cash') {
      discountPrice = discountInfo.data.discountValue;
    }

    dispatch(
      setCheckoutInfoAction({
        data: { discountPrice, finalPrice: totalPrice - discountPrice },
      })
    );

    return (
      <>
        <Descriptions bordered size="small" layout="horizontal">
          <Descriptions.Item label={<S.H4>Tạm tính</S.H4>} span={3}>
            <S.P>{`${totalPrice.toLocaleString()} ₫`}</S.P>
          </Descriptions.Item>
          <Descriptions.Item label={<S.H4>Giảm giá</S.H4>} span={3}>
            <S.P>{`${discountPrice.toLocaleString()} ₫`}</S.P>
          </Descriptions.Item>
          <Descriptions.Item label={<S.H4>Tổng tiền</S.H4>} span={3}>
            <S.P>
              {totalPrice
                ? `${parseInt(totalPrice - discountPrice).toLocaleString()} ₫`
                : '0 ₫'}
            </S.P>
          </Descriptions.Item>
        </Descriptions>
        <Button
          block
          type="primary"
          onClick={() => handleConfirmCart()}
          style={{ marginTop: 10 }}
        >
          Tiếp tục
        </Button>
      </>
    );
  }, [selectedCarts, cartList.data, discountInfo.data]);

  return (
    <Row gutter={16}>
      <Col span={18}>{renderCartList}</Col>
      <Col span={6}>
        <S.TotalWrapper>
          <Card bordered={false} size="small">
            {renderTotalPrice}
          </Card>
        </S.TotalWrapper>
      </Col>
    </Row>
  );
};

export default Checkout;
