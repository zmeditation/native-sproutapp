/* eslint-disable no-trailing-spaces,no-unused-vars,no-multi-spaces,no-multi-spaces,operator-linebreak */
/**
 * Created by viktor on 10/7/17.
 */

// ========================================================
// Import Packages
// ========================================================

import React, { Component }
  from 'react'
import PropTypes
  from 'prop-types'
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions, ScrollView, Animated, LayoutAnimation }
  from 'react-native'
import { Button, Icon }
  from 'react-native-elements'
import styles
  from './Styles/HomepageStyle'
import globalStyle
  from '../../Themes/ApplicationStyles'
import {CHILD_ENTITIES}
  from '../../Utility/Mapper/Child'
import {USER_ENTITIES}
  from '../../Utility/Mapper/User'
import {GOAL_ENTITIES}
  from '../../Utility/Mapper/Goal'
import {COMMON_ENTITIES, CUSTOM_LIST_ENTITIES, BUTTON_TYPES}
  from '../../Utility/Mapper/Common'
import LinearGradient
  from 'react-native-linear-gradient'
import colors
  from '../../Themes/Colors'
import LWButton
  from '../Utility/LWButton'
import Fonts
  from '../../Themes/Fonts'
import { CircularProgress }
  from 'react-native-circular-progress'
import {LeftNavHeader, RightNavHeader}
  from '../../Containers/Common/CustomNavHeader'
import {formatPrice, limitText}
  from '../../Utility/Transforms/Converter'
import Carousel
  from 'react-native-snap-carousel'
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress)
import ChartView
  from 'react-native-highcharts'

// ========================================================
// Core Component
// ========================================================

export const projectionType = {
  ONE_DAY: '1D',
  ONE_WEEK: '1W',
  ONE_MONTH: '1M',
  SIX_MONTH: '6M',
  ONE_YEAR: '1Y',
  ALL: 'ALL'
}

let tempData = [
  {type: CUSTOM_LIST_ENTITIES.SIMPLE, key: 'Market returns', value: '+2.53 (+1.2%)'},
  {type: CUSTOM_LIST_ENTITIES.SIMPLE, key: 'Invested by you', value: '$50'}
]

let timeData = [
  0.8446, 0.8445, 0.8444, 0.8451, 0.8418, 0.8264, 0.8258, 0.8232,
  0.8233, 0.8258, 0.8283, 0.8278, 0.8256, 0.8292, 0.8239, 0.8239,
  0.8245, 0.8265, 0.8261, 0.8269, 0.8273, 0.8244, 0.8244, 0.8172,
  0.8139, 0.8146, 0.8164, 0.82,   0.8269, 0.8269, 0.8269, 0.8258,
  0.8247, 0.8286, 0.8289, 0.8316, 0.832,  0.8333, 0.8352, 0.8357,
  0.8355, 0.8354, 0.8403, 0.8403, 0.8406, 0.8403, 0.8396, 0.8418,
  0.8409, 0.8384, 0.8386, 0.8372, 0.839,  0.84,   0.8389, 0.84, 0.8423,
  0.8423, 0.8435, 0.8422, 0.838,  0.8373, 0.8316, 0.8303, 0.8303,
  0.8302, 0.8369, 0.84,   0.8385, 0.84,   0.8401, 0.8402, 0.8381,
  0.8351, 0.8314, 0.8273, 0.8213, 0.8207, 0.8207, 0.8215, 0.8242,
  0.8273, 0.8301, 0.8346, 0.8312, 0.8312, 0.8312, 0.8306, 0.8327,
  0.8282, 0.824,  0.8255, 0.8256, 0.8273, 0.8209, 0.8151, 0.8149,
  0.8213, 0.8273, 0.8273, 0.8261, 0.8252, 0.824,  0.8262, 0.8258,
  0.8261, 0.826,  0.8199
]
let timeDate2 = [0.6446, 0.6468, 0.6487, 0.6594, 0.6666,
  0.6666, 0.6678, 0.6712, 0.6705, 0.6718, 0.6784, 0.6811, 0.6811,
  0.6794, 0.6804, 0.6781, 0.6756, 0.6735, 0.6763, 0.6762, 0.6777,
  0.6815, 0.6802, 0.678,  0.6796, 0.6817, 0.6817, 0.6832, 0.6877,
  0.6912, 0.6914, 0.7009, 0.7012, 0.701,  0.7005, 0.7076, 0.7087,
  0.717,  0.7105, 0.7031, 0.7029, 0.7006, 0.7035, 0.7045, 0.6956,
  0.6988, 0.6915, 0.6914, 0.6859, 0.6778, 0.6815, 0.6815, 0.6843,
  0.6846, 0.6846, 0.6923, 0.6997, 0.7098, 0.7188, 0.7232, 0.7262,
  0.7266, 0.7359, 0.7368, 0.7337, 0.7317, 0.7387, 0.7467, 0.7461,
  0.7366, 0.7319, 0.7361, 0.7437, 0.7432, 0.7461, 0.7461, 0.7454,
  0.7549, 0.7742, 0.7801, 0.7903, 0.7876, 0.7928, 0.7991, 0.8007,
  0.7823, 0.7661, 0.785,  0.7863, 0.7862, 0.7821, 0.7858, 0.7731,
  0.7779, 0.7844, 0.7866, 0.7864, 0.7788, 0.7875, 0.7971, 0.8004,
  0.7857, 0.7932, 0.7938, 0.7927, 0.7918
]

