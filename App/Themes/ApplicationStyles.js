/* eslint-disable no-unused-vars,no-trailing-spaces */
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android
/*
const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}
*/

const commonStyles = {
  innerCentering: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const ApplicationStyles = {

  screen: {

    // root screen container style
    containers: {
      root: {
        flex: 1
      },
      spreadAndCenteringContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      centeringContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      cover: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    },

    // heading H1 style
    h1: {
      containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Metrics.h1.topMargin,
        marginBottom: Metrics.h1.bottomMargin
      },
      textStyle: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size.h1,
        color: Colors.h1,
        textAlign: 'center',
        backgroundColor: Colors.transparent
      }
    },

    // button styles
    buttons: {
      verticalGroup: {
        button: {
          height: Metrics.button.height.thick,
          width: Metrics.button.width.large,
          borderColor: '#FFF',
          borderWidth: Metrics.button.border.width,
          borderRadius: Metrics.button.border.radius,
          borderStyle: Metrics.button.border.style.verticalGroup,
          backgroundColor: Colors.button.background.verticalGroup
        },
        text: {
          fontSize: Fonts.size.button,
          fontFamily: Fonts.type.bold,
          textAlign: 'center',
          backgroundColor: Colors.button.background.verticalGroup,
          color: Colors.button.color.verticalGroup
        }
      },
      verticalGroupBigger: {
        button: {
          flex: 1,
          minHeight: 125,
          borderColor: '#FFF',
          borderWidth: Metrics.button.border.width,
          borderRadius: Metrics.button.border.radius,
          borderStyle: Metrics.button.border.style.verticalGroup,
          backgroundColor: Colors.button.background.verticalGroup
        },
        text: {
          fontSize: Fonts.size.buttonBigger,
          fontFamily: Fonts.type.semibold,
          textAlign: 'center',
          backgroundColor: Colors.button.background.verticalGroup,
          color: Colors.button.color.verticalGroup
        },
        description: {
          fontSize: Fonts.size.buttonBigger,
          fontFamily: Fonts.type.regular,
          textAlign: 'center',
          backgroundColor: Colors.button.background.verticalGroup,
          color: Colors.button.color.verticalGroup
        }
      },
      decisionButton: {
        button: {
          height: Metrics.button.height.thick,
          width: Metrics.button.width.large,
          borderRadius: 100,
          backgroundColor: Colors.button.background.decisionButton
        },
        text: {
          fontSize: Fonts.size.button,
          fontFamily: Fonts.type.bold,
          backgroundColor: Colors.transparent,
          color: Colors.button.color.decisionButton
        }
      }
    },

    // style for text input in forms
    textInput: {
      parentContainerStyle: {
        height: 40,
        marginBottom: 11,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      containerStyle: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: 40,
        flex: 1,
        paddingLeft: 16,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat-Light'
      }
    },

    // horizontal line style ( used as seperator )
    horizontalLine: {
      containerStyle: commonStyles.innerCentering,
      lineStyle: {
        height: Metrics.horizontalLine.height,
        width: Metrics.horizontalLine.width,
        backgroundColor: Colors.horizontalLine
      }
    }

  },

  header: {
    simpleStyle: {

    },
    containerStyle: {
      navBarTextColor: '#FFF',
      navBarTextFontFamily: 'Lato-Regular',
      navBarTextFontSize: 16,
      navBarBackgroundColor: 'rgb(47, 191, 112)',
      navBarNoBorder: true,
      statusBarTextColorScheme: 'light'
    },
    borderContainerStyle: {
      navBarTextColor: '#FFF',
      navBarTextFontSize: 17,
      navBarBackgroundColor: '#02B8AA',
      navBarButtonColor: '#FFF',
      drawUnderNavBar: true,
      navBarTransparent: true,
      screenBackgroundColor: '#02B8AA',
      statusBarTextColorScheme: 'light'
    }
  },

  hiddenNavbar: {
    navBarHidden: true,
    navBarTextColor: '#FFF',
    navBarButtonColor: '#FFF',
    navBarNoBorder: true,
    screenBackgroundColor: 'rgb(0, 150, 170)',
    navBarBackgroundColor: 'rgb(0, 150, 170)',
    statusBarHidden: false,
    statusBarTextColorScheme: 'light'
  }

}

export default ApplicationStyles
