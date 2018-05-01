import React, { Component } from 'react'
import { Form, Input } from 'semantic-ui-react'
import styled from 'styled-components'

// Styled components
const Styledform = styled(Form)`
  &.ui.form {
    .field {
      margin-bottom: .75rem;
      label {
        font-size: .75rem;
        text-transform: uppercase;
        margin-bottom: .15rem;
      }
    }
    .field.field input {
      color: #fff;
      background: #333;
      border: 1px solid transparent;
      border-radius: 4px;
      font-size: .9rem;
      &::-webkit-input-placeholder {
        color: #ccc;
      }
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px #000 inset !important;
        -webkit-text-fill-color: white !important;
        border-color: #0092ff !important;
      }
      &:focus, &:active {
        color: #fff;
        border-color: #0092ff !important;
        box-shadow: 0 0 16px 6px rgba(33, 133, 208, 0.45);
      }
    }
  }
`;

/*
To Do:
- Process Form
- Add submission button for form processing
- Add each log to the data for <Viewsubmissions />
*/

class Iocform extends Component {
  render() {
    return (
      <Styledform inverted onSubmit={this.props.Signup}>
        <Form.Field control={Input} type="text" label="Input 1" placeholder="Enter your Input 1..." />
        <Form.Field control={Input} type="text" label="Input 2" placeholder="Enter your Input 2..." />
        <Form.Field control={Input} type="text" label="Input 3" placeholder="Enter your Input 3..." />
        <Form.Field control={Input} type="text" label="Input 4" placeholder="Enter your Input 4..." />
        <Form.Field control={Input} type="text" label="Input 5" placeholder="Enter your Input 5..." />
        <Form.Field control={Input} type="text" label="Input 6" placeholder="Enter your Input 6..." />
      </Styledform>
    );
  }
}

export default Iocform;
