import {StyleSheet} from 'react-native';
import constants from '../../constants';
import {vw, vh, normalize} from '../../constants/Dimension';

export default StyleSheet.create({
  container: {
    width: '90%',
    borderWidth: 1,
    flexDirection: 'row',
    height: normalize(40),
    borderColor: constants.Colors.border,
    borderRadius: normalize(4),
    justifyContent: 'space-between',
    paddingHorizontal: normalize(13),
    backgroundColor: constants.Colors.backgroundTextInputColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textInputLabel: {
    textAlign: 'left',
    fontSize: normalize(12),
    marginTop: normalize(13),
    marginBottom: normalize(8),
    color: 'black',
  },
  passwordIconContainer: {
    width: vw(20),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eye: {
    width: vw(25),
    height: vh(25),
  },
  textInput: {
    fontWeight: '500',
    textAlign: 'left',
    fontSize: normalize(12),
    color: constants.Colors.blackText,
    paddingVertical: vh(12),
    textAlignVertical: 'top',
    flexWrap: 'wrap',
  },
  errorStyle: {
    borderWidth: 1,
    color: constants.Colors.red,
    borderColor: constants.Colors.red,
  },
  errorWithOutStyle: {
    color: constants.Colors.border,
    borderColor: constants.Colors.borderSelected,
  },
  errorText: {
    color: constants.Colors.red,
    textAlign: 'left',
    left: normalize(5),
    width: normalize(300),
    fontSize: normalize(16),
    marginVertical: normalize(6),
  },
  starStyle: {
    color: constants.Colors.black,
  },
  borderRedError: {
    borderWidth: 1,
    borderColor: constants.Colors.red,
  },
  alignTop: {
    bottom: 0,
    right: -10,
    position: 'absolute',
    color: constants.Colors.textColor1,
  },
  optionalStyle: {
    fontSize: vw(14),
    color: constants.Colors.textColor1,
  },
});
