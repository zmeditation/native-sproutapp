/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 14/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Settings/SettingPanel'
import {AuthActions, getIDToken}
  from '../../Redux/Reducers/AuthReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {getUserID}
  from '../../Redux/Reducers/UserReducer'
import {ChildActions}
  from '../../Redux/Reducers/ChildReducer'
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
    case localActions.NAVIGATE_DEEP:
      dispatch(SettingActions.navigateDeep(action[COMMON_ENTITIES.SCREEN_TYPE], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.LOGOUT:
      dispatch(AuthActions.logout(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.CLOSE_PANEL:
      dispatch(SettingActions.hideSettings(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.SHOW_DOCUMENTS:
      dispatch(SettingActions.showDocuments(action[AUTH_ENTITIES.ID_TOKEN], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.VIEW_TRANSFERS:
      dispatch(SettingActions.viewTransfers(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.SHOW_CONFIG:
      dispatch(SettingActions.showConfig(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.ABOUT_US:
      break
    case localActions.FAQ:
      break
    case localActions.TRANSFER_NOW:
      dispatch(SettingActions.transferNow(action[AUTH_ENTITIES.ID_TOKEN], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  NAVIGATE_TO_PROFILE: 'NAVIGATE_TO_PROFILE',
  NAVIGATE_DEEP: 'NAVIGATE_DEEP',
  LOGOUT: 'LOGOUT',
  CLOSE_PANEL: 'CLOSE_PANEL',
  ADD_NEW_CHILD: 'ADD_NEW_CHILD',
  SHOW_DOCUMENTS: 'SHOW_DOCUMENTS',
  VIEW_TRANSFERS: 'VIEW_TRANSFERS',
  SHOW_CONFIG: 'SHOW_CONFIG',
  ABOUT_US: 'ABOUT_US',
  FAQ: 'FAQ',
  TRANSFER_NOW: 'TRANSFER_NOW'
}

const mapStateToProps = (state, props) => {
  const idToken = getIDToken(state.auth)
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    idToken: idToken
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
