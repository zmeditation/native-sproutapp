/* eslint-disable no-trailing-spaces,no-multiple-empty-lines */
/**
 * Created by viktor on 5/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change} from 'redux-form'
import Screen
  from '../../Components/Goals/RecurringAmount'
import {GoalActions, isGoalProcessing}
  from '../../Redux/Reducers/GoalReducer'
import {getChildren}
  from '../../Redux/Reducers/ChildReducer'
import {getUserID, isUserProcessing, UserActions, isFundingSourceLinked}
  from '../../Redux/Reducers/UserReducer'
import {FORM_TYPES}
  from '../../Config/contants'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import { CHILD_ENTITIES } from '../../Utility/Mapper/Child'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type, payload} = action

  switch (type) {

    case localActions.UPDATE_ONE_OFF_INVESTMENT:
    case localActions.UPDATE_RECURRING_AMOUNT:
    case localActions.UPDATE_RECURRING_TYPE:
      dispatch(change(payload['form'], payload['field'], payload['value']))
      break



    case localActions.SKIP:
      dispatch(change(action['form'], GOAL_ENTITIES.ONE_OFF_INVESTMENT, 0))

      const isOneOff = action[GOAL_ENTITIES.IS_ONE_OFF_INVESTMENT_ONLY]
      if (!isOneOff) {
        dispatch(GoalActions.updatePartialGoal(action[USER_ENTITIES.USER_ID], action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action['patch'][GOAL_ENTITIES.GOAL_AMOUNT], action['patch'][GOAL_ENTITIES.PORTFOLIO_RISK], action[COMMON_ENTITIES.NAVIGATOR]))
      }

      let recurAmount = action['patch'][GOAL_ENTITIES.RECURRING_AMOUNT]
      if (recurAmount) {
        // recurring amount transfer will take place
        const isPlaidLinked = action[USER_ENTITIES.PLAID_LINKED]
        if (isPlaidLinked) {
          dispatch(GoalActions.navigateToTransferScreen(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR]))
        } else {
          dispatch(GoalActions.confirmBankConnection(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR]))
        }
      } else {
        // recurring amount transfer will also not take place
        dispatch(UserActions.fetchUserDetail(action[USER_ENTITIES.USER_ID], action[CHILD_ENTITIES.CHILD_IDs], action[COMMON_ENTITIES.NAVIGATOR], true))
      }
      break




    case localActions.SHOW_INVEST:
      const isOneOffInv = action[GOAL_ENTITIES.IS_ONE_OFF_INVESTMENT_ONLY]
      if (!isOneOffInv) {
        dispatch(GoalActions.updatePartialGoal(action[USER_ENTITIES.USER_ID], action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action['patch'][GOAL_ENTITIES.GOAL_AMOUNT], action['patch'][GOAL_ENTITIES.PORTFOLIO_RISK], action[COMMON_ENTITIES.NAVIGATOR]))
      }

      const isPlaidLinked = action[USER_ENTITIES.PLAID_LINKED]
      if (isPlaidLinked) {
        dispatch(GoalActions.navigateToTransferScreen(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR]))
      } else {
        dispatch(GoalActions.confirmBankConnection(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR]))
      }
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [GOAL_TYPE] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {

  SHOW_INVEST: 'SHOW_INVEST',

  // set the type of recurring frequency
  UPDATE_RECURRING_TYPE: 'SET_RECURRING_TYPE',

  // set the recurring amount
  UPDATE_RECURRING_AMOUNT: 'SET_RECURRING_AMOUNT',

  UPDATE_ONE_OFF_INVESTMENT: 'UPDATE_ONE_OFF_INVESTMENT',

  // update the first transfer date on
  // which recurring payment would be made
  UPDATE_FIRST_TRANSFER_DATE: 'UPDATE_FIRST_TRANSFER_DATE',

  // skip setting the recurring amount
  SKIP: 'SKIP',

  // submit the recurring amount
  SUBMIT_RECURRING_AMOUNT: 'SUBMIT_RECURRING_AMOUNT'
}

const mapStateToProps = (state, props) => {
  // get CHILD id
  const childID = props[CHILD_ENTITIES.CHILD_ID]
  // get goalID
  const goalID = props[GOAL_ENTITIES.GID]
  // is one-off investment only
  const isOneOffInv = props[GOAL_ENTITIES.IS_ONE_OFF_INVESTMENT_ONLY]
  // user id
  const userID = getUserID(state.root.u)
  // is user processing something
  const isProcessing = isGoalProcessing(state.root.goals)

  // is plaid processing
  const isPlaidProcessing = isUserProcessing(state.root.u)
  // is plaid already linked
  const isPlaidLinked = isFundingSourceLinked(state.root.u)
  console.log('----- IS FUNDING SOURCE LINKED _____---- :: ', isPlaidLinked)
  // children object
  const children = getChildren(state.root.children)
  // child id's array (for detail fetch)
  const childIDs = (children && Object.keys(children)) || []

  let valuesPresent = state.form[FORM_TYPES.ADD_GOAL] && state.form[FORM_TYPES.ADD_GOAL].values
  let goalDuration = valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values.duration
  let goalAmount = valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.GOAL_AMOUNT]
  let portfolioRisk = valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.PORTFOLIO_RISK]
  let recurringAmount = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.RECURRING_AMOUNT]) || props[GOAL_ENTITIES.RECURRING_AMOUNT]
  let firstTransferDate = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.FIRST_TRANSFER_DATE]) || undefined
  let recurringFrequency = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.RECURRING_FREQUENCY])
  let oneOffInvestment = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.ONE_OFF_INVESTMENT]) || 20

  console.log('recurring amount :: ', recurringAmount)
  console.log('goal amount :: ', goalAmount)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    isProcessing: isProcessing,

    goalDuration: goalDuration,

    goalAmount: goalAmount,

    portfolioRisk: portfolioRisk,

    isPlaidLinked: isPlaidLinked,

    userID: userID,
    childID: childID,
    goalID: goalID,

    childIDs: childIDs,

    // recurring amount
    recurringAmount: recurringAmount,

    firstTransferDate: firstTransferDate,

    recurringFrequency: recurringFrequency,

    oneOffInvestment: oneOffInvestment,

    isPlaidProcessing: isPlaidProcessing,

    isOneOffInv: isOneOffInv || false
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
