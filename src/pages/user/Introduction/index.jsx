import React from 'react';

import TopWrapper from '../../../components/TopWrapper';
import { Col, Row, Image, Divider } from 'antd';

import { BREADCRUMB } from './constants';

import welcome_1 from '../../../assets/img/Introduction/welcome-1.png';
import welcome_2 from '../../../assets/img/Introduction/welcome-2.png';
import welcome_3 from '../../../assets/img/Introduction/welcome-3.png';
import welcome_4 from '../../../assets/img/Introduction/welcome-4.jpg';
import intro_1 from '../../../assets/img/Introduction/bakery-1.jpg';
import intro_2 from '../../../assets/img/Introduction/bakery-2.jpg';
import intro_3 from '../../../assets/img/Introduction/bakery-3.jpg';

import * as S from './styles';
import { COLOR } from '../../../constants/theme';

const IntroductionPage = () => {
  return (
    <>
      <TopWrapper titlePage="Giới thiệu" breadcrumb={BREADCRUMB} />
      <S.IntroContainer>
        <S.WelcomeSection>
          <S.LeftWelcome>
            <S.H1>Cupid Bakery hân hạnh chào đón bạn!</S.H1>
            <p>
              Bắt đầu mở cửa từ năm 2021, Cupid Bakery mong muốn mang cho bạn
              trải nghiệm tốt nhất về bánh ngọt, cũng như những ý tưởng quà tặng
              trong những dịp lễ tết. Sự hài lòng của các bạn là giá trị lớn
              nhất đối với chúng tôi.
            </p>
            <p>
              Hãy đến với Cupid Bakery để trải nghiệm những loại bánh thơm ngon,
              đẹp mắt nhất, cũng như những món quà sang trọng và ý nghĩa nhất.
            </p>
            <p>
              Mọi ý kiến đóng góp của các bạn đều quý báu để Cupid Bakery có thể
              phát triển hơn nữa trong thời gian sắp tới.
            </p>
          </S.LeftWelcome>
          <S.RightWelcome>
            <img src={welcome_1} alt="intro-img" id="intro-img-1" />

            <img src={welcome_2} alt="intro-img" id="intro-img-2" />

            <img src={welcome_3} alt="intro-img" id="intro-img-3" />
            <img src={welcome_4} alt="welcome-img" id="welcome-img-4" />
          </S.RightWelcome>
        </S.WelcomeSection>
        <Divider style={{ borderColor: COLOR.PRIMARY }} />
        <S.MissionSection>
          <S.H1>Cupid Bakery cam kết</S.H1>
          <p>
            Chất lượng và thái độ phục vụ luôn là ưu tiên hàng đầu của chúng
            tôi. Luôn mang đến những sản phẩm tốt nhất một cách nhanh chóng. Đội
            ngũ nhân viên nhiệt tình, sẵn sàng đáp ứng những nhu cầu của khách
            hàng.
          </p>
          <p>
            Hãy đến với chúng tôi để được tư vấn, giải đáp mọi thắc mắc về bánh
            ngọt, cũng như quà tặng các ngày lễ. Nếu bạn có yêu cầu, đừng ngần
            ngại cho chúng tôi biết để phục vụ các bạn tốt hơn.
          </p>
          <p>- Luôn chọn những hương liệu ngoại nhập tốt nhất.</p>
          <p>- Luôn đảm bảo chất lượng sản phẩm vượt trội.</p>
          <p>- Khách hàng là thượng đế của chúng tôi.</p>
          <Row style={{ marginTop: 24 }}>
            <Col span={8}>
              <Image preview={false} src={intro_1} alt="intro-img" />
            </Col>
            <Col span={8}>
              <Image preview={false} src={intro_2} alt="intro-img" />
            </Col>
            <Col span={8}>
              <Image preview={false} src={intro_3} alt="intro-img" />
            </Col>
          </Row>
        </S.MissionSection>
      </S.IntroContainer>
    </>
  );
};

export default IntroductionPage;
