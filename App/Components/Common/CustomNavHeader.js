/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 14/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, TouchableOpacity, Image }
  from 'react-native'
import { Button, Icon }
  from 'react-native-elements'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'

// ========================================================
// Utility
// ========================================================

const styles = {
  leftButtonContainer: {
    position: 'absolute',
    top: 44,
    left: 0,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightButtonContainer: {
    position: 'absolute',
    top: 44,
    right: 0,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

// ========================================================
// Left Header Button Component
// ========================================================

export class LeftHeader extends Component {

  toggleLeftPanel () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.TOGGLE_SETTINGS, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  render () {
    return (
      <TouchableOpacity onPress={this.toggleLeftPanel.bind(this)}>
        <Image source={require('../../../Img/icons/menuB1.png')} style={{height: 18, width: 18}} />
      </TouchableOpacity>
    )
  }
}

LeftHeader.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // navigator object
  navigator: PropTypes.object.isRequired
}

// ========================================================
// Right Header Button Component
// ========================================================

export class RightHeader extends Component {
  handleRightButton () {
    const {handleLocalAction, localActions, navigator} = this.props
    // handleLocalAction({type: localActions.HANDLE_RIGHT_BUTTON, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }
  render () {
    return (
      <TouchableOpacity onPress={this.handleRightButton.bind(this)} >
        <Image source={require('../../../Img/icons/menuB2.png')} style={{height: 18, width: 18}} />
      </TouchableOpacity>
    )
  }
}

RightHeader.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // navigator object
  navigator: PropTypes.object.isRequired
}