let data = {
  'Market': {
    [projectionType.ALL]: [
      [new Date('01/20/2016'), 10],
      [new Date('02/20/2016'), 30],
      [new Date('03/20/2016'), 30],
      [new Date('04/20/2016'), 35],
      [new Date('05/20/2016'), 50],
      [new Date('06/20/2016'), 30],
      [new Date('07/20/2016'), 15],
      [new Date('08/20/2016'), 40],
      [new Date('09/20/2016'), 70],
      [new Date('10/20/2016'), 85],
      [new Date('11/20/2016'), 60],
      [new Date('12/20/2016'), 70]
    ],
    [projectionType.ONE_YEAR]: [
      [new Date('01/20/2016'), 10],
      [new Date('02/20/2016'), 30],
      [new Date('03/20/2016'), 30],
      [new Date('04/20/2016'), 35],
      [new Date('05/20/2016'), 50],
      [new Date('06/20/2016'), 30],
      [new Date('07/20/2016'), 15],
      [new Date('08/20/2016'), 40],
      [new Date('09/20/2016'), 70],
      [new Date('10/20/2016'), 85],
      [new Date('11/20/2016'), 60],
      [new Date('12/20/2016'), 70]
    ],
    [projectionType.SIX_MONTH]: [
      [new Date('07/20/2016'), 15],
      [new Date('08/20/2016'), 40],
      [new Date('09/20/2016'), 70],
      [new Date('10/20/2016'), 85],
      [new Date('11/20/2016'), 60],
      [new Date('12/20/2016'), 70]
    ],
    [projectionType.ONE_MONTH]: [
      [new Date('11/24/2016'), 62],
      [new Date('12/01/2016'), 68],
      [new Date('12/07/2016'), 70],
      [new Date('12/14/2016'), 65]
    ],
    [projectionType.ONE_WEEK]: [
      [new Date('12/08/2016'), 75],
      [new Date('12/09/2016'), 78],
      [new Date('12/10/2016'), 80],
      [new Date('12/11/2016'), 75],
      [new Date('12/12/2016'), 73],
      [new Date('12/13/2016'), 70],
      [new Date('12/14/2016'), 65]
    ],
    [projectionType.ONE_DAY]: [
      [new Date('12/13/2016'), 70],
      [new Date('12/14/2016'), 65]
    ]
  },
  'Investment': {
    [projectionType.ALL]: [
      [new Date('01/20/2016'), 10],
      [new Date('02/20/2016'), 10],
      [new Date('03/20/2016'), 20],
      [new Date('04/20/2016'), 35],
      [new Date('05/20/2016'), 40],
      [new Date('06/20/2016'), 40],
      [new Date('07/20/2016'), 40],
      [new Date('08/20/2016'), 30],
      [new Date('09/20/2016'), 40],
      [new Date('10/20/2016'), 55],
      [new Date('11/20/2016'), 55],
      [new Date('12/20/2016'), 55]
    ],
    [projectionType.ONE_YEAR]: [
      [new Date('01/20/2016'), 10],
      [new Date('02/20/2016'), 10],
      [new Date('03/20/2016'), 20],
      [new Date('04/20/2016'), 35],
      [new Date('05/20/2016'), 40],
      [new Date('06/20/2016'), 40],
      [new Date('07/20/2016'), 40],
      [new Date('08/20/2016'), 30],
      [new Date('09/20/2016'), 40],
      [new Date('10/20/2016'), 55],
      [new Date('11/20/2016'), 55],
      [new Date('12/20/2016'), 55]
    ],
    [projectionType.SIX_MONTH]: [
      [new Date('07/20/2016'), 40],
      [new Date('08/20/2016'), 30],
      [new Date('09/20/2016'), 40],
      [new Date('10/20/2016'), 55],
      [new Date('11/20/2016'), 55],
      [new Date('12/20/2016'), 55]
    ],
    [projectionType.ONE_MONTH]: [
      [new Date('11/24/2016'), 55],
      [new Date('12/01/2016'), 55],
      [new Date('12/07/2016'), 55],
      [new Date('12/14/2016'), 55]
    ],
    [projectionType.ONE_WEEK]: [
      [new Date('12/08/2016'), 70],
      [new Date('12/09/2016'), 70],
      [new Date('12/10/2016'), 70],
      [new Date('12/11/2016'), 70],
      [new Date('12/12/2016'), 70],
      [new Date('12/13/2016'), 70],
      [new Date('12/14/2016'), 70]
    ],
    [projectionType.ONE_DAY]: [
      [new Date('12/13/2016'), 55],
      [new Date('12/14/2016'), 55]
    ]
  }
}
let spaceHeight = 230

