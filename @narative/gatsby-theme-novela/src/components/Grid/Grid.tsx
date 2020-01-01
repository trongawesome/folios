import React from 'react';
import styled from '@emotion/styled';

const Grid: React.FC<{}> = ({ children }) => {
  return (
    <GridWraper>
      {children}
    </GridWraper>
  );
}

export default Grid;

const GridWraper = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr;
  position: relative;
`;
