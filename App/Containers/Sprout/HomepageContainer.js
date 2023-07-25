/* eslint-disable no-trailing-spaces,no-unused-vars */
/**
 * Created by viktor on 14/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Sprout/HomepageContainer'
import {ChildActions, isProcessing, getChildren}
  from '../../Redux/Reducers/ChildReducer'
import {isGoalProcessing}
  from '../../Redux/Reducers/GoalReducer'
import {isUserProcessing, getUserID}
  from '../../Redux/Reducers/UserReducer'
import {SettingActions, SettingTypes}
  from '../../Redux/Reducers/SettingReducer'
import {getIDToken}
  from '../../Redux/Reducers/AuthReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action) => {
  const {type} = action
  switch (type) {
    case localActions.ADD_ACCOUNT:
      console.log('adding a new account ::: ', action)
      dispatch(ChildActions.addNewChild(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.NAVIGATE_TO:
      dispatch(SettingActions.navigateTo(action[COMMON_ENTITIES.SCREEN_TYPE], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.ADD_NEW_CHILD:
      dispatch(ChildActions.addNewChild(action[USER_ENTITIES.USER_ID], action[COMMON_ENTITIES.NAVIGATOR], action[COMMON_ENTITIES.CAN_SKIP], action[COMMON_ENTITIES.SKIP_SCREEN]))
      break
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  ADD_ACCOUNT: 'ADD_ACCOUNT',
  NAVIGATE_TO: 'NAVIGATE_TO',
  ADD_NEW_CHILD: 'ADD_NEW_CHILD'
}

const mapStateToProps = (state, props) => {
  const goalProcessing = isGoalProcessing(state.root.goal)
  const childProcessing = isProcessing(state.root.children)
  const userProcessing = isUserProcessing(state.root.u)

  let children = getChildren(state.root.children)
  let childIDs = (children && Object.keys(children)) || []
  let userID = getUserID(state.root.u)
  let childrenAvailable = childIDs.length > 0

  console.log('state :::: ', state)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    isProcessing: goalProcessing && childProcessing && userProcessing,

    children: children,
    childIDs: childIDs,
    userID: userID,
    childrenAvailable: childrenAvailable
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
