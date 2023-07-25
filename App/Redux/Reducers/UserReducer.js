/* eslint-disable no-multi-spaces,key-spacing,no-trailing-spaces */
/**
 * Created by viktor on 14/7/17.
 */

import { createReducer, createActions }
  from 'reduxsauce'
import Immutable
  from 'seamless-immutable'
import {USER_ENTITIES, path}
  from '../../Utility/Mapper/User'
import PARAMETERS
  from '../ActionParameters'
import {convertDateToRequestFormat}
  from '../../Utility/Transforms/Converter'
import PHANTOM
  from '../../Utility/Phantom'

// ========================================================
// Types & Action Creators
// ========================================================

const {Types, Creators} = createActions({

  // add a new child
  fetchUser         : PARAMETERS.FETCH_USER,
  // fetch user successfully
  fetchUserSuccess  : PARAMETERS.FETCH_USER_SUCCESS,
  // fetching user failed
  fetchUserFailure : PARAMETERS.FETCH_USER_FAILURE,

  // fetch user details
  fetchUserDetail   : PARAMETERS.FETCH_USER_DETAIL,
  fetchUserDetailSuccess : PARAMETERS.FETCH_USER_DETAIL_SUCCESS,
  fetchUserDetailFailure : PARAMETERS.FETCH_USER_DETAIL_FAILURE,

  // navigate to provided user detail input screen
  // during onboarding process
  navigateUserDetailInput: PARAMETERS.NAVIGATE_USER_DETAIL_INPUT,

  // store user identity check data
  identityCheckComplete: PARAMETERS.IDENTITY_CHECK_COMPLETE,

  // set user ID
  setUserId         : PARAMETERS.SET_USER_ID,
  setUsername       : PARAMETERS.SET_USERNAME,

  setPasscode       : PARAMETERS.SET_PASSCODE,

  // initiate PLAID window
  initiatePlaid     : PARAMETERS.INITIATE_PLAID,
  // dismiss PLAID window
  dismissPlaid      : PARAMETERS.DISMISS_PLAID,
  // plaid linked by widget
  plaidLinked       : PARAMETERS.PLAID_LINKED,
  // plaid linking success response from server
  plaidLinkedSuccess: PARAMETERS.PLAID_LINKED_SUCCESS,
  // plaid linking failure
  plaidLinkedFailure: PARAMETERS.PLAID_LINKED_FAILURE,

  navigateTodo: PARAMETERS.NAVIGATE_TODO,

  openArticle: PARAMETERS.OPEN_ARTICLE,
  closeArticle: PARAMETERS.CLOSE_ARTICLE,

  navigateTc: PARAMETERS.NAVIGATE_TC,
  agreeTc: PARAMETERS.AGREE_TC,
  disagreeTC: PARAMETERS.DISAGREE_TC,
  closeTc: PARAMETERS.NAVIGATE_TC
})

export const UserTypes     = Types
export const UserActions   = Creators

// ========================================================
// Initial State
// ========================================================

/*
 Initial State of the Child reducer.

 children : {

 sanity : {
 OK,
 ERROR,
 PROCESSING
 },

 [CHILD_ID] : {
 info : { }
 }

 }

 */
export var INITIAL_STATE = Immutable({})
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(USER_ENTITIES.IS_OK)(), true)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(USER_ENTITIES.ERROR)(), undefined)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(USER_ENTITIES.PROCESSING)(), undefined)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(USER_ENTITIES.IS_PLAID_LINKED)(), false)

// ========================================================
// Handlers
// ========================================================

/*
 Login Handler.
 This function is called when login action is dispatched.

 Store modification :-
 1. Set PROCESSING_LOGIN as true
 */
const fetchUserHandler = (state, action) => {
  return PHANTOM.setIn(state, path(USER_ENTITIES.PROCESSING)(), USER_ENTITIES.PROCESSING_FETCH_USER)
}

