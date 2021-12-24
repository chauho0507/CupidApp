import styled from "styled-components";

import { COLOR } from "../../../constants/theme";

import recipeSection from "../../../assets/img/recipeSection.jpg";

export const MainContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

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

export const IntroSection = styled.section`
  margin-top: 80px;
  padding-bottom: 80px;

  border-bottom: 1px solid ${COLOR.PRIMARY};

  & p {
    text-align: center;
    font-size: 18px;
  }

  @media (max-width: 900px) {
    margin-top: 40px;

    & p {
      font-size: 14px;
    }
  }
`;

export const H1 = styled.h1`
  position: relative;
  text-transform: uppercase;
  font-size: 28px;
  font-style: italic;
  font-weight: 700;
  line-height: 1.6;
  color: ${COLOR.TERTIARY};
  margin-bottom: 40px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 4rem;

    border-bottom: 2px solid ${COLOR.PRIMARY_DARK};

    transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s,
      background-color 0.1s;
  }

  &:hover::after {
    width: 6rem;
  }

  @media (max-width: 900px) {
    font-size: 24px;
  }
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const H2 = styled.h2`
  font-style: italic;
`;

export const ShopName = styled.span`
  color: ${COLOR.PRIMARY_DARK};
  font-size: 36px;
  font-weight: 500;
`;

export const Span = styled.span`
  font-weight: 500;
  color: ${COLOR.PRIMARY_DARK};
`;

export const ProductItemWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 143%;
  transition: all 0.3s;
`;

export const CakeSection = styled.section`
  width: 100%;

  margin-top: 80px;
  padding-bottom: 80px;

  & p {
    font-size: 18px;
  }
`;

export const DrinkSection = styled.section`
  width: 100%;

  margin-top: 80px;
  padding-bottom: 80px;

  border-bottom: 1px solid ${COLOR.PRIMARY};
  & p {
    font-size: 18px;
  }
`;

export const SkeletonImage = styled.div`
  height: 100%;
  & .ant-skeleton-element {
    width: 100%;
    height: auto;
  }
  & .ant-skeleton-image {
    width: 100%;
    height: auto;
  }
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
  left: 4px;
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
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  overflow: hidden;

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

export const RecipeSection = styled.section`
  height: 440px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${recipeSection});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  @media (max-width: 1130px) {
    height: 50vh;
  }
`;

export const RecipeContent = styled.div`
  background: transparent;

  & p {
    color: white;
    font-size: 20px;
    line-height: 1.6;
  }

  @media (max-width: 1130px) {
    & p {
      font-size: 16px;
    }
  }

  @media (max-width: 993px) {
    & img {
      height: 200px;
      width: auto;
    }
  }
  @media (max-width: 840px) {
    & img {
      height: 180px;
      width: auto;
    }

    & p {
      font-size: 14px;
    }
  }
  @media (max-width: 590px) {
    & img {
      height: 150px;
      width: auto;
    }
  }
  @media (max-width: 500px) {
    & img {
      height: 120px;
      width: auto;
    }
  }
`;

export const RecipeTitle = styled.h1`
  color: white;
  font-size: 30px;
  font-weight: 700;
`;

export const ChefSection = styled.div`
  padding: 40px 24px;
  width: 100%;

  & img {
    height: auto;
    width: 100%;
    border-radius: 4px;
  }

  & h2 {
    text-align: center;
  }
`;

export const ReviewSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 280px;
  width: 100%;

  background-color: ${COLOR.PRIMARY};
`;

export const ReviewContent = styled.div`
  height: 80%;
  width: 60%;

  & .ant-row {
    color: ${COLOR.TERTIARY};
    font-size: 20px;
    line-height: 1.6;
  }

  @media (max-width: 993px) {
    & .ant-row {
      font-size: 16px;
      line-height: 1.6;
    }
  }
  @media (max-width: 776px) {
    & .ant-row {
      font-size: 14px;
      line-height: 1.6;
    }
  }
`;

export const ReviewItem = styled.div`
  height: 80%;
  width: auto;
`;

export const ReviewTitle = styled.h1`
  position: relative;
  font-size: 26px;
  font-style: italic;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.6;
  color: ${COLOR.TERTIARY};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 4rem;

    border-bottom: 2px solid ${COLOR.TERTIARY};

    transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s,
      background-color 0.1s;
  }

  &:hover::after {
    width: 6rem;
  }

  @media (max-width: 900px) {
    font-size: 24px;
  }
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const ContactSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 20vh;
  width: 100%;

  margin-bottom: -20px;

  background-color: ${COLOR.PRIMARY_DARK};
`;

export const ContactTitle = styled.p`
  font-size: 22px;
  color: white;
  font-style: italic;

  @media (max-width: 795px) {
    font-size: 18px;
  }
`;

export const BlogsContainer = styled.div`
  max-width: 1280px;
  width: 100%;

  margin: 0 auto;
  padding: 20px;
`;

export const BlogItemWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 125%;
  transition: all 0.3s;
`;

export const CardBlog = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 20px;

  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  background-color: white;

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.32);
    transition: all 0.3s;
  }
`;

export const CardImages = styled.div`
  height: 55%;
  width: 100%;
  overflow: hidden;

  & img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  & img:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

export const CardDetails = styled.div`
  height: 40%;
  width: 100%;
`;
