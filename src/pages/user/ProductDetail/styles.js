import styled from "styled-components";

import { Row } from "antd";

import { COLOR } from "../../../constants/theme";

export const CustomRow = styled(Row)`
  @media (max-width: 767px) {
    text-align: center;
  }

  & .ant-image {
    width: 100%;
  }
`;

export const ProductDetailContainer = styled.div`
  position: relative;
  max-width: 1280px;
  width: 100%;

  margin: 0 auto;

  & > * {
    margin-bottom: 20px;
  }
`;

export const ProductDetailDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const PriceDetail = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const RelatedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const RelatedProduct = styled.div`
  width: 100%;
`;

export const ProductItemWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 143%;
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
  width: 100%;

  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  background-color: white;

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    transition: all 0.3s;
  }
`;

export const New = styled.div`
  position: absolute;
  top: 4px;
  left: 0;
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

export const CardImage = styled.div`
  width: 100%;
  overflow: hidden;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  & img:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;

  height: 32%;
  padding: 0 6px;
  font-size: 14px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  object-fit: cover;
`;

export const H1 = styled.h1`
  color: ${COLOR.TERTIARY};
`;

export const H2 = styled.h2`
  color: ${COLOR.SECONDARY};
`;

export const H3 = styled.h3`
  color: ${COLOR.TERTIARY};
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

export const Span = styled.span`
  font-weight: 500;
  color: ${COLOR.PRIMARY};
`;

export const CommentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-item: center;
`;
export const CommentAvatar = styled.div`
  margin-right: 30px;
`;
export const CommentDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
