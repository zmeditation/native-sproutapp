/* eslint-disable no-unused-vars,no-trailing-spaces,padded-blocks,object-property-newline */
/**
 * Created by viktor on 13/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Alert, KeyboardAvoidingView, Keyboard, ScrollView, Image, ActivityIndicator, TouchableOpacity }
  from 'react-native'
import { Icon, Button }
  from 'react-native-elements'
import styles
  from './Styles/LoginPinStyle'
import globalStyle
  from '../../Themes/ApplicationStyles'
import {AUTH_ENTITIES, PIN_ACTION_TYPE, PIN_COMPONENT_TYPE}
  from '../../Utility/Mapper/Auth'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import Fonts
  from '../../Themes/Fonts'
import TouchID
  from 'react-native-touch-id'
import { USER_ENTITIES }
  from '../../Utility/Mapper/User'
import CodePush
  from 'react-native-code-push'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
import {CURRENT_VERSION, CURRENT_ENVIRONMENT}
  from '../../Config/AppConfig'
import {ENVIRONMENT}
  from '../../Config/contants'

// ========================================================
// Core Component
// ========================================================

class LoginPin extends Component {

  constructor (props) {
    super(props)
    this.state = {
      PIN: '',
      FIRST_PIN: this.props[AUTH_ENTITIES.PIN_COMPONENT_TYPE] === PIN_COMPONENT_TYPE.VERIFY ? this.props.firstPIN : '',
      PIN_COMPONENT_TYPE: this.props[AUTH_ENTITIES.PIN_COMPONENT_TYPE]
    }
  }

  componentDidMount () {
    if (CURRENT_ENVIRONMENT === ENVIRONMENT.DEV_1 || CURRENT_ENVIRONMENT === ENVIRONMENT.PROD || CURRENT_ENVIRONMENT === ENVIRONMENT.UAT_2) {
      CodePush.sync({updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE})
    }
    // todo: don't prompt during registration
    const {pinActionType} = this.props
    if (pinActionType === PIN_ACTION_TYPE.LOGIN) {
      this.authenticateTouchID()
    }
  }

  // --------------------------------------------------------
  // component action handlers

  // change component type
  toggleComponentType (newType) {
    this.setState({
      PIN_COMPONENT_TYPE: newType
    })
  }

  // called when 4 digits have
  // been entered
  submitPIN (PIN) {
    // proceed if pin length is 4
    if (PIN && PIN.length === 4) {
      switch (this.state.PIN_COMPONENT_TYPE) {

        case PIN_COMPONENT_TYPE.VERIFY : {
          let result = this.verifyPIN(PIN)

          if (result) {
            if (this.props[AUTH_ENTITIES.PIN_ACTION_TYPE] === PIN_ACTION_TYPE.LOGIN) {
              setTimeout(() => {
                if (result) {
                  this.loginSuccess()
                }
              }, 100)
            } else {
              setTimeout(() => {
                // set first pin as the entered pin
                this.setFirstPin('')
                // empty pin
                this.evaporatePIN()
                // change state to CONFIRM
                this.toggleComponentType(PIN_COMPONENT_TYPE.CREATE)
              }, 100)
            }
          } else {
            Alert.alert('Please enter correct passcode')
          }
          this.evaporatePIN()
        }
          break

        case PIN_COMPONENT_TYPE.CREATE: {
          setTimeout(() => {
            // set first pin as the entered pin
            this.setFirstPin(PIN)
            // empty pin
            this.evaporatePIN()
            // change state to CONFIRM
            this.toggleComponentType(PIN_COMPONENT_TYPE.CONFIRM)
          }, 100)
        }
          break

        case PIN_COMPONENT_TYPE.CONFIRM: {
          let result = this.verifyPIN(PIN)
          setTimeout(() => {
            if (result) {
              this.registerPIN(PIN)
            } else {
              Alert.alert('Your passcode didn\'t match')
              this.toggleComponentType(PIN_COMPONENT_TYPE.CREATE)
            }
            this.evaporatePIN()
          }, 100)
        }
          break
      }
    }
  }

  // register PIN
  registerPIN (PIN) {
    const {handleLocalAction, localActions, navigator, username} = this.props
    handleLocalAction({type: localActions.REGISTER_PIN, [AUTH_ENTITIES.PIN]: PIN, [USER_ENTITIES.EMAIL_ID]: username, [AUTH_ENTITIES.PIN_ACTION_TYPE]: this.props[AUTH_ENTITIES.PIN_ACTION_TYPE], [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // login success
  loginSuccess () {
    const {handleLocalAction, localActions, navigator, username} = this.props
    handleLocalAction({type: localActions.LOGIN_SUCCESS, [USER_ENTITIES.EMAIL_ID]: username, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // --------------------------------------------------------
  // PIN utility actions

  // set firstPin
  setFirstPin (newPin) {
    this.setState({FIRST_PIN: newPin})
  }

  // evaporte the login PIN
  evaporatePIN () {
    this.setState({PIN: ''})
  }

  addPIN (digit) {
    let PIN = this.state.PIN

    if (PIN.length < 4) {
      let newPin = this.state.PIN.concat(digit)
      this.setState(prevState => { return {PIN: newPin} })
      if (newPin.length === 4) {
        this.submitPIN(newPin)
      }
    }
  }

  trimPIN () {
    this.setState(prevState => { return {PIN: prevState.PIN.substring(0, prevState.PIN.length - 1)} })
  }

  /*
    verifies state.FIRST_PIN with given PIN
   */
  verifyPIN (PIN) {
    if (this.state.FIRST_PIN === PIN) {
      return true
    }
    return false
  }

  authenticate () {
    return TouchID.authenticate()
      .then(success => {
        this.loginSuccess()
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
  }

  // --------------------------------------------------------
  // local action handlers

  buttonPressed (num) {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: localActions.BUTTON_PRESSED, num: num})
  }

  toggleTouchID () {
    const {handleLocalAction, localActions, navigator} = this.props
    console.log('---- going for touch id now ----')
    // handleLocalAction({type: localActions.TOGGLE_TOUCH_ID, [COMMON_ENTITIES.NAVIGATOR]: navigator})
    this.authenticateTouchID()
  }

  handleLogout () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.LOGOUT, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  authenticateTouchID () {
    TouchID.isSupported()
      .then(() => this.authenticate())
      .catch(error => {
        Alert.alert('TouchID not supported, ', error.message)
      })
  }

  hideError () {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: localActions.HIDE_ERROR})
  }

  // --------------------------------------------------------
  // render child views

  renderButton (title) {
    return (
      <Button title={title.toString()} onPress={() => this.addPIN(title)} textStyle={styles.buttonTextStyle} buttonStyle={styles.buttonPadStyle} />
    )
  }

  renderTouchIcon () {
    const {isTouchID, pinActionType} = this.props
    if (pinActionType === PIN_ACTION_TYPE.LOGIN) {
      return (
        <TouchableOpacity style={{...styles.buttonPadStyle, width: 90, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.authenticateTouchID()}>
          <Icon name='fingerprint' color='#006B58' size={35} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={{...styles.buttonPadStyle, width: 90, justifyContent: 'center', alignItems: 'center'}} />
      )
    }
  }

  renderBackButton () {
    return (
      <Button icon={{name: 'keyboard-arrow-left', size: 30, color: '#006B58'}} onPress={() => this.trimPIN()} buttonStyle={{...styles.buttonPadStyle}} />
    )
  }

  renderDot () {
    let length = this.state.PIN.length

    let c = {
      1: length >= 1 ? '#006B58' : 'transparent',
      2: length >= 2 ? '#006B58' : 'transparent',
      3: length >= 3 ? '#006B58' : 'transparent',
      4: length >= 4 ? '#006B58' : 'transparent'
    }
    return (
      <View style={{...globalStyle.screen.containers.centeringContainer, flexDirection: 'row', marginTop: 40}}>
        <View style={{...styles.dot, backgroundColor: c[1]}} />
        <View style={{...styles.dot, backgroundColor: c[2]}} />
        <View style={{...styles.dot, backgroundColor: c[3]}} />
        <View style={{...styles.dot, backgroundColor: c[4]}} />
      </View>
    )
  }

  renderPadContainer () {
    return (
      <View style={globalStyle.screen.containers.root}>
        <View style={styles.verticalPadContainer}>
          <View style={{...styles.horizontalPadContainer}}>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1, borderRightWidth: 1}}>
              {this.renderButton(1)}
            </View>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1, borderRightWidth: 1}}>
              {this.renderButton(2)}
            </View>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1}}>
              {this.renderButton(3)}
            </View>
          </View>
          <View style={styles.horizontalPadContainer}>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1, borderRightWidth: 1}}>
              {this.renderButton(4)}
            </View>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1, borderRightWidth: 1}}>
              {this.renderButton(5)}
            </View>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1}}>
              {this.renderButton(6)}
            </View>
          </View>
          <View style={styles.horizontalPadContainer}>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1, borderRightWidth: 1}}>
              {this.renderButton(7)}
            </View>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1, borderRightWidth: 1}}>
              {this.renderButton(8)}
            </View>
            <View style={{...styles.cubeStyle, borderBottomWidth: 1}}>
              {this.renderButton(9)}
            </View>
          </View>
          <View style={styles.horizontalPadContainer}>
            <View style={{...styles.cubeStyle, borderRightWidth: 1}}>
              {this.renderTouchIcon()}
            </View>
            <View style={{...styles.cubeStyle, borderRightWidth: 1}}>
              {this.renderButton(0)}
            </View>
            <View style={{...styles.cubeStyle}}>
              {this.renderBackButton()}
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderLogout () {
    const {isLogout} = this.props
    console.log('is logout : ', isLogout)
    if (isLogout) {
      return (
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={this.handleLogout.bind(this)}>
            <Text style={{fontFamily: 'montserrat-regular'}}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.bottomContainer} />
      )
    }

  }

  renderHeading () {
    const {titles} = this.props
    const {PIN_COMPONENT_TYPE} = this.state
    const heading = titles[PIN_COMPONENT_TYPE]
    return (
      <View style={globalStyle.screen.h1.containerStyle}>
        <Text style={{...globalStyle.screen.h1.textStyle, color: '#006B58'}}>
          {heading}
        </Text>
      </View>
    )
  }

  renderIcon () {
    const actionType = this.props[AUTH_ENTITIES.PIN_ACTION_TYPE]
    const isLogin = actionType && actionType === PIN_ACTION_TYPE.LOGIN
    return (
      <View style={{...globalStyle.screen.containers.centeringContainer, position: 'absolute', top: 40, right: 20, left: 0}}>
        {isLogin &&
        <TouchableOpacity style={{width: 70, height: 40, justifyContent: 'center', alignItems: 'center', top: 0, right: 0, bottom: 0, position: 'absolute'}} onPress={() => this.handleLogout()}>
          <Text style={{fontFamily: Fonts.type.bold, fontSize: 15, color: '#006B58', backgroundColor: 'transparent'}}>
            Logout
          </Text>
        </TouchableOpacity>
        }
      </View>
    )
  }

  // --------------------------------------------------------
  // render core views

  render () {
    const {isLogout, processing, errorObj} = this.props
    if (errorObj) {
      Alert.alert('Try Again',
        errorObj.message,
        [
          {text: 'OK', onPress: () => this.hideError()}
        ],
        { cancelable: false }
      )
    }
    return (
      <View style={{...globalStyle.screen.containers.root, paddingLeft: 20, paddingRight: 20, paddingTop: this.props[AUTH_ENTITIES.PIN_ACTION_TYPE] === PIN_ACTION_TYPE.LOGIN ? 50 : 32, backgroundColor: '#FFF'}}>
        <ProcessingIndicator isProcessing={processing} />
        <View style={{flex: 4.5}}>
          {this.renderHeading()}
          {this.renderDot()}
        </View>
        <View style={{flex: 5.5, marginBottom: 20}}>
          {this.renderPadContainer()}
        </View>
        {this.renderIcon()}
      </View>
    )
  }
}

