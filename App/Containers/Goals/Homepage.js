/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 19/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Goals/Homepage'
import {ChildActions, getFirstName}
  from '../../Redux/Reducers/ChildReducer'
import {getGoal, GoalActions, isFetchGoalDetailProcessing, getGrowth}
  from '../../Redux/Reducers/GoalReducer'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import * as Immutable from 'seamless-immutable'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action
  switch (type) {
    case localActions.INVEST:
      console.log('------ investing now -------', action)
      dispatch(GoalActions.investOnGoal(
        action[CHILD_ENTITIES.CHILD_ID],
        action[GOAL_ENTITIES.GID],
        action[COMMON_ENTITIES.NAVIGATOR],
        true
      ))
      break
    case localActions.HIDE_GOAL:
      dispatch(ChildActions.hideGoal(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.FETCH_CHART_DATA:
      dispatch(GoalActions.fetchGoalChartData(action[GOAL_ENTITIES.GID]))
      break
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----, ', action)
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  INVEST: 'INVEST',
  HIDE_GOAL: 'HIDE_GOAL',
  FETCH_CHART_DATA: 'FETCH_CHART_DATA'
}

const mapStateToProps = (state, props) => {
  // goal id
  let goalID = props[GOAL_ENTITIES.GID]
  // child id
  let childID = props[CHILD_ENTITIES.CHILD_ID]
  // child's first name
  let childName = getFirstName(state.root.children, childID)
  // goal's
  let goal = getGoal(state.root.goals, goalID)
  // id detail processing
  let isDetailProcessing = isFetchGoalDetailProcessing(state.root.goals)
  // growth value
  let growth = getGrowth(state.root.goals, props[GOAL_ENTITIES.GID])

  console.log('#### is processing ::: ', isDetailProcessing)
  console.log('growth::: ', growth)
  console.log(' goal :: ------->>>>  ', goal)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    goalID: goalID,
    childID: childID,
    goal: goal,
    childName: childName,
    growth: growth,
    isGoalDetailProcessing: isDetailProcessing
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
