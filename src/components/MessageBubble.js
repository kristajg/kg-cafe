// 3rd party & proprietary libraries
import React from 'react';
import styled from 'styled-components';

const StyledBubble = styled.div`
  padding: 5px 10px 5px 10px;
  border-radius: 15px;
  margin: 8px;
  width: 60%;
  background-color: ${props => props.isOutgoingMessage ? '#ffb5a9' : '#F6F4F2'};
  float: ${props => props.isOutgoingMessage ? 'right' : 'left'};
  color: #000;
`;

const MessageContents = styled.div``;

const MessageAuthor = styled.div`
  font-size: 14px;
`;

const MessageBody = styled.div`
  font-size: 18px;
`;

export default function MessageBubble(props) {
  console.log('props ', props)
  const isRider = props.message.author === props.riderUsername;
  return (
    <StyledBubble isOutgoingMessage={isRider}>
      <MessageContents>
        <MessageAuthor>{isRider ? props.message.author : props.driverUsername}</MessageAuthor>
        <MessageBody>
          {props.message.body}
        </MessageBody>
      </MessageContents>
      <div style={{ clear: "both" }} />
    </StyledBubble>
  );
}
