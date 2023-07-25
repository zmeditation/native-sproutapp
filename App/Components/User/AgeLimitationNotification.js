/* eslint-disable no-unused-vars,no-trailing-spaces */
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
import { View, Text, KeyboardAvoidingView, Keyboard, ScrollView, Image, ActivityIndicator }
  from 'react-native'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LWButton
  from '../Utility/LWButton'
import LinearGradient
  from 'react-native-linear-gradient'

// ========================================================
// Core Component
// ========================================================

class AgeLimitationNotification extends Component {

  // --------------------------------------------------------
  // Inner components render

  renderHorizontalLine () {
    return (
      <View style={styles.screen.horizontalLine.containerStyle}>
        <View style={styles.screen.horizontalLine.lineStyle} />
      </View>
    )
  }

  renderHeading () {
    return (
      <View style={{...styles.screen.h1.containerStyle, marginBottom: 0}}>
        <Text style={{...styles.screen.h1.textStyle, fontSize: 32, color: '#006B58'}}>
          Sorry
        </Text>
      </View>
    )
  }

  renderDescription () {
    return (
      <View style={{...styles.screen.containers.centeringContainer, marginTop: 20, marginBottom: 40, paddingLeft: 30, paddingRight: 30}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 18, color: '#9B9B9B', backgroundColor: 'transparent', textAlign: 'center'}}>
          Sorry, you must be over 18 years old to create a Loved Wealth account. Contact support service for any queries at support@lovedwealth.com
        </Text>
      </View>
    )
  }

  renderBackButton () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LWButton
          title='Back'
          buttonType={BUTTON_TYPES.DECISION_BUTTON}
          extraStyle={{width: 300, height: 50, borderWidth: 1.5, borderColor: 'rgb(0, 174, 112)', backgroundColor: '#FFF'}}
          extraTextStyle={{color: 'rgb(0, 174, 112)'}}
        />
      </View>
    )
  }

  renderImage () {
    return (
      <View style={{flex: 5.5, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../../../Img/intermediateScreen/userSorry.png')} style={{width: 270, height: 165}} />
      </View>
    )
  }

  renderCover () {
    return (
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <Image source={require('../../../Img/intermediateScreen/circle4.png')} style={{position: 'absolute', top: 0, right: 0}} />
        <Image source={require('../../../Img/intermediateScreen/circle3.png')} style={{position: 'absolute', left: 0, bottom: 150}} />
        <Image source={require('../../../Img/intermediateScreen/circle2.png')} style={{position: 'absolute', bottom: 0, right: 40}} />
        <Image source={require('../../../Img/intermediateScreen/circle1.png')} style={{position: 'absolute', right: 40, top: 400}} />
      </View>
    )
  }

  // --------------------------------------------------------
  // Core component render

  render () {
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>
        {this.renderCover()}
        {this.renderImage()}
        <View style={{flex: 4.5}}>
          {this.renderHeading()}
          {this.renderDescription()}
          {this.renderBackButton()}
        </View>
      </View>
    )
  }

}

AgeLimitationNotification.propTypes = {
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

export default AgeLimitationNotification
