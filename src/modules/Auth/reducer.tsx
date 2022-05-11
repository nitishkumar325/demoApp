import * as Actions from './types';
const initialState = {
  name: '',
  authLoder: false,
  isLogin: false,
  email: '',
  phone: '',
  username: '',
  avatar: '',
  firstname: '',
  lastname: '',
  active: -1,
};

const AuthReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.SET:
      return {...state, ...action.payload};
    case Actions.Loder:
      return {...state, ...action.payload};
    case Actions.setLogin:
      return {...state, ...action.payload};
    case Actions.SET_LOGI_INFO:
      return {...state, ...action.payload};
    case Actions.USER_DETAIL:
      return {...state, ...action.payload};
    case Actions.SET_INITIAL:
      return {...initialState};
    default:
      return state;
  }
};

export default AuthReducer;
