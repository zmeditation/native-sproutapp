/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 7/12/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/User/ParentDashboard'
import {ChildActions, isProcessing, getChildren, getFamilyGrowth, getTotalPortfolioValue, getTotalContributions}
  from '../../Redux/Reducers/ChildReducer'
import {isGoalProcessing, getGoals, getTransferInstructions}
  from '../../Redux/Reducers/GoalReducer'
import {isUserProcessing, getUserID, getFirstName, getTodoList, UserActions}
  from '../../Redux/Reducers/UserReducer'
import {SettingActions, SettingTypes, isProcessing as isSettingProcessing}
  from '../../Redux/Reducers/SettingReducer'
import {getIDToken}
  from '../../Redux/Reducers/AuthReducer'
import {COMMON_ENTITIES, FREQUENCY}
  from '../../Utility/Mapper/Common'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.NAVIGATE_TODO:
      dispatch(UserActions.navigateTodo(action[USER_ENTITIES.USER_ID], action[COMMON_ENTITIES.SCREEN_TYPE], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.SHOW_DOCUMENTS:
      console.log(' ------ show documents ------ ')
      dispatch(SettingActions.showDocuments(action[AUTH_ENTITIES.ID_TOKEN], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.SHOW_CONFIRMATIONS:
      console.log(' ------ show Confirmations ------ ')
      dispatch(SettingActions.showConfirmations(action[AUTH_ENTITIES.ID_TOKEN], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.VIEW_TRANSFERS:
      dispatch(SettingActions.viewTransfers(action[USER_ENTITIES.USER_ID], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.VIEW_ACTIVITY:
      dispatch(SettingActions.viewActivity(action[USER_ENTITIES.USER_ID], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.ADD_ACCOUNT:
      console.log('adding a new account ::: ', action)
      dispatch(ChildActions.addNewChild(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  NAVIGATE_TODO: 'navigateTodo',
  SHOW_DOCUMENTS: 'SHOW_DOCUMENTS',
  SHOW_CONFIRMATIONS: 'showConfirmations',
  VIEW_TRANSFERS: 'VIEW_TRANSFERS',
  VIEW_ACTIVITY: 'viewActivity',
  ADD_ACCOUNT: 'addAccount'
}

const mapStateToProps = (state, props) => {
  // firstname of the user
  let firstname = getFirstName(state.root.u)        // good
  // get children
  let children = getChildren(state.root.children)   // good
  let childIDs = (children && Object.keys(children)) || []    // good
  // user id
  let userID = getUserID(state.root.u)    // good
  // to do list
  let todoList = getTodoList(state.root.u) // good
  // total portfolio value
  let totalPortfolioValue = getTotalPortfolioValue(state.root.children) // good
  // total contribution value
  let totalContributions = getTotalContributions(state.root.children) // good
  // family growth values
  let familyGrowth = getFamilyGrowth(state.root.children)   // good
  console.log('fam growth :: ', familyGrowth)
  // is statements/confirmations fetch processing
  let isFetchProcessing = isSettingProcessing(state.util)

  let childrenAvailable = childIDs.length > 0
  const idToken = getIDToken(state.auth)

  let transferObj = []
  if (children) {
    Object.values(children).map(child => {
      let goals = getGoals(state.root.goals, child[CHILD_ENTITIES.CHILD_ID])
      goals.map(goal => {
        let instruction = goal[GOAL_ENTITIES.INSTRUCTIONS]
        instruction && instruction.map(ins => {
          let obj = {}
          console.log('ins obj :: ', ins)
          obj[CHILD_ENTITIES.FIRST_NAME] = child[CHILD_ENTITIES.FIRST_NAME]
          obj[GOAL_ENTITIES.NAME] = goal[GOAL_ENTITIES.NAME]
          obj[GOAL_ENTITIES.INSTRUCTION_FREQUENCY] = ins[GOAL_ENTITIES.INSTRUCTION_FREQUENCY]
          obj[GOAL_ENTITIES.INSTRUCTION_AMOUNT] = ins[GOAL_ENTITIES.INSTRUCTION_AMOUNT]
          obj[GOAL_ENTITIES.INSTRUCTION_INITIAL_REQUEST_TIME] = ins[GOAL_ENTITIES.INSTRUCTION_INITIAL_REQUEST_TIME]
          transferObj.push(obj)
        })
      })
    })
  }

  console.log('going for transfer obj :: ', transferObj)
  let monthlyInvestement = 0
  transferObj.map(t => {
    console.log('got :: ', t)
    let f = t[GOAL_ENTITIES.INSTRUCTION_FREQUENCY]
    let a = t[GOAL_ENTITIES.INSTRUCTION_AMOUNT]
    switch (f) {
      case FREQUENCY.ONE_WEEK:
        console.log('---adding one week --- : ', a)
        monthlyInvestement += (a && parseInt(a) * 4) || 0
        break
      case FREQUENCY.FORTNIGHT:
        console.log('---adding fortnight week --- : ', a)
        monthlyInvestement += (a && parseInt(a) * 2) || 0
        break
      case FREQUENCY.ONE_MONTH:
        console.log('---adding one month --- : ', a)
        monthlyInvestement += (a && parseInt(a)) || 0
        break
    }
  })

  console.log('monthly investment :: ', monthlyInvestement)
  console.log('transfer object ::: ', transferObj)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // are children available
    childrenAvailable: childrenAvailable,
    // firstname of the user
    firstname: firstname,
    // child IDs
    childIDs: childIDs,
    // children
    children: children,
    // user ID
    userID: userID,
    // todolist of user remaining tasks
    todoList: todoList,
    // id token
    idToken: idToken,
    // total portfolio value
    totalPortfolioValue: totalPortfolioValue || 0,
    // growth value of family portfolio
    growthValue: (familyGrowth && familyGrowth[CHILD_ENTITIES.GROWTH_IN_VALUE]) || 0,
    // growth percentage of family portfolio
    growthPercentage: (familyGrowth && familyGrowth[CHILD_ENTITIES.GROWTH_IN_PERCENTAGE]) || 0,
    // total montly invested
    monthlyInvestment: monthlyInvestement,
    // invested to date
    investedToDate: totalContributions,
    // next milestone
    nextMilestone: 0,
    // transaction obj
    transferObj: transferObj,
    // is statement/confirmations processing
    isFetchProcessing: isFetchProcessing
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
