import styled, { css } from 'styled-components';

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: #cacfcc;
  }

  ${({ item, location }) =>
    item.path === location.pathname &&
    css`
      background-color: whitesmoke;
      border-right: 5px solid black;
    `}
`;

export const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  padding-top: 100px;
  background-color: gray;
  overflow: hidden;
  transition: all 0.3s;
  ${({ active }) =>
    active &&
    css`
      left: 0;
    `}
`;
