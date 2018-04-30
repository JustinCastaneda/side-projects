import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'

import Styledbutton from '../styledcomponents/Styledbutton'

const Styledmodal = styled(Modal)`
  &&& {
    color: #fff;
    background: #000;
    border: 2px solid #2185D0;
    border-radius: 4px;
    .header, .content, .actions {
      background: transparent;
      color: #fff;
      h3 {
        border: none;
        text-align: center;
        font-size: 1.5rem;
        text-transform: uppercase;
      }
    }
    .close {
      top: .5rem;
      right: .5rem;
    }
    button.button {
      margin: 0 auto;
    }
  }
`;

class Commonmodal extends Component {
  render() {
    return (
      <Styledmodal size={this.props.modalSize} closeIcon trigger={<div>{this.props.triggerButton}</div>}>
        <Modal.Header><h3>{this.props.modalHeader}</h3></Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {this.props.modalContent}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Styledbutton longButton="true">{this.props.buttonText}</Styledbutton>
        </Modal.Actions>
      </Styledmodal>
    );
  }
}

export default Commonmodal;
