/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 16/10/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Sprout/ChildSSN'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {ChildActions, isProcessing}
  from '../../Redux/Reducers/ChildReducer'
import {getUserEmail}
  from '../../Redux/Reducers/UserReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {FORM_TYPES}
  from '../../Config/contants'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.SUBMIT_SSN:
      console.log('submitted ssn : ', action)
      // dispatch(ChildActions.submitChildSSN(action[CHILD_ENTITIES.CHILD_ID], action[CHILD_ENTITIES.FIRST_NAME], action[COMMON_ENTITIES.NAVIGATOR]))
      dispatch(ChildActions.addChild(action[USER_ENTITIES.USER_ID], action[CHILD_ENTITIES.FIRST_NAME], action[CHILD_ENTITIES.LAST_NAME], action[CHILD_ENTITIES.DOB], action[CHILD_ENTITIES.SSN], action[USER_ENTITIES.EMAIL_ID], action[COMMON_ENTITIES.NAVIGATOR], action[USER_ENTITIES.IDENTITY_DATA]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  SUBMIT_SSN: 'SUBMIT_SSN'
}

const mapStateToProps = (state, props) => {
  // get user's unique ID
  const userID = props[USER_ENTITIES.USER_ID]
  // get user's on-boarding identity data
  const identityData = props[USER_ENTITIES.IDENTITY_DATA]
  // get child's firstname
  const firstName = props[CHILD_ENTITIES.FIRST_NAME]
  // get child's lastname
  const lastName = props[CHILD_ENTITIES.LAST_NAME]
  // get child's DOB
  const DOB = props[CHILD_ENTITIES.DOB]
  // get user email
  const email = getUserEmail(state.root.u)
  console.log('---- got email ---- ', email)
  // get whether add child is processing or not
  const processing = isProcessing(state.root.children)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    firstName: firstName,
    lastName: lastName,
    DOB: DOB,
    userID: userID,
    identityData: identityData,
    isProcessing: processing,
    emailID: email
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
