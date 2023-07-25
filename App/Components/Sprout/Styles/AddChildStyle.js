/* eslint-disable no-trailing-spaces */
/**
 * Created by viktor on 21/6/17.
 */

import colors from '../../../Themes/Colors'
import fonts from '../../../Themes/Fonts'

export default {
  // Root Container
  container: {
    flex: 1
  },

  // Header Related Style
  headerStyle: {
    backgroundColor: colors.background,
    marginBottom: 0
  },
  headerTitleStyle: {
    color: colors.navigationTitle,
    fontWeight: fonts.weight.Semibold,
    fontSize: fonts.size.navigationTitle
  },
  headerTintColor: colors.navigationBackButton,

  // Top Level containers
  ImageContainerArea: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  FormContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0
  },

  FormStyle: {
  },
  ImageButtonContainer: {
    width: 128,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1
  }
}
