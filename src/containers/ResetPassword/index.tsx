import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../../component/CustomTextInput';
import constants from '../../constants';
import {vw, vh} from '../../constants/Dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword, resetPassword} from '../../modules/Auth';
import CommonFunction from '../../Utils/CommonFunction';

interface Props {
  props: any;
  route: any;
}

const ResetPassword = (props: Props) => {
  const navigation = useNavigation();
  // const {email = ' '} = props?.route?.params;
  const email="d"
  const dispatch = useDispatch();
  const [ErrorMsg, setErrorMsg] = useState('');
  const [Error, setError] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');

  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const inputRefs = React.useRef<Array<any>>([]);
  const inputStyles = {
    width: vw(280),
    marginBottom: vh(10),
    backgroundColor: 'white',
    borderRadius: vw(10),
  };

  const onPressSave = () => {
    //navigation.pop(2);
    // dispatch(
    //   resetPassword(
    //     {
    //       email: email,
    //       password: newPassword,
    //       confirmationcode: code,
    //     },
    //     () => {
    //       navigation.pop(2);
    //     },
    //     () => {
    //       console.log('error callback');
    //     },
    //   ),
    // );
  };

  const onBackPress = () => {
    navigation.goBack();
  };
  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={onBackPress} style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.back} />
        <Text style={styles.headerTextStyle}>{'Reset Password'}</Text>
      </TouchableOpacity>
    );
  };

  const changePassword = () => {
    // dispatch(
    //   resetPassword(
    //     {
    //       email: email,
    //       password: newPassword,
    //       confirmationcode: code,
    //     },
    //     () => {
    //       navigation.pop(2);
    //     },
    //     () => {
    //       console.log('error callback');
    //     },
    //   ),
    // );
  };

  const returnDisableState = () => {
    if (newPassword.length > 0 && confirmPassword.length > 0) return false;
    else return true;
  };

  const validatePasswords = () => {
    const isValidNew = CommonFunction.validatePassword(newPassword);
    const isValidConfirm = CommonFunction.validatePassword(confirmPassword);
    if (!isValidNew.status) {
      setErrorMsg(
        'New Password must contain minimum 8 characters, one uppercase, lowercase, number and a special character.',
      );
      setError(true);
    } else if (!isValidConfirm.status) {
      setErrorMsg(
        'Confirm Password must contain minimum 8 characters, one uppercase, lowercase, number and a special character.',
      );
      setError(true);
    } else if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirm password do not match.');
      setError(true);
    } else {
      setError(false);
      changePassword();
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header renderLeftButton={renderLeftButton} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        scrollEnabled={true}
        style={{marginBottom: constants.Normalise(30)}}>
        <View style={styles.innerContainner}>
          <ImageBackground
            resizeMode="stretch"
            resizeMethod="resize"
            source={constants.Images.loginBack}
            style={styles.back}>
            <View>
              <Image
                resizeMode="contain"
                style={styles.appLogo}
                source={constants.Images.AppLogo}
              />
            </View>
            <View style={styles.alignLeft40}>
              <Text style={styles.signin}>{'Reset Password'}</Text>
              <CustomTextInput
                ref={ref => (inputRefs.current[1] = ref)}
                container={inputStyles}
                placeholder={'New Password'}
                label={'Enter New Password'}
                fieldName="newPassword"
                onChangeText={
                  (type: string, val: string) => {
                    setNewPassword(CommonFunction.normalizeSpaces(val));
                  }
                  //setConfirmPassword(utils.removeSpaces(val))
                }
                labelStyle={{color: 'white', fontWeight: '600'}}
                isError
                keyboardType="default"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={() => inputRefs.current[2].focus()}
                icon={constants.Images.lock}
                iconStyle={styles.iconStyle}
              />
              <CustomTextInput
                ref={ref => (inputRefs.current[2] = ref)}
                container={inputStyles}
                placeholder={'Confirm New Password'}
                label={'Confirm New Password'}
                fieldName="confirmNewPassword"
                onChangeText={
                  (type: string, val: string) => {
                    setConfirmPassword(CommonFunction.normalizeSpaces(val));
                  }
                  //setConfirmPassword(utils.removeSpaces(val))
                }
                labelStyle={{color: 'white', fontWeight: '600'}}
                isError
                keyboardType="default"
                onSubmitEditing={() => inputRefs.current[3].focus()}
                secureTextEntry
                returnKeyType="done"
                icon={constants.Images.lock}
                iconStyle={styles.iconStyle}
              />
              <CustomTextInput
                ref={ref => (inputRefs.current[3] = ref)}
                container={inputStyles}
                placeholder={'Code'}
                label={'Code'}
                fieldName="confirmNewPassword"
                onChangeText={
                  (type: string, val: string) => {
                    setCode(val);
                  }
                  //setConfirmPassword(utils.removeSpaces(val))
                }
                labelStyle={{color: 'white', fontWeight: '600'}}
                keyboardType="default"
                returnKeyType="done"
                icon={constants.Images.mobile_icon}
                iconStyle={styles.iconStyle}
              />
            </View>
            <CustomButton
              isDisabled={returnDisableState()}
              buttonText={'Reset Password'}
              handleAction={validatePasswords}
              customStyle={[
                styles.saveButtonContainer,
                {backgroundColor: returnDisableState() ? 'grey' : '#6a9589'},
              ]}
            />
          </ImageBackground>

          {Error && (
            <View style={styles.error}>
              <Image
                source={constants.Images.errorIcon}
                style={styles.errImage}
              />
              <Text style={styles.errorMessage}>{ErrorMsg}</Text>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
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
    height: vw(500),
    width: '100%',
  },
  innerContainner: {
    flex: 1,
    marginTop: vh(10),
  },
  appLogo: {
    height: vw(140),
    width: vw(160),
    alignSelf: 'center',
  },
  alignLeft40: {
    marginHorizontal: vw(50),
  },
  signin: {
    color: 'white',
    fontWeight: '800',
    fontSize: vw(22),
  },
  iconStyle: {
    alignSelf: 'center',
  },
  forgetPasword: {
    alignSelf: 'flex-end',
    marginTop: vh(10),
  },
  saveButtonContainer: {
    bottom: vh(8),
    width: vw(250),
    alignSelf: 'center',
    borderRadius: vw(30),
    position: 'absolute',
    backgroundColor: '#6a9589',
    paddingVertical: vh(10),
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
  error: {
    marginTop: vw(10),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  errImage: {
    height: vw(17.6),
    width: vw(18.6),
    tintColor: constants.Colors.red,
  },
  errorMessage: {
    color: constants.Colors.red,
    marginLeft: vw(10),
    fontSize: vw(14),
    width: vw(260),
  },
});

export default ResetPassword;
