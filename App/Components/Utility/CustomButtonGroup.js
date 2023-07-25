/* eslint-disable no-unused-vars,no-trailing-spaces,padded-blocks */
/**
 * Created by viktor on 5/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import {View, Text, Dimensions, Keyboard}
  from 'react-native'
import styles
  from './Styles/CustomButtonGroupStyle'
import Fonts
  from '../../Themes/Fonts'
import Immutable
  from 'seamless-immutable'
import {COMMON_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LWButton from './LWButton'

// ========================================================
// Core Component
// ========================================================

const priceListOne = [5, 10, 20, 50]
const priceListTwo = [100, 200, 500]

// ========================================================
// Core Component
// ========================================================

class CustomButtonGroup extends Component {

  constructor (props) {
    super(props)

    this.state = {
      current: undefined,
      previous: undefined
    }
  }

  componentWillMount () {
    const {activePrice} = this.props
    console.log('active price : ', activePrice)
    this.priceSelected(activePrice)
  }

  // -------------------------------------------------------
  // action handlers

  updatePrice ($) {
    const {foo} = this.props

    // callback called
    $ !== 0 && foo($)
  }

  priceSelected (price) {
    // call the update price function
    this.updatePrice(price)

    this.setState(prevState => {
      return {
        current: price,
        previous: prevState.current
      }
    })
  }

  // -------------------------------------------------------
  // child render methods

  renderButton (price) {
    let title = '$' + price
    return (
      <LWButton
        key={price}
        extraStyle={{width: 70, height: 70, backgroundColor: this.state.current === price ? 'rgb(0, 174, 112)' : '#FFF', borderStyle: 'solid', borderRadius: 100, borderColor: '#E6E6E6'}}
        extraTextStyle={{fontSize: 14, fontFamily: Fonts.type.regular, color: '#000', marginLeft: 0, marginRight: 10, textAlign: 'center'}}
        onPress={() => this.priceSelected(price)}
        title={price === 0 ? '1 2 3' : title}
        buttonType={BUTTON_TYPES.VERTICAL_GROUP}
      />
    )
  }

  renderRowOne () {
    return (
      <View style={styles.rowContainer}>
        {priceListOne.map(price => this.renderButton(price))}
      </View>
    )
  }

  renderRowTwo () {
    return (
      <View style={styles.rowContainer}>
        {priceListTwo.map(price => this.renderButton(price))}
        {this.renderButton(0)}
      </View>
    )
  }

  // -------------------------------------------------------
  // main render methods

  render () {
    return (
      <View style={styles.container}>

        {this.renderRowOne()}
        {this.renderRowTwo()}

      </View>
    )
  }

}

CustomButtonGroup.propTypes = {

  // function to be called when
  // price is updated or button touched
  foo: PropTypes.func.isRequired,

  // current active price
  activePrice: PropTypes.number.isRequired
}

// ========================================================
// Export
// ========================================================

export default CustomButtonGroup
