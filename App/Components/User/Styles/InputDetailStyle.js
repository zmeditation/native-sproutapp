/* eslint-disable no-trailing-spaces,no-unused-vars */
/**
 * Created by viktor on 27/7/17.
 */

import colors from '../../../Themes/Colors'
import fonts from '../../../Themes/Fonts'

export default {
  // Root Container
  container: {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6
  },

  // Top Level containers
  ImageContainerArea: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  FormContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 64
  },
  ButtonContainer: {
    marginTop: 32,
    marginBottom: 16
  },
  StickingButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16
  },
  capsuleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(256, 256, 256, 0.5)',
    paddingTop: 12,
    paddingBottom: 12
  },

  containerType1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32
  },
  blockHeading: {
    fontSize: 28,
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  }

}
