/**
 * Created by victorchoudhary on 10/05/17.
 */

import {Fonts} from '../../../Themes/'

export default {
  container: {
    flex: 1,
    backgroundColor: '#28666E',
    justifyContent: 'center'
  },
  headerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  imageUploadButtonStyle: {
    height: 100,
    width: 100,
    backgroundColor: '#28666E',
    borderWidth: 3,
    borderRadius: 60,
    borderColor: 'rgb(226,134,76)'
  },
  formContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    bottom: 20
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column'
  },
  buttonStyle: {
    backgroundColor: 'rgb(226,134,76)',
    marginLeft: 0,
    marginRight: 0
  },
  skipButtonContainer: {

  },
  skipButtonStyle: {
    width: 40,
    height: 20
  },
  headerTitle: {
    color: '#EDF060',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    fontWeight: '600'
  }
}
