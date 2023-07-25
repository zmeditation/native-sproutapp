/* eslint-disable no-undef,no-trailing-spaces */
/**
 * Created by demon on 22/1/18.
 */

import {environmentVariable} from '../Config/AppConfig'
import {AUTH_ENTITIES} from '../Utility/Mapper/Auth'

export const settingsAPI = (action) => {
  const token = action[AUTH_ENTITIES.ID_TOKEN]
  console.log('going for ', environmentVariable.STATEMENTS, '\n with token :; ', token)

  var myHeaders = new Headers()
  myHeaders.append('Authorization', token)

  var myInit = { method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' }

  return fetch(environmentVariable.STATEMENTS, myInit).then(response => response.json())
}

export const confirmationAPI = (action) => {
  const token = action[AUTH_ENTITIES.ID_TOKEN]
  console.log('going for ', environmentVariable.CONFIRMATIONS, '\n with token :; ', token)

  var myHeaders = new Headers()
  myHeaders.append('Authorization', token)

  var myInit = { method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' }

  return fetch(environmentVariable.CONFIRMATIONS, myInit).then(response => response.json())
}

export const doTransactionNow = (action) => {
  const token = action[AUTH_ENTITIES.ID_TOKEN]
  console.log('going for ', environmentVariable.TRANSFER_NOW, '\n with token :; ', token)

  var myHeaders = new Headers()
  myHeaders.append('Authorization', token)

  var myInit = { method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' }

  return fetch(environmentVariable.TRANSFER_NOW, myInit).then(response => response.json())
}
