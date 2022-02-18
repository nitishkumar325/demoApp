import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import constants from '../../constants';
import {vw, vh} from '../../constants/Dimension';
import LinearGradient from 'react-native-linear-gradient';

const noop = () => {};

interface Props {
  renderRightButton?(): JSX.Element;
  renderLeftButton?(): JSX.Element;
  contentContainerStyle?: ViewStyle;
  customStyle?: any;
}

const Header = ({
  renderRightButton = noop,
  renderLeftButton = noop,
  contentContainerStyle = {},
  customStyle = {},
}: Props) => {
  return (
    <LinearGradient
    start={{x: 0.9, y: 0.9}}
    end={{x: 0.1, y: 0.3}}
    colors={['#25283D', '#383C5D']}
      style={[
        styles.container,
        contentContainerStyle,
        styles.header,
        customStyle,
      ]}>
      {renderLeftButton()}
      {renderRightButton()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#303345',
    borderBottomLeftRadius: vw(10),
    flexDirection: 'row',
    paddingLeft: vw(20),
    paddingVertical: vh(10),
  },
  iconColor: {
    tintColor: 'white',
  },
  headerTextStyle: {
    fontSize: vw(14),
    color: 'white',
    fontWeight: '700',
    marginLeft: vw(10),
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: constants.vw(16),
    justifyContent: 'space-between',
    paddingTop: vh(16),
  },
});

export default Header;
