/* eslint-disable no-trailing-spaces,camelcase */
/**
 * Created by viktor on 17/7/17.
 */
// ========================================================
// Import Packages
// ========================================================

import {Navigation} from 'react-native-navigation'
import { SPROUT } from '../Utility/Mapper/Screens'

// ========================================================
// Import Screens
// ========================================================

import Authentication from '../Containers/Common/Auth'
import AuthSelector from '../Containers/Common/AuthSelector'
import PlaidConnect from '../Containers/Common/PlaidConnect'
import LoginPin from '../Containers/Common/LoginPin'

import GrowHomepage from '../Containers/Grow/Homepage'
import Article from '../Containers/Grow/Article'

import SettingPanel from '../Containers/Settings/SettingPanel'
import ChangePassword from '../Containers/Settings/ChangePassword'
import RecurringDetail from '../Containers/Settings/RecurringDetail'
import FAQ from '../Containers/Settings/FAQ'
import AboutUS from '../Containers/Settings/AboutUS'
import Documents from '../Containers/Settings/Documents'
import ViewTransfers from '../Containers/Settings/ViewTransfers'
import ShowConfig from '../Containers/Settings/ShowConfig'
import EditProfile from '../Containers/Settings/EditProfile'
import BankSetup from '../Containers/Settings/BankSetup'
import Statements from '../Containers/Settings/Statements'
import Confirmations from '../Containers/Settings/Confirmations'
import Activity from '../Containers/Settings/Activity'

import HomepageContainer from '../Containers/Sprout/HomepageContainer'
import Homepage from '../Containers/Sprout/Homepage'
import AddChild from '../Containers/Sprout/AddChild'
import ChildSSN from '../Containers/Sprout/ChildSSN'
import CreateChildNotification from '../Containers/Sprout/CreateChildNotification'
import ChildAgeLimitation from '../Containers/Sprout/ChildAgeLimitation'
import SSNConfirm from '../Containers/Sprout/SSNConfirm'
import ChildView from '../Containers/Sprout/ChildView'

import SelectGoal from '../Containers/Goals/SelectGoal'
import AddGoal from '../Containers/Goals/AddGoal'
import SelectGoalDuration from '../Containers/Goals/GoalDuration'
import GoalDurationSelectionScreen from '../Containers/Goals/GoalDurationSelection'
import SelectGoalRisk from '../Containers/Goals/SelectRisk'
import SelectGoalAmount from '../Containers/Goals/GoalAmount'
import SelectGoalRecurringAmount from '../Containers/Goals/RecurringAmount'
import RecurringInvest from '../Containers/Goals/Invest'
import InvestReady from '../Containers/Goals/InvestReady'
import InvestUnderway from '../Containers/Goals/InvestUnderway'
import SkipConfirm from '../Containers/Goals/SkipConfirm'
import GoalHomepage from '../Containers/Goals/Homepage'
import PortfolioDetail from '../Containers/Goals/PortfolioDetail'
import CostExpected from '../Containers/Goals/CostExpected'

import Withdraw from '../Containers/User/Withdraw'
import ParentDashboard from '../Containers/User/ParentDashboard'
import UserInputDetail_1 from '../Containers/User/InputDetail_1'
import UserInputDetail_2 from '../Containers/User/InputDetail_2'
import UserInputDetail_3 from '../Containers/User/InputDetail_3'
import UserInputDetail_4 from '../Containers/User/InputDetail_4'
import UserInputDetail_5 from '../Containers/User/InputDetail_5'
import UserInputDetail_6 from '../Containers/User/InputDetail_6'
import UserInputDetail_7 from '../Containers/User/InputDetail_7'
import UserInputDetail_8 from '../Containers/User/InputDetail_8'
import UserInputDetail_9 from '../Containers/User/InputDetail_9'
import UserInputDetail_SSN from '../Containers/User/InputDetail_SSN'
import AcceptTermsConditions from '../Containers/User/TermsAccept'
import UserInputCountryBorn from '../Containers/User/InputCountryBorn'
import UserInputCountryCitizenship from '../Containers/User/InputCountryCitizenship'
import UserVisaType from '../Containers/User/InputVisaType'
import UserVisaExpiry from '../Containers/User/InputVisaExpiry'
import OtherResidence from '../Containers/User/OtherResidence'
import ConfirmPushNotification from '../Containers/User/ConfirmPushNotification'
import AgeLimitationNotification from '../Containers/User/AgeLimitationNotification'

