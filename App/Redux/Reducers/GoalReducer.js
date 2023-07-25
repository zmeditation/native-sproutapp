/* eslint-disable comma-dangle,comma-dangle,key-spacing,no-trailing-spaces,no-multi-spaces,no-unused-vars */
/**
 * Created by victorchoudhary on 15/05/17.
 */

// ========================================================
// Import packages
// ========================================================

import { createReducer, createActions }
  from 'reduxsauce'
import Immutable
  from 'seamless-immutable'
import {processingIndicators, SEGMENT_ACTIONS}
  from '../../Config/contants'
import PARAMETERS
  from '../ActionParameters'
import {GOAL_ENTITIES, path}
  from '../../Utility/Mapper/Goal'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {UserTypes}
  from './UserReducer'
import {SettingTypes}
  from './SettingReducer'
import {analytics}
  from '../../Config/AppConfig'
import PHANTOM
  from '../../Utility/Phantom'
import { CHILD_ENTITIES } from '../../Utility/Mapper/Child'

// ========================================================
// Types & Action Creators
// ========================================================

const {Types, Creators} = createActions({
  startAddingGoal : null,
  showInvest: PARAMETERS.SHOW_INVEST,
  hideInvest: PARAMETERS.HIDE_INVEST,
  goalTypeSelected: PARAMETERS.GOAL_TYPE_SELECTED,
  goalDurationSelected: PARAMETERS.GOAL_DURATION_SELECTED,
  goalDurationSelectionNeeded: PARAMETERS.GOAL_DURATION_SELECTION_NEEDED,
  goalAmountSelected: PARAMETERS.GOAL_AMOUNT_SELECTED,
  recurringAmountSelected: null,

  // add a new goal for Sprout
  addCustomGoal   : PARAMETERS.ADD_CUSTOM_GOAL,
  // Success in Adding Goal
  addCustomGoalSuccess: PARAMETERS.ADD_CUSTOM_GOAL_SUCCESS,
  // Failure in Adding Goal
  addCustomGoalFailure: PARAMETERS.ADD_CUSTOM_GOAL_FAILURE,

  fetchGoalDetail: PARAMETERS.FETCH_GOAL_DETAIL,
  fetchGoalDetailSuccess: PARAMETERS.FETCH_GOAL_DETAIL_SUCCESS,
  fetchGoalDetailFailure: PARAMETERS.FETCH_GOAL_DETAIL_FAILURE,

  fetchGoalChartData: PARAMETERS.FETCH_GOAL_CHART_DATA,
  fetchGoalChartDataSuccess: PARAMETERS.FETCH_GOAL_CHART_DATA_SUCCESS,
  fetchGoalChartDataFailure: PARAMETERS.FETCH_GOAL_CHART_DATA_FAILURE,

  updateCompleteGoal: PARAMETERS.UPDATE_COMPLETE_GOAL,
  updatePartialGoal: PARAMETERS.UPDATE_PARTIAL_GOAL,
  updateGoalSuccess: PARAMETERS.UPDATE_GOAL_SUCCESS,
  updateGoalFailure: PARAMETERS.UPDATE_GOAL_FAILURE,

  navigateToTransferScreen: PARAMETERS.NAVIGATE_TO_TRANSFER_SCREEN,
  transfer: PARAMETERS.TRANSFER,
  transferSuccess: PARAMETERS.TRANSFER_SUCCESS,
  transferFailure: ['error'],

  // select the portfolio risk
  costExpectedSelected: PARAMETERS.COST_EXPECTED_SELECTED,
  selectRisk      : PARAMETERS.SELECT_RISK,
  addRisk         : PARAMETERS.ADD_RISK,

  // view selected goal in VIEW_GOAL Screen
  viewGoal        : ['payload'],
  // invest on goal
  investOnGoal    : PARAMETERS.INVEST_ON_GOAL,
  navigateToHomepage: PARAMETERS.NAVIGATE_TO_HOMEPAGE,

  // navigate to edit goal screen,
  // payload would contain GID and CID
  navigateToEditGoal : PARAMETERS.NAVIGATE_TO_EDIT_GOAL,

  // edit selected goal
  editGoal        : PARAMETERS.EDIT_GOAL,
  // Success in editing goal
  editGoalSuccess : ['payload'],
  // Failure in editing goal
  editGoalFailure : ['payload'],

  // confirm bank connect
  confirmBankConnection   : PARAMETERS.CONFIRM_BANK_CONNECTION,
  // confirm if you want to skip bank connection
  skipBankConnection: PARAMETERS.SKIP_BANK_CONNECTION,
  // pop screen
  popScreen: PARAMETERS.POP_SCREEN
})

