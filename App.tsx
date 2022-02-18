import React, {Component, Fragment} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Navigation from './src/navigator/index';
import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/reducer/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
};

export default App;
