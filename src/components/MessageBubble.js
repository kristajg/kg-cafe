// 3rd party & proprietary libraries
import React from 'react';
import styled from 'styled-components';

const StyledBubble = styled.div`
  padding: 5px 10px 5px 10px;
  margin-top: 8px;
  background-color: ${props => props.outgoing ? '#ff8975' : '#F6F4F2'};
  color: #6e899e;
`;

// TODO: float right or left based on inc / out
// TODO: styles for inc and out

export default function MessageBubble(props) {
  console.log('props ', props)
  return (
    <StyledBubble outgoing={props.author === props.riderUsername}>
      <div>{props.message.author}</div>
      <div>
        {props.message.body}
      </div>
    </StyledBubble>
  );
}
