/* eslint-disable no-unused-vars */
/**
 * Created by demon on 24/11/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change}
  from 'redux-form'
import Screen
  from '../../Components/Sprout/CreateChildNotification'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {ChildActions}
  from '../../Redux/Reducers/ChildReducer'
import {getUserID}
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
    case localActions.NEXT:
      console.log('got user ID : ', action[USER_ENTITIES.USER_ID])
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
  NEXT: 'NEXT'
}

const mapStateToProps = (state, props) => {
  let userID = getUserID(state.root.u)
  console.log('state in ::: ', state)
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
