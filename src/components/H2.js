// 3rd party & proprietary libraries
import React from 'react';
import styled from 'styled-components';

const H2Styled = styled.div`
  margin-bottom: ${props => props.theme.marginBottom || ""};
  padding-bottom: ${props => props.theme.paddingBottom || ""};
  color: #384854;
  font-size: 38px;
  line-height: 40px;
  font-weight: 700;
  max-width: 85%;
`;

export default function H2(props) {
  return (
    <H2Styled theme={props}>{props.children}</H2Styled>
  );
}
