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
import {View, Text, Dimensions, TouchableOpacity}
  from 'react-native'
import {Icon, Slider}
  from 'react-native-elements'
import {reduxForm}
  from 'redux-form'
import styles
  from '../../Themes/ApplicationStyles'
import Fonts
  from '../../Themes/Fonts'
import {FORM_TYPES}
  from '../../Config/contants'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, BUTTON_TYPES, FREQUENCY}
  from '../../Utility/Mapper/Common'
import {formatPrice}
  from '../../Utility/Transforms/Converter'
import LinearGradient
  from 'react-native-linear-gradient'
import LWButton
  from '../Utility/LWButton'
import { connect }
  from 'react-redux'
import { CHILD_ENTITIES as CHILD_ENTITES }
  from '../../Utility/Mapper/Child'
import moment
  from 'moment'
import * as Progress
  from 'react-native-progress'
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

const DIFF = 1000

// ========================================================
// Core Component
// ========================================================

class GoalAmount extends Component {

  // --------------------------------------------------------
  // lifecycle methods

  componentWillMount () {
    let props = this.props
    const {recurringAmount} = this.props
    this.reflectGoalAmount(recurringAmount)
    this.updateGoalAmount(props.goalAmount)
    this.updateRecurringAmount(props.recurringAmount)
    this.updateRecurringType(props.recurringFrequency)
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.GOAL_AMOUNT_SCREEN,
      properties: {}
    })
  }

  // --------------------------------------------------------
  // Action handlers

  updateField (action, field, value) {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: action, payload: {form: FORM_TYPES.ADD_GOAL, field: field, value: value}})
  }

  updateGoalAmount ($) {
    const {localActions} = this.props
    this.updateField(localActions.UPDATE_GOAL_AMOUNT, GOAL_ENTITIES.GOAL_AMOUNT, $)
  }

  updateReturns ($) {
    const {localActions} = this.props
    this.updateField(localActions.UPDATE_RETURNS, GOAL_ENTITIES.RETURNS, $)
  }

  updateRecurringAmount ($) {
    const {localActions} = this.props
    this.updateField(localActions.UPDATE_RECURRING_AMOUNT, GOAL_ENTITIES.RECURRING_AMOUNT, $)
    this.reflectGoalAmount($)
  }

  updateRecurringType (type) {
    const {localActions} = this.props
    let frequency
    switch (type) {
      case 'Fortnightly':
        frequency = FREQUENCY.FORTNIGHT
        break
      case 'Weekly':
        frequency = FREQUENCY.ONE_WEEK
        break
      case 'Monthly':
        frequency = FREQUENCY.ONE_MONTH
        break
      default:
        frequency = FREQUENCY.ONE_WEEK
        break
    }
    this.updateField(localActions.UPDATE_RECURRING_TYPE, GOAL_ENTITIES.RECURRING_FREQUENCY, frequency)
  }

  reflectGoalAmount ($) {
    const {childDOB, targetYear, growthRate} = this.props
    console.log('growth rate ::: ', growthRate)
    const targetDate = childDOB && moment(childDOB).add(targetYear, 'y')
    const currentDate = moment()
    const diff = targetDate.diff(currentDate, 'w')
    const goalAmount = $ * diff

    // console.log('diff :: ', diff)
    // console.log('DOB :: ', childDOB, '\n target dob :: ', targetDate)
    // console.log('amount :: ', goalAmount)
    let a = Math.pow((1 + growthRate), diff)
    let b = a - 1
    let c = b / growthRate
    let d = $ * c
    let returns = d - goalAmount

    this.updateGoalAmount(goalAmount)
    this.updateReturns(returns)
  }

  incrementGoalAmount () {
    const {goalAmount} = this.props
    this.updateGoalAmount(goalAmount + DIFF)
  }
  decrementGoalAmount () {
    const {goalAmount} = this.props
    goalAmount > 0 && this.updateGoalAmount(goalAmount - DIFF)
  }
  incrementRecurringAmount () {
    const {recurringAmount} = this.props
    this.updateRecurringAmount(recurringAmount + 5)
  }
  decrementRecurringAmount () {
    const {recurringAmount} = this.props
    recurringAmount > 0 && this.updateRecurringAmount(recurringAmount - 5)
  }
  next () {
    const {handleLocalAction, localActions, childID, goalID, navigator, navigatorTitle} = this.props
    handleLocalAction({type: localActions.SET_GOAL_AMOUNT, [CHILD_ENTITES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [COMMON_ENTITIES.NAVIGATOR]: navigator, [COMMON_ENTITIES.NAVIGATOR_TITLE]: navigatorTitle})
  }
  skip () {
    const {handleLocalAction, localActions, childID, goalID, navigator, navigatorTitle} = this.props
    handleLocalAction({type: localActions.SKIP, [CHILD_ENTITES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [COMMON_ENTITIES.NAVIGATOR]: navigator, [COMMON_ENTITIES.NAVIGATOR_TITLE]: navigatorTitle, form: FORM_TYPES.ADD_GOAL})
  }

  // --------------------------------------------------------
  // Child Components

  renderHorizontalLine () {
    return (
      <View style={styles.screen.horizontalLine.containerStyle}>
        <View style={styles.screen.horizontalLine.lineStyle} />
      </View>
    )
  }

  renderHeading () {
    const {recurringAmount, recurringFrequency} = this.props
    let frequencyTitle
    switch (recurringFrequency) {
      case FREQUENCY.ONE_WEEK:
        frequencyTitle = 'week'
        break
      case FREQUENCY.FORTNIGHT:
        frequencyTitle = 'fortnight'
        break
      case FREQUENCY.ONE_MONTH:
        frequencyTitle = 'month'
        break
      default:
        frequencyTitle = 'week'
    }
    return (
      <View style={{marginTop: 60, marginBottom: 30}}>
        <Text style={{...styles.screen.h1.textStyle, textAlign: 'left', fontFamily: 'Lato-Light', fontSize: 26, color: '#4A4A4A', backgroundColor: 'transparent'}}>
          My plan: Invest ${recurringAmount} {'\n'}
          per {frequencyTitle}
        </Text>
      </View>
    )
  }

  renderSubheading () {
    const {goalAmount, returns, recurringAmount} = this.props
    const total = goalAmount + returns
    return (
      <View style={{marginTop: 20, marginBottom: 20}}>
        <Text style={{fontFamily: 'Lato-Light', fontSize: 30, backgroundColor: 'transparent', color: '#00CBCE', textAlign: 'center'}}>
          To reach {formatPrice(total)} when Adam's 8 year old.
        </Text>
      </View>
    )
  }

  renderNextButton () {
    return (
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.skip()} style={{flex: 5, height: 50, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#E6E6E6', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#00CBCE', fontSize: 16, fontFamily: 'Lato-Bold', backgroundColor: 'transparent'}}>
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.next()} style={{flex: 5, height: 50, backgroundColor: '#F1F1F1'}}>
          <LinearGradient colors={['#00CBCE', '#6BEAC0']} start={{x: 0, y: 0}} end={{x: 3, y: 1}} locations={[0, 0.7]} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#FFF', fontSize: 16, fontFamily: 'Lato-Bold', backgroundColor: 'transparent'}}>
              Confirm
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }

  renderDetail () {
    const {goalAmount, returns} = this.props
    const total = goalAmount + returns
    return (
      <View style={{marginTop: 20, marginBottom: 40}}>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent', textAlign: 'center'}}>
          At age 18, you should have reached {'\n'} approximately {formatPrice(total)}
        </Text>
      </View>
    )
  }

  renderRecurringAmountSlider () {
    const {recurringAmount, recurringFrequency} = this.props
    let frequencyTitle, frequencyTitleTwo, frequencyTitleThree
    switch (recurringFrequency) {
      case FREQUENCY.ONE_WEEK:
        frequencyTitle = 'week'
        frequencyTitleTwo = 'Fortnightly'
        frequencyTitleThree = 'Monthly'
            break
      case FREQUENCY.FORTNIGHT:
        frequencyTitle = 'fortnight'
        frequencyTitleTwo = 'Weekly'
        frequencyTitleThree = 'Monthly'
        break
      case FREQUENCY.ONE_MONTH:
        frequencyTitle = 'month'
        frequencyTitleTwo = 'Fortnightly'
        frequencyTitleThree = 'Weekly'
        break
      default:
        frequencyTitle = 'week'
        frequencyTitleTwo = 'Fortnightly'
        frequencyTitleThree = 'Monthly'
    }
    console.log('one : ', frequencyTitle, '\nTwo: ', frequencyTitleTwo, '\nThree : ', frequencyTitleThree)
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.updateRecurringType(frequencyTitleTwo)}>
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
              {frequencyTitleTwo}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateRecurringType(frequencyTitleThree)}>
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
              {frequencyTitleThree}
            </Text>
          </TouchableOpacity>
        </View>
        <Slider
          minimumTrackTintColor='rgb(0, 222, 186)'
          maximumTrackTintColor='#F1F1F1'
          thumbTintColor='rgb(0, 222, 186)'
          minimumValue={5}
          maximumValue={250}
          step={5}
          value={recurringAmount}
          onValueChange={(value) => this.updateRecurringAmount(value)}
          trackStyle={{height: 10, borderRadius: 5}}
          thumbStyle={{borderWidth: 5, width: 25, height: 25, borderRadius: 40, borderColor: '#FFF', shadowOpacity: 0.3, shadowOffset: {width: 1, height: 1}}}
        />
      </View>
    )
  }

  renderGoalAmountSlider () {
    const {goalAmount, returns} = this.props
    const total = goalAmount + returns
    const fill = (total !== 0 && (goalAmount / total)) || 0
    const {width} = Dimensions.get('window')
    return (
      <View style={{marginTop: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: 'black', backgroundColor: 'transparent'}}>
            {formatPrice(goalAmount)}
          </Text>
          <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: 'black', backgroundColor: 'transparent'}}>
            {formatPrice(returns)}
          </Text>
        </View>
        <Progress.Bar progress={fill} width={width - 80} height={10} color='#D4D4D4' unfilledColor='#D0FF00' borderWidth={0} style={{marginTop: 10, marginBottom: 10}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            Contributions
          </Text>
          <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            Returns
          </Text>
        </View>
      </View>
    )
  }

  renderAmountAccelerator () {
    const {goalAmount} = this.props
    return (
      <View style={{marginTop: 43}}>

        <View style={{...styles.screen.containers.centeringContainer}}>
          <Text style={{fontFamily: Fonts.type.medium, fontSize: 12, backgroundColor: 'transparent', color: '#FFF'}}>
            Target Amount
          </Text>
        </View>

        <View style={{marginTop: 7, marginBottom: 7, flexDirection: 'row'}}>
          <TouchableOpacity style={{paddingLeft: 20}} onPress={() => this.decrementGoalAmount()}>
            <Icon name='remove' size={28} color='#FFF' containerStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFF', borderRadius: 100, width: 40, height: 40}} />
          </TouchableOpacity>
          <View style={{...styles.screen.containers.spreadAndCenteringContainer}}>
            <Text style={{fontFamily: Fonts.type.regular, fontSize: 20, color: '#FFF', backgroundColor: 'transparent'}}>
              {formatPrice(goalAmount)}
            </Text>
          </View>
          <TouchableOpacity style={{paddingRight: 20}} onPress={() => this.incrementGoalAmount()}>
            <Icon name='add' size={28} color='#FFF' containerStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFF', borderRadius: 100, width: 40, height: 40}} />
          </TouchableOpacity>
        </View>

        <View style={{...styles.screen.containers.centeringContainer}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 12, backgroundColor: 'transparent', color: '#FFF'}}>
            Recommended
          </Text>
        </View>

      </View>
    )
  }

  renderRecurringAmountAccelerator () {
    const {recurringAmount, recurringFrequency} = this.props
    let subtitle = 'every two weeks'
    switch (recurringFrequency) {
      case 1: subtitle = 'every week'; break
      case 2: subtitle = 'every two weeks'; break
      case 3: subtitle = 'every month'; break
      default: subtitle = 'every two weeks'
    }
    return (
      <View style={{marginTop: 63}}>

        <View style={{...styles.screen.containers.centeringContainer}}>
          <Text style={{fontFamily: Fonts.type.medium, fontSize: 12, backgroundColor: 'transparent', color: '#FFF'}}>
            Regular Contribution
          </Text>
        </View>

        <View style={{marginTop: 7, marginBottom: 7, flexDirection: 'row'}}>
          <TouchableOpacity style={{paddingLeft: 20}} onPress={() => this.decrementRecurringAmount()}>
            <Icon name='remove' size={28} color='#FFF' containerStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFF', borderRadius: 100, width: 40, height: 40}} />
          </TouchableOpacity>
          <View style={{...styles.screen.containers.spreadAndCenteringContainer}}>
            <Text style={{fontFamily: Fonts.type.regular, fontSize: 20, color: '#FFF', backgroundColor: 'transparent'}}>
              {recurringAmount}
            </Text>
          </View>
          <TouchableOpacity style={{paddingRight: 20}} onPress={() => this.incrementRecurringAmount()}>
            <Icon name='add' size={28} color='#FFF' containerStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFF', borderRadius: 100, width: 40, height: 40}} />
          </TouchableOpacity>
        </View>

        <View style={{...styles.screen.containers.centeringContainer}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 12, backgroundColor: 'transparent', color: '#FFF'}}>
            {subtitle}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, paddingLeft: 20, marginTop: 10}}>
          <TouchableOpacity onPress={() => this.updateRecurringType(1)}>
            <Text style={{fontFamily: recurringFrequency === 1 ? Fonts.type.semibold : Fonts.type.light, fontSize: 12, backgroundColor: 'transparent', color: '#FFF'}}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateRecurringType(2)}>
            <Text style={{fontFamily: recurringFrequency === 2 ? Fonts.type.semibold : Fonts.type.light, fontSize: 12, backgroundColor: 'transparent', color: '#FFF'}}>
              Fortnightly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateRecurringType(3)}>
            <Text style={{fontFamily: recurringFrequency === 3 ? Fonts.type.semibold : Fonts.type.light, fontSize: 12, backgroundColor: 'transparent', color: '#FFF'}}>
              Monthly
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  renderRecurringFrequencyContainer () {
    return (
      <View style={{...styles.screen.containers.spreadAndCenteringContainer, marginBottom: 68, flexDirection: 'row'}}>
        <Text style={{fontFamily: Fonts.type.medium, fontSize: 12, backgroundColor: 'transparent', color: '#FFF'}}>
          starting
        </Text>
        <TouchableOpacity>
          <Text style={{fontFamily: Fonts.type.medium, fontSize: 12, backgroundColor: 'transparent', color: '#FFF', textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: '#FFF'}}>
            {' '}tomorrow
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    const {currentRiskIndex, riskValues} = this.props
    return (
      <View style={{...styles.screen.containers.root, paddingLeft: 40, paddingRight: 40, backgroundColor: '#FFF'}}>

        {this.renderHeading()}
        <View style={{flex: 1, justifyContent: 'space-around', marginBottom: 100, marginTop: 0}}>
          {this.renderRecurringAmountSlider()}
          {this.renderSubheading()}
          {this.renderGoalAmountSlider()}
        </View>
        {this.renderNextButton()}

      </View>
    )
  }
}

GoalAmount.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  navigatorTitle: PropTypes.string.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // total amount of the goal
  goalAmount: PropTypes.number.isRequired,

  returns: PropTypes.number.isRequired,

  // recurring amount
  recurringAmount: PropTypes.number.isRequired,
  // recurring frequency type
  recurringFrequency: PropTypes.number.isRequired,
  // rate of growth (for goal amount)
  growthRate: PropTypes.number.isRequired,

  userID: PropTypes.string.isRequired,
  childID: PropTypes.string.isRequired,
  goalID: PropTypes.string.isRequired,
  childDOB: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

const Screen = connect()(form(GoalAmount))

export default Screen
