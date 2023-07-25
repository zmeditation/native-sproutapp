/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 1/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Keyboard, ScrollView, Image, ActivityIndicator }
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
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'

import SearchList from '../Utility/SearchList'
import countries from '../../Utility/countryList'

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

class InputCountryBorn extends Component {

  // --------------------------------------------------------
  // Action handlers

  navigateToNextScreen (name) {
    const {localActions, handleLocalAction, navigator, nextScreen, residencyType} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.RESIDENCY_TYPE]: residencyType, form: FORM_TYPES.ADD_USER, field: USER_ENTITIES.COUNTRY_BORN, value: name})
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    return (
      <View style={{...styles.screen.h1.containerStyle, marginTop: 40, marginBottom: 40}}>
        <Text style={styles.screen.h1.textStyle}>
          Where were you born?
        </Text>
      </View>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>
        {this.renderHeading()}
        <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
          <SearchList data={countries} touchHandler={this.navigateToNextScreen.bind(this)} />
        </View>

      </View>
    )
  }
}

InputCountryBorn.propTypes = {
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

  // residency type of user
  residencyType: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputCountryBorn))

export default Screen
