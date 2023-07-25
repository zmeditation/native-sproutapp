/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 1/12/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Settings/ViewTransfers'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {getChildren}
  from '../../Redux/Reducers/ChildReducer'
import {getGoals}
  from '../../Redux/Reducers/GoalReducer'
import {isUserProcessing, getUserID}
  from '../../Redux/Reducers/UserReducer'
import {isProcessing as isSettingsProcessing}
  from '../../Redux/Reducers/SettingReducer'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
}

const mapStateToProps = (state, props) => {
  const children = getChildren(state.root.children)
  let transferObj = []
  let isTransferPresent = true

  Object.values(children).map(child => {
    let goals = getGoals(state.root.goals, child[CHILD_ENTITIES.CHILD_ID])
    console.log('goals for ', child[CHILD_ENTITIES.FIRST_NAME], '\n are :: ', goals)
    let obj = {}
    obj[CHILD_ENTITIES.FIRST_NAME] = child[CHILD_ENTITIES.FIRST_NAME]
    obj['goals'] = goals
    transferObj.push(obj)
  })
  console.log('state :::: ', state)
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // transfer object
    transferObject: transferObj
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
