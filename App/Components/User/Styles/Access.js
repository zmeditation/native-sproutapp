/**
 * Created by victorchoudhary on 28/04/17.
 */
import {Fonts} from '../../../Themes/'

export default {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28666E'
  },
  loginPanel: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  loginButton: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  h1: {
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.base,
    color: 'white',
    paddingBottom: 20
  },
  h2: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.base,
    color: 'white'
  },
  buttonLabel: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.base,
    fontWeight: 'bold',
    color: '#28666E'
  }
}
