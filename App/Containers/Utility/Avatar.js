/* eslint-disable no-trailing-spaces */
/**
 * Created by viktor on 30/6/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Utility/Avatar'
import {getAvatar, ChildActions}
  from '../../Redux/Reducers/ChildReducer'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action
  switch (type) {
    case localActions.ADD_PHOTO:
      dispatch(ChildActions.addAvatar(action[CHILD_ENTITIES.CHILD_ID], action[CHILD_ENTITIES.AVATAR]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  ADD_PHOTO: 'ADD_PHOTO'
}

const mapStateToProps = (state, props) => {
  const childID = props[CHILD_ENTITIES.CHILD_ID]
  const avatar = getAvatar(state.root.children, childID)

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // child's photo/avatar
    avatar: avatar,

    // child ID
    childID: childID
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
