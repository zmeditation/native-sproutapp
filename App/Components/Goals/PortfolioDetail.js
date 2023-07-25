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
import {View, Text, ScrollView, ProgressViewIOS, Image, Dimensions, TouchableOpacity, LayoutAnimation}
  from 'react-native'
import {reduxForm}
  from 'redux-form'
import CustomButton
  from '../Utility/CustomButton'
import * as Progress
  from 'react-native-progress'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
import {FORM_TYPES}
  from '../../Config/contants'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, BUTTON_TYPES, CUSTOM_LIST_ENTITIES, getPortfolio}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import CustomListView
  from '../Utility/CustomListView'
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

let tempData = [
  {type: CUSTOM_LIST_ENTITIES.SIMPLE, key: 'Stock Name', value: '+2.53 (+1.2%)'}
]
let historicalPerf = [
  {type: CUSTOM_LIST_ENTITIES.SIMPLE, key: '10 months prior', value: '+1.2%'},
  {type: CUSTOM_LIST_ENTITIES.SIMPLE, key: '5 years prior', value: '+1.2%'},
  {type: CUSTOM_LIST_ENTITIES.SIMPLE, key: 'Since inception', value: '+1.2%'}
]

// ========================================================
// Core Component
// ========================================================

class PortfolioDetail extends Component {

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.PORTFOLIO_DETAIL,
      properties: {}
    })
  }

  // --------------------------------------------------------
  // Action handlers

  next (risk) {
    const {handleLocalAction, localActions, childID, goalID, navigator, navigatorTitle} = this.props
    handleLocalAction({type: localActions.ADD_RISK, [CHILD_ENTITES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [COMMON_ENTITIES.NAVIGATOR]: navigator, [COMMON_ENTITIES.NAVIGATOR_TITLE]: navigatorTitle})
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    const {portfolioDetail, portfolioRisk} = this.props
    let portfolioName = getPortfolio(portfolioRisk).NAME
    return (
      <LinearGradient
        colors={['rgb(130, 203, 120)', 'rgb(62, 172, 116)']}
        start={{x: 0.1, y: 0}} end={{x: 0.8, y: 0.8}}
        locations={[0.3, 1]}
        style={{paddingLeft: 40, paddingRight: 40, opacity: 1}}>

        <Text style={{fontFamily: 'Lato-Bold', fontSize: 24, backgroundColor: 'transparent', color: '#FFF', marginTop: 50}}>
          {portfolioName}
        </Text>

        <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, lineHeight: 25, backgroundColor: 'transparent', color: '#FFF', marginTop: 20}}>
          {portfolioDetail}
        </Text>

        {this.renderNextButton()}

      </LinearGradient>
    )
  }

  renderRiskDetailContainer () {
    return (
      <View style={{backgroundColor: '#F9FCF8', paddingTop: 40, paddingLeft: 40, paddingRight: 40, paddingBottom: 55}}>
        <Text style={{color: '#38AA75', fontFamily: Fonts.type.bold, fontSize: 18}}>
          iShares Core Aggressive Allocation ETF
        </Text>

        <View style={{marginTop: 35}}>
          <Text style={{color: '#38AA75', fontFamily: Fonts.type.bold, fontSize: 14, backgroundColor: 'transparent'}}>
            Risk
          </Text>
          <Progress.Bar progress={0.3} width={120} height={12} borderRadius={40} color='#38AA75' style={{marginTop: 11}} />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{color: '#38AA75', fontFamily: Fonts.type.bold, fontSize: 14, backgroundColor: 'transparent'}}>
            Expected Return
          </Text>
          <Progress.Bar progress={0.3} width={120} height={12} borderRadius={40} color='#38AA75' style={{marginTop: 11}} />
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{flex: 6, color: '#38AA75', fontFamily: Fonts.type.bold, fontSize: 14, backgroundColor: 'transparent'}}>
            Ticker
          </Text>
          <Text style={{flex: 4, color: '#38AA75', fontFamily: Fonts.type.bold, fontSize: 14, backgroundColor: 'transparent'}}>
            Expenses p.a.
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{flex: 6, color: '#38AA75', fontFamily: Fonts.type.bold, fontSize: 14, backgroundColor: 'transparent'}}>
            xxx
          </Text>
          <Text style={{flex: 4, color: '#38AA75', fontFamily: Fonts.type.bold, fontSize: 14, backgroundColor: 'transparent'}}>
            0 %
          </Text>
        </View>

      </View>
    )
  }

  renderDetailContainer () {
    return (
      <LinearGradient
        colors={['rgb(130, 203, 120)', 'rgb(62, 172, 116)']}
        start={{x: 0.1, y: 0}} end={{x: 0.8, y: 0.8}}
        locations={[0.3, 1]}
        style={{paddingLeft: 40, paddingRight: 40, paddingBottom: 40, opacity: 1}}>

        <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, backgroundColor: 'transparent', color: '#FFF', marginTop: 50, marginBottom: 20}}>
          Top Holdings
        </Text>

        <CustomListView data={tempData} />

        <Text style={{fontFamily: 'Lato-Bold', fontSize: 18, backgroundColor: 'transparent', color: '#FFF', marginTop: 50, marginBottom: 20}}>
          Historical Performance
        </Text>

        <CustomListView data={historicalPerf} />

      </LinearGradient>
    )
  }

  renderNextButton () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 80, paddingTop: 80}}>
        <LWButton title='Add Investment' onPress={this.next.bind(this)} extraStyle={{backgroundColor: 'transparent', borderWidth: 2, borderColor: '#FFF', width: 300, height: 50}} buttonType={BUTTON_TYPES.DECISION_BUTTON} />
      </View>
    )
  }

  // --------------------------------------------------------
  // Core component

  render () {
    const {chartData} = this.props
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>

        {this.renderHeading()}

        {this.renderRiskDetailContainer()}

        {this.renderDetailContainer()}

      </ScrollView>
    )
  }
}

// ========================================================
// Prop handlers
// ========================================================

PortfolioDetail.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  portfolioRisk: PropTypes.string.isRequired,

  portfolioName: PropTypes.string.isRequired,

  portfolioDetail: PropTypes.string.isRequired,

  goalID: PropTypes.string.isRequired,
  childID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  navigatorTitle: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

const Screen = connect()(form(PortfolioDetail))

export default Screen
