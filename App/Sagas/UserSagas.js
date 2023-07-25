/* eslint-disable no-trailing-spaces,key-spacing */
/**
 * Created by victorchoudhary on 12/05/17.
 */

import {put, call}
  from 'redux-saga/effects'
import {UserActions}
  from '../Redux/Reducers/UserReducer'
import {GoalActions}
  from '../Redux/Reducers/GoalReducer'
import PHANTOM
  from '../Utility/Phantom'
import {COMMON_ENTITIES}
  from '../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../Utility/Mapper/User'
import {CHILD_ENTITIES}
  from '../Utility/Mapper/Child'
import {GOAL_ENTITIES}
  from '../Utility/Mapper/Goal'
import {SPROUT}
  from '../Utility/Mapper/Screens'
import {analytics}
  from '../Config/AppConfig'
import {SEGMENT_ACTIONS}
  from '../Config/contants'

export function * submitUserInfo (api, action) {
  const {payload} = action

  let response
  try {
    response = yield call(api.postUserInfo, payload)
  } catch (err) {
    // console.log('error in calling submitUserInfo from saga : ', err)
  }

  if (response.ok) {
    const {data} = response
    yield put(UserActions.userInfoSubmitSuccess(data))
  } else {
    let error = {
      status  : response.status,
      code    : response.data.code,
      message : response.data.message
    }
    yield put(UserActions.userInfoSubmitFailure(error))
  }
}

export function * fetchUser (query, action) {
  let response
  var sendError = false

  try {
    PHANTOM.assertActionPayload(action)
    response = yield call(query, action)
  } catch (err) {
    console.log('error in calling fetchUser : ', err)
  }

  if (response && response.data) {
    let data = response['data']
    let id = data['user'][0]['user_id']
    console.log('-- user fetch successfull ----- : ', response)
    let sprouts = data['user'][0]['sprout']
    let sproutIDs = sprouts.map(s => s['sprout_id'])

    let todoList = []
    let childrenAvailable = sprouts.length > 0
    let bankConnected = data['user'][0]['current_funding_source_id'] !== null
    if (!childrenAvailable) {
      todoList.push({
        title: 'Add your first child',
        screen: SPROUT.ADD_CHILD_SCREEN,
        status: USER_ENTITIES.TODO_PENDING,
        image: '../../../Img/icons/addChild.png'
      })
    }
    if (!bankConnected) {
      todoList.push({
        title: 'Connect a bank account',
        screen: SPROUT.ADD_CHILD_SCREEN,
        status: USER_ENTITIES.TODO_PENDING,
        image: '../../../Img/icons/connectBank.png'
      })
    }

    try {
      analytics.track({
        userId: id,
        event: SEGMENT_ACTIONS.USER_FETCH_SUCCESS,
        properties: {}
      })

      action[COMMON_ENTITIES.DISPATCH](UserActions.fetchUserSuccess(id, data, todoList))
      action[COMMON_ENTITIES.DISPATCH](UserActions.fetchUserDetail(id, sproutIDs, action[COMMON_ENTITIES.NAVIGATOR], false))
    } catch (err) {
      console.log('----errror in user fetch dispatch ----- :: ', err)
    }
  } else {
    sendError = true
  }

  if (sendError) {
    let error = {
      status: '402',
      code: 'User Fetch error',
      message: 'User Fetch Error'
    }
    console.log('---- user sagar, user fetch NOT successfull ----- : ', response)
    yield put(UserActions.fetchUserFailure(error))
  }
}

export function * linkPlaid (query, action) {
  let response
  var sendError = false
  console.log('action ---- :: ', action)
  try {
    response = yield call(query, action)
  } catch (err) {
    console.log('error in plaid linking : ', err)
  }

  if (response) {
    console.log('---- got response ----', response, 'for action :: ', action)

    analytics.track({
      userId: action[USER_ENTITIES.USER_ID],
      event: SEGMENT_ACTIONS.FUNDING_SOURCE_CONNECTED,
      properties: {}
    })

    yield put(GoalActions.navigateToTransferScreen(action[CHILD_ENTITIES.CHILD_ID], action[GOAL_ENTITIES.GID], action[COMMON_ENTITIES.NAVIGATOR]))
    yield put(UserActions.plaidLinkedSuccess(COMMON_ENTITIES.NAVIGATOR))
  } else {
    sendError = true
  }

  if (sendError) {
    let error = {
      status: '402',
      code: 'plaid linking error from server',
      message: 'no message yet'
    }
    yield put(UserActions.plaidLinkedFailure(error))
  }
}

export function * fetchUserDetail (query, action) {
  let response
  var sendError = false
  console.log('---- fetching detail ---- :: ', action)

  try {
    response = yield call(query, action)
  } catch (err) {
    console.log('error in fetch detail : ', err)
  }

  // is the fetch of details real time
  let isRealtime = action[COMMON_ENTITIES.IS_REAL_TIME]

  if (response) {
    console.log('-- user detail successfull :: ', response)
    let childDetail = response['data']['sprouts_detail']

    analytics.track({
      userId: action[USER_ENTITIES.USER_ID],
      event: SEGMENT_ACTIONS.USER_DETAIL_FETCH_SUCCESS,
      properties: {}
    })

    yield put(UserActions.fetchUserDetailSuccess(action[USER_ENTITIES.USER_ID], childDetail, action[COMMON_ENTITIES.NAVIGATOR]))
    if (isRealtime) {
      console.log('--- real time data fetch ---')
    }
  } else {
    console.log('---- user detail fetch is not fine ----')
    sendError = true
  }

  if (sendError) {
    let error = {
      status: '402',
      code: 'User Detail Fetch error',
      message: 'User Detail Fetch Error'
    }
    yield put(UserActions.fetchUserDetailFailure(error))
  }
}
