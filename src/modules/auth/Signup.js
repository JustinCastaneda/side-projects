import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Button, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import Headerlogo from '../common/Headerlogo'


// Styled Components

const Styledgrid = styled(Grid)`
  width: 100%;
  &&>.row {
    justify-content: center;
  }
`;

const Centercolumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

const Styledsubhead = styled.h3`
  color: #eee;
  font-size: 2rem;
  padding: 1.5rem 0 1rem 0;
  margin: 0 0 .5rem;
  font-weight: 400;
`;

const Styledsubtext = styled.p`
  font-size: 1.3rem;
  color: #fff;
  max-width: 30rem;
  margin-top: .5rem;
  text-align: center;
`;

const Styledform = styled(Form)`
  width: 25rem;
  padding-bottom: 2rem;
  &.ui.form {
    .field.field input {
      color: #fff;
      background: rgba(0,0,0,.50);
      border: 2px solid #2185D0;
      &::-webkit-input-placeholder {
        color: #ccc;
      }
      &:-webkit-autofill {
			  -webkit-box-shadow: 0 0 0 30px #000 inset !important;
			  -webkit-text-fill-color: white !important;
        border-color: #0092ff !important;
      }
      &:hover {
        border-color: #0092ff !important;
      }
      &:focus, &:active {
        color: #fff;
        border-color: #fff !important;
        background: rgba(0,0,0,.75);
        box-shadow: 0 0 16px 6px rgba(33, 133, 208, 0.45);
      }
    }
    .ui.buttons {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;

const Stylednavlink = styled(NavLink)`
  display: flex;
  flex: 1 1 auto;
  padding-right: ${props => props.lastbutton ? '0' : '1.2rem'};
  &:hover, &:focus, &:active, &:visited {
    outline-width: 0;
  }
`;

const Styledbutton = styled(Button)`
  /* &&& for specificity override */
  &&& {
    font-size: 1rem;
    display: flex;
    flex: 1 1 auto;
    padding: 1rem;
    margin: 0;
    text-align: center;
    justify-content: center;
    color: #fff;
    background: ${props => props.cancelform ? '#c10000' : '#2185D0'};
    &:hover, &:focus {
      background: ${props => props.cancelform ? '#e40000' : '#0092ff'};
    }
  }
`;


// Component States
// Comming soon...


class Login extends Component {
  render() {
    return (
      <div className="wrapper fixed">
        <Grid padded>
          <Grid.Row className="header">
            <Headerlogo fontSize="3.2rem" paddingLeft>DEF3NSE</Headerlogo>
            <Grid.Column width={6}>
              <Centercolumn>
                <Headerlogo fontSize="7rem">DEF3NSE</Headerlogo>
                <Styledsubtext>Join the fight in a battle of wits, as you defend against a series of Cyber-Security threats.</Styledsubtext>
                <Styledsubhead>Log in to Begin</Styledsubhead>
                <Styledgrid>
                  <Grid.Row>
                    <Styledform size="large" onSubmit={this.props.Signup}>
                      <Form.Field>
                        <Form.Input type="email" name="email" required placeholder="Enter an email address..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input required placeholder="Enter a username..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input required minLength="6" type="password" placeholder="Enter a password..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input required minLength="6" type="password" placeholder="Confirm password..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input required placeholder="Enter first name..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input required placeholder="Enter last name..."></Form.Input>
                      </Form.Field>
                      <Button.Group>
                        <Stylednavlink to="/"><Styledbutton cancelform="true">Cancel</Styledbutton></Stylednavlink>
                        <Stylednavlink to="/dashboard" lastbutton="true"><Styledbutton>Submit</Styledbutton></Stylednavlink>
                      </Button.Group>
                    </Styledform>
                  </Grid.Row>
                </Styledgrid>
              </Centercolumn>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Login;
