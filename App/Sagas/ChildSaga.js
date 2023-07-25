/* eslint-disable no-unused-vars,no-trailing-spaces,padded-blocks,key-spacing */
/**
 * Created by viktor on 28/6/17.
 */

// ========================================================
// Import packages
// ========================================================

import {put, call}
  from 'redux-saga/effects'
import {AsyncStorage} from 'react-native'
import {ChildActions}
  from '../Redux/Reducers/ChildReducer'
import PHANTOM
  from '../Utility/Phantom'
import {USER_ENTITIES}
  from '../Utility/Mapper/User'
import {CHILD_ENTITIES}
  from '../Utility/Mapper/Child'
import {AUTH_ENTITIES}
  from '../Utility/Mapper/Auth'
import {COMMON_ENTITIES}
  from '../Utility/Mapper/Common'
import {foo, createChildAccount} from '../Services/Queries/TPT'

// ========================================================
// Sagas
// ========================================================

/*
  Todo:-
  1. verify outgoing data
  2. verify incoming data
  3. better strategy for formulating query
 */
export function * addChild (mutation, action) {
  let response, tptResponse
  var sendError = false

  console.log('----- ***** going for add child ***** ----- :: ', action)
  try {
    // PHANTOM.assertActionPayload(action)
    response = yield call(mutation, action)
  } catch (err) {
    // console.log('error in calling addChild : ', err)
  }

  if (response && response.data) {
    let data = response.data.createSprout.sprout
    let userID = action[USER_ENTITIES.USER_ID]
    console.log('data : ', data)

    // ------ create TPT account ------
    let userIdentityData = action[USER_ENTITIES.IDENTITY_DATA]
    if (userIdentityData) {
      let childSSN = action[CHILD_ENTITIES.SSN]
      let emailID = action[USER_ENTITIES.EMAIL_ID]
      tptResponse = yield call(foo().createAccount, userIdentityData, data, userID, childSSN, emailID)
      if (tptResponse && tptResponse.data) {
        console.log('******* got tpt response ***** ', tptResponse.data)
      } else {
        console.log(' (((( got error )))) ')
      }
    } else {
      console.log('---- creating child account ----')
      let childSSN = action[CHILD_ENTITIES.SSN]
      tptResponse = yield call(createChildAccount().createChildAccount, data, userID, childSSN)
      if (tptResponse && tptResponse.data) {
        console.log('******* got tpt response ***** ', tptResponse.data)
      } else {
        console.log(' (((( got error )))) ')
      }
    }

    yield put(ChildActions.addChildSuccess(
      data['sprout_id'],
      data['first_name'],
      data['last_name'],
      data['date_of_birth'],
      action[COMMON_ENTITIES.NAVIGATOR],
      userID
    ))

  } else {
    sendError = true
  }

  if (sendError) {
    let error = {
      status: '402',
      code: 'testing error',
      message: 'no message yet'
    }
    yield put(ChildActions.addChildFailure(error))
  }
}

export function * fetchChildChartData (api, action) {
  let response
  var sendError = false

  try {
    // ---- STEP 1 -----
    // send api request & received response
    console.log('----- fetching chart data from saga ----- ', action, api)
    response = yield call(api, action)

  } catch (err) {
    // console.log('ERROR in calling SAGA[Goal/EditGoal] :: ', err)
  }

  // if response is ok, send success event
  if (response && response.ok) {
    console.log('response ::: ', response)
    let data = response['data']
    yield put(ChildActions.fetchChildChartDataSuccess(action[CHILD_ENTITIES.CHILD_ID], data))
  } else {
    console.log('response not ok :: ', response)
    sendError = true
  }

  // ---- STEP 4 -----
  // send failure event in case of error generated
  if (sendError) {
    let error = {
      status  : '401',
      code    : 'fetch child chart data not good',
      message : 'fetch child chart data not good'
    }
    yield put(CHILD_ENTITIES.fetchChildChartDataFailure(error))
  }
}
