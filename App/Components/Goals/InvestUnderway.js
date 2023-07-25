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
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
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

  componentDidMount () {
    setTimeout(() => this.investNow(), 1000)
  }

  // --------------------------------------------------------
  // Action handlers

  investNow () {
    const {handleLocalAction, localActions, navigator, userID, childID, childIDs, goalID, oneOffInvestment, recurringAmount, recurringFrequency} = this.props
    handleLocalAction({type: localActions.INVEST,
      [USER_ENTITIES.USER_ID]: userID,
      [CHILD_ENTITIES.CHILD_ID]: childID,
      [GOAL_ENTITIES.GID]: goalID,
      [CHILD_ENTITIES.CHILD_IDs]: childIDs,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,     // pass parent navigator instead of current navigator
      [GOAL_ENTITIES.RECURRING_FREQUENCY]: recurringFrequency,
      [GOAL_ENTITIES.RECURRING_AMOUNT]: recurringAmount,
      [GOAL_ENTITIES.ONE_OFF_INVESTMENT]: oneOffInvestment
    })
  }

  // --------------------------------------------------------
  // Child Components

  renderTextComponent () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 45, paddingRight: 45, marginTop: 30}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 20, color: '#9B9B9B', textAlign: 'center', backgroundColor: 'transparent'}}>
          Your investments will be executed as part of our next trading window
        </Text>
      </View>
    )
  }

  renderHeading () {
    return (
      <View style={{paddingLeft: 30, paddingRight: 30}}>
        <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 30, color: '#006B58', backgroundColor: 'transparent'}}>
          Investing underway
        </Text>
      </View>
    )
  }

  renderImage () {
    return (
      <Image source={require('../../../Img/intermediateScreen/investingUnderway.png')} style={{height: 200, width: 300, right: 10, bottom: 60}} />
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
        <View style={{flex: 5, justifyContent: 'flex-end', alignItems: 'center'}}>
          {this.renderImage()}
        </View>
        <View style={{flex: 5, justifyContent: 'flex-start'}}>
          {this.renderHeading()}
          {this.renderTextComponent()}
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

  // user id
  userID: PropTypes.string.isRequired,
  // child id
  childID: PropTypes.string.isRequired,
  // goal id
  goalID: PropTypes.string.isRequired,
  // recurring amount frequency
  recurringFrequency: PropTypes.string.isRequired,
  // one off investment
  oneOffInvestment: PropTypes.number.isRequired,
  // recurring amount
  recurringAmount: PropTypes.number.isRequired,
  // child ids
  childIDs: PropTypes.array.isRequired
}

// ========================================================
// Export
// ========================================================

export default InvestReady
