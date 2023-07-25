/* eslint-disable no-unused-vars,no-trailing-spaces,no-multiple-empty-lines,padded-blocks,handle-callback-err */
/**
 * Created by viktor on 14/7/17.
 */

// ========================================================
// Import packages
// ========================================================

import {put, call}
  from 'redux-saga/effects'
import {AsyncStorage}
  from 'react-native'
import {AuthActions}
  from '../Redux/Reducers/AuthReducer'
import {UserActions}
  from '../Redux/Reducers/UserReducer'
import {SettingActions}
  from '../Redux/Reducers/SettingReducer'
import PHANTOM
  from '../Utility/Phantom'
import {encodePasscode, encodeCredentials, decodeCredentials, getCredentialLocalKey}
  from '../Utility/Transforms/Converter'
import jwt
  from 'jwt-decode'
import {AUTH_ENTITIES, PIN_ACTION_TYPE}
  from '../Utility/Mapper/Auth'
import {USER_ENTITIES}
  from '../Utility/Mapper/User'
import {SPROUT}
  from '../Utility/Mapper/Screens'
import {COMMON_ENTITIES}
  from '../Utility/Mapper/Common'
import DB_ATTRIBUTES
  from '../Utility/Mapper/LocalDB'
import AWS, {AuthCredentials, userPool, analytics}
  from '../Config/AppConfig'
import {SEGMENT_ACTIONS}
  from '../Config/contants'
import {
  CognitoUserAttribute,
  CognitoUserPool
} from '../Lib/aws-cognito-identity'

// ========================================================
// Utility Functions
// ========================================================

const loginEffect = (username, password) => {
  try {
    let credentialKey = getCredentialLocalKey(username)
    let credentialCode = encodeCredentials(username, password)
    AsyncStorage.multiSet([[DB_ATTRIBUTES.LOGGED_IN_USERNAME, username], [credentialKey, credentialCode]], (err) => {
      if (err) {
        console.log('error : ', err)
      }
    })
  } catch (err) {
    console.log('error while registering pin : ', err)
  }
}

const logoutEffect = () => {
  try {
    AsyncStorage.setItem(DB_ATTRIBUTES.LOGGED_IN_USERNAME, 'undefined')
  } catch (err) {
    console.log('error while logging out user : ', err)
  }
}

async function injectIDToken (idToken) {
  try {
    await AsyncStorage.setItem(AUTH_ENTITIES.ID_TOKEN, idToken)
  } catch (err) {
    console.log('error in id token storage :: ', err)
  }
}

// ========================================================
// Sagas
// ========================================================

export function * login (action) {
  const username = action[AUTH_ENTITIES.EMAIL]
  const password = action[AUTH_ENTITIES.PASSWORD]
  const authenticationData = { Username: username, Password: password }
  const authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)
  const userData = { Username: username, Pool: userPool }
  const cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData)
  cognitoUser.authenticateUser(authenticationDetails, {

    onSuccess: async function (p1) {
      let idToken = p1.idToken.jwtToken
      let token = jwt(idToken)
      let userID = token['sub']

      let helpingSignup = action[AUTH_ENTITIES.HELPING_SIGNUP]
      console.log('-- cognito login success :: ', p1)
      // enable passcode & store username
      loginEffect(username, password)
      // store ID Token
      await injectIDToken(idToken)

      // emit events
      if (helpingSignup) {

        analytics.identify({
          userId: userID,
          traits: {
          }
        })
        analytics.track({
          userId: userID,
          event: SEGMENT_ACTIONS.USER_SIGNED_UP,
          properties: {}
        })
        action[COMMON_ENTITIES.DISPATCH](AuthActions.signupSuccess(userID, action[COMMON_ENTITIES.NAVIGATOR], username))

      } else {

        analytics.identify({
          userId: userID,
          traits: {}
        })
        analytics.track({
          userId: userID,
          event: SEGMENT_ACTIONS.USER_LOGIN_COGNITO_SUCCESS,
          properties: {}
        })
        action[COMMON_ENTITIES.DISPATCH](UserActions.fetchUser(userID, action[COMMON_ENTITIES.NAVIGATOR], action[COMMON_ENTITIES.DISPATCH]))

      }

      // dispatch successfull congnito response
      action[COMMON_ENTITIES.DISPATCH](AuthActions.loginSuccess(idToken))
    },

    onFailure: (err) => {
      let error = {
        status: '402',
        code: 'Login Error',
        message: err.message
      }
      console.log('failur __ :: ', err)

      // dispatch failure in congnito response
      action[COMMON_ENTITIES.DISPATCH](AuthActions.loginFailure(error))
    }
  })
}

