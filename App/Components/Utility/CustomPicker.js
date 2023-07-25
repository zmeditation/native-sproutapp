/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 21/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, TouchableOpacity, Picker, Modal }
  from 'react-native'
import { Button, Icon }
  from 'react-native-elements'
import {COMMON_ENTITIES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import ArrowButton from '../Utility/ArrowButton'

// ========================================================
// Left Header Button Component
// ========================================================

class CustomPicker extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: this.props.values[this.props.selectedValueIndex].value
    }
  }

  updateValue (value) {
    this.setState({value: value})
  }

  // ------------------------------------------------------------
  // Core Render Method

  render () {
    const {selectedValue, values, onValueChange, successHandler, failureHandler} = this.props
    return (
      <View style={{backgroundColor: '#FFF'}}>
        <View style={{flexDirection: 'row', borderBottomWidth: 0.4, borderColor: 'gray', justifyContent: 'space-between'}}>
          <TouchableOpacity style={{padding: 5}} onPress={() => failureHandler()}>
            <Text style={{fontSize: 16, color: 'blue'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 5}} onPress={() => successHandler(this.state.value)}>
            <Text style={{fontSize: 16, color: 'blue'}}>Done</Text>
          </TouchableOpacity>
        </View>
        <Picker
          selectedValue={this.state.value}
          onValueChange={(itemValue) => this.updateValue(itemValue)}>
          {
            values.map(item => <Picker.Item label={item.label} value={item.value} />)
          }
        </Picker>
      </View>
    )
  }
}

CustomPicker.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  selectedValueIndex: PropTypes.string.isRequired,
  successHandler: PropTypes.func.isRequired,
  failureHandler: PropTypes.func.isRequired
}

export default CustomPicker
