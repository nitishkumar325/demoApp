import React from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import constants from '../../constants';
import {vw, vh} from '../../constants/Dimension';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Splash = () => {
  const {isLogin} = useSelector((state: {Auth: any}) => ({
    isLogin: state.Auth.isLogin,
  }));

  const navigation = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate(constants.Screens.Login);
    }, 3000);
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: constants.Colors.themeGreen}}>
      <View style={styles.parent}>
        <Image style={styles.logoSize} source={constants.Images.Logo} />
      </View>
      <Image style={styles.suffixSize} source={constants.Images.suffix} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#25283D',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSize: {
    height: vw(96),
    width: vw(280),
    resizeMode: 'contain',
  },
  suffixSize: {
    height: vh(72),
    width: vw(202),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: vh(40),
    alignSelf: 'center',
  },
});

export default Splash;