export function * signup (action) {
  let username = action[AUTH_ENTITIES.EMAIL]
  let password = action[AUTH_ENTITIES.PASSWORD]

  const userPool = new CognitoUserPool(AuthCredentials)
  const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: username })]
  userPool.signUp(
    username,
    password,
    attributeList,
    null,
    (err, result) => {
      if (err) {
        let error = {
          status: '402',
          code: 'Signup Error',
          message: err.message
        }
        console.log('error found : ', err)
        action[COMMON_ENTITIES.DISPATCH](AuthActions.signupFailure(error))
        return
      }
      action[COMMON_ENTITIES.DISPATCH](AuthActions.login(action[AUTH_ENTITIES.EMAIL], action[AUTH_ENTITIES.PASSWORD], action[COMMON_ENTITIES.NAVIGATOR], action[COMMON_ENTITIES.DISPATCH], true))
    }
  )
}

export function * logout (action) {
  let isPasscodeLogout = action[AUTH_ENTITIES.IS_PASSCODE_LOGOUT]

  logoutEffect()
  if (isPasscodeLogout) {
    yield put(AuthActions.promptAuth(action[COMMON_ENTITIES.NAVIGATOR]))
  } else {
    yield put(SettingActions.navigateDeep(SPROUT.AUTH_SELECTOR_SCREEN, action[COMMON_ENTITIES.NAVIGATOR]))
  }
}

export function * passcodeLogin (action) {
  let username = action[USER_ENTITIES.EMAIL_ID]
  let navigator = action[COMMON_ENTITIES.NAVIGATOR]
  let dispatch = action[COMMON_ENTITIES.DISPATCH]

  try {
    AsyncStorage.getItem(getCredentialLocalKey(username), (err, result) => {
      if (err) {
        console.log('error in passcode credential retrieval : ', err)
      }
      const credentials = decodeCredentials(result)
      // console.log('-- got passcode crdentials : ', result, credentials)
      dispatch(AuthActions.login(credentials[AUTH_ENTITIES.EMAIL], credentials[AUTH_ENTITIES.PASSWORD], action[COMMON_ENTITIES.NAVIGATOR], dispatch, false))
    })
  } catch (error) {
    console.log('error in passcode credential retrieval : ', error)
  }
}

export function * registerPIN (action) {

  let response
  let pin = action[AUTH_ENTITIES.PIN]
  let username = action[USER_ENTITIES.EMAIL_ID]
  let pinActionType = action[AUTH_ENTITIES.PIN_ACTION_TYPE]
  let navigator = action[COMMON_ENTITIES.NAVIGATOR]
  let dispatch = action[COMMON_ENTITIES.DISPATCH]
  try {
    let passcode = encodePasscode(username, pin)
    AsyncStorage.setItem(username, passcode, () => {
      AsyncStorage.getItem(username, obj => console.log('::: ', obj))
      dispatch && dispatch(AuthActions.registerPinSuccess(pinActionType, navigator, pin))
    })
  } catch (err) {
    console.log('error while registering pin : ', err)
  }
}

export function * changePassword (action) {
  const oldPassword = action[AUTH_ENTITIES.PASSWORD]
  const newPassword = action[AUTH_ENTITIES.NEW_PASSWORD]
  let dispatch = action[COMMON_ENTITIES.DISPATCH]
  let navigator = action[COMMON_ENTITIES.NAVIGATOR]

  var authenticationData = {
    Username: action[AUTH_ENTITIES.EMAIL],
    Password: action[AUTH_ENTITIES.PASSWORD]
  }
  var authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)
  var userData = {Username: authenticationData.Username, Pool: userPool}

  var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData)

  let error = {
    status: '402',
    code: 'Change Password Error'
  }

  // get current session
  cognitoUser.getSession((err, session) => {
    if (err) {
      console.log('--couldnt get session: change password failed--')
      error.message = err.message
      dispatch(SettingActions.processChangePasswordFailure(error))
      return
    }
    cognitoUser.changePassword(oldPassword, newPassword, function (err, result) {
      if (err) {
        console.log('--change password error--', err)
        error.message = err.message
        dispatch(SettingActions.processChangePasswordFailure(error))
        return
      }
      if (result === 'SUCCESS') {
        dispatch(SettingActions.processChangePasswordSuccess(navigator))
        loginEffect(authenticationData.Username, newPassword)
      }
    })
  })
}
