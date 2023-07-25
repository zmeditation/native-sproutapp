/* eslint-disable key-spacing,no-trailing-spaces */
/**
 * Created by viktor on 17/8/17.
 */

// ========================================================
// Auth Entities
// ========================================================

export const SETTINGS_ENTITIES = {

  // ----- BUSINESS entities -----

  // keeps track of root navigator,
  // as drawer navigator cannot
  // initiate navigation on root
  // navigator
  ROOT_NAVIGATOR: 'rootNavigator',

  RECURRING_DATA: 'recurringData',

  // ----- UTILITY entities -----

  IS_OK     : 'OK',
  // error related to goal module
  ERROR     : 'ERROR',
  // show error
  SHOW_ERROR: 'SHOW_ERROR',
  // processing index tag
  PROCESSING: 'PROCESSING',
  // processing change password
  PROCESSING_CHANGE_PASSWORD: 'processingChangePassword',
  // processing recurring data fetching from backend
  PROCESSING_RECURRING_DATA_FETCH : 'processingRecurringDataFetch',
  // processing fetching statements
  PROCESSING_FETCHING_STATEMENTS: 'processingFetchingStatements'
}

export function path (ENTITIY) {
  switch (ENTITIY) {

    // ----- Business entity paths -----

    case SETTINGS_ENTITIES.ROOT_NAVIGATOR:
      return () => [SETTINGS_ENTITIES.ROOT_NAVIGATOR]

    case SETTINGS_ENTITIES.RECURRING_DATA:
      return () => [SETTINGS_ENTITIES.RECURRING_DATA]

    // ----- Store specific entity paths-----

    // ----- Utility paths -----
    case SETTINGS_ENTITIES.IS_OK:
      return () => ['sanity', SETTINGS_ENTITIES.IS_OK]
    case SETTINGS_ENTITIES.ERROR:
      return () => ['sanity', SETTINGS_ENTITIES.ERROR]
    case SETTINGS_ENTITIES.SHOW_ERROR:
      return () => ['sanity', SETTINGS_ENTITIES.SHOW_ERROR]
    case SETTINGS_ENTITIES.PROCESSING:
      return () => ['sanity', SETTINGS_ENTITIES.PROCESSING]
  }
}
