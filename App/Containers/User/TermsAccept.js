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
  from '../../Components/User/TermsAccept'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {UserActions, getUserID}
  from '../../Redux/Reducers/UserReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {FORM_TYPES, SEGMENT_ACTIONS}
  from '../../Config/contants'
import {analytics}
  from '../../Config/AppConfig'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.AGREE:
      dispatch(UserActions.agreeTc(action[COMMON_ENTITIES.NAVIGATOR]))
      analytics.track({
        userId: action[USER_ENTITIES.USER_ID],
        event: SEGMENT_ACTIONS.TERMS_CONDITIONS_ACCEPTED,
        properties: {}
      })
      break
    case localActions.DISAGREE:
      dispatch(UserActions.disagreeTC(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.CLOSE_TC:
      dispatch(UserActions.closeTc(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  CLOSE_TC: 'closeTC',
  AGREE: 'accept',
  DISAGREE: 'disagree'
}

const mapStateToProps = (state, props) => {
  let userID = getUserID(state.root.u)
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

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
