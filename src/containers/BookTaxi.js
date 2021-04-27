// 3rd party & proprietary libraries
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Button from '../components/Button';
import H2 from '../components/H2';

// Styles
const BackButton = styled.div`
  margin-bottom: 10px;
`;

// TODO: make goback HOC && logged in HOC
class BookTaxi extends Component {
  render() {
    return (
      <>
        <BackButton onClick={() => this.props.history.goBack()}>
          &#x2190; Back
        </BackButton>
        <H2 marginBottom='60px'>
          Ready to be picked up now or later?
        </H2>
        <Button onClick={() => this.props.history.push('/pickup-now')}>Pickup Now</Button>
        <br />
        <Button onClick={() => this.props.history.push('/pickup-later')}>Book Taxi for Future Time</Button>
      </>
    );
  }
}

export default withRouter(BookTaxi);
