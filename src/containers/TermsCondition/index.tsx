import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import constants from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {vw, vh} from '../../constants/Dimension';
import PhoneOTP from '../../component/PhoneOTP';
import CustomButton from '../../component/CustomButton';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Router from '../../navigator/routes';

import {OTPConfirm, setLoginBoolean} from '../../modules/Auth';
import Loader from '../../component/Loader/Loader';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  route: any;
  onPressSave: any;
}

const OTPScreen = (props: Props) => {
  const {onPressSave} = props.route.params;
  const {authLoder} = useSelector((state: {Auth: any}) => ({
    authLoder: state.Auth.authLoder,
  }));
  const [loder, setLoder] = React.useState(false);

  const dispatch = useDispatch();
  const [useCode, setUserCode] = React.useState('');
  const {phoneNo, email} = props.route.params;
  // const phoneNo = '9958431869';
  const navigation = useNavigation();
  const onResendPress = () => {};
  const onSubmitPressOTP = (code: any) => {
    setUserCode(code);
  };

  const onBackPress = () => {
    navigation.goBack();
  };
  const onchangePhone = () => {
    navigation.goBack();
  };
  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={onBackPress} style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.back} />
        <Text style={styles.headerTextStyle}>{'circle'}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header renderLeftButton={renderLeftButton} />
      <ScrollView>
        <View style={{flex: 1, marginBottom: vh(100)}}>
          <Text style={styles.hori}>
            {
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            }
          </Text>
          <CustomButton
            isDisabled={false}
            buttonText={'Accept'}
            handleAction={() => {
              onPressSave();
            }}
            // handleAction={onSubmitTesting}
            customStyle={[
              styles.saveButtonContainer,
              {backgroundColor: false ? 'grey' : '#6a9589'},
            ]}
          />
          <CustomButton
            isDisabled={false}
            buttonText={'Reject'}
            textStyle={{color: '#6a9589'}}
            handleAction={() => {
              setTimeout(() => {
                Router.resetNew(navigation, constants.Screens.Login, {
                  type: 'Login',
                });
              }, 500);
            }}
            // handleAction={onSubmitTesting}
            customStyle={[styles.saveButtonContainer, styles.extra]}
          />
        </View>
      </ScrollView>

      {authLoder && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  appLogo: {
    height: vw(150),
    width: vw(150),
    alignSelf: 'center',
    marginTop: vh(100),
  },
  veri: {
    fontWeight: '700',
    fontSize: vw(22),
    textAlign: 'center',
    color: 'black',
  },
  sent: {
    fontWeight: '600',
    fontSize: vw(12),
    textAlign: 'center',
    marginTop: vh(10),
    color: 'black',
  },
  pencil: {
    tintColor: 'white',
    height: vw(10),
    width: vw(10),
  },
  greenCircle: {
    height: vw(20),
    width: vw(20),
    borderRadius: vw(10),
    backgroundColor: constants.Colors.appButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: vw(10),
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: vh(30),
  },
  number: {
    fontWeight: '600',
    fontSize: vw(12),
    color: 'black',
    textAlign: 'center',
  },
  saveButtonContainer: {
    width: vw(250),
    alignSelf: 'center',
    borderRadius: vw(30),
    backgroundColor: '#6a9589',
    paddingVertical: vh(15),
    marginTop: vh(30),
  },
  textStyle: {
    fontSize: vw(14),
    fontWeight: '600',
    color: 'black',
  },
  backButtom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconColor: {
    tintColor: 'white',
  },
  headerTextStyle: {
    fontSize: vw(14),
    color: 'white',
    fontWeight: '700',
    marginLeft: vw(10),
  },
  hori: {
    marginHorizontal: vw(22),
    fontSize: vw(22),
    color: 'black',
  },
  extra: {
    borderWidth: 1,
    backgroundColor: '#fbfbfb',
    borderColor: '#6a9589',
    color: '#6a9589',
  },
});

export default OTPScreen;
