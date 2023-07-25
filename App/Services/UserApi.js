/* eslint-disable no-trailing-spaces,padded-blocks */
/**
 * Created by victorchoudhary on 12/05/17.
 */

import apisauce
  from 'apisauce'
// import {baseURL}
//  from '../Config/Auth'

export const userAPI = () => {

  const api = apisauce.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const submitUserInfo = (payload) => api.post('/user/', {payload})

  return {
    postUserInfo: submitUserInfo
  }
}
