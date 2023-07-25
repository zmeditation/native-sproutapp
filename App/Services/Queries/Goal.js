/* eslint-disable no-trailing-spaces,new-cap */
/**
 * Created by viktor on 30/6/17.
 */
// ========================================================
// Import Packages
// ========================================================

import {AsyncStorage} from 'react-native'
import gql from 'graphql-tag'
import {client, transferClient, detailClient} from '../../Config/AppConfig'
import {GOAL_ENTITIES} from '../../Utility/Mapper/Goal'
import {AUTH_ENTITIES} from '../../Utility/Mapper/Auth'
import {USER_ENTITIES} from '../../Utility/Mapper/User'
import {CHILD_ENTITIES} from '../../Utility/Mapper/Child'
import moment from 'moment'

// ========================================================
// Queries
// ========================================================

export const updateCompleteGoalQuery = () => {
  let mutation = gql`
    mutation ($userID: String!, $childID: String!, $goalID: String!, $target: String!, $recurringAmount: String!, $recurringFrequency: String!, $initialTransferDate: String!){
      updateGoal(
        input:{
          clientid: "Macbook",
          userid: $userID,
          sproutid: $childID,
          goalid: $goalID,
          patch: {
            target: $target,
            recurringinvestmentamount: $recurringAmount,
            recurringinvestmentfrequency: $recurringFrequency,
            initialtransferdate: $initialTransferDate
          }
        }
      ) {
        clientMutationId
        userid
        sproutid
        goal{
          goalid
          target
          recurringinvestmentfrequency
          recurringinvestmentamount
          initialtransferdate
        }
      }
    }
  `

  async function updateGoal (action) {
    console.log('<<----- running update goal --->> :: ')
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('g-t update goal token now')
    let ql = new client(token)
    return ql.client.mutate(
      {
        mutation,
        variables: {
          userID: action[USER_ENTITIES.USER_ID],
          childID: action[CHILD_ENTITIES.CHILD_ID],
          goalID: action[GOAL_ENTITIES.GID],
          target: action[GOAL_ENTITIES.GOAL_AMOUNT],
          recurringAmount: action[GOAL_ENTITIES.RECURRING_AMOUNT],
          recurringFrequency: action[GOAL_ENTITIES.RECURRING_FREQUENCY],
          initialTransferDate: action[GOAL_ENTITIES.FIRST_TRANSFER_DATE]
        }
      }
    )
  }

  return {
    updateGoal
  }
}

export const updatePartialGoalQuery = () => {
  let mutation = gql`
    mutation ($userID: String!, $childID: String!, $goalID: String!, $target: String!, $portfolioRisk: String!, $endDate: String!){
      updateGoal(
        input:{
          client_id: "Macbook",
          user_id: $userID,
          sprout_id: $childID,
          goal_id: $goalID,
          patch: {
            target: $target,
            current_portfolio_id: $portfolioRisk,
            end_date: $endDate
          }
        }
      ) {
        clientMutationId
        user_id
        sprout_id
        goal{
          goal_id
          target
        }
      }
    }
  `

  async function updateGoal (action) {
    console.log('<<----- running update partial goal --->> :: ,', action)
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('g-t update partial goal token now')
    let ql = new client(token)
    let m = moment()
    m.add(10, 'y')
    let endDate = m.format('YYYY-MM-DD')
    return ql.client.mutate(
      {
        mutation,
        variables: {
          userID: action[USER_ENTITIES.USER_ID],
          childID: action[CHILD_ENTITIES.CHILD_ID],
          goalID: action[GOAL_ENTITIES.GID],
          target: action[GOAL_ENTITIES.GOAL_AMOUNT],
          portfolioRisk: action[GOAL_ENTITIES.PORTFOLIO_RISK],
          endDate: endDate
        }
      })
  }

  return {
    updateGoal
  }
}

export const goalQuery = () => {
  let foo = () => gql`
      mutation ($userID: String!, $childID : String!, $name : String!){
         createGoal(
          input:{
            client_id:"macbook pro",
            user_id: $userID,
            sprout_id: $childID,
            goal:{
              name: $name
            }
          }
        ) {
          clientMutationId
          goal {
            goal_id
            name
            sprout{
              sprout_id
            }
          }
        }
      }
    `

  async function addCustomGoal (action) {
    console.log('<<----- running add custom goal --->> :: ')
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    let ql = new client(token)
    let mutation = foo()
    console.log('g-t add custom token now :: ', mutation)
    return ql.client.mutate(
      {
        mutation,
        variables: {
          userID: action[GOAL_ENTITIES.USER_ID],
          childID: action[GOAL_ENTITIES.CID],
          name: action[GOAL_ENTITIES.NAME]
        }
      })
  }

  return {
    addCustomGoal
  }
}

export const fetchGoalDetail = () => {
  let query = gql`
    query ($userID: String!, $goalID: String!){
    goal_detail(user_id: $userID, goal_id: $goalID) {
      goal_id
      goal {
        name
        target
        end_date
        current_portfolio_id
        current_value
        growth_in_value
        growth_in_percentage       
      }
      transactions {
        amount
        time
        status
      }
      instructions {
        amount
        frequency
        initial_request_time
        next_transfer_date        
      }
      stocks {
        ticker
        name
        units
        amount
        unit_price
        current_value
        growth_in_value
        growth_in_percentage
        fetch_time
      }
    }
  }
  `

  async function fetchGoalDetail (action) {
    console.log('<<----- running add custom goal --->> :: ')
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('g-t add custom token now')
    let ql = new detailClient(token).client
    return ql.query(
      {
        query,
        variables: {
          userID: action[USER_ENTITIES.USER_ID],
          goalID: action[GOAL_ENTITIES.GID]
        }
      })
  }

  return {
    fetchGoalDetail
  }
}

export const fetchRecurringInvestmentData = () => {
  let query = gql`
    query ($userID: String!){
    user(userid: $userID) {
      userid
      sprout {
        sproutid
        firstname
        goal{
          goalid
          name
          recurringinvestmentamount
          recurringinvestmentfrequency
          initialtransferdate
        }
      }
    }
  }
  `

  const fetchData = (action) => {
    return client.query(
      {
        query,
        variables: {
          userID: action[USER_ENTITIES.USER_ID]
        }
      })
  }

  return {
    fetchData
  }
}

export const fetchUserTransfers = () => {
  let query = gql`
    query ($userID: String!){
    user_transfers(user_id: $userID) {
      user_id
      transfer_reference_id
      sprout_id
      goal_id
      amount
      frequency
      type
      transfer_status
      next_transfer_date
      transactions {
        individual_transfer_id
        individual_transfer_request_time
        individual_transfer_amount
        individual_transfer_status
      }
    }
  }
  `

  async function fetchUserTransfers (action) {
    console.log('<<----- running fetch user transfers --->> :: ')
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('g-t add custom token now')
    let ql = new transferClient(token).client
    return ql.query(
      {
        query,
        variables: {
          userID: action[USER_ENTITIES.USER_ID]
        }
      })
  }

  return {
    fetchUserTransfers
  }
}

