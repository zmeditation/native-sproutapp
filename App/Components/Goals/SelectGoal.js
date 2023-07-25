/* eslint-disable no-unused-vars,no-multi-spaces,no-trailing-spaces */
/**
 * Created by viktor on 31/5/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Modal, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView }
  from 'react-native'
import {reduxForm}
  from 'redux-form'
import styles
  from './Styles/SelectGoalStyle'
import globalStyle
  from '../../Themes/ApplicationStyles'
import {FORM_TYPES, GOAL_TYPES}
  from '../../Config/contants'
import Fonts
  from '../../Themes/Fonts'
import { connect }
  from 'react-redux'
import CustomButton
  from '../Utility/CustomButton'
import LinearGradient
  from 'react-native-linear-gradient'
import colors
  from '../../Themes/Colors'
import ImagePicker
  from 'react-native-image-picker'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LWButton
  from '../Utility/LWButton'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'

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

class SelectGoal extends Component {

  // --------------------------------------------------------
  // Action handler

  handleAddGoal (goalName) {
    const {localActions, handleSubmit, userID, handleLocalAction, firstName, navigator, childID} = this.props
    handleLocalAction({
      type: localActions.ADD_GOAL,
      [CHILD_ENTITIES.CHILD_ID]: childID,
      [GOAL_ENTITIES.NAME]: goalName,
      [CHILD_ENTITIES.FIRST_NAME]: firstName,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [USER_ENTITIES.USER_ID]: userID
    })
  }

  // --------------------------------------------------------
  // Child Components

  renderHorizontalLine () {
    return (
      <View style={globalStyle.screen.horizontalLine.containerStyle}>
        <View style={globalStyle.screen.horizontalLine.lineStyle} />
      </View>
    )
  }

  renderHeading () {
    const {firstName} = this.props
    return (
      <View style={globalStyle.screen.h1.containerStyle}>
        <Text style={globalStyle.screen.h1.textStyle}>
          Choose a goal {'\n'} for {firstName}
        </Text>
      </View>
    )
  }

  renderPrimaryGoals (goalData) {
    const {primaryGoals} = this.props
    return (
      <View style={styles.primaryGoalsContainer}>
        <Text style={{fontSize: 14, fontFamily: Fonts.type.bold, color: '#FFF', backgroundColor: 'transparent', marginTop: 18, marginBottom: 18}}>
          POPULAR
        </Text>
        {primaryGoals.map(goal => this.renderPrimaryGoalType(goal.img, goal.heading))}
      </View>
    )
  }

  renderPrimaryGoalType (img, heading) {
    const {width} = Dimensions.get('window')
    const _width = width - 20
    return (
      <TouchableOpacity style={{flex: 1, height: 120, width: _width, marginBottom: 10, borderRadius: 8}} onPress={() => this.handleAddGoal(heading)}>

        <Image source={img} style={styles.primaryGoalInnerLayerStyle} />

        <View style={{backgroundColor: 'rgba(1, 86, 79, 0.3)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 8}} />

        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 8}}>
          <Text style={{fontSize: 22, fontFamily: Fonts.type.bold, color: '#FFF', backgroundColor: 'transparent'}}>
            {heading}
          </Text>
        </View>

      </TouchableOpacity>
    )
  }

  renderEducationGoals () {
    const {width} = Dimensions.get('window')
    return (
      <View style={styles.secondaryGoalContainer}>
        <Text style={{fontSize: 22, fontFamily: Fonts.type.light, color: '#FFF', backgroundColor: 'transparent', marginBottom: 10}}>
          Education
        </Text>
        {this.renderHorizontalLine(70)}
        <View style={{...styles.secondaryGoalRowContainer, width: width, marginTop: 20}}>
          {this.renderSecondaryGoal(require('../../../Img/goals/education_college.png'), 'College', 'Maecenas sed diam eget risus varius blandit sit amet non magna.')}
          {this.renderSecondaryGoal(require('../../../Img/goals/education_college_living.png'), 'College Living Expenses', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
        </View>
        <View style={{...styles.secondaryGoalRowContainer, width: width}}>
          {this.renderSecondaryGoal(require('../../../Img/goals/education_school.png'), 'School', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
          {this.renderSecondaryGoal(require('../../../Img/goals/education_school_excursion.png'), 'School Excursion', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
        </View>
        <View style={{...styles.secondaryGoalRowContainer, width: width}}>
          {this.renderSecondaryGoal(require('../../../Img/goals/education_code_club.png'), 'Code Club', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
          {this.renderSecondaryGoal(require('../../../Img/goals/education_informal.png'), 'Informal Education', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
        </View>
      </View>
    )
  }

  renderEnrichingExperience () {
    const {width} = Dimensions.get('window')
    return (
      <View style={styles.secondaryGoalContainer}>
        <Text style={{fontSize: 22, fontFamily: Fonts.type.light, color: '#FFF', backgroundColor: 'transparent', marginBottom: 10}}>
          Enriching Experiences
        </Text>
        {this.renderHorizontalLine(70)}
        <View style={{...styles.secondaryGoalRowContainer, width: width, marginTop: 20}}>
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_tennis.png'), 'Tennis Lessons', 'Maecenas sed diam eget risus varius blandit sit amet non magna.')}
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_golf.png'), 'Golf Lessons', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
        </View>
        <View style={{...styles.secondaryGoalRowContainer, width: width}}>
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_cheer.png'), 'Cheer Camp', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_camp.png'), 'Camp', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
        </View>
        <View style={{...styles.secondaryGoalRowContainer, width: width}}>
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_music.png'), 'Music Lessons', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_football.png'), 'Football Coaching', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
        </View>
        <View style={{...styles.secondaryGoalRowContainer, width: width}}>
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_music_camp.png'), 'Music Camp', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_travel.png'), 'Travel', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
        </View>
        <View style={{...styles.secondaryGoalRowContainer, width: width}}>
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_museum.png'), 'Museum Visits', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
          {this.renderSecondaryGoal(require('../../../Img/goals/enriching_art.png'), 'Art Classes', 'Maecenas sed diam eget risus varius blandit sit amet non magna. ')}
        </View>
      </View>
    )
  }

  renderSecondaryGoal (img, heading, description) {
    const {width} = Dimensions.get('window')
    const _width = Math.ceil((width - 30) / 2)
    return (
      <TouchableOpacity style={{...styles.secondaryGoal, width: _width, borderRadius: 6}} onPress={() => this.handleAddGoal(heading)}>

        <View style={{height: 120, width: _width, borderTopRightRadius: 6, borderTopLeftRadius: 6}}>
          <Image source={img} style={{height: undefined, width: undefined, flex: 1, borderTopRightRadius: 6, borderTopLeftRadius: 6}} />
        </View>

        <View style={{position: 'absolute', top: 120, left: 0, right: 0, bottom: 0, padding: 15}}>
          <Text style={{fontSize: 16, fontFamily: Fonts.type.regular, color: '#FFF', backgroundColor: 'transparent', marginBottom: 6}}>
            {heading}
          </Text>
          <Text style={{fontSize: 14, fontFamily: Fonts.type.light, color: '#FFF', backgroundColor: 'transparent'}}>
            {description}
          </Text>
        </View>

      </TouchableOpacity>
    )
  }

  renderAddCustomContainer () {
    const {handleLocalAction, localActions, navigator, childID} = this.props
    return (
      <View style={styles.AddCustomContainer}>
        <LWButton title='Add a Custom Goal' onPress={() => handleLocalAction({type: localActions.SELECT_CUSTOM_GOAL, [CHILD_ENTITIES.CHILD_ID]: childID, [COMMON_ENTITIES.NAVIGATOR]: navigator})} buttonType={BUTTON_TYPES.DECISION_BUTTON} extraTextStyle={{fontFamily: Fonts.type.regular}} />
      </View>
    )
  }

  // --------------------------------------------------------
  // Render Core Component

  render () {
    const {isProcessing} = this.props
    return (
      <LinearGradient
        colors={['#01564F', '#89C876', '#95D279', '#95D279', '#00A776']}
        start={{x: 0.9, y: -0.4}} end={{x: 0, y: 1}}
        locations={[0.0, 0.3, 0.4, 0.5, 1]}
        style={{...globalStyle.screen.containers.root}}>
        <ProcessingIndicator isProcessing={isProcessing} />
        <ScrollView>
          {this.renderHeading()}
          {this.renderHorizontalLine()}
          {this.renderPrimaryGoals()}
          {this.renderEducationGoals()}
          {this.renderEnrichingExperience()}
          {this.renderAddCustomContainer()}
        </ScrollView>
      </LinearGradient>
    )
  }

}

SelectGoal.propTypes = {
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // child id
  childID: PropTypes.string.isRequired,

  // firstname of the child
  firstName: PropTypes.string.isRequired,

  primaryGoals: PropTypes.array,

  isProcessing: PropTypes.bool.isRequired,

  userID: PropTypes.string.isRequired
}

SelectGoal.defaultProps = {
  isProcessing: false
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(SelectGoal))

export default Screen

