/* eslint-disable no-unused-vars,no-trailing-spaces */
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
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
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

class InvestReady extends Component {

  // --------------------------------------------------------
  // Action handlers

  confirm () {
    const {handleLocalAction, localActions, navigator, childID, goalID} = this.props
    handleLocalAction({type: localActions.CONFIRM, [CHILD_ENTITIES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  skip () {
    const {handleLocalAction, localActions, navigator, childID, goalID} = this.props
    handleLocalAction({type: localActions.SKIP, [CHILD_ENTITIES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // --------------------------------------------------------
  // Child Components

  renderTextComponent () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 45, paddingRight: 45, marginTop: 20}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 20, color: '#9B9B9B', textAlign: 'center', backgroundColor: 'transparent'}}>
          Sign in to your bank account to start your investment plan
        </Text>
      </View>
    )
  }

  renderHeading () {
    return (
      <View style={{paddingLeft: 30, paddingRight: 30}}>
        <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 30, color: '#006B58', backgroundColor: 'transparent'}}>
          You’ll be ready to invest once we’ve connected your bank
        </Text>
      </View>
    )
  }

  renderImage () {
    return (
      <Image source={require('../../../Img/intermediateScreen/investReady.png')} style={{height: 200, width: 300, right: 10, bottom: 60}} />
    )
  }

  renderDecisionButtons () {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <LWButton title='Skip' onPress={() => this.skip()} buttonType={BUTTON_TYPES.VERTICAL_GROUP} extraStyle={{width: 150, height: 50, borderColor: '#E6E6E6', borderStyle: 'solid'}} />
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
    console.log('rendering invest ready screen')
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>
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

InvestReady.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // child id
  childID: PropTypes.string.isRequired,
  // goal id
  goalID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

export default InvestReady
