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
  from '../../Components/Goals/InvestUnderway'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {GoalActions}
  from '../../Redux/Reducers/GoalReducer'
import {getUserID}
  from '../../Redux/Reducers/UserReducer'
import {getChildren}
  from '../../Redux/Reducers/ChildReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {FORM_TYPES}
  from '../../Config/contants'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.INVEST:
      let oneOffAmount = (action[GOAL_ENTITIES.ONE_OFF_INVESTMENT] && action[GOAL_ENTITIES.ONE_OFF_INVESTMENT].toString()) || undefined
      let frequency = (action[GOAL_ENTITIES.RECURRING_FREQUENCY] && action[GOAL_ENTITIES.RECURRING_FREQUENCY].toString()) || undefined
      let recurringAmount = (action[GOAL_ENTITIES.RECURRING_AMOUNT] && action[GOAL_ENTITIES.RECURRING_AMOUNT].toString()) || undefined
      dispatch(GoalActions.transfer(action[USER_ENTITIES.USER_ID], action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], recurringAmount, frequency, oneOffAmount, action[COMMON_ENTITIES.NAVIGATOR], action[CHILD_ENTITIES.CHILD_IDs]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  INVEST: 'invest'
}

const mapStateToProps = (state, props) => {
  // is it operationally stale
  const userID = getUserID(state.root.u)
  // child id
  const childID = props[CHILD_ENTITIES.CHILD_ID]
  // goal id
  const goalID = props[GOAL_ENTITIES.GID]
  // check if form has values
  let valuesPresent = state.form[FORM_TYPES.ADD_GOAL] && state.form[FORM_TYPES.ADD_GOAL].values
  // recurring amount frequency
  let recurringFrequency = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.RECURRING_FREQUENCY])
  // one off investment amount
  let oneOffInvestment = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.ONE_OFF_INVESTMENT])
  // recurring amount
  let recurringAmount = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.RECURRING_AMOUNT])
  // children object
  const children = getChildren(state.root.children)
  // child id's array (for detail fetch)
  const childIDs = (children && Object.keys(children)) || []

  console.log('child ids :: ', childIDs, '\n user id :: ', userID)
  console.log('one off :: ', oneOffInvestment, '\t, frequ :: ', recurringFrequency, '\t r-amount :: ', recurringAmount)
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // user id
    userID: userID,
    // child id
    childID: childID,
    // goal id
    goalID: goalID,
    // recurring frequency
    recurringFrequency: recurringFrequency,
    // one off investment
    oneOffInvestment: oneOffInvestment,
    // recurring amount
    recurringAmount: recurringAmount,
    // child id's
    childIDs: childIDs
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