export const GoalTypes      = Types
export const GoalActions    = Creators

// ========================================================
// Initial State
// ========================================================

/*
  Initial State of the Goal reducer.

  goal : {

    // mapping of child to their goals
    CHILD_MAP : {
      'CIDx' : [ 'GIDx', 'GIDx', ... ],
      'CIDxx': [ ... ]
    },

    // sanity of the goal module
    SANITY : {
      OK : true,
      ERROR : undefined,
      PROCESSING : {
        ADD_GOAL_PROCESSING : false
      }
    },

    // mapping of each goal with its
    // concerned data
    'GIDx' : { },
    'GIDxx': { },
    ...
  }

 */
export var INITIAL_STATE = Immutable({})
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(GOAL_ENTITIES.CHILD_MAP)(), {})
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(GOAL_ENTITIES.IS_OK)(), true)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(GOAL_ENTITIES.ERROR)(), undefined)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(GOAL_ENTITIES.PROCESSING)(), undefined)

// ========================================================
// Handler Functions
// ========================================================

/*
  Add Goal.
  This function is called when Add Goal is initiated.

  Store modification :-
  1. Set { sanity : {processing : {'addingGoal' : true} } }
 */
const addCustomGoalHandler = (state, payload) => PHANTOM.setIn(state, path(GOAL_ENTITIES.PROCESSING)(), GOAL_ENTITIES.ADD_CUSTOM_GOAL_PROCESSING)

/*
  Add Goal Success.
  This function is called when addGoal is successful.

  Store modification :-
  1. Set {'GID' : payload}
  2. Set { sanity : {ok : true} }
  3. Set { sanity : {error : undefined} }
  4. Set { sanity : {processing : {'addingGoal' : false} } }
 */
const addCustomGoalSuccessHandler = (state, action) => {
  try {
    analytics.track({
      userId: action[USER_ENTITIES.USER_ID],
      event: SEGMENT_ACTIONS.GOAL_ADDED,
      properties: {}
    })

    let payload = PHANTOM.assertAndPackActionPayload(action)

    let s = PHANTOM.setIn(state, path(GOAL_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(GOAL_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PROCESSING)(), undefined)
    // set goal id to payload in store
    s = PHANTOM.setIn(s, path(GOAL_ENTITIES.GID_INDEX)(payload[GOAL_ENTITIES.GID]), payload)

    let arr = PHANTOM.getIn(s, path(GOAL_ENTITIES.CID_INDEX)(payload[GOAL_ENTITIES.CID]))
    if (!arr) {
      arr = []
      s = PHANTOM.setIn(s, path(GOAL_ENTITIES.CID_INDEX)(payload[GOAL_ENTITIES.CID]), arr)
    }
    arr = arr.concat(payload[GOAL_ENTITIES.GID])
    s = PHANTOM.setIn(s, path(GOAL_ENTITIES.CID_INDEX)(payload[GOAL_ENTITIES.CID]), arr)
    return s
  } catch (error) {
    // console.warn('GOAL REDUCER ERROR [ADD_CUSTOM_GOAL_SUCCESS] : ', error)
    return state
  }
}

/*
  Add Goal Failure.
  This function is called when Add Goal is not successful.

  Store modification :-
  1. Set { sanity : {ok : false} }
  2. Set { sanity : {error : object} }
  3. Set { sanity : {processing : {'addingGoal' : false} } }
 */
const addCustomGoalFailureHandler = (state, {error}) => {
  let s = PHANTOM.setIn(state, path(GOAL_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PROCESSING)(), false)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.ERROR)(), error)
  return s
}

