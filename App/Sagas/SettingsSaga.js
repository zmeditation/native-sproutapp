/* eslint-disable no-trailing-spaces,no-undef,no-unused-vars */
/**
 * Created by viktor on 17/8/17.
 */

import {put, call}
  from 'redux-saga/effects'
import {SettingActions}
  from '../Redux/Reducers/SettingReducer'
import {COMMON_ENTITIES}
  from '../Utility/Mapper/Common'
import PHANTOM
  from '../Utility/Phantom'
import {AUTH_ENTITIES} from '../Utility/Mapper/Auth'

export function * fetchRecurringData (query, action) {
  let response
  var sendError = false

  console.log('---- settings saga ---- ', action)
  try {
    PHANTOM.assertActionPayload(action)

    console.log('---- settings saga ---- ', action)
    response = yield call(query, action)
  } catch (err) {
    // console.log('error in calling addChild : ', err)
  }

  if (response && response.data) {
    let data = response['data']
    let sprouts = data['user'][0]['sprout']
    console.log('---- fetch recurring data successfull ----- : ', response)
    yield put(SettingActions.fetchRecurringDataSuccess(sprouts))
  } else {
    sendError = true
  }

  if (sendError) {
    let error = {
      status: '402',
      code: 'Recurring Data Fetch Error',
      message: 'no message yet'
    }
    console.log('---- recurring fetch NOT successfull ----- : ', response)
    yield put(SettingActions.fetchRecurringDataFailure(error))
  }
}

const foo = (action) => {
  console.log('got action :: ', action)
  let h = new Headers()
  h.append('Content-Type', 'application/json')
  h.append('Authorization', action[AUTH_ENTITIES.ID_TOKEN])

  let init = {
    method: 'GET',
    header: h
  }
  fetch('https://api.dev1.dev.lovedwealth.com/v1/statements', init).then(response => console.log('response in fetch :: ', response).catch(err => console.log('error in fetch :: ', err)))
}

export function * fetchStatements (action) {
  let response
  var sendError = false

  console.log('---- settings saga ---- ', action)
  try {
    console.log('---- settings saga ---- ', action)
    response = yield call(require('../Services/StatementsAPI').settingsAPI, action)
  } catch (err) {
    console.log('error in calling fetch statements : ', err)
  }

  if (response) {
    const {data} = response
    yield put(SettingActions.showDocumentsSuccess(data, action[COMMON_ENTITIES.NAVIGATOR]))
  } else {
    sendError = true
  }

  if (sendError) {
    let error = {
      status: '402',
      code: 'Recurring Data Fetch Error',
      message: 'no message yet'
    }
    console.log('---- recurring fetch NOT successfull ----- : ', response)
    yield put(SettingActions.fetchRecurringDataFailure(error))
  }
}

export function * fetchConfirmations (action) {
  let response
  var sendError = false

  console.log('---- confirmation saga ---- ', action)
  try {
    console.log('---- confirmation saga ---- ', action)
    response = yield call(require('../Services/StatementsAPI').confirmationAPI, action)
  } catch (err) {
    console.log('error in calling confirmation fetch statements : ', err)
  }

  if (response) {
    const {data} = response
    yield put(SettingActions.showConfirmationsSuccess(data, action[COMMON_ENTITIES.NAVIGATOR]))
  } else {
    sendError = true
  }

  if (sendError) {
    let error = {
      status: '402',
      code: 'Recurring Data Fetch Error',
      message: 'no message yet'
    }
    console.log('---- confirmation fetch NOT successfull ----- : ', response)
    yield put(SettingActions.showConfirmationsFailure(error))
  }
}

export function * transferNow (action) {
  let response
  var sendError = false

  console.log('---- transfering now ---- ', action)
  try {
    response = yield call(require('../Services/StatementsAPI').doTransactionNow, action)
  } catch (err) {
    console.log('error in calling transfer now : ', err)
  }

  if (response) {
    const {data} = response
    console.log('response :::: ', response)
    // yield put(SettingActions.showDocumentsSuccess(data, action[COMMON_ENTITIES.NAVIGATOR]))
  } else {
    sendError = true
  }

  if (sendError) {
    let error = {
      status: '402',
      code: 'Recurring Data Fetch Error',
      message: 'no message yet'
    }
    console.log('---- recurring fetch NOT successfull ----- : ', response)
    // yield put(SettingActions.fetchRecurringDataFailure(error))
  }
}
