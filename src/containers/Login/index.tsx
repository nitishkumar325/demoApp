import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import CustomTextInput from '../../component/CustomTextInput';
import constants from '../../constants';
import {vw, vh, normalize} from '../../constants/Dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Modal from '../../component/Modal';
import {useDispatch, useSelector} from 'react-redux';
import CommonFunction from '../../Utils/CommonFunction';
import {
  setLocalDetail,
  setLoginBoolean,
  setLoginInfo,
  userLogin,
} from '../../modules/Auth';
import Router from '../../navigator/routes';
import Loader from '../../component/Loader/Loader';
import Colors from '../../constants/Colors';
import Screens from '../../constants/Screens';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [Error, setError] = useState(false);

  const [ErrorMsg, setErrorMsg] = useState('');

  const [loder, setLoder] = React.useState(false);

  const inputRefs = React.useRef<Array<any>>([]);
  const inputStyles = {
    width: vw(337),
    marginBottom: vh(10),
    backgroundColor: 'white',
    borderRadius: vw(3),
  };

  const apiCallForLogin = () => {
    setLoder(true);
    dispatch(
      userLogin(
        {
          email: email,
          password: password,
        },
        (res: any) => {
          console.log('res', res);
          setLoder(false);
          dispatch(setLoginBoolean(true));
          dispatch(setLoginInfo(res));
          Router.resetNew(navigation, constants.Screens.Landing, {
            type: 'SIGNUP',
          });
        },
        (error: any) => {
          setLoder(false);
          console.log('error callback', error);
          CommonFunction.showSnackbar(
            error.data.errors[0].defaultMessage,
            'black',
          );
        },
      ),
    );
  };

  const onPressSave = () => {
    navigation.navigate(Screens.Landing);
  };

  const handleChange = (type: string, val: any) => {
    if (type === 'phone') {
      let num = val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
      const mobile = val ? parseInt(CommonFunction.normalizeSpaces(num)) : '';
      setPhoneNumber(mobile.toString());
      setPhoneNumberError(CommonFunction.validatePhone(mobile).msg);
    } else if (type === 'password') {
      const password = CommonFunction.normalizeSpaces(val);
      setPasswordError(CommonFunction.validatePassword(val).msg);
      setPassword(password);
    } else if (type === 'email') {
      setEmail(CommonFunction.normalizeEmail(val));
      setEmailError(CommonFunction.validateEmail(val).msg);
    }
  };

  const onForgetPassword = () => {
    // navigation.navigate(constants.Screens.forget);
  };

  let disabled = email.length == 0 || password.length === 0;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.themeGreen}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        scrollEnabled={true}
        style={{marginBottom: constants.Normalise(30)}}>
        <View style={styles.innerContainner}>
          <View>
            <Image
              resizeMode="contain"
              style={styles.appLogo}
              source={constants.Images.Logo}
            />
          </View>
          <View style={styles.alignLeft40}>
            <CustomTextInput
              ref={ref => (inputRefs.current[0] = ref)}
              autoCapitalize="sentences"
              container={inputStyles}
              value={email}
              placeholder={'Username'}
              labelStyle={{color: 'white', fontWeight: '600'}}
              label={'Username'}
              fieldName="email"
              keyboardType="default"
              icon={constants.Images.User}
              onSubmitEditing={() => inputRefs.current[1].focus()}
              onChangeText={(type: string, val: string) =>
                handleChange(type, val)
              }
              isError
              iconStyle={styles.iconStyle}
            />
            <CustomTextInput
              ref={ref => (inputRefs.current[1] = ref)}
              container={inputStyles}
              placeholder={'Password'}
              value={password}
              label={'Password'}
              onChangeText={(type: string, val: string) =>
                handleChange(type, val)
              }
              fieldName="password"
              labelStyle={{color: 'white', fontWeight: '600'}}
              isError
              keyboardType="default"
              secureTextEntry
              returnKeyType="done"
              icon={constants.Images.lock}
              iconStyle={styles.iconStyle}
            />
          </View>
          <CustomButton
            isDisabled={false}
            buttonText={'LOGIN'}
            handleAction={onPressSave}
            textStyle={styles.textStyle}
            customStyle={[
              styles.saveButtonContainer,
              // {backgroundColor: disabled ? '#EA1C39' : '#6a9589'},
            ]}
          />

          <TouchableOpacity>
            <Text style={styles.forgetPasword}>{'Forgot Password ?'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
  back: {
    height: vw(450),
    width: '100%',
  },
  innerContainner: {
    flex: 1,
    marginTop: vh(86),
    alignItems: 'center',
  },
  appLogo: {
    height: vw(96),
    width: vw(250),
    resizeMode: 'contain',
  },
  alignLeft40: {
    marginHorizontal: vw(50),
    marginTop: vh(51),
  },
  signin: {
    color: 'white',
    fontWeight: '800',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  forgetPasword: {
    alignSelf: 'center',
    marginTop: vh(40),
    color: 'white',
    fontSize: vw(12),
  },
  saveButtonContainer: {
    width: vw(337),
    alignSelf: 'center',
    borderRadius: vw(5),
    backgroundColor: '#EA1C39',
    paddingVertical: vh(18),
    marginTop: vh(40),
  },
  modalParent: {
    width: constants.vw(310),
    minHeight: vh(150),
    backgroundColor: constants.Colors.white,
    paddingVertical: constants.vh(10),
    borderRadius: constants.vw(20),
    alignItems: 'center',
    paddingHorizontal: vw(16),
  },
  empText: {
    fontSize: constants.vw(14),
    alignSelf: 'center',
    fontWeight: '700',
  },
  text: {
    fontSize: constants.vw(14),
    alignSelf: 'center',
    fontWeight: '400',
    marginTop: vh(5),
  },
  seperator: {
    width: '90%',
    backgroundColor: 'grey',
    height: 1,
    alignSelf: 'center',
    marginVertical: constants.vh(5),
    opacity: 0.3,
  },
  error: {
    marginTop: normalize(10),
    marginLeft: vw(40),
    flexDirection: 'row',
  },
  errImage: {
    height: normalize(17.6),
    width: normalize(18.6),
    tintColor: constants.Colors.red,
  },
  errorMessage: {
    color: constants.Colors.red,
    marginLeft: vw(10),
    fontSize: vw(14),
    width: vw(260),
  },
  textStyle: {
    fontSize: vw(12),
    color: 'white',
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

export default Login;
