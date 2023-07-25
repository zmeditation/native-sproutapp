/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 1/12/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Alert, Image, KeyboardAvoidingView, Keyboard, ScrollView, ActivityIndicator, FlatList, TouchableOpacity }
  from 'react-native'
import { Button, Icon }
  from 'react-native-elements'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from './Styles/RecurringDetailStyle'
import CustomFormInput
  from '../Utility/CustomFormInput'
import CustomButton
  from '../Utility/CustomButton'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import {parseRecurringInvestmentDetail}
  from '../../Utility/Transforms/Parsers'
import {formatPrice, limitText}
  from '../../Utility/Transforms/Converter'
import LinearGradient
  from 'react-native-linear-gradient'
import GravityCapsule
  from '../Utility/GravityCapsule'
import Fonts
  from '../../Themes/Fonts'
import moment from 'moment'

// ========================================================
// Core Component
// ========================================================

class ViewTransfers extends Component {

  // ------------------------------------------------------------
  // action handlers

  // ------------------------------------------------------------
  // render child components

  renderTextBlock (amount, firstName, goal, duration, date, buttonName) {
    let str = formatPrice(amount) + ' for ' + firstName + '\'s ' + goal
    let dStr = (date && moment(date).format('dddd, MMMM Do YYYY')) || undefined

    return (
      <View style={{height: 100, justifyContent: 'center', borderBottomWidth: 1, borderColor: '#D7D7D7', paddingLeft: 20, paddingRight: 20}}>
        <Text style={{fontSize: 16, fontFamily: Fonts.type.regular, color: '#4A4A4A', backgroundColor: 'transparent'}}>
          {str}
        </Text>
        {
          dStr &&
          <Text style={{fontSize: 16, marginTop: 5, fontFamily: Fonts.type.regular, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            Next transfer date: {dStr}
          </Text>
        }
        <TouchableOpacity>
          <Text style={{fontSize: 16, marginTop: 5, fontFamily: Fonts.type.regular, color: '#38AA75', backgroundColor: 'transparent'}}>
            {buttonName}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderView () {
    const {transferObject} = this.props
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#FFF'}}>
        {
          transferObject.map(obj => {
            let firstName = obj[CHILD_ENTITIES.FIRST_NAME]
            return obj['goals'].map(goal => {
              let goalName = goal[GOAL_ENTITIES.NAME]
              let transactions = goal[GOAL_ENTITIES.TRANSACTIONS]
              return transactions && Object.values(transactions).map(t => {
                let status = t[GOAL_ENTITIES.TRANSACTION_STATUS]
                let amount = t[GOAL_ENTITIES.TRANSACTION_AMOUNT]
                let frequency = t[GOAL_ENTITIES.TRANSACTION_FREQUENCY]
                let nextTransferDate = t[GOAL_ENTITIES.TRANSACTION_NEXT_TRANSFER_DATE]
                return this.renderTextBlock(amount, firstName, goalName, frequency, nextTransferDate, status === 'processing' ? 'In-progress' : 'Not Initiated')
              })
            })
          })
        }
      </ScrollView>
    )
  }

  renderEmptyView () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../../../Img/intermediateScreen/transfers.png')} style={{width: 312, height: 490}} />
      </View>
    )
  }

  // ------------------------------------------------------------
  // render core component

  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {this.renderView()}
      </View>
    )
  }

}

ViewTransfers.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-native-navigation
  navigator: PropTypes.object.isRequired,

  // object containing transfer information
  transferObject: PropTypes.array.isRequired
}

// ========================================================
// Export
// ========================================================

export default ViewTransfers
