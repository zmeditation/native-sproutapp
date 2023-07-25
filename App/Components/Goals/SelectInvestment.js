/* eslint-disable no-unused-vars,no-multi-spaces,no-trailing-spaces */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Alert, FlatList, Modal, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView }
  from 'react-native'
import {reduxForm}
  from 'redux-form'
import globalStyle
  from '../../Themes/ApplicationStyles'
import {FORM_TYPES, GOAL_TYPES}
  from '../../Config/contants'
import { connect }
  from 'react-redux'
import ProcessingIndicator
  from '../Utility/ProcessingIndicator'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {analytics}
  from '../../Config/AppConfig'
import Swiper
  from 'react-native-swiper'

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

class SelectInvestment extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 0
    }
  }

  componentDidMount () {
    const {userID} = this.props
    analytics.screen({
      userId: userID,
      name: SPROUT.SELECT_GOAL_SCREEN,
      properties: {}
    })
  }

  // --------------------------------------------------------
  // Action handler

  handleAddGoal (goalName, riskType) {
    const {localActions, handleSubmit, userID, handleLocalAction, firstName, navigator, childID} = this.props
    handleLocalAction({
      type: localActions.ADD_GOAL,
      [CHILD_ENTITIES.CHILD_ID]: childID,
      [GOAL_ENTITIES.NAME]: goalName,
      [CHILD_ENTITIES.FIRST_NAME]: firstName,
      [COMMON_ENTITIES.NAVIGATOR]: navigator,
      [USER_ENTITIES.USER_ID]: userID,
      'riskType': riskType
    })
  }

  selectTab (tab) {
    this.setState({selectedTab: tab})
    console.log('-----> ', this._scroll)
    switch (tab) {
      case 0:
        this._scroll && this._scroll.scrollTo({x: 0, y: 0, animated: true})
        break
      case 1:
        this._scroll && this._scroll.scrollToEnd()
        break
      default:
        break
    }
  }

  // --------------------------------------------------------
  // Child Components

  renderHeading () {
    const {firstName} = this.props
    return (
      <View style={{...globalStyle.screen.h1.containerStyle, marginBottom: 0, marginLeft: 30, marginRight: 30, alignItems: 'flex-start'}}>
        <Text style={{...globalStyle.screen.h1.textStyle, color: '#00CBCE', fontSize: 36, fontFamily: 'Kefa', textAlign: 'left'}}>
          What is it you want for {firstName} ?
        </Text>
      </View>
    )
  }

  renderHorizontalSelector () {
    const {selectedTab} = this.state
    return (
      <View style={{flexDirection: 'row', borderColor: '#E6E6E6', marginRight: 30, marginLeft: 30, marginTop: 40, marginBottom: 40}}>
        <TouchableOpacity onPress={() => this.selectTab(0)}>
          <Text style={{fontFamily: 'Lato-Bold', fontSize: 20, color: '#4A4A4A', opacity: selectedTab === 0 ? 1 : 0.5}}>
            New Goal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.selectTab(1)} style={{marginLeft: 30}}>
          <Text style={{fontFamily: 'Lato-Bold', fontSize: 20, color: '#4A4A4A', opacity: selectedTab === 1 ? 1 : 0.5}}>
            New Investment
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderCard (img, heading, riskType) {
    const {width} = Dimensions.get('window')
    return (
      <TouchableOpacity style={{height: 150, width: width}} onPress={() => this.handleAddGoal(heading, riskType)}>
        <Image source={img} style={{width: undefined, height: undefined, flex: 1}} />
        <View style={{position: 'absolute', bottom: 30, left: 20, backgroundColor: 'transparent'}}>
          <Text style={{fontFamily: 'Lato-Bold', fontSize: 22, color: '#FFF'}}>
            {heading}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderGoals () {
    const {width} = Dimensions.get('window')
    return (
      <ScrollView style={{width: width, flex: 1}} showsVerticalScrollIndicator={false}>
        {this.renderCard(require('../../../Img/goalTypes/toCoverCollege.png'), 'To cover college')}
        {this.renderCard(require('../../../Img/goalTypes/toCoverSchool.png'), 'To cover schooling')}
        {this.renderCard(require('../../../Img/goalTypes/toCreateSafetyNet.png'), 'To create a safety net')}
        {this.renderCard(require('../../../Img/goalTypes/justMakeInvestments.png'), 'Just make investments')}
        {this.renderCard(require('../../../Img/goalTypes/experienceSomethingNew.png'), 'To experience something new')}
        {this.renderCard(require('../../../Img/goalTypes/prepareForRainyDay.png'), 'Prepare for rainy day')}
        {this.renderCard(require('../../../Img/goalTypes/coverCosts.png'), 'To cover their costs')}
        {this.renderCard(require('../../../Img/goalTypes/learnSports.png'), 'To learn sports')}
        {this.renderCard(require('../../../Img/goalTypes/learnMusic.png'), 'To learn music')}
        {this.renderCard(require('../../../Img/goalTypes/learnSomethingNew.png'), 'To learn something new')}
        {this.renderCard(require('../../../Img/goalTypes/nicePresent.png'), 'Give a nice present')}
        {this.renderCard(require('../../../Img/goalTypes/techTools.png'), 'Give the tech tools')}
      </ScrollView>
    )
  }

  renderInvestments () {
    const {width} = Dimensions.get('window')
    return (
      <ScrollView style={{width: width, flex: 1}}>
        {this.renderCard(require('../../../Img/investmentTypes/monopolyMan.png'), 'Monopoly Man: Homes, Hotels \n& Buildings', '01')}
        {this.renderCard(require('../../../Img/investmentTypes/americaFinest500.png'), 'America\'s Finest 500', '01')}
        {this.renderCard(require('../../../Img/investmentTypes/berkshireHathaway.png'), 'Warrent Buffet’s \n Berkshire Hathaway', '01')}
        {this.renderCard(require('../../../Img/investmentTypes/brandILove.png'), 'Brand I love', '01')}
        {this.renderCard(require('../../../Img/investmentTypes/municipalBonds.png'), 'Save us some tax: Municipal Bonds', '01')}
        {this.renderCard(require('../../../Img/investmentTypes/smallCompanies.png'), 'Small but nimble companies', '01')}
      </ScrollView>
    )
  }

  renderMerge () {
    return (
      <ScrollView ref={(ref) => { this._scroll = ref }} style={{flex: 1}} horizontal pagingEnabled>
        {this.renderGoals()}
        {this.renderInvestments()}
      </ScrollView>
    )
  }

  // --------------------------------------------------------
  // Render Core Component

  render () {
    const {isProcessing} = this.props
    return (
      <View style={{...globalStyle.screen.containers.root, backgroundColor: '#FFF'}}>
        <ProcessingIndicator isProcessing={isProcessing} />
        {this.renderHeading()}
        {this.renderHorizontalSelector()}
        {this.renderMerge()}
      </View>
    )
  }

}

SelectInvestment.propTypes = {
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

SelectInvestment.defaultProps = {
  isProcessing: false
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(SelectInvestment))

export default Screen

