/* eslint-disable no-unused-vars,no-trailing-spaces,no-useless-constructor,handle-callback-err */

// ========================================================
// Import Packages
// ========================================================

import '../Config'
import React, {Component}
  from 'react'
import {AsyncStorage, TouchableOpacity, Image}
  from 'react-native'
import {Provider}
  from 'react-redux'
import createStore
  from '../Redux'
import {registerScreens}
  from '../Navigation/Screens'
import {Navigation}
  from 'react-native-navigation'
import {SPROUT}
  from '../Utility/Mapper/Screens'
import DB_ATTRIBUTES
  from '../Utility/Mapper/LocalDB'
import {USER_ENTITIES}
  from '../Utility/Mapper/User'
import {encodePasscode, decodePasscode, getCredentialLocalKey, decodeCredentials}
  from '../Utility/Transforms/Converter'
import {AUTH_ENTITIES, PIN_COMPONENT_TYPE, PIN_ACTION_TYPE}
  from '../Utility/Mapper/Auth'
import ApplicationStyles
  from '../Themes/ApplicationStyles'
import {AuthActions} from '../Redux/Reducers/AuthReducer'
import {UserActions} from '../Redux/Reducers/UserReducer'

// ========================================================
// Utility
// ========================================================

// create a new store
const store = createStore()

// register screens
registerScreens(store, Provider)

// ========================================================
// Core Module
// ========================================================

store.dispatch(AuthActions.fetchPin())

// Our custom component we want as a button in the nav bar
class CustomButton extends Component {
  render () {
    console.log('%%%%%%%%%%%%%% CUSTOM BUTTON RENDER %%%%%%%%%%%%%%%%%%')
    return (
      <TouchableOpacity
        onPress={() => console.log('pressed me!')}
      >
        <Image source={require('../../Img/icons/navIcon.png')} style={{height: 20, width: 30}} />
      </TouchableOpacity>
    )
  }
}

Navigation.registerComponent('CustomButton', () => CustomButton)

function startPasswordApp () {
  store.dispatch(AuthActions.fetchPinFailure())
  Navigation.startSingleScreenApp({
    screen: {
      screen: SPROUT.AUTH_SELECTOR_SCREEN,
      navigatorStyle: {...ApplicationStyles.hiddenNavbar, statusBarHidden: true},
      navigatorButtons: {
        leftButton: [
          {
            id: 'custom-button',
            component: 'CustomButton', // This line loads our component as a nav bar button item
            passProps: {
              text: 'Hi!'
            }
          }
        ]
      }
    },
    drawer: {
      left: {
        screen: SPROUT.SETTINGS_PANEL,
        fixedWidth: 300
      },
      style: {
        drawerShadow: true,
        contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
        leftDrawerWidth: 70, // optional, add this if you want a define left drawer width (50=percent)
        shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
      },
      type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
      animationType: 'slide', // optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
      // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
      disableOpenGesture: true // optional, can the drawer be opened with a swipe instead of button
    }
  })
}

function startPasscodeApp (passcodeEntry) {
  let passcode = passcodeEntry[DB_ATTRIBUTES.PASSCODE]
  let username = passcodeEntry[DB_ATTRIBUTES.USERNAME]
  store.dispatch(AuthActions.fetchPinSuccess(passcode))
  store.dispatch(UserActions.setUsername(username))

  Navigation.startSingleScreenApp({
    screen: {
      screen: SPROUT.LOGIN_PIN,
      title: 'LOGIN',
      navigatorStyle: ApplicationStyles.hiddenNavbar,
      navigatorButtons: {
        leftButtons: [
          {
            id: 'custom-button',
            component: 'CustomButton', // This line loads our component as a nav bar button item
            passProps: {
              text: 'Hi!'
            }
          }
        ]
      }
    },
    drawer: {
      left: {
        screen: SPROUT.SETTINGS_PANEL,
        fixedWidth: 300
      },
      style: {
        drawerShadow: true,
        contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
        leftDrawerWidth: 75, // optional, add this if you want a define left drawer width (50=percent)
        shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
      },
      type: 'TheSideBar', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
      animationType: 'door', // optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
      // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
      disableOpenGesture: true // optional, can the drawer be opened with a swipe instead of button
    },
    passProps: {
      [AUTH_ENTITIES.PIN_COMPONENT_TYPE]: PIN_COMPONENT_TYPE.VERIFY,
      [AUTH_ENTITIES.PIN_ACTION_TYPE]: PIN_ACTION_TYPE.LOGIN,
      titles: {
        [PIN_COMPONENT_TYPE.VERIFY]: 'Enter current PIN',
        [PIN_COMPONENT_TYPE.CREATE]: 'Create a new PIN',
        [PIN_COMPONENT_TYPE.CONFIRM]: 'Confirm your new PIN'
      }
    }
  })
}

let c = (function () {
  AsyncStorage.getItem(DB_ATTRIBUTES.LOGGED_IN_USERNAME, (err, username) => {
    if (username && username !== 'undefined') {
      // logged in user is present
      console.log('USERNAME FOUND : ', username)
      AsyncStorage.getItem(username, (err, passcodeEntry) => {
        let P = decodePasscode(passcodeEntry)
        if (P) {
          console.log('got passcode entry : ', P)
          startPasscodeApp(P)
        } else {
          startPasswordApp()
        }
      })
    } else {
      // start with login username/password screen
      // dispatch pin register  failure
      startPasswordApp()
    }
  })
})()
