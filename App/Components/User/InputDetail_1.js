/* eslint-disable no-unused-vars,camelcase,no-trailing-spaces */
/**
 * User Input Detail Number 1.
 * - First Name
 * - Last Name
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
import { View, Text, Alert, KeyboardAvoidingView, Keyboard, ScrollView, Image, ActivityIndicator, TextInput, Dimensions }
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FormInput}
  from 'react-native-elements'
import {FORM_TYPES, SEGMENT_ACTIONS}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
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
import LWFormInput
  from '../Utility/LWFormInput'
import {formatDOB}
  from '../../Utility/Formatter/inputFormatter'
import {validateDate}
  from '../../Utility/Transforms/Validator'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {analytics}
  from '../../Config/AppConfig'
var Moment = require('moment')

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.ADD_USER,
  destroyOnUnmount: false,
  touchOnBlur: false
})

// ========================================================
// Core Component
// ========================================================

class InputUserDetail_1 extends Component {

  constructor (props) {
    super(props)
    // const d = convertDateToRequestFormat('01 / 01 / 1990')
    this.state = {
      _firstNameError: false,
      _lastNameError: false,
      _DOBError: false
    }
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.USER_INPUT_DETAIL_1,
      properties: {}
    })
  }

  // --------------------------------------------------------
  // Action handlers

  navigateToNextScreen (data) {
    const {localActions, handleLocalAction, navigator, nextScreen, handleSubmit} = this.props
    let d = data[USER_ENTITIES.DOB]
    let date = Moment(d, 'MM/DD/YYYY')
    let now = Moment()
    let age = now.diff(date, 'years')
    let next = age < 18 ? SPROUT.AGE_LIMITATION_NOTIFICATION : nextScreen
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: next, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  markError (inputType, error) {
    switch (inputType) {
      case USER_ENTITIES.FIRST_NAME:
        this.setState({_firstNameError: error})
        break
      case USER_ENTITIES.LAST_NAME:
        this.setState({_lastNameError: error})
        break
      case USER_ENTITIES.DOB:
        this.setState({_DOBError: error})
        break
      default:
        this.setState({
          _firstNameError: false,
          _lastNameError: false,
          _DOBError: false
        })
    }
  }

  validate (type, val) {
    switch (type) {
      case USER_ENTITIES.FIRST_NAME:
        if (val) {
          this.markError(USER_ENTITIES.FIRST_NAME, false)
          return undefined
        } else {
          this.markError(USER_ENTITIES.FIRST_NAME, true)
          return 'FIRST NAME REQ'
        }
      case USER_ENTITIES.LAST_NAME:
        if (val) {
          this.markError(USER_ENTITIES.LAST_NAME, false)
          return undefined
        } else {
          this.markError(USER_ENTITIES.LAST_NAME, true)
          return 'LAST NAME REQ'
        }
      case USER_ENTITIES.DOB:
        if (validateDate(val)) {
          this.markError(USER_ENTITIES.DOB, true)
          return 'DOB REQUIRED PROPERLY'
        } else {
          this.markError(USER_ENTITIES.DOB, false)
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
        <Text style={{...styles.screen.h1.textStyle}}>
          Your details
        </Text>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 14, color: '#9B9B9B', marginTop: 5}}>
          Please ensure these details match your ID
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    const {handleSubmit} = this.props
    return (
      <View style={{marginTop: 27}}>
        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 12}}>
          <Field name={USER_ENTITIES.FIRST_NAME} accessible accessibilityLabel={'firstName'} component={LWFormInput} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNextScreen(data))} autoFocus isError={this.state._firstNameError} placeholderText='Legal First Name' extraStyle={{marginRight: 4}} validate={val => this.validate(USER_ENTITIES.FIRST_NAME, val)} />
        </View>
        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 15}}>
          <Field name={USER_ENTITIES.LAST_NAME} component={LWFormInput} accessible accessibilityLabel={'lastName'} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNextScreen(data))} isError={this.state._lastNameError} placeholderText='Legal Last Name' extraStyle={{marginLeft: 4}} validate={val => this.validate(USER_ENTITIES.LAST_NAME, val)} />
        </View>
        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 15}}>
          <Field name={USER_ENTITIES.DOB} component={LWFormInput} accessible accessibilityLabel={'DOB'} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNextScreen(data))} formatFoo={formatDOB} isError={this.state._DOBError} placeholderText='Date of Birth (MM / DD / YYYY)' keyboardType='number-pad' validate={val => this.validate(USER_ENTITIES.DOB, val)} />
        </View>
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props
    return (
      <View style={{...styles.screen.containers.centeringContainer, position: 'absolute', bottom: 32, left: 0, right: 0}}>
        <LWButton
          title='Next'
          onPress={handleSubmit(data => this.navigateToNextScreen(data))}
          buttonType={BUTTON_TYPES.DECISION_BUTTON}
          extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}}
        />
      </View>
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
        contentContainerStyle={{...styles.screen.containers.root}}
      >
        <View style={{...styles.screen.containers.root, paddingLeft: 34, paddingRight: 34, backgroundColor: '#FFF'}}>
          {this.renderHeading()}
          {this.renderFormContainer()}
          {this.renderNextButton()}
        </View>
      </ScrollView>
    )
  }

}

// ========================================================
// Prop verifiers
// ========================================================

InputUserDetail_1.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // next screen to navigate
  nextScreen: PropTypes.string.isRequired,

  // user ID
  userID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputUserDetail_1))

export default Screen
