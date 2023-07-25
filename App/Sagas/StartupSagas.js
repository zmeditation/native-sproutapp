/* eslint-disable no-trailing-spaces,padded-blocks,padded-blocks,space-before-blocks,no-unused-vars */
/**
 * Created by victorchoudhary on 11/05/17.
 */

import { call } from 'redux-saga/effects'

export function * getAccessToken (api, action){

  const {clientID, clientSecret, audience, grantType} = action

  let response
  try {
    // response = yield call(api.getAccessToken, clientID, clientSecret, audience, grantType)
  } catch (err) {
    // console.log('error in calling getAccessToken from saga : ', err)
  }

  if (response.ok) {
    // const {data} = response
  } else {
    // console.log('Error : ', response)
  }
}
