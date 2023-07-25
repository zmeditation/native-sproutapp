/* eslint-disable no-unused-vars,key-spacing,no-multi-spaces,no-trailing-spaces */
/**
 * Created by viktor on 22/6/17.
 */

import { createReducer, createActions }
  from 'reduxsauce'
import Immutable
  from 'seamless-immutable'
import {CHILD_ENTITIES, path}
  from '../../Utility/Mapper/Child'
import {USER_ENTITIES, path as UserPath}
  from '../../Utility/Mapper/User'
import {SettingTypes}
  from './SettingReducer'
import {UserTypes}
  from './UserReducer'
import CHILD_PARAMETERS
  from '../ActionParameters'
import {SEGMENT_ACTIONS}
  from '../../Config/contants'
import {analytics}
  from '../../Config/AppConfig'
import PHANTOM
  from '../../Utility/Phantom'

// ========================================================
// Types & Action Creators
// ========================================================

const {Types, Creators} = createActions({

  // navigate to add new child
  navigateToAddChild: CHILD_PARAMETERS.NAVIGATE_TO_ADD_CHILD,

  showGoal          : CHILD_PARAMETERS.SHOW_GOAL,
  hideGoal          : CHILD_PARAMETERS.HIDE_GOAL,

  // add a new child
  addChild          : CHILD_PARAMETERS.ADD_CHILD,
  addChildSuccess   : CHILD_PARAMETERS.ADD_CHILD_SUCCESS,
  addChildFailure   : CHILD_PARAMETERS.ADD_CHILD_FAILURE,

  showChild         : CHILD_PARAMETERS.SHOW_CHILD,
  popChildView      : CHILD_PARAMETERS.POP_CHILD_VIEW,

  fetchChildrenDetails  : CHILD_PARAMETERS.FETCH_CHILDREN_DETAILS,
  fetchChildrenDetailsSuccess: CHILD_PARAMETERS.FETCH_CHILDREN_DETAILS_SUCCESS,
  fetchChildrenDetailsFailure: CHILD_PARAMETERS.FETCH_CHILDREN_DETAILS_FAILURE,

  fetchChildChartData       : CHILD_PARAMETERS.FETCH_CHILD_CHART_DATA,
  fetchChildChartDataSuccess: CHILD_PARAMETERS.FETCH_CHILD_CHART_DATA_SUCCESS,
  fetchChildChartDataFailure: CHILD_PARAMETERS.FETCH_CHILD_CHART_DATA_FAILURE,

  navigateToChildSsn: CHILD_PARAMETERS.NAVIGATE_TO_CHILD_SSN,
  confirmChildSsn: CHILD_PARAMETERS.NAVIGATE_TO_CHILD_SSN,

  submitChildSSN    : CHILD_PARAMETERS.SUBMIT_CHILD_SSN,

  // initiate adding a new child
  addNewChild       : CHILD_PARAMETERS.ADD_NEW_CHILD,

  // add child's photo
  addAvatar         : CHILD_PARAMETERS.ADD_AVATAR,

  addNewGoal        : CHILD_PARAMETERS.ADD_NEW_GOAL,

  notifyAgeLimitation: CHILD_PARAMETERS.NOTIFY_AGE_LIMITATION
})

export const ChildTypes     = Types
export const ChildActions   = Creators

// ========================================================
// Initial State
// ========================================================

export var INITIAL_STATE = Immutable({})
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(CHILD_ENTITIES.IS_OK)(), true)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(CHILD_ENTITIES.ERROR)(), undefined)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(CHILD_ENTITIES.PROCESSING)(), undefined)

// ========================================================
// Handlers
// ========================================================

const addAvatar = (state, action) => {
  let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.AVATAR)(action[CHILD_ENTITIES.CHILD_ID]), action[CHILD_ENTITIES.AVATAR])
  return s
}

/*
  Add Child Handler.
  This function is called when addChild action is dispatched.

  Store modification :-
  1. Set ADD_CHILD_PROCESSING as true
*/
const addChildHandler = (state, action) => PHANTOM.setIn(state, path(CHILD_ENTITIES.PROCESSING)(), CHILD_ENTITIES.ADD_CHILD_PROCESSING)

const navigateToChildSsnHandler = (state, action) => PHANTOM.setIn(state, path(CHILD_ENTITIES.PROCESSING)(), CHILD_ENTITIES.ADD_CHILD_PROCESSING)

const addChildSuccessHandler = (state, action) => {
  try {
    analytics.track({
      userId: action[USER_ENTITIES.USER_ID],
      event: SEGMENT_ACTIONS.CHILD_ADDED,
      properties: {}
    })

    let payload = PHANTOM.assertActionPayload(action)
    let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.PROCESSING)(), undefined)
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.CHILD_ID)(action[CHILD_ENTITIES.CHILD_ID]), action[CHILD_ENTITIES.CHILD_ID])
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.FIRST_NAME)(action[CHILD_ENTITIES.CHILD_ID]), action[CHILD_ENTITIES.FIRST_NAME])
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.LAST_NAME)(action[CHILD_ENTITIES.CHILD_ID]), action[CHILD_ENTITIES.LAST_NAME])
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.DOB)(action[CHILD_ENTITIES.CHILD_ID]), action[CHILD_ENTITIES.DOB])

    return s
  } catch (err) {
    return state
  }
}

const addChildFailureHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(CHILD_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(CHILD_ENTITIES.PROCESSING)(), undefined)
  return s
}

const fetchUserDetailSuccessHandler = (state, action) => {
  try {
    PHANTOM.assertActionPayload(action)

    // set state of children data as OK
    let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.PROCESSING)(), undefined)

    // de-refer 'sproutDetail'
    let detailArray = action[CHILD_ENTITIES.CHILD_DETAIL_DATA]['sprouts_detail']

    // for each child add it's information
    detailArray.map(sprout => {
      let childID = sprout['sprout_id']
      let portfolio = sprout['portfolio']
      if (portfolio) {
        s = PHANTOM.setIn(s, path(CHILD_ENTITIES.CURRENT_VALUE)(childID), portfolio['current_value'])
        s = PHANTOM.setIn(s, path(CHILD_ENTITIES.GROWTH_IN_PERCENTAGE)(childID), portfolio['growth_in_percentage'])
        s = PHANTOM.setIn(s, path(CHILD_ENTITIES.GROWTH_IN_VALUE)(childID), portfolio['growth_in_value'])
        s = PHANTOM.setIn(s, path(CHILD_ENTITIES.TOTAL_CONTRIBUTIONS)(childID), portfolio['total_contributions'])
      }
    })
    return s
  } catch (err) {
    console.warn('CHILD REDUCER [FETCH_USER_DETAIL_SUCCESS] ERROR : ', err)
    return state
  }
}

const fetchUserSuccessHandler = (state, action) => {
  try {
    // set state of children data as OK
    let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(CHILD_ENTITIES.PROCESSING)(), undefined)

    let u = action[USER_ENTITIES.USER_DATA]['user'][0]
    let sprouts = (u && u['sprout']) || []

    sprouts.map(sprout => {
      let childID = sprout['sprout_id']
      s = PHANTOM.setIn(s, path(CHILD_ENTITIES.CHILD_ID_INDEX)(childID), childID)
      s = PHANTOM.setIn(s, path(CHILD_ENTITIES.CHILD_ID)(childID), childID)
      s = PHANTOM.setIn(s, path(CHILD_ENTITIES.FIRST_NAME)(childID), sprout['first_name'])
      s = PHANTOM.setIn(s, path(CHILD_ENTITIES.LAST_NAME)(childID), sprout['last_name'])
      s = PHANTOM.setIn(s, path(CHILD_ENTITIES.DOB)(childID), sprout['date_of_birth'])
    })
    return s
  } catch (err) {
    console.warn('CHILD REDUCER [FETCH_USER_SUCCESS] ERROR : ', err)
    return state
  }
}

const documentFetchingSuccess = (state, action) => {
  try {
    let d = action[USER_ENTITIES.USER_DATA]['data']
    let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.IS_OK)(), true)
    for (var i = 0; i < d.length; i++) {
      let ch = d[i]
      let newPath = path(CHILD_ENTITIES.STATEMENTS)(ch['sprout_id'])
      let statement = ch['statements']
      s = PHANTOM.setIn(s, newPath, statement)
    }
    return s
  } catch (err) {
    return state
  }
}

const fetchChildChartDataHandler = (state, action) => PHANTOM.setIn(state, path(CHILD_ENTITIES.PROCESSING)(), CHILD_ENTITIES.FETCH_CHART_DATA_PROCESSING)

const fetchChildChartDataSuccessHandler = (state, action) => {
  let childID = action[CHILD_ENTITIES.CHILD_ID]
  let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(CHILD_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(CHILD_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(CHILD_ENTITIES.CHART_DATA)(childID), action[CHILD_ENTITIES.CHART_DATA])
  return s
}

const showDocumentSuccessHandler = (state, action) => {
  let data = action[USER_ENTITIES.USER_DATA]
  let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.IS_OK)(), true)
  for (var i = 0; i < data.length; i++) {
    let ch = data[i]
    let newPath = path(CHILD_ENTITIES.STATEMENTS)(ch['sprout_id'])
    let statements = ch['statements']
    s = PHANTOM.setIn(s, newPath, statements)
  }
  return s
}

const showConfirmationsSuccessHandler = (state, action) => {
  let data = action[USER_ENTITIES.USER_DATA]
  let s = PHANTOM.setIn(state, path(CHILD_ENTITIES.IS_OK)(), true)
  for (var i = 0; i < data.length; i++) {
    let ch = data[i]
    let newPath = path(CHILD_ENTITIES.CONFIRMATIONS)(ch['sprout_id'])
    let confirmations = ch['confirmations']
    s = PHANTOM.setIn(s, newPath, confirmations)
  }
  return s
}

