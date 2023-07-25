/* eslint-disable no-unused-vars,camelcase,no-trailing-spaces */
/**
 * User Input Detail Number 1.
 * - First Name
 * - Last Name
 *
 * Created by viktor on 27/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Keyboard, ScrollView, Image, ActivityIndicator }
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
  from './Styles/InputDetailStyle'
import CustomFormInput
  from '../Utility/CustomFormInput'
import CustomButton
  from '../Utility/CustomButton'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import GravityCapsule
  from '../Utility/GravityCapsule'

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.ADD_USER
})

// ========================================================
// Core Component
// ========================================================

class TermsAccept extends Component {

  agreeTC () {
    const {handleLocalAction, localActions, navigator, userID} = this.props
    handleLocalAction({type: localActions.AGREE, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.USER_ID]: userID})
  }
  disagreeTC () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.DISAGREE, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }
  closeTC () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.CLOSE_TC, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  renderHeader () {
    return (
      <LinearGradient colors={['#00CBCE', '#6BEAC0']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} locations={[0, 0.7]} style={{height: 70, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0}}>
        {/* <TouchableOpacity onPress={() => this.closeTC()} style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, top: 0, bottom: 0, width: 50}}> */}
        {/* <Icon name='clear' size={28} color='#FFF' /> */}
        {/* </TouchableOpacity> */}
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{backgroundColor: 'transparent', color: '#FFF', fontSize: 18, fontFamily: 'Lato-Regular'}}>
            Program Agreement
          </Text>
        </View>
      </LinearGradient>
    )
  }

  renderTextContainer () {
    return (
      <ScrollView style={{flex: 1, marginTop: 70, marginBottom: 50, marginLeft: 30, marginRight: 30}}>
        <Text style={{textAlign: 'center', fontFamily: 'Lato-Regular', fontSize: 16, color: '#4A4A4A', marginTop: 30}}>
          Updated September 27, 2017
        </Text>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: 16, color: '#4A4A4A', marginTop: 30}}>
          BY USING LOVED WEALTH YOU AGREE TO ENTER INTO THE PROGRAM AND ADVISORY AGREEMENT, AND THE BROKERAGE AGREEMENT AND AGREE TO BE BOUND BY THEIR TERMS AND CONDITIONS.
        </Text>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: 16, color: '#4A4A4A', marginTop: 30}}>
          Investment Advisory Agreement
        </Text>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: 16, color: '#4A4A4A', marginTop: 30}}>
          This brochure provides information about the qualifications and business practices of Elevated Principles Inc.. If you have any questions about the contents of this brochure, please contact us at 61407002427 or by email at:dave@sproutinvest.co. The information in this brochure has not been approved or verified by the United States Securities and Exchange Commission or by any state securities authority.
          Additional information about Elevated Principles Inc. is also available on the SEC’s website at www.adviserinfo.sec.gov. Elevated Principles Inc.’s CRD number is: 289171.
        </Text>
      </ScrollView>
    )
  }

  renderNextButton () {
    return (
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.disagreeTC()} style={{flex: 5, height: 50, backgroundColor: '#F1F1F1', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#00CBCE', fontSize: 16, fontFamily: 'Lato-Bold', backgroundColor: 'transparent'}}>
            Disagree
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.agreeTC()} style={{flex: 5, height: 50, backgroundColor: '#F1F1F1'}}>
          <LinearGradient colors={['#00CBCE', '#6BEAC0']} start={{x: 0, y: 0}} end={{x: 3, y: 1}} locations={[0, 0.7]} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#FFF', fontSize: 16, fontFamily: 'Lato-Bold', backgroundColor: 'transparent'}}>
              Agree
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={{backgroundColor: '#FFF', flex: 1}}>
        {this.renderHeader()}
        {this.renderTextContainer()}
        {this.renderNextButton()}
      </View>
    )
  }

}

TermsAccept.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // user id
  userID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(TermsAccept))

export default Screen
