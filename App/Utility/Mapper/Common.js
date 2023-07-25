/* eslint-disable key-spacing,no-trailing-spaces */
/**
 * Created by viktor on 21/6/17.
 */

// ========================================================
// ADD_GOAL Component
// ========================================================

// Entities
export const COMMON_ENTITIES = {
  START_JOURNEY: 'START_JOURNEY',

  // navigator object
  NAVIGATOR: 'navigator',
  // navigator title
  NAVIGATOR_TITLE: 'NAVIGATOR_TITLE',
  // parent navigator object; used to bypass lightbox
  // navigator object limitations
  PARENT_NAVIGATOR: 'PARENT_NAVIGATOR',
  // dispatch object
  DISPATCH: 'DISPATCH',
  // should reset navigation stack
  RESET_STACK: 'RESET_STACK',
  // stale option
  IS_STALE: 'IS_STALE',
  // can skip,
  CAN_SKIP: 'CAN_SKIP',
  // skip screen
  SKIP_SCREEN: 'SKIP_SCREEN',
  // type of screen
  SCREEN_TYPE: 'SCREEN_TYPE',
  // type of form
  FORM_TYPE: 'formType',
  // is real time fetch
  IS_REAL_TIME: 'isRealTime',

  // awaiting invest
  // i.e. flag to mark whether
  // if user is in middle of investing
  AWAITING_INVEST: 'awaitingInvest'
}

export const CUSTOM_LIST_ENTITIES = {
  SIMPLE  : 1,
  BULLET  : 2,
  GAP     : 3
}

export const GOAL_DURATION_TYPE = {
  AGE : 'Age',
  BIRTHDAY: 'Birthday',
  CHRISTMAS: 'Christmas',
  SOON: 'Soon',
  END_OF_SCHOOL_YEAR: 'End of School year',
  COLLEGE: 'College'
}

export const FREQUENCY = {
  ONE_YEAR: '1y',
  ONE_QUARTER: '1Q',
  ONE_MONTH: '1M',
  FORTNIGHT: '2w',
  ONE_WEEK: '1w',
  ONE_DAY: '1d',
  ONCE: 'once'
}

export const getPortfolio = (code) => {
  switch (code) {
    case '01': return {
      CODE: '01',
      NAME: 'Aggressive Portfolio'
    }
    case '02': return {
      CODE: '02',
      NAME: 'Moderate Portfolio'
    }
    case '03': return {
      CODE: '03',
      NAME: 'Conservative Portfolio'
    }
    case '04': return {
      CODE: '04',
      NAME: 'Homes, Hotels & Buildings'
    }
    case '05': return {
      CODE: '05',
      NAME: 'America\'s finest 500'
    }
    case '06': return {
      CODE: '06',
      NAME: 'Wareen Buffet\'s Berkshire Hathaway'
    }
    case '07': return {
      CODE: '07',
      NAME: 'Brands I Love'
    }
    case '08': return {
      CODE: '08',
      NAME: 'Municipal Bonds'
    }
    case '09': return {
      CODE: '09',
      NAME: 'Small But Nimble Companies'
    }
    case '10': return {
      CODE: '10',
      NAME: 'The Future Society'
    }
    default: return {
      CODE : '0',
      NAME : ''
    }
  }
}

export const PLAID_ACTIONS = {
  ACKNOWLEDGED : 'acknowledged',
  CONNECTED: 'connected',
  EXIT: 'exit'
}

export const BUTTON_TYPES = {
  DECISION_BUTTON: 'decisionButton',
  VERTICAL_GROUP: 'verticalGroup'
}

export const DEVICE_LOGICAL_RESOLUTION = {
  IPHONE_DEVICE_X: {
    height: 812,
    width: 375
  },
  IPHONE_DEVICE_PLUS : {
    height: 736,
    width: 414
  },
  IPHONE_DEVICE: {
    height: 667,
    width: 375
  },
  IPHONE_DEVICE_SE: {
    height: 568,
    width: 320
  }
}
