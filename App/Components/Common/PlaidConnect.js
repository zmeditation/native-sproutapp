/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 7/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, Image, ActivityIndicator, WebView, LayoutAnimation }
  from 'react-native'
import { Button, SocialIcon }
  from 'react-native-elements'
import {FORM_TYPES}
  from '../../Config/contants'
import styles
  from './Styles/PlaidConnectStyle'
import Fonts
  from '../../Themes/Fonts'
import SimpleButton
  from '../Utility/SimpleButton'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {COMMON_ENTITIES, PLAID_ACTIONS}
  from '../../Utility/Mapper/Common'
import {parsePlaidAction}
  from '../../Utility/Transforms/Parsers'
import LinearGradient
  from 'react-native-linear-gradient'

// ========================================================
// Utility
// ========================================================

// ========================================================
// Core Component
// ========================================================

class PlaidConnect extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showNotification: true
    }
  }

  hideNotification () {
    console.log('---- hidding notification now ----')
    this.setState({showNotification: false})
  }

  componentDidMount () {
    console.log('-component did mount-')
    setTimeout(() => {
      this.setTimePassed()
    }, 1000)
  }

  setTimePassed () {
    console.log('-set time passed-')
    LayoutAnimation.linear()
    this.setState({showNotification: false})
  }

  onSuccess (data) {
    const {handleLocalAction, localActions, navigator, parentNavigator, userID, childID, goalID} = this.props
    console.log('SUCCESS {} :-', data, userID)
    handleLocalAction({type: localActions.SUCCESS, [COMMON_ENTITIES.NAVIGATOR]: navigator, [COMMON_ENTITIES.PARENT_NAVIGATOR]: parentNavigator, [USER_ENTITIES.USER_ID]: userID, [USER_ENTITIES.PLAID_ACCOUNT_ID]: data['metadata']['account_id'], [USER_ENTITIES.PLAID_PUBLIC_TOKEN]: data['metadata']['public_token'], childID: childID, goalID: goalID})
  }

  onExit () {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.EXIT, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  skip () {
    const {handleLocalAction, localActions, navigator, parentNavigator} = this.props
    handleLocalAction({type: localActions.SKIP, [COMMON_ENTITIES.NAVIGATOR]: parentNavigator})
  }

  onMessage (event) {
    let data
    try {
      data = JSON.parse(event.nativeEvent.data)
      let action = parsePlaidAction(data['action'])

      if (action) {
        switch (action) {

          case PLAID_ACTIONS.CONNECTED:
            this.onSuccess(data)
            break

          case PLAID_ACTIONS.EXIT:
            this.onExit(data)
            break
        }
      }
    } catch (err) {
      console.log('**** error while parsing plaid event ****', err)
    }
  }

  renderWebview () {
    let publicKey = '8718862d2816f18ab24087db6dc45a'
    let clientID = '58f82c39bdc6a4280851bbad'
    let secret = '0152ce945634b095cb5df1878d3154'
    let env = 'sandbox'
    let clientName = 'SproutApp'
    let product = 'auth'
    // https://github.com/react-community/react-navigation/issues/271
    // https://github.com/wix/react-native-navigation/issues/1304

    return (
      <View style={{flex: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>
        <WebView
          style={{flex: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderBottomWidth: 2}}
          onError={err => console.log('error: ', err)}
          onLoad={() => console.log('---- loaded ----')}
          canGoBack
          canGoForward
          onMessage={event => this.onMessage(event)}
          source={{uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${publicKey}&apiVersion=v2&env=${env}&product=${product}&clientName=${clientName}&isWebView=true&isMobile=true&selectAccount=true&client_id=${clientID}&secret=${secret}`}}
        />
      </View>
    )
  }

  renderSkipButton () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
        <Text style={{marginBottom: 5}}>
          OR
        </Text>
        <SimpleButton title='SKIP' onPress={() => this.skip()} themeColor='rgb(193,201,246)' />
      </View>
    )
  }

  renderNotification () {
    return (
      <LinearGradient
        colors={['#01564F', '#89C876', '#95D279', '#95D279', '#00A776']}
        start={{x: 0.9, y: -0.4}} end={{x: 0, y: 1}}
        locations={[0.0, 0.3, 0.4, 0.5, 1]}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 32, color: '#FFF', backgroundColor: 'transparent', textAlign: 'center'}}>
          You're ready to invest {'\n'}
          once we've connected {'\n'}
          your bank
        </Text>
        <Image source={require('../../../Img/icons/transfer-money.png')} style={{height: 130, width: 130, marginTop: 50}} />
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 20, color: '#FFF', backgroundColor: 'transparent', marginTop: 50, textAlign: 'center'}}>
          Sign in to your bank account to {'\n'}
          start your investment plan
        </Text>
      </LinearGradient>
    )
  }

  render () {
    const {showNotification} = this.state
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {this.renderWebview()}
      </View>
    )
  }

}

PlaidConnect.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // parent navigator
  parentNavigator: PropTypes.object.isRequired,

  // user ID
  userID: PropTypes.string.isRequired,
  childID: PropTypes.string.isRequired,
  goalID: PropTypes.string.isRequired
}

// ========================================================
// Export
// ========================================================

export default PlaidConnect
