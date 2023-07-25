/* eslint-disable no-unused-vars,no-multi-spaces,no-trailing-spaces,indent */
/**
 * Created by viktor on 3/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import {View, Text, ScrollView, Image, Dimensions, TouchableOpacity, LayoutAnimation}
  from 'react-native'
import {reduxForm}
  from 'redux-form'
import CustomButton
  from '../Utility/CustomButton'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
import {FORM_TYPES}
  from '../../Config/contants'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import LWButton
  from '../Utility/LWButton'
import { connect }
  from 'react-redux'
import { CHILD_ENTITIES as CHILD_ENTITES }
  from '../../Utility/Mapper/Child'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {analytics}
  from '../../Config/AppConfig'

// ========================================================
// UTILITY
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.ADD_GOAL,
  destroyOnUnmount: false
})

// ========================================================
// Core Component
// ========================================================

class SelectRisk extends Component {

  // --------------------------------------------------------
  // Action handlers

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.SELECT_RISK_SCREEN,
      properties: {}
    })
  }

  updateIndex (index) {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: localActions.UPDATE_RISK, payload: {form: FORM_TYPES.ADD_GOAL, field: GOAL_ENTITIES.PORTFOLIO_RISK, value: index}})
    this.updateChart(index)
  }

  next (risk) {
    const {handleLocalAction, localActions, childID, goalID, navigator, navigatorTitle} = this.props
    handleLocalAction({type: localActions.SELECT_RISK, form: FORM_TYPES.ADD_GOAL, [CHILD_ENTITES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [GOAL_ENTITIES.PORTFOLIO_RISK]: risk, [COMMON_ENTITIES.NAVIGATOR]: navigator, [COMMON_ENTITIES.NAVIGATOR_TITLE]: navigatorTitle})
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    const {firstName} = this.props
    return (
      <View style={{...styles.screen.h1.containerStyle, marginBottom: 0, marginLeft: 35, marginRight: 35, alignItems: 'flex-start'}}>
        <Text style={{...styles.screen.h1.textStyle, color: '#4A4A4A', fontSize: 26, fontFamily: 'Kefa', textAlign: 'left'}}>
          How would you like to invest for {firstName}?
        </Text>
      </View>
    )
  }

  renderCard (risk, img, heading, description) {
    return (
      <View style={{height: 200, flexDirection: 'row', marginTop: 20}}>
        <TouchableOpacity onPress={() => this.next(risk)} style={{flex: 1, flexDirection: 'row', height: 200, borderRadius: 10, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 0}}}>
          <View style={{paddingLeft: 20, paddingTop: 20, paddingRight: 20}}>
            <Image source={img} style={{height: 73, width: 73, borderRadius: 35}} />
          </View>
          <View style={{flex: 1, paddingTop: 20, paddingRight: 20}}>
            <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, color: '#4A4A4A', backgroundColor: 'transparent', marginBottom: 10}}>
              {heading}
            </Text>
            <Text style={{fontFamily: 'Lato-regular', lineHeight: 20, paddingTop: 10, fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
              {description}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderNextButton () {
    return (
      <View style={{position: 'absolute', bottom: 28, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 20, paddingRight: 20}}>
        <LWButton title='Next' onPress={this.next.bind(this)} buttonType={BUTTON_TYPES.DECISION_BUTTON} />
      </View>
    )
  }

  // --------------------------------------------------------
  // Core component

  render () {
    const {chartData} = this.props
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>

        {this.renderHeading()}

        <ScrollView style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20}} showsVerticalScrollIndicator={false}>
          {this.renderCard('01', require('../../../Img/portfolios/p1.png'), 'Go Long, Go Strong - Aggressive Portfolio', 'Investing for the long term? Taking on more risk is a good thing when you\'re prepared to be patient through downward cycles. iShares Core Aggressive Allocation ETF')}
          {this.renderCard('02', require('../../../Img/portfolios/p2.png'), 'I’m Balancing - Moderate Portolio', 'A safe place to start. Taking on a little bit of risk this portfolio is a good mix of risk and reward that will pay off over the years.')}
          {this.renderCard('03', require('../../../Img/portfolios/p3.png'), 'Step by Step - Conservative Portfolio', 'iShares Core Conservative Allocation ETF')}
          {this.renderCard('04', require('../../../Img/portfolios/p4.png'), 'Monopoly Man: Homes, Hotels & Buildings', 'The Monopoly Man is rich for a reason. Property represents a Vanguard REIT ETF (VNQ)')}
          {this.renderCard('05', require('../../../Img/portfolios/p5.png'), 'America’s finest 500', 'Invest in the continued strength of the US economy through the S&P500, the 500 largest publically listed companies. Take advantage of its very low expenses by buying and holding this investment for the long haul.  ')}
          {this.renderCard('06', require('../../../Img/portfolios/p6.png'), 'Warren Buffet’s Berkshire Hathaway', 'World leading value investor, Warren Buffet, has a track record of buying sustainable businesses that deliever profits inexpensively.')}
          {this.renderCard('07', require('../../../Img/portfolios/p7.png'), 'Brands I Love', 'Have certain brands you and your kids love? Now you can say I liked it so much I bought the company, well a fraction anyway..')}
          {this.renderCard('08', require('../../../Img/portfolios/p8.png'), 'Save Us Some Tax: Municipal Bonds', 'Municipial bonds are federal government income tax exempt, great when you\'re child has passed their $2,000 of annual income tax benefit.')}
          {this.renderCard('09', require('../../../Img/portfolios/p9.png'), 'Small But Nimble Companies', 'Small companies can be higher risk, but they often grow at faster rates than more mature companies. Let them grow alongside your child.')}
          {this.renderCard('10', require('../../../Img/portfolios/p10.png'), 'The Future Society', 'Innovation and technology are creating new businesses everyday. Invest in the forefront of new technology.')}
        </ScrollView>

      </View>
    )
  }
}

// ========================================================
// Prop handlers
// ========================================================

SelectRisk.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // navigator title
  navigatorTitle: PropTypes.string.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // current index of portfolio risk
  portfolioRisk: PropTypes.number.isRequired,

  // types of risk
  riskValues: PropTypes.array.isRequired,

  // user ID
  userID: PropTypes.string.isRequired,

  goalID: PropTypes.string.isRequired,
  childID: PropTypes.string.isRequired,

  chartData: PropTypes.object.isRequired
}

// ========================================================
// Export
// ========================================================

const Screen = connect()(form(SelectRisk))

export default Screen
