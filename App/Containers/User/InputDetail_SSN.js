/**
 * Created by demon on 13/10/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import Screen
  from '../../Components/User/InputDetail_SSN'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {UserActions}
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
    case localActions.NAVIGATE_TO_NEXT_SCREEN:
      dispatch(UserActions.navigateUserDetailInput(action[COMMON_ENTITIES.SCREEN_TYPE], action[COMMON_ENTITIES.NAVIGATOR]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  NAVIGATE_TO_NEXT_SCREEN: 'NAVIGATE_TO_NEXT_SCREEN'
}

const mapStateToProps = (state, props) => {
  let residencyType = (state.form[FORM_TYPES.ADD_USER] && state.form[FORM_TYPES.ADD_USER].values && state.form[FORM_TYPES.ADD_USER].values[USER_ENTITIES.RESIDENCY_TYPE]) || USER_ENTITIES.CITIZEN
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    // next screen to navigate
    nextScreen: residencyType === USER_ENTITIES.CITIZEN ? SPROUT.USER_INPUT_DETAIL_5 : SPROUT.USER_COUNTRY_BORN
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
