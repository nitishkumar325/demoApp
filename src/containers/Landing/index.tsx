import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {vw, vh} from '../../constants/Dimension';
import Header from '../../component/Header';
import constants from '../../constants';
import CustomTextInput from '../../component/CustomTextInput';
import CustomButton from '../../component/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getBatteryStatus, getCircle} from '../../modules/Auth';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../component/Loader/Loader';
import images from '../../constants/images';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../constants/Screens';
import Router from '../../navigator/routes';
import CommonFunction from '../../Utils/CommonFunction';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [batteryStatus,setBatteryStatus]=useState(1)
  const [loading, setLoading] = React.useState(false);


  const onLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to exit ?',
      [
        {text: 'Cancel', onPress: () => {}},
        {
          text: 'OK',
          onPress: () => {
            // dispatch(setIntialState());
            Router.resetNew(navigation, constants.Screens.Login, {
              type: 'Login',
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(()=>{
    getOnlineStatus('PSTI_GW_001')
  },[])


  const getOnlineStatus = (batteryId:any) => {
    setLoading(true)
    dispatch(
      getBatteryStatus(
        {
          gatewayId:batteryId,
        },
        (res: any) => {
          setLoading(false)
          console.log('res', res);
          setBatteryStatus(res?.status)
        },
        (error: any) => {
          setLoading(false)
          console.log('error callback', error);
          CommonFunction.showSnackbar(
            "Something went Wrong",
            'black',
          );
        },
      ),
    );
  };

  const renderRightButton = () => {
    const [button, setButton] = React.useState(false);
    return (
      <TouchableOpacity activeOpacity={1} style={styles.rightCont}>
        <TouchableOpacity
          onPress={() => {
            setButton(!button);
          }}
          style={styles.circle}>
          <Text style={styles.pStyle}>{'P'}</Text>
        </TouchableOpacity>
        {button && (
          <TouchableOpacity onPress={onLogoutPress} style={styles.LogoutCnt}>
            <Text style={styles.LogoutText}>{'Logout'}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const renderLeftButton = () => {
    return (
      <TouchableOpacity style={styles.backButtom}>
        <View style={styles.inrContainer}>
          <Image style={styles.iconColor} source={constants.Images.HeaderPic} />
          <Text style={styles.helloSqr}>{'Hello PSTI_BLR'}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const onItemPress = () => {
    if(batteryStatus)
    navigation.navigate(Screens.DarkGateway);
  };

  const renderView = (index: any) => {
    return (
      <TouchableOpacity
        onPress={onItemPress}
        style={{
          backgroundColor: '#383C5D',
          borderRadius: vw(10),
          paddingHorizontal: vw(8),
          paddingVertical: vh(10),
          marginVertical: vh(15),
        }}>
        <View style={styles.containeer}>
          <View style={{backgroundColor: '#303345', borderRadius: vw(50)}}>
            <Text style={styles.buy}>{'Id: PSTI_GW_001'}</Text>
          </View>
          <Image source={index? images.online : images.offline} />
        </View>
        <View style={styles.marginTop10}>
          <Text style={styles.gatewayName}>{`${'Jaya_001'}`}</Text>
          <View style={styles.alignRow}>
            <Image source={images.location} />
            <Text style={styles.address}>
              {'1 MG road, Bangalore - 560001'}
            </Text>
          </View>
          <View style={styles.alignRow}>
            <Image source={images.Icon} />
            <Text style={styles.address}>{'12.971599, 77.594563'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.Colors.themeGreen,
        width: '100%',
      }}>
      <Header
        renderRightButton={renderRightButton}
        renderLeftButton={renderLeftButton}
      />

      <View style={styles.innerContainner}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>{renderView(batteryStatus)}</View>
        </ScrollView>
      </View>
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
  },
  iconColor: {
    height: vw(21),
    width: vw(75),
    resizeMode: 'contain',
  },
  helloSqr: {
    fontSize: vw(20),
    color: 'white',
    marginTop: vh(33),
  },
  inrContainer: {
    marginTop: vh(31),
    marginBottom: vh(16),
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
    color: '#BEC1D8',
    paddingHorizontal: vw(10),
    textTransform: 'uppercase',
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
    fontSize: vw(16),
    color: '#DFE0EC',
    fontWeight: '500',
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(10),
  },
  address: {
    color: '#DFE0EC',
    fontSize: vw(16),
    marginLeft: vw(10),
  },
  marginTop10: {
    marginTop: vh(10),
  },
});

export default Home;
