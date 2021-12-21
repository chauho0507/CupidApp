import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, generatePath } from 'react-router-dom';
import { Card, Col, Row, Table, Descriptions, Tag } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';

import { COLOR } from '../../../../constants/theme';
import { ROUTER } from '../../../../constants/router';

import * as S from '../styles';

const OrderHistory = () => {
  const history = useHistory();
  const { orderList } = useSelector(state => state.orderReducer);

  const orderColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode',
      render: item => <b>{item}</b>,
      width: '15%',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: item => moment(item).format('DD/MM/YYYY HH:mm'),
      width: '16%',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productCount',
      key: 'productCount',
      render: (_, record) =>
        record.products
          .map(item => `${item.name} x ${item.quantity}`)
          .join(', '),
      ellipsis: true,
      width: '45%',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: item => <S.P>{item.toLocaleString()}₫</S.P>,
      width: '12%',
    },
    {
      title: 'Tình trạng đơn hàng',
      dataIndex: 'status',
      key: 'status',
      render: item => <Tag color="green">{item}</Tag>,
      width: '12%',
    },
  ];

  const orderTableData = orderList.data.map(item => ({
    ...item,
    key: item.id,
  }));

  return (
    <>
      <Card
        size="small"
        bordered={false}
        title={
          <S.H2>
            <HistoryOutlined /> Lịch sử đơn hàng
          </S.H2>
        }
        headStyle={{ backgroundColor: COLOR.PRIMARY }}
      >
        <Table
          columns={orderColumns}
          dataSource={orderTableData}
          pagination={{ defaultPageSize: 5 }}
          expandable={{
            expandedRowRender: record => {
              return record.products.map(item => (
                <Card
                  size="small"
                  bordered={false}
                  key={item.id}
                  onClick={() =>
                    history.push({
                      pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                        id: item.id,
                      }),
                      state: item,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <Descriptions>
                    <Row>
                      <Col span={14}>
                        <Descriptions.Item label="Sản phẩm">
                          <S.H3>
                            {item.name}
                            {item.productOption?.name
                              ? `(${item.productOption?.name})`
                              : ''}
                          </S.H3>
                        </Descriptions.Item>
                      </Col>
                      <Col span={3}>
                        <Descriptions.Item label="Số lượng">
                          <S.H3>{item.quantity}</S.H3>
                        </Descriptions.Item>
                      </Col>
                      <Col span={7}>
                        <Descriptions.Item label="Thành tiền">
                          <S.P>{`${(
                            (item.productOption?.price
                              ? item.price + item.productOption.price
                              : item.price) * item.quantity
                          ).toLocaleString()} ₫`}</S.P>
                        </Descriptions.Item>
                      </Col>
                    </Row>
                  </Descriptions>
                </Card>
              ));
            },
          }}
        />
      </Card>
    </>
  );
};

export default OrderHistory;
