/* eslint-disable no-trailing-spaces */
/**
 * Created by demon on 16/10/17.
 */

/* eslint-disable no-unused-vars,camelcase */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, KeyboardAvoidingView, Keyboard, ScrollView, Image, ActivityIndicator, TextInput, Dimensions }
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FormInput}
  from 'react-native-elements'
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import CustomFormInput
  from '../Utility/CustomFormInput'
import GravityCapsule
  from '../Utility/GravityCapsule'
import LWButton
  from '../Utility/LWButton'
import LWTextInput
  from '../Utility/LWFormInput'
import {formatSSN}
  from '../../Utility/Formatter/inputFormatter'
import {validateSSN}
  from '../../Utility/Transforms/Validator'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {analytics}
  from '../../Config/AppConfig'

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.ADD_CHILD,
  destroyOnUnmount: false
})

// ========================================================
// Core Component
// ========================================================

class ChildSSN extends Component {

  constructor (props) {
    super(props)
    this.state = {
      _ssnError: false
    }
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.CHILD_SSN_SCREEN,
      properties: {}
    })
  }

  markError (inputType, error) {
    switch (inputType) {
      case CHILD_ENTITIES.SSN:
        this.setState({_ssnError: error})
        break
      default:
        this.setState({
          _ssnError: false
        })
    }
  }

  validate (type, val) {
    switch (type) {
      case CHILD_ENTITIES.SSN:
        if (validateSSN(val)) {
          this.markError(CHILD_ENTITIES.SSN, true)
          return 'SSN Required'
        } else {
          this.markError(CHILD_ENTITIES.SSN, false)
          return undefined
        }
    }
  }
  // --------------------------------------------------------
  // Action handlers

  navigateToNextScreen (data) {
    const {localActions, handleLocalAction, navigator, firstName, lastName, DOB, userID, emailID, identityData} = this.props
    handleLocalAction({
      type: localActions.SUBMIT_SSN,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [CHILD_ENTITIES.FIRST_NAME]: firstName,
      [CHILD_ENTITIES.LAST_NAME]: lastName,
      [CHILD_ENTITIES.DOB]: DOB,
      [CHILD_ENTITIES.SSN]: data[CHILD_ENTITIES.SSN],
      [USER_ENTITIES.USER_ID]: userID,
      [USER_ENTITIES.IDENTITY_DATA]: identityData,
      [USER_ENTITIES.EMAIL_ID]: emailID
    })
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
      <View style={{...styles.screen.h1.containerStyle}}>
        <Text style={{...styles.screen.h1.textStyle}}>
          What is your child's Social Security Number?
        </Text>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 16, marginTop: 32}}>
          We are required to collect this information under Federal Law.
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    return (
      <View style={{marginTop: 20, marginLeft: 20}}>
        <View style={{...styles.screen.textInput.parentContainerStyle}}>
          <Field name={CHILD_ENTITIES.SSN} accessible accessibilityLabel={'ssn'} component={LWTextInput} placeholderText="Your Child's SSN" maxLength={11} formatFoo={formatSSN} keyboardType='number-pad' isError={this.state._ssnError} validate={val => this.validate(CHILD_ENTITIES.SSN, val)} />
        </View>

        {this.renderSSNDetail()}
      </View>
    )
  }

  renderSSNDetail () {
    return (
      <View style={{marginTop: 10}}>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: 10, backgroundColor: 'transparent', color: '#000'}}>
          All transmitted date is encrypted and utilises SSL for your security.
        </Text>
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props
    return (
      <GravityCapsule floatValue={16}>
        <View style={styles.screen.containers.centeringContainer}>
          <LWButton
            title='SUBMIT'
            extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}}
            onPress={handleSubmit(data => this.navigateToNextScreen(data))}
            buttonType={BUTTON_TYPES.DECISION_BUTTON}
          />
        </View>
      </GravityCapsule>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    const {isProcessing} = this.props
    return (
      <ScrollView
        scrollEnabled={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{...styles.screen.containers.root, backgroundColor: '#FFF', paddingLeft: 30, paddingRight: 30}}
      >
        <ProcessingIndicator isProcessing={isProcessing} />
        {this.renderHeading()}
        {this.renderFormContainer()}
        {this.renderNextButton()}
      </ScrollView>
    )
  }
}

// ========================================================
// Prop verifiers
// ========================================================

ChildSSN.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // is add child processing
  isProcessing: PropTypes.bool.isRequired,

  userID: PropTypes.string.isRequired,
  identityData: PropTypes.object,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  DOB: PropTypes.string.isRequired,
  emailID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(ChildSSN))

export default Screen
