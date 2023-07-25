/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 9/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change} from 'redux-form'
import Screen
  from '../../Components/Goals/PortfolioDetail'
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

    case localActions.ADD_RISK:
      dispatch(GoalActions.addRisk(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR], action[COMMON_ENTITIES.NAVIGATOR_TITLE]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [GOAL_TYPE] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  ADD_RISK: 'ADD_RISK'
}

const mapStateToProps = (state, props) => {
  // get user id
  let userID = getUserID(state.root.u)
  // get child ID
  const childID = props[CHILD_ENTITIES.CHILD_ID]
  // get goalID
  const goalID = props[GOAL_ENTITIES.GID]
  // navigator title
  const navigatorTitle = props[COMMON_ENTITIES.NAVIGATOR_TITLE]

  let valuesPresent = state.form[FORM_TYPES.ADD_GOAL] && state.form[FORM_TYPES.ADD_GOAL].values
  let portfolioRisk = valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.PORTFOLIO_RISK]

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    portfolioRisk: portfolioRisk,

    // Portfolio Name
    portfolioName: 'Aggressive Portfolio',

    // portfolio detail
    portfolioDetail: 'Suited for long term investors that want to take on more risk for the expecttion of greater long term growth.\n\nWhen you’re investing for the long term taking on a little more risk can be a good thing. Be prepared to see it drop occasionally, but be patient and you can expect some strong long term growth from this agressive investment option.',

    goalID: goalID,

    childID: childID,

    userID: userID,

    navigatorTitle: navigatorTitle
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
