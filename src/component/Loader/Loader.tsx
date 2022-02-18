import React from 'react';
import {View} from 'react-native';
import {Wave} from 'react-native-animated-spinkit';

// custom imports
import Styles from './styles';

interface LoaderProps {}

export default class Loader extends React.PureComponent<LoaderProps> {
  render() {
    return (
      <View style={Styles.container}>
        <View style={{}}>
          <Wave size={80} color={'#fa811e'} />
        </View>
      </View>
    );
  }
}
