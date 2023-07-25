/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 9/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Dimensions, TextInput, ActivityIndicator, TouchableOpacity, Image, ScrollView }
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import CustomFormInput
  from '../Utility/CustomFormInput'
import CustomButton
  from '../Utility/CustomButton'
import styles
  from '../../Themes/ApplicationStyles'
import {FORM_TYPES}
  from '../../Config/contants'
import { connect }
  from 'react-redux'
import {ADD_GOAL_PATH, GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import GravityCapsule
  from '../Utility/GravityCapsule'
import LWButton
  from '../Utility/LWButton'
import LWTextInput
  from '../Utility/LWFormInput'
import { CHILD_ENTITIES }
  from '../../Utility/Mapper/Child'
import { USER_ENTITIES }
  from '../../Utility/Mapper/User'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'

// ========================================================
// UTILITY
// ========================================================

// ========================================================
// Core Component
// ========================================================

class GrowHomepage extends Component {

  // --------------------------------------------------------
  // Lifecycle methods

  constructor (props) {
    super(props)
    this.state = {
      active: 1
    }
  }

  // --------------------------------------------------------
  // Action handlers

  activate (index) {
    this.setState({
      active: index
    })
  }

  openArticle () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.OPEN_ARTICLE, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // --------------------------------------------------------
  // Child Components

  renderHeader () {
    return (
      <LinearGradient
        colors={['rgb(80, 184, 203)', 'rgb(32, 87, 159)']}
        start={{x: 0.1, y: -0.3}} end={{x: 1, y: 0.7}}
        locations={[0.1, 1]}
        style={{height: 133}}>
        <View style={{justifyContent: 'center', alignItems: 'center', height: 90}}>
          <Text style={{fontFamily: 'Lato-Regular', fontSize: 16, color: '#FFF', backgroundColor: 'transparent'}}>
            Grow
          </Text>
        </View>
        <ScrollView style={{height: 43, flex: 1}} showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems: 'center'}} horizontal>
          <TouchableOpacity onPress={() => this.activate(0)}>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, marginLeft: 30, marginRight: 30, color: this.state.active === 0 ? '#FFF' : 'rgba(255, 255, 255, 0.5)', backgroundColor: 'transparent'}}>
              0-3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.activate(1)}>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, marginLeft: 30, marginRight: 30, color: this.state.active === 1 ? '#FFF' : 'rgba(255, 255, 255, 0.5)', backgroundColor: 'transparent'}}>
              4-7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.activate(2)}>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, marginLeft: 30, marginRight: 30, color: this.state.active === 2 ? '#FFF' : 'rgba(255, 255, 255, 0.5)', backgroundColor: 'transparent'}}>
              8-12
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.activate(3)}>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, marginLeft: 30, marginRight: 30, color: this.state.active === 3 ? '#FFF' : 'rgba(255, 255, 255, 0.5)', backgroundColor: 'transparent'}}>
              13-15
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.activate(4)}>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, marginLeft: 30, marginRight: 30, color: this.state.active === 4 ? '#FFF' : 'rgba(255, 255, 255, 0.5)', backgroundColor: 'transparent'}}>
              16-18
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.activate(5)}>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, marginLeft: 30, marginRight: 30, color: this.state.active === 5 ? '#FFF' : 'rgba(255, 255, 255, 0.5)', backgroundColor: 'transparent'}}>
              18-20
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    )
  }

  renderBackdrop () {
    const {width} = Dimensions.get('window')
    return (
      <View style={{height: 352, backgroundColor: 'gray'}}>
        <Image source={require('../../../Img/grow/backdrop.png')} style={{position: 'absolute', left: 0, top: 0, width: width, height: 352}} />
        <View style={{position: 'absolute', left: 0, bottom: 0, right: 0, paddingLeft: 20, paddingRight: 50}}>
          <Text style={{fontFamily: 'Lato-Bold', color: '#D0FF00', fontSize: 15, backgroundColor: 'transparent'}}>
            Parental Finance 101
          </Text>
          <Text style={{fontFamily: 'Lato-Bold', color: '#FFF', fontSize: 20, backgroundColor: 'transparent', marginTop: 15}}>
            Why Building Blocks are Good for your Child
          </Text>
          <Text style={{fontFamily: 'Lato-Regular', color: '#FFF', fontSize: 15, backgroundColor: 'transparent', marginTop: 15, marginBottom: 50}}>
            Teaching math concepts for toddlers can be …
          </Text>
        </View>
      </View>
    )
  }

  renderArticles () {
    return (
      <View style={{marginBottom: 50}}>
        {this.renderCard(require('../../../Img/grow/moneyKids.png'), 'Money and kids', '#38AA75', 'Let’s Play ‘Go Fishing for Money', 'Have you heard of the “Marshmallow Test”?  This was a famous experiment which …')}
        {this.renderCard(require('../../../Img/grow/teachingKids.png'), 'Teaching kids', '#386DAA', 'Get your Kids to Share in “The Marshmallow Game”', 'Have you heard of the “Marshmallow Test”?  This was a famous experiment which …')}
        {this.renderCard(require('../../../Img/grow/afterGrad.png'), 'Teaching kids', '#38AA75', 'Get your Kids to Share in “The Marshmallow Game”', 'Have you heard of the “Marshmallow Test”?  This was a famous experiment which …')}
      </View>
    )
  }

  renderCard (img, subheading, subheadingColor, heading, description) {
    return (
      <View style={{height: 165, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.openArticle()} style={{flex: 1, flexDirection: 'row', height: 165, borderBottomWidth: 1, borderColor: '#D8D8D8'}}>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 3}}>
            <Image source={img} style={{height: 73, width: 73, borderRadius: 35}} />
          </View>
          <View style={{paddingTop: 30, paddingRight: 30, flex: 7}}>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 12, color: subheadingColor, backgroundColor: 'transparent'}}>
              {subheading}
            </Text>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 20, marginTop: 10, color: '#000', backgroundColor: 'transparent', marginBottom: 10}}>
              {heading}
            </Text>
            <Text style={{fontFamily: 'Lato-regular', fontSize: 12, color: '#9B9B9B', backgroundColor: 'transparent'}}>
              {description}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    const {isProcessing} = this.props
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {this.renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false} contentOffset={{x: 0, y: 0}} contentInset={{top: 0}}>
          {this.renderBackdrop()}
          {this.renderArticles()}
        </ScrollView>
      </View>
    )
  }

}

GrowHomepage.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func
}

// ========================================================
// Export
// ========================================================

export default GrowHomepage
