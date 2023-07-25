/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 22/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Settings/Statements'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {ChildActions, isProcessing, getChildren, getStatements}
  from '../../Redux/Reducers/ChildReducer'
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
  // children objects
  let children = getChildren(state.root.children)
  // child id array
  let childIDs = (children && Object.keys(children)) || []
  // user unique id
  let userID = getUserID(state.root.u)

  console.log('children :: ', children)
  console.log('state :: ', state)

  let statements = {}
  for (var i = 0; i < childIDs.length; i++) {
    statements[childIDs[i]] = getStatements(state.root.children, childIDs[i])
  }

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,
    // children objects
    children: children,
    // child id array
    childIDs: childIDs,
    // user id
    userID: userID,
    // statements object
    statements: statements
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
