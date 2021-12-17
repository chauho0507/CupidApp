import styled from 'styled-components';

import { COLOR } from '../../../constants/theme';

export const TermsContainer = styled.div`
  max-width: 1280px;
  width: 100%;

  margin: 0 auto;

  & > * {
    margin-bottom: 24px;
  }
`;

export const H2 = styled.h2`
  color: ${COLOR.WHITE};
`;
