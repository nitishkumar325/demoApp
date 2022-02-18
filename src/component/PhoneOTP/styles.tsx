import {Platform, StyleSheet} from 'react-native';
import {normalize, vh, vw} from '../../constants/Dimension';
import constants from '../../constants';

export default StyleSheet.create({
  phoneOTPContainer: {
    marginTop: vh(24),
  },
  fieldView: {
    height: vw(50),
    width: vw(50),
    borderRadius: normalize(25),
    borderWidth: 1,
    color: constants.Colors.blackText,
    fontSize: normalize(20),
    marginHorizontal: vw(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    // shadowOpacity: 0.3,
    // shadowRadius: 4.65,
    // elevation: 8,
  },
  otpContainer: {
    width: '100%',
    height: vh(78),
    paddingHorizontal: normalize(50),
  },
  fieldInput: {
    height: '100%',
    width: '100%',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
  clockContainer: {
    height: 20,
    width: '100%',
    // justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: vh(12),
    paddingEnd: vw(16),
    justifyContent: 'center',
  },
  clockText: {
    color: constants.Colors.appButtonColor,
    marginStart: vw(4),
    fontSize: 14,
  },
  clockIcon: {
    height: vh(14),
    width: vw(14),
  },
  resendText: {
    color: constants.Colors.appButtonColor,
    fontSize: vw(16),
    marginTop: Platform.OS === 'android' ? 5 : 0,
    fontWeight: '600',
    lineHeight: vh(20),
  },
  resendTextContainer: {
    borderBottomColor: constants.Colors.appButtonColor,
    borderBottomWidth: 1,
  },
  btnCustomStyle: {
    marginTop: vh(63),
  },
  btnTextStyle: {
    fontSize: normalize(16),
    textDecorationLine: 'underline',
    // textDecorationColor: fontFamily.Black,
  },
  underlineStyleHighLighted: {
    borderColor: constants.Colors.appButtonColor,
  },
  otpdid: {
    textAlign: 'center',
    fontSize: vw(14),
    fontWeight: '500',
    marginTop: vh(30),
    color: 'black',
  },
});
