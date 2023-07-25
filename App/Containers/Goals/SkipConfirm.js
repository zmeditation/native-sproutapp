/* eslint-disable no-unused-vars */
/**
 * Created by demon on 26/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Goals/SkipConfirm'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {ChildActions, isProcessing}
  from '../../Redux/Reducers/ChildReducer'
import {GoalActions}
  from '../../Redux/Reducers/GoalReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.CONTINUE:
      break
    case localActions.BACK:
      dispatch(GoalActions.popScreen(action[COMMON_ENTITIES.NAVIGATOR]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  CONTINUE: 'CONTINUE',
  BACK: 'BACK'
}

const mapStateToProps = (state, props) => {
  console.log('props ::; ', props)
  // get user's unique ID
  const userID = props[USER_ENTITIES.USER_ID]

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions
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
