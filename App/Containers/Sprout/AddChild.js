/* eslint-disable no-trailing-spaces */
/**
 * Created by viktor on 21/6/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/Sprout/AddChild'
import {ChildActions, getAvatar, isProcessing}
  from '../../Redux/Reducers/ChildReducer'
import {getIdentityData, getUserID}
  from '../../Redux/Reducers/UserReducer'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'

// ========================================================
// Utility Functions
// ========================================================

const handleLocalAction = (dispatch, action, navigation) => {
  const {type} = action

  switch (type) {
    case localActions.SUBMIT_ADD_CHILD:
      console.log('--- submitting add child now --- ', action)
      dispatch(ChildActions.confirmChildSsn(action[USER_ENTITIES.USER_ID], action[CHILD_ENTITIES.FIRST_NAME], action[CHILD_ENTITIES.LAST_NAME], action[CHILD_ENTITIES.DOB], action[USER_ENTITIES.IDENTITY_DATA], action[COMMON_ENTITIES.NAVIGATOR]))
      break
    case localActions.NOTIFY_AGE_LIMITATION:
      console.log('*** notifying age limitation ***')
      dispatch(ChildActions.notifyAgeLimitation(action[COMMON_ENTITIES.NAVIGATOR]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  SUBMIT_ADD_CHILD: 'SUBMIT_ADD_CHILD',
  NOTIFY_AGE_LIMITATION: 'NOTIFY_AGE_LIMITATION'
}

const mapStateToProps = (state, props) => {
  const avatar = getAvatar(state.root.children)
  const processing = isProcessing(state.root.children)
  let userID = getUserID(state.root.u)
  let identityData = getIdentityData(state.root['u']) || undefined

  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // child's photo/avatar
    avatar: avatar,

    // is add child processing,
    isProcessing: processing,

    userID: userID,

    // user identity data
    identityData: identityData
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
