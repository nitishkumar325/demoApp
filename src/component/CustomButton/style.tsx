import {StyleSheet} from 'react-native';
import {vh, vw, normalize} from '../../constants/Dimension';
import Contants from '../../constants';

export default StyleSheet.create({
  container: {
    width: vw(343),
    borderRadius: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    alignSelf: 'center',
    shadowColor: Contants.Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  iconLeft: {
    width: vw(16),
    marginRight: vw(8),
    height: vh(16),
  },
  iconRight: {
    width: vw(16),
    marginLeft: vw(8),
    height: vh(16),
  },
  buttonText: {
    fontSize: normalize(16),
    letterSpacing: 1,
    // paddingTop: 3,
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
