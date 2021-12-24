import React, { useMemo } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";
import { Card, Col, Row, Table, Descriptions, Tag } from "antd";
import { HistoryOutlined } from "@ant-design/icons";

import { COLOR } from "../../../../constants/theme";
import { ROUTER } from "../../../../constants/router";

import * as S from "../styles";

const OrderHistory = () => {
  const history = useHistory();
  const { orderList } = useSelector((state) => state.orderReducer);

  const renderStatusOrder = (status) => {
    if (status === "pending") return <Tag color="green">Đang xác nhận</Tag>;
    else if (status === "confirmed")
      return <Tag color="orange">Đã xác nhận</Tag>;
    else if (status === "delivering") return <Tag color="blue">Đang giao</Tag>;
    else if (status === "delivered") return <Tag color="magenta">Đã giao</Tag>;
    else return <Tag color="red">Đơn bị hủy</Tag>;
  };

  const orderColumns = [
    {
      title: <S.H3>Mã đơn hàng</S.H3>,
      dataIndex: "orderCode",
      key: "orderCode",
      render: (item) => <b>{item}</b>,
      width: 140,
    },
    {
      title: <S.H3>Ngày mua</S.H3>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => moment(item).format("DD/MM/YYYY HH:mm"),
      width: 150,
    },
    {
      title: <S.H3>Danh sách sản phẩm</S.H3>,
      dataIndex: "productCount",
      key: "productCount",
      render: (_, record) =>
        record.products
          .map((item) => `${item.name} x ${item.quantity}`)
          .join(", "),
      ellipsis: true,
      width: 250,
    },
    {
      title: <S.H3>Tổng tiền</S.H3>,
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (item) => <S.Price>{item.toLocaleString()}₫</S.Price>,
      width: 100,
    },
    {
      title: <S.H3>Tình trạng</S.H3>,
      dataIndex: "status",
      key: "status",

      render: (item) => renderStatusOrder(item),
      width: 120,
    },
  ];

  const orderTableData = orderList.data.map((item) => ({
    ...item,
    key: item.id,
  }));

  const recordColumns = [
    {
      title: <S.H3>Tên sản phẩm</S.H3>,
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <S.Span
          onClick={() =>
            history.push({
              pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                id: record.id,
              }),
              state: record,
            })
          }
        >
          {record.name}
          {record.productOption?.name !== ""
            ? `(${record.productOption?.name})`
            : ""}
        </S.Span>
      ),
      width: "37%",
    },
    {
      title: <S.H3>Số lượng</S.H3>,
      dataIndex: "quantity",
      key: "quantity",
      render: (item) => <S.Quantity>{item}</S.Quantity>,
      width: "10%",
    },
    {
      title: <S.H3>Đơn giá</S.H3>,
      dataIndex: "price",
      key: "price",
      render: (item) => <S.Price>{item.toLocaleString()}₫</S.Price>,
      ellipsis: true,
      width: "20%",
    },
  ];

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
        headStyle={{ backgroundColor: COLOR.PRIMARY_DARK }}
      >
        <Table
          columns={orderColumns}
          dataSource={orderTableData}
          pagination={{ defaultPageSize: 10 }}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <Table
                  size="small"
                  columns={recordColumns}
                  dataSource={record.products}
                  tableLayout="fixed"
                  pagination={false}
                />
              );
            },
          }}
          tableLayout="fixed"
          scroll={{ x: 760 }}
        />
      </Card>
    </>
  );
};

export default OrderHistory;