const fetchUserSuccessHandler = (state, action) => {
  try {
    PHANTOM.assertActionPayload(action)
    let todoList = action[USER_ENTITIES.TODO_LIST]

    let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)

    let u = action[USER_ENTITIES.USER_DATA]['user'][0]
    s = PHANTOM.setIn(s, path(USER_ENTITIES.USER_ID)(), action[USER_ENTITIES.USER_ID])
    s = PHANTOM.setIn(s, path(USER_ENTITIES.FIRST_NAME)(), u['first_name'])
    s = PHANTOM.setIn(s, path(USER_ENTITIES.LAST_NAME)(), u['last_name'])
    s = PHANTOM.setIn(s, path(USER_ENTITIES.EMAIL_ID)(), u['email'])
    s = PHANTOM.setIn(s, path(USER_ENTITIES.CURRENT_FUNDING_SOURCE_ID)(), u['current_funding_source_id'])
    s = PHANTOM.setIn(s, path(USER_ENTITIES.CURRENT_FUNDING_SOURCE_STATUS)(), u['current_funding_source_status'])

    let todoInjection = {
      1: {
        title: 'Complete profile',
        screen: null,
        status: USER_ENTITIES.TODO_PENDING,
        image: '../../../Img/icons/completeProfile.png'
      }
    }
    let i = 3
    todoList.map(todo => { todoInjection[i++] = todo })
    s = PHANTOM.setIn(s, path(USER_ENTITIES.TODO_LIST)(), todoInjection)
    return s
  } catch (err) {
    console.warn('USER REDUCER [FETCH_USER_SUCCESS] ERROR : ', err)
    return state
  }
}

const fetchUserFailureHandler = (state, error) => {
  try {
    let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), false)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), error)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)
    return s
  } catch (err) {
    console.log('error in user reducer fetch user failure handler :: ', err)
    return state
  }
}

const fetchUserDetailHandler = (state, action) => {
  return PHANTOM.setIn(state, path(USER_ENTITIES.PROCESSING)(), USER_ENTITIES.PROCESSING_FETCH_USER)
}

const fetchUserDetailSuccessHandler = (state, action) => {
  try {
    let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)
    return s
  } catch (err) {
    console.log('error in user reducer fetch user failure handler :: ', err)
    return state
  }
}

const fetchUserDetailFailureHandler = (state, error) => {
  try {
    let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), false)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), error)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)
    return s
  } catch (err) {
    console.log('error in user reducer fetch user failure handler :: ', err)
    return state
  }
}

const setUserID = (state, action) => {
  try {
    PHANTOM.assertActionPayload(action)
    let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), true)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), undefined)
    s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)

    s = PHANTOM.setIn(s, path(USER_ENTITIES.USER_ID)(), action[USER_ENTITIES.USER_ID])
    s = PHANTOM.setIn(s, path(USER_ENTITIES.EMAIL_ID)(), action[USER_ENTITIES.EMAIL_ID])
    return s
  } catch (err) {
    return state
  }
}

const setUsernameHandler = (state, action) => PHANTOM.setIn(state, path(USER_ENTITIES.EMAIL_ID)(), action[USER_ENTITIES.EMAIL_ID])

const identityCheckComplete = (state, action) => {
  try {
    PHANTOM.assertActionPayload(action)
    let idData = action[USER_ENTITIES.IDENTITY_DATA]

    let DOB = idData[USER_ENTITIES.DOB]
    let modifiedDOB = DOB ? convertDateToRequestFormat(DOB) : DOB

    let visaExpiry = idData[USER_ENTITIES.VISA_EXPIRY]
    let modifiedVisaExpiry = visaExpiry ? convertDateToRequestFormat(visaExpiry) : visaExpiry
    modifiedDOB && (idData[USER_ENTITIES.DOB] = modifiedDOB)
    modifiedVisaExpiry && (idData[USER_ENTITIES.VISA_EXPIRY] = modifiedVisaExpiry)

    // console.log('identity check data :: ', idData, '\n :: ', modifiedDOB, '\n :: ', modifiedVisaExpiry)
    let s = PHANTOM.setIn(state, path(USER_ENTITIES.IDENTITY_DATA)(), action[USER_ENTITIES.IDENTITY_DATA])
    return s
  } catch (err) {
    console.warn('USER REDUCER [STORE ID CHECK DATA ] : ', err)
  }
}

