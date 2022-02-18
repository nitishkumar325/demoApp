import {Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';

const nameRegex = /^[a-zA-Z0-9 ]{3,50}$/;
const phoneRegex = /^\d{10}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\d])(?=.*?[^\sa-zA-Z0-9]).{8,20}$/;

const removeEmojis = (str: string) => {
  const regex =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
  return str.replace(regex, '');
};

const normalizeName = (name: string) =>
  // return removeEmojis(name).replace(/[^a-zA-Z ]+/g, '');
  removeEmojis(name)
    .replace(/[^a-zA-Z0-9 ]+/g, '')
    .replace(/^\s+/g, '');

const validateName = (name: string) => {
  if (!name) {
    return {
      status: false,
      msg: 'Please enter your name',
    };
  }
  return nameRegex.test(name)
    ? {status: true, msg: ''}
    : name.length <= 3 && name.length >= 1
    ? {
        status: false,
        msg: 'nameMinimum',
      }
    : {
        status: false,
        msg: 'name_validation_error',
      };
};

const showSnackbar = (title: string, color: any) => {
  Snackbar.show({
    text: title,
    duration: 2000,
    textColor: 'white',
    backgroundColor: color,
  });
};

const normalizeEmail = (email: string) =>
  removeEmojis(email).replace(/\s/g, '');

const normalizeSpaces = (value: string) =>
  removeEmojis(value).replace(/\s/g, '');

const validateLastName = (name: string) => {
  if (!name) {
    return {
      status: false,
      msg: 'Please enter your last name',
    };
  }
  return nameRegex.test(name)
    ? {status: true, msg: ''}
    : name.length <= 3 && name.length >= 1
    ? {
        status: false,
        msg: 'Last name must be contain 3 character',
      }
    : {
        status: false,
        msg: 'Please enter your name',
      };
};

const validatePhone = (phone: any) => {
  if (!phone) {
    return {
      status: false,
      msg: 'Enter number',
    };
  }
  const formattedPhone = parseInt(phone).toString();
  return phoneRegex.test(formattedPhone)
    ? {status: true, msg: ''}
    : {
        status: false,
        msg: 'Invalid phone number',
      };
};

const validateEmail = (email: string) => {
  if (!email) {
    return {
      status: false,
      msg: 'Please enter email address',
    };
  }
  return emailRegex.test(email)
    ? {status: true, msg: ''}
    : {
        status: false,
        msg: 'Incorrect email, please retry',
      };
};

const validatePassword = (pass: string) => {
  if (!pass) {
    return {
      status: false,
      msg: 'Please enter password',
    };
  }
  return passwordRegex.test(pass)
    ? {status: true, msg: ''}
    : {
        status: false,
        msg: 'Password must contain minimum 8 characters, one uppercase, lowercase, number and a special character.',
      };
};

const formattedDate = (
  d = moment(new Date()).subtract(13, 'years').toDate(),
) => {
  return [d.getMonth() + 1, d.getDate(), d.getFullYear()]
    .map(n => (n < 10 ? `0${n}` : `${n}`))
    .join('-');
};

const singleButton = (
  alertMessage: string,
  okText: any,
  okFunction: Function,
) => {
  Alert.alert(alertMessage, '', [
    {
      text: okText,
      onPress: () => okFunction(),
    },
  ]);
};


export default {
  removeEmojis,
  normalizeName,
  validateName,
  validateLastName,
  normalizeSpaces,
  validatePhone,
  singleButton,
  normalizeEmail,
  validateEmail,
  validatePassword,
  showSnackbar,
  formattedDate,
};
