import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const Mainbutton = styled(Button)`
  /* &&& for specificity override */
  &&& {
    font-size: 1rem;
    display: flex;
    flex: 1 1 auto;
    padding: ${props => props.longbutton ? '1rem 2.5rem' : '1rem'};
    margin: 0;
    text-align: center;
    justify-content: center;
    color: #fff;
    background: ${props => props.cancelbutton ? '#c10000' : '#2185D0'};
    &:hover, &:focus {
      background: ${props => props.cancelbutton ? '#e40000' : '#0092ff'};
    }
}
`;

class Styledbutton extends Component {
  render() {
    return (
      <Mainbutton longbutton={this.props.longButton} cancelbutton={this.props.cancelButton}>{this.props.buttonText}</Mainbutton>
    );
  }
}

export default Styledbutton;
