/* eslint-disable key-spacing,no-trailing-spaces */
/**
 * Created by viktor on 14/7/17.
 */

// ========================================================
// User Entities
// ========================================================

export const USER_ENTITIES = {

  // ----- BUSINESS entities -----

  // USER ID
  USER_ID   : 'userID',
  // Full name of user
  FULL_NAME: 'fullName',
  // user's legal first name
  FIRST_NAME: 'firstName',
  // user's legal last name
  LAST_NAME: 'lastName',
  // user's Date of Birth
  DOB: 'DOB',
  // user's email ID
  EMAIL_ID: 'emailID',

  // user's phone number
  PHONE_NUMBER: 'phoneNumber',
  // user's ADDRESS
  ADDRESS_LINE_1: 'addressLine1',
  ADDRESS_LINE_2: 'addressLine2',
  CITY: 'city',
  STATE: 'state',
  ZIP_CODE: 'zipCode',

  // USER'S SSN
  SSN : 'SSN',

  // employment type
  EMPLOYMENT_TYPE: 'employementType',
  // salary per year
  SALARY_PER_YEAR: 'salaryPerYear',
  // user's total value
  USER_TOTAL_VALUE: 'userTotalValue',
  // user investor type
  INVESTOR_TYPE: 'investorType',
  // residency type
  RESIDENCY_TYPE: 'residencyType',
  // residency type = US Citizen
  CITIZEN: 'citizen',
  // residency type = Greencard
  GREENCARD: 'greencard',
  // residency type = Visa
  VISA: 'visa',
  // other type of residency except visa, greencard, citizen
  OTHER_RESIDENCY: 'otherResidency',
  // in which country user was born
  COUNTRY_BORN: 'countryBorn',
  // which country does he hold citizenship
  COUNTRY_CITIZENSHIP: 'countryCitizenship',
  // user visa type
  VISA_TYPE: 'visaType',
  // expiry date of visa
  VISA_EXPIRY: 'visaExpiry',

  // has family member in another brokerage
  FAMILY_BROKERAGE_FLAG: 'familyBrokerageFlag',
  // stock ticker relate to another brokerage firm
  STOCK_TICKER: 'stockTicker',

  // any member of family associated with politics
  FAMILY_POLITICAL_FLAG: 'familyPoliticalFlag',
  // name of political organisation
  POLITICAL_ORGANISATION: 'politicalOrganisation',
  // name of associated person
  POLITICAL_ASSOCIATED_RELATIVE: 'politicalAssociatedRelative',

  // any member part of another brokerage firm stakeholder
  STOCK_OWNER_FLAG: 'stockOwnerFlag',
  // name of the brokerage firm
  STOCK_BROKERAGE_FIRM: 'stockBrokerageFirm',

  // plaid account id
  PLAID_ACCOUNT_ID: 'plaidAccountID',
  // plaid account public token
  PLAID_PUBLIC_TOKEN: 'plaidPublicToken',
  // funding source id
  CURRENT_FUNDING_SOURCE_ID: 'current_funding_source_id',
  // status of funding source
  CURRENT_FUNDING_SOURCE_STATUS: 'current_funding_source_status',
  // is plaid linked
  PLAID_LINKED: 'plaidLinked',

  IS_PLAID_LINKED: 'isPlaidLinked',

  // ----- Store specific entities -----

  // entity representing data fetched from server
  USER_DATA : 'USER_DATA',
  // identity check data
  IDENTITY_DATA: 'identityData',

  DUMMY_DATA: 'DUMMY_DATA',

  TODO_LIST: 'todoList',

  TODO_PENDING: 'pending',
  TODO_COMPLETE: 'complete',

  // ----- UTILITY entities -----

  IS_OK     : 'OK',
  // error related to goal module
  ERROR     : 'ERROR',
  // processing index tag
  PROCESSING: 'PROCESSING',
  // fetching user data from server
  PROCESSING_FETCH_USER: 'PROCESSING_FETCH_USER',
  // plaid linking in progress
  PROCESSING_PLAID_LINKING: 'PROCESSING_PLAID_LINKING',
  // processing user detail fetch
  PROCESSING_USER_DETAIL_FETCH: 'PROCESSING_USER_DETAIL_FETCH'
}

export function path (ENTITIY) {
  switch (ENTITIY) {

    // ----- Business entity paths -----
    case USER_ENTITIES.USER_ID:
      return () => ['info', USER_ENTITIES.USER_ID]

    case USER_ENTITIES.FIRST_NAME:
      return () => ['info', USER_ENTITIES.FIRST_NAME]

    case USER_ENTITIES.LAST_NAME:
      return () => ['info', USER_ENTITIES.LAST_NAME]

    case USER_ENTITIES.EMAIL_ID:
      return () => ['info', USER_ENTITIES.EMAIL_ID]

    case USER_ENTITIES.CURRENT_FUNDING_SOURCE_ID:
      return () => ['info', USER_ENTITIES.CURRENT_FUNDING_SOURCE_ID]

    case USER_ENTITIES.CURRENT_FUNDING_SOURCE_STATUS:
      return () => ['info', USER_ENTITIES.CURRENT_FUNDING_SOURCE_STATUS]

    case USER_ENTITIES.TODO_LIST:
      return () => [USER_ENTITIES.TODO_LIST]

    case USER_ENTITIES.IS_PLAID_LINKED:
      return () => ['info', USER_ENTITIES.IS_PLAID_LINKED]

    // ----- Store specific entity paths-----
    case USER_ENTITIES.IDENTITY_DATA:
      return () => [USER_ENTITIES.IDENTITY_DATA]

    // ----- Utility paths -----
    case USER_ENTITIES.IS_OK:
      return () => ['sanity', USER_ENTITIES.IS_OK]
    case USER_ENTITIES.ERROR:
      return () => ['sanity', USER_ENTITIES.ERROR]
    case USER_ENTITIES.PROCESSING:
      return () => ['sanity', USER_ENTITIES.PROCESSING]
  }
}