const updateGoalSuccessHandler = (state, action) => {
  try {
    let payload = PHANTOM.assertAndPackActionPayload(action)

    let s = PHANTOM.setIn(state, path(GOAL_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(GOAL_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PROCESSING)(), undefined)

    let goalID = action[GOAL_ENTITIES.GID]
    let goalData = action[GOAL_ENTITIES.GOAL_DATA]

    let goalAmount = goalData['target']
    goalAmount || (goalAmount = 10000)
    let recurringAmount = goalData['recurringinvestmentamount']
    let recurringFrequency = goalData['recurringinvestmentfrequency']
    let firstTransferDate = goalData['initialtransferdate']

    goalAmount && (goalAmount !== null) && (s = PHANTOM.setIn(s, path(GOAL_ENTITIES.GOAL_AMOUNT)(goalID), goalAmount))
    goalAmount && (goalAmount != null) && (s = PHANTOM.setIn(s, path(GOAL_ENTITIES.BALANCE)(goalID), parseFloat(goalAmount) / 3))
    recurringAmount && (recurringAmount !== null) && (s = PHANTOM.setIn(s, path(GOAL_ENTITIES.RECURRING_AMOUNT)(goalID), recurringAmount))
    recurringFrequency && (recurringFrequency !== null) && (s = PHANTOM.setIn(s, path(GOAL_ENTITIES.RECURRING_FREQUENCY)(goalID), recurringFrequency))
    firstTransferDate && (firstTransferDate !== null) && (s = PHANTOM.setIn(s, path(GOAL_ENTITIES.FIRST_TRANSFER_DATE)(goalID), firstTransferDate))

    return s
  } catch (error) {
    // console.warn('GOAL REDUCER ERROR [UPDATE_GOAL_SUCCESS] : ', error)
    return state
  }
}

const updateGoalFailureHandler = (state, {error}) => {
  let s = PHANTOM.setIn(state, path(GOAL_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PROCESSING)(), false)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.ERROR)(), error)
  return s
}

const fetchUserDetailSuccessHandler = (state, action) => {
  try {
    PHANTOM.assertActionPayload(action)

    // set state of goal data as OK
    let s = PHANTOM.setIn(state, path(GOAL_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(GOAL_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PROCESSING)(), undefined)

    // de-refer user detail data
    let detail = action[CHILD_ENTITIES.CHILD_DETAIL_DATA]['sprouts_detail']

    // remap 'sproutDetail' data on 'sproutID' key
    // and club goalData & instructions over
    // goal together
    let goalMap   = {}

    detail.map(d => {
      let goalsArr = d['goals']
      goalsArr.map(g => {
        let temp = Object.assign({}, g, {[GOAL_ENTITIES.INSTRUCTIONS]: []})
        goalMap[g['goal_id']] = temp
      })

      let instructionArr = d['instructions']
      instructionArr.map(i => {
        let gID = i['goal_id']
        let instructionObj = {}
        instructionObj[GOAL_ENTITIES.INSTRUCTION_AMOUNT] = i['amount']
        instructionObj[GOAL_ENTITIES.INSTRUCTION_FREQUENCY] = i['frequency']
        instructionObj[GOAL_ENTITIES.INSTRUCTION_INITIAL_REQUEST_TIME] = i['initial_request_time']
        instructionObj[GOAL_ENTITIES.INSTRUCTION_NEXT_TRANSFER_DATE] = i['next_transfer_date']
        goalMap[gID][GOAL_ENTITIES.INSTRUCTIONS].push(instructionObj)
      })
    })

    detail.map(sprout => {
      let childID = sprout['sprout_id']
      let goals = sprout['goals']

      // map goals to children
      let arr = []
      goals.map(goal => {
        if (goal['goal_id']) {
          arr = arr.concat(goal['goal_id'])
        }
      })
      s = PHANTOM.setIn(s, path(GOAL_ENTITIES.CID_INDEX)(childID), arr)

      // get instructions object
      let instruction

      // add goal information to goal index
      goals.map(goal => {
        try {
          let goalID = goal['goal_id']
          s = PHANTOM.setIn(s, path(GOAL_ENTITIES.GID_INDEX)(goalID), goalID)
          s = PHANTOM.setIn(s, path(GOAL_ENTITIES.GID)(goalID), goalID)
          s = PHANTOM.setIn(s, path(GOAL_ENTITIES.NAME)(goalID), goal['name'])
          s = PHANTOM.setIn(s, path(GOAL_ENTITIES.GOAL_AMOUNT)(goalID), parseFloat(goal['target']))
          s = PHANTOM.setIn(s, path(GOAL_ENTITIES.BALANCE)(goalID), parseFloat(goal['current_value']))
          s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PORTFOLIO_RISK)(goalID), goal['current_portfolio_id'])
          s = PHANTOM.setIn(s, path(GOAL_ENTITIES.TOTAL_CONTRIBUTIONS)(goalID), parseFloat(goal['total_contributions']))
          s = PHANTOM.setIn(s, path(GOAL_ENTITIES.INSTRUCTIONS)(goalID), goalMap[goalID][GOAL_ENTITIES.INSTRUCTIONS])
        } catch (err) {
          console.log('*** goal entites missing *** ', goal, err)
        }
      })
    })

    return s
  } catch (err) {
    return state
  }
}

