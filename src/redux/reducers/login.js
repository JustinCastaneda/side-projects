import { fromJS } from 'immutable'
import { Map } from 'immutable'

import ActionTypes from '../actionTypes'

const initialState = Map({
  error: null,
  warning: null,
  success: null,
  isPending: false
})

export default (state = fromJS(initialState), action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_FAIL:
    case ActionTypes.SIGNUP_FAIL:
      return fromJS(initialState).set('error', action.message)
        .set('isPending', false)

    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.SIGNUP_SUCCESS:
      return fromJS(initialState).set('success', action.message)
        .set('isPending', false)

    case ActionTypes.LOGIN_PENDING:
    case ActionTypes.SIGNUP_PENDING:
      return fromJS(initialState).set('isPending', true)

    case ActionTypes.LOGOUT:
    case ActionTypes.LOGIN_START:
      return fromJS(initialState)

    default:
      return state
  }
}
