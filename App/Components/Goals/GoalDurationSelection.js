/* eslint-disable no-unused-vars,no-useless-constructor,no-trailing-spaces */
/**
 * Created by demon on 19/2/18.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import {View, Text, ScrollView, TouchableOpacity, Dimensions, Animated, TouchableWithoutFeedback}
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import { KeyboardAwareScrollView }
  from 'react-native-keyboard-aware-scroll-view'
import styles
  from '../../Themes/ApplicationStyles'
import {FORM_TYPES, GOAL_TYPES}
  from '../../Config/contants'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {formatDOB}
  from '../../Utility/Formatter/inputFormatter'
import {COMMON_ENTITIES, GOAL_DURATION_TYPE, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import { connect }
  from 'react-redux'
import { CHILD_ENTITIES as CHILD_ENTITES }
  from '../../Utility/Mapper/Child'
import LWFormInput
  from '../Utility/LWFormInput'
import LWButton
  from '../Utility/LWButton'

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

class GoalDurationSelection extends Component {

  // --------------------------------------------------------
  // lifecycle methods

  constructor (props) {
    super(props)
  }

  // --------------------------------------------------------
  // Action handlers

  toggleDuration (duration) {
    const {handleLocalAction, localActions} = this.props
    handleLocalAction({type: localActions.TOGGLE_DURATION, payload: {form: FORM_TYPES.ADD_GOAL, field: 'duration', duration: duration}})
  }

  next (d) {
    const {handleLocalAction, localActions, childID, goalID, navigator, navigatorTitle} = this.props
    handleLocalAction({type: localActions.SET_DURATION, [CHILD_ENTITES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [COMMON_ENTITIES.NAVIGATOR]: navigator, [COMMON_ENTITIES.NAVIGATOR_TITLE]: navigatorTitle})
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    const {goalName, firstName} = this.props
    return (
      <View style={{...styles.screen.h1.containerStyle, marginBottom: 0, alignItems: 'flex-start'}}>
        <Text style={{fontFamily: 'Lato-Light', fontSize: 20, color: '#00CBCE', backgroundColor: 'transparent'}}>
          {goalName}
        </Text>
        <Text style={{...styles.screen.h1.textStyle, color: '#4A4A4A', fontSize: 30, fontFamily: 'Kefa', textAlign: 'left', marginTop: 5}}>
          When do you want this for {firstName}?
        </Text>
      </View>
    )
  }

  renderPanelTextElement (d) {
    return (
      <TouchableOpacity onPress={() => this.next(d)}>
        <Text style={{fontFamily: 'Lato-Light', fontSize: 32, color: '#4A4A4A', backgroundColor: 'transparent', marginRight: 30}}>
          {d}
        </Text>
      </TouchableOpacity>
    )
  }

  renderPanel () {
    const {goalDurationType, age} = this.props
    let ageArr = []
    for (let i = age; i < age + 20; i++) {
      ageArr.push(i + 1)
    }
    console.log(' -------> goal :: ', goalDurationType, '\n:: ', ageArr, '\n ::: ', age)
    return (
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <Text style={{fontFamily: 'Lato-Light', fontSize: 32, color: '#00CBCE', backgroundColor: 'transparent', marginRight: 30}}>
          {goalDurationType}
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          horizontal>
          {ageArr.map(a => this.renderPanelTextElement(a))}
        </ScrollView>
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
  // Core render method

  render () {
    return (
      <View style={{paddingLeft: 40, paddingRight: 40, flex: 1}}>
        <KeyboardAwareScrollView style={{flex: 1}} extraScrollHeight={32} resetScrollToCoords={{x: 0, y: 0}} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>

          {this.renderHeading()}

          {this.renderPanel()}

        </KeyboardAwareScrollView>
      </View>
    )
  }
}

GoalDurationSelection.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  navigatorTitle: PropTypes.string.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // child id
  childID: PropTypes.string.isRequired,

  // goal id
  goalID: PropTypes.string.isRequired,

  // goal name
  goalName: PropTypes.string.isRequired,

  // first name
  firstName: PropTypes.string.isRequired,

  // child's age
  age: PropTypes.number.isRequired
}

// ========================================================
// Export
// ========================================================

const Screen = connect()(form(GoalDurationSelection))

export default Screen
