/* eslint-disable no-unused-vars,no-multi-spaces,no-trailing-spaces,key-spacing */
/**
 * Created by viktor on 31/5/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change} from 'redux-form'
import Screen
  from '../../Components/Goals/SelectInvestment'
import {GoalActions, isGoalProcessing as isProcessing}
  from '../../Redux/Reducers/GoalReducer'
import {GOAL_TYPES}
  from '../../Config/contants'
import {ChildActions, getAvatar}
  from '../../Redux/Reducers/ChildReducer'
import {getUserID}
  from '../../Redux/Reducers/UserReducer'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'

const primaryGoals = [
  {img: require('../../../Img/goals/college.png'), heading: 'A College Education'},
  {img: require('../../../Img/goals/musicLesson.png'), heading: 'Learning an Instrument'},
  {img: require('../../../Img/goals/travel.png'), heading: 'Travel + Adventure'},
  {img: require('../../../Img/goals/codeClub.png'), heading: 'Learn to Code'}
]

const educationGoal = [
  {img: require('../../../Img/goals/education_college.png'), heading: 'College'},
  {img: require('../../../Img/goals/education_college_living.png'), heading: 'College Living Expenses'},
  {img: require('../../../Img/goals/education_school.png'), heading: 'School'},
  {img: require('../../../Img/goals/education_school_excursion.png'), heading: 'School Excursion'},
  {img: require('../../../Img/goals/education_code_club.png'), heading: 'Code Club'},
  {img: require('../../../Img/goals/education_informal.png'), heading: 'Informal Education'}
]

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action) => {
  const {type, payload} = action

  switch (type) {

    case localActions.SELECT_GOAL:
      payload.value !== GOAL_TYPES.CUSTOM && dispatch(change(payload.form, payload.field, payload.value))
      dispatch(GoalActions.goalTypeSelected(action[CHILD_ENTITIES.CHILD_ID], action[COMMON_ENTITIES.NAVIGATOR]))
      break

    case localActions.SELECT_CUSTOM_GOAL:
      dispatch(GoalActions.goalTypeSelected(action[CHILD_ENTITIES.CHILD_ID], action[COMMON_ENTITIES.NAVIGATOR]))
      break

    case localActions.ADD_PHOTO:
      dispatch(ChildActions.addAvatar(action[CHILD_ENTITIES.AVATAR]))
      break

    case localActions.ADD_GOAL:
      const riskType = action['riskType']
      let riskSelected = false
      if (riskType) {
        riskSelected = true
        dispatch(change(action['form'], GOAL_ENTITIES.PORTFOLIO_RISK, riskType))
      }
      dispatch(GoalActions.addCustomGoal(action[USER_ENTITIES.USER_ID], action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.NAME], action[CHILD_ENTITIES.FIRST_NAME], action[COMMON_ENTITIES.NAVIGATOR], riskSelected))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [GOAL_TYPE] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  // used for selecting goal type
  SELECT_GOAL : 'SELECT_GOAL',

  // select custom goal for user
  SELECT_CUSTOM_GOAL : 'SELECT_CUSTOM_GOAL',

  // add suggested goal to child
  ADD_GOAL: 'ADD_GOAL',

  // add 'CHILDs' photo
  ADD_PHOTO: 'ADD_PHOTO'
}

const mapStateToProps = (state, props) => {
  const avatar = getAvatar(state.root.children)

  // get child's firstname
  const firstName = props[CHILD_ENTITIES.FIRST_NAME]

  // get childID
  const childID = props[CHILD_ENTITIES.CHILD_ID]

  // user id
  const userID = getUserID(state.root.u)

  // is goal processing
  const processing = isProcessing(state.root.goals)
  console.log('---- is processing goal --- :: ', processing)
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // child's photo/avatar
    avatar: avatar,

    childID: childID,

    firstName: firstName || 'Alex',

    primaryGoals: primaryGoals,

    isProcessing: processing,

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
