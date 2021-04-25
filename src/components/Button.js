// 3rd party & proprietary libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.div`
  max-width: 90%;
  text-align: center;
  padding: 10px;
  background: rgb(255,137,117);
  background: linear-gradient(90deg, rgba(255,137,117,1) 0%, rgba(239,13,80,1) 80%);
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  box-shadow: 5px 5px 15px 1px rgb(66 86 100 / 10%);
  opacity: ${props => props.disabled ? '.75': '1'};
`;

export default class Button extends Component {
  render() {
    return (
      <StyledButton
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </StyledButton>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
