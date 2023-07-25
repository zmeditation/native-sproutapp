/* eslint-disable key-spacing */
import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import {nav} from './Reducers/Nav'
import {reducer as formReducer} from 'redux-form'
import {reducer as UserReducer} from './Reducers/UserReducer'
import {reducer as GoalReducer} from './Reducers/GoalReducer'
import {reducer as ChildrenReducer} from './Reducers/ChildReducer'
import {reducer as AuthReducer} from './Reducers/AuthReducer'
import {reducer as SettingReducer} from './Reducers/SettingReducer'
import {AuthTypes} from '../Redux/Reducers/AuthReducer'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const appReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    nav: nav,
    util: SettingReducer,
    root: combineReducers({
      u: UserReducer,
      children: ChildrenReducer,
      goals: GoalReducer
    })
  })

  const rootReducer = (state, action) => {
    if (action.type === AuthTypes.LOGOUT) {
      state = undefined
    }

    return appReducer(state, action)
  }

  return configureStore(rootReducer, rootSaga)
}
