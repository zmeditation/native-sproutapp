/* eslint-disable no-trailing-spaces,no-unused-vars */
/**
 * User Input detail 7
 * - User's Total Financial Value
 *
 * Created by viktor on 28/6/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change}
  from 'redux-form'
import Screen
  from '../../Components/User/InputDetail_7'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {UserActions, getUserID}
  from '../../Redux/Reducers/UserReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.NAVIGATE_TO_NEXT_SCREEN:
      dispatch(change(action['form'], action['field'], action['value']))
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
  NAVIGATE_TO_NEXT_SCREEN: 'NAVIGATE_TO_NEXT_SCREEN'
}

const mapStateToProps = (state, props) => {
  let userID = getUserID(state.root.u)
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // next screen to navigate
    nextScreen: SPROUT.USER_INPUT_DETAIL_8,

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
