/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 21/6/17.
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
import {reduxForm, Field, reset}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
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
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
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
  form: FORM_TYPES.ADD_CHILD,
  destroyOnUnmount: false
})

// ========================================================
// Core Component
// ========================================================

class AddChild extends Component {

  constructor (props) {
    super(props)
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
      name: SPROUT.ADD_CHILD_SCREEN,
      properties: {}
    })
  }

  // --------------------------------------------------------
  // Action handlers

  markError (inputType, error) {
    switch (inputType) {
      case CHILD_ENTITIES.FIRST_NAME:
        this.setState({_firstNameError: error})
        break
      case CHILD_ENTITIES.LAST_NAME:
        this.setState({_lastNameError: error})
        break
      case CHILD_ENTITIES.DOB:
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
      case CHILD_ENTITIES.FIRST_NAME:
        if (val) {
          this.markError(USER_ENTITIES.FIRST_NAME, false)
          return undefined
        } else {
          this.markError(USER_ENTITIES.FIRST_NAME, true)
          return 'FIRST NAME REQ'
        }
      case CHILD_ENTITIES.LAST_NAME:
        if (val) {
          this.markError(USER_ENTITIES.LAST_NAME, false)
          return undefined
        } else {
          this.markError(USER_ENTITIES.LAST_NAME, true)
          return 'LAST NAME REQ'
        }
      case CHILD_ENTITIES.DOB:
        if (validateDate(val)) {
          this.markError(USER_ENTITIES.DOB, true)
          return 'DOB REQUIRED PROPERLY'
        } else {
          this.markError(USER_ENTITIES.DOB, false)
          return undefined
        }
    }
  }

  navigateToNextScreen (data) {
    const {localActions, handleLocalAction, userID, identityData, navigator} = this.props
    let d = data[CHILD_ENTITIES.DOB]
    let date = Moment(d, 'MM/DD/YYYY')
    let now = Moment()
    let age = now.diff(date, 'years')
    let next = age > 21 ? localActions.NOTIFY_AGE_LIMITATION : localActions.SUBMIT_ADD_CHILD
    handleLocalAction({
      type: next,
      [CHILD_ENTITIES.FIRST_NAME]: data[CHILD_ENTITIES.FIRST_NAME],
      [CHILD_ENTITIES.LAST_NAME]: data[CHILD_ENTITIES.LAST_NAME],
      [CHILD_ENTITIES.DOB]: data[CHILD_ENTITIES.DOB],
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [USER_ENTITIES.USER_ID]: userID,
      [USER_ENTITIES.IDENTITY_DATA]: identityData
    })
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    return (
      <View style={styles.screen.h1.containerStyle}>
        <Text style={styles.screen.h1.textStyle}>
          What is your child's name and date of birth
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    const {handleSubmit} = this.props
    return (
      <View style={{marginTop: 27, paddingLeft: 20, paddingRight: 20}}>
        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 0}}>
          <Field name={CHILD_ENTITIES.FIRST_NAME} accessible accessibilityLabel={'firstName'} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNextScreen(data))} component={LWTextInput} autoFocus placeholderText="Child's first name" isError={this.state._firstNameError} validate={val => this.validate(CHILD_ENTITIES.FIRST_NAME, val)} extraStyle={{marginRight: 4}} />
        </View>
        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 30}}>
          <Field name={CHILD_ENTITIES.LAST_NAME} accessible accessibilityLabel={'lastName'} component={LWTextInput} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNextScreen(data))} placeholderText="Child's last name" isError={this.state._lastNameError} validate={val => this.validate(CHILD_ENTITIES.LAST_NAME, val)} extraStyle={{marginLeft: 4}} />
        </View>
        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 30}}>
          <Field name={CHILD_ENTITIES.DOB} accessible accessibilityLabel={'DOB'} component={LWTextInput} returnKeyType='next' onSubmitEditing={handleSubmit(data => this.navigateToNextScreen(data))} placeholderText="Child's Date of Birth (MM / DD / YYYY)" formatFoo={formatDOB} isError={this.state._DOBError} keyboardType='number-pad' validate={val => this.validate(CHILD_ENTITIES.DOB, val)} />
        </View>
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props

    return (
      <View style={{...styles.screen.containers.centeringContainer, position: 'absolute', bottom: 32, left: 0, right: 0}}>
        <LWButton title='Next' onPress={handleSubmit((data) => this.navigateToNextScreen(data))}
          buttonType={BUTTON_TYPES.DECISION_BUTTON} extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}}
        />
      </View>
    )
  }

  // --------------------------------------------------------
  // Render Core component

  render () {
    const {isProcessing} = this.props
    return (
      <ScrollView
        scrollEnabled={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{...styles.screen.containers.root, paddingLeft: 20, paddingRight: 20, backgroundColor: '#FFF'}}
      >
        <ProcessingIndicator isProcessing={isProcessing} />
        {this.renderHeading()}
        {this.renderFormContainer()}
        {this.renderNextButton()}
      </ScrollView>
    )
  }

}

AddChild.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  userID: PropTypes.string.isRequired,

  // user identity data
  identityData: PropTypes.object,

  isProcessing: PropTypes.bool.isRequired
}

AddChild.defaultProps = {
  isProcessing: false
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(AddChild))

export default Screen
