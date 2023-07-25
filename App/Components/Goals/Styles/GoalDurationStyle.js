/**
 * Created by viktor on 26/6/17.
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
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  durationContainer: {
    marginTop: 24,
    alignItems: 'center'
  },
  UtilityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  carouselContainer: {
    marginTop: 24,
    height: 44
  },

  // Utility styles,
  durationStyle: {
    fontSize: 34,
    fontWeight: '300',
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  yearViewContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarContainer: {
    marginTop: 32
  },
  titleContainer: {
    marginTop: 32,
    alignItems: 'center'
  },
  avatarStyle: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1
  },
  titleStyle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: fonts.weight.Semibold,
    backgroundColor: 'transparent'
  },
  durationHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32
  },
  durationHeader: {
    fontSize: 36,
    color: '#FFF',
    backgroundColor: 'transparent'
  },
  descriptionStyle: {
    color: '#FFF',
    backgroundColor: 'transparent',
    fontSize: 17,
    textAlign: 'center'
  }
}
