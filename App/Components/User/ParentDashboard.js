/* eslint-disable no-unused-vars,no-multiple-empty-lines,no-trailing-spaces */
/**
 * Created by demon on 7/12/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Keyboard, ScrollView, Image, ActivityIndicator, TextInput, Dimensions }
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
  from '../../Config/contants'
import {LeftNavHeader, RightNavHeader}
  from '../../Containers/Common/CustomNavHeader'
import Fonts
  from '../../Themes/Fonts'
import styles
  from '../../Themes/ApplicationStyles'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {AUTH_ENTITIES}
  from '../../Utility/Mapper/Auth'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import GravityCapsule
  from '../Utility/GravityCapsule'
import LWButton
  from '../Utility/LWButton'
import LWTextInput
  from '../Utility/LWTextInput'
import {formatDOB}
  from '../../Utility/Formatter/inputFormatter'
import {validateDate}
  from '../../Utility/Transforms/Validator'
import {formatPrice, limitText}
  from '../../Utility/Transforms/Converter'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import Carousel
  from 'react-native-snap-carousel'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'

// ========================================================
// Utility
// ========================================================

const cardHeight = 290
const suggestionCard = 310

// ========================================================
// Core Component
// ========================================================

class ParentDashboard extends Component {

  // --------------------------------------------------------
  // Action handlers

  navigateTodo (screen) {
    const {handleLocalAction, localActions, userID, navigator} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TODO, [USER_ENTITIES.USER_ID]: userID, [COMMON_ENTITIES.SCREEN_TYPE]: screen, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  showDocuments () {
    const {handleLocalAction, localActions, idToken, navigator} = this.props
    handleLocalAction({type: localActions.SHOW_DOCUMENTS, [AUTH_ENTITIES.ID_TOKEN]: idToken, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  showConfirmations () {
    const {handleLocalAction, localActions, idToken, navigator} = this.props
    handleLocalAction({type: localActions.SHOW_CONFIRMATIONS, [AUTH_ENTITIES.ID_TOKEN]: idToken, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  viewRegularTransfers () {
    const {handleLocalAction, localActions, navigator, userID} = this.props
    handleLocalAction({type: localActions.VIEW_TRANSFERS, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.USER_ID]: userID})
  }

  showActivity () {
    const {handleLocalAction, localActions, navigator, userID} = this.props
    handleLocalAction({type: localActions.VIEW_ACTIVITY, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.USER_ID]: userID})
  }

  addAccount () {
    console.log('adding a new account')
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.ADD_ACCOUNT, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  handleTodoFoo (screen) {
    console.log('handling screen ::: ', screen)
    switch (screen) {
      case SPROUT.ADD_CHILD_SCREEN:
        this.addAccount()
        break
      default:
        break
    }
  }

  // --------------------------------------------------------
  // Child Components

  renderChildrenBox (name, value, increase, percent, investment, c1, c2) {
    return (
      <TouchableOpacity style={{width: 180, height: 167, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, shadowColor: 'gray', shadowOpacity: 1, shadowRadius: 20, shadowOffset: {width: 0, height: 0}, marginLeft: 10, marginRight: 10}}>
        <View style={{height: 40, backgroundColor: '#FFF', borderTopLeftRadius: 15, borderTopRightRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 13, color: '#586871', backgroundColor: 'transparent'}}>
            {name}
          </Text>
        </View>
        <LinearGradient colors={[c1, c2]} start={{x: -1, y: -1}} end={{x: 3, y: 0}} locations={[0, 0.7]} style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{borderColor: '#FFF', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 15, paddingTop: 15}}>
            <Text style={{fontSize: 34, fontFamily: Fonts.type.semibold, color: '#FFF', backgroundColor: 'transparent'}}>
              {formatPrice(value)}
            </Text>
          </View>
          <View style={{borderColor: '#FFF', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 12, fontFamily: Fonts.type.light, color: '#FFF', backgroundColor: 'transparent'}}>
              +${increase} (+{percent}%)
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 12, fontFamily: Fonts.type.light, color: '#FFF', backgroundColor: 'transparent'}}>
              {investment}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  renderChildrenPanel () {
    const {childrenAvailable, children, childIDs} = this.props
    console.log('child available :', childrenAvailable, '\n:: children :: ', children, '\n:: child ids :: ', childIDs)
    if (childrenAvailable) {
      return (
        <Carousel
          sliderWidth={Dimensions.get('window').width}
          itemWidth={180 + 40}
          firstItem={0}
          containerCustomStyle={{padding: 25}}
        >
          {
            childIDs.map(id => {
              const child = children[id]
              return this.renderChildrenBox(child[CHILD_ENTITIES.FIRST_NAME], child[CHILD_ENTITIES.PORTFOLIO]['current_value'], child[CHILD_ENTITIES.PORTFOLIO]['growth_in_value'], child[CHILD_ENTITIES.PORTFOLIO]['growth_in_percentage'], '$5 per week', '#C18FFF', '#622BFF')
            })
          }
        </Carousel>
      )
    } else {
      return null
    }
  }

  renderDecisionBox (c1, c2, title, screen, img, w, h) {
    console.log('title ::; ', title, '\nscreen _----------------------- :: ', screen)
    return (
      <TouchableOpacity onPress={() => screen === null ? console.log('action') : this.navigateTodo(screen)}
        style={{width: 180, height: 127, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, shadowColor: 'gray', shadowOpacity: 1, shadowRadius: 20, shadowOffset: {width: 0, height: 0}, marginLeft: 10, marginRight: 10}}>
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

  renderNextSteps () {
    const {todoList} = this.props
    let keys = Object.keys(todoList)
    return (
      <View style={{paddingTop: 40}}>
        <Text style={{textAlign: 'center', fontSize: 18, fontFamily: Fonts.type.medium, color: '#FFF', backgroundColor: 'transparent'}}>
          Next Steps
        </Text>
        <Carousel
          sliderWidth={Dimensions.get('window').width}
          itemWidth={180 + 40}
          firstItem={1}
          containerCustomStyle={{padding: 25, paddingBottom: 40}}
        >
          {keys.map(key => this.renderDecisionBox('#C18FFF', '#622BFF', todoList[key]['title'], todoList[key]['screen'], require('../../../Img/icons/fund-growth.png'), 32, 50))}
        </Carousel>
      </View>
    )
  }

  renderManagePanel () {
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 18, fontFamily: Fonts.type.medium, color: '#FFF', backgroundColor: 'transparent'}}>
          Manage
        </Text>
        <Carousel
          sliderWidth={Dimensions.get('window').width}
          itemWidth={180 + 40}
          firstItem={1}
          containerCustomStyle={{padding: 25, paddingBottom: 40}}
        >
          {this.renderDecisionBox('#C18FFF', '#622BFF', 'New Investment Goals', null, require('../../../Img/icons/fund-growth.png'), 32, 50)}
          {this.renderDecisionBox('#FC8FE3', '#FF5757', 'Save & Invest', null, require('../../../Img/icons/money.png'))}
          {this.renderDecisionBox('#B9FFFC', '#279DFF', 'Share first Steps', null, require('../../../Img/icons/human-footprint.png'))}
          {this.renderDecisionBox('#85A0B5', '#403E4D', 'Withdraw', null, require('../../../Img/icons/withdraw.png'))}
        </Carousel>
      </View>
    )
  }

  // --------------------------------------------------------
  // Child render

  renderChildCard (img, firstName, amount, totalReturn, amountInvested, perWeek) {
    return (
      <View style={{borderRadius: 5, marginLeft: 10, marginRight: 10}}>
        <View style={{zIndex: 400, alignItems: 'center'}}>
          <Image source={img} style={{position: 'absolute', top: -50, height: 100, width: 100, zIndex: 400, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 3}}} />
        </View>
        <View style={{marginBottom: 10, paddingTop: 50, width: 210, height: cardHeight, borderRadius: 5, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 2}}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 18, color: '#4A4A4A', backgroundColor: 'transparent', textAlign: 'center'}}>
            {firstName}
          </Text>
          <Text style={{fontFamily: Fonts.type.light, fontSize: 40, color: '#38AA75', backgroundColor: 'transparent', textAlign: 'center', marginTop: 5}}>
            {formatPrice(amount)}
          </Text>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 12, color: '#9B9B9B', backgroundColor: 'transparent', textAlign: 'center'}}>
            Portfolio Value {'\n'} ____
          </Text>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 16, color: '#38AA75', backgroundColor: 'transparent', textAlign: 'center', marginTop: 15}}>
            {totalReturn}
          </Text>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 12, color: '#9B9B9B', backgroundColor: 'transparent', textAlign: 'center'}}>
            Total Return
          </Text>

          <View style={{position: 'absolute', bottom: 20, left: 0, right: 0}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 12, color: '#000', backgroundColor: 'transparent', textAlign: 'center'}}>
                {amountInvested}
              </Text>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 12, color: '#000', backgroundColor: 'transparent', textAlign: 'center'}}>
                {perWeek}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 12, color: '#9B9B9B', backgroundColor: 'transparent', textAlign: 'center'}}>
                Amount Invested
              </Text>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 12, color: '#9B9B9B', backgroundColor: 'transparent', textAlign: 'center'}}>
                Per Week
              </Text>
            </View>
          </View>

        </View>
      </View>
    )
  }

  renderNextPanel () {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} alwaysBounceVertical={false} horizontal snapToInterval={suggestionCard} contentOffset={{x: -10}} contentInset={{left: 40, right: 220}} decelerationRate='fast' style={{marginTop: 20}}>
          {this.renderSuggestionCard(require('../../../Img/icons/rocketIcon.png'), 'Invest', 'Top up Anna\'s future with $50')}
          {this.renderSuggestionCard(require('../../../Img/icons/rocketIcon.png'), 'Invest', 'Top up Anna\'s future with $50')}
          {this.renderSuggestionCard(require('../../../Img/icons/rocketIcon.png'), 'Invest', 'Top up Anna\'s future with $50')}
          {this.renderSuggestionCard(require('../../../Img/icons/rocketIcon.png'), 'Invest', 'Top up Anna\'s future with $50')}
        </ScrollView>
      </View>
    )
  }

  renderSuggestionCard (img, heading, subHeading) {
    return (
      <TouchableOpacity onPress={() => console.log('suggestion :: ', heading)} style={{height: 370, padding: 30, paddingBottom: 50, backgroundColor: 'rgb(122, 81, 230)', borderRadius: 10, marginLeft: 10, marginRight: 10, width: suggestionCard, zIndex: 300, shadowOpacity: 0.2, shadowRadius: 7, shadowOffset: {width: 0, height: 0}}}>
        <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={img} style={{height: 122, width: 122}} />
        </View>
        <View style={{flex: 2, paddingTop: 20}}>
          <Text style={{fontFamily: Fonts.type.black, fontSize: 16, color: '#FFF', backgroundColor: 'transparent'}}>
            {heading}
          </Text>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 26, color: '#FFF', backgroundColor: 'transparent'}}>
            {subHeading}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderAdminPanel () {
    return (
      <View style={{height: 500}}>
        <Text style={{fontFamily: Fonts.type.bold, fontSize: 22, color: '#006B58', marginLeft: 50}}>
          Admin
        </Text>
        <View style={{marginTop: 20}}>
          {this.renderAdminCard(require('../../../Img/icons/taxStatementLogo.png'), 'Tax Statement', () => this.showDocuments())}
          {this.renderAdminCard(require('../../../Img/icons/tradeConfirmation.png'), 'Trade Confirmation', () => this.showConfirmations())}
          {this.renderAdminCard(require('../../../Img/icons/activityIcon.png'), 'Activity', () => console.log('activity'))}
          {this.renderAdminCard(require('../../../Img/icons/regularTransferIcon.png'), 'Regular Transfers', () => this.viewRegularTransfers())}
        </View>
      </View>
    )
  }

  renderAdminCard (img, title, foo) {
    return (
      <TouchableOpacity onPress={() => foo()} style={{height: 100, backgroundColor: '#F9FCF8', flexDirection: 'row', marginBottom: 3}}>
        <View style={{flex: 2.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={img} style={{}} />
        </View>
        <View style={{flex: 7.5, justifyContent: 'center'}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 18, color: '#4A4A4A', backgroundColor: 'transparent'}}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
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
              Your Family
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
    const {navigator} = this.props
    return (
      <LinearGradient
        colors={['rgb(128, 213, 109)', 'rgb(0, 174, 112)']}
        start={{x: 0.7, y: -0.4}} end={{x: 0, y: 0.2}}
        locations={[0.4, 1]}>

        <View style={{marginTop: 45, marginBottom: 30, justifyContent: 'center', alignItems: 'center', height: 44}}>
          <View style={{position: 'absolute', left: 25}}>
            <LeftNavHeader navigator={navigator} />
          </View>
          <View style={{position: 'absolute', right: 25}}>
            <RightNavHeader navigator={navigator} />
          </View>
          <Image source={require('../../../Img/icons/loginPinLogo.png')} style={{height: 24, width: 26}} />
        </View>

      </LinearGradient>
    )
  }

  renderOverview () {
    return (
      <View style={{paddingLeft: 12, paddingRight: 12, zIndex: 600}}>
        {this.renderParentOverview()}
        {/* {this.renderRecentTransactions()} */}
      </View>
    )
  }

  renderTransactionCard (img, heading, subheading, amount, showBottomBorder) {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={img} style={{height: 50, width: 50}} />
            <View style={{marginLeft: 5}}>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 16, color: '#4A4A4A', backgroundColor: 'transparent'}}>
                {heading}
              </Text>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 14, color: '#9B9B9B', marginTop: 5, backgroundColor: 'transparent'}}>
                {subheading}
              </Text>
            </View>
          </View>
          <Text style={{fontFamily: Fonts.type.bold, fontSize: 16, color: '#4A4A4A', backgroundColor: 'transparent'}}>
            {amount}
          </Text>
        </View>
        {
          showBottomBorder && <View style={{height: 1, backgroundColor: '#D8D8D8', marginLeft: 5, marginTop: 10, marginRight: 20, marginBottom: 10}} />
        }
      </View>
    )
  }

  renderRecentTransactions () {
    const {transferObj} = this.props
    console.log('addressing transfer object :: ', transferObj)
    if (transferObj.length > 0) {
      return (
        <View style={{borderRadius: 5, bottom: 80, paddingLeft: 20, paddingTop: 20, paddingRight: 20, paddingBottom: 30, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 3}}}>
          <Text style={{fontFamily: Fonts.type.black, fontSize: 16, color: '#4A4A4A', marginBottom: 20}}>
            Recent Transactions
          </Text>
          <View>
            {
              transferObj.map((obj, index) => {
                console.log('---->>> ', index, '\n::', obj)
                if (index < 2) {
                  console.log('index -----', index)
                  const firstName = obj[CHILD_ENTITIES.FIRST_NAME]
                  const goalName = obj[GOAL_ENTITIES.NAME]
                  const instructionAmount = obj[GOAL_ENTITIES.INSTRUCTION_AMOUNT] || 0
                  const instructionTime = obj[GOAL_ENTITIES.INSTRUCTION_INITIAL_REQUEST_TIME]
                  const header = firstName + '\'s ' + goalName
                  console.log('header :: ', header)
                  return this.renderTransactionCard(require('../../../Img/icons/child.png'), limitText(header, 27), 'December 30, 2017', formatPrice(instructionAmount), true)
                }
              })
            }
          </View>
        </View>
      )
    } else return null
  }

  renderParentOverview () {
    const {monthlyInvestment, investedToDate, nextMilestone, firstname} = this.props
    return (
      <View style={{borderRadius: 5, bottom: 80, marginBottom: 25, paddingLeft: 20, paddingTop: 20, paddingRight: 20, paddingBottom: 30, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 3}}}>
        <Text style={{fontFamily: Fonts.type.black, fontSize: 16, color: '#4A4A4A', marginBottom: 20}}>
          Overview
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 6.2, justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
            <Image source={require('../../../Img/icons/parentIcon.png')} style={{height: 100, width: 100}} />
            <Text style={{fontFamily: Fonts.type.black, fontSize: 20, color: '#4A4A4A', backgroundColor: 'transparent', marginTop: 20}}>
              Well done {firstname}
            </Text>
            <Text style={{fontFamily: Fonts.type.regular, fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent', marginTop: 5, textAlign: 'center'}}>
              Getting started is first step to better future
            </Text>
          </View>
          <View style={{flex: 3.8, alignItems: 'flex-start', justifyContent: 'space-around'}}>
            <View>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
                Monthly investment
              </Text>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 22, color: '#4A4A4A', backgroundColor: 'transparent'}}>
                {formatPrice(monthlyInvestment)}
              </Text>
            </View>
            <View>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
                Invested to date
              </Text>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 22, color: '#4A4A4A', backgroundColor: 'transparent'}}>
                {formatPrice(investedToDate)}
              </Text>
            </View>
            <View>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
                Next Milestone
              </Text>
              <Text style={{fontFamily: Fonts.type.regular, fontSize: 22, color: '#4A4A4A', backgroundColor: 'transparent'}}>
                {formatPrice(nextMilestone)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderFooterContainer () {
    const {width, height} = Dimensions.get('window')
    return (
      <View style={{backgroundColor: '#FFF', zIndex: 100, bottom: 0}}>
        <Image source={require('../../../Img/icons/bubbles.png')} style={{zIndex: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: 300}} />
        <Image source={require('../../../Img/icons/waves.png')} style={{position: 'absolute', bottom: 0, left: 0, width: width, height: 300, top: 170, zIndex: 10}} />
        <LinearGradient
          colors={['rgb(130, 203, 120)', 'rgb(62, 172, 116)']}
          start={{x: 0.1, y: -0.6}} end={{x: 0.3, y: 0.3}}
          locations={[0.5, 1]}
          style={{height: 800, zIndex: 300, top: 350}}>
          {this.renderDecisionButtons(require('../../../Img/icons/taxStatementLogo.png'), 'Tax Statement', () => this.showDocuments(), true)}
          {this.renderDecisionButtons(require('../../../Img/icons/tradeConfirmation.png'), 'Trade Confirmation', () => this.showConfirmations(), true)}
          {this.renderDecisionButtons(require('../../../Img/icons/activityIcon.png'), 'Activity', () => this.showActivity(), true)}
          {this.renderDecisionButtons(require('../../../Img/icons/regularTransferIcon.png'), 'Regular Transfers', () => this.viewRegularTransfers(), false)}
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

  renderTodoCard (img, heading, screen) {
    return (
      <TouchableOpacity onPress={() => this.handleTodoFoo(screen)} style={{flexDirection: 'row', backgroundColor: '#FFF', height: 100, width: 300, marginRight: 10, marginLeft: 10, borderRadius: 7, shadowOpacity: 0.5, shadowRadius: 5, shadowColor: '#454955', shadowOffset: {width: 0, height: 0}}}>
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={img} style={{height: 30, width: 22}} />
        </View>
        <View style={{flex: 7, justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text style={{color: '#454955', fontFamily: 'Lato-Bold', fontSize: 18}}>
            {heading}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  // --------------------------------------------------------
  // Core render method

  renderBlankState () {
    const {todoList} = this.props
    console.log('todo list ::: ', todoList)
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <Text style={{color: '#9B9B9B', fontFamily: 'Lato-Bold', fontSize: 14, backgroundColor: 'transparent', textAlign: 'center', marginTop: 40}}>
          PARENT DASHBOARD
        </Text>
        <View style={{marginTop: 50}}>
          <Text style={{color: '#4A4A4A', fontFamily: 'Lato-Bold', fontSize: 20, backgroundColor: 'transparent', marginTop: 20, marginLeft: 30}}>
            GET STARTED
          </Text>
          <ScrollView horizontal style={{padding: 20}} showsHorizontalScrollIndicator={false}>
            {
              todoList && Object.values(todoList).map(todo => this.renderTodoCard(require('../../../Img/icons/completeProfile.png'), todo.title, todo.screen))
            }
          </ScrollView>
        </View>
      </View>
    )
  }

  renderPopulateState () {
    const {isFetchProcessing} = this.props
    return (
      <View style={{backgroundColor: '#FFF', flex: 1}}>
        <ProcessingIndicator isProcessing={isFetchProcessing} />
        {this.renderHeader()}
        <ScrollView style={{flex: 1}}>
          {this.renderMiddleContainer()}
          {this.renderOverview()}
          {this.renderNextPanel()}
          {this.renderFooterContainer()}
        </ScrollView>
      </View>
    )
  }

  render () {
    const {childrenAvailable} = this.props
    if (childrenAvailable) {
      return this.renderPopulateState()
    } else {
      return this.renderBlankState()
    }
  }

}

// ========================================================
// Prop verifiers
// ========================================================

ParentDashboard.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  childrenAvailable: PropTypes.bool.isRequired,

  firstname: PropTypes.string.isRequired,

  children: PropTypes.object.isRequired,

  childIDs: PropTypes.array.isRequired,

  userID: PropTypes.string.isRequired,

  todoList: PropTypes.object.isRequired,

  idToken: PropTypes.string.isRequired,

  totalPortfolioValue: PropTypes.number.isRequired,

  growthValue: PropTypes.number.isRequired,

  growthPercentage: PropTypes.number.isRequired,
  // total weekly invested
  monthlyInvestment: PropTypes.number.isRequired,
  // invested to date
  investedToDate: PropTypes.number.isRequired,
  // next milestone
  nextMilestone: PropTypes.number.isRequired,
  // transfer object
  transferObj: PropTypes.array.isRequired,
  // is confirmations/statements processing
  isFetchProcessing: PropTypes.bool.isRequired
}

// ========================================================
// Export
// ========================================================

export default ParentDashboard
