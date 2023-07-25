/* eslint-disable no-unused-vars */
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
import { View, Text, Dimensions, KeyboardAvoidingView, Keyboard, ScrollView, TouchableOpacity, Image, ActivityIndicator }
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

class CreateChildNotification extends Component {

  // --------------------------------------------------------
  // Action handlers

  next () {
    const {handleLocalAction, localActions, navigator, userID} = this.props
    handleLocalAction({type: localActions.NEXT, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.USER_ID]: userID})
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 32, color: '#006B58', textAlign: 'center', backgroundColor: 'transparent'}}>
          You're all set!
        </Text>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 18, color: '#9B9B9B', textAlign: 'center', backgroundColor: 'transparent', marginTop: 30}}>
          Now let's setup your kids!
        </Text>
      </View>
    )
  }

  renderImage () {
    return (
      <Image source={require('../../../Img/intermediateScreen/allSet.png')} style={{height: 200, width: 300, marginTop: 40}} />
    )
  }

  renderDecisionButtons () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <LWButton title='Next' onPress={() => this.next()} buttonType={BUTTON_TYPES.DECISION_BUTTON} extraStyle={{width: 300, height: 50, backgroundColor: 'rgb(0, 174, 112)'}} />
      </View>
    )
  }

  renderFooter () {
    const {width} = Dimensions.get('window')
    return (
      <Image source={require('../../../Img/icons/waves.png')} style={{position: 'absolute', bottom: -100, left: 0, width: width, height: 200, zIndex: 100}} />
    )
  }

  // --------------------------------------------------------
  // Core Render Component

  render () {
    const {height, width} = Dimensions.get('window')
    const isSmall = height < 700
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF', zIndex: 50}}>
        <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', marginTop: 50, marginBottom: 50}}>
          <View style={{flex: 6, paddingTop: isSmall ? 0 : 30}}>
            {this.renderImage()}
          </View>
          <View style={{flex: 4, marginBottom: 90}}>
            {this.renderHeading()}
            {this.renderDecisionButtons()}
          </View>
        </View>
        {this.renderFooter()}
      </View>
    )
  }

}

CreateChildNotification.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  userID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

export default CreateChildNotification
