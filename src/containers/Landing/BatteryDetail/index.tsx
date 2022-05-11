import React, {useEffect, useState,useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {vw, vh} from '../../../constants/Dimension';
import Header from '../../../component/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import constants from '../../../constants';
import CustomTextInput from '../../../component/CustomTextInput';
import CustomButton from '../../../component/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getBatteryDetail, getCircle} from '../../../modules/Auth';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../component/Loader/Loader';
import images from '../../../constants/images';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Screens from '../../../constants/Screens';
import CommonFunction from '../../../Utils/CommonFunction';
import Images from '../../../constants/images';

const BatteryDetail = () => {
  const [loading, setLoading] = React.useState(false);
  const fadeAnim = new Animated.Value(0);  // Initial value for opacity: 0

  const dispatch = useDispatch();
  const route = useRoute();
  const {batteryNumber,batteryId} = route.params;
  const [modal, setModal] = React.useState(false);
  const [batteryDetail,SetbatteryDetails]=useState({})
  const [isPinEnable, setIsPinEnable] = React.useState(false);
  const [bloder, setbloder] = React.useState(false);
  const [animation, setAnimation] = React.useState(false);
  const navigation = useNavigation();
  const onBackPress = () => {};
  const inputStyles = {
    width: vw(340),
    backgroundColor: 'white',
    borderRadius: vw(10),
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

  useEffect(() => {
    getBattery(batteryId);
  }, []);


 

  const getBattery = (batteryId: any) => {
    setLoading(true)
    dispatch(
      getBatteryDetail(
        {
          batteryId: batteryId,
        },
        (res: any) => {
          setLoading(false)
          console.log('res', res);
          setAnimation(res?.chargePercentage)
          SetbatteryDetails(res);
        },
        (error: any) => {
          setLoading(false)
          console.log('error callback', error);
          CommonFunction.showSnackbar('Something Went Wrong', 'black');
        },
      ),
    );
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
          <Text style={[styles.value]}>{batteryDetail?.batteryId}</Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Battery Type'}</Text>
          <Text style={[styles.value]}>{batteryDetail?.batteryType}</Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Voltage'}</Text>
          <Text style={[styles.value]}>
            {batteryDetail?.relatedVoltage}
          </Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Capacity'}</Text>
          <Text style={[styles.value]}>{batteryDetail?.capacity}</Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Manufacturer name'}</Text>
          <Text style={[styles.value]}>
            {batteryDetail?.manufacturerName}
          </Text>
        </View>

        <View style={styles.alignRow}>
          <Text style={styles.address}>{'Manufactured date'}</Text>
          <Text style={[styles.value]}>
            {batteryDetail?.manufacturerDate}
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
        <View style={styles.batteryView}>    
      <Animated.View style={[styles.outerBody,{width:`${batteryDetail?.chargePercentage}%`}]}>
      </Animated.View>
      <Text style={styles.batteryPercent}>{`${batteryDetail?.chargePercentage}%`}</Text>
      <View style={styles.chrgerbody}>
        <View style={styles.first}>
        <View style={styles.second}>
        <Image source={Images.chargerIcon}/>
        </View>
        </View>
    
      </View>
        </View>
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
          <Text style={[styles.nin, {paddingHorizontal: vw(34)}]}>{`${batteryDetail?.health}${'%'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <View style={styles.alignR}>
            <Image source={images.calender} />
            <Text style={styles.health}>{'Life (Days left)'}</Text>
          </View>
          <Text style={[styles.nin, {paddingHorizontal: vw(34)}]}>{batteryDetail?.life}</Text>
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
            <Text style={[styles.nin]}>{batteryDetail?.voltage}</Text>
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
            <Text style={[styles.nin]}>{batteryDetail?.batteryCurrent}</Text>
            <Text style={[styles.nin2]}>{'Amps'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressSave = () => {
    getBattery(batteryId);
  };

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
     {loading && <Loader />}
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
  },batteryView:{
    height:vh(60),
    width:'100%',
    backgroundColor:'#303345',
    marginTop:vh(20),
    borderRadius:vw(40),
    
  },outerBody:{
    flex:1,
    backgroundColor:'#63B995',
    borderRadius:vw(30),
    width:'100%'
  },batteryPercent:{
    position:'absolute',
    right:10,
    alignSelf:'center',
    marginTop:vh(15),
    color:'white',
    fontSize:vw(18),
    fontWeight:'bold'
  },chrgerbody:{
    position:'absolute',
    left:10,
    height:vw(34),
    width:vw(34),
    borderColor:'white',
    borderWidth:0.3,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:vw(17),
    marginTop:vh(10)

  },first:{
    height:vw(26),
    width:vw(26),
    borderColor:'white',
    borderWidth:0.8,
    borderRadius:vw(17),
    justifyContent:'center',
    alignItems:'center',
  },second:{
    height:vw(18),
    width:vw(18),
    borderColor:'white',
    borderWidth:2,
    borderRadius:vw(17),
    justifyContent:'center',
    alignItems:'center',
  }
});

export default BatteryDetail;
