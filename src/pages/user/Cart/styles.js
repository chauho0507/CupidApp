import styled, { css } from 'styled-components';

import { Tag, Card } from 'antd';

import { COLOR } from '../../../constants/theme';

export const CartContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
`;

export const StepContainer = styled.div`
  width: 100%;
  margin-top: -20px;
  margin-bottom: 20px;

  background-color: ${COLOR.WHITE};
`;

export const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TotalWrapper = styled.div`
  position: sticky;
  top: 80px;
`;

export const H2 = styled.p`
  font-size: 24px;
  color: ${COLOR.TERTIARY};
  font-weight: 500;
`;
export const H3 = styled.h3`
  color: ${COLOR.WHITE};
  font-size: 24px;
`;

export const H4 = styled.h4`
  color: ${COLOR.TERTIARY};
`;

export const P = styled.p`
  color: red;
  font-weight: 500;
`;

export const Span = styled.span`
  font-weight: 500;
  color: ${COLOR.PRIMARY_DARK};
`;

export const EmptyCart = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
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
