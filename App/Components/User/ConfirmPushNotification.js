/* eslint-disable no-unused-vars,no-trailing-spaces,no-multiple-empty-lines */
/**
 * Created by demon on 24/11/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, KeyboardAvoidingView, Keyboard, ScrollView, TouchableOpacity, Image, ActivityIndicator }
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

// ========================================================
// Utility
// ========================================================

// ========================================================
// Core Component
// ========================================================

class ConfirmPushNotification extends Component {

  // --------------------------------------------------------
  // Action handlers

  confirm () {
    const {handleLocalAction, localActions, navigator, userID} = this.props
    handleLocalAction({type: localActions.CONFIRM, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.USER_ID]: userID})
  }

  skip () {
    const {handleLocalAction, localActions, navigator, userID} = this.props
    handleLocalAction({type: localActions.SKIP, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.USER_ID]: userID})
  }

  // --------------------------------------------------------
  // Child Components

  renderTextComponent () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 35, paddingRight: 35}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 20, color: '#006B58', textAlign: 'center', backgroundColor: 'transparent'}}>
          Allow push notification so we can keep you on track in achieving your kid's future
        </Text>
      </View>
    )
  }

  renderImage () {
    return (
      <Image source={require('../../../Img/intermediateScreen/notification.png')} style={{height: 180, width: 280, bottom: 60}} />
    )
  }

  renderDecisionButtons () {
    return (
      <View style={{flexDirection: 'row', position: 'absolute', bottom: 50, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
        <LWButton title='Now Now' onPress={() => this.confirm()} buttonType={BUTTON_TYPES.VERTICAL_GROUP} extraStyle={{width: 150, height: 50, borderColor: '#E6E6E6', borderStyle: 'solid'}} />
        <LWButton title='Confirm' onPress={() => this.skip()} buttonType={BUTTON_TYPES.DECISION_BUTTON} extraStyle={{width: 150, height: 50, backgroundColor: 'rgb(0, 174, 112)'}} />
      </View>
    )
  }

  // --------------------------------------------------------
  // Core Render Component

  render () {
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {this.renderImage()}
          {this.renderTextComponent()}
        </View>
        {this.renderDecisionButtons()}
      </View>
    )
  }

}

ConfirmPushNotification.propTypes = {
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

// ========================================================
// Export
// ========================================================

export default ConfirmPushNotification
