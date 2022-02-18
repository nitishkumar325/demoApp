import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import {vw, vh} from '../../../constants/Dimension';
import Header from '../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import constants from '../../../constants';
import CustomTextInput from '../../../component/CustomTextInput';
import CustomButton from '../../../component/CustomButton';
import Modal from 'react-native-modal';
import Utils from '../../../Utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  createCircle,
  getServices,
  getTheme,
  upload,
} from '../../../modules/Auth';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ImagePicker from '../../../Utils/ImagePickerFn';
import Loader from '../../../component/Loader/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Screen} from 'react-native-screens';

// import {PermissionsAndroid} from 'react-native';
// import Contacts from 'react-native-contacts';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRefs = React.useRef<Array<any>>([]);
  const [modal, setModal] = React.useState(!true);
  const [service, setServices] = React.useState([]);
  const [Theme, setTheme] = React.useState([]);
  const [selectedTheme, setSelectedTheme] = React.useState({});
  const [selectedService, setSelectedService] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [bio, setBio] = useState('');
  const [circle, setCircleName] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [CircleImage, setCircleImage] = React.useState('');
  const [contact, setSelectedContact] = React.useState<any>();

  const {phone, authId} = useSelector((state: {Auth: any}) => ({
    phone: state.Auth.phone,
    authId: state.Auth.authId,
  }));

  const BioRef: any = React.createRef();

  const onBackPress = () => {};
  const inputStyles = {
    width: vw(320),
    backgroundColor: 'white',
    borderRadius: vw(10),
  };

  useEffect(() => {
    dispatch(
      getServices(
        (res: any) => {
          setServices(res);
        },
        (error: any) => {
          console.log('error', error);
        },
      ),
    );

    dispatch(
      getTheme(
        (res: any) => {
          setTheme(res);
        },
        (error: any) => {
          console.log('error', error);
        },
      ),
    );
  }, []);

  const renderRightButton = () => {
    return (
      <TouchableOpacity style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.bell_icon} />
      </TouchableOpacity>
    );
  };
  const goBack = () => {
    navigation.goBack();
  };
  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={goBack} style={styles.backButtom}>
        <Image
          style={[styles.iconColor, {height: vw(17), width: vw(17)}]}
          source={constants.Images.back}
        />
        <Text style={styles.headerTextStyle}>{'Create Circle'}</Text>
      </TouchableOpacity>
    );
  };

  const handleChange = (type: string, val: any) => {
    //  if (type === 'circlename') {
    //    const name = CommonFunctions.normalizeName(val);
    //    setUserName(name);
    //    setFirstNameError(CommonFunctions.validateName(name).msg);
    //    console.log(name);
    //    console.log(CommonFunctions.validateName(name).msg);
    //  } else if (type === 'phone') {
    //    let num = val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
    //    const mobile = val ? parseInt(CommonFunctions.normalizeSpaces(num)) : '';
    //    setPhoneNumber(mobile.toString());
    //    setPhoneNumberError(CommonFunctions.validatePhone(mobile).msg);
    //  } else if (type === 'email') {
    //    setEmail(CommonFunctions.normalizeEmail(val));
    //    setEmailError(CommonFunctions.validateEmail(val).msg);
    //  } else if (type === 'lastName') {
    //    const lastName = CommonFunctions.normalizeName(val);
    //    setLastName(lastName);
    //    setLastNameError(CommonFunctions.validateLastName(lastName).msg);
    //    console.log(lastName);
    //    console.log(CommonFunctions.validateLastName(lastName).msg);
    //  }
  };

  const renderExtra = () => {
    return (
      <Image
        resizeMode="contain"
        style={styles.extraImage}
        source={constants.Images.arrow_down}
      />
    );
  };

  const renderExtraDate = () => {
    return (
      <Image
        resizeMode="contain"
        style={[styles.extraImage]}
        source={constants.Images.calender}
      />
    );
  };
  const onContactSelect = (item: any) => {
    setSelectedTheme(item);
    setModal(false);
  };

  const renderThemeView = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => onContactSelect(item)}
        style={styles.themeBody}>
        <Text style={{color: 'black'}}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderSelectionView = () => {
    return (
      <View style={styles.modalParent}>
        <View style={styles.width}>
          <Text style={styles.theme}>{'Select Theme'}</Text>
          <TouchableOpacity
            onPress={() => {
              setModal(false);
            }}>
            <Image source={constants.Images.cross} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Theme &&
            Theme.length > 0 &&
            Theme.map(item => renderThemeView(item))}
        </ScrollView>
      </View>
    );
  };

  const onDateSelect = () => {
    setOpen(true);
  };
  const onSelect = () => {
    setModal(true);
  };

  const checkItemExistOrNot = (id: any) => {
    return selectedService?.findIndex(item => item?.id === id);
  };

  const onItemPress = (item: any) => {
    if (selectedService && selectedService.length === 0) {
      // call in case of empty
      setSelectedService([...selectedService, item]);
    } else {
      let index = checkItemExistOrNot(item?.id);
      if (index >= 0) {
        // item exist in selected tab
        selectedService.splice(index, 1);
        setSelectedService([...selectedService]);
        console.log(selectedService);
      } else {
        setSelectedService([...selectedService, item]);
      }
    }
  };

  const renderService = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onItemPress(item);
        }}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            checkItemExistOrNot(item.id) >= 0
              ? constants.Images.fillCheckBox
              : constants.Images.emptyCheckBox
          }
        />
        <Text
          style={{
            fontSize: vw(14),
            marginVertical: vw(5),
            marginLeft: vw(10),
            color: 'black',
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const pickImageFromGallery = () => {
    setLoading(true);
    ImagePicker.getSinglePic(
      (path: any, mimeType: string, fileName: any, size: any) => {
        setLoading(false);
        console.log('path', path);
        setCircleImage(path);
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
              setCircleImage(response.data.image.url);
              setLoading(false);
              Utils.CommonFunctions.showSnackbar(
                response.data.message,
                'black',
              );
            },
            (Error: any) => {
              setLoading(false);
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

  const getContact = (selectedContact: any) => {
    setSelectedContact(selectedContact);
  };

  const returnDisble = () => {
    if (
      circle.length > 0 &&
      selectedTheme?.id !== '' &&
      selectedService.length > 0 &&
      date !== '' &&
      CircleImage !== '' &&
      contact?.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const checkPhonNo = (phoneArray: any) => {
    let phone = `${'+91'}${phoneArray[0].number}`;
    if (phone === phoneArray[0].number || phone === phoneArray[0].number) {
      return true;
    } else {
      return false;
    }
  };

  const getData = (contact: any) => {
    let member = contact.map((item: any) => {
      const {phoneNumbers} = item;
      if (checkPhonNo(phoneNumbers)) {
        return {
          phoneNumber: phone,
          status: 'ACCEPT',
          authId: new Date().getTime(),
          owner: true,
        };
      } else {
        return {
          phoneNumber: phoneNumbers[0].number,
          status: 'PENDING',
          authId: new Date().getTime(),
          owner: false,
        };
      }
    });
    return [
      ...member,
      {
        phoneNumber: phone,
        status: 'ACCEPT',
        authId: authId,
        owner: true,
      },
    ];
  };

  const getService = (item: any) => {
    let result =
      selectedService &&
      selectedService?.length > 0 &&
      selectedService?.map(item => {
        return {serviceId: item?.id, name: item?.name};
      });
    console.log('resilt', result);
    return result;
  };

  const apiCall = () => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   Utils.CommonFunctions.showSnackbar(
    //     'Circle Created successfully',
    //     'black',
    //   );
    //   navigation.goBack();
    // }, 3000);
    let data = {
      title: circle,
      description: bio,
      themeId: selectedTheme?.id,
      expiryDate: new Date(date).getTime(),
      circleImage: CircleImage,
      services: getService(selectedService),
      members: getData(contact),
    };
    console.log('data', data);
    dispatch(
      createCircle(
        data,
        (response: any) => {
          console.log('res', response);
          Utils.CommonFunctions.showSnackbar(response.message, 'black');
          navigation.goBack();
        },
        (Error: any) => {
          Utils.CommonFunctions.showSnackbar(Error.data.error, 'black');
        },
      ),
    );
  };

  console.log('circle', circle);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fbfbfb'}}>
      <Header renderLeftButton={renderLeftButton} />
      <KeyboardAwareScrollView>
        <View style={styles.innerContainner}>
          <CustomTextInput
            ref={ref => (inputRefs.current[0] = ref)}
            value={circle}
            autoCapitalize="sentences"
            container={inputStyles}
            placeholder={'Circle Name'}
            labelStyle={{fontWeight: '600', color: 'black'}}
            label={'Enter Circle Name'}
            fieldName="circlename"
            keyboardType="default"
            onChangeText={(type: string, val: string) => {
              const name = Utils.CommonFunctions.normalizeName(val);
              setCircleName(name);
            }}
            // onSubmitEditing={() => inputRefs.current[1].focus()}
            isError
          />
          <CustomTextInput
            ref={ref => (inputRefs.current[0] = ref)}
            value={selectedTheme?.title}
            autoCapitalize="sentences"
            container={inputStyles}
            placeholder={'Theme'}
            editable={true}
            onIconPress={onSelect}
            labelStyle={{fontWeight: '600', color: 'black'}}
            label={'Select theme'}
            fieldName="circlename"
            keyboardType="default"
            renderExtra={renderExtra}
            onChangeText={(type: string, val: string) =>
              handleChange(type, val)
            }
            // onSubmitEditing={() => inputRefs.current[1].focus()}
            isError
          />

          <Text
            style={{
              fontSize: vw(14),
              marginTop: vw(13),
              marginBottom: vw(8),
              fontWeight: 'bold',
              color: 'black',
            }}>
            {'Integration '}
          </Text>

          {service &&
            service.length > 0 &&
            service.map(item => renderService(item))}

          <CustomTextInput
            ref={ref => (inputRefs.current[0] = ref)}
            value={
              date === '' ? date : Utils.CommonFunctions.formattedDate(date)
            }
            autoCapitalize="sentences"
            container={inputStyles}
            placeholder={'Expiry Date'}
            editable={true}
            onIconPress={onDateSelect}
            labelStyle={{fontWeight: '600', color: 'black', marginTop: vh(30)}}
            label={'DD/MM/YYYY'}
            fieldName="circlename"
            keyboardType="default"
            renderExtra={renderExtraDate}
            onChangeText={(type: string, val: string) =>
              handleChange(type, val)
            }
            // onSubmitEditing={() => inputRefs.current[1].focus()}
            isError
          />

          <CustomTextInput
            ref={BioRef}
            value={bio}
            container={{
              width: '100%',
              marginTop: constants.Normalise(8),
              height: constants.Normalise(180),
              paddingTop: constants.Normalise(10),
              alignSelf: 'center',
              borderRadius: constants.vw(10),
              backgroundColor: 'white',
            }}
            style={{
              marginLeft: constants.vw(10),
              textAlignVertical: 'top',
            }}
            onChangeText={(f: any, val: string) => {
              console.log('cal', val);
              setBio(val);
              // dispatch(updateBIO(val));
            }}
            labelStyle={{
              fontSize: vw(14),
              marginTop: vw(13),
              marginBottom: vw(8),
              fontWeight: 'bold',
              color: 'black',
            }}
            keyboardType={'ascii-capable'}
            returnKeyType={'next'}
            placeholder={'Description'}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            otherTextInputProps={{multiline: true, maxLength: 200}}
            _handleFocus={() => BioRef.current.focus()}
            errorPresent={true}
            errorText={''}
            errorActive={false}
            multiline={true}
          />

          <Text
            style={{
              fontSize: vw(14),
              marginTop: vw(13),
              marginBottom: vw(8),
              fontWeight: 'bold',
              color: 'black',
            }}>
            {'Circle Image'}
          </Text>
          <TouchableOpacity
            style={styles.imagePlaceHolder}
            onPress={() => {
              pickImageFromGallery();
            }}>
            {CircleImage === '' ? (
              <Image
                source={constants.Images.ic_placeholder}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <TouchableOpacity style={styles.imageSet}>
                <TouchableOpacity
                  style={styles.dustbinContainer}
                  onPress={() => setCircleImage('')}>
                  <Image
                    source={constants.Images.delete}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Image
                  resizeMethod={'resize'}
                  source={{uri: CircleImage}}
                  style={{
                    height: vw(120),
                    width: vw(120),
                    overflow: 'hidden',
                    flex: 1,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {/* <Text style={styles.uploadFiles}>{i18n.t('size5MBMax')}</Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(constants.Screens.addMember, {
                getContact: getContact,
              })
            }
            style={styles.addMember}>
            <Text
              style={{
                fontSize: vw(14),
                fontWeight: 'bold',
                color: '#527570',
              }}>
              {contact && contact.length > 0
                ? `${contact.length}${' Member selected'}`
                : '+ Add Members'}
            </Text>
            <Text
              style={{
                fontSize: vw(14),
                fontWeight: 'bold',
                color: '#527570',
              }}>
              {'->'}
            </Text>
          </TouchableOpacity>

          <Modal
            coverScreen
            avoidKeyboard
            animationInTiming={600}
            animationOutTiming={300}
            animationOut="fadeOutDown"
            style={styles.modalContainer}
            isVisible={modal}>
            <>{renderSelectionView()}</>
          </Modal>

          <DatePicker
            modal
            open={open}
            date={date ? new Date(date) : new Date()}
            mode="date"
            onConfirm={dateConfirm => {
              console.log('con', dateConfirm);
              setOpen(false);
              setDate(dateConfirm);
            }}
            minimumDate={new Date()}
            //   minimumDate={moment(new Date())}
            onCancel={() => {
              setOpen(false);
              // onChangeText('date', value.date);
            }}
          />

          <CustomButton
            buttonText={'Submit'}
            // handleAction={onPressSave}
            isDisabled={returnDisble()}
            handleAction={() => {
              console.log('action');
              apiCall();
            }}
            textStyle={styles.textStyle}
            customStyle={[
              styles.saveButtonContainer,
              {backgroundColor: constants.Colors.appButtonColor},
            ]}
          />
        </View>
      </KeyboardAwareScrollView>
      {loading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    marginTop: vh(20),
    alignSelf: 'center',
    backgroundColor: '#fbfbfb',
    marginBottom: vh(30),
  },
  dustbinContainer: {
    position: 'absolute',
    zIndex: 100,
    top: -4,
    end: -4,
  },
  imageSet: {
    marginTop: vh(5),
    height: vh(120),
    width: vh(120),
    borderRadius: vw(4),
    marginRight: vw(10),
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
  iconStyle: {
    alignSelf: 'center',
  },
  activeCiclr: {
    alignSelf: 'center',
    marginTop: vh(300),
    fontSize: vw(25),
    color: constants.Colors.appButtonColor,
    fontWeight: '600',
  },
  saveButtonContainer: {
    width: vw(320),
    alignSelf: 'center',
    borderRadius: vw(30),
    backgroundColor: '#6a9589',
    paddingVertical: vh(14),
    marginTop: vh(30),
  },
  textStyle: {
    fontWeight: '600',
    fontSize: vw(14),
    color: 'black',
  },
  active: {
    fontSize: vw(16),
    color: 'black',
    fontWeight: '500',
    marginBottom: vh(13),
    marginTop: vh(20),
  },
  containeer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: vh(13),
    paddingHorizontal: vw(8),
    borderRadius: vw(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginVertical: vh(5),
  },
  imageStyle: {
    height: vw(38),
    width: vw(38),
  },
  imageRow: {
    height: vw(20),
    width: vw(20),
  },
  caleder: {
    height: vw(10),
    width: vw(10),
  },
  buy: {
    fontSize: vw(16),
    fontWeight: '600',
    color: 'black',
  },
  count: {
    color: 'black',
    fontSize: vw(16),
    fontWeight: '900',
  },
  extraImage: {
    alignSelf: 'center',
    height: vw(16),
    width: vw(16),
    tintColor: '#527570',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    width: '100%',
    margin: 0,
  },
  modalParent: {
    backgroundColor: 'white',
    height: '60%',
    borderTopLeftRadius: vw(30),
    borderTopRightRadius: vw(30),
  },
  themeBody: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: vh(10),
  },
  header_button_row: {
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: constants.vw(3),
    paddingBottom: constants.Normalise(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: constants.vw(18),
    marginTop: constants.Normalise(10),
  },
  btnCloseContainer: {
    width: constants.vw(50),
    height: constants.Normalise(50),
    borderRadius: 25,
    backgroundColor: 'gray',
    marginTop: constants.Normalise(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossImage: {
    width: constants.vw(35),
    height: constants.Normalise(35),
    tintColor: constants.Colors.themeGreen,
  },
  width: {
    width: '70%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(20),
    paddingHorizontal: vw(10),
  },
  theme: {
    fontSize: vw(16),
    color: 'black',
  },
  imagePlaceHolder: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vh(5),
    height: vh(120),
    width: vh(120),
    borderRadius: vw(4),
    marginBottom: vh(40),
    marginRight: vw(10),
  },
  uploadFiles: {
    fontSize: vw(10),
    color: 'black',
  },
  image: {
    height: vh(120),
    width: vh(120),
  },
  addMember: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: vw(15),
    paddingHorizontal: vw(10),
    borderRadius: vw(10),
  },
});

export default Home;
