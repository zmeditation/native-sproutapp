/* eslint-disable no-unused-vars,padded-blocks,no-multiple-empty-lines,no-trailing-spaces,camelcase */
/**
 * Created by victorchoudhary on 11/05/17.
 */

// library we are using to wrap and simplify API Calls
import apisauce from 'apisauce'
import {url}
  from '../Config/Auth'

export const authAPI = () => {

  const api = apisauce.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const getAccessToken = (client_id, client_secret, audience, grant_type) => api.post('', {client_id, client_secret, audience, grant_type})

  return {
    getAccessToken: getAccessToken
  }
}
