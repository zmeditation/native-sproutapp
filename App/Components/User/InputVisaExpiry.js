/* eslint-disable no-unused-vars,camelcase,no-trailing-spaces */
/**
 * User Input Detail Number 2.
 * - Date of Birth
 *
 * Created by viktor on 27/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, KeyboardAvoidingView, Keyboard, ScrollView, Image, ActivityIndicator }
  from 'react-native'
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
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
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
import {formatDOB}
  from '../../Utility/Formatter/inputFormatter'
import {validateDate}
  from '../../Utility/Transforms/Validator'
var Moment = require('moment')

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.ADD_USER,
  destroyOnUnmount: false
})

// ========================================================
// Core Component
// ========================================================

class InputVisaExpiry extends Component {

  constructor (props) {
    super(props)
    this.state = {
      _visaExpiryError: false
    }
  }

  // --------------------------------------------------------
  // Action handlers

  navigateToNextScreen (data) {
    let d = data[USER_ENTITIES.VISA_EXPIRY]
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.VISA_EXPIRY]: d})
  }

  markError (inputType, error) {
    switch (inputType) {
      case USER_ENTITIES.VISA_EXPIRY:
        this.setState({_visaExpiryError: error})
        break
      default:
        this.setState({_visaExpiryError: false})
    }
  }

  validate (type, val) {
    console.log('--- going for --- :: ', type, val)
    switch (type) {
      case USER_ENTITIES.VISA_EXPIRY:
        if (validateDate(val)) {
          console.log('--- validation error ---')
          this.markError(USER_ENTITIES.VISA_EXPIRY, true)
          return 'VISA EXPIRY DATE SHOULD BE CORRECT'
        } else {
          console.log('--- NO validation error ---')
          this.markError(USER_ENTITIES.VISA_EXPIRY, false)
          return undefined
        }
    }
  }

  // --------------------------------------------------------
  // Child Components

  renderHorizontalLine () {
    return (
      <View style={styles.screen.horizontalLine.containerStyle}>
        <View style={styles.screen.horizontalLine.lineStyle} />
      </View>
    )
  }

  renderHeading () {
    return (
      <View style={styles.screen.h1.containerStyle}>
        <Text style={styles.screen.h1.textStyle}>
          What is the expiry date of your Visa
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    return (
      <View style={{marginTop: 65, paddingLeft: 20, paddingRight: 20}}>
        <View style={styles.screen.textInput.parentContainerStyle}>
          <Field name={USER_ENTITIES.VISA_EXPIRY} accessible accessibilityLabel={'visaExpiry'} component={LWTextInput} placeholderText='Date of Expiry (MM / DD / YYYY)' formatFoo={formatDOB} isError={this.state._visaExpiryError} keyboardType='number-pad' validate={val => this.validate(USER_ENTITIES.VISA_EXPIRY, val)} />
        </View>
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props
    return (
      <GravityCapsule floatValue={16}>
        <View style={styles.screen.containers.centeringContainer}>
          <LWButton
            title='Next'
            onPress={handleSubmit(data => this.navigateToNextScreen(data))}
            buttonType={BUTTON_TYPES.DECISION_BUTTON}
            extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}}
          />
        </View>
      </GravityCapsule>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    return (
      <ScrollView
        scrollEnabled={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{...styles.screen.containers.root, paddingRight: 20, paddingLeft: 20, backgroundColor: '#FFF'}}
      >
        {this.renderHeading()}
        {this.renderFormContainer()}
        {this.renderNextButton()}
      </ScrollView>
    )
  }

}

InputVisaExpiry.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // next screen to navigate
  nextScreen: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputVisaExpiry))

export default Screen
