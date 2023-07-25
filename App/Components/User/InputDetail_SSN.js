/* eslint-disable no-unused-vars,camelcase,no-trailing-spaces */
/**
 * Created by demon on 13/10/17.
 */

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
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
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
import {formatSSN}
  from '../../Utility/Formatter/inputFormatter'
import {validateSSN}
  from '../../Utility/Transforms/Validator'

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

class InputUserDetail_SSN extends Component {

  constructor (props) {
    super(props)
    this.state = {
      _ssnError: false
    }
  }

  markError (inputType, error) {
    switch (inputType) {
      case USER_ENTITIES.SSN:
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
      case USER_ENTITIES.SSN:
        if (validateSSN(val)) {
          this.markError(USER_ENTITIES.SSN, true)
          return 'SSN Required'
        } else {
          this.markError(USER_ENTITIES.SSN, false)
          return undefined
        }
    }
  }

  // --------------------------------------------------------
  // Action handlers

  navigateToNextScreen () {
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen, [COMMON_ENTITIES.NAVIGATOR]: navigator})
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
          What is your Social Security Number?
        </Text>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, backgroundColor: 'transparent', color: '#000', marginTop: 25}}>
          We are required to collect this information under Federal Law.
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    const {width} = Dimensions.get('window')
    return (
      <View style={{marginTop: 11, marginLeft: 20}}>
        <View style={styles.screen.textInput.parentContainerStyle}>
          <Field name={USER_ENTITIES.SSN} accessible accessibilityLabel={'ssn'} component={LWFormInput} maxLength={11} formatFoo={formatSSN} keyboardType='number-pad' placeholderText='Your SSN' isError={this.state._ssnError} validate={val => this.validate(USER_ENTITIES.SSN, val)} />
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
            title='Next'
            onPress={handleSubmit(data => this.navigateToNextScreen())}
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
        contentContainerStyle={{...styles.screen.containers.root, backgroundColor: '#FFF', paddingLeft: 40, paddingRight: 40}}
      >
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

InputUserDetail_SSN.propTypes = {
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
const Screen = connect()(form(InputUserDetail_SSN))

export default Screen
