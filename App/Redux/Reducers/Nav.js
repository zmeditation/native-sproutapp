/* eslint-disable no-trailing-spaces,no-unused-vars */
/**
 * Created by victorchoudhary on 04/05/17.
 */

// ========================================================
// Import Entity mapping
// ========================================================

import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {AUTH_ENTITIES, PIN_ACTION_TYPE, PIN_COMPONENT_TYPE}
  from '../../Utility/Mapper/Auth'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import ApplicationStyles
  from '../../Themes/ApplicationStyles'

// ========================================================
// Import Reducers
// ========================================================

import {ChildTypes}
  from './ChildReducer'
import {AuthTypes}
  from './AuthReducer'
import {GoalTypes}
  from './GoalReducer'
import {UserTypes}
  from './UserReducer'
import {SettingTypes}
  from './SettingReducer'

export function nav (state = {}, action) {
  switch (action.type) {

    case AuthTypes.NAVIGATE: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.AUTHENTICATION_SCREEN,
        title: action[AUTH_ENTITIES.AUTH_TYPE],
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [AUTH_ENTITIES.AUTH_TYPE]: action[AUTH_ENTITIES.AUTH_TYPE]
        }
      })
    }
      break

    case AuthTypes.PROMPT_AUTH: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissModal()
      navigator.resetTo({
        screen: SPROUT.AUTH_SELECTOR_SCREEN,
        backButtonTitle: '',
        animated: true,
        animationType: 'fade',
        navigatorStyle: ApplicationStyles.hiddenNavbar
      })
    }
      break

    case AuthTypes.SIGNUP_SUCCESS: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]

      navigator.resetTo({
        screen: SPROUT.USER_INPUT_DETAIL_1,
        title: 'Create investment account',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [USER_ENTITIES.USER_ID]: action[USER_ENTITIES.USER_ID]
        }
      })
    }
      break

    case ChildTypes.ADD_CHILD_SUCCESS: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.resetTo({
        screen: SPROUT.SELECT_GOAL_SCREEN,
        title: 'Set a goal',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.FIRST_NAME]: action[CHILD_ENTITIES.FIRST_NAME],
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID]
        }
      })
    }
      break

    case ChildTypes.SUBMIT_CHILD_SSN: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.SELECT_GOAL_SCREEN,
        title: 'Set a goal',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.FIRST_NAME]: action[CHILD_ENTITIES.FIRST_NAME],
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID]
        }
      })
    }
      break

    case ChildTypes.CONFIRM_CHILD_SSN: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.SSN_CONFIRM,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar,
        passProps: {
          [USER_ENTITIES.USER_ID]: action[USER_ENTITIES.USER_ID],
          [CHILD_ENTITIES.FIRST_NAME]: action[CHILD_ENTITIES.FIRST_NAME],
          [CHILD_ENTITIES.LAST_NAME]: action[CHILD_ENTITIES.LAST_NAME],
          [CHILD_ENTITIES.DOB]: action[CHILD_ENTITIES.DOB],
          [USER_ENTITIES.IDENTITY_DATA]: action[USER_ENTITIES.IDENTITY_DATA]
        }
      })
    }
      break

    case ChildTypes.NAVIGATE_TO_CHILD_SSN: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.CHILD_SSN_SCREEN,
        title: 'Enter Child SSN',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [USER_ENTITIES.USER_ID]: action[USER_ENTITIES.USER_ID],
          [CHILD_ENTITIES.FIRST_NAME]: action[CHILD_ENTITIES.FIRST_NAME],
          [CHILD_ENTITIES.LAST_NAME]: action[CHILD_ENTITIES.LAST_NAME],
          [CHILD_ENTITIES.DOB]: action[CHILD_ENTITIES.DOB],
          [USER_ENTITIES.IDENTITY_DATA]: action[USER_ENTITIES.IDENTITY_DATA]
        }
      })
    }
      break

    case GoalTypes.GOAL_TYPE_SELECTED: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.ADD_GOAL_SCREEN,
        title: 'Set a new goal',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID]
        }
      })
    }
      break

    case GoalTypes.ADD_CUSTOM_GOAL_SUCCESS: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let title = action[COMMON_ENTITIES.NAVIGATOR_TITLE]
      let riskSelected = action[GOAL_ENTITIES.RISK_SELECTED]

      if (riskSelected) {
        navigator.resetTo({
          screen: SPROUT.PORTFOLIO_DETAIL,
          title: title,
          backButtonTitle: '',
          navigatorStyle: ApplicationStyles.header.containerStyle,
          passProps: {
            [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
            [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
            [COMMON_ENTITIES.NAVIGATOR_TITLE]: title
          }
        })
      } else {
        navigator.resetTo({
          screen: SPROUT.SELECT_RISK_SCREEN,
          title: title,
          backButtonTitle: '',
          navigatorStyle: ApplicationStyles.header.containerStyle,
          passProps: {
            [GOAL_ENTITIES.CID]: action[GOAL_ENTITIES.CID],
            [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
            [COMMON_ENTITIES.NAVIGATOR_TITLE]: title
          }
        })
      }
    }
      break

    case GoalTypes.GOAL_DURATION_SELECTION_NEEDED: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let title = action[COMMON_ENTITIES.NAVIGATOR_TITLE]
      navigator.push({
        screen: SPROUT.GOAL_DURATION_SELECTION_SCREEN,
        title: title,
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [COMMON_ENTITIES.NAVIGATOR_TITLE]: title,
          [GOAL_ENTITIES.GOAL_DURATION_TYPE]: action[GOAL_ENTITIES.GOAL_DURATION_TYPE]
        }
      })
    }
      break

    case GoalTypes.GOAL_DURATION_SELECTED: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let title = action[COMMON_ENTITIES.NAVIGATOR_TITLE]

      navigator.push({
        screen: SPROUT.COST_EXPECTED,
        title: title,
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [COMMON_ENTITIES.NAVIGATOR_TITLE]: title
        }
      })
    }
      break

    case GoalTypes.SELECT_RISK: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let title = action[COMMON_ENTITIES.NAVIGATOR_TITLE]

      navigator.push({
        screen: SPROUT.PORTFOLIO_DETAIL,
        title: title,
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [COMMON_ENTITIES.NAVIGATOR_TITLE]: title
        }
      })
    }
      break

    case GoalTypes.ADD_RISK: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let title = action[COMMON_ENTITIES.NAVIGATOR_TITLE]

      navigator.push({
        screen: SPROUT.GOAL_DURATION_SCREEN,
        title: title,
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [COMMON_ENTITIES.NAVIGATOR_TITLE]: title
        }
      })
    }
      break

    case GoalTypes.COST_EXPECTED_SELECTED: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let title = action[COMMON_ENTITIES.NAVIGATOR_TITLE]
      console.log('---- nav view --- :: ', action)
      navigator.push({
        screen: SPROUT.GOAL_AMOUNT_SCREEN,
        title: title,
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [COMMON_ENTITIES.NAVIGATOR_TITLE]: title
        }
      })
    }
      break

    case GoalTypes.GOAL_AMOUNT_SELECTED: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let title = action[COMMON_ENTITIES.NAVIGATOR_TITLE]

      navigator.push({
        screen: SPROUT.RECURRING_AMOUNT_SCREEN,
        title: title,
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [COMMON_ENTITIES.NAVIGATOR_TITLE]: title
        }
      })
    }
      break

    case GoalTypes.SHOW_INVEST: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      console.log('action inside show invest:: ', action)
      navigator.showLightBox({
        screen: SPROUT.INVEST,
        passProps: {
          [USER_ENTITIES.USER_ID]: action[USER_ENTITIES.USER_ID],
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [GOAL_ENTITIES.RECURRING_AMOUNT]: action[GOAL_ENTITIES.RECURRING_AMOUNT],
          [GOAL_ENTITIES.RECURRING_FREQUENCY]: action[GOAL_ENTITIES.RECURRING_FREQUENCY],
          [COMMON_ENTITIES.PARENT_NAVIGATOR]: navigator,
          [COMMON_ENTITIES.IS_STALE]: false
        },
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
      })
    }
      break

    case GoalTypes.HIDE_INVEST: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissLightBox()
    }
      break

    // case GoalTypes.TRANSFER: {
    //   let navigator = action[COMMON_ENTITIES.NAVIGATOR]
    //   navigator.dismissLightBox()
    // }
    //   break

    // case GoalTypes.TRANSFER_SUCCESS: {
    //   console.log('------- NAVIGATING NOW transfer success -------')
    //   let navigator = action[COMMON_ENTITIES.NAVIGATOR]
    //   navigator.resetTo({
    //     screen: SPROUT.CHILD_HOMEPAGE_CONTAINER_SCREEN,
    //     title: '',
    //     backButtonTitle: '',
    //     navigatorStyle: ApplicationStyles.hiddenNavbar
    //   })
    // }
    //   break

    // case GoalTypes.UPDATE_GOAL_SUCCESS: {
    //   let navigator = action[COMMON_ENTITIES.NAVIGATOR]
    //
    //   navigator.dismissLightBox()
    //   navigator.resetTo({
    //     screen: SPROUT.CHILD_HOMEPAGE_CONTAINER_SCREEN,
    //     title: '',
    //     backButtonTitle: '',
    //     navigatorStyle: ApplicationStyles.hiddenNavbar
    //   })
    // }
    //   break

    case UserTypes.FETCH_USER_DETAIL_SUCCESS: {
      console.log('-navigating to dashboard-:', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.resetTo({
        screen: SPROUT.CHILD_HOMEPAGE_CONTAINER_SCREEN,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar
      })
    }
      break

    case ChildTypes.ADD_NEW_GOAL: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]

      navigator.push({
        screen: SPROUT.SELECT_GOAL_SCREEN,
        title: 'Set a new goal',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID]
        }
      })
    }
      break

    case ChildTypes.SHOW_GOAL: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]

      navigator.showModal({
        screen: SPROUT.GOAL_HOMEPAGE_SCREEN,
        title: action[GOAL_ENTITIES.NAME],
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID]
        }
      })
    }
      break

    case ChildTypes.SHOW_CHILD: {
      console.log('navigating to child :: ', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.CHILD_VIEW_SCREEN,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID]
        }
      })
    }
      break

    case ChildTypes.POP_CHILD_VIEW: {
      console.log('---- navigating pop :: ', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.pop()
    }
      break

    case ChildTypes.HIDE_GOAL: {
      console.log('--- hide goal ----')
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissModal()
    }
      break

    case GoalTypes.INVEST_ON_GOAL: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]

      navigator.push({
        screen: SPROUT.RECURRING_AMOUNT_SCREEN,
        title: 'Goal Amount',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [GOAL_ENTITIES.IS_ONE_OFF_INVESTMENT_ONLY]: true
        }
      })
    }
      break

    case GoalTypes.NAVIGATE_TO_HOMEPAGE: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]

      navigator.dismissLightBox()
      navigator.resetTo({
        screen: SPROUT.CHILD_HOMEPAGE_CONTAINER_SCREEN,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar,
        animated: true,
        animationType: 'fade'
      })
    }
      break

    case ChildTypes.ADD_NEW_CHILD: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      console.log('nav ::: ', navigator)
      navigator.push({
        screen: SPROUT.ADD_CHILD_SCREEN,
        title: 'Who is it for?',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

    case UserTypes.NAVIGATE_TODO: {
      console.log('--- navigating todo :: ', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let screen = action[COMMON_ENTITIES.SCREEN_TYPE]
      navigator.push({
        screen: screen,
        title: 'new title',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [USER_ENTITIES.USER_ID]: action[USER_ENTITIES.USER_ID]
        }
      })
    }
      break

    case ChildTypes.NOTIFY_AGE_LIMITATION:
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.CHILD_AGE_LIMITATION,
        title: 'Error',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
      break

    case UserTypes.IDENTITY_CHECK_COMPLETE: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.showModal({
        screen: SPROUT.ACCEPT_TERMS_CONDITIONS,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar
      })
    }
      break

    case UserTypes.AGREE_TC: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.resetTo({
        screen: SPROUT.CONFIRM_PUSH_NOTIFICATION,
        title: 'Finalising account',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

    case UserTypes.DISAGREE_TC: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissModal({
        animationType: 'slide-down'
      })
    }
      break

    case UserTypes.CLOSE_TC: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissModal({
        animationType: 'slide-down'
      })
    }
      break

    case UserTypes.SET_PASSCODE: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.resetTo({
        screen: SPROUT.LOGIN_PIN,
        title: 'Finalising account',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [AUTH_ENTITIES.PIN_COMPONENT_TYPE]: PIN_COMPONENT_TYPE.CREATE,
          [AUTH_ENTITIES.PIN_ACTION_TYPE]: PIN_ACTION_TYPE.ON_BOARDING,
          titles: {
            [PIN_COMPONENT_TYPE.CREATE]: 'Create a new PIN',
            [PIN_COMPONENT_TYPE.CONFIRM]: 'Confirm your new PIN'
          }
        }
      })
    }
      break

    case AuthTypes.REGISTER_PIN_SUCCESS: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let pinActionType = action[AUTH_ENTITIES.PIN_ACTION_TYPE]
      switch (pinActionType) {
        case PIN_ACTION_TYPE.ON_BOARDING:
          navigator.resetTo({
            screen: SPROUT.CREATE_CHILD_NOTIFICATION,
            title: '',
            backButtonTitle: '',
            navigatorStyle: ApplicationStyles.hiddenNavbar
          })
          break
        case PIN_ACTION_TYPE.RESET_PASSWORD:
          navigator.pop()
          break
      }
    }
      break

    case UserTypes.NAVIGATE_USER_DETAIL_INPUT: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let residencyType = action[USER_ENTITIES.RESIDENCY_TYPE] || undefined
      navigator.push({
        screen: action[COMMON_ENTITIES.SCREEN_TYPE],
        title: 'Create investment account',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [USER_ENTITIES.RESIDENCY_TYPE]: residencyType
        }
      })
    }
      break

    case UserTypes.INITIATE_PLAID: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      console.log('-- navigating to plai :: ', action)
      navigator.showModal({
        screen: SPROUT.PLAID_CONNECT,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [COMMON_ENTITIES.PARENT_NAVIGATOR]: navigator
        }
      })
    }
      break

    case GoalTypes.NAVIGATE_TO_TRANSFER_SCREEN: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.INVEST_UNDERWAY,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID]
        }
      })
    }
      break

    case GoalTypes.CONFIRM_BANK_CONNECTION: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]

      navigator.push({
        screen: SPROUT.INVEST_READY,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID]
        }
      })
    }
      break

    case GoalTypes.SKIP_BANK_CONNECTION: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.SKIP_CONFIRM,
        title: '',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.hiddenNavbar
      })
    }
      break

    case GoalTypes.POP_SCREEN: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.pop({})
    }
      break

    case UserTypes.DISMISS_PLAID: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissModal({
        animationType: 'slide-down'
      })
    }
      break

    case AuthTypes.SHOW_TOUCH_ID: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.showLightBox({
        screen: SPROUT.TOUCH_ID,
        passProps: {
          [COMMON_ENTITIES.PARENT_NAVIGATOR]: navigator
        },
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
      })
    }
      break

    case AuthTypes.HIDE_TOUCH_ID: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissLightBox()
    }
      break

    case SettingTypes.SHOW_SETTINGS: {
      console.log('toggeling navigator')
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.toggleDrawer({
        side: 'left',
        animated: true,
        to: 'open'

      })
    }
      break

    case SettingTypes.HIDE_SETTINGS: {
      console.log('--- hidding settings ---')
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissModal({
        animationType: 'none'
      })
    }
      break

    case SettingTypes.SHOW_DOCUMENTS_SUCCESS: {
      console.log('--- showing documents --- : ', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.STATEMENTS,
        title: 'Statements',
        backButtonTitle: '',
        animated: true,
        animationType: 'fade',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

    case SettingTypes.SHOW_CONFIRMATIONS_SUCCESS: {
      console.log('--- showing confirmations --- : ', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.CONFIRMATIONS,
        title: 'Confirmations',
        backButtonTitle: '',
        animated: true,
        animationType: 'fade',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

    case SettingTypes.VIEW_TRANSFERS: {
      console.log('--- view transfers --- : ', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.VIEW_TRANSFERS,
        title: 'Regular Transfers',
        backButtonTitle: '',
        animated: true,
        animationType: 'fade',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

    case SettingTypes.VIEW_ACTIVITY: {
      console.log('--- view activity --- : ', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.ACTIVITY,
        title: 'User Activity',
        backButtonTitle: '',
        animated: true,
        animationType: 'fade',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

    case SettingTypes.SHOW_CONFIG: {
      console.log('--- show config --- : ', action)
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.SHOW_CONFIG,
        title: 'Configuration',
        backButtonTitle: '',
        animated: true,
        animationType: 'fade',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

    case UserTypes.OPEN_ARTICLE: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.showModal({
        screen: SPROUT.ARTICLE,
        navigatorStyle: ApplicationStyles.hiddenNavbar
      })
    }
      break

    case UserTypes.CLOSE_ARTICLE: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.dismissModal()
    }
      break

    case SettingTypes.NAVIGATE_TO_PROFILE: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.toggleDrawer()
      setTimeout(() => navigator.handleDeepLink({
        link: SPROUT.PROFILE,
        payload: '' // (optional) Extra payload with deep link
      }), 200)
    }
      break

    case SettingTypes.NAVIGATE_TO: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let screen = action[COMMON_ENTITIES.SCREEN_TYPE]
      if (screen === SPROUT.AUTH_SELECTOR_SCREEN) {
        navigator.resetTo({
          screen: screen,
          backButtonTitle: '',
          animated: true,
          animationType: 'fade',
          navigatorStyle: ApplicationStyles.hiddenNavbar
        })
      } else {
        navigator.push({
          screen: screen,
          title: 'Profile',
          backButtonTitle: '',
          animated: true,
          animationType: 'fade',
          navigatorStyle: ApplicationStyles.header.containerStyle
        })
      }
    }
      break

    case SettingTypes.NAVIGATE_DEEP: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      let screen = action[COMMON_ENTITIES.SCREEN_TYPE]
      navigator.toggleDrawer()
      setTimeout(() => navigator.handleDeepLink({
        link: screen,
        payload: '' // (optional) Extra payload with deep link
      }), 200)
    }
      break

    case SettingTypes.CHANGE_PIN: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.LOGIN_PIN,
        title: 'Profile',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [AUTH_ENTITIES.PIN_COMPONENT_TYPE]: PIN_COMPONENT_TYPE.VERIFY,
          [AUTH_ENTITIES.PIN_ACTION_TYPE]: PIN_ACTION_TYPE.RESET_PASSWORD,
          titles: {
            [PIN_COMPONENT_TYPE.VERIFY]: 'Enter existing PIN',
            [PIN_COMPONENT_TYPE.CREATE]: 'Enter new PIN',
            [PIN_COMPONENT_TYPE.CONFIRM]: 'Re-enter new PIN'
          },
          isLogout: false,
          isTouchID: false
        }
      })
    }
      break

    case SettingTypes.CHANGE_PASSWORD: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.push({
        screen: SPROUT.CHANGE_PASSWORD,
        title: 'Change Password',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

    case SettingTypes.PROCESS_CHANGE_PASSWORD_SUCCESS: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]
      navigator.pop()
    }
      break

    case SettingTypes.SHOW_RECURRING_WIDGET: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]

      navigator.push({
        screen: SPROUT.RECURRING_AMOUNT_SCREEN,
        title: 'Set Recurring Amount',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle,
        passProps: {
          [CHILD_ENTITIES.CHILD_ID]: action[CHILD_ENTITIES.CHILD_ID],
          [GOAL_ENTITIES.GID]: action[GOAL_ENTITIES.GID],
          [GOAL_ENTITIES.RECURRING_AMOUNT]: action[GOAL_ENTITIES.RECURRING_AMOUNT],
          [COMMON_ENTITIES.IS_STALE]: true
        }
      })
    }
      break

    case SettingTypes.SHOW_INVESTOR_QUESTIONS: {
      let navigator = action[COMMON_ENTITIES.NAVIGATOR]

      navigator.push({
        screen: SPROUT.INVESTOR_QUESTIONS,
        title: 'Investor Questions',
        backButtonTitle: '',
        navigatorStyle: ApplicationStyles.header.containerStyle
      })
    }
      break

  }
  return state
}
