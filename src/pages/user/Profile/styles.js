import styled, { css } from 'styled-components';

import { Button, Tag, Card } from 'antd';

import { COLOR } from '../../../constants/theme';

export const ProfileWrapper = styled.div`
  margin: 24px auto;
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
`;

export const ProfileContainer = styled.div`
  width: 100%;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  background-color: ${COLOR.WHITE};

  box-shadow: 0 3px 6px 10px rgba(0, 0, 0, 0.04);
`;

export const RightContainer = styled.div`
  width: 100%;
  border-radius: 4px;

  /* box-shadow: 0 3px 6px 10px rgba(0, 0, 0, 0.04); */
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  margin-bottom: 12px;
  width: 100%;
  height: 280px;
  border-bottom: 1px solid ${COLOR.PRIMARY};
`;

export const TabItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  width: 100%;
  cursor: pointer;
  color: ${COLOR.TERTIARY};

  &:hover {
    background-color: ${COLOR.PRIMARY};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${COLOR.PRIMARY_DARK};
      border-right: 5px solid ${COLOR.SECONDARY};
    `}
`;

export const H1 = styled.h1`
  color: ${COLOR.TERTIARY};

  @media (max-width: 1145px) {
    font-size: 18px;
  }
  @media (max-width: 992px) {
    font-size: 17px;
  }
  @media (max-width: 750px) {
    font-size: 13px;
  }
  @media (max-width: 571px) {
    font-size: 11px;
  }
`;

export const H2 = styled.h2`
  color: ${COLOR.WHITE};
`;

export const H3 = styled.h3`
  color: ${COLOR.TERTIARY};
`;

export const H4 = styled.h4`
  color: ${COLOR.TERTIARY};
`;

export const Price = styled.span`
  font-size: 16px;
  color: red;
  font-weight: 500;
`;

export const Quantity = styled.span`
  color: ${COLOR.TERTIARY};
`;

export const Span = styled.span`
  color: ${COLOR.TERTIARY};
  font-size: 14px;
  font-weight: 500;
`;

export const TabsContainer = styled.div`
  margin: 0;

  & .ant-tabs-card .ant-tabs-content {
    margin-top: -16px;
  }
`;

export const ProductItemWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;

  box-shadow: 0 2px 4px 5px rgba(0, 0, 0, 0.03);
`;
export const ProductItemContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: space-around;
  box-sizing: border-box;

  height: 100%;
  width: 100%;

  border-radius: 2px;

  padding: 6px;

  background-color: ${COLOR.WHITE};
`;

export const ProductButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const ProductImageWrapper = styled.div`
  height: 100%;
  cursor: pointer;
`;

export const ProductDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100%;
  width: 40%;
`;

export const DefaultTag = styled(Tag)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const LocationCard = styled(Card)`
  position: relative;
  transition: all 0.2s;

  ${({ active }) =>
    active === 'true' &&
    css`
      border: 2px dashed ${COLOR.PRIMARY_DARK};
    `}
`;

export const EditButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const EmptyWishList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  height: 12vh;
  text-align: center;
  border-radius: 4px;
  background-color: ${COLOR.WHITE};
`;
