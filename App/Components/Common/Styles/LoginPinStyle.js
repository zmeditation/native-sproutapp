/* eslint-disable no-unused-vars */
/**
 * Created by viktor on 13/8/17.
 */

import Colors from '../../../Themes/Colors'
import Fonts from '../../../Themes/Fonts'

export default {
  // Root Container
  container: {
    flex: 1
  },

  // Top Level containers
  topContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center'
  },
  padContainer: {
    flex: 1
  },
  bottomContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 16
  },
  dot: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#006B58',
    backgroundColor: 'transparent',
    marginRight: 10,
    marginLeft: 10
  },
  buttonPadStyle: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: 'transparent'
  },
  buttonTextStyle: {
    fontSize: 36,
    fontFamily: Fonts.type.regular,
    color: '#006B58'
  },
  verticalPadContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  horizontalPadContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  cubeStyle: {
    flex: 3.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6E6E6'
  },

  HeadingStyle: {
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: '600',
    color: '#FFF'
  },
  textStyle: {
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#FFF'
  }
}
