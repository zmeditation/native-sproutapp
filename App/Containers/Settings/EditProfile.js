/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 9/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Settings/EditProfile'
import {change}
  from 'redux-form'
import {AuthActions, getIDToken, getPIN}
  from '../../Redux/Reducers/AuthReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {getUserID, UserActions, getFirstName, getLastName, getUserEmail}
  from '../../Redux/Reducers/UserReducer'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import {SettingActions, getRootNavigator}
  from '../../Redux/Reducers/SettingReducer'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action
  switch (type) {
    case localActions.CHANGE_PASSWORD:
      dispatch(SettingActions.changePassword(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.CHANGE_PIN:
      dispatch(SettingActions.changePin(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.SET_VALUE:
      dispatch(change(action['form'], action['field'], action['value']))
      break
    case localActions.NAVIGATE_TO_SCREEN:
      dispatch(UserActions.navigateUserDetailInput(action[COMMON_ENTITIES.SCREEN_TYPE], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  SET_VALUE: 'SET_VALUE',
  NAVIGATE_TO_SCREEN: 'NAVIGATE_TO_SCREEN',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PIN: 'CHANGE_PIN'
}

const mapStateToProps = (state, props) => {
  let firstName = getFirstName(state.root.u)
  let lastName = getLastName(state.root.u)
  let emailID = getUserEmail(state.root.u)
  let passcode = getPIN(state.auth)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // first name of user
    firstName: firstName,
    // last name of user
    lastName: lastName,
    // passcode
    passcode: passcode,
    // password
    password: 'choudharyVictor5432',
    // email id of user
    emailID: emailID
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
