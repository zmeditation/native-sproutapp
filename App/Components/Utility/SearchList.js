/* eslint-disable no-unused-vars,no-trailing-spaces,no-multi-spaces */
/**
 * Created by viktor on 1/8/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import {View, Text, FlatList, TouchableOpacity}
  from 'react-native'
import {SearchBar}
  from 'react-native-elements'
import styles
  from './Styles/SearchListStyle'
import {filterList}
  from '../../Utility/Transforms/DateFilter'

// ========================================================
// Core Component
// ========================================================

/*
  Todo:-
  - solution for custom 'autocorrect'
  attribute in SearchBar
 */
class SearchList extends Component {

  // ------------------------------------------------------
  // Lifecycle & methods

  componentWillMount () {
    // make the list data
    // part of the state
    this.state = {
      data: this.props.data,
      displayData: this.props.data
    }
  }

  search (str) {
    let newData = filterList(this.state.data, str)
    this.setState({displayData: newData})
  }

  // ------------------------------------------------------
  // Inner component render methods

  renderCapsule (name, code) {
    const {touchHandler} = this.props
    return (
      <TouchableOpacity onPress={() => touchHandler(code)} style={styles.capsuleContainer}>
        <View style={styles.capsuleBodyContainer}>
          <Text style={styles.capsuleTextStyle}>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSearchbar () {
    return (
      <SearchBar
        lightTheme
        containerStyle={{backgroundColor: 'transparent', borderRadius: 8, height: 40, borderTopWidth: 0, borderBottomWidth: 0}}
        inputStyle={{backgroundColor: '#FFF', fontFamily: 'Lato-Light', marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, borderWidth: 1, borderColor: '#000', height: 40, borderRadius: 8, paddingLeft: 44, color: '#000'}}
        icon={{style: {left: 15, top: 13}, color: '#000'}}
        placeholderTextColor='rgba(0, 0, 0, 0.5)'
        pla
        onChangeText={text => this.search(text)}
        autoCorrect={false}
        label='this is the label'
        placeholder='Search for a country' />
    )
  }

  renderListView () {
    const {displayData} = this.state
    return (
      <FlatList
        keyExtractor={item => item.name}
        data={displayData}
        keyboardShouldPersistTaps='handled'
        renderItem={({item}) => this.renderCapsule(item.name, item.code)}
      />
    )
  }

  // ------------------------------------------------------
  // Core component render method

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          {this.renderSearchbar()}
        </View>
        <View style={styles.listViewContainer}>
          {this.renderListView()}
        </View>
      </View>
    )
  }

}

SearchList.propTypes = {

  // data for the list
  data: PropTypes.array.isRequired,

  // function to call when
  // list element is clicked
  touchHandler: PropTypes.func.isRequired

}

SearchList.defaultProps = {
  data: [],
  touchHandler: undefined
}

// ========================================================
// Export
// ========================================================

export default SearchList
