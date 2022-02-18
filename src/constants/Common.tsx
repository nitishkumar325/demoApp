// import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
// import Config from 'react-native-config';
import axios from 'axios';
import constants from '.';

// const hasNotch = DeviceInfo.hasNotch();
const isAndroid = Platform.OS == 'android';
const hitslope = {left: 10, right: 10, top: 10, bottom: 10};
const PlatformNumber = isAndroid ? 0 : 1;
const ENV_DATA = {
  BASE_URL: 'http://3.7.240.41:8080',
};
const $http = axios.create({
  baseURL: ENV_DATA.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // "devicedetails": JSON.stringify({ token: '', deviceId: '', type: 1 }),
    // "offset": new Date().getTimezoneOffset(),
  },
});
// const setAuthorizationToken = (
//   token: string,
//   fcmToken: String = '',
//   lang: String,
// ) => {
//   if (token) {
//     $http.defaults.headers.common.Authorization = `Bearer ${token}`;
//     $http.defaults.headers.common.lang = lang;
//     $http.defaults.headers.common.offset = new Date().getTimezoneOffset();
//     $http.defaults.headers.common.devicedetails = JSON.stringify({
//       token: fcmToken + '',
//       deviceId: 'nmmzzefewfwf',
//       type: constants.common.PlatformNumber,
//     });
//     // offset:"+5:30"
//     //below commented is for testing purpose
//     //$http.defaults.headers.common.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik4wUkNOVGt6TjBFME16RkRRMEZEUVRNek9VRXlSRFUzUXpZd01FRXpOVGszTkRBNU56aENOdyJ9.eyJpc3MiOiJodHRwczovL2FiY28tcHJvZC5hdXRoMC5jb20vIiwic3ViIjoiZW1haWx8NWRhOGIxYmQ4ZTExZjI4Yzk2ZjI2MWIzIiwiYXVkIjpbImh0dHBzOi8vYmFja2VuZC1hcGktM3B2NXVqbGFpYS11Yy5hLnJ1bi5hcHAiLCJodHRwczovL2FiY28tcHJvZC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTcyOTU4MzU0LCJleHAiOjE1NzI5NjU1NTQsImF6cCI6IkVnd2wwSUU3aGNFVUhnM0dvNUliT082Z1RvcHJtbHZEIiwic2NvcGUiOiJvcGVuaWQifQ.c3Ih6jV4Zqb28fDdIwcY36bSTD4eXU1uczIJxUXg1y9X5mmE_og8OqwY-7JtEUznG2Uc52nCEYgudNlvvXOOzz75AQX1fLrZkr-js-AMcNs-6pMDftK2114_PEEllNdHYFatJ3wJG3KjlxN5qtzY0XmaxxhlrMwMWG7AcCcWH3SqaUrE7TpiSTCRwun9TFDGzK9Th8Doc_jPfh6ztm-bN4btffIzlCbgHBfvFH5G4lnh-V5tTN_33GTbVY1tlGcAKMzPbnhIUk_nYjtLg2Qfoc-XeL6IOR5JdrBFIKZ8RYNF5Q1ipw3iC6cDi6tdA0h9uzZja524Un1ENK6rDCZFcQ`;
//   } else {
//     delete $http.defaults.headers.common.devicedetails;
//   }
// };
let status_code = {
  success: 200,
  successAction: 201,
  notFound: 204,
  badRequest: 400,
  Unauthorized: 401,
  invalid: 400,
  timeout: 408,
  userDelete: 410,
  serverError: 500,
};
export default {
  // hasNotch,
  isAndroid,
  ENV_DATA,
  // setAuthorizationToken,
  axiosInstance: $http,
  PlatformNumber,
  hitslope,
  status_code,
};
