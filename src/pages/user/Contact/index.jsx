import React from 'react';
import { useHistory } from 'react-router-dom';

import { Row, Col, Card, Form, Input, Button } from 'antd';

import TopWrapper from '../../../components/TopWrapper';

import { ROUTER } from '../../../constants/router';
import { BREADCRUMB } from './constants';
import * as S from './styles';

const ContactPage = () => {
  const history = useHistory();
  const [contactForm] = Form.useForm();

  const renderContactTable = () => {
    return (
      <div>
        <div>
          <S.H2>Địa chỉ: </S.H2>
          <p>338 Hoàng Diệu</p>
          <p>Hải Châu, Đà Nẵng</p>
        </div>
        <div>
          <S.H2>Số điện thoại:</S.H2>
          <b>(0236) 387 2428</b>
        </div>
        <div>
          <S.H2>Email: </S.H2>
          <p>cupidBakery@gmail.com</p>
        </div>
        <div>
          <S.H2>Giờ làm hỗ trợ: </S.H2>
          <p>Thứ 2 - Chủ nhật</p>
          <p>8 AM - 10 PM</p>
        </div>
      </div>
    );
  };
  return (
    <>
      {/* <S.Banner>
        <S.BannerContent>
          <h1>Liên lạc</h1>
          <Breadcrumb>
            <Breadcrumb.Item>
              <S.Span onClick={() => history.push(ROUTER.USER.HOME)}>
                Trang chủ
              </S.Span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <S.Span>Liên lạc</S.Span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </S.BannerContent>
      </S.Banner> */}

      <TopWrapper titlePage="Liên lạc" breadcrumb={BREADCRUMB} />

      <Row>
        <Col span={16} offset={4}>
          <Card>
            <Row>
              <Col>
                <S.H2>Phương thức liên lạc ____</S.H2>
                <p>
                  Chào mừng bạn đến với chúng tôi. Chỉ mất 2 phút để kết nối tới
                  cửa hàng
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={17}>
                <Form
                  form={contactForm}
                  name="Contact"
                  scrollToFirstError
                  onFinish={values => {
                    console.log(values);
                    contactForm.resetFields();
                  }}
                >
                  <Row>
                    <Col span={11}>
                      <Form.Item
                        name="name"
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
                        <Input placeholder="Tên" />
                      </Form.Item>
                    </Col>
                    <Col offset={2} span={11}>
                      <Form.Item
                        name="email"
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
                        <Input placeholder="Email" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="text"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Ý kiến không nên để trống.',
                      },
                      {
                        min: 6,
                        message: 'Ý kiến của bạn hơi ngắn.',
                      },
                    ]}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 8, maxRows: 16 }}
                      allowClear={true}
                      placeholder="Ý kiến của bạn ..."
                    />
                  </Form.Item>
                  <Button type="primary" size="large" htmlType="submit">
                    Xác nhận
                  </Button>
                </Form>
              </Col>
              <Col span={6} offset={1}>
                {renderContactTable()}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ContactPage;
