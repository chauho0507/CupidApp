import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Row, Col, Input, Select, Tag } from "antd";

import {
  setOrderInfoAction,
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
} from "../../../../redux/actions";
import * as S from "../styles";

const Information = ({ setCheckoutStep, userInfo }) => {
  const [informationForm] = Form.useForm();

  const dispatch = useDispatch();
  const { orderLocations } = userInfo.data;
  const defaultOrderLocation =
    orderLocations?.find((location) => location.defaultLocation === true) || {};
  const [wardOptions, setWardOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [orderLocationForm, setOrderLocationForm] =
    useState(defaultOrderLocation);

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.commonReducer
  );

  const { selectedCarts } = useSelector((state) => state.cartReducer);
  const { orderCheckout } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(getCityListAction());
    dispatch(getDistrictListAction());
    dispatch(getWardListAction());
  }, [dispatch]);

  const handleConfirmInformation = (values) => {
    const city = cityList.data.find((city) => city.code === values.city);
    const district = districtOptions.find(
      (district) => district.code === values.district
    );

    const ward = wardOptions.find((ward) => ward.code === values.ward);
    const newValues = {
      ...values,
      city: city?.name || values.city,
      district: district?.name || values.district,
      ward: ward?.name || values.ward,
    };

    dispatch(setOrderInfoAction({ data: newValues }));
    setCheckoutStep(2);
  };

  const renderOrderLocations = () => {
    return userInfo.data.orderLocations?.map((location) => {
      return (
        <Col span={12} key={location.id}>
          <S.LocationCard
            active={`${location.info?.address === orderLocationForm.address}`}
            size="small"
            onClick={() => {
              informationForm.setFieldsValue({ ...location.info });
              setOrderLocationForm({ ...location.info });
            }}
          >
            <Row gutter={12}>
              <Col span={12}>
                <S.H4>T??n:</S.H4> {location.info.fullName}
                <S.H4>Email:</S.H4> {location.info.email}
                <S.H4>??i???n tho???i:</S.H4> {location.info.phoneNumber}
              </Col>
              <Col span={12}>
                <Row>
                  <S.H4>?????a ch???:</S.H4>
                  {`${location.info.address}-${location.info.ward}-${location.info.district}-${location.info.city}`}
                </Row>

                {location.defaultLocation && (
                  <S.DefaultTag color="green">M???c ?????nh</S.DefaultTag>
                )}
              </Col>
            </Row>
          </S.LocationCard>
        </Col>
      );
    });
  };

  const renderSelectedCarts = () => {
    return selectedCarts.map((cartItem, cartIndex) => {
      return (
        <Row key={cartItem.id} justify="space-between">
          <Col>
            <S.H4>
              {cartItem.name} x {cartItem.quantity}
            </S.H4>
            <S.Span>{cartItem.productOption?.name}</S.Span>
          </Col>
          <Col>
            <S.P>{`${(
              cartItem.quantity *
              (cartItem.price + (cartItem.productOption?.price || 0))
            ).toLocaleString()} ???`}</S.P>
          </Col>
        </Row>
      );
    });
  };

  const renderCityOption = () => {
    return cityList.data.map((city) => {
      return (
        <Select.Option key={city.id} value={city.code}>
          {city.name}
        </Select.Option>
      );
    });
  };

  const renderDistrictOption = () => {
    return districtOptions.map((district) => {
      return (
        <Select.Option key={district.id} value={district.code}>
          {district.name}
        </Select.Option>
      );
    });
  };

  const renderWardOption = () => {
    return wardOptions.map((ward) => {
      return (
        <Select.Option key={ward.id} value={ward.code}>
          {ward.name}
        </Select.Option>
      );
    });
  };

  const renderInformationForm = () => {
    return (
      <Form
        initialValues={{ ...orderLocationForm.info }}
        form={informationForm}
        name="informationForm"
        layout="vertical"
        onFinish={(values) => handleConfirmInformation(values)}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={<S.H4>H??? v?? t??n</S.H4>}
              name="fullName"
              rules={[{ required: true, message: "B???n c???n nh???p h??? v?? t??n" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<S.H4>Email</S.H4>}
              name="email"
              rules={[{ required: true, message: "B???n c???n nh???p email" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={<S.H4>S??? ??i???n tho???i</S.H4>}
              name="phoneNumber"
              rules={[
                { required: true, message: "B???n c???n nh???p s??? ??i???n tho???i" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<S.H4>?????a ch???</S.H4>}
              name="address"
              rules={[
                { required: true, message: "B???n c???n nh???p ?????a ch??? nh???n h??ng" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label={<S.H4>T???nh/Th??nh</S.H4>}
              name="city"
              rules={[{ required: true, message: "B???n c???n nh???p t???nh/th??nh!" }]}
            >
              <Select
                onChange={(value) => {
                  const curDistrictList = districtList.data.filter(
                    (district) => district.parentcode === value
                  );
                  setDistrictOptions(curDistrictList);
                }}
              >
                {renderCityOption()}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<S.H4>Qu???n/Huy???n</S.H4>}
              name="district"
              rules={[{ required: true, message: "B???n c???n nh???p qu???n/huy???n!" }]}
            >
              <Select
                onChange={(value) => {
                  const curWardList = wardList.data.filter(
                    (ward) => ward.parentcode === value
                  );
                  setWardOptions(curWardList);
                }}
              >
                {renderDistrictOption()}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<S.H4>Ph?????ng/X??</S.H4>}
              name="ward"
              rules={[{ required: true, message: "B???n c???n nh???p ph?????ng/x??!" }]}
            >
              <Select>{renderWardOption()}</Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={<S.H4>Ghi ch??</S.H4>} name="note">
          <Input.TextArea
            placeholder="Y??u c???u khi giao h??ng ..."
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      {!!userInfo.data.orderLocations?.length && (
        <Row gutter={[16, 16]}>{renderOrderLocations()}</Row>
      )}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col md={16} xs={24}>
          <Card size="small">{renderInformationForm()}</Card>
        </Col>
        <Col md={8} xs={24}>
          <Card size="small" style={{ marginBottom: 16 }}>
            {renderSelectedCarts()}
            <Row justify="space-between">
              <S.H4>Gi???m gi??: </S.H4>
              <S.P>{`${orderCheckout.discountPrice.toLocaleString()} ???`}</S.P>
            </Row>
            <Row
              style={{ borderTop: "1px solid grey", paddingTop: 5 }}
              justify="space-between"
            >
              <Col>
                <S.H4>T???ng c???ng: </S.H4>
              </Col>
              <Col>
                <S.P>{`${orderCheckout.finalPrice.toLocaleString()} ???`}</S.P>
              </Col>
            </Row>
          </Card>
          <Button
            onClick={() => setCheckoutStep(0)}
            block
            style={{ marginBottom: 8 }}
          >
            Tr??? l???i
          </Button>
          <Button
            type="primary"
            block
            onClick={() => {
              informationForm.submit();
            }}
          >
            Ti???p t???c
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Information;
