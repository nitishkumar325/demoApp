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
import {useDispatch, useSelector} from 'react-redux';
import Utils from '../../../../Utils';
import {
  upload,
  updateValues,
  editDetail,
  setLoginInfo,
} from '../../../../modules/Auth';

const EditProfile = () => {
  const dispatch = useDispatch();

  const {avatar, name, email, phone, authId, id} = useSelector(
    (state: {Auth: any}) => ({
      avatar: state.Auth.avatar,
      name: state.Auth.name,
      email: state.Auth.email,
      phone: state.Auth.phone,
      authId: state.Auth.authId,
      id: state.Auth.id,
    }),
  );

  const navigation = useNavigation();
  const inputRefs = React.useRef<Array<any>>([]);
  const actionSheet: any = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [profileImg, setProfileImg] = React.useState(avatar);

  const [userName, setUserName] = React.useState(name.split(' ')[0]);
  const [firstNameError, setFirstNameError] = React.useState<string>('');

  const [lastName, setLastName] = useState<string>(name.split(' ')[1]);
  const [lastNameError, setLastNameError] = useState<string>('');

  const [useremail, setuserEmail] = useState<string>(email);
  const [emailError, setEmailError] = useState<string>('');

  const [phoneNumber, setPhoneNumber] = useState<string>(phone);
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');

  const [ErrorMsg, setErrorMsg] = useState('');
  const [Error, setError] = useState(false);
  const [localLoader, setLocalLoader] = React.useState(false);

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
        <Text style={styles.headerTextStyle}>{'Edit Profile'}</Text>
      </TouchableOpacity>
    );
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
    } else if (type === 'email') {
      setuserEmail(CommonFunctions.normalizeEmail(val));
      setEmailError(CommonFunctions.validateEmail(val).msg);
    } else if (type === 'lastName') {
      const lastName = CommonFunctions.normalizeName(val);
      setLastName(lastName);
      setLastNameError(CommonFunctions.validateLastName(lastName).msg);
      console.log(lastName);
      console.log(CommonFunctions.validateLastName(lastName).msg);
    }
  };

  const ApiCall = () => {
    let data = {
      authId,
      id,
      name: `${userName}${' '}${lastName}`,
      username: `${userName}${' '}${lastName}${'_'}`,
      avatar: profileImg,
    };
    setLoading(true);
    dispatch(
      editDetail(
        data,
        (response: any) => {
          setLoading(false);
          Utils.CommonFunctions.showSnackbar(response.message, 'black');
          dispatch(setLoginInfo(data)); // locally update info
          navigation.goBack();
        },
        (error: any) => {
          setLoading(false);
          console.log('error', error);
        },
      ),
    );
    // setTimeout(() => {
    //   setLoading(false);
    //   Utils.CommonFunctions.showSnackbar('something went wrong', 'black');
    // }, 3000);
  };

  const onDonePress = () => {
    if (!emailError && !firstNameError && !lastNameError && !phoneNumberError) {
      ApiCall();
    } else {
      setError(true);
      if (emailError) {
        setErrorMsg('Incorrect email, please retry');
      } else if (firstNameError) {
        setErrorMsg('Name should be min of 3 characters.');
      } else if (phoneNumberError) {
        setErrorMsg('Phone number must contain 10 digits');
      } else if (lastNameError) {
        setErrorMsg('Last Name should be min of 3 characters.');
      }
    }
  };

  const pickCamera = async () => {
    setLoading(true);
    ImagePicker.getCamera(
      (path: any, mimeType: string, fileName: any) => {
        setLoading(false);
        console.log('path', path);
        setProfileImg(path);
        const data = new FormData();
        data.append('file', {
          uri: path,
          name: fileName,
          type: mimeType,
        });
        dispatch(
          upload(
            data,
            (response: any) => {
              setProfileImg(response.data.image.url);
              dispatch(updateValues('avatar', response.data.image.url));
              setLocalLoader(false);
              Utils.CommonFunctions.showSnackbar(
                response.data.message,
                'black',
              );
            },
            (Error: any) => {
              setLocalLoader(false);
              console.log('error', Error);
              Utils.CommonFunctions.showSnackbar(Error.data.error, 'black');
            },
          ),
        );
      },
      (err: any) => {
        console.log('====erri', err);
        setLoading(false);
      },
    );
  };

  const pickImage = () => {
    setLoading(true);
    ImagePicker.getSinglePic(
      (path: any, mimeType: string, fileName: any, size: any) => {
        setLoading(false);
        console.log('path', path);
        setProfileImg(path);
        const data = new FormData();
        data.append('file', {
          uri: path,
          name: fileName,
          type: mimeType,
        });
        dispatch(
          upload(
            data,
            (response: any) => {
              setProfileImg(response.data.image.url);
              dispatch(updateValues('avatar', response.data.image.url));
              setLocalLoader(false);
              Utils.CommonFunctions.showSnackbar(
                response.data.message,
                'black',
              );
            },
            (Error: any) => {
              setLocalLoader(false);
              console.log('error', Error);
              Utils.CommonFunctions.showSnackbar(Error.data.error, 'black');
            },
          ),
        );
      },
      () => {
        setLoading(false);
      },
    );
  };

  const onImagePress = () => {
    handleOpenImagePicker();
  };

  const onClickAction = () => {
    if (profileImg) {
      setProfileImg('');
      dispatch(updateValues('avatar', ''));
    } else {
      handleOpenImagePicker();
    }
  };

  let disabled =
    phoneNumber.length == 0 ||
    userName.length == 0 ||
    lastName.length == 0 ||
    email.length === 0;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header renderLeftButton={renderLeftButton} />
      <KeyboardAwareScrollView>
        <View style={styles.innerContainner}>
          <View style={styles.profilePicture}>
            {!profileImg ? (
              <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={constants.Images.ic_placeholder}
                />
              </TouchableOpacity>
            ) : (
              <Image style={[styles.image]} source={{uri: profileImg}} />
            )}
            <Text onPress={onClickAction} style={styles.removeStyle}>
              {profileImg ? 'Remove' : 'Change Photo'}
            </Text>
          </View>
          <CustomTextInput
            ref={ref => (inputRefs.current[0] = ref)}
            value={userName}
            autoCapitalize="sentences"
            container={inputStyles}
            starStatus
            placeholder={'First Name'}
            labelStyle={{fontWeight: '600', color: 'black'}}
            label={'Enter First Name'}
            fieldName="firstName"
            keyboardType="default"
            onChangeText={(type: string, val: string) =>
              handleChange(type, val)
            }
            onSubmitEditing={() => inputRefs.current[1].focus()}
            isError
          />
          <CustomTextInput
            ref={ref => (inputRefs.current[1] = ref)}
            value={lastName}
            container={inputStyles}
            placeholder={'Last Name'}
            label={'Enter Last Name'}
            fieldName="lastName"
            starStatus
            keyboardType="default"
            onChangeText={(type: string, val: string) =>
              handleChange(type, val)
            }
            labelStyle={{color: 'black', fontWeight: '600'}}
            isError
            onSubmitEditing={() => inputRefs.current[2].focus()}
            returnKeyType="done"
          />

          <CustomTextInput
            ref={ref => (inputRefs.current[2] = ref)}
            value={useremail}
            starStatus
            labelStyle={{color: 'black', fontWeight: '600'}}
            container={inputStyles}
            placeholder={'Email'}
            keyboardType="default"
            onSubmitEditing={() => inputRefs.current[5].focus()}
            label={'Email'}
            keyboardType="email-address"
            fieldName="email"
            editable={true}
            onChangeText={(type: string, val: string) =>
              handleChange(type, val)
            }
            isError
            onSubmitEditing={() => inputRefs.current[3].focus()}
          />
          <CustomTextInput
            ref={ref => (inputRefs.current[3] = ref)}
            value={phoneNumber}
            autoCapitalize="sentences"
            container={inputStyles}
            editable={true}
            placeholder={'Mobile Number'}
            labelStyle={{color: 'black', fontWeight: '600'}}
            label={'Enter Mobile Number'}
            fieldName="phone"
            maxLength={10}
            starStatus
            keyboardType="numeric"
            onChangeText={(type: string, val: string) =>
              handleChange(type, val)
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
        isDisabled={disabled}
        buttonText={'Done'}
        handleAction={onDonePress}
        // handleAction={onSubmitTesting}
        customStyle={[
          styles.saveButtonContainer,
          {backgroundColor: disabled ? 'grey' : '#6a9589'},
        ]}
      />

      <ActionSheet
        ref={actionSheet}
        title={'Upload Image From'}
        options={['Camera', 'Gallery', 'Cancel']}
        cancelButtonIndex={2}
        onPress={(index: number) => {
          if (index == 2) {
          } else {
            index === 0 ? pickCamera() : pickImage();
          }
        }}
      />
      {loading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    paddingHorizontal: vw(16),
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
    backgroundColor: 'grey',
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
  appGreenCircle: {
    height: vw(19),
    width: vw(19),
    backgroundColor: constants.Colors.appButtonColor,
    borderRadius: vw(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: vw(5),
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  pencilWhite: {
    tintColor: 'white',
    height: vw(8),
    width: vw(8),
  },
});

export default EditProfile;
