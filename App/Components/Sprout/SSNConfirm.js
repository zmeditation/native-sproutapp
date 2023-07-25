/* eslint-disable no-unused-vars,no-trailing-spaces,no-multiple-empty-lines */
/**
 * Created by demon on 8/1/18.
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
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
import LWButton
  from '../Utility/LWButton'

// ========================================================
// Utility
// ========================================================

// ========================================================
// Core Component
// ========================================================

class SSNConfirm extends Component {

  // --------------------------------------------------------
  // Action handlers

  confirm () {
    const {localActions, handleLocalAction, navigator, firstName, lastName, DOB, userID, identityData} = this.props
    handleLocalAction({
      type: localActions.CONFIRM,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [CHILD_ENTITIES.FIRST_NAME]: firstName,
      [CHILD_ENTITIES.LAST_NAME]: lastName,
      [CHILD_ENTITIES.DOB]: DOB,
      [USER_ENTITIES.USER_ID]: userID,
      [USER_ENTITIES.IDENTITY_DATA]: identityData
    })
  }

  skip () {
    const {localActions, handleLocalAction, navigator, firstName, lastName, DOB, emailID, userID, identityData} = this.props
    handleLocalAction({
      type: localActions.SKIP,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [CHILD_ENTITIES.FIRST_NAME]: firstName,
      [CHILD_ENTITIES.LAST_NAME]: lastName,
      [CHILD_ENTITIES.DOB]: DOB,
      [USER_ENTITIES.USER_ID]: userID,
      [USER_ENTITIES.EMAIL_ID]: emailID,
      [USER_ENTITIES.IDENTITY_DATA]: identityData
    })
  }

  // --------------------------------------------------------
  // Child Components

  renderTextComponent () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 45, paddingRight: 45, marginTop: 30}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 16, color: '#9B9B9B', textAlign: 'center', backgroundColor: 'transparent'}}>
          There’s tax benefits by adding these details now. Otherwise you can update these details later.
        </Text>
      </View>
    )
  }

  renderHeading () {
    return (
      <View style={{paddingLeft: 30, paddingRight: 30}}>
        <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 32, color: '#006B58', backgroundColor: 'transparent'}}>
          Do you have your child’s SSN?
        </Text>
      </View>
    )
  }

  renderImage () {
    return (
      <Image source={require('../../../Img/intermediateScreen/childSSN.png')} style={{height: 210, width: 330, right: 10, bottom: 60}} />
    )
  }

  renderDecisionButtons () {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <LWButton title='Now Now' onPress={() => this.skip()} buttonType={BUTTON_TYPES.VERTICAL_GROUP} extraStyle={{width: 150, height: 50, borderColor: '#E6E6E6', borderStyle: 'solid'}} />
        <LWButton title='Confirm' onPress={() => this.confirm()} buttonType={BUTTON_TYPES.DECISION_BUTTON} extraStyle={{width: 150, height: 50, backgroundColor: 'rgb(0, 174, 112)'}} />
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
    const {isProcessing} = this.props
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>
        <ProcessingIndicator isProcessing={isProcessing} />
        <View style={{flex: 5, justifyContent: 'flex-end', alignItems: 'center'}}>
          {this.renderImage()}
        </View>
        <View style={{flex: 5, justifyContent: 'flex-start'}}>
          {this.renderHeading()}
          {this.renderTextComponent()}
          {this.renderDecisionButtons()}
        </View>
        {this.renderFooter()}
      </View>
    )
  }

}

SSNConfirm.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // is add child processing
  isProcessing: PropTypes.bool.isRequired,

  userID: PropTypes.string.isRequired,
  identityData: PropTypes.object,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  DOB: PropTypes.string.isRequired,
  emailID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

export default SSNConfirm
