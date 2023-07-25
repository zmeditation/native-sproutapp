/* eslint-disable no-unused-vars */
/**
 * Created by demon on 9/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change}
  from 'redux-form'
import Screen
  from '../../Components/Grow/Homepage'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {UserActions, getUserID}
  from '../../Redux/Reducers/UserReducer'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.OPEN_ARTICLE:
      dispatch(UserActions.openArticle(action[COMMON_ENTITIES.NAVIGATOR]))
      break
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  OPEN_ARTICLE: 'OPEN_ARTICLE',
  BACK: 'BACK'
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
