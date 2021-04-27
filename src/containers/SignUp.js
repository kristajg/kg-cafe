// 3rd party & proprietary libraries
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

// Components
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import H1 from '../components/H1';
import Div from '../components/Div';

// Helpers
import { beginVerifyPhoneNumber } from '../helpers/twilioHelpers';

const ErrorMessage = styled.div``;

const AdditionalText = styled.div`
  margin-top: 60px;
  color: #6e899e;
  font-size: 12px;
`;

class SignUp extends Component {
  state = {
    usernameValue: '',
    phoneNumberValue: '',
    usernameValid: true,
    phoneNumberValid: true,
    showErrorMessage: false,
  };

  onChange = event => {
    const val = event.target.value;
    // TODO: add validation for numbers & length
    // let isnum = /^\d+$/.test(val);
    // TODO: format phone number && test for numeral
    if (event.target.id === 'phonenumber') {
      const phoneNumberValue =
        this.state.phoneNumberValue === '' ? `+1${val}` : val;
      this.setState({ phoneNumberValue });
    }
    if (event.target.id === 'username') {
      this.setState({ usernameValue: val })
    }
    this.setState({ usernameValid: !!val });
  };

  handlePhoneNumberSubmit = async () => {
    const { usernameValue } = this.state;
    if (!usernameValue) {
      this.setState({ usernameValid: false });
      return;
    }
    // TODO submit for phone number verification
    // TODO: store data in redux instead of localStorage
    // if phone number already verified, take to main screen
    // if phone number not verified, send code
    window.localStorage.setItem('rider-username', this.state.usernameValue);
    window.localStorage.setItem('rider-phonenumber', this.state.phoneNumberValue);
    const verification = await beginVerifyPhoneNumber(this.state.phoneNumberValue);
    this.props.history.push('/verification');
  };

  render() {
    return (
      <>
        <H1>
          Hello, welcome to Owl Taxis! &#x1F695;
        </H1>
        <Div marginBottom='60px'>
          Enter your username & phone number to continue
          {/* Enter a username to sign up */}
        </Div>
        <TextInput
          id="username"
          onChange={this.onChange}
          value={this.state.usernameValue}
          placeholder="Username"
        />
        <br />
        <br />
        <TextInput
          id="phonenumber"
          onChange={this.onChange}
          value={this.state.phoneNumberValue}
          placeholder="Phone Number"
        />
        {!this.state.usernameValid && (<ErrorMessage>Please enter a username to proceed.</ErrorMessage>)}
        <br />
        <br />
        <Button onClick={this.handlePhoneNumberSubmit} disabled={!this.state.usernameValue}>
          Submit
        </Button>
        <AdditionalText>
          We will send you an SMS message to verify your phone number in order to book a taxi.
        </AdditionalText>
      </>
    );
  }
}

export default withRouter(SignUp);
