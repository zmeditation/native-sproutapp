/* eslint-disable no-unused-vars,no-trailing-spaces,operator-linebreak */
/**
 * Created by demon on 23/11/17.
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
    return (
      <TouchableOpacity onPress={() => this.fetchPDF(block['url'], title)}>
        <Text style={{fontFamily: Fonts.type.medium, fontSize: 15, color: '#FFF', backgroundColor: 'transparent', marginBottom: 10}}>
          {block['date']}
        </Text>
      </TouchableOpacity>
    )
  }

  renderChildHomepage (child, childId) {
    const {navigator, documents} = this.props
    let docs = documents[childId]
    console.log('child :: ', child, '\nchild ids :: ', childId)
    return (
      <ScrollView style={{flex: 1}}>
        {this.renderHeading('Tax Statements')}
        {this.renderHorizontalLine()}
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 32}}>
          {
            docs.map(doc => this.renderTextBlock(doc, 'Tax Statements'))
          }
        </View>
        {this.renderHeading('Trade Confirmations')}
        {this.renderHorizontalLine()}
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 32}}>
          {
            docs.map(doc => this.renderTextBlock(doc, 'Trade Confirmations', 'https://api.sandbox.thirdparty.com/v1/testfile/confirmation.pdf'))
          }
        </View>
      </ScrollView>
    )
  }

  renderChildren (childIDs, children) {
    let views = childIDs.map(childID => this.renderChildHomepage(children[childID], childID))
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
        <View style={{height: 45, backgroundColor: 'rgb(91, 185, 115)'}}>
          <View style={{flexDirection: 'row', height: 40, justifyContent: 'space-around', alignItems: 'center'}}>
            {
              childIDs.map((childID, index) => this.renderChildPanelElement(children[childID], index))
            }
          </View>
          <View style={{height: 5, flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', width: capsuleWidth, backgroundColor: '#FFFD00', transform: [{translateX: this.state.translateX}]}} />
          </View>
        </View>
      )
    } else {
      return undefined
    }
  }

  renderHorizontalLine () {
    return (
      <View style={styles.screen.horizontalLine.containerStyle}>
        <View style={styles.screen.horizontalLine.lineStyle} />
      </View>
    )
  }

  renderHeading (title) {
    return (
      <View style={styles.screen.h1.containerStyle}>
        <Text style={styles.screen.h1.textStyle}>
          {title}
        </Text>
      </View>
    )
  }

  // ------------------------------------------------------------
  // Core Components

  render () {
    const {children, childIDs, navigator} = this.props
    const childrenAvailable = childIDs.length > 0

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
            childrenAvailable ?
              <SwipeableViews style={{flex: 1, backgroundColor: 'transparent'}} onSwitching={change => this.updateX(change)} index={this.state.currentIndex}>
                {
                  this.renderChildren(childIDs, children)
                }
              </SwipeableViews>
              :
              <View style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: Fonts.type.regular, fontSize: 28, color: 'rgba(255, 255, 255, 0.4)', backgroundColor: 'transparent'}}>
                  NO CHILDREN AVAILABLE
                </Text>
              </View>
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
      <View style={{flex: 1}}>
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

  documentsAvailable: PropTypes.bool.isRequired,
  documents: PropTypes.object.isRequired
}

// ========================================================
// Export
// ========================================================

export default Documents
