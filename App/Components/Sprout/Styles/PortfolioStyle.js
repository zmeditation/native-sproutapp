/* eslint-disable no-trailing-spaces,no-multiple-empty-lines */
/**
 * Created by viktor on 10/7/17.
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

  // top level containers
  downArrowContainer: {
    marginTop: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartContainer: {
    marginTop: 32,
    height: 400,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },

  // utility styles
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  headerAmountStyle: {
    marginTop: 16,
    fontSize: 34,
    fontWeight: '300',
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  headerSubheadingStyle: {
    marginTop: 16,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#FFF'
  }
}
