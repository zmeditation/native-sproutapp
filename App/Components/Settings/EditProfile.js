/* eslint-disable no-unused-vars,no-trailing-spaces,spaced-comment */
/**
 * Created by demon on 9/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, TouchableOpacity, ScrollView, Image }
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import { Button, Icon }
  from 'react-native-elements'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import LinearGradient
  from 'react-native-linear-gradient'
import styles
  from '../../Themes/ApplicationStyles'
import LWFormInput
  from '../Utility/LWFormInput'
import Fonts
  from '../../Themes/Fonts'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
  from '../../Config/contants'

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.EDIT_PROFILE,
  destroyOnUnmount: false,
  touchOnBlur: false
})

// ========================================================
// Core Component
// ========================================================

class EditProfile extends Component {

  // ------------------------------------------------------------
  // Lifecycle methods

  constructor (props) {
    super(props)
    this.state = {
      showPassword: false,
      showPasscode: false
    }
  }

  componentWillMount () {
    const {firstName, lastName, passcode, password, emailID} = this.props
    this.setValue(USER_ENTITIES.FULL_NAME, firstName + ' ' + lastName)
    this.setValue(USER_ENTITIES.EMAIL_ID, emailID)
    this.setValue(AUTH_ENTITIES.PIN, passcode)
    this.setValue(AUTH_ENTITIES.PASSWORD, password)
  }

  // ------------------------------------------------------------
  // Action Handlers

  setValue (field, value) {
    const {localActions, handleLocalAction} = this.props
    handleLocalAction({type: localActions.SET_VALUE, form: FORM_TYPES.EDIT_PROFILE, field: field, value: value})
  }

  navigateToChangePassword () {
    const {localActions, handleLocalAction, navigator} = this.props
    handleLocalAction({type: localActions.CHANGE_PASSWORD, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  navigateToChangePin () {
    const {localActions, handleLocalAction, navigator} = this.props
    handleLocalAction({type: localActions.CHANGE_PIN, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  navigateToScreen (screen) {
    const {localActions, handleLocalAction, navigator} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: screen, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  togglePasswordVisibility () {
    this.setState(prevstate => {
      return {showPassword: !prevstate.showPassword}
    })
  }

  togglePasscodeVisibility () {
    this.setState(prevstate => {
      return {showPasscode: !prevstate.showPasscode}
    })
  }

  // ------------------------------------------------------------
  // child render methods

  renderDetailCube () {
    const {firstName, lastName} = this.props
    return (
      <View style={{marginTop: 60}}>

        <Text style={{fontFamily: Fonts.type.bold, fontSize: 22, color: '#006B58', backgroundColor: 'transparent'}}>
          {firstName} {lastName}
        </Text>

        <View style={{marginTop: 30}}>
          <Text style={{fontFamily: 'Lato-Light', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            Email Address
          </Text>
          <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 5}}>
            <Field name={USER_ENTITIES.EMAIL_ID} editable={false} accessible accessibilityLabel={'emailID'} component={LWFormInput} placeholderText='Email Address' extraTextStyle={{color: '#4A4A4A', fontFamily: Fonts.type.regular, fontSize: 20}} extraStyle={{marginRight: 4}} />
          </View>
        </View>

      </View>
    )
  }

  renderPasswordCube () {
    return (
      <View style={{marginTop: 60}}>

        <Text style={{fontFamily: Fonts.type.bold, fontSize: 22, color: '#006B58', backgroundColor: 'transparent'}}>
          Security
        </Text>

        <View style={{marginTop: 30}}>
          {this.renderInvestorButton('Change PIN', () => this.navigateToChangePin())}
        </View>

        <View style={{marginTop: 30}}>
          {this.renderInvestorButton('Change Password', () => this.navigateToChangePassword())}
        </View>

      </View>
    )
  }

  renderInvestorCube () {
    return (
      <View style={{marginTop: 60}}>

        <Text style={{fontFamily: Fonts.type.bold, fontSize: 22, color: '#006B58', backgroundColor: 'transparent'}}>
          Investor Profile
        </Text>

        <View style={{marginTop: 30}}>
          <Text style={{fontFamily: 'Lato-Light', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            Investor Type
          </Text>
          {this.renderInvestorButton('Moderate', () => this.navigateToScreen(SPROUT.USER_INPUT_DETAIL_8))}
        </View>

        <View style={{marginTop: 30}}>
          <Text style={{fontFamily: 'Lato-Light', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            Employement State
          </Text>
          {this.renderInvestorButton('Employed', () => this.navigateToScreen(SPROUT.USER_INPUT_DETAIL_5))}
        </View>

        <View style={{marginTop: 30}}>
          <Text style={{fontFamily: 'Lato-Light', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            Net income
          </Text>
          {this.renderInvestorButton('Over $100K', () => this.navigateToScreen(SPROUT.USER_INPUT_DETAIL_6))}
        </View>

        <View style={{marginTop: 30, marginBottom: 50}}>
          <Text style={{fontFamily: 'Lato-Light', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            Net Assets
          </Text>
          {this.renderInvestorButton('$50-$100', () => this.navigateToScreen(SPROUT.USER_INPUT_DETAIL_7))}
        </View>

      </View>
    )
  }

  renderInvestorButton (title, foo) {
    return (
      <TouchableOpacity onPress={() => foo()} style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, borderBottomWidth: 1, borderColor: '#D7D7D7'}}>
        <Text style={{color: '#4A4A4A', marginBottom: 10, fontFamily: Fonts.type.bold, fontSize: 20}}>
          {title}
        </Text>
        <Text style={{color: '#9B9B9B', fontFamily: Fonts.type.bold, fontSize: 25}}>
          >
        </Text>
      </TouchableOpacity>
    )
  }

  // ------------------------------------------------------------
  // Core render method

  render () {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: '#FFF', paddingLeft: 40, paddingRight: 40}}>
        {this.renderDetailCube()}
        {this.renderPasswordCube()}
        {this.renderInvestorCube()}
      </ScrollView>
    )
  }
}

EditProfile.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // navigator object
  navigator: PropTypes.object.isRequired,

  // firstname of user
  firstName: PropTypes.string.isRequired,
  // lastname of user
  lastName: PropTypes.string.isRequired,
  // passcode
  passcode: PropTypes.string.isRequired,
  // password
  password: PropTypes.string.isRequired,
  // email id of user
  emailID: PropTypes.string.isRequired
}

const Screen = connect()(form(EditProfile))

export default Screen

