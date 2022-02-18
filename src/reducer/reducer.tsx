import {combineReducers} from 'redux';
import Auth from '../modules/Auth/reducer';
import {RESET_STORE} from './../modules/Auth/types';
export interface AppState {
  Auth: any;
}

const appReducer = combineReducers<AppState>({
  Auth,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
