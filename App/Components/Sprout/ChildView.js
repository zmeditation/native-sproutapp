/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 24/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions, ScrollView, Animated, LayoutAnimation }
  from 'react-native'
import { Icon }
  from 'react-native-elements'
import globalStyle
  from '../../Themes/ApplicationStyles'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, getPortfolio}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import Fonts
  from '../../Themes/Fonts'
import {formatPrice, limitText}
  from '../../Utility/Transforms/Converter'
import * as Progress
  from 'react-native-progress'

// ========================================================
// Core Component
// ========================================================

class ChildView extends Component {

  // ------------------------------------------------------------
  // Lifecycle methods

  // ------------------------------------------------------------
  // Action Handlers

  addNewChild () {
    const {handleLocalAction, localActions, navigator, childID} = this.props
    handleLocalAction({type: localActions.ADD_NEW_GOAL, [CHILD_ENTITIES.CHILD_ID]: childID, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  showGoal (goalID, name) {
    const {handleLocalAction, localActions, childID, navigator, userID} = this.props
    handleLocalAction({type: localActions.SHOW_GOAL, [CHILD_ENTITIES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [GOAL_ENTITIES.NAME]: name, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.USER_ID]: userID})
  }

  popView () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.POPUP, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // ------------------------------------------------------------
  // Child render methods

  renderGoalPanel () {
    const {goals} = this.props
    return (
      <View style={{backgroundColor: 'transparent', marginTop: 30, paddingLeft: 10, paddingRight: 10, paddingBottom: 0, zIndex: 500}}>

        {Object.values(goals).map(goal => {
          return this.renderGoalCard(require('../../../Img/icons/musicIcon.png'), goal[GOAL_ENTITIES.GID], goal[GOAL_ENTITIES.NAME], goal[GOAL_ENTITIES.BALANCE] || 0, goal[GOAL_ENTITIES.TOTAL_CONTRIBUTIONS] || 0, goal[GOAL_ENTITIES.GOAL_AMOUNT] || 0, goal[GOAL_ENTITIES.PORTFOLIO_RISK])
        })}

      </View>
    )
  }

  renderGoalCard (img, goalID, goalName, goalBalance, totalContribution, target, portfolioType) {
    const {width} = Dimensions.get('window')
    let progress = ((target !== 0) && (goalBalance / target)) || 0
    let growthValue = parseFloat(goalBalance - totalContribution).toFixed(2)
    let growthPercentage = ((totalContribution !== 0) && parseFloat(((goalBalance - totalContribution) / totalContribution) * 100).toFixed(2)) || 0
    let portfolioName = getPortfolio(portfolioType).NAME || ''
    return (
      <TouchableOpacity key={goalID} onPress={() => this.showGoal(goalID, goalName)} style={{padding: 30, marginBottom: 20, bottom: 100, backgroundColor: '#FFF', borderRadius: 10, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 3}}}>

        <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={img} style={{height: 24, width: 22}} />
            <Text style={{fontFamily: Fonts.type.black, fontSize: 18, color: '#4A4A4A', marginLeft: 10, backgroundColor: 'transparent'}}>
              {limitText(goalName, 23)}
            </Text>
          </View>
          <Text style={{fontFamily: Fonts.type.bold, fontSize: 12, color: '#4A4A4A', backgroundColor: 'transparent'}}>
            {limitText(portfolioName, 17)}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 0, marginBottom: 30}}>
          <Progress.Bar progress={progress} width={width - 170} height={10} color='rgb(0, 162, 93)' unfilledColor='rgb(228, 228, 228)' borderWidth={0} />
          <Text style={{color: '#9B9B9B', fontFamily: Fonts.type.regular, fontSize: 18, marginLeft: 23}}>
            {formatPrice(target)}
          </Text>
        </View>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#9B9B9B', fontFamily: Fonts.type.regular, fontSize: 14, backgroundColor: 'transparent'}}>
              Goal Value
            </Text>
            <Text style={{color: '#9B9B9B', fontFamily: Fonts.type.regular, fontSize: 14, backgroundColor: 'transparent'}}>
              Earning
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <Text style={{color: '#000', fontFamily: Fonts.type.regular, fontSize: 20, backgroundColor: 'transparent'}}>
              {formatPrice(goalBalance)}
            </Text>
            <Text style={{color: '#38AA75', fontFamily: Fonts.type.regular, fontSize: 20, backgroundColor: 'transparent'}}>
              {growthPercentage}% / {formatPrice(growthValue)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderFooterContainer () {
    const {width, height} = Dimensions.get('window')
    return (
      <View style={{backgroundColor: '#FFF', zIndex: 0, bottom: 200}}>
        <Image source={require('../../../Img/icons/bubbles.png')} style={{zIndex: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: 300}} />
        <Image source={require('../../../Img/icons/waves.png')} style={{position: 'absolute', bottom: 0, left: 0, width: width, height: 300, top: 170, zIndex: 10}} />
        <LinearGradient
          colors={['rgb(130, 203, 120)', 'rgb(62, 172, 116)']}
          start={{x: 0.1, y: -0.6}} end={{x: 0.3, y: 0.3}}
          locations={[0.5, 1]}
          style={{height: 500, zIndex: 300, top: 350}}>
          {this.renderDecisionButtons(require('../../../Img/icons/newInvestment.png'), 'New Investment Goals', () => this.addNewChild(), true)}
          {this.renderDecisionButtons(require('../../../Img/icons/saveInvest.png'), 'Save & Invest', () => console.log('new goal printed'), true)}
          {this.renderDecisionButtons(require('../../../Img/icons/withdrawIcon.png'), 'Withdraw', () => console.log('new goal printed'), false)}
        </LinearGradient>
      </View>
    )
  }

  renderDecisionButtons (img, name, foo, boundry) {
    return (
      <View>
        <TouchableOpacity onPress={() => foo()} style={{flexDirection: 'row', paddingLeft: 50}}>
          <Image source={img} style={{height: 23, width: 23, marginRight: 40}} />
          <Text style={{fontFamily: 'Lato-Regular', fontSize: 18, color: '#FFF', backgroundColor: 'transparent'}}>
            {name}
          </Text>
        </TouchableOpacity>
        {
          boundry && <View style={{height: 0.3, backgroundColor: '#E6E6E6', marginTop: 40, marginBottom: 40}} />
        }
      </View>
    )
  }

  renderMiddleContainer () {
    const {handleLocalAction, localActions, navigator, childID, growthValue, growthPercentage, goals, firstName, totalPortfolioValue} = this.props
    return (
      <LinearGradient
        colors={['rgb(128, 213, 109)', 'rgb(0, 174, 112)']}
        start={{x: 0.7, y: -0.4}} end={{x: 0, y: 0.2}}
        locations={[0.4, 1]}
        style={{flex: 1}}>

        <View style={{marginBottom: 150}}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 32}}>
            <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 18, color: '#FFF', backgroundColor: 'transparent'}}>
              {firstName}'s portfolio value
            </Text>
            <Text style={{textAlign: 'center', fontFamily: Fonts.type.light, fontSize: 48, color: '#FFF', backgroundColor: 'transparent', marginTop: 10}}>
              {formatPrice(totalPortfolioValue)}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 18, color: '#D0FF00', backgroundColor: 'transparent', marginTop: 3}}>
                ${growthValue}
              </Text>
              <Image source={require('../../../Img/icons/arrowUp.png')} style={{width: 10, height: 10, marginLeft: 25, marginRight: 25, top: 10}} />
              <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 18, color: '#D0FF00', backgroundColor: 'transparent', marginTop: 3}}>
                {growthPercentage}%
              </Text>
            </View>
          </View>
        </View>

      </LinearGradient>
    )
  }

  renderHeader () {
    return (
      <LinearGradient
        colors={['rgb(128, 213, 109)', 'rgb(0, 174, 112)']}
        start={{x: 0.7, y: -0.4}} end={{x: 0, y: 0.2}}
        locations={[0.4, 1]}
      >

        <View style={{marginTop: 35, marginBottom: 30, justifyContent: 'center', alignItems: 'center', height: 44}}>
          <TouchableOpacity onPress={() => this.popView()} style={{position: 'absolute', left: 20}}>
            <Icon name='keyboard-backspace' size={32} color='#FFF' />
          </TouchableOpacity>
        </View>

      </LinearGradient>
    )
  }

  // ------------------------------------------------------------
  // Core render method

  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {this.renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: '#FFF'}}
        >
          {this.renderMiddleContainer()}
          {this.renderGoalPanel()}
          {this.renderFooterContainer()}
        </ScrollView>
      </View>
    )
  }

}

ChildView.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,
  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,
  // first name of child
  firstName: PropTypes.string.isRequired,
  // total portfolio value of child
  totalPortfolioValue: PropTypes.number.isRequired,
  // total growth of child
  growthValue: PropTypes.number.isRequired,
  // growth percentage
  growthPercentage: PropTypes.number.isRequired,
  // user id
  userID: PropTypes.string.isRequired,
  // goals object
  goals: PropTypes.array.isRequired,
  // child's unique id
  childID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

export default ChildView
