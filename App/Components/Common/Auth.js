/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 7/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Alert, KeyboardAvoidingView, Keyboard, ScrollView, Image, ActivityIndicator }
  from 'react-native'
import { Button, Icon }
  from 'react-native-elements'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import CustomFormInput
  from '../Utility/CustomFormInput'
import CustomButton
  from '../Utility/CustomButton'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import GravityCapsule
  from '../Utility/GravityCapsule'
import LWButton
  from '../Utility/LWButton'
import LWTextInput
  from '../Utility/LWFormInput'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
import {validateEmail, validatePassword, validatePasswordSchema}
  from '../../Utility/Transforms/Validator'

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.AUTH,
  destroyOnUnmount: false
})

// ========================================================
// Core Component
// ========================================================

class Auth extends Component {

  // --------------------------------------------------------
  // Lifecycle methods

  constructor (props) {
    super(props)
    this.state = {
      showPassword: false,
      _emailError: false,
      _passwordError: false,
      passwordSchema: undefined
    }
  }

  // --------------------------------------------------------
  // Action handlers

  togglePasswordVisibility () {
    this.setState(prevstate => {
      return {showPassword: !prevstate.showPassword}
    })
  }

  hideError () {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: localActions.HIDE_ERROR})
  }

  markError (inputType, error) {
    switch (inputType) {
      case AUTH_ENTITIES.EMAIL:
        this.setState({_emailError: error})
        break
      case AUTH_ENTITIES.PASSWORD:
        this.setState({_passwordError: error})
        break
      default:
        this.setState({
          _emailError: false,
          _passwordError: false
        })
    }
  }

  markPasswordSchema (val) {
    let schema = validatePasswordSchema(val)
    this.setState({passwordSchema: schema})
  }

  validate (type, val) {
    switch (type) {
      case AUTH_ENTITIES.EMAIL:
        if (validateEmail(val)) {
          this.markError(AUTH_ENTITIES.EMAIL, true)
          return 'Correct Email Needed'
        } else {
          this.markError(AUTH_ENTITIES.EMAIL, false)
          return undefined
        }
      case AUTH_ENTITIES.PASSWORD:
        this.markPasswordSchema(val)
        if (validatePassword(val)) {
          this.markError(AUTH_ENTITIES.PASSWORD, true)
          return 'MIN 6 Char pass needed'
        } else {
          this.markError(AUTH_ENTITIES.PASSWORD, false)
          return undefined
        }
    }
  }

  navigateToNext (data) {
    const {localActions, handleLocalAction, handleSubmit, navigator, isProcessing, type} = this.props
    let allOK
    if (type === AUTH_ENTITIES.SIGNUP) {
      const email = data[AUTH_ENTITIES.EMAIL]
      const emailConfirm = data[AUTH_ENTITIES.EMAIL_CONFIRM]
      allOK = email && emailConfirm && (email === emailConfirm)
    } else {
      allOK = true
    }

    if (allOK) {
      handleLocalAction({
        type: type,
        [AUTH_ENTITIES.EMAIL]: data[AUTH_ENTITIES.EMAIL],
        [AUTH_ENTITIES.PASSWORD]: data[AUTH_ENTITIES.PASSWORD],
        [COMMON_ENTITIES.NAVIGATOR]: navigator
      })
    } else {
      Alert.alert('Error', 'Please enter email/confirm email.')
    }
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    return (
      <View style={{...styles.screen.containers.centeringContainer, marginTop: 32}}>
        <Image source={require('../../../Img/icons/loginLogo.png')} style={{height: 65, width: 70}} />
      </View>
    )
  }

  renderFormContainer () {
    const {handleSubmit, type} = this.props
    return (
      <View style={{...styles.screen.containers.centeringContainer, marginTop: 60}}>

        <View style={styles.screen.textInput.parentContainerStyle}>
          <Field name={AUTH_ENTITIES.EMAIL} accessible accessibilityLabel={'emailID'} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNext(data))} autoCapitalize='none' component={LWTextInput} leftIcon leftIconName='mail-outline' placeholderText='Email' keyboardType='email-address' validate={val => this.validate(AUTH_ENTITIES.EMAIL, val)} isError={this.state._emailError} />
        </View>
        {
          (type === AUTH_ENTITIES.SIGNUP) && (
            <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 20}}>
              <Field name={AUTH_ENTITIES.EMAIL_CONFIRM} accessible accessibilityLabel={'emailVerify'} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNext(data))} autoCapitalize='none' component={LWTextInput} leftIcon leftIconName='mail-outline' placeholderText='Confirm email' keyboardType='email-address' />
            </View>
          )
        }
        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 20}}>
          <Field name={AUTH_ENTITIES.PASSWORD} accessible accessibilityLabel={'password'} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNext(data))} component={LWTextInput} showIcon iconName={this.state.showPassword ? 'visibility-off' : 'visibility'} iconCallback={() => this.togglePasswordVisibility()} secureTextEntry={!this.state.showPassword} placeholderText='Password' validate={val => this.validate(AUTH_ENTITIES.PASSWORD, val)} isError={this.state._passwordError} />
        </View>

      </View>
    )
  }

  renderPasswordDescription () {
    const {passwordSchema} = this.state
    console.log('schema :: ', passwordSchema)
    return (
      <View>
        <Text style={{fontFamily: 'Lato-Light', fontSize: 12, color: '#000', backgroundColor: 'transparent', marginTop: 10}}>
          Password must include: {'\n'}
        </Text>
        <Text style={{fontFamily: (passwordSchema && passwordSchema['characterRule']) ? 'Lato-Bold' : 'Lato-Light', fontSize: 12, color: '#000', backgroundColor: 'transparent', top: -10}}>
          - 8 characters {'\n'}
        </Text>
        <Text style={{fontFamily: (passwordSchema && passwordSchema['lowercaseRule']) ? 'Lato-Bold' : 'Lato-Light', fontSize: 12, color: '#000', backgroundColor: 'transparent', top: -20}}>
          - 1 lowercase character {'\n'}
        </Text>
        <Text style={{fontFamily: (passwordSchema && passwordSchema['uppercaseRule']) ? 'Lato-Bold' : 'Lato-Light', fontSize: 12, color: '#000', backgroundColor: 'transparent', top: -30}}>
          - 1 uppercae character {'\n'}
        </Text>
        <Text style={{fontFamily: (passwordSchema && passwordSchema['numberRule']) ? 'Lato-Bold' : 'Lato-Light', fontSize: 12, color: '#000', backgroundColor: 'transparent', top: -40}}>
          - 1 number {'\n'}
        </Text>
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props
    return (
      <View style={{position: 'absolute', bottom: 32, left: 0, right: 0}}>
        <View style={styles.screen.containers.centeringContainer}>
          <LWButton title='Next' buttonType={BUTTON_TYPES.DECISION_BUTTON} onPress={handleSubmit(data => this.navigateToNext(data))} extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}} />
        </View>
      </View>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    const {errorObj, isProcessing} = this.props
    if (errorObj) {
      Alert.alert(errorObj.code,
        errorObj.message,
        [
          {text: 'OK', onPress: () => this.hideError()}
        ],
        { cancelable: false }
      )
    }
    return (
      <ScrollView
        scrollEnabled={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{...styles.screen.containers.root, backgroundColor: '#FFF', paddingLeft: 35, paddingRight: 35}}
      >
        <ProcessingIndicator isProcessing={isProcessing} />
        {this.renderFormContainer()}
        {this.renderPasswordDescription()}
        {this.renderNextButton()}
      </ScrollView>
    )
  }

}

Auth.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-native-navigation
  navigator: PropTypes.object.isRequired,

  isProcessing: PropTypes.bool.isRequired,

  // type of authentication 'Login' or 'SignUp'
  type: PropTypes.string.isRequired,

  // heading as per signup/login
  heading: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

const Screen = connect()(form(Auth))

export default Screen
