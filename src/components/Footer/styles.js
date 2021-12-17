import styled from 'styled-components';

import { COLOR } from '../../constants/theme';
import footerBg from '../../assets/img/footerBackground.jpg';

export const Footer = styled.div`
  padding: 3rem 0;
  background: url(${footerBg});
  /* background-attachment: fixed; */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  color: white;
`;

export const H2 = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  color: ${COLOR.SECONDARY};
`;

export const Logo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: -17px;

  & > * {
    font-size: 35px;
    color: ${COLOR.PRIMARY};
  }

  @media (max-width: 992px) {
    & > * {
      font-size: 28px;
    }
  }
  @media (max-width: 768px) {
    & > * {
      font-size: 36px;
    }
  }
`;

export const Link = styled.p`
  &:hover {
    color: ${COLOR.PRIMARY};
    cursor: pointer;
  }
`;