export function registerScreens (store, Provider) {
  Navigation.registerComponent(SPROUT.AUTH_SELECTOR_SCREEN, () => AuthSelector, store, Provider)
  Navigation.registerComponent(SPROUT.AUTHENTICATION_SCREEN, () => Authentication, store, Provider)
  Navigation.registerComponent(SPROUT.LOGIN_PIN, () => LoginPin, store, Provider)

  Navigation.registerComponent(SPROUT.GROW_HOMEPAGE, () => GrowHomepage, store, Provider)
  Navigation.registerComponent(SPROUT.ARTICLE, () => Article, store, Provider)

  Navigation.registerComponent(SPROUT.SETTINGS_PANEL, () => SettingPanel, store, Provider)
  Navigation.registerComponent(SPROUT.CHANGE_PASSWORD, () => ChangePassword, store, Provider)
  Navigation.registerComponent(SPROUT.RECURRING_DETAIL, () => RecurringDetail, store, Provider)
  Navigation.registerComponent(SPROUT.FAQ, () => FAQ, store, Provider)
  Navigation.registerComponent(SPROUT.ABOUT_US, () => AboutUS, store, Provider)
  Navigation.registerComponent(SPROUT.DOCUMENTS, () => Documents, store, Provider)
  Navigation.registerComponent(SPROUT.VIEW_TRANSFERS, () => ViewTransfers, store, Provider)
  Navigation.registerComponent(SPROUT.SHOW_CONFIG, () => ShowConfig, store, Provider)
  Navigation.registerComponent(SPROUT.EDIT_PROFILE, () => EditProfile, store, Provider)
  Navigation.registerComponent(SPROUT.BANK_SETUP, () => BankSetup, store, Provider)
  Navigation.registerComponent(SPROUT.STATEMENTS, () => Statements, store, Provider)
  Navigation.registerComponent(SPROUT.CONFIRMATIONS, () => Confirmations, store, Provider)
  Navigation.registerComponent(SPROUT.ACTIVITY, () => Activity, store, Provider)

  Navigation.registerComponent(SPROUT.CHILD_HOMEPAGE_CONTAINER_SCREEN, () => HomepageContainer, store, Provider)
  Navigation.registerComponent(SPROUT.CHILD_HOMEPAGE_SCREEN, () => Homepage, store, Provider)
  Navigation.registerComponent(SPROUT.ADD_CHILD_SCREEN, () => AddChild, store, Provider)
  Navigation.registerComponent(SPROUT.CHILD_SSN_SCREEN, () => ChildSSN, store, Provider)
  Navigation.registerComponent(SPROUT.CREATE_CHILD_NOTIFICATION, () => CreateChildNotification, store, Provider)
  Navigation.registerComponent(SPROUT.CHILD_AGE_LIMITATION, () => ChildAgeLimitation, store, Provider)
  Navigation.registerComponent(SPROUT.SSN_CONFIRM, () => SSNConfirm, store, Provider)
  Navigation.registerComponent(SPROUT.CHILD_VIEW_SCREEN, () => ChildView, store, Provider)

  Navigation.registerComponent(SPROUT.SELECT_GOAL_SCREEN, () => SelectGoal, store, Provider)
  Navigation.registerComponent(SPROUT.ADD_GOAL_SCREEN, () => AddGoal, store, Provider)
  Navigation.registerComponent(SPROUT.GOAL_DURATION_SCREEN, () => SelectGoalDuration, store, Provider)
  Navigation.registerComponent(SPROUT.GOAL_DURATION_SELECTION_SCREEN, () => GoalDurationSelectionScreen, store, Provider)
  Navigation.registerComponent(SPROUT.SELECT_RISK_SCREEN, () => SelectGoalRisk, store, Provider)
  Navigation.registerComponent(SPROUT.GOAL_AMOUNT_SCREEN, () => SelectGoalAmount, store, Provider)
  Navigation.registerComponent(SPROUT.RECURRING_AMOUNT_SCREEN, () => SelectGoalRecurringAmount, store, Provider)
  Navigation.registerComponent(SPROUT.INVEST, () => RecurringInvest, store, Provider)
  Navigation.registerComponent(SPROUT.INVEST_READY, () => InvestReady, store, Provider)
  Navigation.registerComponent(SPROUT.INVEST_UNDERWAY, () => InvestUnderway, store, Provider)
  Navigation.registerComponent(SPROUT.SKIP_CONFIRM, () => SkipConfirm, store, Provider)
  Navigation.registerComponent(SPROUT.GOAL_HOMEPAGE_SCREEN, () => GoalHomepage, store, Provider)
  Navigation.registerComponent(SPROUT.PORTFOLIO_DETAIL, () => PortfolioDetail, store, Provider)
  Navigation.registerComponent(SPROUT.COST_EXPECTED, () => CostExpected, store, Provider)

  Navigation.registerComponent(SPROUT.WITHDRAW, () => Withdraw, store, Provider)
  Navigation.registerComponent(SPROUT.PARENT_DASHBOARD, () => ParentDashboard, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_1, () => UserInputDetail_1, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_2, () => UserInputDetail_2, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_3, () => UserInputDetail_3, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_4, () => UserInputDetail_4, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_5, () => UserInputDetail_5, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_6, () => UserInputDetail_6, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_7, () => UserInputDetail_7, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_8, () => UserInputDetail_8, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_9, () => UserInputDetail_9, store, Provider)
  Navigation.registerComponent(SPROUT.USER_INPUT_DETAIL_SSN, () => UserInputDetail_SSN, store, Provider)
  Navigation.registerComponent(SPROUT.USER_COUNTRY_BORN, () => UserInputCountryBorn, store, Provider)
  Navigation.registerComponent(SPROUT.USER_COUNTRY_CITIZENSHIP, () => UserInputCountryCitizenship, store, Provider)
  Navigation.registerComponent(SPROUT.ACCEPT_TERMS_CONDITIONS, () => AcceptTermsConditions, store, Provider)
  Navigation.registerComponent(SPROUT.USER_VISA_TYPE, () => UserVisaType, store, Provider)
  Navigation.registerComponent(SPROUT.USER_VISA_EXPIRY, () => UserVisaExpiry, store, Provider)
  Navigation.registerComponent(SPROUT.OTHER_RESIDENCE, () => OtherResidence, store, Provider)
  Navigation.registerComponent(SPROUT.CONFIRM_PUSH_NOTIFICATION, () => ConfirmPushNotification, store, Provider)
  Navigation.registerComponent(SPROUT.AGE_LIMITATION_NOTIFICATION, () => AgeLimitationNotification, store, Provider)

  Navigation.registerComponent(SPROUT.PLAID_CONNECT, () => PlaidConnect, store, Provider)
}
