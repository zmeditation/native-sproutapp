/* eslint-disable no-unused-vars */
/**
 * Created by demon on 26/1/18.
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
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
import LWButton
  from '../Utility/LWButton'
import LinearGradient
  from 'react-native-linear-gradient'

// ========================================================
// Utility
// ========================================================

// ========================================================
// Core Component
// ========================================================

class SkipConfirm extends Component {

  // --------------------------------------------------------
  // Action handlers

  continue () {

  }

  back () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.BACK, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // --------------------------------------------------------
  // Child Components

  renderTextComponent () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 45, paddingRight: 45, marginTop: 30, marginBottom: 70}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 22, color: '#FFF9F6', textAlign: 'center', backgroundColor: 'transparent'}}>
          Connecting your bank now means we can start growing your money sooner.
        </Text>
      </View>
    )
  }

  renderHeading () {
    return (
      <View style={{paddingLeft: 30, paddingRight: 30}}>
        <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 32, color: '#FFF', backgroundColor: 'transparent'}}>
          Are you sure you {'\n'} want to skip?
        </Text>
      </View>
    )
  }

  renderDecisionButtons () {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 50}}>
        <LWButton title='Continue' onPress={() => this.continue()} buttonType={BUTTON_TYPES.VERTICAL_GROUP} extraStyle={{width: 150, height: 50, borderColor: '#FFF', borderStyle: 'solid'}} extraTextStyle={{color: '#FFF'}} />
        <LWButton title='Back' onPress={() => this.back()} buttonType={BUTTON_TYPES.DECISION_BUTTON} extraStyle={{width: 150, height: 50, backgroundColor: '#FFF'}} extraTextStyle={{color: '#00A776'}} />
      </View>
    )
  }

  // --------------------------------------------------------
  // Core Render Component

  render () {
    const {isProcessing} = this.props
    return (
      <LinearGradient
        colors={['rgb(128, 213, 109)', 'rgb(0, 174, 112)']}
        start={{x: 0.7, y: -0.4}} end={{x: 0, y: 0.2}}
        locations={[0.4, 1]}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.renderHeading()}
        {this.renderTextComponent()}
        {this.renderDecisionButtons()}
      </LinearGradient>
    )
  }

}

SkipConfirm.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired
}

// ========================================================
// Export
// ========================================================

export default SkipConfirm
