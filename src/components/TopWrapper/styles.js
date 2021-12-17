import styled from 'styled-components';
import topWrapperImage from '../../assets/img/banner_bg.jpg';

export const TopContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : '250px')};

  margin-bottom: 20px;

  background-image: url(${topWrapperImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 71, 79, 0.5); */
    background-color: rgba(0, 0, 0, 0.4);
  }
  & .ant-breadcrumb-link,
  & .ant-breadcrumb-separator {
    position: relative;
    color: white;
    z-index: 1;
  }
`;

export const TopTitle = styled.h2`
  font-size: 32px;
  color: white;
  z-index: 1;
`;
