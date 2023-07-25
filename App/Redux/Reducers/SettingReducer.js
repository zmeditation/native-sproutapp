/* eslint-disable key-spacing,no-unused-vars,no-multi-spaces,no-trailing-spaces */
/**
 * Created by viktor on 14/8/17.
 */

import { createReducer, createActions }
  from 'reduxsauce'
import Immutable
  from 'seamless-immutable'
import {SETTINGS_ENTITIES, path}
  from '../../Utility/Mapper/Settings'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import PARAMETERS
  from '../ActionParameters'
import PHANTOM from '../../Utility/Phantom'

// ========================================================
// Types & Action Creators
// ========================================================

const {Types, Creators} = createActions({
  // navigate to screen
  // (used in deep link)
  navigateTo            : PARAMETERS.NAVIGATE_TO,

  // user to initiate deep
  // link navigation from
  // settings drawer
  navigateDeep          : PARAMETERS.NAVIGATE_TO,

  // show settings panel
  showSettings           : PARAMETERS.SHOW_SETTINGS,
  // hide settings panel
  hideSettings           : PARAMETERS.HIDE_SETTINGS,

  navigateToProfile      : PARAMETERS.NAVIGATE_TO_PROFILE,

  showRecurringWidget    : PARAMETERS.SHOW_RECURRING_WIDGET,
  showInvestorQuestions  : PARAMETERS.SHOW_INVESTOR_QUESTIONS,

  // reset the password
  changePassword          : PARAMETERS.CHANGE_PASSWORD,
  changePin               : PARAMETERS.CHANGE_PIN,

  processChangePassword   : PARAMETERS.PROCESS_CHANGE_PASSWORD,
  processChangePasswordSuccess : PARAMETERS.PROCESS_CHANGE_PASSWORD_SUCCESS,
  processChangePasswordFailure : PARAMETERS.PROCESS_CHANGE_PASSWORD_FAILURE,

  fetchRecurringData        : PARAMETERS.FETCH_RECURRING_DATA,
  fetchRecurringDataSuccess : PARAMETERS.FETCH_RECURRING_DATA_SUCCESS,
  fetchRecurringDataFailure : PARAMETERS.FETCH_RECURRING_DATA_FAILURE,

  showDocuments           : PARAMETERS.SHOW_DOCUMENTS,
  showDocumentsSuccess    : PARAMETERS.SHOW_DOCUMENTS_SUCCESS,
  showDocumentsFailure    : PARAMETERS.SHOW_DOCUMENTS_FAILURE,

  showConfirmations       : PARAMETERS.SHOW_CONFIRMATIONS,
  showConfirmationsSuccess: PARAMETERS.SHOW_CONFIRMATIONS_SUCCESS,
  showConfirmationsFailure: PARAMETERS.SHOW_CONFIRMATIONS_FAILURE,

  showConfig: PARAMETERS.SHOW_CONFIG,

  viewTransfers           : PARAMETERS.VIEW_TRANSFERS,
  viewTransfersSuccess    : PARAMETERS.VIEW_TRANSFERS_SUCCESS,
  viewTransfersFailure    : PARAMETERS.VIEW_TRANSFERS_FAILURE,
  viewActivity            : PARAMETERS.VIEW_ACTIVITY,

  transferNow             : PARAMETERS.TRANSFER_NOW,

  showWebview             : PARAMETERS.SHOW_WEBVIEW,

  disableError: null
})

export const SettingTypes     = Types
export const SettingActions   = Creators

// ========================================================
// Initial State
// ========================================================

export var INITIAL_STATE = Immutable({})
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(SETTINGS_ENTITIES.IS_OK)(), true)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(SETTINGS_ENTITIES.ERROR)(), undefined)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(SETTINGS_ENTITIES.SHOW_ERROR)(), false)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)

// ========================================================
// Handlers
// ========================================================

const changePassword = (state) => PHANTOM.setIn(state, path(SETTINGS_ENTITIES.PROCESSING)(), SETTINGS_ENTITIES.PROCESSING_CHANGE_PASSWORD)

const changePasswordSuccess = (state) => {
  let s = PHANTOM.setIn(state, path(SETTINGS_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.SHOW_ERROR)(), false)
  return s
}

