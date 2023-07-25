/* eslint-disable no-unused-vars */
/**
 * Created by demon on 24/11/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change}
  from 'redux-form'
import Screen
  from '../../Components/User/ConfirmPushNotification'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {UserActions, getUserID}
  from '../../Redux/Reducers/UserReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {SEGMENT_ACTIONS}
  from '../../Config/contants'
import {analytics}
  from '../../Config/AppConfig'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.CONFIRM:
    case localActions.SKIP:
      dispatch(UserActions.setPasscode(action[COMMON_ENTITIES.NAVIGATOR]))
      analytics.track({
        userId: action[USER_ENTITIES.USER_ID],
        event: SEGMENT_ACTIONS.PUSH_NOTIFICATION_CONFIRMED,
        properties: {}
      })
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  CONFIRM: 'CONFIRM',
  SKIP: 'SKIP'
}

const mapStateToProps = (state, props) => {
  let userID = getUserID(state.root.u)
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // user id
    userID: userID
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
