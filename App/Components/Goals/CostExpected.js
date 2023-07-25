/* eslint-disable no-unused-vars,no-trailing-spaces */
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
import {View, Text, ScrollView, Dimensions, TouchableOpacity}
  from 'react-native'
import {Icon, Slider}
  from 'react-native-elements'
import {reduxForm, Field}
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
import LWTextInput
  from '../Utility/LWFormInput'
import { connect }
  from 'react-redux'
import { CHILD_ENTITIES as CHILD_ENTITES }
  from '../../Utility/Mapper/Child'
import GravityCapsule
  from '../Utility/GravityCapsule'
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

// ========================================================
// Core Component
// ========================================================

class CostExpected extends Component {

  // --------------------------------------------------------
  // lifecycle methods

  // --------------------------------------------------------
  // Action handlers

  updateField (action, field, value) {
    const {handleLocalAction} = this.props
    handleLocalAction({type: action, payload: {form: FORM_TYPES.ADD_GOAL, field: field, value: value}})
  }

  next () {
    const {handleLocalAction, localActions, childID, goalID, navigator, navigatorTitle} = this.props
    handleLocalAction({type: localActions.COST_EXPECTED_SELECTED, [CHILD_ENTITES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [COMMON_ENTITIES.NAVIGATOR]: navigator, [COMMON_ENTITIES.NAVIGATOR_TITLE]: navigatorTitle})
  }
  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    const {goalName} = this.props
    return (
      <View style={{...styles.screen.h1.containerStyle, marginBottom: 0, alignItems: 'flex-start'}}>
        <Text style={{fontFamily: 'Lato-Light', fontSize: 20, color: '#00CBCE', backgroundColor: 'transparent'}}>
          {goalName}
        </Text>
        <Text style={{...styles.screen.h1.textStyle, color: '#4A4A4A', fontSize: 30, fontFamily: 'Kefa', textAlign: 'left'}}>
          How much do you expect this to cost?
        </Text>
      </View>
    )
  }

  renderCost () {
    return (
      <View style={{paddingRight: 20, marginTop: 30, marginBottom: 30, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
          <Text style={{fontFamily: 'Lato-Light', fontSize: 60, color: '#4A4A4A', backgroundColor: 'transparent', bottom: 5}}>
            $
          </Text>
        </View>
        <View style={styles.screen.textInput.parentContainerStyle}>
          <Field name={GOAL_ENTITIES.COST_EXPECTED} accessible keyboardType='number-pad' accessibilityLabel={'costExpected'} component={LWTextInput} showBorder={false} placeholderText='250' extraTextStyle={{fontSize: 60, height: 70, lineHeight: 70, color: '#4A4A4A'}} />
        </View>
      </View>
    )
  }

  renderDetail () {
    return (
      <View>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#9B9B9B', backgroundColor: 'transparent'}}>
          Parents normally save $30,000 for their child’s college and finance the rest via a student loan. College costs between $20,000 and $60,000 per year. The expense depends on their length (about 4yrs) and whether they attend in or out of state's public,  or private college.
        </Text>
      </View>
    )
  }

  renderNextButton () {
    return (
      <GravityCapsule floatValue={0}>
        <TouchableOpacity onPress={() => this.next()} style={{height: 50, backgroundColor: '#F1F1F1'}}>
          <LinearGradient colors={['#00CBCE', '#6BEAC0']} start={{x: 0, y: 0}} end={{x: 3, y: 1}} locations={[0, 0.7]} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#FFF', fontSize: 16, fontFamily: 'Lato-Bold', backgroundColor: 'transparent'}}>
              CONFIRM
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </GravityCapsule>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    const {currentRiskIndex, riskValues, goalName} = this.props
    return (
      <ScrollView
        style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}
        scrollEnabled={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{...styles.screen.containers.root, paddingLeft: 20, paddingRight: 20, backgroundColor: '#FFF'}}
      >

        <View style={{...styles.screen.containers.root, paddingLeft: 40, paddingRight: 40, backgroundColor: '#FFF'}}>
          {this.renderHeading()}
          {this.renderCost()}
          {this.renderDetail()}
        </View>

        {this.renderNextButton()}

      </ScrollView>
    )
  }
}

CostExpected.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // navigator title
  navigatorTitle: PropTypes.string.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // user id
  userID: PropTypes.string.isRequired,

  // child id
  childID: PropTypes.string.isRequired,

  // goal id
  goalID: PropTypes.string.isRequired,

  // goal name
  goalName: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

const Screen = connect()(form(CostExpected))

export default Screen
