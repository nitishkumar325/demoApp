export default {
  otpconfirm: '/api/auth/confirm',
  login: '/getGatewayPingStatus',
  getBatteryStatus: '/getGatewayPingStatus',
  getBatteryGateway: '/getBatteriesByGateway',
  getBatteriesById: '/getBatteriesById',
  forget: '/api/auth/forgot',
  resetPassword: '/api/auth/setforgot',
  mediaUpload: '/api/media/upload',
  getServices: '/api/theme/services/fetch',
  getTheme: '/api/theme/fetch',
  createCirlce: '/api/circle/create',
  getHelp: '/api/customer/help/info',
  getCircle: (id: any) => `/api/circle/get/${id}`,
  editProfile: '/api/customer/profile/update',
};
