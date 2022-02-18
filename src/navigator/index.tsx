import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import Splash from '../../src/containers/Splash';
import Login from '../../src/containers/Login';
import Signup from '../../src/containers/Singup';
import Forget from '../../src/containers/ForgetScreen';
import ResetPassword from '../../src/containers/ResetPassword';
import Landing from '../../src/containers/Landing';
import Help from '../containers/Landing/Account/Help';
import OTPScreen from '../../src/containers/OtpScreen';
import constants from '../../src/constants';
import EditProfilePicture from '../containers/Landing/Account/EditProfilePicture';
import EditProfile from '../containers/Landing/Account/EditProfile';
import ResetPasswordLogin from '../containers/Landing/Account/ResetPasswordLogin';
import CreateCircle from '../containers/Landing/CreateCircle';
import AddMember from '../containers/Landing/CreateCircle/AddMember';
import Terms from '../containers/TermsCondition'
import DarkGateway from '../containers/Landing/Darkgateway';
import BatteryDetail from '../containers/Landing/BatteryDetail';



const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={constants.Screens.Splash}>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Help'}
          component={Help}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.Login}
          component={Login}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.DarkGateway}
          component={DarkGateway}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.createCircle}
          component={CreateCircle}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.BatteryDetail}
          component={BatteryDetail}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.forget}
          component={Forget}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.OTP}
          component={OTPScreen}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.ResetPassword}
          component={ResetPassword}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.Landing}
          component={Landing}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.addMember}
          component={AddMember}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.EditProfilePicture}
          component={EditProfilePicture}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.EditProfile}
          component={EditProfile}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constants.Screens.ResetPasswordLogin}
          component={ResetPasswordLogin}
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
