import styled from 'styled-components';

import { COLOR } from '../../../constants/theme';

export const IntroContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  max-width: 1280px;
  width: 100%;

  margin: 0 auto;
  padding: 20px;
  & > * {
    padding-bottom: 60px;
  }
`;

export const WelcomeSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;

  height: 100%;
  width: 100%;
  transition: all 0.2s;

  & p {
    font-size: 20px;
  }
  & img {
    border-radius: 4px;
    width: 50%;

    &:hover:not(:last-child) {
      outline: 4px solid ${COLOR.PRIMARY};
      transform: scale(1.02) translateY(-0.5rem);
      box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.5);
      z-index: 30;
      transition: all 0.2s;
    }
  }

  & #intro-img-1 {
    position: absolute;
    top: 10%;
    left: 20%;
    object-fit: cover;
  }
  & #intro-img-2 {
    position: absolute;
    top: 30%;
    right: 0;
    object-fit: cover;
  }
  & #intro-img-3 {
    position: absolute;
    top: 50%;
    right: 35%;
    object-fit: cover;
  }

  & #welcome-img-4 {
    display: none;
    object-fit: cover;

    @media (max-width: 1180px) {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: 1180px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    & p {
      font-size: 20px;
    }

    & img {
      display: none;
    }
  }
`;

export const LeftWelcome = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 50%;

  @media (max-width: 1180px) {
    width: 100%;
    margin-top: 20px;
    order: 2;
  }
`;
export const RightWelcome = styled.div`
  position: relative;
  width: 50%;
  @media (max-width: 1180px) {
    width: 100%;
    order: 1;
  }
`;

export const MissionSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  & p {
    font-size: 20px;
  }
  & img {
    border-radius: 4px;
  }
`;

export const ChefSection = styled.div``;

export const H1 = styled.h1`
  color: ${COLOR.TERTIARY};
  font-style: italic;
  font-size: 30px;
`;

export const ShopName = styled.span`
  color: ${COLOR.PRIMARY_DARK};
  font-size: 40px;
  font-weight: 500;
`;
