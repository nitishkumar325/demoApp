import * as Actions from './types';
import utils from '../../Utils';
import constants from '../../constants';
import {Alert} from 'react-native';

export const setLoginBoolean = (status: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: Actions.SET,
      payload: {
        isLogin: status,
      },
    });
  };
};
export const setValue = (key: any, value: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: Actions.SET,
      payload: {
        [key]: value,
      },
    });
  };
};
export const setLoginInfo = (payload: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: Actions.SET_LOGI_INFO,
      payload: payload,
    });
  };
};

export const updateValues = (key: string, value: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: Actions.SET,
      payload: {
        [key]: value,
      },
    });
  };
};

export const setIntialState = () => {
  return (dispatch: Function) => {
    dispatch({
      type: Actions.RESET_STORE,
    });
  };
};

export const resetStore = () => {
  return {
    type: Actions.RESET_STORE,
  };
};
export const setLocalDetail = (userDetail: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: Actions.USER_DETAIL,
      payload: userDetail,
    });
  };
};

export const upload =
  (data: any, callback: Function, ErrorCallback: Function) => async () => {
    utils.Services.postApiCall(
      utils.EndPoint.mediaUpload,
      data,
      (res: any) => {
        callback(res);
      },
      (error: any) => {
        ErrorCallback(error);
      },
    );
  };

export const getHelp = (callback?: any, Fail?: Function) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.getApiCall(
      utils.EndPoint.getHelp,
      '',
      (res: any) => {
        console.log('res', res);
        if (res.data.status === 200) {
          callback(res.data.info);
        } else {
          let message = res.data.message;
          utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('err', err);
        Fail && Fail();
        let message = err.data.error;
        utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
      },
    );
  };
};
export const getCircle = (id: any, callback?: any, Fail?: Function) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.getApiCall(
      utils.EndPoint.getCircle(id),
      '',
      (res: any) => {
        console.log('res', res);
        if (res.data.status === 200) {
          callback(res.data.circles);
        } else {
          let message = res.data.message;
          utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('err', err);
        Fail && Fail();
        let message = err.data.error;
        utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
      },
    );
  };
};
export const getServices = (callback?: any, Fail?: Function) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.getApiCall(
      utils.EndPoint.getServices,
      '',
      (res: any) => {
        console.log('res', res);
        if (res.data.status === 200) {
          callback(res.data.services);
        } else {
          let message = res.data.message;
          utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('err', err);
        Fail && Fail();
        let message = err.data.error;
        utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
      },
    );
  };
};

export const getTheme = (callback?: any, Fail?: Function) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.getApiCall(
      utils.EndPoint.getTheme,
      '',
      (res: any) => {
        console.log('res', res);
        if (res.data.status === 200) {
          callback(res.data.themes);
        } else {
          let message = res.data.message;
          utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('err', err);
        Fail && Fail();
        let message = err.data.error;
        utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
      },
    );
  };
};

export const OTPConfirm = (params: Object, callback?: any, Fail?: Function) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.postApiCall(
      utils.EndPoint.otpconfirm,
      {
        ...params,
      },
      (res: any) => {
        let data = res.data;
        if (data.status === 200) {
          callback();
          dispatch({
            type: Actions.Loder,
            payload: {
              authLoder: false,
            },
          });
        } else {
          let message = data.message;
          utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
        }
      },
      (err: any) => {
        dispatch({
          type: Actions.Loder,
          payload: {
            authLoder: false,
          },
        });
        Fail && Fail();
        let message = err.data.message;
        utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
      },
    );
  };
};

