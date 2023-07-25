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
import { View, Text, KeyboardAvoidingView, TextInput, Keyboard, ScrollView, Image, ActivityIndicator }
  from 'react-native'
import { Button, SocialIcon }
  from 'react-native-elements'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES, SEGMENT_ACTIONS}
  from '../../Config/contants'
import styles
  from './Styles/InputDetailStyle'
import CustomFormInput
  from '../Utility/CustomFormInput'
import CustomButton
  from '../Utility/CustomButton'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import GravityCapsule
  from '../Utility/GravityCapsule'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {analytics}
  from '../../Config/AppConfig'

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

class InputUserDetail_2 extends Component {

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.USER_INPUT_DETAIL_2,
      properties: {}
    })
  }

  navigateToNextScreen () {
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  renderFormContainer () {
    return (
      <View style={styles.FormContainer}>
        <View style={styles.FormStyle}>
          <Field name={USER_ENTITIES.DOB} accessible accessibilityLabel={'DOB'} component={CustomFormInput} keyboardType='numeric' placeholderText='Date of Birth' isLabel autoFocus label='Date of Birth' validate={(val) => val ? undefined : 'DOB required'} />
        </View>
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props
    return (
      <GravityCapsule floatValue={16}>
        <CustomButton title='NEXT' onClick={handleSubmit(data => this.navigateToNextScreen())} />
      </GravityCapsule>
    )
  }

  render () {
    return (
      <LinearGradient
        colors={['rgb(222, 197, 251)', 'rgb(145, 191, 213)']}
        start={{x: 0.0, y: 0.3}} end={{x: 0.0, y: 0.7}}
        style={styles.container}>
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={styles.container}
        >
          {this.renderFormContainer()}
        </ScrollView>
        {this.renderNextButton()}
      </LinearGradient>
    )
  }

}

InputUserDetail_2.propTypes = {
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

  // user id
  userID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputUserDetail_2))

export default Screen
