/* eslint-disable no-trailing-spaces,padded-blocks,new-cap */
/**
 * Created by viktor on 28/6/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {AsyncStorage} from 'react-native'
import gql from 'graphql-tag'
import {client, detailClient} from '../../Config/AppConfig'
import {CHILD_ENTITIES} from '../../Utility/Mapper/Child'
import {USER_ENTITIES} from '../../Utility/Mapper/User'
import {AUTH_ENTITIES} from '../../Utility/Mapper/Auth'

// ========================================================
// Queries
// ========================================================

export const childQuery = () => {

  let mutation = gql`
      mutation ($userID: String!, $firstName : String!, $lastName : String!, $DOB: String!){
        createSprout(
          input: {
            client_id: "windows",
            user_id: $userID,
            sprout: {
              first_name: $firstName,
              last_name: $lastName,
              date_of_birth: $DOB
            },
            attributes: {
              has_control: 1,
              relationship: "son"
             }
           }
         )
         {
          clientMutationId
          sprout {
            sprout_id
            first_name
            last_name
            date_of_birth
           }
         }
      }
    `

  async function addChild (action) {
    console.log('<<----- running add child --->> :: ')
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('got add child token now, ', token)
    let ql = new client(token)
    return ql.client.mutate(
      {
        mutation,
        variables: {
          userID: action[CHILD_ENTITIES.USER_ID],
          firstName: action[CHILD_ENTITIES.FIRST_NAME],
          lastName: action[CHILD_ENTITIES.LAST_NAME],
          DOB: action[CHILD_ENTITIES.DOB]
        }
      })
  }

  return {
    addChild
  }

}

export const fetchChildDetail = () => {

  let query = gql`
    query ($userID: String!, $childIDs: [String]!){
    sprouts_detail(user_id: $userID, sprout_ids: $childIDs, realtime: "true") {
      sprouts_detail {
        sprout_id
        sprout {
          first_name
          last_name
        }
        goals {
          goal_id
          name
          target
          end_date
          current_portfolio_id
          total_contributions
          current_value          
        }
        portfolio
        {
          total_contributions
          current_value
          growth_in_value
          growth_in_percentage
        }
        instructions {
          goal_id
          goal_name
          amount
          frequency
          initial_request_time
          next_transfer_date         
        }
      }
    }
  }
  `

  async function fetchChildDetail (action) {
    console.log('<<----- running fetch child detail --->> :: ')
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('got fetch child detail token now, ', token)
    let client = new detailClient(token).client
    return client.query(
      {
        query,
        variables: {
          userID: action[USER_ENTITIES.USER_ID],
          childIDs: action[CHILD_ENTITIES.CHILD_IDs]
        }
      })
  }

  return {
    fetchChildDetail
  }
}
