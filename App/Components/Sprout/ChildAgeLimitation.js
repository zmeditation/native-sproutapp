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
import { View, Text, KeyboardAvoidingView, Keyboard, ScrollView, Image, ActivityIndicator }
  from 'react-native'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
import LinearGradient
  from 'react-native-linear-gradient'

// ========================================================
// Core Component
// ========================================================

class ChildAgeLimitation extends Component {

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
      <View style={styles.screen.h1.containerStyle}>
        <Text style={styles.screen.h1.textStyle}>
          Sorry
        </Text>
      </View>
    )
  }

  renderDescription () {
    return (
      <View style={{...styles.screen.containers.centeringContainer, marginTop: 60}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 20, color: '#FFF', backgroundColor: 'transparent', textAlign: 'center'}}>
          Child's age should be {'\n'} less than 21.
        </Text>
      </View>
    )
  }

  // --------------------------------------------------------
  // Core component render

  render () {
    return (
      <LinearGradient
        colors={['#01564F', '#89C876', '#95D279', '#95D279', '#00A776']}
        start={{x: 0.9, y: -0.4}} end={{x: 0, y: 1}}
        locations={[0.0, 0.3, 0.4, 0.5, 1]}
        style={{...styles.screen.containers.root, paddingLeft: 20, paddingRight: 20}}>
        {this.renderHeading()}
        {this.renderHorizontalLine()}
        {this.renderDescription()}
      </LinearGradient>
    )
  }

}

ChildAgeLimitation.propTypes = {
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

export default ChildAgeLimitation
