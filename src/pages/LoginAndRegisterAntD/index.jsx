import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Row, Col, Image } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import cupidLogo from '../../assets/img/cupid-logo-3.png';
import { ROUTER } from '../../constants/router';

import * as S from './styles';

const LoginAndRegisterAntDPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  return (
    <S.LoginContainer>
      <Row>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 12, order: 1 }}
        >
          <S.LeftImage></S.LeftImage>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 12, order: 2 }}
        >
          <S.RightForm>
            <S.LoginForm>
              <S.LoginHeader>
                <Image
                  preview={false}
                  onClick={() => history.push(ROUTER.USER.HOME)}
                  src={cupidLogo}
                  alt="logo"
                  style={{ cursor: 'pointer', margin: 4, width: '100%' }}
                />
                <S.AuthHeader>
                  <S.LoginTitle
                    active={isLogin}
                    onClick={() => setIsLogin(true)}
                  >
                    Đăng nhập
                  </S.LoginTitle>
                  <S.LoginTitle
                    active={!isLogin}
                    onClick={() => setIsLogin(false)}
                  >
                    Đăng ký
                  </S.LoginTitle>
                </S.AuthHeader>
              </S.LoginHeader>
              {isLogin ? (
                <LoginForm />
              ) : (
                <RegisterForm setIsLogin={setIsLogin} />
              )}
            </S.LoginForm>
          </S.RightForm>
        </Col>
      </Row>
    </S.LoginContainer>
  );
};

export default LoginAndRegisterAntDPage;
