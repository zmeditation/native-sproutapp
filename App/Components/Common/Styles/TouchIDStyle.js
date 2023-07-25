/* eslint-disable no-unused-vars */

import colors from '../../../Themes/Colors'
import fonts from '../../../Themes/Fonts'

export default {
  // Root container
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  innerContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(256,256,256,0.3)'
  },

  headingContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  amountHeaderContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subheadingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  decisionBoxStyle: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  headingStyle: {
    fontSize: 20,
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  textStyle: {
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  subheadingStyle: {
    fontSize: 14,
    fontWeight: fonts.weight.Semibold,
    backgroundColor: 'transparent',
    color: '#FFF'
  }
}
