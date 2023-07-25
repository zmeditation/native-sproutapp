/**
 * Created by viktor on 7/7/17.
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
    fontSize: fonts.size.navigationTitle
  },
  headerTintColor: colors.navigationBackButton,

  // Top Level containers
  HeadingContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  FormContainer: {
    marginTop: 100,
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
  HeadingStyle: {
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#FFF'
  }
}
