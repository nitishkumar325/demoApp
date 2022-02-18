import React, {useEffect} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import constants from '../../../constants';
import CustomTextInput from '../../../component/CustomTextInput';
import CustomButton from '../../../component/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getCircle} from '../../../modules/Auth';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../component/Loader/Loader';
import images from '../../../constants/images';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Screens from '../../../constants/Screens';

const BatteryDetail = () => {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const route = useRoute();
  const {batteryNumber} = route.params;
  const [modal, setModal] = React.useState(false);
  const [isPinEnable, setIsPinEnable] = React.useState(false);
  const [bloder, setbloder] = React.useState(false);
  const navigation = useNavigation();
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
      complete: true,
      id: 0,
    },
    {
      batterName: '14.8_LI',
      Batteryid: 'PSTI_BAT02',
      Batterytype: 'Li-ion',
      Ratedvoltage: '12V',
      Capacity: '10Ah',
      ManufacturerName: 'Exide',
      ManufacturingDate: 'Jan 2022',
      complete: false,
      id: 1,
    },
    {
      batterName: '12V_LA',
      Batteryid: 'PSTI_BAT03',
      Batterytype: 'li-po',
      Ratedvoltage: '3.7',
      Capacity: '1800mah',
      ManufacturerName: 'Orange',
      ManufacturingDate: 'Oct 2021',
      complete: false,
      id: 2,
    },
  ];

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

  const onBack = () => {
    navigation.goBack();
  };

  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={onBack} style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.back} />
        <Text style={styles.headerTextStyle}>{`${'Battery'}${' 00'}${
          batteryNumber + 1
        }`}</Text>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {}, []);

  const onItemPress = () => {
    setModal(true);
  };

  const renderView = (status: any) => {
    return (
      <View
        onPress={onItemPress}
        style={{
          backgroundColor: '#383C5D',
          borderRadius: vw(10),
          paddingHorizontal: vw(8),
          marginVertical: vh(15),
        }}>
        <View style={[styles.alignRow]}>
          <Text style={styles.address}>{'Battery ID'}</Text>
          <Text style={[styles.value]}>{data[batteryNumber]?.Batteryid}</Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Battery Type'}</Text>
          <Text style={[styles.value]}>{data[batteryNumber]?.Batterytype}</Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Voltage'}</Text>
          <Text style={[styles.value]}>
            {data[batteryNumber]?.Ratedvoltage}
          </Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Capacity'}</Text>
          <Text style={[styles.value]}>{data[batteryNumber]?.Capacity}</Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Manufacturer name'}</Text>
          <Text style={[styles.value]}>
            {data[batteryNumber]?.ManufacturerName}
          </Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Manufactured date'}</Text>
          <Text style={[styles.value]}>
            {data[batteryNumber]?.ManufacturingDate}
          </Text>
        </View>
      </View>
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

  const onComplete = () => {
    setbloder(false);
    navigation.navigate(Screens.BatteryDetail);
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
  const renderBattery = () => {
    return (
      <View style={styles.batercon}>
        <View style={styles.alignRow}>
          <Text style={[styles.value]}>{'Battery'}</Text>
          <Image source={images.charging} />
        </View>
        <Text style={styles.min}>{'52 mins until full'}</Text>
        <Image style={styles.batterimage} source={images.batteryAnimation} />
      </View>
    );
  };
  const renderHealthBattery = () => {
    return (
      <View style={styles.alignRow}>
        <TouchableOpacity style={styles.box}>
          <View style={styles.alignR}>
            <Image source={images.heart} />
            <Text style={styles.health}>{'health'}</Text>
          </View>
          <Text style={[styles.nin, {paddingHorizontal: vw(34)}]}>{'99%'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <View style={styles.alignR}>
            <Image source={images.calender} />
            <Text style={styles.health}>{'Life (Days left)'}</Text>
          </View>
          <Text style={[styles.nin, {paddingHorizontal: vw(34)}]}>{'189'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderVoltageBattery = () => {
    return (
      <View style={styles.alignRow}>
        <TouchableOpacity style={styles.box}>
          <View style={styles.alignR}>
            <Image source={images.electric} />
            <Text style={styles.health}>{'Voltage'}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={[styles.nin]}>{'28.64'}</Text>
            <Text style={[styles.nin2]}>{'Volts'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <View style={styles.alignR}>
            <Image source={images.current} />
            <Text style={styles.health}>{'Current'}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={[styles.nin]}>{'11.20'}</Text>
            <Text style={[styles.nin2]}>{'Amps'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressSave = () => {};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.Colors.themeGreen,
        width: '100%',
      }}>
      <Header renderLeftButton={renderLeftButton} />
      <ScrollView>
        <View style={styles.innerContainner}>
          {renderView(true)}
          {renderBattery()}
          {renderHealthBattery()}
          {renderVoltageBattery()}
        </View>
      </ScrollView>
      <CustomButton
        isDisabled={false}
        buttonText={'Refresh'}
        handleAction={onPressSave}
        iconRight={images.refreshIcon}
        textStyle={{
          paddingVertical: vh(5),
          fontWeight: '500',
          textTransform: 'uppercase',
        }}
        customStyle={[styles.saveButtonContainer]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    backgroundColor: constants.Colors.themeGreen,
    paddingHorizontal: vw(16),
    marginBottom: vh(20),
    paddingBottom: vh(100),
  },
  backButtom: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: vh(28),
    paddingBottom: vh(15),
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
    elevation: 2,
    marginVertical: vh(5),
    justifyContent: 'space-between',
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
    paddingVertical: vh(8),
    justifyContent: 'space-between',
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
  value: {
    fontSize: vw(14),
    color: '#DFE0EC',
    fontWeight: '500',
  },
  min: {
    fontSize: vw(14),
    color: '#9EA3C5',
    marginTop: vh(5),
  },
  batterimage: {
    marginTop: vh(25),
    height: vw(40),
    width: vw(306),
    resizeMode: 'contain',
  },
  batercon: {
    backgroundColor: '#383C5D',
    paddingHorizontal: vw(12),
    paddingBottom: vh(10),
    borderRadius: vw(10),
  },
  box: {
    backgroundColor: '#383C5D',
    paddingVertical: vh(15),
    borderRadius: vw(5),
    marginTop: vh(5),
    width: '48%',
    paddingHorizontal: vw(9),
  },
  alignR: {
    flexDirection: 'row',
    backgroundColor: '#383C5D',
  },
  health: {
    fontSize: vw(14),
    color: '#DFE0EC',
    marginLeft: vw(12),
    fontWeight: '500',
  },
  nin: {
    fontSize: vw(30),
    color: '#DFE0EC',
    marginTop: vh(10),
  },
  saveButtonContainer: {
    bottom: vh(8),
    width: vw(340),
    alignSelf: 'center',
    borderRadius: vw(5),
    position: 'absolute',
    backgroundColor: '#EA1C39',
    paddingVertical: vh(10),
  },
  nin2: {
    fontSize: vw(14),
    color: '#DFE0EC',
    alignSelf: 'auto',
    marginTop: vh(20),
    fontWeight: '600',
  },
});

export default BatteryDetail;