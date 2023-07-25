/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 26/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Goals/InvestReady'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {GoalActions}
  from '../../Redux/Reducers/GoalReducer'
import {UserActions}
  from '../../Redux/Reducers/UserReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.CONFIRM:
      console.log('-- confirming now --')
      dispatch(UserActions.initiatePlaid(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.SKIP:
      dispatch(GoalActions.skipBankConnection(action[COMMON_ENTITIES.NAVIGATOR]))
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
  console.log('invest ready container ::; ', props)
  // get child id
  const childID = props[CHILD_ENTITIES.CHILD_ID]
  // get goal id
  const goalID = props[GOAL_ENTITIES.GID]

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // child id
    childID: childID,
    // goal id
    goalID: goalID
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
