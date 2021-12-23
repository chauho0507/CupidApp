import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  getOrderLocationListAction,
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  updateOrderLocationAction,
  deleteOrderLocationAction,
  createOrderLocationAction,
} from '../../../../redux/actions';

import * as S from '../styles';

const OrderLocation = ({ userInfo }) => {
  const dispatch = useDispatch();

  const [locationForm] = Form.useForm();
  const [wardOptions, setWardOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [initialLocationForm, setInitialLocationForm] = useState({});
  const [isModify, setIsModify] = useState(null);
  const { orderLocationsList } = useSelector(
    state => state.orderLocationsReducer
  );
  const { cityList, districtList, wardList } = useSelector(
    state => state.commonReducer
  );

  const formInitialValues = initialLocationForm.id
    ? {
        ...initialLocationForm.values,
      }
    : {
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        ward: '',
        district: '',
        city: '',
        defaultLocation: false,
      };

  const renderCityOption = () => {
    return cityList.data.map(city => {
      return (
        <Select.Option key={city.id} value={city.code}>
          {city.name}
        </Select.Option>
      );
    });
  };

  const renderDistrictOption = () => {
    return districtOptions.map(district => {
      return (
        <Select.Option key={district.id} value={district.code}>
          {district.name}
        </Select.Option>
      );
    });
  };

  const renderWardOption = () => {
    return wardOptions.map(ward => {
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

  const handleSubmitLocationForm = values => {
    const city = cityList.data.find(city => city.code === values.city);
    const district = districtOptions.find(
      district => district.code === values.district
    );

    const ward = wardOptions.find(ward => ward.code === values.ward);
    const newValues = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      city: city?.name || values.city,
      district: district?.name || values.district,
      ward: ward?.name || values.ward,
    };
    const locationIds = orderLocationsList.data.map(location => location.id);

    if (isModify === 'update') {
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
    } else if (isModify === 'create') {
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
        <Col span={12} key={idx}>
          <S.LocationCard
            active={location.defaultLocation.toString()}
            hoverable={!location.defaultLocation}
            title={
              <Row justify="space-between" align="middle">
                {location.defaultLocation ? (
                  <Tag color="green">Mặc định</Tag>
                ) : (
                  <span />
                )}
                <Popconfirm
                  title="Bạn muốn xóa địa chỉ này chứ?"
                  cancelText="Hủy"
                  okText="Xác nhận"
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
                <S.H4>Tên:</S.H4> {location.info?.fullName}
                <S.H4>Email:</S.H4> {location.info?.email}
                <S.H4>Điện thoại:</S.H4> {location.info?.phoneNumber}
              </Col>
              <Col span={12}>
                <Row>
                  <S.H4>Địa chỉ:</S.H4>
                  {`${location.info?.address}-${location.info?.ward}-${location.info?.district}-${location.info?.city}`}
                </Row>

                <S.EditButton
                  type="primary"
                  onClick={() => {
                    setIsModify('update');
                    setInitialLocationForm({
                      values: {
                        ...location.info,
                        defaultLocation: location.defaultLocation,
                      },
                      id: location.id,
                    });
                  }}
                >
                  Sửa
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
            {isModify === 'update' ? 'Chỉnh sửa' : 'Thêm'} thông tin giao hàng
          </S.H3>
        }
        visible={!!isModify}
        onOk={() => locationForm.submit()}
        onCancel={() => {
          setIsModify(null);
        }}
        cancelText="Hủy"
        okText="Xác nhận"
        centered
        width={650}
      >
        <Form
          form={locationForm}
          name={
            isModify === 'update' ? 'updateLocationForm' : 'addLocationForm'
          }
          initialValues={formInitialValues}
          layout="vertical"
          onFinish={values => handleSubmitLocationForm(values)}
        >
          <Row justify="end">
            {initialLocationForm.default && <Tag color="green">Mặc định</Tag>}
          </Row>
          <Form.Item
            label={<S.H4>Họ và tên</S.H4>}
            name="fullName"
            rules={[{ required: true, message: 'Bạn cần nhập họ và tên' }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={<S.H4>Email</S.H4>}
                name="email"
                rules={[{ required: true, message: 'Bạn cần nhập email' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<S.H4>Số điện thoại</S.H4>}
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Bạn cần nhập số điện thoại' },
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
                label={<S.H4>Tỉnh/Thành</S.H4>}
                name="city"
                rules={[
                  { required: true, message: 'Bạn cần nhập Tỉnh/Thành!' },
                ]}
              >
                <Select
                  onChange={value => {
                    const curDistrictList = districtList.data.filter(
                      district => district.parentcode === value
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
                label={<S.H4>Quận/Huyện</S.H4>}
                name="district"
                rules={[
                  { required: true, message: 'Bạn cần nhập Quận/Huyện!' },
                ]}
              >
                <Select
                  onChange={value => {
                    const curWardList = wardList.data.filter(
                      ward => ward.parentcode === value
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
                label={<S.H4>Phường/Xã</S.H4>}
                name="ward"
                rules={[{ required: true, message: 'Bạn cần nhập Phường/Xã!' }]}
              >
                <Select>{renderWardOption()}</Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<S.H4>Địa chỉ</S.H4>}
            name="address"
            rules={[
              { required: true, message: 'Bạn cần nhập địa chỉ nhận hàng' },
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
              <S.H4>Đặt làm địa chỉ mặc định</S.H4>
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
          setIsModify('create');
          setInitialLocationForm({});
        }}
      >
        Thêm địa chỉ
      </Button>
      <Row gutter={[16, 16]}>{renderOrderLocations()}</Row>
      {renderModal()}
    </Card>
  );
};

export default OrderLocation;
