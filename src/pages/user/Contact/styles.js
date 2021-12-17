import styled from 'styled-components';
import bannerBg from '../../../assets/img/banner_bg.jpg';

export const H2 = styled.h2`
  color: #2a426b;
`;

export const Banner = styled.div`
  position: relative;
  margin-top: -40px;
  margin-bottom: 20px;

  height: 300px;
  background-image: url(${bannerBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  } */
`;

export const BannerContent = styled.div`
  text-align: center;

  padding-top: 100px;

  & h1 {
    color: #fff;
  }
`;

export const Span = styled.span`
  &:hover {
    color: #f783a8;
  }
`;