const editGoal = (state, payload) => {
  return state
}

const editGoalSuccess = (state, {payload}) => {
  return state
}

const editGoalFailure = (state, {error}) => {
  return state
}

const updatePartialGoalHandler = (state, action) => PHANTOM.setIn(state, path(GOAL_ENTITIES.PROCESSING)(), GOAL_ENTITIES.UPDATE_PARTIAL_GOAL_PROCESSING)
const updateCompleteGoalHandler = (state, action) => PHANTOM.setIn(state, path(GOAL_ENTITIES.PROCESSING)(), GOAL_ENTITIES.UPDATE_COMPLETE_GOAL_PROCESSING)

const fetchGoalDetailHandler = (state, action) => PHANTOM.setIn(state, path(GOAL_ENTITIES.PROCESSING)(), GOAL_ENTITIES.FETCH_GOAL_DETAIL_PROCESSING)
const fetchGoalDetailSuccessHandler = (state, action) => {
  let goalData = action[GOAL_ENTITIES.GOAL_DATA]
  let goalID = goalData['goal_id']

  let s = PHANTOM.setIn(state, path(GOAL_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.GROWTH_IN_PERCENTAGE)(goalID), goalData['goal']['growth_in_percentage'])
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.GROWTH_IN_VALUE)(goalID), goalData['goal']['growth_in_value'])
  return s
}
const fetchGoalDetailFailureHandler = (state, {error}) => {
  let s = PHANTOM.setIn(state, path(GOAL_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.ERROR)(), error)
  return s
}

