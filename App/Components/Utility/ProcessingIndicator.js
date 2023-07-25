/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by demon on 27/10/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, {Component}
  from 'react'
import PropTypes
  from 'prop-types'
import {View, Text, ActivityIndicator, Animated, TouchableWithoutFeedback, LayoutAnimation}
  from 'react-native'

// ========================================================
// Components
// ========================================================

class ProcessingIndicator extends Component {

  // -------------------------------------------------------
  // Lifecycle methods

  constructor (props) {
    super(props)
    this.state = {
      1: styles.inactive,
      2: styles.inactive,
      3: styles.inactive,
      active: 1,
      next: 2,
      previous: undefined
    }
  }

  componentDidMount () {
    const {isProcessing} = this.props
    if (isProcessing) {
      this.startLoop()
    }
  }

  componentWillReceiveProps (nextProps) {
    const {isProcessing} = nextProps
    if (isProcessing) {
      this.startLoop()
    } else {
      this.stopLoop()
    }
  }

  // -------------------------------------------------------
  // Utility Methods

  startLoop () {
    this.loop = setInterval(() => this.animate(), 400)
  }

  stopLoop () {
    this.loop && clearInterval(this.loop) && this.clearStyle()
  }

  componentWillUnmount () {
    this.stopLoop()
  }

  animate () {
    const {active, next, previous} = this.state
    this.setStyles(active)

    this.setState({
      active: next,
      next: this.getNext(next),
      previous: active
    })
  }

  setStyles (active) {
    LayoutAnimation.linear()
    this.setState({
      1: active === 1 ? styles.active : styles.inactive,
      2: active === 2 ? styles.active : styles.inactive,
      3: active === 3 ? styles.active : styles.inactive
    })
  }

  clearStyle () {
    this.setState({
      1: styles.inactive,
      2: styles.inactive,
      3: styles.inactive
    })
  }

  getNext (n) {
    switch (n) {
      case 1: return 2
      case 2: return 3
      case 3: return 1
    }
  }

  getPrevious () {
    return this.state.active
  }

  // -------------------------------------------------------
  // Core render method

  render () {
    const {isProcessing} = this.props
    if (isProcessing) {
      return (
        <View style={styles.container} >
          <View style={{...styles.dot, backgroundColor: this.state[1]}} />
          <View style={{...styles.dot, backgroundColor: this.state[2]}} />
          <View style={{...styles.dot, backgroundColor: this.state[3]}} />
        </View>
      )
    } else {
      return null
    }
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dot: {
    height: 20,
    width: 20,
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10
  },
  active: 'rgba(255, 255, 255, 1)',
  inactive: 'rgba(255, 255, 255, 0.4)'
}

// ========================================================
// Exports
// ========================================================

ProcessingIndicator.propTypes = {
  // flag to decide whether to show
  // the processing indicator
  isProcessing: PropTypes.bool.isRequired
}

ProcessingIndicator.defaultProps = {
  isProcessing: false
}

export default ProcessingIndicator
