import styled, { css } from 'styled-components';
import background from '../../assets/img/login-01.jpg';

import { COLOR } from '../../constants/theme';

export const LoginContainer = styled.div`
  height: 100vh;
`;

export const LeftImage = styled.div`
  height: 100vh;
  width: 100%;

  background-image: url(${background});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const RightForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  background: linear-gradient(to bottom, #ffe8f1, #f195b2);
`;

export const LoginForm = styled.div`
  max-width: 620px;
  width: 100%;
  background-color: ${COLOR.WHITE};
  border-radius: 8px;
`;
export const LoginHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  font-style: italic;

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const AuthHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginTitle = styled.h3`
  margin: 0 8px 18px 18px;
  font-weight: normal;
  cursor: pointer;
  font-size: ${({ size }) => size || '16px'};

  ${props =>
    props.active &&
    css`
      padding-bottom: 4px;
      color: #f195b2;
      border-bottom: 2px solid #f195b2;
    `}
`;
