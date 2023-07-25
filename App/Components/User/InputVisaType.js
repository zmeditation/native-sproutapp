/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 2/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator }
  from 'react-native'
import {reduxForm, Field}
  from 'redux-form'
import { connect }
  from 'react-redux'
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from '../../Themes/ApplicationStyles'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import { COMMON_ENTITIES, CUSTOM_LIST_ENTITIES }
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'

// ========================================================
// Utility
// ========================================================

const form = reduxForm({
  form: FORM_TYPES.ADD_USER,
  destroyOnUnmount: false
})

let visaTypes = [
  {key: 'B1'},
  {key: 'C1'},
  {key: 'E1'},
  {key: 'E2'},
  {key: 'E3'},
  {key: 'F1'},
  {key: 'H1B'},
  {key: 'H2B'},
  {key: 'H3'},
  {key: 'K1'},
  {key: 'L1'}
]

// ========================================================
// Core Component
// ========================================================

class InputVisaType extends Component {

  // --------------------------------------------------------
  // Action handlers

  navigateToNextScreen (visaType) {
    const {localActions, handleLocalAction, navigator, nextScreen} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO_NEXT_SCREEN, [COMMON_ENTITIES.SCREEN_TYPE]: nextScreen, [COMMON_ENTITIES.NAVIGATOR]: navigator, form: FORM_TYPES.ADD_USER, field: USER_ENTITIES.VISA_TYPE, value: visaType})
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
    return (
      <View style={{...styles.screen.h1.containerStyle, marginTop: 40, marginBottom: 40}}>
        <Text style={styles.screen.h1.textStyle}>
          What visa do you currently hold?
        </Text>
      </View>
    )
  }

  renderCapsule (key) {
    return (
      <TouchableOpacity onPress={() => this.navigateToNextScreen(key)} style={capsuleStyle.capsuleContainer}>
        <View style={capsuleStyle.capsuleBodyContainer}>
          <Text style={capsuleStyle.capsuleTextStyle}>{key}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  // --------------------------------------------------------
  // Core render method

  render () {
    return (
      <View style={{...styles.screen.containers.root, backgroundColor: '#FFF'}}>

        {this.renderHeading()}

        <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={visaTypes}
            renderItem={({item}) => this.renderCapsule(item.key)} />
        </View>

      </View>
    )
  }
}

InputVisaType.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // next screen to navigate
  nextScreen: PropTypes.string.isRequired
}

const capsuleStyle = {
  container: {
    flex: 1
  },

  searchBarContainer: {
    marginBottom: 24
  },
  capsuleContainer: {
    flexDirection: 'row'
  },
  capsuleHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 40
  },
  capsuleBodyContainer: {
    borderBottomWidth: 1,
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: '#E6E6E6'
  },

  listViewContainer: {
    flex: 1
  },
  capsuleTextStyle: {
    fontSize: 18,
    backgroundColor: 'transparent',
    color: '#000',
    fontFamily: 'Lato-Regular',
    textAlign: 'center'
  },
  capsuleHeaderStyle: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(256, 256, 256, 0.4)',
    borderRadius: 40
  }

}

// ========================================================
// Export
// ========================================================
const Screen = connect()(form(InputVisaType))

export default Screen