class Homepage extends Component {

  // ------------------------------------------------------------
  // Lifecycle methods

  constructor (props) {
    super(props)
    this.populateState()
  }

  componentWillMount () {
    const {userID} = this.props
  }

  // ------------------------------------------------------------
  // Action Handlers

  addAccount () {
    console.log('adding a new account')
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.ADD_ACCOUNT, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  showChildView (childID) {
    console.log('going from presentation ::: ', childID)
    const {handleLocalAction, localActions, navigator} = this.props
    handleLocalAction({type: localActions.SHOW_CHILD_VIEW, [CHILD_ENTITIES.CHILD_ID]: childID, [COMMON_ENTITIES.NAVIGATOR]: navigator})
  }

  populateState () {
    const {goals, firstItemIndex} = this.props
    let goalBackground = {}
    let goalWidth = {}
    let titleColor = {}
    let amountColor = {}
    let enabled = {}
    goals && goals.map((goal, index) => {
      goalBackground[index] = firstItemIndex === index ? '#F1F1F1' : '#FFF'
      goalWidth[index] = firstItemIndex === index ? 10 : 10
      titleColor[index] = firstItemIndex === index ? '#586871' : '#1B1B1B'
      amountColor[index] = firstItemIndex === index ? '#586871' : '#1B1B1B'
      enabled[index] = firstItemIndex === index
    })

    this.state = {
      totalGoals: goals && goals.length,
      current: firstItemIndex,
      previous: undefined,
      goalBackground: goalBackground,
      goalWidth: goalWidth,
      titleColor: titleColor,
      amountColor: amountColor,
      enabled: enabled,
      charVisible: false
    }
  }

  animate (primary, secondary) {
    const {goalBackground, goalWidth, titleColor, amountColor, enabled} = this.state
    let newGoalBackground = Object.assign(goalBackground, {[primary]: '#F1F1F1', [secondary]: '#FFF'})
    let newGoalWidth = Object.assign(goalWidth, {[primary]: 10, [secondary]: 10})
    let newTitleColor = Object.assign(titleColor, {[primary]: '#586871', [secondary]: '#1B1B1B'})
    let newAmountColor = Object.assign(amountColor, {[primary]: '#586871', [secondary]: '#1B1B1B'})
    let newEnabled = Object.assign(enabled, {[primary]: true, [secondary]: false})
    LayoutAnimation.linear()
    this.setState({goalBackground: newGoalBackground, goalWidth: newGoalWidth, titleColor: newTitleColor, amountColor: newAmountColor, enabled: newEnabled})
  }

  snappingTo (index) {
    this.setState(prevState => {
      this.animate(index, prevState.current)
      return {
        current: index,
        previous: prevState.current
      }
    })
  }

  loadChart () {
    const {handleLocalAction, localActions, childID} = this.props
    handleLocalAction({type: localActions.FETCH_CHART_DATA, [CHILD_ENTITIES.CHILD_ID]: childID})
  }

  showChart () {
    this.loadChart()
    LayoutAnimation.linear()
    this.setState({charVisible: true})
  }
  hideChart () {
    LayoutAnimation.linear()
    this.setState({charVisible: false})
  }

  // ------------------------------------------------------------
  // Child render methods

  renderDecisionBox (c1, c2, title, img, w, h) {
    return (
      <TouchableOpacity style={{width: 180, height: 127, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, shadowColor: 'gray', shadowOpacity: 1, shadowRadius: 20, shadowOffset: {width: 0, height: 0}, marginLeft: 10, marginRight: 10}}>
        <LinearGradient colors={[c1, c2]} start={{x: -1, y: -1}} end={{x: 3, y: 0}} locations={[0, 0.7]} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={img} style={{width: w || 45, height: h || 45}} />
        </LinearGradient>
        <View style={{height: 40, backgroundColor: '#FFF', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 13, color: '#586871', backgroundColor: 'transparent'}}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderDecisionPanel () {
    return (
      <View>
        <Carousel
          sliderWidth={Dimensions.get('window').width}
          itemWidth={180 + 40}
          firstItem={1}
          containerCustomStyle={{padding: 25, paddingBottom: 40}}
        >
          {this.renderDecisionBox('#C18FFF', '#622BFF', 'New Investment Goals', require('../../../Img/icons/fund-growth.png'), 32, 50)}
          {this.renderDecisionBox('#FC8FE3', '#FF5757', 'Save & Invest', require('../../../Img/icons/money.png'))}
          {this.renderDecisionBox('#B9FFFC', '#279DFF', 'Share first Steps', require('../../../Img/icons/human-footprint.png'))}
          {this.renderDecisionBox('#85A0B5', '#403E4D', 'Withdraw', require('../../../Img/icons/withdraw.png'))}
        </Carousel>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 40, backgroundColor: 'transparent', visibility: false}}>
          <LWButton title='Performance' onPress={() => this.showChart()} extraStyle={{backgroundColor: 'rgb(251, 141, 41)', width: 200, height: 42, shadowColor: 'rgb(251, 141, 41)', shadowOffset: {width: 1, height: 7}, shadowOpacity: 0.4}} extraTextStyle={{color: '#FFF', fontFamily: Fonts.type.medium}} iconName='trending-up' iconSize={25} />
        </View>
      </View>
    )
  }

  renderBottomContainer () {
    const {charVisible} = this.state
    if (charVisible) {
      return (
        <View>
          {this.renderChart()}
        </View>
      )
    } else {
      return (
        <View>
          {this.renderDecisionPanel()}
          {this.renderChart()}
        </View>
      )
    }
  }

  showGoal (goalID, name) {
    const {handleLocalAction, localActions, childID, navigator, userID} = this.props
    handleLocalAction({type: localActions.SHOW_GOAL, [CHILD_ENTITIES.CHILD_ID]: childID, [GOAL_ENTITIES.GID]: goalID, [GOAL_ENTITIES.NAME]: name, [COMMON_ENTITIES.NAVIGATOR]: navigator, [USER_ENTITIES.USER_ID]: userID})
  }

  renderMiddleContainer () {
    const {handleLocalAction, localActions, navigator, childID, growthValue, growthPercentage, goals, firstName, totalPortfolioValue} = this.props
    return (
      <LinearGradient
        colors={['rgb(128, 213, 109)', 'rgb(0, 174, 112)']}
        start={{x: 0.7, y: -0.4}} end={{x: 0, y: 0.2}}
        locations={[0.4, 1]}
        style={{flex: 1}}>
        <View style={{marginBottom: 150}}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 32}}>
            <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 18, color: '#FFF', backgroundColor: 'transparent'}}>
              Your Family
            </Text>
            <Text style={{textAlign: 'center', fontFamily: Fonts.type.light, fontSize: 48, color: '#FFF', backgroundColor: 'transparent', marginTop: 10}}>
              {formatPrice(totalPortfolioValue)}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 18, color: '#D0FF00', backgroundColor: 'transparent', marginTop: 3}}>
                ${growthValue}
              </Text>
              <Image source={require('../../../Img/icons/arrowUp.png')} style={{width: 10, height: 10, marginLeft: 25, marginRight: 25, top: 10}} />
              <Text style={{textAlign: 'center', fontFamily: Fonts.type.regular, fontSize: 18, color: '#D0FF00', backgroundColor: 'transparent', marginTop: 3}}>
                {growthPercentage}%
              </Text>
            </View>
          </View>
        </View>

      </LinearGradient>
    )
  }

  renderChildPanel () {
    const {childArr} = this.props
    return (
      <View style={{backgroundColor: 'transparent', marginTop: 30, paddingLeft: 10, paddingRight: 10, paddingBottom: 0, zIndex: 500}}>

        {childArr.map(child => {
          let portfolio = child[CHILD_ENTITIES.PORTFOLIO]
          return this.renderChildCard(require('../../../Img/icons/child.png'), child[CHILD_ENTITIES.CHILD_ID], child[CHILD_ENTITIES.FIRST_NAME], (portfolio && portfolio[CHILD_ENTITIES.CURRENT_VALUE]) || 0, (portfolio && portfolio[CHILD_ENTITIES.GROWTH_IN_VALUE]) || 0, (portfolio && portfolio[CHILD_ENTITIES.GROWTH_IN_PERCENTAGE]) || 0, '')
        })}

      </View>
    )
  }

  renderChildCard (img, childID, childName, portfolioValue, valueIncrease, percentageIncrease, message) {
    return (
      <TouchableOpacity key={childID} onPress={() => this.showChildView(childID)} style={{padding: 30, marginBottom: 20, bottom: 100, backgroundColor: '#FFF', borderRadius: 10, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 3}}}>

        <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={img} style={{height: 50, width: 50}} />
            <Text style={{fontFamily: Fonts.type.black, fontSize: 18, color: '#4A4A4A', marginLeft: 5, backgroundColor: 'transparent'}}>
              {childName}
            </Text>
          </View>
          <Text style={{fontFamily: Fonts.type.regular, fontSize: 16, color: '#9B9B9B', backgroundColor: 'transparent'}}>
            {message}
          </Text>
        </View>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#9B9B9B', fontFamily: Fonts.type.regular, fontSize: 14, backgroundColor: 'transparent'}}>
              Portfolio Value
            </Text>
            <Text style={{color: '#9B9B9B', fontFamily: Fonts.type.regular, fontSize: 14, backgroundColor: 'transparent'}}>
              Earnings
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <Text style={{color: '#000', fontFamily: Fonts.type.regular, fontSize: 20, backgroundColor: 'transparent'}}>
              {formatPrice(portfolioValue)}
            </Text>
            <Text style={{color: '#38AA75', fontFamily: Fonts.type.regular, fontSize: 20, backgroundColor: 'transparent'}}>
              +{valueIncrease}% / +{formatPrice(valueIncrease)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderDecisionButton () {
    const {handleSubmit, childrenAvailable} = this.props
    return (
      <View style={{...globalStyle.screen.containers.centeringContainer, backgroundColor: 'transparent', bottom: childrenAvailable ? 40 : 0, paddingBottom: childrenAvailable ? 100 : 0, top: childrenAvailable ? 0 : 200, zIndex: 1000}}>
        <LWButton
          title='Add account'
          buttonType={BUTTON_TYPES.DECISION_BUTTON}
          onPress={() => this.addAccount()}
          extraStyle={{width: 250, height: 50, backgroundColor: 'rgb(0, 174, 112)'}}
        />
      </View>
    )
  }

  renderNewGoal (index, goalID, name, balance, totalAmount) {
    let title = limitText(name, 12)
    title = title ? title.toUpperCase() : 'UNKNOWN'
    const {goalBackground, goalWidth, titleColor, amountColor, enabled} = this.state
    if (!goalBackground[index]) {
      return undefined
    }
    balance || (balance = 0)
    totalAmount || (totalAmount = 0)
    console.log('------- balance for ', name, ' is :: ', balance)
    console.log('------- totalAmount for ', name, ' is :: ', totalAmount)
    let fill = (balance && totalAmount) ? (balance / totalAmount) * 100 : 1
    console.log('fill :: ', fill)

    return (
      <TouchableOpacity onPress={() => this.showGoal(goalID, name)}
        activeOpacity={1}
        key={name}
        style={{marginLeft: 10, marginRight: 10}}>
        <AnimatedProgress
          size={spaceHeight}
          width={goalWidth[index]}
          backgroundFill='rgba(255, 255, 255, 0)'
          fill={fill}
          tintColor='#FFF'
          backgroundColor='rgba(255, 255, 255, 0.4)' >
          {
            (fill) => (
              <View style={{...styles.goalHeaderContainer, top: spaceHeight / 3}}>
                <Text style={{fontSize: 14, color: '#FFF', fontFamily: Fonts.type.regular, backgroundColor: 'transparent'}}>
                  {name}
                </Text>
                <Text style={{fontSize: 30, fontFamily: Fonts.type.light, color: '#FFF', backgroundColor: 'transparent', marginTop: 10, marginBottom: 10}}>
                  {formatPrice(balance)}
                </Text>
                <Text style={{fontSize: 14, fontFamily: Fonts.type.regular, color: '#FFF', backgroundColor: 'transparent'}}>
                  {/* {balance ? limitText(formatPrice(balance), 10) : 0} */}
                  {formatPrice(totalAmount)}
                </Text>
              </View>
            )
          }
        </AnimatedProgress>
      </TouchableOpacity>
    )
  }

  renderGoalPanel () {
    const {handleLocalAction, localActions, navigator, childID, goals, firstItemIndex} = this.props
    return (
      <View style={{paddingBottom: 51, marginTop: 56, marginBottom: 30}}>
        <Carousel
          sliderWidth={Dimensions.get('window').width}
          itemWidth={spaceHeight + 20}
          firstItem={firstItemIndex}
          onSnapToItem={item => this.snappingTo(item)}
          inactiveSlideScale={0.7}
        >
          {
            goals
            &&
            goals.map((goal, index) => this.renderNewGoal(index, goal[GOAL_ENTITIES.GID], goal[GOAL_ENTITIES.NAME], goal[GOAL_ENTITIES.BALANCE] || 0, goal[GOAL_ENTITIES.GOAL_AMOUNT] || 0))
          }
        </Carousel>
      </View>
    )
  }

  renderStockContainer () {
    const {handleLocalAction, localActions, navigator, childArr, childID} = this.props
    const {width, height} = Dimensions.get('window')
    return (
      <View style={{backgroundColor: 'white', height: 650, marginTop: 30, zIndex: 500}}>
        <View style={{height: 600, backgroundColor: 'transparent', paddingLeft: 20, paddingRight: 20, position: 'absolute', left: 0, right: 0, bottom: 0, top: -45}}>
          {this.renderStockCard(require('../../../Img/icons/apple.png'), 'Apple Corp.', '$5000.20', '-0.2%')}
          {this.renderStockCard(require('../../../Img/icons/slowSteadyIcon.png'), 'Slow & Steady', '$258.50', '+1.5%')}
        </View>
        <Image source={require('../../../Img/icons/bubbles.png')} style={{zIndex: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: 300}} />
        <Image source={require('../../../Img/icons/waves.png')} style={{position: 'absolute', bottom: 0, left: 0, width: width, height: 300, top: 170, zIndex: 10}} />
        <LinearGradient
          colors={['rgb(130, 203, 120)', 'rgb(62, 172, 116)']}
          start={{x: 0.1, y: -0.6}} end={{x: 0.3, y: 0.3}}
          locations={[0.5, 1]}
          style={{height: 300, zIndex: 300, top: 350}}>
          {this.renderDecisionButtons(require('../../../Img/icons/newInvestment.png'), 'New Investment Goals', () => handleLocalAction({type: localActions.ADD_NEW_GOAL, [CHILD_ENTITIES.CHILD_ID]: childID, [COMMON_ENTITIES.NAVIGATOR]: navigator}), true)}
          {this.renderDecisionButtons(require('../../../Img/icons/saveInvest.png'), 'Save & Invest', () => console.log('new goal printed'), true)}
          {this.renderDecisionButtons(require('../../../Img/icons/withdrawIcon.png'), 'Withdraw', () => console.log('new goal printed'), false)}
        </LinearGradient>
      </View>
    )
  }

  renderStockCard (img, stock, price, inc) {
    return (
      <View style={{height: 90, flexDirection: 'row', marginBottom: 20, zIndex: 100}}>
        <TouchableOpacity onPress={() => console.log('stock pressed')} style={{flex: 1, height: 90, paddingRight: 20, backgroundColor: '#FFF', borderRadius: 10, shadowOpacity: 0.3, shadowOffset: {width: 0, height: 0}, marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: 'row', height: 90}}>
            <View style={{paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={img} style={{height: 29, width: 23}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
              <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#000', backgroundColor: 'transparent'}}>
                {stock}
              </Text>
              <Text style={{fontFamily: 'Lato-Regular', fontSize: 18, color: '#000', backgroundColor: 'transparent'}}>
                {price}
              </Text>
            </View>
          </View>

          <Text style={{textAlign: 'right', position: 'absolute', bottom: 10, right: 20, color: '#9B9B9B', fontSize: 14, fontFamily: 'Lato-Regular'}}>
            {inc}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderDecisionButtons (img, name, foo, boundry) {
    return (
      <View>
        <TouchableOpacity onPress={() => foo()} style={{flexDirection: 'row', paddingLeft: 50}}>
          <Image source={img} style={{height: 23, width: 23, marginRight: 40}} />
          <Text style={{fontFamily: 'Lato-Regular', fontSize: 18, color: '#FFF', backgroundColor: 'transparent'}}>
            {name}
          </Text>
        </TouchableOpacity>
        {
          boundry && <View style={{height: 0.3, backgroundColor: '#E6E6E6', marginTop: 40, marginBottom: 40}} />
        }
      </View>
    )
  }

  renderChart () {
    var Highcharts = 'Highcharts'
    var conf = {
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Market Value'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2)
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Market Value',
        data: timeData,
        pointInterval: 24 * 3600 * 1000,
        pointStart: Date.UTC(2006, 0, 1)
      }, {
        name: 'Investment',
        data: timeDate2,
        pointInterval: 24 * 3600 * 1000,
        pointStart: Date.UTC(2006, 0, 1)
      }]
    }
    const {charVisible} = this.state
    return (
      <View>
        {this.renderChartClosure()}
        <ChartView style={{height: charVisible ? 250 : 0}} config={conf} />
      </View>
    )
  }

  renderChartClosure () {
    const {charVisible} = this.state
    if (charVisible) {
      return (
        <Icon name='close' style={{}} onPress={() => this.hideChart()} />
      )
    } else {
      return null
    }
  }

  renderHeader () {
    const {navigator} = this.props
    return (
      <LinearGradient
        colors={['rgb(128, 213, 109)', 'rgb(0, 174, 112)']}
        start={{x: 0.7, y: -0.4}} end={{x: 0, y: 0.2}}
        locations={[0.4, 1]}
      >
        <View style={{marginTop: 45, marginBottom: 30, justifyContent: 'center', alignItems: 'center', height: 44}}>
          <View style={{position: 'absolute', left: 25}}>
            <LeftNavHeader navigator={navigator} />
          </View>
          <View style={{position: 'absolute', right: 25}}>
            <RightNavHeader navigator={navigator} />
          </View>
          <Image source={require('../../../Img/icons/loginPinLogo.png')} style={{height: 24, width: 26}} />
        </View>
      </LinearGradient>
    )
  }

  // ------------------------------------------------------------
  // Core render method

  render () {
    console.log('---- child view is getting rendered ------')
    const {childrenAvailable} = this.props
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {this.renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
        >
          {childrenAvailable && this.renderMiddleContainer()}
          {childrenAvailable && this.renderChildPanel()}
          {this.renderDecisionButton()}
        </ScrollView>
      </View>
    )
  }

}

Homepage.propTypes = {
  // used for handling local actions, comes from container directly
  handleLocalAction: PropTypes.func.isRequired,
  // used for mapping local action types, comes from container directly
  localActions: PropTypes.object.isRequired,
  // used for navigation, comes via react-navigation
  navigator: PropTypes.object.isRequired,
  // children array
  childArr: PropTypes.array.isRequired,
  // total portfolio value of family
  totalPortfolioValue: PropTypes.number.isRequired,
  // total growth of portfolio
  growthValue: PropTypes.number.isRequired,
  // growth percentage
  growthPercentage: PropTypes.number.isRequired,
  // user id
  userID: PropTypes.string.isRequired,
  // children are available or not
  childrenAvailable: PropTypes.bool.isRequired
}

Homepage.defaultProps = {
  totalPortfolioValue: 0,
  growthValue: '0',
  growthPercentage: '1.2'
}

// ========================================================
// Export
// ========================================================

export default Homepage
