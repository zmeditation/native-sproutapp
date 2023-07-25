/* eslint-disable no-unused-vars */
/**
 * Created by demon on 9/2/18.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, ActivityIndicator, WebView, Modal, TouchableOpacity }
  from 'react-native'
import {Icon}
  from 'react-native-elements'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES, PLAID_ACTIONS}
  from '../../Utility/Mapper/Common'

// ========================================================
// Utility
// ========================================================

// ========================================================
// Core Component
// ========================================================

class AboutUS extends Component {

  constructor (props) {
    super(props)
    this.state = {
      modalVisible: true
    }
  }

  dismissModal () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.POP_SCREEN, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  renderWebview () {
    return (
      <View style={{flex: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}} />
    )
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(91, 185, 115)'}}>
        <Modal
          animationType='slide'
          transparent
          visible={this.state.modalVisible}
        >
          <TouchableOpacity onPress={() => this.dismissModal()} style={{height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: '#000'}}>
              Close
            </Text>
          </TouchableOpacity>
          <WebView
            style={{flex: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderBottomWidth: 2}}
            onError={err => console.log('error: ', err)}
            onLoad={() => console.log('---- loaded ----')}
            canGoBack
            canGoForward
            source={{uri: `https://help.lovedwealth.com`}}
          />
        </Modal>
      </View>
    )
  }

}

AboutUS.propTypes = {
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

export default AboutUS
