import { useHistory } from 'react-router-dom';

import { Row, Col, Divider } from 'antd';
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  GooglePlusOutlined,
} from '@ant-design/icons';

import cupidLogo from '../../assets/img/cupid-logo-3.png';
import { ROUTER } from '../../constants/router';
import { COLOR } from '../../constants/theme';
import * as S from './styles';

const Footer = () => {
  const history = useHistory();

  const renderContactLogo = () => {
    return (
      <S.Logo>
        <a
          href="https:\\google.com.vn"
          target="_blank"
          rel="noreferrer"
          title="Facebook"
        >
          <FacebookOutlined />
        </a>
        <a
          href="https:\\google.com.vn"
          target="_blank"
          rel="noreferrer"
          title="Instagram"
        >
          <InstagramOutlined />
        </a>
        <a
          href="https:\\google.com.vn"
          target="_blank"
          rel="noreferrer"
          title="Twitter"
        >
          <TwitterOutlined />
        </a>
        <a
          href="https:\\google.com.vn"
          target="_blank"
          rel="noreferrer"
          title="GooglePlus"
        >
          <GooglePlusOutlined />
        </a>
      </S.Logo>
    );
  };

  return (
    <S.Footer>
      {/* <Row gutter={[0, 16]} align="top" justify="center">
        <Col
          sm={{ span: 12 }}
          md={{ offset: 2, span: 4 }}
          lg={{ offset: 2, span: 4 }}
        >
          <img src={cupidLogo} alt="logo" style={{ width: '100%' }}></img>
          <p>
            Được phục vụ quý khách là niềm vinh hạnh của chúng tôi. Hãy liên lạc
            nhé!
          </p>
          {renderContactLogo()}
        </Col>
        <Col
          sm={{ offset: 2, span: 22 }}
          md={{ offset: 1, span: 17 }}
          lg={{ offset: 2, span: 16 }}
        >
          <table width="100%">
            <thead style={{ textAlign: 'left' }}>
              <tr>
                <th>
                  <S.H2>PHÁP LÝ & CÂU HỎI</S.H2>
                </th>
                <th>
                  <S.H2>THỜI GIAN LÀM VIỆC</S.H2>
                </th>
                <th>
                  <S.H2>LIÊN HỆ</S.H2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td onClick={() => history.push(ROUTER.USER.INTRODUCTION)}>
                  <S.Link>Giới thiệu</S.Link>
                </td>
                <td>Thứ 2-Thứ 7: 8am - 9pm</td>
                <td>
                  <b>(0236) 387 2428</b>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td onClick={() => history.push(ROUTER.USER.CART)}>
                  <S.Link>Giỏ hàng</S.Link>
                </td>
                <td>Chủ nhật: 8am-7pm</td>
                <td>338 Hoàng Diệu - Hải Châu - Đà Nẵng</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td onClick={() => history.push(ROUTER.USER.TERMS)}>
                  <S.Link>Chính sách</S.Link>
                </td>
                <td />
                <td>Chau Ho's store</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td onClick={() => history.push(ROUTER.USER.TERMS)}>
                  <S.Link>Điều khoản dịch vụ</S.Link>
                </td>
                <td />
                <td>cupidBakery@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row> */}
      <Row align="top">
        <Col
          xs={{ offset: 4, span: 16 }}
          sm={{ offset: 4, span: 16 }}
          md={{ offset: 3, span: 9 }}
          lg={{ offset: 2, span: 5 }}
        >
          <img
            src={cupidLogo}
            alt="logo"
            style={{ width: '100%' }}
            onClick={() => history.push(ROUTER.USER.HOME)}
          />
          <p>
            Được phục vụ quý khách là niềm vinh hạnh của chúng tôi. Hãy liên lạc
            nhé!
          </p>
          {renderContactLogo()}
        </Col>
        <Col
          xs={{ offset: 1, span: 7 }}
          sm={{ offset: 1, span: 7 }}
          md={{ offset: 3, span: 9 }}
          lg={{ offset: 2, span: 3 }}
        >
          <S.H2>Câu hỏi & pháp lý</S.H2>
          <S.Link onClick={() => history.push(ROUTER.USER.CART)}>
            Giỏ hàng
          </S.Link>
          <S.Link onClick={() => history.push(ROUTER.USER.INTRODUCTION)}>
            Giới thiệu
          </S.Link>
          <S.Link onClick={() => history.push(ROUTER.USER.PROFILE)}>
            Tài khoản cá nhân
          </S.Link>
          <S.Link onClick={() => history.push(ROUTER.USER.TERMS)}>
            Chính sách & Điều khoản
          </S.Link>
        </Col>
        <Col
          xs={{ offset: 1, span: 7 }}
          sm={{ offset: 1, span: 7 }}
          md={{ offset: 3, span: 9 }}
          lg={{ offset: 1, span: 4 }}
        >
          <S.H2>Thời gian làm việc</S.H2>
          <p>Thứ 2-Thứ 6: 8am-10pm</p>
          <p>Thứ 7-Chủ nhật: 7am-7pm</p>
        </Col>
        <Col
          xs={{ offset: 1, span: 7 }}
          sm={{ offset: 1, span: 7 }}
          md={{ offset: 3, span: 9 }}
          lg={{ offset: 1, span: 4 }}
        >
          <S.H2>Liên hệ</S.H2>
          <p style={{ textTransform: 'uppercase' }}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                history.push(ROUTER.USER.CONTACT);
              }}
            >
              Cupid Bakery
            </a>
          </p>
          <p>
            <b>(0236) 387 2428</b>
          </p>
          <p>338 Hoàng Diệu - Hải Châu - Đà Nẵng</p>
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
          <Divider style={{ borderColor: COLOR.PRIMARY }} />
        </Col>
      </Row>
      <Row>
        <Col offset={9} span={15}>
          <span>&copy; Copyright 2021 Cupid Bakery | Design by Chau Ho</span>
        </Col>
      </Row>
    </S.Footer>
  );
};

export default Footer;
