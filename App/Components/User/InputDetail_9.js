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
import { View, Text, KeyboardAvoidingView, Modal, Switch, Keyboard, ScrollView, LayoutAnimation, Dimensions, ActivityIndicator }
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
import { KeyboardAwareScrollView }
  from 'react-native-keyboard-aware-scroll-view'
import LWButton
  from '../Utility/LWButton'
import LWTextInput
  from '../Utility/LWFormInput'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {analytics}
  from '../../Config/AppConfig'
import TermsAccept
  from '../../Containers/User/TermsAccept'

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

class InputUserDetail_9 extends Component {

  componentWillMount () {
    this.updateFormValue(USER_ENTITIES.FAMILY_BROKERAGE_FLAG, false)
    this.updateFormValue(USER_ENTITIES.FAMILY_POLITICAL_FLAG, false)
    this.updateFormValue(USER_ENTITIES.STOCK_OWNER_FLAG, false)
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.USER_INPUT_DETAIL_9,
      properties: {}
    })
  }

  // ------------------------------------------------------------------------
  // action handlers

  updateFormValue (field, value) {
    const {localActions, handleLocalAction} = this.props
    handleLocalAction({type: localActions.UPDATE_FORM_VALUE, form: FORM_TYPES.ADD_USER, field: field, value: value})
  }

  navigateToNextScreen (data) {
    const {familyBrokerageFlag, familyPoliticalFlag, stockOwnerFlag} = data
    if (familyBrokerageFlag) {
      if (!data[USER_ENTITIES.STOCK_TICKER]) {
        return
      }
    }
    if (familyPoliticalFlag) {
      if (!data[USER_ENTITIES.POLITICAL_ASSOCIATED_RELATIVE]) {
        return
      }
      if (!data[USER_ENTITIES.POLITICAL_ORGANISATION]) {
        return
      }
    }
    if (stockOwnerFlag) {
      if (!data[USER_ENTITIES.STOCK_BROKERAGE_FIRM]) {
        return
      }
    }

    const {localActions, handleLocalAction, navigator, nextScreen, formData} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.IDENTITY_DATA]: formData})
  }

  // ------------------------------------------------------------------------
  // Family Brokerage Firm Relation

  renderBrokerageFields () {
    const {familyBrokerageFlag} = this.props
    return (
      <View style={{marginBottom: 36}}>
        <View>
          {this.renderLabel('Name of Brokerage Companies')}
          <View style={styles.screen.textInput.parentContainerStyle}>
            <Field name={USER_ENTITIES.STOCK_TICKER} accessible accessibilityLabel={'stockTicker'} component={LWTextInput} placeholderText='Enter the stock ticker(s)' />
          </View>
        </View>
      </View>
    )
  }

  renderBrokerageSwitch () {
    const {familyBrokerageFlag} = this.props
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 8}}>
            <Text style={{fontSize: 16, fontFamily: Fonts.type.regular, color: '#000', backgroundColor: 'transparent'}}>
              Do you or family member work for another brokerage firm?
            </Text>
          </View>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Switch
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              value={familyBrokerageFlag}
              onTintColor='rgb(1, 86, 79)'
              onValueChange={() => this.updateFormValue(USER_ENTITIES.FAMILY_BROKERAGE_FLAG, !this.props.familyBrokerageFlag)} />
          </View>
        </View>
        {!familyBrokerageFlag && this.renderHorizontalLine()}
        {familyBrokerageFlag && this.renderBrokerageFields()}
      </View>
    )
  }

  // ------------------------------------------------------------------------
  // Family Political Connection Relation

  renderPoliticalFields () {
    const {familyPoliticalFlag} = this.props
    return (
      <View style={{marginBottom: 36}}>
        <View>
          {this.renderLabel('Related political organization')}
          <View style={styles.screen.textInput.parentContainerStyle}>
            <Field name={USER_ENTITIES.POLITICAL_ORGANISATION} accessible accessibilityLabel={'politicalOrganisation'} component={LWTextInput} placeholderText='Name of Political Organisation' />
          </View>
        </View>
        <View>
          {this.renderLabel('Immediate relatives')}
          <View style={styles.screen.textInput.parentContainerStyle}>
            <Field name={USER_ENTITIES.POLITICAL_ASSOCIATED_RELATIVE} accessible accessibilityLabel={'politicalAssociatedRelative'} component={LWTextInput} placeholderText='Name(s) of immediate relatives' />
          </View>
        </View>
      </View>
    )
  }

  renderPoliticalSwitch () {
    const {familyPoliticalFlag} = this.props
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 8}}>
            <Text style={{fontSize: 16, fontFamily: Fonts.type.regular, color: '#000', backgroundColor: 'transparent'}}>
              Are you or your family member a political person or public officer?
            </Text>
          </View>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Switch
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              value={familyPoliticalFlag}
              onTintColor='rgb(1, 86, 79)'
              onValueChange={() => this.updateFormValue(USER_ENTITIES.FAMILY_POLITICAL_FLAG, !this.props.familyPoliticalFlag)} />
          </View>
        </View>
        {!familyPoliticalFlag && this.renderHorizontalLine()}
        {familyPoliticalFlag && this.renderPoliticalFields()}
      </View>
    )
  }

  // ------------------------------------------------------------------------
  // Family Shareholder Relation

  renderShareholderFields () {
    const {stockOwnerFlag} = this.props
    return (
      <View style={{marginBottom: 36}}>
        <View>
          {this.renderLabel('Name of Brokerage Companies')}
          <View style={styles.screen.textInput.parentContainerStyle}>
            <Field name={USER_ENTITIES.STOCK_BROKERAGE_FIRM} accessible accessibilityLabel={'stockBrokerageFirm'} component={LWTextInput} isLabel label='Brokerage Firm' placeholderText='Name of the brokerage firm' />
          </View>
        </View>
      </View>
    )
  }

  renderShareholderSwitch () {
    const {stockOwnerFlag} = this.props
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 8}}>
            <Text style={{fontSize: 16, fontFamily: Fonts.type.regular, color: '#000', backgroundColor: 'transparent'}}>
              Are you or a family member a senior executive, or 10% shareholder at a publically traded company?
            </Text>
          </View>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Switch
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              value={stockOwnerFlag}
              onTintColor='rgb(1, 86, 79)'
              onValueChange={() => this.updateFormValue(USER_ENTITIES.STOCK_OWNER_FLAG, !this.props.stockOwnerFlag)} />
          </View>
        </View>
        {!stockOwnerFlag && this.renderHorizontalLine()}
        {stockOwnerFlag && this.renderShareholderFields()}
      </View>
    )
  }

  // ------------------------------------------------------------------------
  // Next button

  renderLabel (title) {
    return (
      <View style={{marginBottom: 5}}>
        <Text style={{fontSize: Fonts.size.buttonLabel, color: '#FFF', backgroundColor: 'transparent', fontFamily: 'montserrat-semibold'}}>
          {title}
        </Text>
      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props
    return (
      <View style={{...styles.screen.containers.centeringContainer, marginTop: 32}}>
        <LWButton title='NEXT' onPress={handleSubmit(data => this.navigateToNextScreen(data))} buttonType={BUTTON_TYPES.DECISION_BUTTON} extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}} />
      </View>
    )
  }

  renderHorizontalLine () {
    return (
      <View style={{flexDirection: 'row', marginTop: 28, marginBottom: 28}}>
        <View style={{flex: 1, height: 1, backgroundColor: '#E6E6E6'}} />
      </View>
    )
  }

  renderMessage () {
    const {familyBrokerageFlag, familyPoliticalFlag, stockOwnerFlag} = this.props
    if (familyPoliticalFlag || familyPoliticalFlag || stockOwnerFlag) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 14, fontFamily: Fonts.type.regular, color: '#000', backgroundColor: 'transparent'}}>
            Separate multiple names with commas.
          </Text>
        </View>
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, fontFamily: Fonts.type.regular, color: '#000', backgroundColor: 'transparent'}}>
            It is likely none of these will apply to you.
          </Text>
        </View>
      )
    }
  }

  // ------------------------------------------------------------------------
  // Core render

  render () {
    return (
      <View style={{...styles.screen.containers.root, paddingLeft: 30, paddingRight: 30, backgroundColor: '#FFF'}}>
        <KeyboardAwareScrollView extraScrollHeight={32} resetScrollToCoords={{x: 0, y: 0}} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>

          <View style={{marginTop: 58}}>
            {this.renderPoliticalSwitch()}
          </View>

          <View>
            {this.renderBrokerageSwitch()}
          </View>

          <View>
            {this.renderShareholderSwitch()}
          </View>
          {this.renderMessage()}
          {this.renderNextButton()}
        </KeyboardAwareScrollView>
      </View>
    )
  }

}

InputUserDetail_9.propTypes = {
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

  formData: PropTypes.object.isRequired,

  // user id
  userID: PropTypes.string.isRequired,

  familyBrokerageFlag: PropTypes.bool.isRequired,
  familyPoliticalFlag: PropTypes.bool.isRequired,
  stockOwnerFlag: PropTypes.bool.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputUserDetail_9))

export default Screen
