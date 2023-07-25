/* eslint-disable key-spacing,no-trailing-spaces,no-multiple-empty-lines */
/**
 * Created by viktor on 4/6/17.
 */

// ========================================================
// ADD_GOAL Component
// ========================================================

// Entities
export const GOAL_ENTITIES = {

  GOALS: 'goals',
  // ----- BUSINESS entities -----

  // CHILD ID, for whom this goal belongs
  USER_ID : 'userID',

  CID     : 'childID',
  // GOAL ID,
  GID     : 'goalID',

  // Name of the goal
  NAME    : 'name',

  // total value of the goal
  GOAL_AMOUNT     : 'totalAmount',

  // cost expected
  COST_EXPECTED: 'costExpected',

  // goal's current balance
  BALANCE         : 'balance',

  // total contributions made
  TOTAL_CONTRIBUTIONS: 'totalContributions',

  // one of investment
  ONE_OFF_INVESTMENT: 'oneOffInvestment',

  // recurring amount of the goal
  RECURRING_AMOUNT: 'recurringAmount',

  // recurring frequency of the goal
  RECURRING_FREQUENCY: 'recurringFrequency',

  // growth in percentage of goal amount
  GROWTH_IN_PERCENTAGE: 'growthInPercentage',

  // growth in value of goal amount
  GROWTH_IN_VALUE: 'growthInValue',

  RETURNS: 'returns',

  // first transfer date of the recurring amount
  FIRST_TRANSFER_DATE: 'firstTransferDate',

  // transfer amount
  TRANSFER_AMOUNT: 'transferAmount',

  // goal duration type
  GOAL_DURATION_TYPE: 'goalDurationType',

  // is goal recurring payment set
  IS_RECURRING: 'isRecurring',

  // initial deposit for the goal
  INITIAL_DEPOSIT : 'initialDeposit',
  // Month
  MM      : 'MM',
  // Date
  DD      : 'DD',
  // Year
  YYYY    : 'YYYY',
  // Due date ( calculated by combining MM:DD:YYY
  DUE_DATE : 'dueDate',

  // Portfolio risk attached to goal
  PORTFOLIO_RISK: 'portfolioRisk',

  CHART_DATA: 'chartData',

  END_DATE: 'endDate',

  // transfer instructions over goal
  INSTRUCTIONS: 'instructions',
  // amount to be transferred
  INSTRUCTION_AMOUNT: 'instructionAmount',
  // frequency of amount to be transferred
  INSTRUCTION_FREQUENCY: 'instructionFrequency',
  // initial request time of instruction
  INSTRUCTION_INITIAL_REQUEST_TIME: 'instructionInitialRequestTime',
  // next transfer date of instruction
  INSTRUCTION_NEXT_TRANSFER_DATE: 'instructionNextTransferDate',

  // transfers detail
  TRANSACTIONS: 'transactions',
  // single transaction object
  TRANSACTION: 'transaction',

  TRANSACTION_REFERENCE_ID: 'transactionReferenceID',
  TRANSACTION_AMOUNT: 'transactionAmount',
  TRANSACTION_STATUS: 'transactionStatus',
  TRANSACTION_FREQUENCY: 'transactionFrequency',
  TRANSACTION_INITIAL_REQUEST_TIME: 'transactionInitialRequestTime',
  TRANSACTION_NEXT_TRANSFER_DATE: 'transactionNextTransferDate',

  // ----- Store specific entities -----
  GID_INDEX : 'GID_INDEX',
  CID_INDEX : 'CID_INDEX',
  CHILD_MAP : 'CHILD_MAP',
  GOAL_DATA : 'GOAL_DATA',

  RISK_SELECTED: 'riskSelected',

  // temporary variable for carrying
  // invest data locally
  INVEST_DATA: 'investData',

  // ----- UTILITY entities -----

  // are there any error's in goal module functioining
  IS_OK     : 'OK',
  // error related to goal module
  ERROR     : 'ERROR',
  // processing index tag
  PROCESSING: 'PROCESSING',
  // processing related tags
  ADD_CUSTOM_GOAL_PROCESSING : 'ADD_GOAL_PROCESSING',

  UPDATE_PARTIAL_GOAL_PROCESSING: 'UPDATE_PARTIAL_GOAL_PROCESSING',
  UPDATE_COMPLETE_GOAL_PROCESSING: 'UPDATE_COMPLETE_GOAL_PROCESSING',
  FETCH_GOAL_DETAIL_PROCESSING: 'FETCH_GOAL_DETAIL_PROCESSING',
  FETCH_GOAL_CHART_DATA_PROCESSING: 'FETCH_GOAL_CHART_DATA_PROCESSING',
  FETCH_TRANSFERS_HANDLER: 'FETCH_TRANSFERS_HANDLER',

  IS_ONE_OFF_INVESTMENT_ONLY: 'isOneOffInvestmentOnly'
}

