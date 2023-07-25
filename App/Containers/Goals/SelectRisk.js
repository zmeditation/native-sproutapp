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
  from '../../Components/Goals/SelectRisk'
import {GoalActions}
  from '../../Redux/Reducers/GoalReducer'
import {FORM_TYPES}
  from '../../Config/contants'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {getUserID}
  from '../../Redux/Reducers/UserReducer'
import { CHILD_ENTITIES } from '../../Utility/Mapper/Child'

let data = {
  1: {
    0: {0: 0.1, 1: 0.3, 2: 0.6},
    1: {0: 0.15, 1: 0.25, 2: 0.6},
    2: {0: 0.20, 1: 0.25, 2: 0.55},
    3: {0: 0.25, 1: 0.25, 2: 0.5},
    4: {0: 0.30, 1: 0.3, 2: 0.4},
    5: {0: 0.35, 1: 0.25, 2: 0.4},
    6: {0: 0.40, 1: 0.25, 2: 0.35},
    7: {0: 0.45, 1: 0.20, 2: 0.35},
    8: {0: 0.50, 1: 0.3, 2: 0.2},
    9: {0: 0.55, 1: 0.3, 2: 0.15},
    10: {0: 0.60, 1: 0.3, 2: 0.1},
    11: {0: 0.65, 1: 0.2, 2: 0.15},
    12: {0: 0.70, 1: 0.2, 2: 0.1},
    13: {0: 0.75, 1: 0.15, 2: 0.1},
    14: {0: 0.80, 1: 0.1, 2: 0.1},
    15: {0: 0.85, 1: 0.10, 2: 0.05},
    16: {0: 0.90, 1: 0.05, 2: 0.05},
    17: {0: 0.90, 1: 0.05, 2: 0.05}
  },
  2: {
    0: {0: 0.9, 1: 0.05, 2: 0.05},
    1: {0: 0.8, 1: 0.1, 2: 0.1},
    2: {0: 0.7, 1: 0.15, 2: 0.15},
    3: {0: 0.6, 1: 0.2, 2: 0.2},
    4: {0: 0.5, 1: 0.25, 2: 0.25},
    5: {0: 0.4, 1: 0.3, 2: 0.3},
    6: {0: 0.3, 1: 0.35, 2: 0.35},
    7: {0: 0.25, 1: 0.35, 2: 0.4},
    8: {0: 0.2, 1: 0.35, 2: 0.45},
    9: {0: 0.2, 1: 0.35, 2: 0.45},
    10: {0: 0.2, 1: 0.40, 2: 0.40},
    11: {0: 0.1, 1: 0.45, 2: 0.45},
    12: {0: 0.05, 1: 0.45, 2: 0.5},
    13: {0: 0.05, 1: 0.50, 2: 0.45},
    14: {0: 0.2, 1: 0.4, 2: 0.4},
    15: {0: 0.4, 1: 0.25, 2: 0.35},
    16: {0: 0.1, 1: 0.2, 2: 0.7},
    17: {0: 0.4, 1: 0.2, 2: 0.4}
  },
  3: {
    0: {0: 0.1, 1: 0.2, 2: 0.7},
    1: {0: 0.15, 1: 0.25, 2: 0.6},
    2: {0: 0.15, 1: 0.25, 2: 0.6},
    3: {0: 0.20, 1: 0.30, 2: 0.5},
    4: {0: 0.20, 1: 0.35, 2: 0.45},
    5: {0: 0.20, 1: 0.40, 2: 0.4},
    6: {0: 0.40, 1: 0.40, 2: 0.2},
    7: {0: 0.40, 1: 0.40, 2: 0.2},
    8: {0: 0.45, 1: 0.45, 2: 0.1},
    9: {0: 0.45, 1: 0.40, 2: 0.15},
    10: {0: 0.4, 1: 0.4, 2: 0.2},
    11: {0: 0.35, 1: 0.35, 2: 0.3},
    12: {0: 0.3, 1: 0.3, 2: 0.4},
    13: {0: 0.2, 1: 0.3, 2: 0.5},
    14: {0: 0.1, 1: 0.3, 2: 0.6},
    15: {0: 0.1, 1: 0.2, 2: 0.7},
    16: {0: 0.1, 1: 0.1, 2: 0.8},
    17: {0: 0.05, 1: 0.05, 2: 0.9},
    18: {0: 0.05, 1: 0.05, 2: 0.9}
  }
}

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type, payload} = action

  switch (type) {

    case localActions.UPDATE_RISK:
      console.log('')
      dispatch(change(payload['form'], payload['field'], payload['value']))
      break

    case localActions.SELECT_RISK:
      console.log('action in select risk ::: ', action)
      dispatch(change(action['form'], GOAL_ENTITIES.PORTFOLIO_RISK, action[GOAL_ENTITIES.PORTFOLIO_RISK]))
      dispatch(GoalActions.selectRisk(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR], action[COMMON_ENTITIES.NAVIGATOR_TITLE]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [GOAL_TYPE] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  // update the risk selected
  // by the user in the form
  UPDATE_RISK: 'UPDATE_RISK',

  // Select the risk and move
  // to next screen
  SELECT_RISK: 'SELECT_RISK'
}

const mapStateToProps = (state, props) => {
  // get childID
  const childID = props[CHILD_ENTITIES.CHILD_ID]
  // get goalID
  const goalID = props[GOAL_ENTITIES.GID]
  // get child's firstname
  const firstName = props[CHILD_ENTITIES.FIRST_NAME]
  // user id
  let userID = getUserID(state.root.u)

  let valuesPresent = state.form[FORM_TYPES.ADD_GOAL] && state.form[FORM_TYPES.ADD_GOAL].values
  let portfolioRisk = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.PORTFOLIO_RISK]) || props[GOAL_ENTITIES.PORTFOLIO_RISK] || 2

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // current risk index for portfolio
    portfolioRisk: portfolioRisk,

    // risk values to show
    riskValues: ['LOW', 'MODERATE', 'HIGH'],

    childID: childID,
    goalID: goalID,
    firstName: firstName || 'Timmy',
    navigatorTitle: props[COMMON_ENTITIES.NAVIGATOR_TITLE],

    chartData: data,

    userID: userID
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