LoginPin.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-native-navigation
  navigator: PropTypes.object.isRequired,

  errorObj: PropTypes.object,

  // type of PIN activity needed :-
  // VERIFY, CREATE, CONFIRM
  [AUTH_ENTITIES.PIN_COMPONENT_TYPE]: PropTypes.string.isRequired,

  // if pin activity = VERIFY, then
  // mention it's type
  [AUTH_ENTITIES.PIN_ACTION_TYPE]: PropTypes.string.isRequired,

  // object having title as per pin
  // component type
  titles: PropTypes.object.isRequired,

  username: PropTypes.string.isRequired,

  firstPIN: PropTypes.string,

  isLogout: PropTypes.bool.isRequired,
  isTouchID: PropTypes.bool.isRequired,

  processing: PropTypes.bool.isRequired
}

LoginPin.defaultProps = {
  [AUTH_ENTITIES.PIN_COMPONENT_TYPE]: PIN_COMPONENT_TYPE.VERIFY,
  [AUTH_ENTITIES.PIN_VERIFICATION_TYPE]: PIN_ACTION_TYPE.LOGIN,
  titles: {
    [PIN_COMPONENT_TYPE.VERIFY]: 'Enter existing PIN',
    [PIN_COMPONENT_TYPE.CREATE]: 'Enter PIN',
    [PIN_COMPONENT_TYPE.CONFIRM]: 'Re-enter new PIN'
  },
  firstPIN: undefined,
  isLogout: true,
  isTouchID: true,
  processing: false
}

// ========================================================
// Export
// ========================================================

export default LoginPin