const plaidLinkedHandler = (state, action) => {
  return PHANTOM.setIn(state, path(USER_ENTITIES.PROCESSING)(), USER_ENTITIES.PROCESSING_FETCH_USER)
}

const plaidLinkedSuccessHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)
  s = PHANTOM.setIn(s, path(USER_ENTITIES.IS_PLAID_LINKED)(), true)
  return s
}

const plaidLinkedFailureHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), 'plaid linking error')
  s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)
  return s
}

const transferSuccessHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)
  return s
}

const transferFailureHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(USER_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(USER_ENTITIES.ERROR)(), 'transfer failure error')
  s = PHANTOM.setIn(s, path(USER_ENTITIES.PROCESSING)(), undefined)
  return s
}

// ========================================================
// Reducer Formation & Exports
// ========================================================

export const HANDLERS = {

  [Types.FETCH_USER]: fetchUserHandler,
  [Types.FETCH_USER_SUCCESS]: fetchUserSuccessHandler,
  [Types.FETCH_USER_FAILURE]: fetchUserFailureHandler,

  [Types.FETCH_USER_DETAIL]: fetchUserDetailHandler,
  [Types.FETCH_USER_DETAIL_SUCCESS]: fetchUserDetailSuccessHandler,
  [Types.FETCH_USER_DETAIL_FAILURE]: fetchUserDetailFailureHandler,

  'SIGNUP_SUCCESS': setUserID,
  'SHOW_INVEST': transferSuccessHandler,
  'TRANSFER_SUCCESS': transferSuccessHandler,
  'TRANSFER_FAILURE': transferFailureHandler,

  [Types.IDENTITY_CHECK_COMPLETE]: identityCheckComplete,

  [Types.SET_USER_ID]: setUserID,
  [Types.SET_USERNAME]: setUsernameHandler,

  [Types.PLAID_LINKED]: plaidLinkedHandler,
  [Types.PLAID_LINKED_SUCCESS]: plaidLinkedSuccessHandler,
  [Types.PLAID_LINKED_FAILURE]: plaidLinkedFailureHandler
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

// ========================================================
// Selectors
// ========================================================

export const isUserProcessing = (state) => {
  return PHANTOM.getIn(state, path(USER_ENTITIES.PROCESSING)()) !== undefined
}

export const getUserID = (state) => {
  return PHANTOM.getIn(state, path(USER_ENTITIES.USER_ID)())
}

export const getFirstName = (state) => {
  return PHANTOM.getIn(state, path(USER_ENTITIES.FIRST_NAME)())
}

export const getLastName = (state) => {
  return PHANTOM.getIn(state, path(USER_ENTITIES.LAST_NAME)())
}

export const getIdentityData = (state) => PHANTOM.getIn(state, path(USER_ENTITIES.IDENTITY_DATA)())

export const getUserEmail = (state) => {
  let r = PHANTOM.getIn(state, path(USER_ENTITIES.EMAIL_ID)())
  return r
}

export const isFundingSourceLinked = (state) => {
  let a = PHANTOM.getIn(state, path(USER_ENTITIES.CURRENT_FUNDING_SOURCE_ID)()) !== undefined
  let b
  if (!a) {
    b = PHANTOM.getIn(state, path(USER_ENTITIES.IS_PLAID_LINKED)())
    return b
  } else {
    return a
  }
}

export const getFundingSourceID = (state) => PHANTOM.get(state, path(USER_ENTITIES.CURRENT_FUNDING_SOURCE_ID)())

export const getFundingSourceStatus = (state) => PHANTOM.getIn(state, path(USER_ENTITIES.CURRENT_FUNDING_SOURCE_STATUS)())

export const getTodoList = (state) => PHANTOM.getIn(state, path(USER_ENTITIES.TODO_LIST)())
