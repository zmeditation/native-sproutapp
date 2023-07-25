/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 13/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React
  from 'react'
import {Alert}
  from 'react-native'
import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Common/LoginPin'
import {AUTH_ENTITIES, PIN_COMPONENT_TYPE, PIN_VERIFICATION_TYPE}
  from '../../Utility/Mapper/Auth'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {AuthActions, isProcessing, getError, getPIN}
  from '../../Redux/Reducers/AuthReducer'
import {getUserEmail, UserActions}
  from '../../Redux/Reducers/UserReducer'
import moment from 'moment'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action
  switch (type) {
    case localActions.REGISTER_PIN:
      dispatch(AuthActions.registerPin(action[AUTH_ENTITIES.PIN], action[USER_ENTITIES.EMAIL_ID], action[AUTH_ENTITIES.PIN_ACTION_TYPE], action[COMMON_ENTITIES.NAVIGATOR], dispatch))
      break

    case localActions.TOGGLE_TOUCH_ID:
      dispatch(AuthActions.showTouchId(action[COMMON_ENTITIES.NAVIGATOR]))
      break

    case localActions.LOGIN_SUCCESS:
      dispatch(AuthActions.passcodeLogin(action[USER_ENTITIES.EMAIL_ID], action[COMMON_ENTITIES.NAVIGATOR], dispatch))
      break

    case localActions.LOGOUT:
      dispatch(AuthActions.logout(action[COMMON_ENTITIES.NAVIGATOR], true))
      break

    case localActions.HIDE_ERROR:
      dispatch(AuthActions.disableError())
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  BUTTON_PRESSED: 'BUTTON_PRESSED',
  TOGGLE_TOUCH_ID: 'TOGGLE_TOUCH_ID',
  REGISTER_PIN: 'REGISTER_PIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  HIDE_ERROR: 'HIDE_ERROR'
}

const mapStateToProps = (state, props) => {
  const future = moment('2017/07/03', 'YYYY/MM/DD').add(18, 'y')
  let now = moment()
  let weeks = future.diff(now, 'weeks')

  let username = getUserEmail(state.root.u)
  let pin = getPIN(state.auth)
  let processing = isProcessing(state.auth)
  const error = getError(state.auth)
  let errorObj = (error && error.error) || undefined

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    username: username,

    firstPIN: pin,

    processing: processing,

    errorObj: errorObj,

    isTouchID: true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
  }
}

// ========================================================
// Connect & Export
// ========================================================

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
