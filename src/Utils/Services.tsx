import Snackbar from 'react-native-snackbar';
import constants from '../constants';

const postApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCalback: Function,
) => {
  constants.common.axiosInstance
    .post(endPoint, params)
    .then((response: any) => {
      console.log('post response', response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log('post response error', error + endPoint);
      errorCalback(error.response);
    });
};

const putApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCalback: Function,
) => {
  constants.common.axiosInstance
    .put(endPoint, params)
    .then((response: any) => {
      console.log('pout response', response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log('put response error', error + endPoint);
      errorCalback(error.response);
    });
};

const getApiCall = (
  endPoint: string,
  paramsData: string = '',
  successCallback: Function,
  errorCalback: Function,
) => {
  constants.common.axiosInstance
    .get(endPoint + paramsData, {})
    .then((response: any) => {
      console.log('pout response', response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log('get response error', error + endPoint);
      errorCalback(error.response);
    });
};

const patchApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCalback: Function,
) => {
  constants.common.axiosInstance
    .patch(endPoint, params)
    .then((response: any) => {
      console.log('patch response', response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log('patch response error', error);

      errorCalback(error.response);
    });
};

const deleteApiCall = (
  endPoint: string,
  paramsData: string = '',
  successCallback: Function,
  errorCalback: Function,
) => {
  constants.common.axiosInstance
    .delete(endPoint + paramsData, {})
    .then((response: any) => {
      console.log('delete response', response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log('delete response error', error);

      errorCalback(error);
    });
};

/**
 * Global API multi purpose handler
 * @param payload
 * @param dropdown
 */
const handleApiError = (payload: any) => {
  Snackbar.show({
    text: payload,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: 'rgba(0,0,0,0.9)',
    textColor: 'white',
  });
};

export default {
  postApiCall,
  getApiCall,
  patchApiCall,
  putApiCall,
  deleteApiCall,
  handleApiError,
};
