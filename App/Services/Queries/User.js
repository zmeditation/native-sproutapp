/* eslint-disable new-cap */
/**
 * Created by viktor on 14/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {AsyncStorage}
  from 'react-native'
import gql from 'graphql-tag'
import {client} from '../../Config/AppConfig'
import {USER_ENTITIES} from '../../Utility/Mapper/User'
import {AUTH_ENTITIES} from '../../Utility/Mapper/Auth'

// ========================================================
// Queries
// ========================================================

export const userQuery = () => {
  let query = gql`
      query ($userID: String!){
          user (user_id: $userID) {
            user_id,
            first_name,
            last_name,
            email,
            current_funding_source_id,
            current_funding_source_status,
            sprout {
              sprout_id,
              first_name,
              last_name,
              date_of_birth
              goal {
                goal_id,
                name,
                target,
                current_portfolio_id
              }
            }
          }      
      }
    `

  async function fetchUser (action) {
    console.log('<<----- running fetch user --->> :: ', action)
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('g-t token now')
    let ql = new client(token)
    return ql.client.query(
      {
        query,
        variables: {
          userID: action[USER_ENTITIES.USER_ID]
        }
      })
  }

  return {
    fetchUser
  }
}
