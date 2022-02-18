import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {vw, vh} from '../../../../constants/Dimension';
import Header from '../../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import constants from '../../../../constants';
import CustomTextInput from '../../../../component/CustomTextInput';
import CustomButton from '../../../../component/CustomButton';
import {Screen} from 'react-native-screens';
import {useDispatch, useSelector} from 'react-redux';
import {getCircle} from '../../../../modules/Auth';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../../component/Loader/Loader';

const ActiveCircle = () => {
  const {id} = useSelector((state: {Auth: any}) => ({
    id: state.Auth.id,
  }));

  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [circle, setCircle] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      dispatch(
        getCircle(
          id,
          (res: any) => {
            setLoading(false);
            setCircle(res);
          },
          (err: any) => {
            setLoading(false);
          },
        ),
      );
      return () => {};
    }, []),
  );

  React.useEffect(() => {}, []);

  const inputStyles = {
    width: vw(320),
    marginBottom: vh(10),
    backgroundColor: 'white',
    borderRadius: vw(10),
  };

  const renderView = (item: any) => {
    return (
      <View style={{paddingHorizontal: vw(3), backgroundColor: '#fbfbfb'}}>
        <TouchableOpacity style={styles.containeer}>
          <Image style={styles.imageStyle} source={{uri: item?.circleImage}} />
          <View style={{marginLeft: vw(10), flex: 1}}>
            <View>
              <Text style={styles.buy}>{item.title}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: vh(7),
              }}>
              <Image
                resizeMode="contain"
                style={styles.caleder}
                source={constants.Images.calendar}
              />
              <Text
                style={{
                  fontSize: vw(12),
                  color: 'black',
                  marginLeft: vw(5),
                  fontWeight: '500',
                }}>
                {`Expiry-  ${moment(item?.expiryDate).format('DD/MM/YYYY')}`}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{alignSelf: 'flex-end', marginRight: vw(30)}}>
              <Text style={styles.count}>{item?.member}</Text>
              <View style={{flexDirection: 'row', marginTop: vh(7)}}>
                {item && item?.memberImages && item.memberImages.length > 0 && (
                  <Image
                    style={[styles.imageRow, {position: 'absolute', left: 0}]}
                    source={{uri: item.memberImages[0]}}
                  />
                )}
                {item && item?.memberImages && item.memberImages.length > 1 && (
                  <Image
                    style={[
                      styles.imageRow,
                      {position: 'absolute', left: 10, zIndex: -50},
                    ]}
                    source={{uri: item.memberImages[1]}}
                  />
                )}
                {item && item?.memberImages && item.memberImages.length > 2 && (
                  <Image
                    style={[
                      styles.imageRow,
                      {position: 'absolute', left: 15, zIndex: -60},
                    ]}
                    source={{uri: item.memberImages[2]}}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fbfbfb', paddingTop: vh(20)}}>
      <ScrollView>
        <View style={{marginBottom: vh(80)}}>
          {circle && circle.length > 0 && circle.map(item => renderView(item))}
        </View>
      </ScrollView>
      {/* {renderView()}
      {renderView()} */}

      <CustomButton
        buttonText={'+ Create A Circle'}
        // handleAction={onPressSave}
        handleAction={() => {
          console.log('action');
          navigation.navigate(constants.Screens.createCircle);
        }}
        textStyle={styles.textStyle}
        customStyle={[
          styles.saveButtonContainer,
          {backgroundColor: constants.Colors.appButtonColor},
        ]}
      />
      {/* {loading && <Loader />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    marginTop: vh(20),
    alignSelf: 'center',
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
    bottom: vh(15),
    width: vw(283),
    alignSelf: 'center',
    borderRadius: vw(30),
    position: 'absolute',
    backgroundColor: '#6a9589',
    paddingVertical: vh(14),
  },
  textStyle: {
    fontWeight: '600',
    fontSize: vw(14),
  },
  active: {
    fontSize: vw(16),
    color: 'black',
    fontWeight: '500',
    marginBottom: vh(5),
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
    marginVertical: vh(10),
    marginHorizontal: vw(10),
  },
  imageStyle: {
    height: vw(38),
    width: vw(38),
    borderRadius: vw(19),
  },
  imageRow: {
    height: vw(20),
    width: vw(20),
    borderRadius: vw(19),
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
});

export default ActiveCircle;
