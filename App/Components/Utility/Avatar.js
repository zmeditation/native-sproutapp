/* eslint-disable no-unused-vars,no-trailing-spaces */
/**
 * Created by viktor on 30/6/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import {View, Image}
  from 'react-native'
import { Button }
  from 'react-native-elements'
import styles
  from './Styles/AvatarStyle'
import ImagePicker
  from 'react-native-image-picker'
import colors
  from '../../Themes/Colors'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'

// ========================================================
// Core Component
// ========================================================

class Avatar extends Component {

  renderAvatar (avatar) {
    return (
      <View style={styles.ImageButtonContainer}>
        <Image source={{ uri: 'data:image/jpeg;base64,' + avatar }} style={{alignSelf: 'center',
          height: 128,
          width: 128,
          borderRadius: 65,
          borderColor: '#fff',
          borderWidth: 1.5
        }} />
      </View>
    )
  }

  renderImageButton () {
    const {foo, handleLocalAction, localActions} = this.props
    var options = {
      title: 'Select',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    return (
      <View style={styles.ImageButtonContainer} >
        <Button buttonStyle={styles.ImageButtonContainer} icon={{name: 'add-a-photo', size: 70, color: colors.background}} onPress={() => {
          ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              // console.log('User cancelled image picker')
            } else if (response.error) {
              // console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
              // console.log('User tapped custom button: ', response.customButton)
            } else {
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
              handleLocalAction({type: localActions.ADD_PHOTO, [CHILD_ENTITIES.AVATAR]: response.data, [CHILD_ENTITIES.CHILD_ID]: this.props.childID})
            }
          })
        }} />
      </View>
    )
  }

  renderImageContainer () {
    const {avatar} = this.props
    return (
      <View>
        {avatar ? this.renderAvatar(avatar) : this.renderImageButton()}
      </View>
    )
  }

  render () {
    return this.renderImageContainer()
  }

}

Avatar.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,

  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,

  // custom style for avatar component
  customStyle: PropTypes.object,

  // child's ID
  childID: PropTypes.string
}

// ========================================================
// Export
// ========================================================

export default Avatar
