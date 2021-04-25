// 3rd party & proprietary libraries
import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  color: #6e899e;
  margin-bottom: ${props => props.theme.marginBottom || ""};
`;

export default function Div(props) {
  return (
    <StyledDiv theme={props}>{props.children}</StyledDiv>
  );
}
