import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../../component/CustomTextInput';
import constants from '../../constants';
import {vw, vh} from '../../constants/Dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';
import {forgetPassword} from '../../modules/Auth';
import {useDispatch, useSelector} from 'react-redux';
import CommonFunction from '../../Utils/CommonFunction';

const Forget = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loder, setLoder] = React.useState(false);

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const inputRefs = React.useRef<Array<any>>([]);
  const inputStyles = {
    width: vw(280),
    marginBottom: vh(10),
    backgroundColor: 'white',
    borderRadius: vw(10),
  };

  const onPressSave = () => {
    setLoder(true);
    // navigation.navigate(constants.Screens.ResetPassword);

    dispatch(
      forgetPassword(
        {
          email: email,
        },
        () => {
          setLoder(false);
          navigation.navigate(constants.Screens.ResetPassword, {
            email,
          });
        },
        () => {
          setLoder(false);
          console.log('error callback');
        },
      ),
    );
    // navigation.navigate(constants.Screens.ResetPassword);
  };

  const onBackPress = () => {
    navigation.goBack();
  };
  const renderLeftButton = () => {
    return (
      <TouchableOpacity onPress={onBackPress} style={styles.backButtom}>
        <Image style={styles.iconColor} source={constants.Images.back} />
        <Text style={styles.headerTextStyle}>{'Forgot Password'}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header renderLeftButton={renderLeftButton} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        scrollEnabled={true}
        style={{marginBottom: constants.Normalise(30)}}>
        <View style={styles.innerContainner}>
          <ImageBackground
            resizeMode="stretch"
            resizeMethod="resize"
            source={constants.Images.loginBack}
            style={styles.back}>
            <View>
              <Image
                resizeMode="contain"
                style={styles.appLogo}
                source={constants.Images.AppLogo}
              />
            </View>
            <View style={styles.alignLeft40}>
              <Text style={styles.signin}>{'Forgot Password ?'}</Text>
              <CustomTextInput
                ref={ref => (inputRefs.current[0] = ref)}
                autoCapitalize="sentences"
                container={inputStyles}
                placeholder={'Email /Phone no'}
                labelStyle={{color: 'white', fontWeight: '600'}}
                label={'Email /Phone no'}
                fieldName="email"
                keyboardType="default"
                icon={constants.Images.mobile_icon}
                onChangeText={(type: string, val: string) => {
                  setEmail(CommonFunction.normalizeEmail(val));
                  setEmailError(CommonFunction.validateEmail(val).msg);
                }}
                onSubmitEditing={() => inputRefs.current[1].focus()}
                isError
                iconStyle={styles.iconStyle}
              />
            </View>
            <CustomButton
              isDisabled={email.length == 0}
              buttonText={'Submit'}
              handleAction={onPressSave}
              customStyle={[
                styles.saveButtonContainer,
                {backgroundColor: email.length == 0 ? 'grey' : '#6a9589'},
              ]}
            />
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fa8116e',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    height: vw(350),
    width: '100%',
  },
  innerContainner: {
    flex: 1,
    marginTop: vh(100),
  },
  appLogo: {
    height: vw(140),
    width: vw(160),
    alignSelf: 'center',
  },
  alignLeft40: {
    marginHorizontal: vw(50),
  },
  signin: {
    color: 'white',
    fontWeight: '800',
    fontSize: vw(22),
  },
  iconStyle: {
    alignSelf: 'center',
  },
  forgetPasword: {
    alignSelf: 'flex-end',
    marginTop: vh(10),
  },
  saveButtonContainer: {
    bottom: vh(8),
    width: vw(250),
    alignSelf: 'center',
    borderRadius: vw(30),
    position: 'absolute',
    backgroundColor: '#6a9589',
    paddingVertical: vh(10),
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
});

export default Forget;