// ========================================================
// Reducer Formation & Exports
// ========================================================

export const HANDLERS = {

  [Types.ADD_AVATAR]: addAvatar,

  [Types.ADD_CHILD]: addChildHandler,
  [Types.ADD_CHILD_SUCCESS]: addChildSuccessHandler,
  [Types.ADD_CHILD_FAILURE]: addChildFailureHandler,

  [Types.SUBMIT_SSN]: navigateToChildSsnHandler,

  [UserTypes.FETCH_USER_SUCCESS]: fetchUserSuccessHandler,
  [UserTypes.FETCH_USER_DETAIL_SUCCESS]: fetchUserDetailSuccessHandler,

  [SettingTypes.SHOW_DOCUMENTS_SUCCESS]: showDocumentSuccessHandler,

  [SettingTypes.SHOW_CONFIRMATIONS_SUCCESS]: showConfirmationsSuccessHandler,

  [Types.FETCH_CHILD_CHART_DATA]: fetchChildChartDataHandler,
  [Types.FETCH_CHILD_CHART_DATA_SUCCESS]: fetchChildChartDataSuccessHandler

}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

// ========================================================
// Selectors
// ========================================================

export const getAvatar = (state, childID) => {
  let avatar = PHANTOM.getIn(state, path(CHILD_ENTITIES.AVATAR)(childID))
  return avatar || PHANTOM.getIn(state, path(CHILD_ENTITIES.AVATAR)(undefined))
}

export const isProcessing = (state) => PHANTOM.getIn(state, path(CHILD_ENTITIES.PROCESSING)()) !== undefined

export const getFirstName = (state, childID) => PHANTOM.getIn(state, path(CHILD_ENTITIES.FIRST_NAME)(childID))

export const getDOB = (state, childID) => PHANTOM.getIn(state, path(CHILD_ENTITIES.DOB)(childID))

export const getChildren = (state) => {
  let result = PHANTOM.getIn(state, path(CHILD_ENTITIES.LIST_INDEX)())
  return result
}

export const getTotalPortfolioValue = (state) => {
  let children = PHANTOM.getIn(state, path(CHILD_ENTITIES.LIST_INDEX)())

  let totalValue = 0
  if (children) {
    Object.values(children).map(child => {
      let p = child[CHILD_ENTITIES.PORTFOLIO]
      if (p && p[CHILD_ENTITIES.CURRENT_VALUE]) {
        let cValue = p[CHILD_ENTITIES.CURRENT_VALUE]
        cValue && (totalValue += parseFloat(cValue))
      }
    })
  }

  return totalValue
}

export const getTotalContributions = (state) => {
  let children = PHANTOM.getIn(state, path(CHILD_ENTITIES.LIST_INDEX)())

  let totalValue = 0

  if (children) {
    Object.values(children).map(child => {
      let p = child[CHILD_ENTITIES.PORTFOLIO]
      if (p && p[CHILD_ENTITIES.TOTAL_CONTRIBUTIONS]) {
        let cValue = p[CHILD_ENTITIES.TOTAL_CONTRIBUTIONS]
        cValue && (totalValue += parseFloat(cValue))
      }
    })
  }

  return totalValue
}

export const getFamilyGrowth = (state) => {
  let children = PHANTOM.getIn(state, path(CHILD_ENTITIES.LIST_INDEX)())

  let totalValue = 0
  let totalContribution = 0

  if (children) {
    Object.values(children).map(child => {
      let p = child[CHILD_ENTITIES.PORTFOLIO]
      if (p && p[CHILD_ENTITIES.CURRENT_VALUE]) {
        let cValue = p[CHILD_ENTITIES.CURRENT_VALUE]
        cValue && (totalValue += parseFloat(cValue))
      }
      if (p && p[CHILD_ENTITIES.TOTAL_CONTRIBUTIONS]) {
        let cValue = p[CHILD_ENTITIES.TOTAL_CONTRIBUTIONS]
        cValue && (totalContribution += parseFloat(cValue))
      }
    })
  }

  let growthValue = parseFloat(totalValue - totalContribution).toFixed(2)
  let growthPercentage = ((totalContribution !== 0) && parseFloat(((totalValue - totalContribution) / totalContribution) * 100).toFixed(2)) || 0

  return {[CHILD_ENTITIES.GROWTH_IN_VALUE]: growthValue, [CHILD_ENTITIES.GROWTH_IN_PERCENTAGE]: growthPercentage}
}

export const getStatements = (state, childID) => PHANTOM.getIn(state, path(CHILD_ENTITIES.STATEMENTS)(childID))

export const getConfirmations = (state, childID) => PHANTOM.getIn(state, path(CHILD_ENTITIES.CONFIRMATIONS)(childID))

export const getPortfolioDetail = (state, childID) => {
  let x = PHANTOM.getIn(state, path(CHILD_ENTITIES.PORTFOLIO)(childID))
  return x
}
