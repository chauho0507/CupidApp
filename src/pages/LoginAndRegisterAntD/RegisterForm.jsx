import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { registerAction } from '../../redux/actions';

const RegisterFormPage = ({ setIsLogin }) => {
  const [registerForm] = Form.useForm();
  const { Option } = Select;
  const { userList } = useSelector(state => state.authReducer);

  const [terms, setTerms] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = values => {
    const emailIndex = userList.data.findIndex(
      user => user.email === values.email
    );
    if (emailIndex !== -1) {
      registerForm.setFields([
        {
          name: 'email',
          errors: ['E-mail đã tồn tại!'],
        },
      ]);
    } else {
      dispatch(
        registerAction({
          data: {
            ...values,
            phoneNumber: '',
            address: '',
            orderLocationId: null,
          },
        })
      );
      setIsLogin(true);
    }
  };

  const resetFormHandler = () => {
    registerForm.resetFields();
  };

  return (
    <Form
      name="register"
      form={registerForm}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onFinish={values => submitHandler(values)}
      scrollToFirstError
    >
      <Form.Item
        name="fullName"
        label="Họ và tên"
        validateFirst
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Bạn phải nhập tên.',
          },
          {
            min: 6,
            message: 'Tên phải dài hơn 6 kí tự.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        dependencies={['role']}
        rules={[
          {
            type: 'email',
            message: 'E-mail chưa đúng định dạng',
          },
          {
            required: true,
            whitespace: true,
            message: 'Bạn phải nhập e-mail',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: 'Bạn phải nhập mật khẩu.',
          },
          {
            min: 6,
            max: 24,
            message: 'Mật khẩu phải từ 6 đến 24 kí tự.',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="rePassword"
        label="Xác nhận mật khẩu"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Bạn phải xác nhận mật khẩu!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Mật khẩu xác nhận chưa đúng!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Giới tính"
        rules={[{ required: true, message: 'Bạn chưa xác nhận giới tính' }]}
      >
        <Select placeholder="Giới tính">
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>

      <Row justify="center" align="middle">
        <Form.Item name="terms">
          <Checkbox onChange={() => setTerms(!terms)}>
            Đồng ý điều khoản của chúng tôi.
          </Checkbox>
        </Form.Item>
      </Row>

      <Row justify="center" align="middle">
        <Form.Item>
          <Button disabled={!terms} type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            danger
            htmlType="button"
            style={{ marginLeft: 30 }}
            onClick={resetFormHandler}
          >
            Xóa
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default RegisterFormPage;
