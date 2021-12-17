import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Input, Card, Col, Row, Button, Modal, Tabs } from 'antd';

import { InfoCircleFilled, KeyOutlined } from '@ant-design/icons';

import {
  updateInfoAction,
  changePasswordAction,
} from '../../../../redux/actions';
import * as S from '../styles';

const Information = ({ userInfo }) => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const [updateInfoForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();
  const [showModal, setShowModal] = useState(false);

  const handleChangePassword = values => {
    dispatch(
      changePasswordAction({
        id: userInfo.data.id,
        data: {
          ...values,
          email: userInfo.data.email,
        },
        callback: {
          clearForm: () => changePasswordForm.resetFields(),
        },
      })
    );
  };

  const handleSubmitInfoForm = values => {
    dispatch(
      updateInfoAction({
        id: userInfo.data.id,
        data: { ...values },
        callback: {
          closeModal: () => setShowModal(false),
        },
      })
    );
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <InfoCircleFilled style={{ fontSize: 24 }} />
                    Thông tin
                  </span>
                }
                key="1"
              >
                <Row>
                  <Col span={12}>
                    <S.H3>Họ và tên:</S.H3>
                    {userInfo.data.fullName}
                  </Col>
                  <Col span={12}>
                    <S.H3>Email:</S.H3> {userInfo.data.email}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <S.H3>Số điện thoại:</S.H3> {userInfo.data.phoneNumber}
                  </Col>
                  <Col span={12}>
                    <S.H3>Địa chỉ:</S.H3> {userInfo.data.address}
                  </Col>
                </Row>
                <Row justify="end" align="middle">
                  <Button type="primary" onClick={() => setShowModal(true)}>
                    Cập nhật thông tin
                  </Button>
                </Row>
                <Modal
                  visible={showModal}
                  okText="Xác nhận"
                  onOk={() => updateInfoForm.submit()}
                  cancelText="Hủy"
                  onCancel={() => setShowModal(false)}
                >
                  <Row gutter={24} justify="center">
                    <Form
                      form={updateInfoForm}
                      name="updateInfoForm"
                      initialValues={userInfo.data}
                      layout="vertical"
                      onFinish={values => handleSubmitInfoForm(values)}
                    >
                      <Form.Item name="fullName" label="Họ và tên:">
                        <Input />
                      </Form.Item>
                      <Row gutter={6}>
                        <Col span={12}>
                          <Form.Item name="email" label="Email:">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="phoneNumber" label="Số điện thoại:">
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item name="address" label="Địa chỉ:">
                        <Input />
                      </Form.Item>
                    </Form>
                  </Row>
                </Modal>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <KeyOutlined style={{ fontSize: 24 }} /> Mật khẩu
                  </span>
                }
                key="2"
              >
                <Form
                  form={changePasswordForm}
                  name="changePasswordForm"
                  layout="vertical"
                  initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }}
                  onFinish={values => handleChangePassword(values)}
                >
                  <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[
                      { required: true, message: 'Bạn cần nhập mật khẩu!' },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Mật khẩu từ 6 đến 24 ký tự!',
                        min: 6,
                        max: 24,
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                      {
                        required: true,
                        message: 'Bạn phải xác nhận mật khẩu!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue('newPassword') === value
                          ) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error('Mật khẩu xác nhận chưa đúng!')
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Button htmlType="submit" type="primary">
                    Thay đổi
                  </Button>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Information;
