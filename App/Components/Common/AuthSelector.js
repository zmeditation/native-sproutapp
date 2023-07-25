/* eslint-disable no-unused-vars,no-multiple-empty-lines,no-trailing-spaces */
/**
 * Created by viktor on 12/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Alert, Image, TouchableOpacity, Dimensions }
  from 'react-native'
import styles
  from '../../Themes/ApplicationStyles'
import Colors
  from '../../Themes/Colors'
import Fonts
  from '../../Themes/Fonts'
import CustomButton
  from '../Utility/CustomButton'
import SimpleButton
  from '../Utility/SimpleButton'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import LinearGradient
  from 'react-native-linear-gradient'
import {COMMON_ENTITIES, DEVICE_LOGICAL_RESOLUTION}
  from '../../Utility/Mapper/Common'
import Swiper
  from 'react-native-swiper'
import CodePush
  from 'react-native-code-push'
import {CURRENT_VERSION, CURRENT_ENVIRONMENT}
  from '../../Config/AppConfig'
import {ENVIRONMENT}
  from '../../Config/contants'
import LWButton
  from '../Utility/LWButton'

// ========================================================
// Core Component
// ========================================================

class AuthSelector extends Component {

  componentWillMount () {
    const {height} = Dimensions.get('window')
    this.carouselHeight = getCarouselHeight(height)
  }

  componentDidMount () {
    if (CURRENT_ENVIRONMENT === ENVIRONMENT.DEV_1 || CURRENT_ENVIRONMENT === ENVIRONMENT.PROD || CURRENT_ENVIRONMENT === ENVIRONMENT.UAT_2) {
      CodePush.sync({updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE})
    }
  }

  // ---------------------------------------------------------------
  // Action Handlers

  handleTouch (authType) {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.NAVIGATE, [AUTH_ENTITIES.AUTH_TYPE]: authType, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // ---------------------------------------------------------------
  // Top Containers

  renderCarouselView (img, heading, description) {
    const {height, width} = Dimensions.get('window')
    const isSmall = height < 700
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <Image source={img} style={{width: isSmall ? 220 : 270, height: isSmall ? 150 : 195, marginBottom: 30}} />
        <Text style={{fontSize: 24, fontFamily: Fonts.type.regular, color: '#FFF', backgroundColor: 'transparent', textAlign: 'center'}}>
          {heading}
        </Text>
        <Text style={{fontSize: 14, fontFamily: Fonts.type.regular, color: '#FFF', backgroundColor: 'transparent', textAlign: 'center', marginTop: 14}}>
          {description}
        </Text>
      </View>
    )
  }

  renderCarousel () {
    return (
      <Swiper horizontal autoplay showPagination={false} paginationStyle={{position: 'absolute', bottom: 20}} dot={<View style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />} activeDot={<View style={{backgroundColor: '#FFF', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}>
        {this.renderCarouselView(require('../../../Img/icons/startInvesting.png'), 'Start investing for you \n kid\'s future today')}
        {this.renderCarouselView(require('../../../Img/icons/changeWorld.png'), 'Change the world', 'Design the future your child deserves to \n unlock the opportunities of tomorrow.')}
        {this.renderCarouselView(require('../../../Img/icons/designedGrowth.png'), 'Designed for growth', 'Investments that deliver the growth that \n your kids deserve')}
        {this.renderCarouselView(require('../../../Img/icons/taxAdvantage.png'), 'Tax advantaged and low \n fees', 'Kids receive tax benefits on their first $2,000 \n of annual income')}
      </Swiper>
    )
  }

  // ---------------------------------------------------------------
  // render Child Container

  renderGettingStarted () {
    return (
      <TouchableOpacity style={{...styles.screen.containers.centeringContainer, height: 50, backgroundColor: Colors.signupButton.background}} onPress={() => this.handleTouch(AUTH_ENTITIES.SIGNUP)}>
        <Text style={{fontSize: Fonts.size.button, color: Colors.signupButton.color, fontFamily: Fonts.type.medium}}>
          Get Started Now
        </Text>
      </TouchableOpacity>
    )
  }

  renderLogo () {
    const {height, width} = Dimensions.get('window')
    const isSmall = height < 700
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: isSmall ? 30 : 70, marginBottom: 40}}>
        <Image source={require('../../../Img/icons/logoFinal.png')} style={{width: 175, height: 90}} />
      </View>
    )
  }

  renderLoginButton () {
    return (
      <TouchableOpacity onPress={() => this.handleTouch(AUTH_ENTITIES.LOGIN)}>
        <Text style={{fontFamily: Fonts.type.medium, fontSize: 15, color: '#00A776', backgroundColor: 'transparent'}}>
          Login
        </Text>
      </TouchableOpacity>
    )
  }

  renderDeclarationText () {
    return (
      <View style={{...styles.screen.containers.centeringContainer, marginBottom: 10}}>
        <Text style={{fontFamily: Fonts.type.light, fontSize: 12, color: '#FFF', backgroundColor: 'transparent', textAlign: 'center'}}>
          First three months free then just $1 per month.Balances over {'\n'} $5,000 pay 0.25% per year.
        </Text>
      </View>
    )
  }

  renderVersion () {
    return (
      <View style={{position: 'absolute', top: 0, right: 0, left: 0, height: 40, backgroundColor: 'transparent'}}>
        <Text style={{textAlign: 'right', color: '#FFF', fontFamily: 'Lato-Bold', marginRight: 10, marginTop: 25}}>
          version {CURRENT_VERSION}
        </Text>
      </View>
    )
  }

  renderFooter () {
    return (
      <View style={{alignItems: 'center'}}>
        {this.renderDeclarationText()}
        <LWButton title='REGISTER' onPress={() => this.handleTouch(AUTH_ENTITIES.SIGNUP)} extraStyle={{width: 350, height: 50, backgroundColor: '#FFF'}} extraTextStyle={{color: '#00A776'}} />
        <View style={{flexDirection: 'row', marginTop: 25, marginBottom: 25, justifyContent: 'space-around'}}>
          <TouchableOpacity style={{marginRight: 40}} onPress={() => this.handleTouch(AUTH_ENTITIES.LOGIN)}>
            <Text style={{color: '#FFF9F6', fontFamily: 'Lato-Bold', fontSize: 14, backgroundColor: 'transparent'}}>
              LOGIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 40}} onPress={() => console.log('help')}>
            <Text style={{color: '#FFF9F6', fontFamily: 'Lato-Bold', fontSize: 14, backgroundColor: 'transparent'}}>
              HELP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // ---------------------------------------------------------------
  // Core render method

  render () {
    return (
      <LinearGradient
        colors={['rgb(128, 213, 109)', 'rgb(0, 174, 112)']}
        start={{x: 0.7, y: -0.4}} end={{x: 0.7, y: 0.3}}
        locations={[0.5, 1]}
        style={{...styles.screen.containers.root}}>

        {this.renderLogo()}
        {this.renderCarousel()}
        {this.renderFooter()}
        {this.renderVersion()}

      </LinearGradient>
    )
  }

}

const getCarouselHeight = (deviceHeight) => {
  switch (deviceHeight) {
    case DEVICE_LOGICAL_RESOLUTION.IPHONE_DEVICE.height: return 300
    case DEVICE_LOGICAL_RESOLUTION.IPHONE_DEVICE_PLUS.height: return 530
    case DEVICE_LOGICAL_RESOLUTION.IPHONE_DEVICE_X.height: return 350
  }
}

AuthSelector.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // navigator object
  navigator: PropTypes.object.isRequired
}

// ========================================================
// Export
// ========================================================

export default AuthSelector
