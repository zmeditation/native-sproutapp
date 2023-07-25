/* eslint-disable no-trailing-spaces,no-unused-vars,camelcase */
/**
 * User Input Detail 5
 * - Total user financial value
 *
 * Created by viktor on 28/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Image, LayoutAnimation, TouchableOpacity, Keyboard, ScrollView, Dimensions, ActivityIndicator, Animated }
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import CustomButton
  from '../Utility/CustomButton'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import Carousel
  from 'react-native-snap-carousel'
import LinearGradient
  from 'react-native-linear-gradient'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {analytics}
  from '../../Config/AppConfig'

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.ADD_USER,
  destroyOnUnmount: false
})

const cardWidth = 237

const heading = {
  0: 'Minimize losses',
  1: 'Maximize gains and minimize losses',
  2: 'Maximize long term gains'
}

const description = {
  0: 'I prefer security over returns when there is a chance of market movements impacting my investment',
  1: 'I\'m in between, willing to accept a little more risk for higher returns',
  2: 'I accept higher risk in order to achieve higher returns over the long term'
}

// ========================================================
// Core Component
// ========================================================

class InputUserDetail_8 extends Component {

  // -------------------------------------------------------
  // Lifecycle methods

  // Todo:-
  // - formalize investor type
  //   instead of using constants
  //   (0,1,2)
  constructor (props) {
    super(props)
    this.state = {
      investorType: 1,
      heading: heading[1],
      description: description[1],
      opacity: 1
    }
    this.h = {
      textOpacity: new Animated.Value(1)
    }
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.USER_INPUT_DETAIL_8,
      properties: {}
    })
  }

  // -------------------------------------------------------
  // Action handlers

  navigateToNextScreen (investorIndex) {
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen, [COMMON_ENTITIES.NAVIGATOR]: navigator, form: FORM_TYPES.ADD_USER, field: USER_ENTITIES.INVESTOR_TYPE, value: investorIndex})
  }

  indexChanged (index) {
    console.log('changing index: ', index)
    this.hideText(index)
  }

  hideText (index) {
    LayoutAnimation.spring()
    this.setState({
      opacity: 0,
      investorType: index,
      heading: heading[index],
      description: description[index]
    })
    setTimeout(() => this.showText(index), 200)
  }

  showText (index) {
    LayoutAnimation.spring()
    this.setState({
      opacity: 1
    })
  }

  // -------------------------------------------------------
  // inner component render methods

  renderHorizontalLine () {
    return (
      <View style={styles.screen.horizontalLine.containerStyle}>
        <View style={styles.screen.horizontalLine.lineStyle} />
      </View>
    )
  }

  renderHeading () {
    return (
      <View style={{...styles.screen.h1.containerStyle}}>
        <Text style={styles.screen.h1.textStyle}>
          What is your primary {'\n'}
          investment objective?
        </Text>
      </View>
    )
  }

  renderFormContainer () {
    return (
      <View style={{...styles.screen.containers.spreadAndCenteringContainer, marginTop: 16}}>
        <View style={{flexDirection: 'row'}}>
          {this.renderTouchableView('Minimize losses', 'I prefer security over returns when there is a chance of market movements impacting my investment', 1)}
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.renderTouchableView('Maximize gains and minimize losses', 'I\'m in between, willing to accept a little more risk for higher returns', 2)}
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.renderTouchableView('Maximize long term gains', 'I accept higher risk in order to achieve higher returns over the long term', 3)}
        </View>
      </View>
    )
  }

  renderCarousel () {
    return (
      <Carousel
        sliderWidth={Dimensions.get('window').width}
        itemWidth={cardWidth + 48}
        firstItem={1}
        onSnapToItem={item => this.indexChanged(item)}
        containerCustomStyle={{paddingBottom: 0, paddingTop: 0, marginBottom: 0, height: 120}}
      >
        {this.renderCard(require('../../../Img/icons/min.png'), 0)}
        {this.renderCard(require('../../../Img/icons/maxMin.png'), 1)}
        {this.renderCard(require('../../../Img/icons/max.png'), 2)}
      </Carousel>
    )
  }

  renderCard (img, index) {
    return (
      <TouchableOpacity onPress={() => this.navigateToNextScreen(index)} style={{justifyContent: 'center', alignItems: 'center', width: cardWidth, marginTop: 20, marginBottom: 0, marginLeft: 20, marginRight: 20, height: 267, borderRadius: 10, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 1}}}>
        <Image source={img} style={{height: 92, width: 85}} />
      </TouchableOpacity>
    )
  }

  renderTextContainer () {
    const {heading, description, opacity} = this.state
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
        <Text style={{fontFamily: 'Lato-Bold', opacity: opacity, fontSize: 20, color: '#454955', marginBottom: 20, backgroundColor: 'transparent', textAlign: 'center'}}>
          {heading}
        </Text>
        <Text style={{fontFamily: 'Lato-Regular', opacity: opacity, fontSize: 16, color: '#454955', lineHeight: 30, backgroundColor: 'transparent', textAlign: 'center'}}>
          {description}
        </Text>
      </View>
    )
  }

  renderTouchableView (title, description, index) {
    return (
      <TouchableOpacity style={{...styles.screen.buttons.verticalGroupBigger.button, padding: 15, marginBottom: 32}} onPress={() => this.navigateToNextScreen(index)}>
        <View style={{...styles.screen.containers.centeringContainer}}>
          <Text style={styles.screen.buttons.verticalGroupBigger.text}>
            {title}
          </Text>
        </View>
        <View style={styles.screen.containers.spreadAndCenteringContainer}>
          <Text style={styles.screen.buttons.verticalGroupBigger.description}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  // -------------------------------------------------------
  // Core render methods

  render () {
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>
        <ScrollView
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.screen.containers.root}
          style={{paddingLeft: 20, paddingRight: 20}}
        >
          {this.renderHeading()}
          {this.renderCarousel()}
          {this.renderTextContainer()}
        </ScrollView>
      </View>
    )
  }

}

InputUserDetail_8.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // next screen to navigate
  nextScreen: PropTypes.string.isRequired,

  // user id
  userID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputUserDetail_8))

export default Screen
