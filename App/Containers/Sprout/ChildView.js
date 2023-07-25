/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 24/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Sprout/ChildView'
import {ChildActions, getChildren}
  from '../../Redux/Reducers/ChildReducer'
import {getGoals, GoalActions}
  from '../../Redux/Reducers/GoalReducer'
import {getUserID}
  from '../../Redux/Reducers/UserReducer'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import * as Immutable
  from 'seamless-immutable'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action
  switch (type) {
    case localActions.ADD_NEW_GOAL:
      dispatch(ChildActions.addNewGoal(action[CHILD_ENTITIES.CHILD_ID], action[COMMON_ENTITIES.NAVIGATOR]))
      break

    case localActions.SHOW_GOAL:
      dispatch(GoalActions.fetchGoalDetail(action[USER_ENTITIES.USER_ID], action[GOAL_ENTITIES.GID]))
      dispatch(ChildActions.showGoal(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[GOAL_ENTITIES.NAME], action[COMMON_ENTITIES.NAVIGATOR]))
      break

    case localActions.POPUP:
      console.log('popping up now :: ', action)
      dispatch(ChildActions.popChildView(action[COMMON_ENTITIES.NAVIGATOR]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  ADD_NEW_GOAL: 'ADD_NEW_GOAL',
  SHOW_GOAL: 'SHOW_GOAL',
  POPUP: 'popup'
}

const mapStateToProps = (state, props) => {
  // user ID
  let userID = getUserID(state.root.u)
  // child id
  let childID = props[CHILD_ENTITIES.CHILD_ID]
  // goals
  let goals = getGoals(state.root.goals, childID)
  // target child
  let children = getChildren(state.root.children)
  const child = children[childID]
  // child's portfolio
  const portolio = child && child[CHILD_ENTITIES.PORTFOLIO]

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // total portfolio value
    totalPortfolioValue: (portolio && portolio[CHILD_ENTITIES.CURRENT_VALUE] && parseFloat(portolio[CHILD_ENTITIES.CURRENT_VALUE])) || 0,
    // first name
    firstName: child[CHILD_ENTITIES.FIRST_NAME],
    // growth value of family
    growthValue: (portolio && portolio[CHILD_ENTITIES.GROWTH_IN_VALUE] && parseFloat(portolio[CHILD_ENTITIES.GROWTH_IN_VALUE])),
    // growth percentage of family
    growthPercentage: (portolio && portolio[CHILD_ENTITIES.GROWTH_IN_PERCENTAGE] && parseFloat(portolio[CHILD_ENTITIES.GROWTH_IN_PERCENTAGE])),
    // user id
    userID: userID,
    // goal object
    goals: goals,
    // child ID
    childID: childID
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
