/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 10/1/18.
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
import {Icon}
  from 'react-native-elements'
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

class Article extends Component {

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

  closeArticle () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.CLOSE_ARTICLE, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // --------------------------------------------------------
  // Child Components

  renderBackdrop () {
    const {width} = Dimensions.get('window')
    return (
      <View style={{height: 352, backgroundColor: 'gray'}}>
        <Image source={require('../../../Img/grow/backdrop.png')} style={{position: 'absolute', left: 0, top: 0, width: width, height: 352}} />
        <View style={{position: 'absolute', left: 0, bottom: 0, right: 0, paddingLeft: 20, paddingRight: 50}}>
          <Text style={{fontFamily: 'Lato-Bold', color: '#D0FF00', fontSize: 15, backgroundColor: 'transparent'}}>
            Money and kids
          </Text>
          <Text style={{fontFamily: 'Lato-Bold', color: '#FFF', fontSize: 20, backgroundColor: 'transparent', marginTop: 15, marginBottom: 30}}>
            Why Building Blocks are Good for your Child
          </Text>
        </View>
        <Icon name='clear' onPress={() => this.closeArticle()} color='#FFF' style={{position: 'absolute', top: 30, right: 15}} />
      </View>
    )
  }

  renderDescription () {
    const {description} = this.props
    return (
      <View style={{padding: 40, marginBottom: 60}}>
        <Text style={{color: '#4A4A4A', fontSize: 14, lineHeight: 25, fontFamily: 'Lato-Regular', backgroundColor: 'transparent'}}>
          {'Teaching math concepts for toddlers can be tricky.  At their age, they are more attracted to colors and shapes rather than counting numbers.  That’s the reason why the power of the building blocks should not be underestimated.\n\nIf you want to teach your child match concepts at this early age, collect all the building blocks available at home.  Group them into colors.  Assign a number for each color.\n\nAsk your child to stack the blocks according to the number pasted on the block.  For example, if number 3 is assigned to yellow blocks, then let your child stack 3 yellow blocks.  Do this with the rest of the blocks.  Simple, isn’t it?\n\nBy playing building blocks, your child can learn not just counting numbers but also basic addition by letting them stack the building blocks on top of each other.'}
        </Text>
        <View style={{marginTop: 50}}>
          <Text style={{color: '#38AA75', fontFamily: 'Lato-Bold', fontSize: 20, backgroundColor: 'transparent', textAlign: 'center'}}>
            Share your new knowledge
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
            <Image source={require('../../../Img/grow/twitterIcon.png')} style={{height: 65, width: 65, marginLeft: 10, marginRight: 10}} />
            <Image source={require('../../../Img/grow/facebookIcon.png')} style={{height: 65, width: 65, marginLeft: 10, marginRight: 10}} />
            <Image source={require('../../../Img/grow/telegramIcon.png')} style={{height: 65, width: 65, marginLeft: 10, marginRight: 10}} />
          </View>
        </View>
      </View>
    )
  }

  renderArticles () {
    return (
      <View style={{marginBottom: 50}}>
        <View>
          <Text style={{color: '#4A4A4A', fontFamily: 'Lato-Bold', fontSize: 20, backgroundColor: 'transparent', marginLeft: 20, marginBottom: 20}}>
            Related Articles
          </Text>
        </View>
        {this.renderCard(require('../../../Img/grow/moneyKids.png'), 'Money and kids', '#38AA75', 'Let’s Play ‘Go Fishing for Money', 'Have you heard of the “Marshmallow Test”?  This was a famous experiment which …', true)}
        {this.renderCard(require('../../../Img/grow/teachingKids.png'), 'Teaching kids', '#386DAA', 'Get your Kids to Share in “The Marshmallow Game”', 'Have you heard of the “Marshmallow Test”?  This was a famous experiment which …', false)}
        {this.renderCard(require('../../../Img/grow/afterGrad.png'), 'Teaching kids', '#38AA75', 'Get your Kids to Share in “The Marshmallow Game”', 'Have you heard of the “Marshmallow Test”?  This was a famous experiment which …', false)}
      </View>
    )
  }

  renderCard (img, subheading, subheadingColor, heading, description, borderTopFlag) {
    return (
      <View style={{height: 165, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.handleAddGoal(heading)} style={{flex: 1, flexDirection: 'row', height: 165, borderBottomWidth: 1, borderTopWidth: borderTopFlag ? 1 : 0, borderColor: '#D8D8D8'}}>
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
    console.log('props :: ', this.props)
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {this.renderBackdrop()}
        <ScrollView showsVerticalScrollIndicator={false} contentOffset={{x: 0, y: 0}} contentInset={{top: 0}}>
          {this.renderDescription()}
          {this.renderArticles()}
        </ScrollView>
      </View>
    )
  }

}

Article.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // description of article
  description: PropTypes.string
}

// ========================================================
// Export
// ========================================================

export default Article
