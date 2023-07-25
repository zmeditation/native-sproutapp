/* eslint-disable no-unused-vars */
/**
 * Created by viktor on 19/7/17.
 */

import colors from '../../../Themes/Colors'
import fonts from '../../../Themes/Fonts'

export default {
  // Root Container
  container: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0
  },
  topContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32
  },
  goalHeaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goalComponentStyle: {
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  goalHeaderNameStyle: {
    fontSize: 14,
    fontWeight: fonts.weight.Semibold,
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  goalHeaderAmountStyle: {
    fontSize: 20,
    marginTop: 5,
    backgroundColor: 'transparent',
    color: '#FFF'
  },

  goalBalanceStyle: {
    fontSize: 34,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '300'
  },
  goalAmountStyle: {
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#FFF'
  },
  goalInterestStyle: {
    fontSize: 15,
    backgroundColor: 'transparent',
    color: 'rgb(1, 86, 79)',
    fontFamily: 'helvetica'
  }
}