// --------------------------------------------------------------------------------
// Path of Entities in STORE

export function path (ENTITIY) {
  switch (ENTITIY) {

    case GOAL_ENTITIES.GOALS:
      return () => [GOAL_ENTITIES.GOALS]

    case GOAL_ENTITIES.GID_INDEX :
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`]

    case GOAL_ENTITIES.CID_INDEX :
      return (CID) => [GOAL_ENTITIES.CHILD_MAP, `${CID}`]

    case GOAL_ENTITIES.CHILD_MAP:
      return () => [GOAL_ENTITIES.CHILD_MAP]

    case GOAL_ENTITIES.GID :
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.GID]

    case GOAL_ENTITIES.CID :
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.CID]

    case GOAL_ENTITIES.NAME :
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.NAME]

    case GOAL_ENTITIES.GOAL_AMOUNT:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.GOAL_AMOUNT]

    case GOAL_ENTITIES.PORTFOLIO_RISK:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.PORTFOLIO_RISK]

    case GOAL_ENTITIES.TOTAL_CONTRIBUTIONS:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TOTAL_CONTRIBUTIONS]

    case GOAL_ENTITIES.RECURRING_AMOUNT:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.RECURRING_AMOUNT]

    case GOAL_ENTITIES.RECURRING_FREQUENCY:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.RECURRING_FREQUENCY]

    case GOAL_ENTITIES.FIRST_TRANSFER_DATE:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.FIRST_TRANSFER_DATE]

    case GOAL_ENTITIES.BALANCE:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.BALANCE]

    case GOAL_ENTITIES.GROWTH_IN_PERCENTAGE:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.GROWTH_IN_PERCENTAGE]

    case GOAL_ENTITIES.GROWTH_IN_VALUE:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.GROWTH_IN_VALUE]

    case GOAL_ENTITIES.INITIAL_DEPOSIT:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.INITIAL_DEPOSIT]

    case GOAL_ENTITIES.CHART_DATA:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.CHART_DATA]

    case GOAL_ENTITIES.MM:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.MM]

    case GOAL_ENTITIES.DD:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.DD]

    case GOAL_ENTITIES.YYYY:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.YYYY]

    case GOAL_ENTITIES.DUE_DATE:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.DUE_DATE]

    case GOAL_ENTITIES.INSTRUCTIONS:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.INSTRUCTIONS]

    case GOAL_ENTITIES.TRANSACTIONS:
      return (GID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TRANSACTIONS]

    case GOAL_ENTITIES.TRANSACTION:
      return (GID, tID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TRANSACTIONS, `${tID}`]

    case GOAL_ENTITIES.TRANSACTION_REFERENCE_ID:
      return (GID, tID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TRANSACTIONS, `${tID}`, GOAL_ENTITIES.TRANSACTION_REFERENCE_ID]

    case GOAL_ENTITIES.TRANSACTION_AMOUNT:
      return (GID, tID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TRANSACTIONS, `${tID}`, GOAL_ENTITIES.TRANSACTION_AMOUNT]

    case GOAL_ENTITIES.TRANSACTION_STATUS:
      return (GID, tID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TRANSACTIONS, `${tID}`, GOAL_ENTITIES.TRANSACTION_STATUS]

    case GOAL_ENTITIES.TRANSACTION_FREQUENCY:
      return (GID, tID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TRANSACTIONS, `${tID}`, GOAL_ENTITIES.TRANSACTION_FREQUENCY]

    case GOAL_ENTITIES.TRANSACTION_INITIAL_REQUEST_TIME:
      return (GID, tID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TRANSACTIONS, `${tID}`, GOAL_ENTITIES.TRANSACTION_INITIAL_REQUEST_TIME]

    case GOAL_ENTITIES.TRANSACTION_NEXT_TRANSFER_DATE:
      return (GID, tID) => [GOAL_ENTITIES.GOALS, `${GID}`, GOAL_ENTITIES.TRANSACTIONS, `${tID}`, GOAL_ENTITIES.TRANSACTION_NEXT_TRANSFER_DATE]

    case GOAL_ENTITIES.IS_OK:
      return () => ['sanity', GOAL_ENTITIES.IS_OK]

    case GOAL_ENTITIES.ERROR:
      return () => ['sanity', GOAL_ENTITIES.ERROR]

    case GOAL_ENTITIES.PROCESSING:
      return () => ['sanity', GOAL_ENTITIES.PROCESSING]
  }
}


// --------------------------------------------------------------------------------

/*
  Path of Add Goal Entities
  {
    name,
    totalValue,
    initialDeposit,
    MM,
    DD,
    YYYY
  }
 */
export const ADD_GOAL_PATH = {}
ADD_GOAL_PATH[GOAL_ENTITIES.CID] = 'CID'
ADD_GOAL_PATH[GOAL_ENTITIES.NAME] = 'name'
ADD_GOAL_PATH[GOAL_ENTITIES.GOAL_AMOUNT] = 'totalValue'
ADD_GOAL_PATH[GOAL_ENTITIES.INITIAL_DEPOSIT] = 'initialDeposit'
ADD_GOAL_PATH[GOAL_ENTITIES.MM] = 'MM'
ADD_GOAL_PATH[GOAL_ENTITIES.DD] = 'DD'
ADD_GOAL_PATH[GOAL_ENTITIES.YYYY] = 'YYYY'

/*
  Path for Add Goal API Request
  {
    name,
    totalValue,
    initialDeposit,
    dueDate
  }
 */
export const ADD_GOAL_REQUEST_PATH = {}
ADD_GOAL_REQUEST_PATH[GOAL_ENTITIES.CID] = 'CID'
ADD_GOAL_REQUEST_PATH[GOAL_ENTITIES.NAME] = 'name'
ADD_GOAL_REQUEST_PATH[GOAL_ENTITIES.GOAL_AMOUNT] = 'totalValue'
ADD_GOAL_REQUEST_PATH[GOAL_ENTITIES.INITIAL_DEPOSIT] = 'initialDeposit'
ADD_GOAL_REQUEST_PATH[GOAL_ENTITIES.DUE_DATE] = 'dueDate'

export const ADD_GOAL_RESPONSE_PATH = {}
ADD_GOAL_RESPONSE_PATH[GOAL_ENTITIES.NAME] = 'name'
ADD_GOAL_RESPONSE_PATH[GOAL_ENTITIES.GOAL_AMOUNT] = 'totalValue'
ADD_GOAL_RESPONSE_PATH[GOAL_ENTITIES.INITIAL_DEPOSIT] = 'initialDeposit'
ADD_GOAL_RESPONSE_PATH[GOAL_ENTITIES.DUE_DATE] = 'dueDate'
ADD_GOAL_RESPONSE_PATH[GOAL_ENTITIES.CID] = 'CID'
ADD_GOAL_RESPONSE_PATH[GOAL_ENTITIES.GID] = 'GID'

export const VIEW_GOAL_PATH = {}
VIEW_GOAL_PATH[GOAL_ENTITIES.GID] = 'GID'
VIEW_GOAL_PATH[GOAL_ENTITIES.CID] = 'CID'

export const NAVIGATE_TO_EDIT_GOAL = {}
NAVIGATE_TO_EDIT_GOAL[GOAL_ENTITIES.GID] = 'GID'
NAVIGATE_TO_EDIT_GOAL[GOAL_ENTITIES.CID] = 'CID'

export const EDIT_GOAL_PATH = {}
EDIT_GOAL_PATH[GOAL_ENTITIES.CID] = 'CID'
EDIT_GOAL_PATH[GOAL_ENTITIES.GID] = 'GID'
EDIT_GOAL_PATH[GOAL_ENTITIES.NAME] = 'name'
EDIT_GOAL_PATH[GOAL_ENTITIES.GOAL_AMOUNT] = 'totalValue'
EDIT_GOAL_PATH[GOAL_ENTITIES.INITIAL_DEPOSIT] = 'initialDeposit'
EDIT_GOAL_PATH[GOAL_ENTITIES.MM] = 'MM'
EDIT_GOAL_PATH[GOAL_ENTITIES.DD] = 'DD'
EDIT_GOAL_PATH[GOAL_ENTITIES.YYYY] = 'YYYY'

export const EDIT_GOAL_REQUEST_PATH = {}
EDIT_GOAL_REQUEST_PATH[GOAL_ENTITIES.CID] = 'CID'
EDIT_GOAL_REQUEST_PATH[GOAL_ENTITIES.GID] = 'GID'
EDIT_GOAL_REQUEST_PATH[GOAL_ENTITIES.NAME] = 'name'
EDIT_GOAL_REQUEST_PATH[GOAL_ENTITIES.GOAL_AMOUNT] = 'totalValue'
EDIT_GOAL_REQUEST_PATH[GOAL_ENTITIES.INITIAL_DEPOSIT] = 'initialDeposit'
EDIT_GOAL_REQUEST_PATH[GOAL_ENTITIES.DUE_DATE] = 'dueDate'

export const EDIT_GOAL_RESPONSE_PATH = {}
EDIT_GOAL_RESPONSE_PATH[GOAL_ENTITIES.CID] = 'CID'
EDIT_GOAL_RESPONSE_PATH[GOAL_ENTITIES.GID] = 'GID'
EDIT_GOAL_RESPONSE_PATH[GOAL_ENTITIES.NAME] = 'name'
EDIT_GOAL_RESPONSE_PATH[GOAL_ENTITIES.GOAL_AMOUNT] = 'totalValue'
EDIT_GOAL_RESPONSE_PATH[GOAL_ENTITIES.INITIAL_DEPOSIT] = 'initialDeposit'
EDIT_GOAL_RESPONSE_PATH[GOAL_ENTITIES.DUE_DATE] = 'dueDate'
