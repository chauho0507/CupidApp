import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTER } from '../../constants/router';
import { loginAction } from '../../redux/actions/';

import { Button, Form, Input, Row } from 'antd';

const LoginFormPage = () => {
  const [loginForm] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { responseAction } = useSelector(state => state.authReducer);

  useEffect(() => {
    if (responseAction.login.error && !responseAction.login.loading) {
      if (responseAction.login.error === 'Incorrect password') {
        loginForm.setFields([
          {
            name: 'password',
            errors: [responseAction.login.error],
          },
        ]);
      } else {
        loginForm.setFields([
          {
            name: 'email',
            errors: [responseAction.login.error],
          },
        ]);
      }
    }
  }, [responseAction.login.error, responseAction.login.loading]);

  const submitHandler = values => {
    dispatch(
      loginAction({
        data: values,
        callback: {
          redirectHome: () => history.push(ROUTER.USER.HOME),
          redirectDashboard: () => history.push(ROUTER.ADMIN.DASHBOARD),
        },
      })
    );
  };

  return (
    <Form
      form={loginForm}
      name="login"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      onFinish={submitHandler}
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'E-mail chưa đúng định dạng!',
          },
          {
            required: true,
            whitespace: true,
            message: 'Bạn phải nhập e-mail.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Bạn phải nhập mật khẩu.',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Row justify="center">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default LoginFormPage;
