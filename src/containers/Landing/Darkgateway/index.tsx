import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {vw, vh} from '../../../constants/Dimension';
import Header from '../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import constants from '../../../constants';
import CustomTextInput from '../../../component/CustomTextInput';
import CustomButton from '../../../component/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getBatteryGateway, getCircle, setValue} from '../../../modules/Auth';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../component/Loader/Loader';
import images from '../../../constants/images';
import Modal from 'react-native-modal';
import {State, TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Screens from '../../../constants/Screens';
import TouchID from 'react-native-touch-id';
import CommonFunction from '../../../Utils/CommonFunction';

const DarkGateway = () => {
  const {id} = useSelector((state: {Auth: any}) => ({
    id: state.Auth.id,
  }));
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const [modal, setModal] = React.useState(false);
  const [batteryData, setBatteryData] = React.useState([]);
  const [isPinEnable, setIsPinEnable] = React.useState(false);
  const [bloder, setbloder] = React.useState(false);
  const navigation = useNavigation();
  const {active} = useSelector((state: any) => ({
    active: state.Auth.active,
  }));
  const [currentSelected, setCurrentSelected] = React.useState(active);

  const onBackPress = () => {};
  const inputStyles = {
    width: vw(340),
    backgroundColor: 'white',
    borderRadius: vw(10),
  };

  const data: any = [
    {
      batterName: '12V_LA',
      Batteryid: 'PSTI_BAT01',
      Batterytype: 'Lead Acid',
      Ratedvoltage: '12V',
      Capacity: '10Ah',
      ManufacturerName: 'Exide',
      ManufacturingDate: 'Jan 2022',
      batteryNumber: 0,
    },
    {
      batterName: '14.8_LI',
      Batteryid: 'PSTI_BAT02',
      Batterytype: 'Li-ion',
      Ratedvoltage: '12V',
      Capacity: '10Ah',
      ManufacturerName: 'Exide',
      ManufacturingDate: 'Jan 2022',
      batteryNumber: 1,
    },
    {
      batterName: '12V_LA',
      Batteryid: 'PSTI_BAT03',
      Batterytype: 'li-po',
      Ratedvoltage: '3.7',
      Capacity: '1800mah',
      ManufacturerName: 'Orange',
      ManufacturingDate: 'Oct 2021',
      batteryNumber: 2,
    },
    {
      batteryCurrent: '-0.63',
      batteryId: 'PSTI_BAT1',
      batteryName: 'Battery_1',
      batteryType: 'Battery_1',
      capacity: '12',
      chargePercentage: '69',
      gatewayId: 'PSTI_GW_001',
      health: '100',
      id: 423,
      life: '670',
      manufacturerDate: 'Jan 2020',
      manufacturerName: 'Ultralife',
      relatedVoltage: '12.8',
      voltage: '13.23',
    },
  ];

  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  const renderRightButton = () => {
    return (
      <TouchableOpacity style={styles.rightCont}>
        <View style={styles.circle}>
          <Text style={styles.pStyle}>{'P'}</Text>
        </View>
        <TouchableOpacity style={styles.LogoutCnt}>
          <Text style={styles.LogoutText}>{'Logout'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getGateway('PSTI_GW_001');
  }, []);

  const getGateway = (batteryId: any) => {
    setLoading(true)
    dispatch(
      getBatteryGateway(
        {
          gatewayId: batteryId,
        },
        (res: any) => {
          setLoading(false)
          console.log('res', res);
          setBatteryData(res);
        },
        (error: any) => {
          setLoading(false)
          console.log('error callback', error);
          CommonFunction.showSnackbar('Something Went Wrong', 'black');
        },
      ),
    );
  };

  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={onBackClick} style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.back} />
        <View style={styles.inrContainer}>
          <Text style={styles.headerTextStyle}>{'Jaya_001'}</Text>
          <View
            style={{
              backgroundColor: '#303345',
              borderRadius: vw(50),
              marginTop: vh(5),
              marginLeft: vw(15),
            }}>
            <Text
              style={[
                styles.buy,
                {textTransform: 'uppercase', fontStyle: 'normal'},
              ]}>
              {'Id: PSTI_GW_001'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // React.useEffect(() => {
  //   TouchID.isSupported(optionalConfigObject)
  //     .then(biometryType => {
  //       // Success code
  //       if (biometryType === 'FaceID') {
  //         console.log('FaceID is supported.');
  //       } else {
  //         console.log('TouchID is supported.');
  //         TouchID.authenticate('to demo this react-native component', optionalConfigObject)
  //           .then((success:any) => {
  //             // Success code
  //             console.log("success",success)
  //           })
  //           .catch((error:any) => {
  //             // Failure code
  //             console.log("error",error)

  //           });
  //       }
  //     })
  //     .catch(error => {
  //       // Failure code
  //       console.log(error);
  //     });
  // }, []);

  const onItemPress = (status: any, batteryNumber: any,batteryId:any) => {
    if (status) {
      navigation.navigate(Screens.BatteryDetail, {
        batteryNumber,
        batteryId
      });
    } else {
      setCurrentSelected(batteryNumber);
      setModal(true);
    }
  };

  const renderView = (item: any,index:any) => {
    const {
      batteryName,
      batteryId,
      batteryType,
      Ratedvoltage,
      Capacity,
      ManufacturerName,
      ManufacturingDate,
      complete,
      batteryNumber,
    } = item;
    return (
      <TouchableOpacity
        onPress={() => onItemPress(active === index, index,batteryId)}
        style={{
          backgroundColor: '#383C5D',
          borderRadius: vw(10),
          paddingHorizontal: vw(8),
          paddingVertical: vh(10),
          marginVertical: vh(7.5),
        }}>
        <View style={styles.containeer}>
          <View style={{borderRadius: vw(50)}}>
            <Text
              style={[styles.buy, {fontSize: vw(14)}]}>{`${'Battery '}${'00'}${
                index + 1
            }`}</Text>
          </View>
          <Image
            source={
              active === index ? images.GreenCircle : images.error
            }
          />
        </View>
        <View style={{marginTop: vh(10)}}>
          <View style={styles.alignRow}>
            <Text style={styles.address}>{'Battery ID'}</Text>
            <Text style={[styles.address, {marginLeft: vw(100)}]}>
              {'Battery Type'}
            </Text>
          </View>
          <View style={[styles.alignRow, {marginBottom: vh(10)}]}>
            <Text style={styles.address2}>{batteryId}</Text>
            <Text style={[styles.address2, {marginLeft: vw(95)}]}>
              {batteryType}
            </Text>
          </View>
        </View>
        {active !== batteryNumber && (
          <Image resizeMethod='resize'  style={styles.post} source={images.redBorderRight} />
        )}
      </TouchableOpacity>
    );
  };

  const usePin = () => {
    setIsPinEnable(true);
  };

  const onTouch = () => {
    setModal(false);
    setTimeout(() => {
      setbloder(true);
    }, 1000);
  };
  const onCross = () => {
    setModal(false);
  };
  const onContinue = () => {};

  const renderItem = () => {
    return (
      <View style={{height: '70%'}}>
        <View style={styles.con}>
          <Text style={styles.use}>{'Use Fingerprint to Proceed'}</Text>
          <Text
            style={[
              styles.use,
              {textAlign: 'center', fontWeight: '300', marginTop: vh(10)},
            ]}>
            {'Use Fingerprint/Pin to confirm\n the action.'}
          </Text>
          <Text onPress={usePin} style={styles.usePin}>
            {!isPinEnable ? 'Use Pin' : 'Enter Your Pin'}
          </Text>
          {isPinEnable && <TextInput style={styles.textIn} />}
          {isPinEnable && (
            <Text onPress={onContinue} style={styles.continue}>
              {'continue'}
            </Text>
          )}
          <TouchableOpacity onPress={onCross} style={styles.close}>
            <Image style={styles.img} source={images.close} />
          </TouchableOpacity>
        </View>
        {
          <TouchableOpacity onPress={onTouch} style={styles.finger}>
            <Image source={images.fingerprint} />
          </TouchableOpacity>
        }
      </View>
    );
  };

  const onComplete = () => {
    setbloder(false);
    dispatch(setValue('active', currentSelected));
  };

  const renderLoder = () => {
    return (
      <LinearGradient
        start={{x: 0.5, y: 0.5}}
        end={{x: 1, y: 1}}
        colors={['#25283D', '#383C5D']}
        style={{
          flex: 1,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          size={vw(250)}
          onComplete={onComplete}
          colors={['#f50729', '#db0f2c', '#d46c7a', '#C4C4C4']}
          colorsTime={[7, 5, 2, 0]}>
          {({remainingTime}) => (
            <Text style={styles.textp}>
              {'Please wait while we\n configure your\n battery '}
            </Text>
          )}
        </CountdownCircleTimer>
      </LinearGradient>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.Colors.themeGreen,
        width: '100%',
      }}>
      <Header renderLeftButton={renderLeftButton} />

      <View style={styles.innerContainner}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingTop: vh(10)}}>
            {batteryData.map((item,index) => renderView(item,index))}

            {/* {renderView(true,5)}
            {renderView(true,6)}
            {renderView(true,7)}
            {renderView(true,8)}
            {renderView(true,9)} */}
          </View>
        </ScrollView>
      </View>
      <Modal
        coverScreen
        avoidKeyboard
        backdropOpacity={0.8}
        animationInTiming={200}
        animationOutTiming={200}
        backdropColor="#12141E"
        animationOut="fadeOutDown"
        style={styles.modalContainer}
        isVisible={modal}>
        <>{renderItem()}</>
      </Modal>
      <Modal
        coverScreen
        avoidKeyboard
        backdropOpacity={0.8}
        animationInTiming={200}
        animationOutTiming={200}
        backdropColor="#12141E"
        animationOut="fadeOutDown"
        style={styles.modalContainer}
        isVisible={bloder}>
        <>{renderLoder()}</>
      </Modal>
      {loading&&<Loader/>}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    backgroundColor: constants.Colors.themeGreen,
    paddingHorizontal: vw(16),
    marginBottom: vh(20),
  },
  backButtom: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconColor: {
    height: vw(20),
    width: vw(20),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  helloSqr: {
    fontSize: vw(20),
    color: 'white',
    marginTop: vh(33),
  },
  inrContainer: {
    marginTop: vh(31),
    marginBottom: vh(16),
    marginLeft: vw(16),
  },
  circle: {
    height: vw(40),
    width: vw(40),
    borderRadius: vw(20),
    backgroundColor: '#4B517D',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  pStyle: {
    fontSize: vw(16),
    color: '#9EA3C5',
  },
  LogoutCnt: {
    width: vw(121),
    backgroundColor: '#4B517D',
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: vh(15),
    marginTop: vh(5),
    paddingLeft: vw(20),
  },
  rightCont: {
    marginTop: vh(25),
    marginBottom: vh(16),
  },
  LogoutText: {
    fontSize: vw(14),
    color: 'white',
  },
  containeer: {
    flexDirection: 'row',
    borderRadius: vw(10),
    marginVertical: vh(5),
    justifyContent: 'space-between',
    paddingRight: vw(10),
  },
  imageStyle: {
    height: vw(38),
    width: vw(38),
    borderRadius: vw(19),
  },
  imageRow: {
    height: vw(20),
    width: vw(20),
    borderRadius: vw(10),
  },
  caleder: {
    height: vw(15),
    width: vw(15),
  },
  buy: {
    fontSize: vw(12),
    color: '#DFE0EC',
    paddingHorizontal: vw(10),
    fontWeight: '500',
  },
  buyRight: {
    fontSize: vw(12),
    color: '#63B995',
    paddingHorizontal: vw(10),
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  count: {
    color: 'black',
    fontSize: vw(16),
    fontWeight: '900',
  },
  gatewayName: {
    fontSize: vw(25),
    color: '#DFE0EC',
    fontWeight: '500',
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(10),
    justifyContent: 'space-between',
    paddingRight: vw(15),
  },
  address: {
    color: '#9EA3C5',
    fontSize: vw(14),
    marginLeft: vw(10),
  },
  headerTextStyle: {
    fontSize: vw(16),
    color: 'white',
    fontWeight: '500',
    marginLeft: vw(10),
    alignSelf: 'flex-start',
  },
  address2: {
    color: '#DFE0EC',
    fontSize: vw(16),
    marginLeft: vw(10),
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    width: '100%',
    margin: 0,
  },
  con: {
    backgroundColor: '#383C5D',
    alignItems: 'center',
    marginHorizontal: vw(16),
    paddingVertical: vh(45),
    borderRadius: vw(10),
  },
  use: {
    fontSize: vw(14),
    color: 'white',
    fontWeight: '500',
  },
  usePin: {
    fontSize: vw(14),
    color: 'white',
    fontWeight: '500',
    marginTop: vh(15),
  },
  finger: {
    height: vw(51),
    width: vw(51),
    backgroundColor: '#383C5D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(5),
    marginTop: vh(20),
    alignSelf: 'center',
  },
  close: {
    tintColor: 'white',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
    elevation: 10,
  },
  img: {
    tintColor: 'white',
  },
  textIn: {
    width: '90%',
    marginTop: vh(10),
    borderBottomColor: '#4B517D',
    borderBottomWidth: 0.5,
    height: vh(50),
  },
  continue: {
    fontSize: vw(14),
    fontWeight: '500',
    color: '#DFE0EC',
    marginTop: vh(30),
  },
  textp: {
    textAlign: 'center',
    fontSize: vw(14),
    color: '#C4C4C4',
    fontWeight: '500',
  },
  post: {
    position: 'absolute',
    right: 1,
    flex: 1,
    height:vh(130)
  },
});

export default DarkGateway;
