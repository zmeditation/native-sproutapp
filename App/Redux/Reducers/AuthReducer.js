/* eslint-disable no-unused-vars,key-spacing,no-multi-spaces,no-trailing-spaces,no-multiple-empty-lines */
/**
 * Created by viktor on 12/7/17.
 */

import { createReducer, createActions }
  from 'reduxsauce'
import Immutable
  from 'seamless-immutable'
import {AUTH_ENTITIES, path}
  from '../../Utility/Mapper/Auth'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import PARAMETERS
  from '../ActionParameters'
import PHANTOM
  from '../../Utility/Phantom'
import {UserTypes}
  from './UserReducer'

// ========================================================
// Types & Action Creators
// ========================================================

const {Types, Creators} = createActions({

  // add a new child
  navigate          : PARAMETERS.NAVIGATE_AUTH,
  // login user
  login             : PARAMETERS.LOGIN,
  // login user success
  loginSuccess      : PARAMETERS.LOGIN_SUCCESS,
  // login failed
  loginFailure      : PARAMETERS.LOGIN_FAILURE,

  // logout
  logout            : PARAMETERS.LOGOUT,
  // logout success
  logoutSuccess     : PARAMETERS.LOGOUT,
  // logout failure
  logoutFailure     : PARAMETERS.LOGOUT,

  promptAuth        : PARAMETERS.PROMPT_AUTH,

  passcodeLogin     : PARAMETERS.PASSCODE_LOGIN,

  startLogin        : null,

  showTouchId       : PARAMETERS.SHOW_TOUCH_ID,
  hideTouchId       : PARAMETERS.HIDE_TOUCH_ID,

  signup            : PARAMETERS.SIGNUP,
  signupSuccess     : PARAMETERS.SIGNUP_SUCCESS,
  signupFailure     : PARAMETERS.SIGNUP_FAILURE,

  fetchPin          : null,
  fetchPinSuccess   : PARAMETERS.FETCH_PIN_SUCCESS,
  fetchPinFailure   : null,

  registerPin       : PARAMETERS.REGISTER_PIN,
  registerPinSuccess: PARAMETERS.REGISTER_PIN_SUCCESS,
  registerPinFailure: PARAMETERS.REGISTER_PIN_FAILURE,

  disableError      : null
})

export const AuthTypes     = Types
export const AuthActions   = Creators

// ========================================================
// Initial State
// ========================================================

export var INITIAL_STATE = Immutable({})
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(AUTH_ENTITIES.IS_OK)(), true)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(AUTH_ENTITIES.ERROR)(), undefined)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(AUTH_ENTITIES.SHOW_ERROR)(), false)
INITIAL_STATE = PHANTOM.setIn(INITIAL_STATE, path(AUTH_ENTITIES.PROCESSING)(), undefined)

// ========================================================
// Handlers
// ========================================================

/*
 Login Handler.
 This function is called when login action is dispatched.

 Store modification :-
 1. Set PROCESSING_LOGIN as true
 */
const loginHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.PROCESSING)(), AUTH_ENTITIES.PROCESSING_LOGIN)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), false)
  return s
}

const loginSuccessHandler = (state, action) => {
  console.log('***---- login success handled ----***', action)
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.ID_TOKEN)(), action[AUTH_ENTITIES.ID_TOKEN])
  return s
}

const loginFailureHandler = (state, {error}) => {
  // console.log('')
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.ERROR)(), error)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), true)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}

const signupHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.PROCESSING)(), AUTH_ENTITIES.PROCESSING_SIGNUP)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), false)
  return s
}

const signupSuccessHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), false)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}

const signupFailureHandler = (state, {error}) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.ERROR)(), error)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), true)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}

const fetchUserDetailHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.PROCESSING)(), USER_ENTITIES.PROCESSING_USER_DETAIL_FETCH)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), false)
  return s
}

const fetchUserDetailSuccessHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), false)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}

const fetchUserDetailFailureHandler = (state, error) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.ERROR)(), error)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), true)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}

const fetchUserHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.PROCESSING)(), USER_ENTITIES.PROCESSING_FETCH_USER)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), false)
  return s
}

const fetchUserSuccessHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.IS_OK)(), true)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.ERROR)(), undefined)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), false)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}


const fetchUserFailureHandler = (state, error) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.IS_OK)(), false)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.ERROR)(), error)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.SHOW_ERROR)(), true)
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}

const disableError = (state) => PHANTOM.setIn(state, path(AUTH_ENTITIES.SHOW_ERROR)(), false)

const fetchPinHandler = (state) => {
  return PHANTOM.setIn(state, path(AUTH_ENTITIES.PROCESSING)(), AUTH_ENTITIES.PROCESSING_FETCH_PIN)
}

const fetchPinSuccessHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.PIN)(), action[AUTH_ENTITIES.PIN])
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}

const fetchPinFailureHandler = (state, action) => {
  return PHANTOM.setIn(state, path(AUTH_ENTITIES.PROCESSING)(), undefined)
}

const registerPinSuccessHandler = (state, action) => {
  let s = PHANTOM.setIn(state, path(AUTH_ENTITIES.PIN)(), action[AUTH_ENTITIES.PIN])
  s = PHANTOM.setIn(s, path(AUTH_ENTITIES.PROCESSING)(), undefined)
  return s
}

// ========================================================
// Reducer Formation & Exports
// ========================================================

export const HANDLERS = {

  [Types.LOGIN]: loginHandler,
  [Types.LOGIN_SUCCESS]: loginSuccessHandler,
  [Types.LOGIN_FAILURE]: loginFailureHandler,

  [Types.SIGNUP]: signupHandler,
  [Types.SIGNUP_SUCCESS]: signupSuccessHandler,
  [Types.SIGNUP_FAILURE]: signupFailureHandler,

  // [UserTypes.FETCH_USER_DETAIL]: fetchUserDetailHandler,
  [UserTypes.FETCH_USER_DETAIL_SUCCESS]: fetchUserDetailSuccessHandler,
  [UserTypes.FETCH_USER_DETAIL_FAILURE]: fetchUserDetailFailureHandler,

  // [UserTypes.FETCH_USER]: fetchUserHandler,
  // [UserTypes.FETCH_USER_SUCCESS]: fetchUserSuccessHandler,
  [UserTypes.FETCH_USER_FAILURE]: fetchUserFailureHandler,
  [Types.DISABLE_ERROR]: disableError,

  [Types.FETCH_PIN_SUCCESS]: fetchPinSuccessHandler,
  [Types.FETCH_PIN]: fetchPinHandler,
  [Types.FETCH_PIN_FAILURE]: fetchPinFailureHandler,

  [Types.REGISTER_PIN_SUCCESS]: registerPinSuccessHandler
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

// ========================================================
// Selectors
// ========================================================

export const isProcessing = (state) => PHANTOM.getIn(state, path(AUTH_ENTITIES.PROCESSING)()) !== undefined

export const getError = (state) => PHANTOM.getIn(state, path(AUTH_ENTITIES.SHOW_ERROR)()) ? PHANTOM.getIn(state, path(AUTH_ENTITIES.ERROR)()) : undefined

export const getPIN = (state) => PHANTOM.getIn(state, path(AUTH_ENTITIES.PIN)())

export const getIDToken = (state) => {
  return PHANTOM.getIn(state, path(AUTH_ENTITIES.ID_TOKEN)())
}