const fetchGoalChartDataHandler = (state, action) => PHANTOM.setIn(state, path(GOAL_ENTITIES.PROCESSING)(), GOAL_ENTITIES.FETCH_GOAL_CHART_DATA_PROCESSING)
const fetchGoalChartDataSuccessHandler = (state, action) => {
  let goalID = action[GOAL_ENTITIES.GID]
  let s = PHANTOM.setIn(state, path(GOAL_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(GOAL_ENTITIES.CHART_DATA)(goalID), action[GOAL_ENTITIES.CHART_DATA])
  return s
}

const fetchTransferSuccessHandler = (state, action) => {
  try {
    let transactions = action[USER_ENTITIES.USER_DATA]['user_transfers']
    let s = state
    transactions.map(transaction => {
      let goalID = transaction['goal_id']
      let transactionID = transaction['transfer_reference_id']
      let transactionAmount = transaction['amount']
      let transactionStatus = transaction['transfer_status']
      let transactionFrequency = transaction['frequency']
      let transactionNextTransferDate = transaction['next_transfer_date']

      s = PHANTOM.setIn(s, path(GOAL_ENTITIES.TRANSACTION_REFERENCE_ID)(goalID, transactionID), transactionID)
      s = PHANTOM.setIn(s, path(GOAL_ENTITIES.TRANSACTION_AMOUNT)(goalID, transactionID), transactionAmount)
      s = PHANTOM.setIn(s, path(GOAL_ENTITIES.TRANSACTION_STATUS)(goalID, transactionID), transactionStatus)
      s = PHANTOM.setIn(s, path(GOAL_ENTITIES.TRANSACTION_FREQUENCY)(goalID, transactionID), transactionFrequency)
      s = PHANTOM.setIn(s, path(GOAL_ENTITIES.TRANSACTION_NEXT_TRANSFER_DATE)(goalID, transactionID), transactionNextTransferDate)
    })
    return s
  } catch (err) {
    return state
  }
}

// ========================================================
// Reducer Formation & Exports
// ========================================================

export const HANDLERS = {
  // modify as per new scheme
  [Types.ADD_CUSTOM_GOAL]              : addCustomGoalHandler,
  [Types.ADD_CUSTOM_GOAL_SUCCESS]      : addCustomGoalSuccessHandler,
  [Types.ADD_CUSTOM_GOAL_FAILURE]      : addCustomGoalFailureHandler,

  [Types.UPDATE_PARTIAL_GOAL]          : updatePartialGoalHandler,
  [Types.UPDATE_COMPLETE_GOAL]         : updateCompleteGoalHandler,
  [Types.UPDATE_GOAL_SUCCESS]          : updateGoalSuccessHandler,
  [Types.UPDATE_GOAL_FAILURE]          : updateGoalFailureHandler,

  [UserTypes.FETCH_USER_DETAIL_SUCCESS]: fetchUserDetailSuccessHandler,

  [SettingTypes.VIEW_TRANSFERS_SUCCESS]: fetchTransferSuccessHandler,

  [Types.EDIT_GOAL]             : editGoal,
  [Types.EDIT_GOAL_SUCCESS]     : editGoalSuccess,
  [Types.EDIT_GOAL_FAILURE]     : editGoalFailure,

  [Types.FETCH_GOAL_DETAIL]             : fetchGoalDetailHandler,
  [Types.FETCH_GOAL_DETAIL_SUCCESS]     : fetchGoalDetailSuccessHandler,
  [Types.FETCH_GOAL_DETAIL_FAILURE]     : fetchGoalDetailFailureHandler,

  [Types.FETCH_GOAL_CHART_DATA]: fetchGoalChartDataHandler,
  [Types.FETCH_GOAL_CHART_DATA_SUCCESS]: fetchGoalChartDataSuccessHandler,
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

// ========================================================
// Selectors
// ========================================================

export const isGoalProcessing  = (state) => {
  return PHANTOM.getIn(state, path(GOAL_ENTITIES.PROCESSING)()) !== undefined
}

export const getGoals = (state, CID) => {
  let arr = PHANTOM.getIn(state, path(GOAL_ENTITIES.CID_INDEX)(CID))
  var result = []
  for (var k in arr) {
    result.push(PHANTOM.getIn(state, path(GOAL_ENTITIES.GID_INDEX)(arr[k])))
  }
  return result
}

export const getGoal = (state, GID) => PHANTOM.getIn(state, path(GOAL_ENTITIES.GID_INDEX)(GID))

export const getGoalName = (state, GID) => PHANTOM.getIn(state, path(GOAL_ENTITIES.NAME)(GID))

export const isFetchGoalDetailProcessing = (state) => {
  let processing = PHANTOM.getIn(state, path(GOAL_ENTITIES.PROCESSING)())
  if (processing && processing === GOAL_ENTITIES.FETCH_GOAL_DETAIL_PROCESSING) {
    return true
  } else {
    return false
  }
}

export const getGrowth = (state, GID) => {
  let percentage = PHANTOM.getIn(state, path(GOAL_ENTITIES.GROWTH_IN_PERCENTAGE)(GID))
  let value = PHANTOM.getIn(state, path(GOAL_ENTITIES.GROWTH_IN_VALUE)(GID))
  return {
    percentage: percentage,
    value: value
  }
}

export const getTransferInstructions = (state) => {
  const goals = PHANTOM.getIn(state, path(GOAL_ENTITIES.GOALS)())
  const transferIns = []
  Object.values(goals).map(goal => {
    let inst = goal[GOAL_ENTITIES.INSTRUCTIONS]
    inst.map(i => transferIns.push(i))
  })
  return transferIns
}

export const getTransactions = (state, GID) => PHANTOM.getIn(state, path(GOAL_ENTITIES.TRANSACTIONS)(GID))
