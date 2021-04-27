// 3rd party & proprietary libraries
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

// Components
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import Div from '../components/Div';

// Helpers
import { submitVerifyCode } from '../helpers/twilioHelpers';

// Styles
const BackButton = styled.div`
  margin-bottom: 10px;
`;

// TODO: make goback HOC && logged in HOC
class Verification extends Component {
  state = {
    phoneNumber: window.localStorage.getItem('rider-phonenumber'),
    verificationCode: '',
  };

  handleCodeEnter = event => {
    this.setState({ verificationCode: event.target.value });
  }

  handleVerificationCodeSubmit = async () => {
    const { phoneNumber, verificationCode } = this.state;
    const verificationStatus = await submitVerifyCode(phoneNumber, verificationCode);
    console.log('verification status! ', verificationStatus);
    // TODO: if verified continue
    this.props.history.push('/book-taxi');
  }

  render() {
    return (
      <>
        <BackButton onClick={() => this.props.history.goBack()}>
          &#x2190; Back
        </BackButton>
        <H2 marginBottom='60px'>
          Verify phone number
        </H2>
        <Div>
          Enter the verification code sent to your phone via text to proceed
        </Div>
        <br />
        <br />
        <TextInput
          id="verification-code"
          onChange={this.handleCodeEnter}
          value={this.state.verificationCode}
          placeholder="Verification Code"
        />
        <br />
        <br />
        <Button onClick={this.handleVerificationCodeSubmit}>Submit</Button>
      </>
    );
  }
}

export default withRouter(Verification);
