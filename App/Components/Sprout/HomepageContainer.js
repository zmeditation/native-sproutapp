/* eslint-disable no-unused-vars,no-trailing-spaces,operator-linebreak */
/**
 * Created by viktor on 14/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, AsyncStorage, TouchableOpacity, Keyboard, ScrollView, Image, ActivityIndicator, StatusBar, Dimensions }
  from 'react-native'
import Fonts
  from '../../Themes/Fonts'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import LinearGradient
  from 'react-native-linear-gradient'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LWButton
  from '../Utility/LWButton'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {SPROUT}
  from '../../Utility/Mapper/Screens'
import ChildHomepage
  from '../../Containers/Sprout/Homepage'
import TabNavigator
  from 'react-native-tab-navigator'
import ParentDashboard
  from '../../Containers/User/ParentDashboard'
import Grow
  from '../../Containers/Grow/Homepage'

// ========================================================
// Core Component
// ========================================================

class HomepageContainer extends Component {

  // ------------------------------------------------------------
  // Lifecycle methods & event handlers

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
      translateX: 0,
      currentIndex: 0,
      selectedTab: 'child'
    }
  }

  onNavigatorEvent (event) {
    // handle a deep link
    if (event.type === 'DeepLink') {
      const screen = event.link // Link parts
      if (screen) {
        this.navigateToScreen(screen)
      }
    }
  }

  // ------------------------------------------------------------
  // Action handlers

  addAccount () {
    console.log('adding a new account')
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.ADD_ACCOUNT, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  navigateToScreen (screen) {
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.NAVIGATE_TO, [COMMON_ENTITIES.SCREEN_TYPE]: screen, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  handleAddChild () {
    const {handleLocalAction, localActions, userID, navigator} = this.props
    handleLocalAction({type: localActions.ADD_NEW_CHILD, [USER_ENTITIES.USER_ID]: userID, [COMMON_ENTITIES.NAVIGATOR]: navigator, [COMMON_ENTITIES.CAN_SKIP]: true, [COMMON_ENTITIES.SKIP_SCREEN]: SPROUT.CHILD_HOMEPAGE_CONTAINER_SCREEN})
  }

  updateX (change) {
    const {childIDs} = this.props
    const {width} = Dimensions.get('window')
    const totalChildren = childIDs.length

    let capsuleWidth = width / totalChildren
    this.setState({translateX: (change * capsuleWidth)})
  }

  updateIndex (index) {
    this.setState({currentIndex: index})
  }

  // ------------------------------------------------------------
  // Child render methods

  renderChildHomepage (child) {
    const {navigator} = this.props
    return <ChildHomepage key={'xxx'} navigator={navigator} />
  }

  renderChildren (childIDs, children) {
    let views = this.renderChildHomepage()
    return views
  }

  renderChildPanelElement (child, index) {
    return (
      <TouchableOpacity onPress={() => this.updateIndex(index)}>
        <Text style={{fontSize: 15, fontFamily: Fonts.type.regular, color: '#FFF', backgroundColor: 'transparent'}}>
          {child[CHILD_ENTITIES.FIRST_NAME]}
        </Text>
      </TouchableOpacity>
    )
  }

  renderChildPanel () {
    const {children, childIDs, navigator} = this.props
    const {width} = Dimensions.get('window')
    const totalChildren = childIDs.length
    let capsuleWidth = totalChildren && Math.ceil(width / totalChildren)
    if (totalChildren) {
      return (
        <View style={{height: 45}}>
          <View style={{flexDirection: 'row', height: 40, justifyContent: 'space-around', alignItems: 'center'}}>
            {
              childIDs.map((childID, index) => this.renderChildPanelElement(children[childID], index))
            }
          </View>
        </View>
      )
    } else {
      return undefined
    }
  }

  renderChildBlankState () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LWButton
          title='Add account'
          buttonType={BUTTON_TYPES.DECISION_BUTTON}
          onPress={() => this.addAccount()}
          extraStyle={{width: 250, height: 50, backgroundColor: 'rgb(0, 174, 112)'}}
        />
      </View>
    )
  }

  renderChildTab () {
    const {children, childIDs, navigator} = this.props
    const childrenAvailable = childIDs.length > 0
    return (
      <LinearGradient
        colors={['rgb(128, 213, 109)', 'rgb(0, 174, 112)']}
        start={{x: 0.7, y: -0.4}} end={{x: 0.7, y: 0.3}}
        locations={[0.5, 1]}
        style={{flex: 1}}>

        {
          childrenAvailable ? this.renderChildren(childIDs, children) : this.renderChildBlankState()
        }
      </LinearGradient>
    )
  }

  renderParentView () {
    const {childrenAvailable, navigator} = this.props
    return (
      <View style={{flex: 1}}>
        <ParentDashboard navigator={navigator} />
      </View>
    )
  }

  renderDevelopmentView () {
    const {navigator} = this.props
    return (
      <View style={{flex: 1}}>
        <Text style={{fontFamily: Fonts.type.regular, fontSize: 28, color: 'rgba(255, 255, 255, 0.4)', backgroundColor: 'transparent'}}>
          Development View
        </Text>
      </View>
    )
  }

  render () {
    const {children, childIDs, navigator} = this.props
    const childrenAvailable = childIDs.length > 0
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>

        <View
          style={{flex: 1}}>
          <TabNavigator tabBarStyle={{height: 75, backgroundColor: 'gray'}} sceneStyle={{backgroundColor: 'gray'}}>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'parent'}
              title='Home'
              tabStyle={{paddingBottom: 7}}
              renderIcon={() => <Image source={require('../../../Img/icons/homeTab.png')} />}
              onPress={() => this.setState({ selectedTab: 'parent' })}>
              {this.renderParentView()}
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'child'}
              title='Invest'
              tabStyle={{paddingBottom: 7}}
              renderIcon={() => <Image source={require('../../../Img/icons/investTab.png')} />}
              onPress={() => this.setState({ selectedTab: 'child' })}>
              {this.renderChildTab()}
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'development'}
              title='Grow'
              tabStyle={{paddingBottom: 7}}
              renderIcon={() => <Image source={require('../../../Img/icons/growTab.png')} />}
              onPress={() => this.setState({ selectedTab: 'development' })}>
              <Grow navigator={navigator} />
            </TabNavigator.Item>
          </TabNavigator>
        </View>

      </View>
    )
  }

}

HomepageContainer.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  // used for submitting form, comes via redux-form
  handleSubmit: PropTypes.func,

  // is it processing
  isProcessing: PropTypes.bool.isRequired,

  // list of children
  children: PropTypes.object,
  childIDs: PropTypes.array,
  userID: PropTypes.string.isRequired,

  childrenAvailable: PropTypes.bool.isRequired
}

HomepageContainer.defaultProps = {
  childrenAvailable: false
}

// ========================================================
// Export
// ========================================================

export default HomepageContainer
