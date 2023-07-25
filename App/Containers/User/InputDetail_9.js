/* eslint-disable no-trailing-spaces,no-unused-vars */
/**
 * User Input detail 6
 * - User's Income Type
 *
 * Created by viktor on 28/6/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change}
  from 'redux-form'
import Screen
  from '../../Components/User/InputDetail_9'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {UserActions, getUserID}
  from '../../Redux/Reducers/UserReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {FORM_TYPES}
  from '../../Config/contants'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.UPDATE_FORM_VALUE:
      dispatch(change(action['form'], action['field'], action['value']))
      break

    case localActions.NAVIGATE_TO_NEXT_SCREEN:
      dispatch(UserActions.identityCheckComplete(action[USER_ENTITIES.IDENTITY_DATA], action[COMMON_ENTITIES.NAVIGATOR]))
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
  UPDATE_FORM_VALUE: 'UPDATE_FORM_VALUE'
}

const mapStateToProps = (state, props) => {
  let familyBrokerageFlag = (state.form[FORM_TYPES.ADD_USER] && state.form[FORM_TYPES.ADD_USER]['values'] && state.form[FORM_TYPES.ADD_USER]['values'][USER_ENTITIES.FAMILY_BROKERAGE_FLAG]) || false
  let familyPoliticalFlag = (state.form[FORM_TYPES.ADD_USER] && state.form[FORM_TYPES.ADD_USER]['values'] && state.form[FORM_TYPES.ADD_USER]['values'][USER_ENTITIES.FAMILY_POLITICAL_FLAG]) || false
  let stockOwnerFlag = (state.form[FORM_TYPES.ADD_USER] && state.form[FORM_TYPES.ADD_USER]['values'] && state.form[FORM_TYPES.ADD_USER]['values'][USER_ENTITIES.STOCK_OWNER_FLAG]) || false
  let formData = (state.form[FORM_TYPES.ADD_USER] && state.form[FORM_TYPES.ADD_USER]['values'])
  let userID = getUserID(state.root.u)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // next screen to navigate
    nextScreen: SPROUT.ACCEPT_TERMS_CONDITIONS,

    // user id
    userID: userID,

    familyBrokerageFlag: familyBrokerageFlag,
    familyPoliticalFlag: familyPoliticalFlag,
    stockOwnerFlag: stockOwnerFlag,
    formData: formData
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
