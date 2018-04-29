import React, { Component } from 'react'
import { Form, TextArea, Input } from 'semantic-ui-react'
import styled from 'styled-components'

import Styledbutton from '../styledcomponents/Styledbutton'

// Styled components
const Styledquestionwrap = styled.div`
  padding: 2rem 1rem 1rem;
  border-top: 1px solid #333;
`;

const Styledform = styled(Form)`
  /* &&& for specificity */
  &&& {
    margin-top: 3rem;
    .fields {
      justify-content: center;
    }
    label {
      font-size: .75rem;
      text-transform: uppercase;
      text-align: center;
    }
    input[type=number], textarea {
      background: #333;
      border: none;
      max-height: 10rem;
      color: #fff;
      font-size: 1rem;
    }
    input[type=number] {
      text-align: center;
    }
    button {
      margin: 1.5rem auto 0 auto;
    }
  }
`;

// Title template
const QuesTemplate = ({title, question}) => (
  <div>
    <h5>{title}</h5>
    <p>{question}</p>
  </div>
);

// We might need new layouts for different types of questions.
const EstimateQ = () => (
  <Styledform inverted>
    <Form.Group>
      <Form.Field control={Input} placeholder="00" label="Hours" type="number" min="0" max="24" /> :
      <Form.Field control={Input} placeholder="00" label="Minutes" type="number" min="0" max="60" /> :
      <Form.Field control={Input} placeholder="00" label="Seconds" type="number" min="0" max="60" />
    </Form.Group>
    <Form.Field control={TextArea} label="Rationale" placeholder="Explain your rationale..." />
    <Styledbutton type="submit">Submit Response</Styledbutton>
  </Styledform>
);

class Scenarioquestion extends Component {
  render() {
    return (
      <Styledquestionwrap>
        <QuesTemplate title={this.props.title} question={this.props.question} />
        <EstimateQ />
      </Styledquestionwrap>
    );
  }
}

export default Scenarioquestion;
