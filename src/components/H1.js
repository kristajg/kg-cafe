// 3rd party & proprietary libraries
import React from 'react';
import styled from 'styled-components';

const H1Styled = styled.div`
  padding-bottom: 10px;
  color: #384854;
  font-size: 42px;
  line-height: 46px;
  font-weight: 900;
  max-width: 85%;
`;

export default function H1(props) {
  return (
    <H1Styled>{props.children}</H1Styled>
  );
}
