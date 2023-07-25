/* eslint-disable no-unused-vars,camelcase,no-trailing-spaces */
/**
 * User Input Detail Number 3.
 * - SSN
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
import { Button, CheckBox }
  from 'react-native-elements'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES, SEGMENT_ACTIONS}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
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
import LWButton
  from '../Utility/LWButton'
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

class InputUserDetail_4 extends Component {

  // --------------------------------------------------------
  // Action Handlers

  componentWillMount () {
    const {residencyType} = this.props
  }

  navigateToNextScreen (residencyType) {
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({
      type: localActions.NAVIGATE_TO_NEXT_SCREEN,
      [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [USER_ENTITIES.RESIDENCY_TYPE]: residencyType,
      form: FORM_TYPES.ADD_USER,
      field: USER_ENTITIES.RESIDENCY_TYPE,
      value: residencyType
    })
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.USER_INPUT_DETAIL_4,
      properties: {}
    })
  }

  // --------------------------------------------------------
  // Inner components render

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
          I live in the US as a :
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    const {residencyType} = this.props
    return (
      <View style={styles.screen.containers.spreadAndCenteringContainer}>
        {this.renderButton('U.S. Citizen', USER_ENTITIES.CITIZEN)}
        {this.renderButton('Green Card Holder', USER_ENTITIES.GREENCARD)}
        {this.renderButton('Visa Holder', USER_ENTITIES.VISA)}
        {this.renderButton('Other', USER_ENTITIES.OTHER_RESIDENCY)}
      </View>
    )
  }

  renderButton (title, residencyType) {
    return (
      <View style={styles.screen.containers.centeringContainer}>
        <LWButton
          title={title}
          onPress={() => this.navigateToNextScreen(residencyType)}
          buttonType={BUTTON_TYPES.VERTICAL_GROUP}
          extraStyle={{marginBottom: 45.75, borderStyle: 'solid', borderColor: '#E6E6E6', borderWidth: 2, width: 232, height: 44}}
        />
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props
    return (
      <View style={{marginTop: 16}}>
        <CustomButton title='NEXT' onClick={handleSubmit(data => this.navigateToNextScreen())} />
      </View>
    )
  }

  // --------------------------------------------------------
  // Core component render

  render () {
    return (
      <ScrollView
        scrollEnabled={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{...styles.screen.containers.root}}
      >
        <View style={{...styles.screen.containers.root, paddingLeft: 20, paddingRight: 20, backgroundColor: '#FFF'}}>
          {this.renderHeading()}
          {this.renderFormContainer()}
        </View>
      </ScrollView>
    )
  }

}

InputUserDetail_4.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // user id
  userID: PropTypes.string.isRequired
}

InputUserDetail_4.defaultProps = {
  residencyType: USER_ENTITIES.CITIZEN
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputUserDetail_4))

export default Screen