export const getBatteryStatus = (params: Object, callback?: any, Fail?: Function) => {
  console.log("params",params)
  return (dispatch: any, getState: Function) => {
    utils.Services.postApiCall(
      utils.EndPoint.getBatteryStatus,
      {
        ...params,
      },
      (res: any) => {
        console.log("===res",res)
        let data = res?.data;
        if (res.status === 200) {
          callback(data);
          
        } else {
          Fail && Fail(res);
          utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('errro', err);
     
        Fail && Fail(err);
        // utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
      },
    );
  };
};


export const getBatteryGateway = (params: Object, callback?: any, Fail?: Function) => {
  console.log("params",params)
  return (dispatch: any, getState: Function) => {
    utils.Services.postApiCall(
      utils.EndPoint.getBatteryGateway,
      {
        ...params,
      },
      (res: any) => {
        console.log("===res",res)
        let data = res?.data;
        if (res.status === 200) {
          callback(data);
          
        } else {
          Fail && Fail(res);
          utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('errro', err);
     
        Fail && Fail(err);
        // utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
      },
    );
  };
};

export const getBatteryDetail = (params: Object, callback?: any, Fail?: Function) => {
  console.log("params",params)
  return (dispatch: any, getState: Function) => {
    utils.Services.postApiCall(
      utils.EndPoint.getBatteriesById,
      {
        ...params,
      },
      (res: any) => {
        console.log("===res",res)
        let data = res?.data;
        if (res.status === 200) {
          callback(data);
          
        } else {
          Fail && Fail(res);
          utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('errro', err);
     
        Fail && Fail(err);
        // utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
      },
    );
  };
};


export const userLogin = (params: Object, callback?: any, Fail?: Function) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.postApiCall(
      utils.EndPoint.login,
      {
        ...params,
      },
      (res: any) => {
        console.log("===res",res)
        let data = res?.data.data;
        if (res.data.status === 200) {
          callback(data.user);
          dispatch({
            type: Actions.Loder,
            payload: {
              authLoder: false,
            },
          });
        } else {
          // Fail && Fail(res);
          // utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('errro', err);
        dispatch({
          type: Actions.Loder,
          payload: {
            authLoder: false,
          },
        });
        Fail && Fail(err);
        // utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
      },
    );
  };
};

export const editDetail = (params: Object, callback?: any, Fail?: Function) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.postApiCall(
      utils.EndPoint.editProfile,
      {
        ...params,
      },
      (res: any) => {
        console.log('res', res);
        let data = res?.data;
        if (res.data.status === 200) {
          callback(data);
          dispatch({
            type: Actions.Loder,
            payload: {
              authLoder: false,
            },
          });
        } else {
          // Fail && Fail(res);
          utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('errro', err);
        dispatch({
          type: Actions.Loder,
          payload: {
            authLoder: false,
          },
        });
        Fail && Fail();
        utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
      },
    );
  };
};

export const createCircle = (
  params: Object,
  callback?: any,
  Fail?: Function,
) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.postApiCall(
      utils.EndPoint.createCirlce,
      {
        ...params,
      },
      (res: any) => {
        console.log('res', res);
        let data = res?.data;
        if (res.status === 200) {
          callback(data);
          dispatch({
            type: Actions.Loder,
            payload: {
              authLoder: false,
            },
          });
        } else {
          // Fail && Fail(res);
          utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('errro', err);
        dispatch({
          type: Actions.Loder,
          payload: {
            authLoder: false,
          },
        });
        Fail && Fail();
        utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
      },
    );
  };
};

export const forgetPassword = (
  params: Object,
  callback?: any,
  Fail?: Function,
) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.postApiCall(
      utils.EndPoint.forget,
      {
        ...params,
      },
      (res: any) => {
        let data = res.data;
        if (data.status === 200) {
          callback();
          dispatch({
            type: Actions.Loder,
            payload: {
              authLoder: false,
            },
          });
        } else {
          // Fail && Fail();
          // let message = data.message;
          utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('errro', err);
        dispatch({
          type: Actions.Loder,
          payload: {
            authLoder: false,
          },
        });
        Fail && Fail(err);
        // let message = err.data.message;
        utils.CommonFunctions.showSnackbar('error', constants.Colors.black);
      },
    );
  };
};

export const resetPassword = (
  params: Object,
  callback?: any,
  Fail?: Function,
) => {
  return (dispatch: any, getState: Function) => {
    dispatch({
      type: Actions.Loder,
      payload: {
        authLoder: true,
      },
    });
    utils.Services.postApiCall(
      utils.EndPoint.resetPassword,
      {
        ...params,
      },
      (res: any) => {
        let data = res.data;
        if (data.status === 200) {
          callback();
          dispatch({
            type: Actions.Loder,
            payload: {
              authLoder: false,
            },
          });
        } else {
          Fail && Fail();
          let message = data.message;
          utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
        }
      },
      (err: any) => {
        console.log('errro', err);
        dispatch({
          type: Actions.Loder,
          payload: {
            authLoder: false,
          },
        });
        Fail && Fail();
        let message = err?.data?.message;
        utils.CommonFunctions.showSnackbar(message, constants.Colors.black);
      },
    );
  };
};
