/* eslint-disable no-trailing-spaces,no-unused-vars,camelcase */

/**
 * User Input Detail 5
 * - Employment Status
 *
 * Created by viktor on 28/7/17.
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
import {reduxForm}
  from 'redux-form'
import { connect }
  from 'react-redux'
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

class InputUserDetail_5 extends Component {

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.USER_INPUT_DETAIL_5,
      properties: {}
    })
  }

  // --------------------------------------------------------
  // Action handlers

  navigateToNextScreen (employmentType) {
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({
      type: localActions.NAVIGATE_TO_NEXT_SCREEN,
      'form': FORM_TYPES.ADD_USER,
      'field': USER_ENTITIES.EMPLOYMENT_TYPE,
      'value': employmentType,
      [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen,
      [COMMON_ENTITIES.NAVIGATOR]: navigator
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
      <View style={styles.screen.h1.containerStyle}>
        <Text style={{...styles.screen.h1.textStyle}}>
          What is your employment {'\n'} status?
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    return (
      <View style={styles.screen.containers.spreadAndCenteringContainer}>
        {this.renderButton('Employed', 'employed')}
        {this.renderButton('Unemployed', 'unemployed')}
        {this.renderButton('Student', 'student')}
        {this.renderButton('Retired', 'retired')}
      </View>
    )
  }

  renderButton (employmentType, code) {
    return (
      <View style={styles.screen.containers.centeringContainer}>
        <LWButton
          title={employmentType}
          onPress={() => this.navigateToNextScreen(code)}
          buttonType={BUTTON_TYPES.VERTICAL_GROUP}
          extraStyle={{marginBottom: 45.75, borderStyle: 'solid', borderColor: '#E6E6E6', borderWidth: 2, width: 232, height: 44}}
        />
      </View>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>
        <ScrollView
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.screen.containers.root}
        >
          {this.renderHeading()}
          {this.renderFormContainer()}
        </ScrollView>
      </View>
    )
  }

}

// ========================================================
// Prop verifiers
// ========================================================

InputUserDetail_5.propTypes = {
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
const Screen = connect()(form(InputUserDetail_5))

export default Screen
