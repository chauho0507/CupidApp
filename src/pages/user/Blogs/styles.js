import styled from 'styled-components';

export const BlogsContainer = styled.div`
  max-width: 1280px;
  width: 100%;

  margin: 0 auto;
  padding: 20px;
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

export const BlogItemWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 125%;
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
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 20px;

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

export const CardDetail = styled.div`
  height: 40%;
  width: 100%;
`;
