/* eslint-disable no-unused-vars */
/**
 * Created by demon on 10/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change} from 'redux-form'
import Screen
  from '../../Components/User/Withdraw'
import {GoalActions}
  from '../../Redux/Reducers/GoalReducer'
import {FORM_TYPES}
  from '../../Config/contants'
import {ChildActions, getAvatar}
  from '../../Redux/Reducers/ChildReducer'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import { CHILD_ENTITIES } from '../../Utility/Mapper/Child'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type, payload} = action

  switch (type) {

    default:
      console.log('---- LOCAL ACTION DEFAULT [GOAL_TYPE] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
}

const mapStateToProps = (state, props) => {
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions
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
