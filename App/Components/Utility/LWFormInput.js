/* eslint-disable no-unused-vars */
/**
 * Created by demon on 7/1/18.
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
import {FormInput, Icon}
  from 'react-native-elements'
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
import GravityCapsule
  from '../Utility/GravityCapsule'
import LWButton
  from '../Utility/LWButton'
import LWTextInput
  from '../Utility/LWTextInput'
import {formatDOB}
  from '../../Utility/Formatter/inputFormatter'
import {validateDate}
  from '../../Utility/Transforms/Validator'
import {SPROUT}
  from '../../Utility/Mapper/Screens'

// ========================================================
// Core Class
// ========================================================

class LWFormInput extends Component {

  onTextChange (text, input) {
    const {textChangeListener, formatFoo} = this.props

    // call redux form listener
    if (formatFoo) {
      let t = formatFoo(text)
      // console.log('t ::: ', t, '\n:: ', text)
      input.onChange(t)
    } else {
      input.onChange(text)
    }

    // call the additional text change listener
    textChangeListener && textChangeListener(text)
  }

  render () {
    const {placeholderColor, iconName, iconCallback, showBorder, placeholderText, showIcon, extraTextStyle, extraStyle, isError, inputColor, alignment, blurHandler, input, meta, ...inputProps} = this.props
    const showError = isError && meta.submitFailed
    if (showIcon) {
      return (
        <View style={{borderColor: '#D7D7D7', borderBottomWidth: 1, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <FormInput
            {...inputProps}
            autoCorrect={false}
            value={input.value}
            onChangeText={text => this.onTextChange(text, input)}
            containerStyle={{marginLeft: 0, marginRight: 0, width: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}
            placeholder={placeholderText}
            placeholderTextColor='#D7D7D7'
            inputStyle={{color: 'rgb(0, 109, 87)', bottom: showBorder ? 5 : 0, fontFamily: 'Lato-Bold', fontSize: 18, ...extraTextStyle}}
          />
          <Icon name={iconName} size={28} onPress={() => iconCallback && iconCallback()} color='#D7D7D7' style={{marginBottom: showBorder ? 5 : 0}} underlayColor='transparent' />
        </View>
      )
    } else {
      return (
        <FormInput
          {...inputProps}
          autoCorrect={false}
          value={input.value}
          onChangeText={text => this.onTextChange(text, input)}
          containerStyle={{marginLeft: 0, marginRight: 0, width: 0, flex: 1, borderBottomWidth: showBorder ? 1 : 0, justifyContent: 'center', alignItems: 'center'}}
          placeholder={placeholderText}
          placeholderTextColor='#D7D7D7'
          inputStyle={{color: 'rgb(0, 109, 87)', bottom: showBorder ? 5 : 0, fontFamily: 'Lato-Bold', fontSize: 18, ...extraTextStyle}}
        />
      )
    }
  }
}

// ========================================================
// Prop Utility
// ========================================================

LWFormInput.propTypes = {
  // placeholder text
  placeholderText: PropTypes.string.isRequired,
  // extra styling provided to textinput
  extraStyle: PropTypes.object,
  // extra styling for input text
  extraTextStyle: PropTypes.object,
  // additional listener to text change; optional
  textChangeListener: PropTypes.func,
  // format function for input
  formatFoo: PropTypes.func,
  // is error ?
  isError: PropTypes.bool,
  // should show Icon
  showIcon: PropTypes.bool,
  // icon Name
  iconName: PropTypes.string,
  // icon callback
  iconCallback: PropTypes.func,
  // show border
  showBorder: PropTypes.bool
}

LWFormInput.defaultProps = {
  placholder: '',
  extraStyle: {},
  extraTextStyle: {},
  isError: false,
  showIcon: false,
  iconName: 'visibility',
  showBorder: true
}

// ========================================================
// Exporter
// ========================================================

export default LWFormInput
