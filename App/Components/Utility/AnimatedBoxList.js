/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 31/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, FlatList, Animated, LayoutAnimation, TouchableOpacity, TouchableHighlight }
  from 'react-native'
import styles
  from './Styles/AnimatedBoxListStyle'

// ========================================================
// Core Component
// ========================================================

class AnimatedBoxList extends Component {

  componentWillMount () {
    this.state = {
      open: false,
      height: new Animated.Value(0)
    }
  }

  componentWillReceiveProps () {
    this._propAnalyser()
  }

  // -------------------------------------------------------
  // action handlers

  _propAnalyser () {
    const {data} = this.props
    if (data.length > 0 && !this.state.open) {
      this.setState({open: true})
      Animated.timing(
        this.state.height,
        {
          toValue: 150,
          duration: 200
        }
      ).start()
    } else if (data.length === 0 && this.state.open) {
      this.setState({open: false})
      Animated.timing(
        this.state.height,
        {
          toValue: 0,
          duration: 200
        }
      ).start()
    }
  }

  // -------------------------------------------------------
  // render inner component

  renderCapsule (item) {
    const {touchHandler} = this.props
    return (
      <TouchableOpacity onPress={() => touchHandler(item)} style={styles.capsuleContainer}>
        <Text style={{...styles.rowCapsuleText, fontWeight: 'bold'}}>
          {item['structured_formatting']['main_text']}
        </Text>
        <Text style={styles.rowCapsuleText}>
          {item['structured_formatting']['secondary_text']}
        </Text>
      </TouchableOpacity>
    )
  }

  renderListBox () {
    const {data} = this.props
    if (data.length === 0 && this.state.open) {
      this._propAnalyser()
    }
    return (
      <FlatList
        data={data}
        keyboardShouldPersistTaps='always'
        keyExtractor={item => item.description}
        renderItem={({item}) => { return this.renderCapsule(item) }}
      />
    )
  }

  // -------------------------------------------------------
  // render core component

  render () {
    return (
      <Animated.View style={{...styles.container, height: this.state.height}}>
        {this.renderListBox()}
      </Animated.View>
    )
  }
}

// ========================================================
// Export
// ========================================================

AnimatedBoxList.propTypes = {
  data: PropTypes.array.isRequired,
  shouldClose: PropTypes.bool.isRequired,
  touchHandler: PropTypes.func.isRequired
}
AnimatedBoxList.defaultProps = {
  data: [],
  shouldClose: true,
  touchHandler: undefined
}

export default AnimatedBoxList
