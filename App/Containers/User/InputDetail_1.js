/* eslint-disable no-trailing-spaces,no-unused-vars */
/**
 * User Input detail 1
 * - first name
 * - last name
 *
 * Created by viktor on 21/6/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/User/InputDetail_1'
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
  console.log('state :: ', state)
  let userID = getUserID(state.root.u)
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // next screen to navigate
    nextScreen: SPROUT.USER_INPUT_DETAIL_3,

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
