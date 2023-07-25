/* eslint-disable no-unused-vars,no-trailing-spaces,block-spacing,spaced-comment */
/**
 * Created by viktor on 5/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import {View, Text, Dimensions, Modal, ScrollView, TouchableHighlight, TouchableOpacity}
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import CustomButton
  from '../Utility/CustomButton'
import CustomButtonGroup
  from '../Utility/CustomButtonGroup'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
import {FORM_TYPES}
  from '../../Config/contants'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES, BUTTON_TYPES, FREQUENCY}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import Carousel
  from 'react-native-snap-carousel'
import { connect }
  from 'react-redux'
import { CHILD_ENTITIES }
  from '../../Utility/Mapper/Child'
import LWTextInput
  from '../Utility/LWFormInput'
import LWButton
  from '../Utility/LWButton'
import GravityCapsule
  from '../Utility/GravityCapsule'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
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

class RecurringAmount extends Component {

  // --------------------------------------------------------
  // lifecycle methods

  constructor (props) {
    super(props)
    this.state = {
      investOpen: false
    }
  }

  componentWillMount () {
    // this.updateRecurringAmount(this.props.recurringAmount)
    // this.updateRecurringType(this.props.recurringFrequency)
    this.updateOneOffInvestment(20)
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.RECURRING_AMOUNT_SCREEN,
      properties: {}
    })
  }

  // -------------------------------------------------------
  // action handlers

  updateField (action, field, value) {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: action, payload: {form: FORM_TYPES.ADD_GOAL, field: field, value: value}})
  }

  updateRecurringAmount ($) {
    const {localActions} = this.props
    this.updateField(localActions.UPDATE_RECURRING_AMOUNT, GOAL_ENTITIES.RECURRING_AMOUNT, $)
  }

  updateRecurringType (type) {
    const {localActions} = this.props
    this.updateField(localActions.UPDATE_RECURRING_TYPE, GOAL_ENTITIES.RECURRING_FREQUENCY, (type === undefined) ? FREQUENCY.ONCE : type)
  }

  updateOneOffInvestment ($) {
    const {localActions} = this.props
    this.updateField(localActions.UPDATE_ONE_OFF_INVESTMENT, GOAL_ENTITIES.ONE_OFF_INVESTMENT, $)
  }

  invest () {
    const {handleLocalAction, localActions, userID, isOneOffInv, recurringFrequency, childIDs, isPlaidLinked, oneOffInvestment, rec, childID, goalAmount, goalID, goalDuration, portfolioRisk, navigator} = this.props
    handleLocalAction({type: localActions.SHOW_INVEST,
      [USER_ENTITIES.USER_ID]: userID,
      [CHILD_ENTITIES.CHILD_ID]: childID,
      [GOAL_ENTITIES.GID]: goalID,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [USER_ENTITIES.PLAID_LINKED]: isPlaidLinked,
      [CHILD_ENTITIES.CHILD_IDs]: childIDs,
      [GOAL_ENTITIES.IS_ONE_OFF_INVESTMENT_ONLY]: isOneOffInv,
      patch: {
        [GOAL_ENTITIES.PORTFOLIO_RISK]: portfolioRisk,
        [GOAL_ENTITIES.GOAL_AMOUNT]: goalAmount,
        duration: goalDuration
      }
    })
  }

  skip () {
    const {handleLocalAction, localActions, userID, recurringAmount, childID, childIDs, goalID, isOneOffInv, portfolioRisk, goalAmount, goalDuration, navigator} = this.props
    handleLocalAction({type: localActions.SKIP,
      [USER_ENTITIES.USER_ID]: userID,
      [CHILD_ENTITIES.CHILD_ID]: childID,
      [CHILD_ENTITIES.CHILD_IDs]: childIDs,
      [GOAL_ENTITIES.GID]: goalID,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [GOAL_ENTITIES.IS_ONE_OFF_INVESTMENT_ONLY]: isOneOffInv,
      form: FORM_TYPES.ADD_GOAL,
      patch: {
        [GOAL_ENTITIES.PORTFOLIO_RISK]: portfolioRisk,
        [GOAL_ENTITIES.GOAL_AMOUNT]: goalAmount,
        [GOAL_ENTITIES.RECURRING_AMOUNT]: recurringAmount,
        duration: goalDuration
      }
    })
  }

  // -------------------------------------------------------
  // child render methods

  renderHeading () {
    return (
      <View style={{...styles.screen.h1.containerStyle, marginTop: 60}}>
        <Text style={{...styles.screen.h1.textStyle, fontFamily: 'Kefa', fontSize: 24, color: '#4A4A4A'}}>
          Make a one-off investment
        </Text>
      </View>
    )
  }

  renderTopContainer () {
    return (
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer} />
        <View style={styles.headingContainer}>
          <Text style={styles.headingStyle}>
            Set up Timmy's first investment
          </Text>
        </View>
      </View>
    )
  }

  renderRecurringTypeContainer () {
    let {width} = Dimensions.get('window')
    const {handleLocalAction, localActions} = this.props
    let buttonMap = {}

    return (
      <View style={styles.recurringTypeContainer}>
        <Carousel
          containerCustomStyle={{height: 44}}
          firstItem={1}
          inactiveSlideScale={1}
          onSnapToItem={(index) => {
            this.updateRecurringType(index)
          }}
          ref={(carousel) => { this._carousel = carousel }}
          sliderWidth={width}
          itemWidth={156}
        >
          <CustomButton key={0} onClick={() => undefined} customBorderWidth={1} title={'ONE OFF'} />
          <CustomButton key={1} onClick={() => undefined} customBorderWidth={1} title={'EVERY WEEK'} />
          <CustomButton onClick={() => undefined} customBorderWidth={1} title={'EVERY 2 WEEKS'} />
        </Carousel>
      </View>
    )
  }

  renderRecurringAmountHeader () {
    const {oneOffInvestment} = this.props
    return (
      <View style={styles.screen.containers.centeringContainer}>
        <View style={{...styles.screen.containers.centeringContainer, flexDirection: 'row', marginBottom: 20}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 16, backgroundColor: 'transparent', color: '#4A4A4A'}}>
            One-off investment
          </Text>
        </View>
        <Text style={{fontSize: 36, fontFamily: 'Lato-Black', color: 'rgb(0, 109, 87)', backgroundColor: 'transparent'}}>
          ${oneOffInvestment}
        </Text>
      </View>
    )
  }

  renderRecurringInput () {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 80}}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
          <Text style={{fontFamily: 'Lato-Black', fontSize: 60, color: '#4A4A4A', backgroundColor: 'transparent', bottom: 5}}>
            $
          </Text>
        </View>
        <View style={{width: 100, justifyContent: 'center', bottom: 5}}>
          <Field name={GOAL_ENTITIES.ONE_OFF_INVESTMENT} accessible keyboardType='number-pad' accessibilityLabel={'costExpected'} component={LWTextInput} showBorder={false} placeholderText='20' extraTextStyle={{fontSize: 60, height: 70, lineHeight: 70, fontFamily: 'Lato-Black', color: '#4A4A4A'}} />
        </View>
      </View>
    )
  }

  renderRecurringAmountInputContainer () {
    const {oneOffInvestment} = this.props
    return (
      <View style={{height: 200}}>
        <CustomButtonGroup activePrice={oneOffInvestment} foo={this.updateOneOffInvestment.bind(this)} />
      </View>
    )
  }

  renderNextButton () {
    return (
      <GravityCapsule floatValue={0}>
        <TouchableOpacity onPress={() => this.invest()} style={{height: 50, backgroundColor: '#F1F1F1'}}>
          <LinearGradient colors={['#00CBCE', '#6BEAC0']} start={{x: 0, y: 0}} end={{x: 3, y: 1}} locations={[0, 0.7]} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#FFF', fontSize: 16, fontFamily: 'Lato-Bold', backgroundColor: 'transparent'}}>
              CONFIRM
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </GravityCapsule>
    )
  }

  // -------------------------------------------------------
  // main render methods

  render () {
    const {isPlaidProcessing, recurringFrequency, goalAmount} = this.props
    console.log('freq :: ', recurringFrequency, '\n amount :: ', goalAmount)
    return (
      <ScrollView
        contentContainerStyle={{...styles.screen.containers.root, paddingLeft: 20, paddingRight: 20, backgroundColor: '#FFF'}}
        scrollEnabled={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
      >
        <ProcessingIndicator isProcessing={isPlaidProcessing} />
        {this.renderHeading()}
        {this.renderRecurringInput()}
        {this.renderNextButton()}
      </ScrollView>
    )
  }
}

RecurringAmount.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  isProcessing: PropTypes.bool.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // recurring amount of the goal
  recurringAmount: PropTypes.number,

  oneOffInvestment: PropTypes.number,

  recurringFrequency: PropTypes.number,

  isPlaidLinked: PropTypes.bool.isRequired,

  goalDuration: PropTypes.number,
  goalAmount: PropTypes.number,
  portfolioRisk: PropTypes.number,

  userID: PropTypes.string.isRequired,
  childID: PropTypes.string.isRequired,
  goalID: PropTypes.string.isRequired,

  childIDs: PropTypes.array,

  isPlaidProcessing: PropTypes.bool.isRequired,

  isOneOffInv: PropTypes.bool.isRequired
}

// ========================================================
// Export
// ========================================================

const Screen = connect()(form(RecurringAmount))

export default Screen
