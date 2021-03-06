import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Col,
  Row,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Popconfirm,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  getOrderLocationListAction,
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  updateOrderLocationAction,
  deleteOrderLocationAction,
  createOrderLocationAction,
} from "../../../../redux/actions";

import * as S from "../styles";

const OrderLocation = ({ userInfo }) => {
  const dispatch = useDispatch();

  const [locationForm] = Form.useForm();
  const [wardOptions, setWardOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [initialLocationForm, setInitialLocationForm] = useState({});
  const [isModify, setIsModify] = useState(null);
  const { orderLocationsList } = useSelector(
    (state) => state.orderLocationsReducer
  );
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.commonReducer
  );

  const formInitialValues = initialLocationForm.id
    ? {
        ...initialLocationForm.values,
      }
    : {
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        ward: "",
        district: "",
        city: "",
        defaultLocation: false,
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

  useEffect(() => {
    dispatch(getCityListAction());
    dispatch(getDistrictListAction());
    dispatch(getWardListAction());
    dispatch(getOrderLocationListAction({ userId: userInfo.data.id }));
  }, [dispatch, userInfo.data.id]);

  useEffect(() => {
    if (!!isModify) {
      locationForm.resetFields();
    }
  }, [isModify, locationForm]);

  const handleSubmitLocationForm = (values) => {
    const city = cityList.data.find((city) => city.code === values.city);
    const district = districtOptions.find(
      (district) => district.code === values.district
    );

    const ward = wardOptions.find((ward) => ward.code === values.ward);
    const newValues = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      city: city?.name || values.city,
      district: district?.name || values.district,
      ward: ward?.name || values.ward,
    };
    const locationIds = orderLocationsList.data.map((location) => location.id);

    if (isModify === "update") {
      dispatch(
        updateOrderLocationAction({
          defaultLocation: values.defaultLocation,
          locationIds,
          locationId: initialLocationForm.id,
          userId: userInfo.data.id,
          info: newValues,
          callback: {
            closeModal: () => setIsModify(null),
          },
        })
      );
    } else if (isModify === "create") {
      dispatch(
        createOrderLocationAction({
          defaultLocation: values.defaultLocation,
          locationIds,
          userId: userInfo.data.id,
          info: newValues,
          callback: {
            closeModal: () => setIsModify(null),
          },
        })
      );
    }
  };

  const renderOrderLocations = () => {
    return orderLocationsList.data?.map((location, idx) => {
      return (
        <Col xl={12} xs={24} key={idx}>
          <S.LocationCard
            active={location.defaultLocation.toString()}
            hoverable={!location.defaultLocation}
            title={
              <Row justify="space-between" align="middle">
                {location.defaultLocation ? (
                  <Tag color="green">M???c ?????nh</Tag>
                ) : (
                  <span />
                )}
                <Popconfirm
                  title="B???n mu???n x??a ?????a ch??? n??y ch????"
                  cancelText="H???y"
                  okText="X??c nh???n"
                  onConfirm={() => {
                    dispatch(
                      deleteOrderLocationAction({
                        locationId: location.id,
                        userId: userInfo.data.id,
                      })
                    );
                  }}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Row>
            }
          >
            <Row gutter={12}>
              <Col span={12}>
                <S.H4>T??n:</S.H4> {location.info?.fullName}
                <S.H4>Email:</S.H4> {location.info?.email}
                <S.H4>??i???n tho???i:</S.H4> {location.info?.phoneNumber}
              </Col>
              <Col span={12}>
                <Row>
                  <S.H4>?????a ch???:</S.H4>
                  {`${location.info?.address}-${location.info?.ward}-${location.info?.district}-${location.info?.city}`}
                </Row>

                <S.EditButton
                  type="primary"
                  onClick={() => {
                    setIsModify("update");
                    setInitialLocationForm({
                      values: {
                        ...location.info,
                        defaultLocation: location.defaultLocation,
                      },
                      id: location.id,
                    });
                  }}
                >
                  S???a
                </S.EditButton>
              </Col>
            </Row>
          </S.LocationCard>
        </Col>
      );
    });
  };
  const renderModal = () => {
    return (
      <Modal
        title={
          <S.H3>
            {isModify === "update" ? "Ch???nh s???a" : "Th??m"} th??ng tin giao h??ng
          </S.H3>
        }
        visible={!!isModify}
        onOk={() => locationForm.submit()}
        onCancel={() => {
          setIsModify(null);
        }}
        cancelText="H???y"
        okText="X??c nh???n"
        centered
        width={650}
      >
        <Form
          form={locationForm}
          name={
            isModify === "update" ? "updateLocationForm" : "addLocationForm"
          }
          initialValues={formInitialValues}
          layout="vertical"
          onFinish={(values) => handleSubmitLocationForm(values)}
        >
          <Row justify="end">
            {initialLocationForm.default && <Tag color="green">M???c ?????nh</Tag>}
          </Row>
          <Form.Item
            label={<S.H4>H??? v?? t??n</S.H4>}
            name="fullName"
            rules={[{ required: true, message: "B???n c???n nh???p h??? v?? t??n" }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={<S.H4>Email</S.H4>}
                name="email"
                rules={[{ required: true, message: "B???n c???n nh???p email" }]}
              >
                <Input />
              </Form.Item>
            </Col>
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
          </Row>

          <Row gutter={24}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                label={<S.H4>T???nh/Th??nh</S.H4>}
                name="city"
                rules={[
                  { required: true, message: "B???n c???n nh???p T???nh/Th??nh!" },
                ]}
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
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                label={<S.H4>Qu???n/Huy???n</S.H4>}
                name="district"
                rules={[
                  { required: true, message: "B???n c???n nh???p Qu???n/Huy???n!" },
                ]}
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
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                label={<S.H4>Ph?????ng/X??</S.H4>}
                name="ward"
                rules={[{ required: true, message: "B???n c???n nh???p Ph?????ng/X??!" }]}
              >
                <Select>{renderWardOption()}</Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<S.H4>?????a ch???</S.H4>}
            name="address"
            rules={[
              { required: true, message: "B???n c???n nh???p ?????a ch??? nh???n h??ng" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="defaultLocation"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox defaultChecked={initialLocationForm.defaultLocation}>
              <S.H4>?????t l??m ?????a ch??? m???c ?????nh</S.H4>
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <Card>
      <Button
        size="large"
        type="primary"
        block
        style={{ marginBottom: 16 }}
        icon={<PlusOutlined />}
        onClick={() => {
          setIsModify("create");
          setInitialLocationForm({});
        }}
      >
        Th??m ?????a ch???
      </Button>
      <Row gutter={[16, 16]}>{renderOrderLocations()}</Row>
      {renderModal()}
    </Card>
  );
};

export default OrderLocation;
