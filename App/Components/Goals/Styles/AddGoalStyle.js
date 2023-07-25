/* eslint-disable no-trailing-spaces */
/**
 * Created by viktor on 31/5/17.
 */

import colors from '../../../Themes/Colors'
import fonts from '../../../Themes/Fonts'

export default {
  // Root container
  container: {
    flex: 1
  },

  // navigator header style
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

  // Top level containers
  ImageContainerArea: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    marginTop: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0
  },

  // Utility style
  titleContainer: {
    marginTop: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: fonts.size.formInput,
    color: '#FFF',
    marginBottom: 8
  },
  ImageButtonContainer: {
    width: 128,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 100
  }
}
