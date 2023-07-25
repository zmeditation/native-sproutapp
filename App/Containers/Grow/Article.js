/* eslint-disable no-unused-vars */
/**
 * Created by demon on 10/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import {connect}
  from 'react-redux'
import {change}
  from 'redux-form'
import Screen
  from '../../Components/Grow/Article'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {ChildActions}
  from '../../Redux/Reducers/ChildReducer'
import {getUserID, UserActions}
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
    case localActions.CLOSE_ARTICLE:
      dispatch(UserActions.closeArticle(action[COMMON_ENTITIES.NAVIGATOR]))
      break

    default:
      console.log('---- LOCAL ACTION DEFAULT [START] ----')
  }
}

// ========================================================
// REDUX [ Mapping Props & Actions ]
// ========================================================

export const localActions = {
  CLOSE_ARTICLE: 'CLOSE_ARTICLE'
}

const mapStateToProps = (state, props) => {
  return {
    // send local actions for (presentation <--> container)
    localActions: localActions,

    description: 'Teaching math concepts for toddlers can be tricky.  At their age, they are more attracted to colors and shapes rather than counting numbers.  That’s the reason why the power of the building blocks should not be underestimated.\n\nIf you want to teach your child match concepts at this early age, collect all the building blocks available at home.  Group them into colors.  Assign a number for each color.\n\nAsk your child to stack the blocks according to the number pasted on the block.  For example, if number 3 is assigned to yellow blocks, then let your child stack 3 yellow blocks.  Do this with the rest of the blocks.  Simple, isn’t it?\n\nBy playing building blocks, your child can learn not just counting numbers but also basic addition by letting them stack the building blocks on top of each other.'
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
