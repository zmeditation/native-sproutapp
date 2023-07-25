/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 7/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Common/PlaidConnect'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {UserActions, getUserID, isUserProcessing}
  from '../../Redux/Reducers/UserReducer'
import {GoalActions}
  from '../../Redux/Reducers/GoalReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {FORM_TYPES, SEGMENT_ACTIONS}
  from '../../Config/contants'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {analytics}
  from '../../Config/AppConfig'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.SUCCESS:

      analytics.track({
        userId: action[USER_ENTITIES.USER_ID],
        event: SEGMENT_ACTIONS.PLAID_CONNECT_SUCCESSFUL,
        properties: {}
      })

      console.log('----- action in plaid connect success ::::: ', action)
      dispatch(UserActions.dismissPlaid(action[COMMON_ENTITIES.NAVIGATOR]))
      dispatch(UserActions.plaidLinked(action[USER_ENTITIES.USER_ID], action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[USER_ENTITIES.PLAID_ACCOUNT_ID], action[USER_ENTITIES.PLAID_PUBLIC_TOKEN], action[COMMON_ENTITIES.PARENT_NAVIGATOR]))
      break

    case localActions.EXIT:
      dispatch(UserActions.dismissPlaid(action[COMMON_ENTITIES.NAVIGATOR]))
      break

    case localActions.SKIP:
      console.log('--- skipping now --- , ', action)
      dispatch(UserActions.dismissPlaid(action[COMMON_ENTITIES.NAVIGATOR]))
      dispatch(GoalActions.navigateToHomepage(action[COMMON_ENTITIES.NAVIGATOR]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {

  NAVIGATE_TO_NEXT_SCREEN: 'NAVIGATE_TO_NEXT_SCREEN',

  // on successful plaid account
  // connected
  SUCCESS: 'SUCCESS',

  // on explicit exit action
  // for plaid
  EXIT: 'EXIT',

  // skip plaid linking
  SKIP: 'SKIP'
}

const mapStateToProps = (state, props) => {
  let parentNavigator = props[COMMON_ENTITIES.PARENT_NAVIGATOR]
  console.log('parent navigator :: ', parentNavigator)

  // get user ID
  let userID = getUserID(state.root.u)
  // get CHILD id
  const childID = props[CHILD_ENTITIES.CHILD_ID]
  // get goalID
  const goalID = props[GOAL_ENTITIES.GID]

  // let valuesPresent = state.form[FORM_TYPES.ADD_GOAL] && state.form[FORM_TYPES.ADD_GOAL].values
  // let recurringFrequency = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.RECURRING_FREQUENCY])
  // let oneOffInvestment = (valuesPresent && state.form[FORM_TYPES.ADD_GOAL].values[GOAL_ENTITIES.ONE_OFF_INVESTMENT]) || 20

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // parent navigator
    parentNavigator: parentNavigator,
    // user ID
    userID: userID,
    // child ID
    childID: childID,
    // goal ID
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
