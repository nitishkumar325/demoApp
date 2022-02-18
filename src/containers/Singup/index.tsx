import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomTextInput from '../../component/CustomTextInput';
import constants from '../../constants';
import {vw, vh} from '../../constants/Dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../component/CustomButton';
import CommonFunctions from '../../Utils/CommonFunction';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loder from '../../component/Loader/Loader';
import Header from '../../component/Header';
import Modal from '../../component/Modal';
import Utils from '../../Utils';
import {useDispatch} from 'react-redux';
import {setLocalDetail} from '../../modules/Auth';
import * as Actions from './../../modules/Auth/types';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userName, setUserName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState<string>('');

  const [lastName, setLastName] = useState<string>(''); 
  const [lastNameError, setLastNameError] = useState<string>('');

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');

  const [password, setPassword] = useState<string>('Password@123');
  const [passwordError, setPasswordError] = useState<string>('');

  const [confirmPassword, setconfirmPassword] =
    useState<string>('Password@123');
  const [confirmPasswordError, setconfirmPasswordError] = useState<string>('');

  const [Error, setError] = useState(false);

  const [ErrorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [loder, setLoder] = React.useState(false);
  const [isErrorModel, setIsErrorModel] = React.useState(false);

  const inputRefs = React.useRef<Array<any>>([]);
  const inputStyles = {
    width: vw(280),
    marginBottom: vh(10),
    backgroundColor: 'white',
    borderRadius: vw(10),
  };

  const showAlert = () => {};
  const onBackPress = () => {
    navigation.goBack();
  };

  /**
   * JSX for render view
   */
  const renderView = () => {
    return (
      <View style={styles.modalParent}>
        <Text style={styles.empText}>{'Error'}</Text>
        <View style={styles.seperator} />
        <Text style={styles.text}>{ErrorMsg}</Text>
        <CustomButton
          buttonText={'OK'}
          textStyle={{fontSize: vw(12)}}
          handleAction={() => {
            setIsErrorModel(false);
          }}
          customStyle={styles.modalButton}
        />
      </View>
    );
  };

  const onPressSave = () => {
    console.log('callcall');
    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !phoneNumberError &&
      confirmPassword === password
    ) {
      let data = {
        name: `${userName}${' '}${lastName}`,
        password: password,
        username: email,
        phone_number: phoneNumber,
        email: email,
      };
      onSubmitFormHandler();
      // DemoMove();
    } else {
      setError(true);
      if (firstNameError) {
        setErrorMsg('First name must be contain atleast 3 character');
        setIsErrorModel(true);
        // CommonFunctions.singleButton(
        //   'First name must be contain atleast 3 character',
        //   '',
        //   () => {},
        // );
      } else if (lastNameError) {
        setErrorMsg(lastNameError);
        setIsErrorModel(true);
      } else if (phoneNumberError) {
        setErrorMsg(phoneNumberError);
        setIsErrorModel(true);
        // CommonFunctions.singleButton('Invalid phone number', '', () => {});
      } else if (confirmPassword !== password) {
        setErrorMsg('Password mis-match');
        setIsErrorModel(true);
        // CommonFunctions.singleButton(
        //   'Password and confirm should be same ',
        //   '',
        //   () => {},
        // );
      } else if (emailError) {
        setErrorMsg(emailError);
        setIsErrorModel(true);
        // CommonFunctions.singleButton(
        //   'Incorrect email, please retry',
        //   '',
        //   () => {},
        // );
      } else if (passwordError) {
        setErrorMsg(passwordError);
        setIsErrorModel(true);
        // CommonFunctions.singleButton(passwordError, '', () => {});
      } else if (confirmPasswordError) {
        setErrorMsg(confirmPasswordError);
        setIsErrorModel(true);
        // CommonFunctions.singleButton(confirmPasswordError, '', () => {});
      }
    }
  };
  const DemoMove = () => {
    navigation.navigate(constants.Screens.Terms, {
      phoneNo: phoneNumber,
      onPressSave: onPressSave,
    });
  };
  const onSubmitFormHandler = () => {
    console.log('callcall');
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    axios({
      method: 'POST',
      url: 'http://3.7.240.41:8080/api/auth/signup',
      data: {
        name: `${userName}${' '}${lastName}`,
        password: password,
        username: email,
        phone_number: phoneNumber,
        email: email,
      },
    })
      .then(response => {
        console.log('resp', response);
        dispatch({
          type: Actions.Loder,
          payload: {
            authLoder: false,
          },
        });
        if (response.data.status === 200) {
          dispatch(
            setLocalDetail({
              name: `${userName}${' '}${lastName}`,
              phone: phoneNumber,
              email: email,
            }),
          );
          setTimeout(() => {
            navigation.navigate(constants.Screens.OTP, {
              phoneNo: phoneNumber,
              email: email,
            });
          }, 500);
        } else {
          dispatch({
            type: Actions.Loder,
            payload: {
              authLoder: false,
            },
          });
          Utils.CommonFunctions.showSnackbar(response.data.message, 'black');
        }
      })
      .catch((Error: any) => {
        dispatch({
          type: Actions.Loder,
          payload: {
            authLoder: false,
          },
        });
        console.log('qdjqwhkdkq', Error.response);
        setLoder(false);
        console.log('===error', Error.response.data.errors[0].defaultMessage);
        Utils.CommonFunctions.showSnackbar(
          Error.response.data.errors[0].defaultMessage,
          'black',
        );
      });
  };

  const handleChange = (type: string, val: any) => {
    if (type === 'firstName') {
      const name = CommonFunctions.normalizeName(val);
      setUserName(name);
      setFirstNameError(CommonFunctions.validateName(name).msg);
      console.log(name);
      console.log(CommonFunctions.validateName(name).msg);
    } else if (type === 'phone') {
      let num = val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
      const mobile = val ? parseInt(CommonFunctions.normalizeSpaces(num)) : '';
      setPhoneNumber(mobile.toString());
      setPhoneNumberError(CommonFunctions.validatePhone(mobile).msg);
    } else if (type === 'password') {
      const password = CommonFunctions.normalizeSpaces(val);
      setPasswordError(CommonFunctions.validatePassword(val).msg);
      setPassword(password);
    } else if (type === 'confirmpassword') {
      const confirmPassword = CommonFunctions.normalizeSpaces(val);
      setconfirmPasswordError(CommonFunctions.validatePassword(val).msg);
      setconfirmPassword(confirmPassword);
    } else if (type === 'email') {
      setEmail(CommonFunctions.normalizeEmail(val));
      setEmailError(CommonFunctions.validateEmail(val).msg);
    } else if (type === 'lastName') {
      const lastName = CommonFunctions.normalizeName(val);
      setLastName(lastName);
      setLastNameError(CommonFunctions.validateLastName(lastName).msg);
      console.log(lastName);
      console.log(CommonFunctions.validateLastName(lastName).msg);
    }
  };

  const onSubmitTesting = () => {
    navigation.navigate(constants.Screens.Terms, {
      phoneNo: phoneNumber,
    });
  };

  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={onBackPress} style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.back} />
        <Text style={styles.headerTextStyle}>{'Sign Up'}</Text>
      </TouchableOpacity>
    );
  };

  let disabled =
    phoneNumber.length == 0 ||
    userName.length == 0 ||
    lastName.length == 0 ||
    email.length === 0 ||
    password.length === 0 ||
    confirmPassword.length === 0;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.innerContainner}>
        <Header renderLeftButton={renderLeftButton} />
        <ImageBackground
          resizeMode="stretch"
          source={constants.Images.loginBack}
          style={styles.back}>
          <View>
            <View>
              <Image
                resizeMode="contain"
                style={[styles.appLogo]}
                source={constants.Images.AppLogo}
              />
            </View>
            <Text style={[styles.signin]}>{'Sign Up'}</Text>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{alignItems: 'center'}}
              style={{
                height: vh(350),
                width: '80%',
                marginHorizontal: '10%',
              }}>
              <CustomTextInput
                ref={ref => (inputRefs.current[0] = ref)}
                value={userName}
                autoCapitalize="sentences"
                container={inputStyles}
                placeholder={'First Name'}
                labelStyle={{color: 'white', fontWeight: '600'}}
                label={'Enter First Name'}
                fieldName="firstName"
                keyboardType="default"
                icon={constants.Images.User}
                onChangeText={(type: string, val: string) =>
                  handleChange(type, val)
                }
                onSubmitEditing={() => inputRefs.current[1].focus()}
                isError
                iconStyle={styles.iconStyle}
              />
              <CustomTextInput
                ref={ref => (inputRefs.current[1] = ref)}
                value={lastName}
                container={inputStyles}
                placeholder={'Last Name'}
                label={'Enter Last Name'}
                fieldName="lastName"
                keyboardType="default"
                onChangeText={(type: string, val: string) =>
                  handleChange(type, val)
                }
                labelStyle={{color: 'white', fontWeight: '600'}}
                isError
                onSubmitEditing={() => inputRefs.current[2].focus()}
                returnKeyType="done"
                icon={constants.Images.User}
                iconStyle={styles.iconStyle}
              />
              <CustomTextInput
                ref={ref => (inputRefs.current[2] = ref)}
                value={phoneNumber}
                autoCapitalize="sentences"
                container={inputStyles}
                placeholder={'Mobile Number'}
                labelStyle={{color: 'white', fontWeight: '600'}}
                label={'Enter Mobile Number'}
                fieldName="phone"
                maxLength={10}
                keyboardType="numeric"
                icon={constants.Images.mobile_icon}
                onChangeText={(type: string, val: string) =>
                  handleChange(type, val)
                }
                onSubmitEditing={() => inputRefs.current[3].focus()}
                isError
                iconStyle={styles.iconStyle}
              />
              <CustomTextInput
                ref={ref => (inputRefs.current[3] = ref)}
                value={email}
                labelStyle={{color: 'white', fontWeight: '600'}}
                container={inputStyles}
                placeholder={'Email'}
                keyboardType="default"
                onSubmitEditing={() => inputRefs.current[5].focus()}
                label={'Email'}
                icon={constants.Images.mobile_icon}
                keyboardType="email-address"
                iconStyle={styles.iconStyle}
                fieldName="email"
                onChangeText={(type: string, val: string) =>
                  handleChange(type, val)
                }
                isError
                onSubmitEditing={() => inputRefs.current[4].focus()}
              />
              <CustomTextInput
                ref={ref => (inputRefs.current[4] = ref)}
                value={password}
                container={inputStyles}
                placeholder={'Password'}
                label={'Enter Your Password'}
                fieldName="password"
                keyboardType="default"
                onChangeText={(type: string, val: string) =>
                  handleChange(type, val)
                }
                labelStyle={{color: 'white', fontWeight: '600'}}
                isError
                onSubmitEditing={() => inputRefs.current[5].focus()}
                secureTextEntry
                returnKeyType="done"
                icon={constants.Images.lock}
                iconStyle={styles.iconStyle}
              />
              <CustomTextInput
                ref={ref => (inputRefs.current[5] = ref)}
                value={confirmPassword}
                container={inputStyles}
                placeholder={'Confirm Password'}
                label={'Re Enter  Password'}
                keyboardType="default"
                fieldName="confirmpassword"
                onChangeText={(type: string, val: string) =>
                  handleChange(type, val)
                }
                labelStyle={{color: 'white', fontWeight: '600'}}
                isError
                secureTextEntry
                returnKeyType="done"
                icon={constants.Images.lock}
                iconStyle={styles.iconStyle}
              />
            </KeyboardAwareScrollView>
          </View>
          <CustomButton
            isDisabled={disabled}
            buttonText={'Sign Up'}
            handleAction={DemoMove}
            // handleAction={onSubmitTesting}
            customStyle={[
              styles.saveButtonContainer,
              {backgroundColor: disabled ? 'grey' : '#6a9589'},
            ]}
          />
        </ImageBackground>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            fontSize: vw(12),
            fontWeight: '400',
            alignSelf: 'center',
            position: 'absolute',
            bottom: vh(20),
            color: 'black',
          }}>
          {'Already Have Account '}
          <Text
            style={{
              textDecorationLine: 'underline',
              fontSize: vw(12),
              fontWeight: '700',
            }}>
            {' Sign In Now'}
          </Text>
        </Text>
      </View>

      {loder && <Loder />}
      <Modal
        isVisible={isErrorModel}
        onBackDropPress={() => {
          setIsErrorModel(false);
        }}
        {...{renderView}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fa8116e',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    width: '100%',
    height: vh(650),
  },
  innerContainner: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  appLogo: {
    height: vw(160),
    width: vw(160),
    alignSelf: 'center',
  },
  alignLeft40: {
    marginHorizontal: vw(50),
  },
  signin: {
    color: 'white',
    fontWeight: '800',
    // marginTop: vh(180),
    marginHorizontal: '13%',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  forgetPasword: {
    alignSelf: 'flex-end',
  },
  saveButtonContainer: {
    bottom: vh(15),
    width: vw(250),
    alignSelf: 'center',
    borderRadius: vw(30),
    position: 'absolute',
    backgroundColor: '#6a9589',
    paddingVertical: vh(10),
  },
  modalButton: {
    width: vw(100),
    alignSelf: 'center',
    borderRadius: vw(30),
    backgroundColor: '#6a9589',
    paddingVertical: vh(13),
    marginTop: vh(20),
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
    fontSize: constants.vw(18),
    alignSelf: 'center',
    fontWeight: '700',
  },
  text: {
    fontSize: constants.vw(14),
    alignSelf: 'center',
    fontWeight: '400',
    marginTop: vh(5),
    color: 'black',
  },
  seperator: {
    width: '90%',
    backgroundColor: 'grey',
    height: 1,
    alignSelf: 'center',
    marginVertical: constants.vh(5),
    opacity: 0.3,
  },
});

export default Login;
