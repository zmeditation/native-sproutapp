/* eslint-disable no-trailing-spaces,new-cap */
/**
 * Created by viktor on 9/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import {AsyncStorage} from 'react-native'
import gql from 'graphql-tag'
import {tptClient, fundingClient, transferClient} from '../../Config/AppConfig'
import {USER_ENTITIES} from '../../Utility/Mapper/User'
import {CHILD_ENTITIES} from '../../Utility/Mapper/Child'
import {AUTH_ENTITIES} from '../../Utility/Mapper/Auth'
import {GOAL_ENTITIES} from '../../Utility/Mapper/Goal'
import {convertDateToRequestFormat}
  from '../../Utility/Transforms/Converter'

// ========================================================
// Queries
// ========================================================

export const foo = () => {
  let foo = (residencyType, familyBrokerageFlag, familyPoliticalFlag, stockOwnerFlag) => {
    // switch (residencyType) {
    //   case USER_ENTITIES.CITIZEN: {
    //
    //   }
    //     break
    //   case USER_ENTITIES.GREENCARD: {
    //
    //   }
    //     break
    //   case USER_ENTITIES.VISA: {
    //     if
    //   }
    //     break
    // }
    return gql`
    mutation ($clientID: String!, $userID: String!, $childID: String!, $incomeRange: String!, $assetsWorth: String!,
      $investorType: String!, $firstName: String!, $lastName: String!, $emailID: String!,
      $DOB: String!, $ssn: String!, $citizenshipCountry: String!, $birthCountry: String!, $phone: String!,
      $employmentStatus: String!, $line1: String!, $line2: String!, $city: String!, $state: String!, $postalCode: String!,
      $disclosureType: String!, $disclosurePoliticalExposureOrganization: String, $disclosurePoliticalExposureFamily: [String],
      $disclosureControlPersonCompanySymbols: [String], $disclosureFirmAffiliationName: String, $visaType: String, $visaExpiration: String,
      $childFirstName: String!, $childLastName: String!, $childSSN: String!, $childDOB: String!){
      createAccount (input: {
        client_id: $clientID,
          user_id: $userID,
          sprout_id: $childID,
          income_range: $incomeRange,
          assets_worth: $assetsWorth,
          investor_type: $investorType,
          applicants: [
          {
            applicant_type: "custodian",
            first: $firstName,
            middle: "Demo"
            last: $lastName,
            email: $emailID,
            birthday: $DOB,
            ssn: $ssn,
            citizenship_country: $citizenshipCountry,
            birth_country: $birthCountry,
            mobile: $phone,
            employment_status: $employmentStatus,
            line_1: $line1,
            line_2: $line2,
            city: $city,
            state: $state,
            postal_code: $postalCode,
            disclosure_type: $disclosureType,
            disclosure_political_exposure_organization: $disclosurePoliticalExposureOrganization,
            disclosure_political_exposure_family: $disclosurePoliticalExposureFamily,
            disclosure_control_person_company_symbols: $disclosureControlPersonCompanySymbols,
            disclosure_firm_affiliation_name: $disclosureFirmAffiliationName,
            visa_type: $visaType,
            visa_expiration: $visaExpiration
          },
          {
            applicant_type: "minor",
            first: $childFirstName,
            middle: "Demo",
            last: $childLastName,
            email: $emailID,
            birthday: $childDOB,
            ssn: $childSSN,
            citizenship_country: $citizenshipCountry,
            mobile: $phone,
            employment_status: "student",
            line_1: $line1,
            line_2: $line2,  
            city: $city,
            state: $state,
           postal_code: $postalCode
          }
        ]
      }) {
        account_id
        status
      }
    }
      `
  }

  async function createAccount (userData, childData, userID, childSSN, emailID) {
    let childDOB = childData['date_of_birth']
    let modifiedChildDOB = convertDateToRequestFormat(childDOB)
    modifiedChildDOB && (childData['date_of_birth'] = modifiedChildDOB)
    console.log(' ---- now mutating ---- ', userData, childData, userID, '\n childSSN: ', childSSN, '\nemailID : ', emailID)

    console.log('<<----- running add account --->> :: ')
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('g-t add account token now')

    let mutation = foo()
    let ql = new tptClient(token).client
    return ql.mutate(
      {
        mutation,
        variables: {
          clientID: '11-11-11',
          userID: userID,
          incomeRange: userData[USER_ENTITIES.SALARY_PER_YEAR],
          assetsWorth: userData[USER_ENTITIES.USER_TOTAL_VALUE],
          investorType: userData[USER_ENTITIES.INVESTOR_TYPE],
          firstName: userData[USER_ENTITIES.FIRST_NAME],
          lastName: userData[USER_ENTITIES.LAST_NAME],
          emailID: emailID,
          DOB: userData[USER_ENTITIES.DOB],
          ssn: userData[USER_ENTITIES.SSN],

          citizenshipCountry: userData[USER_ENTITIES.COUNTRY_CITIZENSHIP] || 'USA',
          birthCountry: userData[USER_ENTITIES.COUNTRY_BORN] || 'USA', // optional
          phone: userData[USER_ENTITIES.PHONE_NUMBER],
          employmentStatus: userData[USER_ENTITIES.EMPLOYMENT_TYPE],
          line1: userData[USER_ENTITIES.ADDRESS_LINE_1],
          line2: userData[USER_ENTITIES.ADDRESS_LINE_2] || 'null', // optional
          city: userData[USER_ENTITIES.CITY],
          state: userData[USER_ENTITIES.STATE],
          postalCode: userData[USER_ENTITIES.ZIP_CODE],
          disclosureType: [userData[USER_ENTITIES.FAMILY_POLITICAL_FLAG] ? 'political_exposure' : '', userData[USER_ENTITIES.FAMILY_BROKERAGE_FLAG] ? 'control_person' : '', userData[USER_ENTITIES.STOCK_OWNER_FLAG] ? 'firm_affiliation' : ''], // optional
          disclosurePoliticalExposureOrganization: userData[USER_ENTITIES.FAMILY_POLITICAL_FLAG] ? userData[USER_ENTITIES.POLITICAL_ORGANISATION] : undefined, // optional
          disclosurePoliticalExposureFamily: userData[USER_ENTITIES.FAMILY_POLITICAL_FLAG] ? userData[USER_ENTITIES.POLITICAL_ASSOCIATED_RELATIVE] : undefined, // optional
          disclosureControlPersonCompanySymbols: userData[USER_ENTITIES.FAMILY_BROKERAGE_FLAG] ? userData[USER_ENTITIES.STOCK_TICKER] : undefined, // optional
          disclosureFirmAffiliationName: userData[USER_ENTITIES.STOCK_OWNER_FLAG] ? userData[USER_ENTITIES.STOCK_BROKERAGE_FIRM] : undefined, // optional
          visaType: userData[USER_ENTITIES.VISA_TYPE] || undefined, // optional
          visaExpiration: userData[USER_ENTITIES.VISA_EXPIRY] || undefined, // optional

          // child values
          childID: childData['sprout_id'],
          childFirstName: childData['first_name'],
          childLastName: childData['last_name'],
          childSSN: childSSN || userData[USER_ENTITIES.SSN], //
          childDOB: childData['date_of_birth']

        }
      })
  }

  return {
    createAccount
  }
}

export const createChildAccount = () => {
  let foo = (ssn) => {
    if (ssn) {
      return gql`
      mutation ($clientID: String!, $userID: String!, $childID: String!, $childFirstName: String!, $childLastName: String!, $childDOB: String!, $childSSN: String!){
        createChildAccount (input: {
          client_id: $clientID,
          user_id: $userID,
          sprout_id: $childID,
          first: $childFirstName,
          last: $childLastName,
          birthday: $childDOB,
          child_ssn: $childSSN
      }) {
        account_id
        status
      }
    }
      `
    } else {
      return gql`
      mutation ($clientID: String!, $userID: String!, $childID: String!, $childFirstName: String!, $childLastName: String!, $childDOB: String!){
        createChildAccount (input: {
          client_id: $clientID,
          user_id: $userID,
          sprout_id: $childID,
          first: $childFirstName,
          last: $childLastName,
          birthday: $childDOB
      }) {
        account_id
        status
      }
    }
      `
    }
  }

  async function createChildAccount (childData, userID, childSSN) {
    let childDOB = childData['date_of_birth']
    let modifiedChildDOB = convertDateToRequestFormat(childDOB)
    modifiedChildDOB && (childData['date_of_birth'] = modifiedChildDOB)
    console.log(' ---- now mutating for child account ---- ', childData, userID, '\n childSSN: ', childSSN)

    console.log('<<----- running add account --->> :: ')
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('g-t add account token now')

    let ql = new tptClient(token).client

    let mutation = foo(childSSN)
    return ql.mutate(
      {
        mutation,
        variables: {
          clientID: '11-11-11',
          userID: userID,
          childID: childData['sprout_id'],
          childFirstName: childData['first_name'],
          childLastName: childData['last_name'],
          childSSN: childSSN,
          childDOB: childData['date_of_birth']
        }
      })
  }

  return {
    createChildAccount
  }
}

export const linkPlaidQuery = () => {
  let mutation = gql`
    mutation ($userID: String!, $plaidPublicToken: String!, $plaidAccountID: String!) {
          createFundingSource(input: {
            user_id: $userID,
            plaid_public_token: $plaidPublicToken,
            plaid_account_id: $plaidAccountID
          }) {
            source_reference_id
            status
          }
        }
  `

  async function linkPlaid (userData) {
    console.log('<<----- running link plaid --->> :: ,', userData)
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('got link plaid token now')
    let ql = new fundingClient(token).client
    return ql.mutate({
      mutation,
      variables: {
        userID: userData[USER_ENTITIES.USER_ID],
        plaidPublicToken: userData[USER_ENTITIES.PLAID_PUBLIC_TOKEN],
        plaidAccountID: userData[USER_ENTITIES.PLAID_ACCOUNT_ID]
      }
    }
    )
  }

  return {
    linkPlaid
  }
}

export const initiateTransfer = () => {
  let mutation = gql`
  mutation ($userID: String!, $childID: String!, $goalID: String!, $amount: String!, $frequency: String!) {
    createTransfer(input: {
      user_id: $userID,
      sprout_id: $childID,
      goal_id: $goalID,
      amount: $amount,
      frequency: $frequency
    }) {
      transfer_id
      status
    }
  }
  `

  async function doTransfer (data) {
    console.log('<<----- running transfer --->> :: ', data)
    let token = await AsyncStorage.getItem(AUTH_ENTITIES.ID_TOKEN)
    console.log('g-t transfer token now')
    let ql = new transferClient(token).client
    return ql.mutate({
      mutation,
      variables: {
        userID: data[USER_ENTITIES.USER_ID],
        childID: data[CHILD_ENTITIES.CHILD_ID],
        goalID: data[GOAL_ENTITIES.GID],
        amount: data[GOAL_ENTITIES.TRANSFER_AMOUNT],
        frequency: data[GOAL_ENTITIES.RECURRING_FREQUENCY]
      }
    })
  }

  return {
    doTransfer
  }
}
