import styled, { css } from 'styled-components';
import { Image } from 'antd';
import { COLOR } from '../../../constants/theme';

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  padding-bottom: 20px;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: 1290px) {
    max-width: 1180px;
  }
  @media (max-width: 1190px) {
    max-width: 1080px;
  }
  @media (max-width: 1090px) {
    max-width: 980px;
  }
  @media (max-width: 990px) {
    max-width: 880px;
  }
  @media (max-width: 890px) {
    max-width: 780px;
  }
  @media (max-width: 790px) {
    max-width: 680px;
  }
  @media (max-width: 690px) {
    max-width: 580px;
  }
  @media (max-width: 590px) {
    max-width: 500px;
  }
  @media (max-width: 490px) {
    max-width: 380px;
  }
  @media (max-width: 390px) {
    max-width: 320px;
  }
`;

export const TopSaleCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1145px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 767px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const TopSaleImage = styled(Image)`
  height: 5rem;
  width: 5rem;
  border-radius: 2px;
  margin-right: 10px;

  @media (max-width: 1145px) {
    height: 10rem;
    width: 10rem;
  }
`;

export const TopSaleCardDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  max-width: 300px;
  width: 100%;

  @media (max-width: 1145px) {
    justify-content: center;
    align-items: center;
  }
`;

export const ProductContainer = styled.div`
  width: 100%;
`;

export const ProductItemWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 148%;
  transition: all 0.3s;
`;

export const Card = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  background-color: white;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
    transition: all 0.3s;
  }
`;

export const CardImage = styled.div`
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  height: 65%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;

  & img:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

export const New = styled.div`
  position: absolute;
  top: 4px;
  left: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 16px;
  border-radius: 4px;
  background-color: red;
  color: white;
  font-size: 10px;
  z-index: 40;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;

  height: 35%;
  padding: 6px;
  font-size: 14px;
`;

export const H3 = styled.h3`
  color: ${COLOR.TERTIARY};
  font-size: 24px;
`;

export const H4 = styled.span`
  color: ${COLOR.TERTIARY};
  font-size: 16px;
  font-weight: 500;
  padding: 0 5px;

  @media (max-width: 830px) {
    font-size: 14px;
  }

  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 8px;
  border-bottom: 1px solid ${COLOR.PRIMARY_LIGHT};
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  &:last-child {
    border-bottom: none;
  }
  ${({ active }) =>
    active &&
    css`
      background-color: #f5f5f5;
    `}
`;

export const NumberProduct = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #f783a8;
`;

export const SkeletonImage = styled.div`
  height: 100%;
  & .ant-skeleton-element {
    width: 100%;
    height: 100%;
  }
  & .ant-skeleton-image {
    width: 100%;
    height: 100%;
  }
`;

export const P = styled.p`
  color: red;
  font-weight: 500;
`;

export const Span = styled.span`
  font-weight: 500;
  color: ${COLOR.PRIMARY_DARK};
`;
