import { push } from 'react-router-redux'
import ActionTypes from '../actionTypes'
import { FourSight } from '../../utils/bundle'

export function signUpUser (action) {
  return dispatch => {
    dispatch({type: ActionTypes.SIGNUP_PENDING});
    return FourSight.createUser(
      '_',
      action.password,
      action.email,
      action.lastName,
      action.firstName
    ).then(_ => {
      dispatch({
        type: ActionTypes.SIGNUP_SUCCESS,
        message: 'You have successfully registered your account and can now log in.'
      })
      dispatch(push('/dashboard'))
    }).catch(_ => {
      dispatch({
        type: ActionTypes.SIGNUP_FAIL,
        message: 'There was an error signing up.'
      })
    })
  }
}