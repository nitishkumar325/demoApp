import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import constants from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {vw, vh} from '../../constants/Dimension';
import PhoneOTP from '../../component/PhoneOTP';
import CustomButton from '../../component/CustomButton';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Router from '../../navigator/routes';

import {OTPConfirm, setLoginBoolean} from '../../modules/Auth';
import Loader from '../../component/Loader/Loader';

interface Props {
  route: any;
}

const OTPScreen = (props: Props) => {
  // const {authLoder} = useSelector((state: {Auth: any}) => ({
  //   authLoder: state.Auth.authLoder,
  // }));
  const [loder, setLoder] = React.useState(false);

  const dispatch = useDispatch();
  const [useCode, setUserCode] = React.useState('');
  const {phoneNo, email} = props.route.params;
  // const phoneNo = '9958431869';
  const navigation = useNavigation();
  const onResendPress = () => {};
  const onSubmitPressOTP = (code: any) => {
    setUserCode(code);
  };
  const onPressSave = () => {
    setLoder(true);
    console.log('data', email, useCode);
    dispatch(setLoginBoolean(true));
    Router.resetNew(navigation, constants.Screens.Login, {
      type: 'SIGNUP',
    });
    // dispatch(
    //   OTPConfirm(
    //     {
    //       email: email,
    //       confirmationcode: useCode,
    //     },
    //     () => {
    //       setLoder(false);
    //       console.log('success callbacl');
    //       Router.resetNew(navigation, constants.Screens.Landing, {
    //         type: 'SIGNUP',
    //       });
    //     },
    //     () => {
    //       setLoder(false);
    //       console.log('error callback');
    //     },
    //   ),
    // );
  };
  const onBackPress = () => {
    navigation.goBack();
  };
  const onchangePhone = () => {
    navigation.goBack();
  };
  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={onBackPress} style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.back} />
        <Text style={styles.headerTextStyle}>{'OTP'}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header renderLeftButton={renderLeftButton} />
      <KeyboardAwareScrollView>
        <View style={styles.constainer}>
          <Image style={styles.appLogo} source={constants.Images.AppLogo} />
          <Text style={styles.veri}>{'Verification Code'}</Text>
          <Text style={styles.sent}>
            {'We have sent the verification code to\n Your Mobile Number'}
          </Text>
          <View style={styles.alignRow}>
            <Text style={styles.number}>{`${'+91'}${phoneNo}`}</Text>
            <TouchableOpacity
              onPress={onchangePhone}
              style={styles.greenCircle}>
              <Image
                style={styles.pencil}
                source={constants.Images.otp_pencil}
              />
            </TouchableOpacity>
          </View>
          <PhoneOTP onResend={onResendPress} onSubmit={onSubmitPressOTP} />
          <CustomButton
            buttonText={'Verify'}
            handleAction={onPressSave}
            customStyle={styles.saveButtonContainer}
            textStyle={styles.textStyle}
          />
        </View>
      </KeyboardAwareScrollView>
      {loder && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  appLogo: {
    height: vw(150),
    width: vw(150),
    alignSelf: 'center',
    marginTop: vh(100),
  },
  veri: {
    fontWeight: '700',
    fontSize: vw(22),
    textAlign: 'center',
    color: 'black',
  },
  sent: {
    fontWeight: '600',
    fontSize: vw(12),
    textAlign: 'center',
    marginTop: vh(10),
    color: 'black',
  },
  pencil: {
    tintColor: 'white',
    height: vw(10),
    width: vw(10),
  },
  greenCircle: {
    height: vw(20),
    width: vw(20),
    borderRadius: vw(10),
    backgroundColor: constants.Colors.appButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: vw(10),
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: vh(30),
  },
  number: {
    fontWeight: '600',
    fontSize: vw(12),
    color: 'black',
    textAlign: 'center',
  },
  saveButtonContainer: {
    width: vw(250),
    alignSelf: 'center',
    borderRadius: vw(30),
    backgroundColor: '#6a9589',
    paddingVertical: vh(15),
    marginTop: vh(30),
  },
  textStyle: {
    fontSize: vw(14),
    fontWeight: '600',
  },
  backButtom: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default OTPScreen;
