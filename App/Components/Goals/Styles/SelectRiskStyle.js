/**
 * Created by viktor on 3/7/17.
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

  // Top containers
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32
  },
  headingContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subheadingContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselContainer: {
    marginTop: 16
  },

  headingStyle: {
    fontSize: 20,
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  subheadingStyle: {
    fontSize: 17,
    backgroundColor: 'transparent',
    color: '#FFF',
    textAlign: 'center'
  },
  avatarContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1
  }

}
