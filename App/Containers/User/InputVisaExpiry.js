/* eslint-disable no-trailing-spaces,no-unused-vars */
/**
 * User Input detail 2
 * - Date of birth
 *
 * Created by viktor on 21/6/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/User/InputVisaExpiry'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {UserActions}
  from '../../Redux/Reducers/UserReducer'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
var Moment = require('moment')

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.NAVIGATE_TO_NEXT_SCREEN:
      let d = action[USER_ENTITIES.VISA_EXPIRY]
      let dd = new Moment(d)
      let today = new Moment()
      let deviate = dd.isAfter(today)
      let nextScreen = deviate ? SPROUT.OTHER_RESIDENCE : action[COMMON_ENTITIES.SCREEN_TYPE]
      dispatch(UserActions.navigateUserDetailInput(nextScreen, action[COMMON_ENTITIES.NAVIGATOR]))
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
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // next screen to navigate
    nextScreen: SPROUT.USER_INPUT_DETAIL_5
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
