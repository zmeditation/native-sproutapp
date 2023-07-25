/* eslint-disable space-infix-ops */
// Simple React Native specific changes

// ------------------------------------------------------------------------
// Configure & import environment
// ------------------------------------------------------------------------

import {ENVIRONMENT, getEnvironmentFile} from './contants'
export const CURRENT_ENVIRONMENT = ENVIRONMENT.UAT_2
export const CURRENT_VERSION = '1.0.0'
export const environmentVariable = getEnvironmentFile(CURRENT_ENVIRONMENT)

const SEGMENT_KEY = '2Zd5nzO3uQ2HEjHc3gwjBMqbGOqzGMP8'
import Analytics from 'analytics-react-native'
export const analytics = new Analytics(SEGMENT_KEY)

// ------------------------------------------------------------------------
// Export API clients
// ------------------------------------------------------------------------

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk/dist/aws-sdk-react-native'
import * as enhancements from 'react-native-aws-cognito-js'

export const client = (idToken) => {
  const networkInterface = createNetworkInterface({
    uri: environmentVariable.LW_WRITE
  })

  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }
      req.options.headers.authorization = idToken
      next()
    }}])

  const client = new ApolloClient({networkInterface})

  return {
    client: client
  }
}

export const tptClient = (idToken) => {
  const networkInterface = createNetworkInterface({
    uri: environmentVariable.ACCOUNT_API
  })

  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }
      req.options.headers.authorization = idToken
      next()
    }}])

  const client = new ApolloClient({networkInterface})

  return {
    client: client
  }
}

export const fundingClient = (idToken) => {
  const networkInterface = createNetworkInterface({
    uri: environmentVariable.FUNDING_API
  })

  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }
      req.options.headers.authorization = idToken
      next()
    }}])

  const client = new ApolloClient({networkInterface})

  return {
    client: client
  }
}

export const transferClient = (idToken) => {
  const networkInterface = createNetworkInterface({
    uri: environmentVariable.TRANSFERS_API
  })

  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }
      req.options.headers.authorization = idToken
      next()
    }}])

  const client = new ApolloClient({networkInterface})

  return {
    client: client
  }
}

export const detailClient = (idToken) => {
  const networkInterface = createNetworkInterface({
    uri: environmentVariable.DETAIL_API
  })

  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }
      req.options.headers.authorization = idToken
      next()
    }}])

  const client = new ApolloClient({networkInterface})

  return {
    client: client
  }
}

export const AuthCredentials = {
  UserPoolId: environmentVariable.USER_POOL_ID,
  ClientId: environmentVariable.CLIENT_ID
}

Object.keys(enhancements).forEach(key => (CognitoIdentityServiceProvider[key] = enhancements[key]))
export const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(AuthCredentials)
export default AWS
