import React from 'react'
import { NavLink } from 'react-router-dom'
import {Grid, Button, Form, Message} from 'semantic-ui-react'
import styled from 'styled-components'
import Headerlogo from '../common/Headerlogo'
import Styledbutton from '../styledcomponents/Styledbutton'
import {connect} from "react-redux";
import ActionTypes from "../../redux/actionTypes";
import {signUpUser} from "../../redux/actionCreators/auth";

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

// Component States
// Comming soon...


// Component

function Login(props) {
  const { signUp } = props;
  const loginState = props.loginState.toJS();
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
                    <Styledform size="large" onSubmit={signUp} error={!!loginState.error} success={!!loginState.success}>
                      <Message
                        error
                        header='Sign Up Failed'
                        content={loginState.error}
                      />
                      <Message
                        success
                        header='Sign Up Success'
                        content={loginState.success}
                      />
                      <Form.Field>
                        <Form.Input type="hidden" name="username" value="_"></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input type="email" name="email" required placeholder="Enter an email address..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input required minLength="8"  name="password" type="password" placeholder="Enter a password..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input required minLength="8" type="password" name='confirmPassword' placeholder="Confirm password..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input name="firstName" required placeholder="Enter first name..."></Form.Input>
                      </Form.Field>
                      <Form.Field>
                        <Form.Input name="lastName" required placeholder="Enter last name..."></Form.Input>
                      </Form.Field>
                      <Button.Group>
                        <Stylednavlink to="/"><Styledbutton cancelButton="true">Cancel</Styledbutton></Stylednavlink>
                        <Styledbutton loading={loginState.isPending}>Submit</Styledbutton>
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

const mapDispatchToProps = (dispatch) => ({
  signUp: ({ target: {email, password, confirmPassword, firstName, lastName} }) => {
    if (password.value !== confirmPassword.value) {
      dispatch({
        type: ActionTypes.SIGNUP_FAIL,
        message: 'Passwords do not match'
      });
      return
    }
    dispatch(signUpUser({
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      firstName: firstName.value,
      lastName: lastName.value
    }))
  }
});

export default connect(state => ({
  loginState: state.loginState
}), mapDispatchToProps)(Login);
