/* eslint-disable no-trailing-spaces,no-unused-vars,camelcase */
/**
 * User Input Detail 5
 * - Total user financial value
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
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
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

class InputUserDetail_7 extends Component {

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.USER_INPUT_DETAIL_7,
      properties: {}
    })
  }

  // --------------------------------------------------------
  // Action handlers

  navigateToNextScreen (userFinancialValue) {
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({
      type: localActions.NAVIGATE_TO_NEXT_SCREEN,
      'form': FORM_TYPES.ADD_USER,
      'field': USER_ENTITIES.USER_TOTAL_VALUE,
      'value': userFinancialValue,
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
          What is the total value of your assets less any debts?
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    return (
      <View style={{...styles.screen.containers.spreadAndCenteringContainer, marginTop: 29}}>
        {this.renderButton('Under $50K', '0-50000')}
        {this.renderButton('$50K-$100K', '50001-100000')}
        {this.renderButton('$100K-$200K', '100001-200000')}
        {this.renderButton('$200K-$500K', '200001-500000')}
        {this.renderButton('Over $500K', '500001-1000000')}
      </View>
    )
  }

  renderButton (userFinancialValue, valueCode) {
    return (
      <View style={styles.screen.containers.centeringContainer}>
        <LWButton
          title={userFinancialValue}
          onPress={() => this.navigateToNextScreen(valueCode)}
          buttonType={BUTTON_TYPES.VERTICAL_GROUP}
          extraStyle={{marginBottom: 45.75, borderStyle: 'solid', borderColor: '#E6E6E6', borderWidth: 2, width: 232, height: 44}}
          extraTextStyle={{fontFamily: Fonts.type.bold, fontSize: 16}}
        />
      </View>
    )
  }

  // --------------------------------------------------------
  // Core Render Component

  render () {
    return (
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{...styles.screen.containers.root, backgroundColor: '#FFF', paddingLeft: 20, paddingRight: 20}}
      >
        {this.renderHeading()}
        {this.renderFormContainer()}
      </ScrollView>
    )
  }

}

InputUserDetail_7.propTypes = {
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

  // userid
  userID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputUserDetail_7))

export default Screen
