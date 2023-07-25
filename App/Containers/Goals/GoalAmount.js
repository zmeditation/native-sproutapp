/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 3/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change} from 'redux-form'
import Screen
  from '../../Components/Goals/GoalAmount'
import {GoalActions}
  from '../../Redux/Reducers/GoalReducer'
import {getDOB}
  from '../../Redux/Reducers/ChildReducer'
import {FORM_TYPES}
  from '../../Config/contants'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, FREQUENCY}
  from '../../Utility/Mapper/Common'
import { CHILD_ENTITIES }
  from '../../Utility/Mapper/Child'
import {getUserID}
  from '../../Redux/Reducers/UserReducer'
import moment
  from 'moment'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type, payload} = action

  switch (type) {

    case localActions.UPDATE_RECURRING_AMOUNT:
    case localActions.UPDATE_RECURRING_TYPE:
    case localActions.UPDATE_GOAL_AMOUNT:
    case localActions.UPDATE_RETURNS:
      dispatch(change(payload['form'], payload['field'], payload['value']))
      break

    case localActions.SKIP:
      console.log('action ::: ', action)
      dispatch(change(action['form'], GOAL_ENTITIES.RECURRING_AMOUNT, 0))
      dispatch(change(action['form'], GOAL_ENTITIES.GOAL_AMOUNT, 0))
      dispatch(GoalActions.goalAmountSelected(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR], action[COMMON_ENTITIES.NAVIGATOR_TITLE]))
      break

    case localActions.SET_GOAL_AMOUNT:
      dispatch(GoalActions.goalAmountSelected(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR], action[COMMON_ENTITIES.NAVIGATOR_TITLE]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [GOAL_TYPE] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {

  // update goal amount in the form
  UPDATE_GOAL_AMOUNT: 'UPDATE_GOAL_AMOUNT',

  // update returns
  UPDATE_RETURNS: 'UPDATE_RETURNS',

  // update the recurring amount selected by user
  UPDATE_RECURRING_AMOUNT: 'UPDATE_RECURRING_AMOUNT',

  // update the type of recurring frequency
  UPDATE_RECURRING_TYPE: 'UPDATE_RECURRING_TYPE',

  // submit the goal information to server
  SET_GOAL_AMOUNT: 'SET_GOAL_AMOUNT',

  SKIP: 'SKIP'
}

const mapStateToProps = (state, props) => {
  // get user id
  let userID = getUserID(state.root.u)
  // get child ID
  const childID = props[CHILD_ENTITIES.CHILD_ID]
  // get goalID
  const goalID = props[GOAL_ENTITIES.GID]
  // get child's date of birth
  const childDOB = getDOB(state.root.children, childID) || '1990-02-01'

  console.log('--- state in goal amount --- :: ', state.form[FORM_TYPES.ADD_GOAL])
  let valuesPresent = state.form[FORM_TYPES.ADD_GOAL] && state.form[FORM_TYPES.ADD_GOAL].values
  let goalAmount = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.GOAL_AMOUNT]) || 0
  let returns = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.RETURNS]) || 0
  let recurringAmount = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.RECURRING_AMOUNT]) || props[GOAL_ENTITIES.RECURRING_AMOUNT] || 50
  let recurringFrequency = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.RECURRING_FREQUENCY]) || FREQUENCY.ONE_WEEK

  let growthRate
  switch (recurringFrequency) {
    case FREQUENCY.ONE_WEEK:
      growthRate = 0.05 / 52
      break
    case FREQUENCY.FORTNIGHT:
      growthRate = 0.05 / 26
      break
    case FREQUENCY.ONE_MONTH:
      growthRate = 0.05 / 12
      break
    default:
      growthRate = 0.05 / 52
      break
  }

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    childDOB: childDOB,
    targetYear: 18,

    // goal amount
    goalAmount: goalAmount,
    returns: returns,
    recurringAmount: recurringAmount,
    recurringFrequency: recurringFrequency,
    growthRate: growthRate,

    userID: userID,
    childID: childID,
    goalID: goalID,
    navigatorTitle: props[COMMON_ENTITIES.NAVIGATOR_TITLE]
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
