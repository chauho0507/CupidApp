import React from 'react';

import TopWrapper from '../../../components/TopWrapper';
import { Card, Col, Row } from 'antd';

import { ShoppingCartOutlined, CarOutlined } from '@ant-design/icons';

import { BREADCRUMB } from './constants';
import { COLOR } from '../../../constants/theme';

import * as S from './styles';

const TermsPage = () => {
  return (
    <>
      <TopWrapper titlePage="Chính sách" breadcrumb={BREADCRUMB} />
      <S.TermsContainer>
        <Row>
          <Col span={24}>
            <Card
              headStyle={{ backgroundColor: COLOR.PRIMARY }}
              bordered
              title={
                <S.H2>
                  <ShoppingCartOutlined /> Chính sách mua hàng
                </S.H2>
              }
            >
              <p>
                - Bạn có thể mua bánh trực tiếp tại cửa hàng hoặc đặt hàng trực
                tuyến qua trang chủ của chúng tôi.
              </p>
              <p>
                - Với mỗi lượt mua hàng, bạn sẽ được tính điểm để nhận những ưu
                đãi lớn.
              </p>
              <p>
                - Ngoài ra, những dịp lễ tết đều có dịp giảm giá nhiều sản phẩm,
                chỉ mất 2 phút để đăng ký nhận những thông tin giảm giá, miễn
                phí vận chuyển, và những ưu đãi hấp dẫn khác. Đừng bỏ lỡ nhé!
              </p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              headStyle={{ backgroundColor: COLOR.PRIMARY }}
              title={
                <S.H2>
                  <CarOutlined /> Chính sách giao hàng
                </S.H2>
              }
            >
              <p>- Miễn phí vận chuyển trong 5km</p>
              <p>
                - Nếu nhận sản phẩm bị lỗi trong quá trình vận chuyển, quý khách
                hàng hãy liên hệ ngay với cửa hàng để đổi sản phẩm khác.
              </p>
              <p>Xin lỗi vì sự bất tiện này.</p>
            </Card>
          </Col>
        </Row>
      </S.TermsContainer>
    </>
  );
};

export default TermsPage;
