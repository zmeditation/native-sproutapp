/* eslint-disable no-unused-vars,camelcase,no-trailing-spaces,jsx-indent-props,new-cap */
/**
 * User Input Detail Number 3.
 * - Phone Number
 * - Address
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
import { View, Text, KeyboardAvoidingView, Keyboard, ScrollView, FlatList, ActivityIndicator }
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES, SEGMENT_ACTIONS}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import {FormInput}
  from 'react-native-elements'
import CustomFormInput
  from '../Utility/CustomFormInput'
import CustomButton
  from '../Utility/CustomButton'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import {parseAddress}
  from '../../Utility/Transforms/Parsers'
import LinearGradient
  from 'react-native-linear-gradient'
import GravityCapsule
  from '../Utility/GravityCapsule'
import {googleAPI}
  from '../../Services/GoogleApi'
import AnimatedBoxList
  from '../Utility/AnimatedBoxList'
import { KeyboardAwareScrollView }
  from 'react-native-keyboard-aware-scroll-view'
import LWButton
  from '../Utility/LWButton'
import LWFormInput
  from '../Utility/LWFormInput'
import {formatPhone}
  from '../../Utility/Formatter/inputFormatter'
import {validatePhone}
  from '../../Utility/Transforms/Validator'
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

let formComponents = () => {
  return {
    [USER_ENTITIES.ADDRESS_LINE_1]: '',
    [USER_ENTITIES.ADDRESS_LINE_2]: '',
    [USER_ENTITIES.CITY]: '',
    [USER_ENTITIES.STATE]: '',
    [USER_ENTITIES.ZIP_CODE]: ''
  }
}

// ========================================================
// Core Component
// ========================================================

// Todo:-
// proper error handling
class InputUserDetail_3 extends Component {

  // -------------------------------------------------------
  // Lifecycle methods

  /*
    - introduces 'listData'
      to local state
   */
  constructor (props) {
    super(props)
    this.state = {
      listData: [],
      _line1Error: false,
      _cityError: false,
      _stateError: false,
      _zipcodeError: false,
      _phoneError: false
    }
  }

  markError (inputType, error) {
    switch (inputType) {
      case USER_ENTITIES.ADDRESS_LINE_1:
        this.setState({_line1Error: error})
        break
      case USER_ENTITIES.CITY:
        this.setState({_cityError: error})
        break
      case USER_ENTITIES.STATE:
        this.setState({_stateError: error})
        break
      case USER_ENTITIES.ZIP_CODE:
        this.setState({_zipcodeError: error})
        break
      case USER_ENTITIES.PHONE_NUMBER:
        this.setState({_phoneError: error})
        break
      default:
        this.setState({
          _line1Error: false,
          _cityError: false,
          _stateError: false,
          _zipcodeError: false,
          _phoneError: false
        })
    }
  }

  validate (type, val) {
    switch (type) {
      case USER_ENTITIES.ADDRESS_LINE_1:
        if (val) {
          this.markError(USER_ENTITIES.ADDRESS_LINE_1, false)
          return undefined
        } else {
          this.markError(USER_ENTITIES.ADDRESS_LINE_1, true)
          return 'ADDRESS LINE 1 Required'
        }
      case USER_ENTITIES.CITY:
        if (val) {
          this.markError(USER_ENTITIES.CITY, false)
          return undefined
        } else {
          this.markError(USER_ENTITIES.CITY, true)
          return 'CITY Required'
        }
      case USER_ENTITIES.STATE:
        if (val) {
          this.markError(USER_ENTITIES.STATE, false)
          return undefined
        } else {
          this.markError(USER_ENTITIES.STATE, true)
          return 'State Required'
        }
      case USER_ENTITIES.ZIP_CODE:
        if (val) {
          this.markError(USER_ENTITIES.ZIP_CODE, false)
          return undefined
        } else {
          this.markError(USER_ENTITIES.ZIP_CODE, true)
          return 'ZipCode Required'
        }
      case USER_ENTITIES.PHONE_NUMBER:
        if (validatePhone(val)) {
          this.markError(USER_ENTITIES.PHONE_NUMBER, true)
          return 'Phone Required'
        } else {
          this.markError(USER_ENTITIES.PHONE_NUMBER, false)
          return undefined
        }
    }
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.USER_INPUT_DETAIL_3,
      properties: {}
    })
  }

  // -------------------------------------------------------
  // action handlers

  navigateToNextScreen () {
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  changeField (field, value) {
    const {localActions, handleLocalAction} = this.props
    handleLocalAction({type: localActions.CHANGE_FIELD, form: FORM_TYPES.ADD_USER, field: field, value: value})
  }

  autoFill (obj) {
    let finalObj = Object.assign(new formComponents(), obj)
    let keys = Object.keys(finalObj)
    let addr1 = finalObj[USER_ENTITIES.ADDRESS_LINE_1]
    let addr2 = finalObj[USER_ENTITIES.ADDRESS_LINE_2]
    finalObj[USER_ENTITIES.ADDRESS_LINE_1] = addr1 + ' ' + addr2
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === USER_ENTITIES.ADDRESS_LINE_2) {
        continue
      }
      this.changeField(keys[i], finalObj[keys[i]])
    }
  }

  /*
    set List State :-
    - sets the state of
      the list as 's'
   */
  setListState (s) {
    this.setState({listData: s})
  }

  /*
    Text Change Listener :-
    - Custom Data listener for
      text address field 1
    - Responsible for communicating
      with google API and fetching
      auto-complete suggestions
   */
  textChangeListener (text) {
    try {
      googleAPI().autocomplete({input: text}).then(r => this.setListState(r.data.predictions)).catch(err => console.log('error : ', err))
    } catch (err) {
      console.warn('error while autocomplete : ', err.message)
    }
  }

  getPlaceDetail (place) {
    this.setListState([])
    let obj, fieldObj
    try {
      // check 'place' is alright
      if (!place || !place['place_id']) {
        throw new Error('missing parameter')
      }

      // fetch place detail
      googleAPI()
        .getDetail({placeid: place['place_id']})
        .then(response => { obj = response['data']['result']; fieldObj = parseAddress(obj); this.autoFill(fieldObj) })
        .catch(err => { console.log('error while getting place detail : ', err) })
    } catch (err) {
      console.log(' ###### error while getting place detail ###### ', err.message)
    }
  }

  /*
    blur handler :- (for 'address field 1')
    - objective is to flush the
      array list, to close the box
   */
  blurHandler () {
    this.setListState([])
  }

  // -------------------------------------------------------
  // render inner component

  renderFormContainer () {
    return (
      <View style={{marginTop: 40}}>

        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 12}}>
          <Field
            accessible accessibilityLabel={'addressLine1'}
            name={USER_ENTITIES.ADDRESS_LINE_1}
            component={LWFormInput}
            placeholderText='Address Line 1'
            returnKeyType='next'
            onSubmitEditing={() => this.navigateToNextScreen()}
            isError={this.state._line1Error}
            validate={val => this.validate(USER_ENTITIES.ADDRESS_LINE_1, val)}
            textChangeListener={this.textChangeListener.bind(this)} />
        </View>

        <AnimatedBoxList
          data={this.state.listData}
          touchHandler={this.getPlaceDetail.bind(this)} />

        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 12}}>
          <Field
            accessible accessibilityLabel={'addressLine2'}
            name={USER_ENTITIES.ADDRESS_LINE_2}
            component={LWFormInput}
            placeholderText='Address Line 2'
            returnKeyType='next'
            onSubmitEditing={() => this.navigateToNextScreen()} />
        </View>

        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 12}}>
          <Field
            accessible accessibilityLabel={'city'}
            name={USER_ENTITIES.CITY}
            component={LWFormInput}
            placeholderText='City'
            returnKeyType='next'
            isError={this.state._cityError}
            validate={val => this.validate(USER_ENTITIES.CITY, val)}
            onSubmitEditing={() => this.navigateToNextScreen()} />
        </View>

        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 12}}>
          <Field
            accessible accessibilityLabel={'state'}
            name={USER_ENTITIES.STATE}
            component={LWFormInput}
            placeholderText='State'
            returnKeyType='next'
            isError={this.state._stateError}
            validate={val => this.validate(USER_ENTITIES.STATE, val)}
            onSubmitEditing={() => this.navigateToNextScreen()}
            extraStyle={{marginRight: 4}} />
          <Field
            accessible accessibilityLabel={'zipCode'}
            name={USER_ENTITIES.ZIP_CODE}
            component={LWFormInput}
            keyboardType='numeric'
            placeholderText='Zip Code'
            returnKeyType='next'
            isError={this.state._zipcodeError}
            validate={val => this.validate(USER_ENTITIES.ZIP_CODE, val)}
            onSubmitEditing={() => this.navigateToNextScreen()}
            extraStyle={{marginLeft: 4}} />
        </View>

        <View style={{...styles.screen.textInput.parentContainerStyle, marginTop: 12}}>
          <Field
            accessible accessibilityLabel={'phoneNumber'}
            name={USER_ENTITIES.PHONE_NUMBER}
            component={LWFormInput}
            keyboardType='number-pad'
            placeholderText='Phone Number'
            returnKeyType='next'
            formatFoo={formatPhone}
            isError={this.state._phoneError}
            validate={val => this.validate(USER_ENTITIES.PHONE_NUMBER, val)}
            maxLength={18}
            onSubmitEditing={() => this.navigateToNextScreen()} />
        </View>

      </View>
    )
  }

  renderNextButton () {
    const {handleSubmit} = this.props
    return (
      <View style={{position: 'absolute', bottom: 32, left: 0, right: 0}}>
        <View style={styles.screen.containers.centeringContainer}>
          <LWButton
            title='Next'
            onPress={handleSubmit(data => this.navigateToNextScreen())}
            buttonType={BUTTON_TYPES.DECISION_BUTTON}
            extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}}
          />
        </View>
      </View>
    )
  }

  // -------------------------------------------------------
  // render core component

  render () {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{...styles.screen.containers.root}}
      >
        <View style={{...styles.screen.containers.root, paddingLeft: 20, paddingRight: 20, backgroundColor: '#FFF'}}>
          {this.renderFormContainer()}
          {this.renderNextButton()}
        </View>
      </KeyboardAwareScrollView>
    )
  }

}

InputUserDetail_3.propTypes = {
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

  // user ID
  userID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputUserDetail_3))

export default Screen
