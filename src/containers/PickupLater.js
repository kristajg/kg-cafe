// 3rd party & proprietary libraries
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Button from '../components/Button';
import H2 from '../components/H2';
import Div from '../components/Div';

// Styles
const BackButton = styled.div`
  margin-bottom: 10px;
`;

const CallLink = styled.a`
  color: #fff;
  text-decoration: none;
`;

// TODO: make goback HOC && logged in HOC
class PickupLater extends Component {
  render() {
    return (
      <>
        <BackButton onClick={() => this.props.history.goBack()}>
          &#x2190; Back
        </BackButton>
        <H2 marginBottom='20px'>
          Schedule a taxi for pickup in advance
        </H2>
        <Div marginBottom='60px'>
          Call the number below to schedule and pay for a pickup at a future time!
        </Div>
        <Button>
          <CallLink href="tel:">
            Call Now to Book
            <br />
            (724) 272-6172
          </CallLink>
        </Button>
      </>
    );
  }
}

export default withRouter(PickupLater);
