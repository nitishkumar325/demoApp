import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {vw, vh} from '../../../../constants/Dimension';
import Header from '../../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import constants from '../../../../constants';
import CustomButton from '../../../../component/CustomButton';
import ImagePicker from '../../../../Utils/ImagePickerFn';
import Loader from '../../../../component/Loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {
  upload,
  updateValues,
  editDetail,
  setLoginInfo,
} from '../../../../modules/Auth';
import Utils from '../../../../Utils';

const EditProfilePicture = () => {
  const {avatar, name, email, phone, authId, id, username} = useSelector(
    (state: {Auth: any}) => ({
      avatar: state.Auth.avatar,
      name: state.Auth.name,
      email: state.Auth.email,
      phone: state.Auth.phone,
      authId: state.Auth.authId,
      id: state.Auth.id,
      username: state.Auth.username,
    }),
  );
  const navigation = useNavigation();
  const actionSheet: any = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [profileImg, setProfileImg] = React.useState(avatar);
  const [localLoader, setLocalLoader] = React.useState(false);

  const dispatch = useDispatch();

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
        <Text style={styles.headerTextStyle}>{'Edit Profile Picture'}</Text>
      </TouchableOpacity>
    );
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

  const ApiCall = () => {
    let data = {
      authId,
      id,
      name: `${name}`,
      username: `${username}`,
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
    ApiCall();
  };

  const onRemovePress = () => {
    setProfileImg('');
    dispatch(updateValues('avatar', ''));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header renderLeftButton={renderLeftButton} />
      <View style={styles.innerContainner}>
        <View style={styles.profilePicture}>
          {avatar === null ? (
            <Image
              style={styles.image}
              source={constants.Images.ic_placeholder}
            />
          ) : (
            <Image style={styles.image} source={{uri: profileImg}} />
          )}
        </View>
        <Text onPress={onRemovePress} style={styles.removeStyle}>
          {'Remove'}
        </Text>
        <Text onPress={onRemovePress} style={styles.OrUploadNew}>
          {'Or Upload New'}
        </Text>
        <View style={styles.dottedView}>
          <TouchableOpacity onPress={onImagePress} style={styles.roundWhite}>
            <Image
              style={styles.cameraStyle}
              source={constants.Images.editAccountCamera}
            />
          </TouchableOpacity>
          <Text style={styles.uploadPhoto}>{'Upload Photo'}</Text>
        </View>
        <CustomButton
          isDisabled={false}
          buttonText={'Done'}
          handleAction={onDonePress}
          // handleAction={onSubmitTesting}
          customStyle={[
            styles.saveButtonContainer,
            {backgroundColor: false ? 'grey' : '#6a9589'},
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
      </View>
      {loading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    alignItems: 'center',
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
    alignSelf: 'center',
    marginTop: vh(300),
    fontSize: vw(25),
    color: constants.Colors.appButtonColor,
    fontWeight: '600',
  },
  profilePicture: {
    marginTop: vh(24),
  },
  image: {
    height: vw(92),
    width: vw(92),
    borderRadius: vw(92 / 2),
    backgroundColor: 'grey',
  },
  removeStyle: {
    fontSize: vw(14),
    color: constants.Colors.appButtonColor,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: vh(9),
  },
  OrUploadNew: {
    fontSize: vw(14),
    marginTop: vh(33),
    color: 'black',
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
});

export default EditProfilePicture;
