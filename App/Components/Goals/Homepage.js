/* eslint-disable no-unused-vars,no-trailing-spaces,no-multi-spaces */
/**
 * Created by viktor on 19/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, LayoutAnimation }
  from 'react-native'
import {Button, Icon}
  from 'react-native-elements'
import LWButton
  from '../Utility/LWButton'
import CustomListView
  from '../Utility/CustomListView'
import globalStyle
  from '../../Themes/ApplicationStyles'
import styles
  from './Styles/HomepageStyle'
import CustomButton
  from '../Utility/CustomButton'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, CUSTOM_LIST_ENTITIES, BUTTON_TYPES, getPortfolio}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import Fonts
  from '../../Themes/Fonts'
import colors
  from '../../Themes/Colors'
import { AnimatedCircularProgress }
  from 'react-native-circular-progress'
import {formatPrice, limitText}
  from '../../Utility/Transforms/Converter'
import LWGraph
  from '../Utility/graph'
import Carousel
  from 'react-native-snap-carousel'
import * as Immutable
  from 'seamless-immutable'
import ChartView
  from 'react-native-highcharts'
import * as Progress
  from 'react-native-progress'

// ========================================================
// Utility
// ========================================================

// ========================================================
// Core Component
// ========================================================

class Homepage extends Component {

  // ------------------------------------------------------------
  // Life cycle methods

  constructor (props) {
    super(props)
    this.state = {
      chartVisible: false
    }
  }

  // ------------------------------------------------------------
  // Action Handlers

  invest () {
    const {handleLocalAction, localActions, navigator, childID, goalID} = this.props
    handleLocalAction({type: localActions.INVEST, [CHILD_ENTITIES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }
  hide () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.HIDE_GOAL, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  // ------------------------------------------------------------
  // Inner components

  renderDecisionBox (c1, c2, title, img, w, h) {
    return (
      <TouchableOpacity style={{width: 180, height: 127, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, shadowColor: 'gray', shadowOpacity: 1, shadowRadius: 20, shadowOffset: {width: 0, height: 0}, marginLeft: 10, marginRight: 10}}>
        <LinearGradient colors={[c1, c2]} start={{x: -1, y: -1}} end={{x: 3, y: 0}} locations={[0, 0.7]} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={img} style={{width: w || 45, height: h || 45}} />
        </LinearGradient>
        <View style={{height: 40, backgroundColor: '#FFF', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 13, color: '#586871', backgroundColor: 'transparent'}}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderDecisionPanel () {
    return (
      <View
        style={{backgroundColor: '#FFF'}}>
        <Carousel
          sliderWidth={Dimensions.get('window').width}
          itemWidth={180 + 40}
          firstItem={1}
          containerCustomStyle={{padding: 25, paddingBottom: 40}}
        >
          {this.renderDecisionBox('#C18FFF', '#622BFF', 'New Investment Goals', require('../../../Img/icons/fund-growth.png'), 32, 50)}
          {this.renderDecisionBox('#FC8FE3', '#FF5757', 'Save & Invest', require('../../../Img/icons/money.png'))}
          {this.renderDecisionBox('#B9FFFC', '#279DFF', 'Share first Steps', require('../../../Img/icons/human-footprint.png'))}
          {this.renderDecisionBox('#85A0B5', '#403E4D', 'Withdraw', require('../../../Img/icons/withdraw.png'))}
        </Carousel>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 40, backgroundColor: 'transparent'}}>
          <LWButton title='Performance' onPress={() => this.showChart()} extraStyle={{backgroundColor: 'rgb(251, 141, 41)', width: 200, height: 42, shadowColor: 'rgb(251, 141, 41)', shadowOffset: {width: 1, height: 7}, shadowOpacity: 0.4}} extraTextStyle={{color: '#FFF', fontFamily: Fonts.type.medium}} iconName='trending-up' iconSize={25} />
        </View>
      </View>
    )
  }

  renderHeader () {
    const {goal} = this.props
    return (
      <View>

        <TouchableOpacity style={{marginTop: 30, alignItems: 'flex-end', paddingRight: 30}} onPress={() => this.hide()}>
          <Icon name='clear' size={32} color='rgb(0, 162, 93)' />
        </TouchableOpacity>

        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
          <Image source={require('../../../Img/icons/musicIcon.png')} style={{height: 25, width: 23}} />
          <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 32, color: '#4A4A4A', marginTop: 20}}>
            {goal && goal[GOAL_ENTITIES.NAME]}
          </Text>
        </View>

      </View>
    )
  }

  renderMiddleContainer () {
    const {width} = Dimensions.get('window')
    const {goal, growth} = this.props
    const goalName = (goal && goal[GOAL_ENTITIES.NAME])
    const goalTarget = (goal && goal[GOAL_ENTITIES.GOAL_AMOUNT]) || 0
    const goalBalance = (goal && goal[GOAL_ENTITIES.BALANCE]) || 0
    const fill = ((goalTarget !== 0) && (goalBalance / goalTarget)) || 0
    const valueIncrease = growth.value
    const percentageIncrease = growth.percentage

    return (
      <View style={{marginTop: 54}}>
        <Text style={{textAlign: 'center', fontFamily: Fonts.type.light, fontSize: 48, color: '#4A4A4A', backgroundColor: 'transparent', marginTop: 10}}>
          {formatPrice(goalBalance)}
        </Text>
        {
          (valueIncrease && percentageIncrease) &&
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 18, color: '#95D279', backgroundColor: 'transparent', marginTop: 3}}>
              +${valueIncrease}
            </Text>
            <Image source={require('../../../Img/icons/arrowUp.png')} style={{width: 10, height: 10, marginLeft: 25, marginRight: 25, top: 10}} />
            <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 18, color: '#95D279', backgroundColor: 'transparent', marginTop: 3}}>
              +{percentageIncrease}%
            </Text>
          </View>
        }
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
          <Progress.Bar progress={fill} width={width - 170} height={10} color='rgb(0, 162, 93)' unfilledColor='rgb(228, 228, 228)' borderWidth={0} />
          <Text style={{color: '#9B9B9B', fontFamily: Fonts.type.regular, fontSize: 18, marginLeft: 23}}>
            {formatPrice(goalTarget)}
          </Text>
        </View>
      </View>
    )
  }

  renderStockContainer () {
    const {goal} = this.props
    const portfolioID = (goal && goal[GOAL_ENTITIES.PORTFOLIO_RISK]) || 0
    let portfolioName = getPortfolio(portfolioID).NAME
    return (
      <View style={{marginTop: 50}}>
        {this.renderStockCard(require('../../../Img/icons/apple.png'), portfolioName, '$5000.20', '-0.2%', '$50 per week')}
      </View>
    )
  }

  renderStockCard (img, stock, price, inc, recur) {
    return (
      <TouchableOpacity onPress={() => console.log('stock pressed')} style={{flex: 1, flexDirection: 'row', height: 90, paddingRight: 20, backgroundColor: '#FFF', marginBottom: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D8D8D8'}}>
        <View style={{paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={img} style={{height: 29, width: 23}} />
        </View>
        <View style={{flex: 1, height: 90, justifyContent: 'center'}}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#000', backgroundColor: 'transparent'}}>
              {stock}
            </Text>
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 18, color: '#000', backgroundColor: 'transparent'}}>
              {price}
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <Text style={{color: 'rgb(0, 162, 93)', fontSize: 14, fontFamily: 'Lato-Regular'}}>
              {recur}
            </Text>
            <Text style={{color: '#9B9B9B', fontSize: 14, fontFamily: 'Lato-Regular'}}>
              {inc}
            </Text>
          </View>

        </View>
      </TouchableOpacity>
    )
  }

  renderDecisionButton () {
    const {handleSubmit} = this.props
    return (
      <View style={{...globalStyle.screen.containers.centeringContainer, marginTop: 40}}>
        <LWButton
          title='One-off investment'
          onPress={() => this.invest()}
          buttonType={BUTTON_TYPES.DECISION_BUTTON}
          extraStyle={{width: 250, height: 50, backgroundColor: 'rgb(0, 174, 112)'}}
        />
        <Text style={{marginTop: 10, fontFamily: Fonts.type.regular, fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
          Make a one-off investment to this account
        </Text>
      </View>
    )
  }

  // ------------------------------------------------------------
  // Core component

  render () {
    console.log('goal :: ', this.props.goal)
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#FFF'}}
        showsVerticalScrollIndicator={false}>
        {this.renderHeader()}
        {this.renderMiddleContainer()}
        {this.renderStockContainer()}
        {this.renderDecisionButton()}
      </ScrollView>
    )
  }

}

Homepage.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // goal ID
  goalID: PropTypes.string.isRequired,
  // child ID
  childID: PropTypes.string.isRequired,
  // goal object itself
  goal: PropTypes.object.isRequired,
  // child's first name
  childName: PropTypes.string.isRequired,
  // growth of goal amount
  growth: PropTypes.object.isRequired,
  // is goal detail processing
  isGoalDetailProcessing: PropTypes.bool.isRequired
}

// ========================================================
// Export
// ========================================================

export default Homepage
