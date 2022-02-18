import React, {useEffect, useState} from 'react';
import {Text, View, Pressable, Image} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

// custom imports
import styles from './styles';
// import { image } from '../../assets';
import constants from '../../constants';
type TimerClockProps = {
  onResendPress: any;
  countdown?: number;
};

const TimerClock = ({onResendPress, countdown = 25}: TimerClockProps) => {
  const [timerClock, setTimerClock] = useState(countdown);
  const [isResendReady, setIsResendReady] = useState(false);
  const timer = timerClock < 10 ? `0${timerClock}` : timerClock;

  useEffect(() => {
    let clockIntervalId: any;
    if (!isResendReady && timerClock > 0) {
      clockIntervalId = setInterval(() => {
        setTimerClock(prevValue => prevValue - 1);
      }, 1000);
    } else {
      setIsResendReady(true);
    }
    return () => clearInterval(clockIntervalId);
  }, [timerClock, isResendReady]);

  return (
    <View style={styles.clockContainer}>
      {isResendReady ? (
        <Pressable
          onPress={() => {
            onResendPress();
            setIsResendReady(false);
            setTimerClock(countdown);
          }}>
          <View style={styles.resendTextContainer}>
            <Text style={styles.resendText}>Resend Code</Text>
          </View>
        </Pressable>
      ) : (
        <>
          {/* <Image source={image.clock} /> */}
          <Text style={styles.clockText}>{`00:${timer}`}</Text>
        </>
      )}
    </View>
  );
};

type Props = {
  onResend: Function;
  onSubmit: Function;
};

const PhoneOTP = ({onResend, onSubmit}: Props) => {
  const [code, setCode] = useState('');
  const otpRef: any = React.useRef();

  useEffect(() => {
    if (otpRef?.current?.focusField) {
      otpRef.current.focusField(0);
    }
  }, []);

  const onResendPress = () => {
    onResend();
  };

  return (
    <View style={styles.phoneOTPContainer}>
      <OTPInputView
        code={code}
        pinCount={6}
        autoFocusOnLoad
        style={styles.otpContainer}
        onCodeChanged={code => setCode(code)}
        codeInputFieldStyle={styles.fieldView}
        onCodeFilled={code => {
          onSubmit(code);
          // setTimeout(() => {
          //   setCode('');
          // }, 500);
        }}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <Text style={styles.otpdid}>{"Didn't receive OTP code ?"}</Text>
      <TimerClock onResendPress={onResendPress} />
    </View>
  );
};

export default PhoneOTP;
