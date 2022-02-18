import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {vw, vh} from '../../../constants/Dimension';
import Header from '../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import constants from '../../../constants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActiveCircle from '../Circle/ActiveCircle';
import PendingCircle from '../Circle/PendingCircle';
import CustomTextInput from '../../../component/CustomTextInput';

const Home = () => {
  const Tab = createMaterialTopTabNavigator();

  const inputStyles = {
    width: vw(335),
    backgroundColor: 'white',
    borderRadius: vw(10),
    marginTop: vh(19),
  };

  const onBackPress = () => {};

  const renderRightButton = () => {
    return (
      <TouchableOpacity style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.bell_icon} />
      </TouchableOpacity>
    );
  };
  const renderLeftButton = () => {
    return (
      <TouchableOpacity style={styles.backButtom}>
        <Text style={styles.headerTextStyle}>{'Circle'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header renderLeftButton={renderLeftButton} />
      <View style={styles.innerContainner}>
        {/* <CustomTextInput
          autoCapitalize="sentences"
          container={inputStyles}
          labelStyle={{color: 'white', fontWeight: '600'}}
          label={'Search circle'}
          fieldName="accountNumber"
          keyboardType="default"
          icon={constants.Images.searchIcon}
          onChangeText={(type: string, val: string) => {}}
          isError
          iconStyle={styles.iconStyle}
        /> */}
        <CustomTextInput
          autoCapitalize="sentences"
          container={inputStyles}
          labelStyle={{color: 'white', fontWeight: '600'}}
          label={'Search circle'}
          fieldName="accountNumber"
          keyboardType="default"
          icon={constants.Images.searchIcon}
          onChangeText={(type: string, val: string) => {}}
          isError
          iconStyle={styles.iconStyle}
        />
        <Tab.Navigator
          screenOptions={{
            tabBarContentContainerStyle: styles.myIn,
          }}
          tabBarOptions={{
            indicatorStyle: {
              backgroundColor: constants.Colors.appButtonColor,
              height: 4,
            },
            showLabel: true,
            labelStyle: styles.label,
            style: styles.tabView,
          }}>
          <Tab.Screen
            options={{
              tabBarLabel: ({focused}) => (
                <View>
                  <Text
                    style={[
                      styles.tabText,
                      focused
                        ? {color: constants.Colors.appButtonColor}
                        : {color: 'black'},
                    ]}>
                    {'Active Circle'}
                  </Text>
                </View>
              ),
            }}
            name="Active Circle"
            component={ActiveCircle}
          />
          <Tab.Screen
            options={{
              tabBarLabel: ({focused}) => (
                <View>
                  <Text
                    style={[
                      styles.tabText,
                      focused
                        ? {color: constants.Colors.appButtonColor}
                        : {color: 'black'},
                    ]}>
                    {'Pending Circle'}
                  </Text>
                </View>
              ),
            }}
            name="Pending Circle"
            component={PendingCircle}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    paddingHorizontal: vw(16),
    backgroundColor: '#fbfbfb',
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
  tabView: {
    height: vw(55),
    paddingVertical: vw(11),
    backgroundColor: '#fbfbfb',
    marginTop: vh(10),
  },
  label: {
    fontSize: vw(14),
    color: constants.Colors.appButtonColor,
    fontWeight: '700',
  },
  tabText: {
    fontSize: vw(14),
    fontWeight: '700',
  },
  myIn: {
    // backgroundColor: 'red',
  },
  iconStyle: {
    alignSelf: 'center',
  },
});

export default Home;
