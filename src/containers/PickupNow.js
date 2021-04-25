// 3rd party & proprietary libraries
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

// Components
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import MessageBubble from '../components/MessageBubble';
import Div from '../components/Div';

// Helpers
import { handlePickupNow, sendMessage, getAllConversationMessages } from '../helpers/twilioHelpers';
import { bookTaxiDriver } from '../helpers/driverHelpers';

// Styles
const BackButton = styled.div`
  margin-bottom: 10px;
`;

const ChatArea = styled.div`
  height: 500px;
  position: relative;
  background-color: #fff;
`;

const Messages = styled.div``;

const MessageInputWrapper = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

// TODO: make goback HOC
class PickupNow extends Component {
  state = {
    loading: true,
    conversationProxy: '',
    riderUsername: window.localStorage.getItem('rider-username'),
    driverUsername: bookTaxiDriver(),
    newMessage: '',
    messages: [],
  };

  async componentDidMount () {
  //   const { riderUsername, driverUsername } = this.state;
  //   // Load conversation with sid && get messages
  //   const connectionStatusResult = await handlePickupNow(riderUsername, driverUsername);
  //   console.log('connectionStatusResult ', connectionStatusResult);
  //   this.setState({
  //     loading: false,
  //     conversationProxy: connectionStatusResult.sid,
  //   });
    await this.updateMessages();
  }

  // TODO: need listener for inc messages

  updateMessages = async () => {
    const messages = await getAllConversationMessages(this.state.conversationProxy);
    this.setState({ messages });
  }

  handleMessageInput = event => {
    this.setState({ newMessage: event.target.value });
  }

  handleSendMessage = async event => {
    const message = this.state.newMessage;
    this.setState({ newMessage: '' });
    const messageSentConfirmation = await sendMessage(this.state.conversationProxy, message, this.state.riderUsername);
    console.log('messageSentConfirmation!! ', messageSentConfirmation);
    this.updateMessages();
  }

  render() {
    return (
      <>
        <BackButton onClick={() => this.props.history.goBack()}>
          &#x2190; Back
        </BackButton>
        <Div marginBottom='60px'>
          Taxi with driver {this.state.driverUsername} confirmed.
          Arriving in 10 minutes. Chat with driver below.
        </Div>
        <ChatArea>
          {this.state.messages.length ? (
            this.state.messages.map((message, i) => <MessageBubble key={`message-num-${i}`} message={message} riderUsername={this.state.riderUsername} />)
          ) : (
            <div>
              No messages to speak of (yet..!)
            </div>
          )}
          <Messages messages={this.state.messages} />
          <MessageInputWrapper>
            <TextInput
              placeholder={`Send message to ${this.state.driverUsername}`}
              onChange={this.handleMessageInput}
            />
            <Button onClick={this.handleSendMessage}>Send Message</Button>
          </MessageInputWrapper>
        </ChatArea>
      </>
    );
  }
}

export default withRouter(PickupNow);
