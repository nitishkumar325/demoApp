import Snackbar from 'react-native-snackbar';
import constants from '../constants';

const showSnackbar = (title: string, color?: any, duration = 4000) => {
  if (title !== 'Invalid authorization token') {
    Snackbar.show({
      text: title,
      duration,
      action: {
        onPress: undefined,
        textColor: constants.Colors.white,
        text: 'Close',
      },
      textColor: constants.Colors.white,
      backgroundColor: color || constants.Colors.black,
    });
  }
};

export default showSnackbar;
