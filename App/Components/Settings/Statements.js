/* eslint-disable no-unused-vars,no-trailing-spaces, operator-linebreak */
/**
 * Created by demon on 22/1/18.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, ActivityIndicator, ScrollView, Dimensions, WebView, Modal, TouchableOpacity }
  from 'react-native'
import {Icon}
  from 'react-native-elements'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import styles
  from '../../Themes/ApplicationStyles'
import {COMMON_ENTITIES, PLAID_ACTIONS}
  from '../../Utility/Mapper/Common'
import Fonts
  from '../../Themes/Fonts'
import LinearGradient
  from 'react-native-linear-gradient'
import SwipeableViews
  from 'react-swipeable-views-native/lib/SwipeableViews.scroll'
import Pdf from 'react-native-pdf'

// ========================================================
// Core Component
// ========================================================

class Documents extends Component {

  // ------------------------------------------------------------
  // Lifecycle methods & event handlers

  constructor (props) {
    super(props)
    this.state = {
      translateX: 0,
      currentIndex: 0,
      pdfVisible: false,
      url: undefined,
      title: undefined
    }
  }

  // ------------------------------------------------------------
  // Action handlers

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

  showPDF () {
    this.setState({pdfVisible: true})
  }

  hidePDF () {
    this.setState({pdfVisible: false})
  }

  fetchPDF (url, title) {
    this.setState({url: url, title: title})
    this.showPDF()
  }

  // ------------------------------------------------------------
  // Child Components

  renderTextBlock (block, title, url) {
    const source = {uri: url || block['url'], cache: true}
    console.log('going for pdf :: ', source)
    const {width} = Dimensions.get('window')
    return (
      <TouchableOpacity onPress={() => this.fetchPDF(block['url'], title)} >
        <View style={{width: width, flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginBottom: 40}}>
          <Text style={{flex: 5, fontFamily: Fonts.type.bold, fontSize: 18, color: '#4A4A4A', backgroundColor: 'transparent', marginBottom: 10, marginLeft: 30}}>
            Statement
          </Text>
          <Text style={{flex: 5, fontFamily: Fonts.type.bold, textAlign: 'left', fontSize: 18, color: '#4A4A4A', backgroundColor: 'transparent', marginBottom: 10}}>
            {block['date']}
          </Text>
        </View>
        <View style={{height: 1, backgroundColor: '#D7D7D7'}} />
      </TouchableOpacity>
    )
  }

  renderChildHomepage (childId) {
    const {navigator, statements} = this.props
    let docs = statements[childId]
    console.log(' ------ is rendering doc now ------ ', docs)
    if (docs) {
      return (
        <ScrollView style={{flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 12}}>
            {
              docs.map(doc => this.renderTextBlock(doc, 'Tax Statements'))
            }
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 28, color: '#006B58', backgroundColor: 'transparent'}}>
            Statements are not Available
          </Text>
        </View>
      )
    }
  }

  renderChildren (childIDs, children) {
    console.log(' ------ is rendering child now ------ ')
    let views = childIDs.map(childID => this.renderChildHomepage(childID))
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
        <View style={{height: 90, backgroundColor: 'rgb(47, 191, 112)', justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row', height: 40, marginBottom: 20, justifyContent: 'space-around', alignItems: 'center'}}>
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

  // ------------------------------------------------------------
  // Core Components

  render () {
    const {children, childIDs} = this.props
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.pdfVisible}
        >
          <PDFViewer url={this.state.url} foo={this.hidePDF.bind(this)} title={this.state.title} />
        </Modal>
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          {this.renderChildPanel()}
          {
            <SwipeableViews style={{flex: 1, backgroundColor: 'transparent'}} onSwitching={change => this.updateX(change)} index={this.state.currentIndex}>
              {
                this.renderChildren(childIDs, children)
              }
            </SwipeableViews>
          }
        </View>
      </View>
    )
  }

}

class PDFViewer extends Component {

  render () {
    const {url, foo, title} = this.props
    const source = {uri: url, cache: true}

    return (
      <View style={{flex: 1, paddingTop: 40}}>
        <View style={{marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name='close' size={32} style={{position: 'absolute', left: 0}} onPress={() => foo()} />
          <Text style={{fontFamily: Fonts.type.medium, fontSize: 20}}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Pdf
            source={source}
            onLoadComplete={(pageCount, filePath) => {
              console.log(`total page count: ${pageCount}`)
            }}
            onPageChanged={(page, pageCount) => {
              console.log(`current page: ${page}`)
            }}
            onError={(error) => {
              console.log(error)
            }}
            style={{flex: 1, width: Dimensions.get('window').width}}
          />
        </View>
      </View>
    )
  }
}

PDFViewer.propTypes = {
  url: PropTypes.string.isRequired,
  foo: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

Documents.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,

  statements: PropTypes.object
}

// ========================================================
// Export
// ========================================================

export default Documents
