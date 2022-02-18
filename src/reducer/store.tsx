import {persistStore, persistReducer} from 'redux-persist';
import {applyMiddleware, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import reducer from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancer(applyMiddleware(thunkMiddleware, logger));
// const enhancer = composeEnhancer(applyMiddleware(thunkMiddleware));

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Auth'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
