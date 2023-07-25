/* eslint-disable padded-blocks,no-unused-vars,no-trailing-spaces */
/**
 * Created by victorchoudhary on 15/05/17.
 */

import apisauce
  from 'apisauce'
import {GOAL_ENTITIES}
  from '../Utility/Mapper/Goal'
import {MOCK_URL}
  from '../Config/contants'

export const goalAPI = () => {

  const api = apisauce.create({
    baseURL: MOCK_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const addGoal = payload => api.post('/goal/', payload)

  const editGoal = payload => api.post('/goal/edit', payload)

  return {
    addGoal,
    editGoal
  }
}

export const goalChart = () => {
  const api = apisauce.create({
    baseURL: 'https://dev1.charts.lovedwealth.com',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const fetchChart = payload => {
    // const p = '/' + payload[GOAL_ENTITIES.GID] + '.json'
    const p = '/' + '3a00eddc-c7e0-4362-b298-d00e01458c6e' + '.json'
    console.log('chart spi :: ', p)
    return api.get(p)
  }

  return {
    fetchChart
  }
}