const changePasswordFailure = (state, action) => {
  console.log('in failure ----:---- ', action)
  let s = PHANTOM.setIn(state, path(SETTINGS_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.ERROR)(), action['error'])
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.SHOW_ERROR)(), true)
  return s
}

const fetchRecurringDataHandler = (state) => PHANTOM.setIn(state, path(SETTINGS_ENTITIES.PROCESSING)(), SETTINGS_ENTITIES.PROCESSING_RECURRING_DATA_FETCH)

const fetchRecurringDataSuccessHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(SETTINGS_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.SHOW_ERROR)(), false)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.RECURRING_DATA)(), action[SETTINGS_ENTITIES.RECURRING_DATA])
  return s
}

const fetchRecurringDataFailureHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(SETTINGS_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.ERROR)(), action['error'])
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.SHOW_ERROR)(), true)
  return s
}

const disableErrorHandler = (state) => PHANTOM.setIn(state, path(SETTINGS_ENTITIES.SHOW_ERROR)(), undefined)

const showDocumentHandler = (state) => PHANTOM.setIn(state, path(SETTINGS_ENTITIES.PROCESSING)(), SETTINGS_ENTITIES.PROCESSING_FETCHING_STATEMENTS)

const showDocumentSuccessHandler = (state, action) => {
  console.log('show doc success, action : ', action)
  let data = action[USER_ENTITIES.USER_DATA]
  let s = PHANTOM.setIn(state, path(SETTINGS_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.SHOW_ERROR)(), false)
  return s
}

const showDocumentFailureHandler = (state, error) => {
  let s = PHANTOM.setIn(state, path(SETTINGS_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.SHOW_ERROR)(), error)
  return s
}

const showConfirmationsHandler = (state) => PHANTOM.setIn(state, path(SETTINGS_ENTITIES.PROCESSING)(), SETTINGS_ENTITIES.PROCESSING_FETCHING_STATEMENTS)

const showConfirmationsSuccessHandler = (state, action) => {
  console.log('show doc success, action : ', action)
  let s = PHANTOM.setIn(state, path(SETTINGS_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.SHOW_ERROR)(), false)
  return s
}

const showConfirmationsFailureHandler = (state, error) => {
  let s = PHANTOM.setIn(state, path(SETTINGS_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(SETTINGS_ENTITIES.SHOW_ERROR)(), error)
  return s
}

// ========================================================
// Reducer Formation & Exports
// ========================================================

export const HANDLERS = {
  [Types.PROCESS_CHANGE_PASSWORD]: changePassword,
  [Types.PROCESS_CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [Types.PROCESS_CHANGE_PASSWORD_FAILURE]: changePasswordFailure,

  [Types.FETCH_RECURRING_DATA]: fetchRecurringDataHandler,
  [Types.FETCH_RECURRING_DATA_SUCCESS]: fetchRecurringDataSuccessHandler,
  [Types.FETCH_RECURRING_DATA_FAILURE]: fetchRecurringDataFailureHandler,

  [Types.DISABLE_ERROR]: disableErrorHandler,

  [Types.SHOW_DOCUMENTS_SUCCESS]: showDocumentSuccessHandler,
  [Types.SHOW_DOCUMENTS_FAILURE]: showDocumentFailureHandler,
  [Types.SHOW_DOCUMENTS]: showDocumentHandler,

  [Types.SHOW_CONFIRMATIONS]: showConfirmationsHandler,
  [Types.SHOW_CONFIRMATIONS_SUCCESS]: showConfirmationsSuccessHandler,
  [Types.SHOW_CONFIRMATIONS_FAILURE]: showConfirmationsFailureHandler
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

// ========================================================
// Selectors
// ========================================================

export const getRootNavigator = (state) => PHANTOM.getIn(state, path(SETTINGS_ENTITIES.ROOT_NAVIGATOR)())

export const isProcessing = (state) => PHANTOM.getIn(state, path(SETTINGS_ENTITIES.PROCESSING)()) !== undefined

export const getError = (state) => PHANTOM.getIn(state, path(SETTINGS_ENTITIES.SHOW_ERROR)()) ? PHANTOM.getIn(state, path(SETTINGS_ENTITIES.ERROR)()) : undefined

export const getRecurringData = (state) => PHANTOM.getIn(state, path(SETTINGS_ENTITIES.RECURRING_DATA)())
