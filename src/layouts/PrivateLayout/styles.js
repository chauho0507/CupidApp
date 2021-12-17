import styled from 'styled-components';

import { COLOR } from '../../constants/theme';

export const MainContainer = styled.div`
  position: relative;

  min-height: calc(100vh - 120px);

  margin-top: 60px;
  padding-bottom: 20px;

  background-color: ${COLOR.PRIMARY_LIGHT};
`;

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.3s;
`;
