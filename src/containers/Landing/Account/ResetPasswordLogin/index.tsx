import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {vw, vh, normalize} from '../../../../constants/Dimension';
import Header from '../../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import constants from '../../../../constants';
import CustomButton from '../../../../component/CustomButton';
import ImagePicker from '../../../../Utils/ImagePickerFn';
import Loader from '../../../../component/Loader/Loader';
import CustomTextInput from '../../../../component/CustomTextInput';
import CommonFunctions from '../../../../Utils/CommonFunction';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import showSnackbar from '../../../../Utils/snackbar';

interface Props {
  props: any;
  route: any;
}

const ResetPasswordLogin = (props: Props) => {
  const navigation = useNavigation();
  const inputRefs = React.useRef<Array<any>>([]);
  const actionSheet: any = React.useRef();
  const [loading, setLoading] = React.useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [oldPassword, setOldPassword] = useState('');

  const [ErrorMsg, setErrorMsg] = useState('');
  const [Error, setError] = useState(false);

  const inputStyles = {
    width: vw(337),
    marginBottom: vh(10),
    backgroundColor: 'white',
    borderRadius: vw(10),
  };
  const onBackPress = () => {
    navigation.goBack();
  };

  const handleOpenImagePicker = () => {
    actionSheet.current.show();
  };

  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={onBackPress} style={styles.backButtom}>
        <Image
          style={[styles.iconColor, {height: vw(17), width: vw(17)}]}
          source={constants.Images.back}
        />
        <Text style={styles.headerTextStyle}>{'Reset Password'}</Text>
      </TouchableOpacity>
    );
  };

  const changePassword = () => {};

  const validatePasswords = () => {
    const isValidOld = CommonFunctions.validatePassword(oldPassword);
    const isValidNew = CommonFunctions.validatePassword(newPassword);
    const isValidConfirm = CommonFunctions.validatePassword(confirmPassword);
    if (!isValidOld.status) {
      setErrorMsg(
        'Old Password must contain minimum 8 characters, one uppercase, lowercase, number and a special character.',
      );
      setError(true);
    } else if (!isValidNew.status) {
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

  const returnDisableState = () => {
    if (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0
    )
      return false;
    else return true;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header renderLeftButton={renderLeftButton} />
      <KeyboardAwareScrollView>
        <View style={styles.innerContainner}>
          <CustomTextInput
            ref={ref => (inputRefs.current[0] = ref)}
            value={oldPassword}
            autoCapitalize="sentences"
            container={inputStyles}
            placeholder={'Old Password'}
            labelStyle={{fontWeight: '600', color: 'black'}}
            label={'Old Password'}
            fieldName="currentPassword"
            keyboardType="email-address"
            onChangeText={(type: string, val: string) =>
              setOldPassword(CommonFunctions.normalizeSpaces(val))
            }
            onSubmitEditing={() => inputRefs.current[1].focus()}
            isError
          />
          <CustomTextInput
            ref={ref => (inputRefs.current[1] = ref)}
            value={newPassword}
            labelStyle={{color: 'black', fontWeight: '600'}}
            container={inputStyles}
            placeholder={'New Password'}
            keyboardType="default"
            onSubmitEditing={() => inputRefs.current[5].focus()}
            label={'New Password'}
            keyboardType="email-address"
            fieldName="createNewPassword"
            onChangeText={(type: string, val: string) =>
              setNewPassword(CommonFunctions.normalizeSpaces(val))
            }
            isError
            onSubmitEditing={() => inputRefs.current[3].focus()}
          />
          <CustomTextInput
            ref={ref => (inputRefs.current[2] = ref)}
            value={confirmPassword}
            autoCapitalize="sentences"
            container={inputStyles}
            placeholder={'Confirm New Password'}
            labelStyle={{color: 'black', fontWeight: '600'}}
            label={'Confirm New Password'}
            fieldName="confirmNewPassword"
            keyboardType="email-address"
            onChangeText={(type: string, val: string) =>
              setConfirmPassword(CommonFunctions.normalizeSpaces(val))
            }
            isError
          />
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
      <CustomButton
        isDisabled={returnDisableState()}
        buttonText={'Done'}
        handleAction={validatePasswords}
        // handleAction={onSubmitTesting}
        customStyle={[
          styles.saveButtonContainer,
          {backgroundColor: returnDisableState() ? 'grey' : '#6a9589'},
        ]}
      />

      {loading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    paddingHorizontal: vw(16),
    marginTop: vh(20),
  },
  backButtom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconColor: {
    tintColor: 'white',
    height: vw(25),
    width: vw(25),
  },
  headerTextStyle: {
    fontSize: vw(18),
    color: 'white',
    fontWeight: '700',
    marginLeft: vw(10),
  },
  activeCiclr: {
    marginTop: vh(300),
    fontSize: vw(25),
    color: constants.Colors.appButtonColor,
    fontWeight: '600',
  },
  profilePicture: {
    marginTop: vh(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: vw(72),
    width: vw(72),
    borderRadius: vw(72 / 2),
  },
  removeStyle: {
    fontSize: vw(14),
    color: constants.Colors.appButtonColor,
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginLeft: vw(10),
  },
  OrUploadNew: {
    fontSize: vw(14),
    fontWeight: '400',
    marginTop: vh(33),
  },
  dottedView: {
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: constants.Colors.appButtonColor,
    borderRadius: vw(10),
    paddingVertical: vw(22),
    alignItems: 'center',
    marginTop: vh(50),
  },
  roundWhite: {
    height: vw(64),
    width: vw(64),
    borderRadius: vw(32),
    marginHorizontal: vw(132),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  uploadPhoto: {
    fontSize: vw(14),
    color: constants.Colors.appButtonColor,
    marginTop: vh(10),
  },
  cameraStyle: {
    height: vw(20),
    width: vw(20),
    resizeMode: 'contain',
    tintColor: constants.Colors.appButtonColor,
  },
  saveButtonContainer: {
    bottom: vh(15),
    width: vw(335),
    alignSelf: 'center',
    borderRadius: vw(30),
    position: 'absolute',
    backgroundColor: '#6a9589',
    paddingVertical: vh(10),
  },
  iconStyle: {
    alignSelf: 'center',
  },
  error: {
    marginTop: normalize(10),
    flexDirection: 'row',
    alignSelf: 'center',
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
});

export default ResetPasswordLogin;
