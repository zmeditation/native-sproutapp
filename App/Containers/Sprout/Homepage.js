/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 10/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Sprout/Homepage'
import {ChildActions, getChildren, isProcessing, getTotalPortfolioValue, getFamilyGrowth, getPortfolioDetail}
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
import * as Immutable from 'seamless-immutable'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action
  switch (type) {
    case localActions.ADD_ACCOUNT:
      console.log('adding a new account ::: ', action)
      dispatch(ChildActions.addNewChild(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.SHOW_CHILD_VIEW:
      dispatch(ChildActions.showChild(action[CHILD_ENTITIES.CHILD_ID], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  SHOW_CHILD_VIEW: 'showChildView',
  ADD_ACCOUNT: 'addAccount'
}

const mapStateToProps = (state, props) => {
  // user ID
  let userID = getUserID(state.root.u)
  // children's of user
  let children = getChildren(state.root.children)
  // child id's
  let childIDs = (children && Object.keys(children)) || []
  // total portfolio value
  let totalPortfolioValue = getTotalPortfolioValue(state.root.children)
  // family growth values
  let familyGrowth = getFamilyGrowth(state.root.children)
  console.log('family growth ::: ', familyGrowth)

  let childArr = []
  Object.values(children).map(child => childArr.push(child))

  let childrenAvailable = childIDs.length > 0
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // children object
    childArr: childArr,
    // total portfolio value
    totalPortfolioValue: totalPortfolioValue,
    // growth value of family
    growthValue: (familyGrowth && familyGrowth[CHILD_ENTITIES.GROWTH_IN_VALUE]) || 0,
    // growth percentage of family
    growthPercentage: (familyGrowth && familyGrowth[CHILD_ENTITIES.GROWTH_IN_PERCENTAGE]) || 0,
    // user id
    userID: userID,
    // children available
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
