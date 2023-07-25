/* eslint-disable key-spacing,no-trailing-spaces */
/**
 * Created by viktor on 31/5/17.
 */

export const ENVIRONMENT = {
  DEV_1: 'DEV1',
  UAT_2: 'UAT2',
  PROD: 'PROD',
  TEST_1: 'TEST_1',
  TEST_2: 'TEST_2',
  TEST_3: 'TEST_3'
}

export const getEnvironmentFile = (env) => {
  switch (env) {
    case ENVIRONMENT.DEV_1: return require('../../config/dev1.env.json')
    case ENVIRONMENT.UAT_2: return require('../../config/uat2.env.json')
    case ENVIRONMENT.PROD: return require('../../config/prod.env.json')
    case ENVIRONMENT.TEST_1: return require('../../config/test1.env.json')
    case ENVIRONMENT.TEST_2: return require('../../config/test2.env.json')
    case ENVIRONMENT.TEST_3: return require('../../config/test3.env.json')
    default: return require('../../config/prod.env.json')
  }
}

export const GOAL_TYPES = {
  EDUCATION   : 'EDUCATION',
  HOME_DEPOSIT: 'HOME_DEPOSIT',
  BIRTHDAY    : 'BIRTHDAY',
  CHRISTMAS   : 'CHRISTMAS',
  CUSTOM      : 'CUSTOM'
}

export const API_TYPES = {
  FUNDING_API: 'FUNDING_API',
  ACCOUNT_API: 'ACCOUNT_API',
  TRANSFERS_API: 'TRANSFERS_API',
  LW_READ: 'LW_READ',
  LW_WRITE: 'LW_WRITE',
  USER_POOL_ID: 'USER_POOL_ID',
  CLIENT_ID: 'CLIENT_ID',
  DETAIL_API: 'DETAIL_API',
  STATEMENTS: 'STATEMENTS',
  CONFIRMATIONS: 'CONFIRMATIONS',
  TRANSFER_NOW: 'TRANSFER_NOW'
}

// constants used for form types
// in presentation components
export const FORM_TYPES = {
  // used in 'GoalType' & 'AddGoal' component
  ADD_GOAL    : 'ADD_GOAL',

  // used in 'EditGoal' component
  EDIT_GOAL   : 'EDIT_GOAL',

  // used in 'AddChild'
  ADD_CHILD   : 'ADD_CHILD',

  AUTH       : 'AUTH',

  // user in User Input screens
  ADD_USER    : 'ADD_USER',

  RESET_PASSWORD: 'RESET_PASSWORD',

  EDIT_PROFILE: 'EDIT_PROFILE',

  WITHDRAW: 'WITHDRAW'
}

export const SEGMENT_ACTIONS = {
  USER_SIGNED_UP: 'User Signed Up',
  USER_LOGIN_COGNITO_SUCCESS: 'User Login Cognito Success',
  USER_FETCH_SUCCESS: 'User Fetch Success',
  USER_DETAIL_FETCH_SUCCESS: 'User Detail Fetch Success',

  TERMS_CONDITIONS_ACCEPTED: 'Terms & Condition Accepted',
  PUSH_NOTIFICATION_CONFIRMED: 'Push Notification Confirmed',

  CHILD_ADDED: 'Child Added',
  GOAL_ADDED: 'Goal Added',

  PLAID_CONNECT_SUCCESSFUL: 'Plaid Connect Successful',
  TRANSFER_SUCCESS: 'Transfer Success',
  FUNDING_SOURCE_CONNECTED: 'Funding Source Connected'
}
