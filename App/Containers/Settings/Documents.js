/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 23/11/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Settings/Documents'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {ChildActions, isProcessing, getChildren, getDocuments}
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
  let children = getChildren(state.root.children)
  let childIDs = (children && Object.keys(children)) || []
  let userID = getUserID(state.root.u)

  let processing = isSettingsProcessing(state.util)
  console.log('### is processing ### :: ', processing)
  let documents = {}
  let documentsAvailable = true
  for (var i = 0; i < childIDs.length && documentsAvailable; i++) {
    documents[childIDs[i]] = getDocuments(state.root.children, childIDs[i])
    documentsAvailable = documents[childIDs[i]] !== undefined
  }
  console.log('--- changes :: ', documents)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    children: children,
    childIDs: childIDs,
    userID: userID,
    documentsAvailable: documentsAvailable,
    documents: documents
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
