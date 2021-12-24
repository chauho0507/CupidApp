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
          <Card size="small">
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
                    <Row align="middle">
                      <S.Span>Họ và tên:</S.Span>&nbsp;&nbsp;&nbsp;
                      {userInfo.data.fullName}
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row align="middle">
                      <S.Span>Email:</S.Span>&nbsp;&nbsp;&nbsp;
                      {userInfo.data.email}
                    </Row>
                  </Col>
                </Row>
                <Row style={{ padding: '14px 0' }}>
                  <Col span={12}>
                    <Row align="middle">
                      <S.Span>Số điện thoại:</S.Span>&nbsp;&nbsp;&nbsp;
                      {userInfo.data.phoneNumber}
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row align="middle">
                      <S.Span>Địa chỉ:</S.Span>&nbsp;&nbsp;&nbsp;
                      {userInfo.data.address}
                    </Row>
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
                      <Form.Item
                        name="fullName"
                        label={<S.H3>Họ và tên</S.H3>}
                        rules={[
                          {
                            required: true,
                            message: 'Bạn cần nhập họ và tên!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Row gutter={6}>
                        <Col span={12}>
                          <Form.Item
                            name="email"
                            label={<S.H3>Email</S.H3>}
                            rules={[
                              {
                                required: true,
                                message: 'Bạn cần nhập email!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="phoneNumber"
                            label={<S.H3>Số điện thoại</S.H3>}
                            rules={[
                              {
                                required: true,
                                message: 'Bạn cần nhập số điện thoại!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="address"
                        label={<S.H3>Địa chỉ</S.H3>}
                        rules={[
                          { required: true, message: 'Bạn cần nhập địa chỉ!' },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Form>
                  </Row>
                </Modal>
              </TabPane>
            </Tabs>
          </Card>
          <Card size="small">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <KeyOutlined style={{ fontSize: 24 }} /> Mật khẩu
                  </span>
                }
                key="1"
              >
                <Form
                  form={changePasswordForm}
                  name="changePasswordForm"
                  initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }}
                  onFinish={values => handleChangePassword(values)}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Form.Item
                    label={<S.H3>Mật khẩu cũ</S.H3>}
                    name="oldPassword"
                    rules={[
                      { required: true, message: 'Bạn cần nhập mật khẩu!' },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label={<S.H3>Mật khẩu mới</S.H3>}
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
                    label={<S.H3>Xác nhận mật khẩu</S.H3>}
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
                  <Row justify="center">
                    <Button htmlType="submit" type="primary">
                      Thay đổi
                    </Button>
                  </Row>
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
