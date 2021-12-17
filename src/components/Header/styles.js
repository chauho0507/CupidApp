import styled, { css } from 'styled-components';

import { COLOR } from '../../constants/theme';

export const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100px;
  width: 100%;

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 100;

  transition: all 0.2s;

  ${({ isTop }) =>
    !isTop &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      margin-top: -30px;

      transition: all 0.2s;
    `};
`;
export const HeaderSpace = styled.div`
  display: flex;
  justify-content: space-around;

  height: 40px;
  width: 100%;
  background-color: ${COLOR.PRIMARY};
  color: #fff;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
  }

  @media (max-width: 380px) {
    font-size: 12px;
  }
`;

export const SpaceItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100px;

  font-size: 24px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1.6;
  background-color: #fff;

  @media (max-width: 900px) {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const HeaderMenu = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
    margin-left: 12px;
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 900px) {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }
`;

export const HeaderNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  color: black;

  & > *:not(:last-child) {
    margin-right: 24px;
  }

  @media (max-width: 1080px) {
    & > *:not(:last-child) {
      margin-right: 16px;
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const SidebarNav = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 50%;
`;

export const HeaderItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  height: 100%;

  text-transform: uppercase;
  color: ${COLOR.TERTIARY};
  cursor: pointer;

  &:hover {
    color: ${COLOR.PRIMARY};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;

    border-bottom: 3px solid ${COLOR.PRIMARY};

    transition: all 0.2s ease-out;

    /* transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s,
      background-color 0.1s; */
  }

  &:hover::after {
    width: 50%;
  }

  ${({ item, location }) =>
    item.path === location.pathname &&
    css`
      color: ${COLOR.PRIMARY};

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 50%;

        border-bottom: 3px solid ${COLOR.PRIMARY};
      }
    `}
`;

export const HeaderUser = styled.div`
  position: relative;
  display: flex;

  @media (max-width: 900px) {
    margin-right: 12px;
    font-size: 24px;
  }
`;

export const HeaderUserCart = styled.div`
  @media (max-width: 600px) {
    position: absolute;
    top: 80px;
    right: 0;
    background-color: white;
    border-radius: 200px;
  }
`;

export const Span = styled.span`
  font-size: 20px;

  @media (max-width: 1132px) {
    font-size: 18px;
  }
  @media (max-width: 1032px) {
    font-size: 16px;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: space-around;
  min-width: 120px;

  @media (max-width: 480px) {
    min-width: 80px;
  }
`;
