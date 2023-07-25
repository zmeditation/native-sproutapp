/**
 * Created by viktor on 5/7/17.
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
    alignItems: 'center',
    marginTop: 32
  },
  headingContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recurringTypeContainer: {
    marginTop: 32
  },
  recurringAmountHeaderContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recurringAmountInputContainer: {
    marginTop: 16,
    height: 200
  },
  decisionButtonsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  // utility styles
  recurringAmountHeaderStyle: {
    fontSize: 34,
    fontWeight: '300',
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  headingStyle: {
    fontSize: 20,
    backgroundColor: 'transparent',
    color: '#FFF'
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
