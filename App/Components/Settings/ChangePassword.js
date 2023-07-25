/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 17/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Alert, KeyboardAvoidingView, Keyboard, ScrollView }
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
  from './Styles/ChangePasswordStyle'
import globalStyle
  from '../../Themes/ApplicationStyles'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import colors
  from '../../Themes/Colors'
import LWButton
  from '../Utility/LWButton'
import LWTextInput
  from '../Utility/LWFormInput'

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.RESET_PASSWORD
})

let PASSWORD_FIELD: {
  CURRENT: 'current',
  NEW_1: 'new1',
  NEW_2: 'new2'
}

// ========================================================
// Core Component
// ========================================================

class ResetPassword extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showCurrentPassword: false,
      showNewPassword1: false,
      showNewPassword2: false,
      _currentPasswordError: false,
      _newPasswordError: false
    }
  }

  // -------------------------------------------------------
  // Action Handlers

  toggleCurrentPassword1Visibility (field) {
    this.setState(prevstate => {
      return {showCurrentPassword: !prevstate.showCurrentPassword}
    })
  }

  toggleNewPassword1Visibility (field) {
    this.setState(prevstate => {
      return {showNewPassword1: !prevstate.showNewPassword1}
    })
  }

  toggleConfirmPassword1Visibility (field) {
    this.setState(prevstate => {
      return {showNewPassword2: !prevstate.showNewPassword2}
    })
  }

  hideError () {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: localActions.HIDE_ERROR})
  }

  // -------------------------------------------------------
  // Render children components

  renderFormContainer () {
    return (
      <View style={{...globalStyle.screen.containers.centeringContainer, marginTop: 30}}>
        <View style={{...globalStyle.screen.textInput.parentContainerStyle, marginTop: 20}}>
          <Field name={AUTH_ENTITIES.PASSWORD} accessible accessibilityLabel={'password'} component={LWTextInput} showIcon iconName={this.state.showCurrentPassword ? 'visibility-off' : 'visibility'} iconCallback={() => this.toggleCurrentPassword1Visibility()} secureTextEntry={!this.state.showCurrentPassword} placeholderText='Current Password' />
        </View>

        <View style={{...globalStyle.screen.textInput.parentContainerStyle, marginTop: 20}}>
          <Field name={AUTH_ENTITIES.NEW_PASSWORD} accessible accessibilityLabel={'newPassword1'} component={LWTextInput} showIcon iconName={this.state.showNewPassword1 ? 'visibility-off' : 'visibility'} iconCallback={() => this.toggleNewPassword1Visibility()} secureTextEntry={!this.state.showNewPassword1} placeholderText='New Password' />
        </View>

        <View style={{...globalStyle.screen.textInput.parentContainerStyle, marginTop: 20}}>
          <Field name={AUTH_ENTITIES.CONFIRM_NEW_PASSWORD} accessible accessibilityLabel={'newPassword2'} component={LWTextInput} showIcon iconName={this.state.showNewPassword2 ? 'visibility-off' : 'visibility'} iconCallback={() => this.toggleConfirmPassword1Visibility()} secureTextEntry={!this.state.showNewPassword2} placeholderText='Confirm New Password' />
        </View>
      </View>
    )
  }

  renderNextButton () {
    const {localActions, handleLocalAction, handleSubmit, navigator, isProcessing, email} = this.props
    return (
      <View style={{position: 'absolute', bottom: 50, left: 0, right: 0}}>
        <View style={globalStyle.screen.containers.centeringContainer}>
          <LWButton title='Change Password' buttonType={BUTTON_TYPES.DECISION_BUTTON} onPress={handleSubmit((data) => {
            handleLocalAction({
              type: localActions.INITIATE_CHANGE_PASSWORD,
              [AUTH_ENTITIES.EMAIL]: email,
              [AUTH_ENTITIES.NEW_PASSWORD]: data[AUTH_ENTITIES.NEW_PASSWORD],
              [AUTH_ENTITIES.PASSWORD]: data[AUTH_ENTITIES.PASSWORD],
              [COMMON_ENTITIES.NAVIGATOR]: navigator
            })
          }).bind(this)} extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}} />
        </View>
      </View>
    )
  }

  // -------------------------------------------------------
  // render Core component

  render () {
    const {errorObj} = this.props
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
      <View style={{flex: 1, backgroundColor: '#FFF', paddingLeft: 30, paddingRight: 30}}>
        {this.renderFormContainer()}
        {this.renderNextButton()}
      </View>
    )
  }

}

ResetPassword.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-native-navigation
  navigator: PropTypes.object.isRequired,

  isProcessing: PropTypes.bool.isRequired,

  email: PropTypes.string.isRequired,

  errorObj: PropTypes.object
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(ResetPassword))

export default Screen
