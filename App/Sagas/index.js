/* eslint-disable no-trailing-spaces,no-unused-vars */

import { takeLatest, fork } from 'redux-saga/effects'
import {GoalTypes} from '../Redux/Reducers/GoalReducer'
import {ChildTypes} from '../Redux/Reducers/ChildReducer'
import {AuthTypes} from '../Redux/Reducers/AuthReducer'
import {UserTypes} from '../Redux/Reducers/UserReducer'
import {SettingTypes} from '../Redux/Reducers/SettingReducer'

/* ------------- Sagas ------------- */

import { getAccessToken } from './StartupSagas'
import {submitUserInfo, fetchUser, fetchUserDetail, linkPlaid} from './UserSagas'
import {addCustomGoal, updateGoal, transfer, fetchDetail, fetchChartData, fetchUserTransfers} from './GoalSaga'
import {addChild, fetchChildChartData} from './ChildSaga'
import {fetchRecurringData, fetchStatements, fetchConfirmations, transferNow} from './SettingsSaga'
import {login, signup, registerPIN, changePassword, logout, passcodeLogin} from './AuthSaga'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield fork(takeLatest, ChildTypes.ADD_CHILD, addChild, require('../Services/Queries/Child').childQuery().addChild)

  yield fork(takeLatest, UserTypes.FETCH_USER, fetchUser, require('../Services/Queries/User').userQuery().fetchUser)

  yield fork(takeLatest, UserTypes.FETCH_USER_DETAIL, fetchUserDetail, require('../Services/Queries/Child').fetchChildDetail().fetchChildDetail)

  yield fork(takeLatest, GoalTypes.ADD_CUSTOM_GOAL, addCustomGoal, require('../Services/Queries/Goal').goalQuery().addCustomGoal)

  yield fork(takeLatest, GoalTypes.UPDATE_COMPLETE_GOAL, updateGoal, require('../Services/Queries/Goal').updateCompleteGoalQuery().updateGoal)

  yield fork(takeLatest, GoalTypes.UPDATE_PARTIAL_GOAL, updateGoal, require('../Services/Queries/Goal').updatePartialGoalQuery().updateGoal)

  yield fork(takeLatest, UserTypes.PLAID_LINKED, linkPlaid, require('../Services/Queries/TPT').linkPlaidQuery().linkPlaid)

  yield fork(takeLatest, GoalTypes.TRANSFER, transfer, require('../Services/Queries/TPT').initiateTransfer().doTransfer)

  yield fork(takeLatest, SettingTypes.SHOW_DOCUMENTS, fetchStatements)
  yield fork(takeLatest, SettingTypes.SHOW_CONFIRMATIONS, fetchConfirmations)
  yield fork(takeLatest, SettingTypes.TRANSFER_NOW, transferNow)

  yield fork(takeLatest, GoalTypes.FETCH_GOAL_DETAIL, fetchDetail, require('../Services/Queries/Goal').fetchGoalDetail().fetchGoalDetail)

  yield fork(takeLatest, GoalTypes.FETCH_GOAL_CHART_DATA, fetchChartData, require('../Services/GoalAPI').goalChart().fetchChart)
  yield fork(takeLatest, ChildTypes.FETCH_CHILD_CHART_DATA, fetchChildChartData, require('../Services/GoalAPI').goalChart().fetchChart)

  // on login action
  yield fork(takeLatest, AuthTypes.LOGIN, login)
  yield fork(takeLatest, AuthTypes.SIGNUP, signup)
  yield fork(takeLatest, AuthTypes.REGISTER_PIN, registerPIN)
  yield fork(takeLatest, AuthTypes.LOGOUT, logout)
  yield fork(takeLatest, SettingTypes.PROCESS_CHANGE_PASSWORD, changePassword)
  yield fork(takeLatest, AuthTypes.PASSCODE_LOGIN, passcodeLogin)

  // settings action
  yield fork(takeLatest, SettingTypes.FETCH_RECURRING_DATA, fetchRecurringData, require('../Services/Queries/Goal').fetchRecurringInvestmentData().fetchData)
  yield fork(takeLatest, SettingTypes.VIEW_TRANSFERS, fetchUserTransfers, require('../Services/Queries/Goal').fetchUserTransfers().fetchUserTransfers)
}
