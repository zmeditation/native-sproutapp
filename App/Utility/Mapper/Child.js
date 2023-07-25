/* eslint-disable no-trailing-spaces,key-spacing,no-multiple-empty-lines */
/**
 * Created by viktor on 21/6/17.
 */

// ========================================================
// CHILD Object
// ========================================================

// Entities
export const CHILD_ENTITIES = {

  // ----- BUSINESS entities -----

  // child's photo
  AVATAR : 'avatar',

  USER_ID     : 'userID',

  CHILD_ID    : 'childID',

  CHILD_IDs   : 'childIDs',

  // child's Social Security number
  SSN: 'SSN',
  // Child's First Name
  FIRST_NAME  : 'firstName',
  // Child's Last Name
  LAST_NAME   : 'lastName',
  // Date of Birth
  DOB         : 'DOB',
  // child's emailID,
  EMAIL_ID    : 'emailID',

  // citizenship of child
  CITIZENSHIP: 'citizenship',
  // employement status
  EMPLOYMENT_STATUS: 'employmentStatus',
  // phone number of child
  PHONE_NUMBER: 'phoneNumber',
  // address line 1
  ADDRESS_LINE_1: 'addressLine1',
  // city
  CITY: 'city',
  // state
  STATE: 'state',
  // postal code
  ZIP_CODE: 'zipCode',

  // document statements
  STATEMENTS: 'statements',
  // transfer confirmations
  CONFIRMATIONS: 'confirmations',

  // portfolio of child account
  PORTFOLIO: 'portfolio',
  // current value of child's portfolio
  CURRENT_VALUE: 'currentValue',
  // current growth of child's portfolio in %
  GROWTH_IN_PERCENTAGE: 'growthInPercentage',
  // current growth of child's portfolio in number
  GROWTH_IN_VALUE: 'growthInValue',
  // total contributions over child portfolio
  TOTAL_CONTRIBUTIONS: 'totalContributions',

  // ----- Store specific entities -----
  CHILD_ID_INDEX: 'CHILD_ID_INDEX',

  LIST_INDEX: 'LIST_INDEX',

  CHART_DATA: 'CHART_DATA',

  CHILD_DETAIL_DATA: 'CHILD_DETAIL_DATA',


  // ----- UTILITY entities -----

  // are there any error's in child object functioining
  IS_OK     : 'OK',
  // error related to goal module
  ERROR     : 'ERROR',
  // processing index tag
  PROCESSING: 'PROCESSING',

  // processing add child
  ADD_CHILD_PROCESSING: 'add child processing',

  FETCH_CHART_DATA_PROCESSING: 'processingFetchChartData'

}

/*
  children : {

    sanity : {
      OK,
      ERROR,
      PROCESSING
    },

    [CHILD_ID] : {
      info : { }
    }
  }
 */
export function path (ENTITIY) {
  switch (ENTITIY) {

    // ----- Business entity paths -----

    case CHILD_ENTITIES.AVATAR:
      return (childID) => {
        // when childID not present, simply return avatar
        // from non childID specific path
        return childID ? [CHILD_ENTITIES.LIST_INDEX, [childID], CHILD_ENTITIES.AVATAR] : [CHILD_ENTITIES.AVATAR]
      }

    case CHILD_ENTITIES.SUDO_AVATAR:
      return (childID) => [CHILD_ENTITIES.LIST_INDEX, [childID], CHILD_ENTITIES.AVATAR]

    case CHILD_ENTITIES.CHILD_ID_INDEX:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID]]

    case CHILD_ENTITIES.LIST_INDEX:
      return () => [CHILD_ENTITIES.LIST_INDEX]

    case CHILD_ENTITIES.CHILD_ID:
      return (childID) => [CHILD_ENTITIES.LIST_INDEX, [childID], CHILD_ENTITIES.CHILD_ID]

    case CHILD_ENTITIES.FIRST_NAME:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.FIRST_NAME]

    case CHILD_ENTITIES.LAST_NAME:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.LAST_NAME]

    case CHILD_ENTITIES.DOB:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.DOB]

    case CHILD_ENTITIES.STATEMENTS:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.STATEMENTS]

    case CHILD_ENTITIES.CONFIRMATIONS:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.CONFIRMATIONS]

    case CHILD_ENTITIES.PORTFOLIO:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.PORTFOLIO]

    case CHILD_ENTITIES.CURRENT_VALUE:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.PORTFOLIO, CHILD_ENTITIES.CURRENT_VALUE]
    case CHILD_ENTITIES.GROWTH_IN_PERCENTAGE:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.PORTFOLIO, CHILD_ENTITIES.GROWTH_IN_PERCENTAGE]
    case CHILD_ENTITIES.GROWTH_IN_VALUE:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.PORTFOLIO, CHILD_ENTITIES.GROWTH_IN_VALUE]
    case CHILD_ENTITIES.TOTAL_CONTRIBUTIONS:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.PORTFOLIO, CHILD_ENTITIES.TOTAL_CONTRIBUTIONS]

    case CHILD_ENTITIES.CHART_DATA:
      return (CHILD_ID) => [CHILD_ENTITIES.LIST_INDEX, [CHILD_ID], CHILD_ENTITIES.CHART_DATA]

    // ----- Store specific entity paths-----

    // ----- Utility paths -----
    case CHILD_ENTITIES.IS_OK:
      return () => ['sanity', CHILD_ENTITIES.IS_OK]
    case CHILD_ENTITIES.ERROR:
      return () => ['sanity', CHILD_ENTITIES.ERROR]
    case CHILD_ENTITIES.PROCESSING:
      return () => ['sanity', CHILD_ENTITIES.PROCESSING]
  }
}
