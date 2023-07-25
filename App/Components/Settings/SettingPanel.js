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
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import LinearGradient
  from 'react-native-linear-gradient'
import styles
  from './Styles/SettingPanelStyle'
import {CURRENT_VERSION}
  from '../../Config/AppConfig'
import ArrowButton from '../Utility/ArrowButton'
import Communications from 'react-native-communications'

// ========================================================
// Left Header Button Component
// ========================================================

class SettingPanel extends Component {

  navigateDeep (screen) {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.NAVIGATE_DEEP, [COMMON_ENTITIES.SCREEN_TYPE]: screen, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  logout () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.LOGOUT, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  closePanel () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.CLOSE_PANEL, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  viewTransfers () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.VIEW_TRANSFERS, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  showConfiguration () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.SHOW_CONFIG, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  aboutUs () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.ABOUT_US, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  faq () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.FAQ, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  transferNow () {
    const {handleLocalAction, localActions, navigator, idToken} = this.props
    handleLocalAction({type: localActions.TRANSFER_NOW, [COMMON_ENTITIES.NAVIGATOR]: navigator, [AUTH_ENTITIES.ID_TOKEN]: idToken})
  }

  // ------------------------------------------------------------
  // child render methods

  renderTouchArea (title, showArrow, foo) {
    return (
      <TouchableOpacity onPress={foo}>
        <View style={styles.horizontalButton}>
          <View style={styles.horizontalButtonTextContainer}>
            <Text style={styles.horizontalButtonTextStyle}>
              {title}
            </Text>
          </View>
          {
            showArrow &&
            <View style={styles.horizontalButtonIconContainer}>
              <Icon name='keyboard-arrow-right' color='#FFF' />
            </View>
          }
        </View>
      </TouchableOpacity>
    )
  }

  renderMiddleContainer () {
    return (
      <View style={{flex: 1, justifyContent: 'space-around', marginTop: 80, marginBottom: 80}}>
        <TouchableOpacity onPress={() => this.navigateDeep(SPROUT.EDIT_PROFILE)}>
          <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato-Regular', backgroundColor: 'transparent', marginTop: 20}}>
            Edit profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigateDeep(SPROUT.ADD_CHILD_SCREEN)}>
          <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato-Regular', backgroundColor: 'transparent', marginTop: 20}}>
            Add a child
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato-Regular', backgroundColor: 'transparent', marginTop: 20}}>
            Invite a friend
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.navigateDeep(SPROUT.FAQ)}>
          <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato-Regular', backgroundColor: 'transparent', marginTop: 20}}>
            FAQs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.navigateDeep(SPROUT.ABOUT_US)}>
          <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato-Regular', backgroundColor: 'transparent', marginTop: 20}}>
            About LovedWealth
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Communications.email('emailAddress1', null, null, 'My Subject', 'My body text')}>
          <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato-Regular', backgroundColor: 'transparent', marginTop: 20}}>
            Contact US
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.transferNow()}>
          <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato-Regular', backgroundColor: 'transparent', marginTop: 20}}>
            Transfer Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.logout()}>
          <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato-Regular', backgroundColor: 'transparent', marginTop: 20}}>
            Logout
          </Text>
        </TouchableOpacity>

      </View>
    )
  }

  renderHeader () {
    return (
      <View>
        <Image source={require('../../../Img/icons/loginPinLogo.png')} style={{top: 40, height: 24, width: 26}} />
      </View>
    )
  }

  renderFotter () {
    return (
      <View>
        <Text style={{fontSize: 12, fontFamily: 'Lato-Regular', color: '#FFF', backgroundColor: 'transparent'}}>
          version {CURRENT_VERSION}
        </Text>
      </View>
    )
  }

  render () {
    return (
      <LinearGradient
        colors={['rgb(130, 203, 120)', 'rgb(62, 172, 116)']}
        start={{x: 0.1, y: -0.3}} end={{x: 0.3, y: 0.3}}
        locations={[0.5, 1]}
        style={styles.container}>
        {this.renderHeader()}
        {this.renderMiddleContainer()}
        {this.renderFotter()}
      </LinearGradient>
    )
  }
}

SettingPanel.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // navigator object
  navigator: PropTypes.object.isRequired,

  // id token
  idToken: PropTypes.string.isRequired
}

export default SettingPanel
