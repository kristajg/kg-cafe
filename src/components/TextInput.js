// 3rd party & proprietary libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  width: 90%;
  box-shadow: 5px 5px 15px 1px rgba(66,86,100,0.1);
  ::placeholder {
    color: #6e899e;
  }
  &:focus {
    outline: none;
    box-shadow: 5px 5px 15px 1px rgba(66,86,100,0.2);
  }
`;

export default class TextInput extends Component {
  render() {
    return (
      <StyledTextInput
        type="text"
        id={this.props.id}
        onChange={this.props.onChange}
        // onBlur={onBlur}
        // onFocus={onFocus}
        placeholder={this.props.placeholder}
        value={this.props.value}
      />
    );
  }
}

TextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};
