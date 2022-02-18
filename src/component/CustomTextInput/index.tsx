import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  I18nManager,
  StyleProp,
  TextStyle,
} from 'react-native';

// custom imports below
// import {images} from '../../assets';
import constants from '../../constants';

import {vh, vw} from '../../constants/Dimension';

/**
 * custom imports
 */
import Style from './style';

type Props = {
  ref: any;
  icon?: any;
  value: string;
  label?: string;
  iconPrefix?: any;
  defaultValue?: any;
  onBlur?: Function;
  fieldName: string;
  isError?: boolean;
  hasError?: string;
  testButtonID?: any;
  editable?: boolean;
  maxLength?: number;
  container?: Object;
  keyboardType?: any;
  iconStyle?: Object;
  returnKeyType?: any;
  multiline?: boolean;
  labelStyle?: Object;
  autoCapitalize?: any;
  placeholder?: string;
  starStatus?: boolean;
  mainContainer?: Object;
  onIconPress?: Function;
  onChangeText: Function;
  renderExtra?: Function;
  numberOfLines?: number;
  isCountEnable?: boolean;
  isOptionalText?: boolean;
  secureTextEntry?: boolean;
  onSubmitEditing?: Function;
  hidePasswordToggle?: boolean;
  showSecureTextEntry?: boolean;
  setErrorFieldEnable?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
};

const CustomTextInput = React.forwardRef((props: Props, ref: any) => {
  const [toggleShow, setToggleShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry);

  useEffect(() => {
    if (!props.showSecureTextEntry) {
      setSecureTextEntry(props.secureTextEntry);
    }
  }, []);

  const handleOnSubmitEditing = () => {
    if (props.onSubmitEditing) {
      props.onSubmitEditing();
    }
  };
  const removeEmojis = (str: string) => {
    const regex =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    return str.replace(regex, '');
  };
  const handleChangeText = (val: string) => {
    const tempValue =
      props.fieldName === 'email' ? val?.replace(/\s/g, '') : val;
    props.onChangeText(props.fieldName, removeEmojis(tempValue));
  };

  const handleToggleText = () => {
    setToggleShow(!toggleShow);
    setSecureTextEntry(!secureTextEntry);
  };

  const renderPasswordToggle = () => (
    <TouchableOpacity
      onPress={handleToggleText}
      style={Style.passwordIconContainer}>
      <Image
        source={
          toggleShow ? constants.Images.eyeOpen : constants.Images.eyeClosed
        }
        style={Style.eye}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const {container, numberOfLines, labelStyle, iconStyle} = props;
  const errorStyle =
    props.hasError === '' ? Style.errorWithOutStyle : Style.errorStyle;
  const focusStyle = {borderColor: 'white'};

  return (
    <View style={props.mainContainer}>
      {props.placeholder !== '' && (
        <Text style={[Style.textInputLabel, labelStyle]}>
          {props.placeholder}{' '}
          <Text style={Style.starStyle}>{props.starStatus ? '*' : ''}</Text>
          {props.isOptionalText && (
            <Text style={Style.optionalStyle}>{'optional'}</Text>
          )}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.onIconPress ? props.onIconPress() : ref.current.focus();
        }}
        style={[
          Style.container,
          container,
          errorStyle,
          props?.setErrorFieldEnable && focus
            ? Style.borderRedError
            : focusStyle,
        ]}>
        {props.icon !== '' && (
          <TouchableOpacity
            style={[iconStyle]}
            onPress={() => props.onIconPress && props.onIconPress()}>
            <Image
              style={{height: vw(15), width: vw(15), tintColor: 'black'}}
              resizeMethod="resize"
              source={props.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <View
          style={{
            justifyContent: props.multiline ? 'flex-start' : 'center',
            marginTop: props.multiline ? vh(5) : 0,
            flex: 1,
          }}>
          <TextInput
            ref={ref}
            blurOnSubmit
            value={props.value}
            placeholder={props.label}
            editable={!props.editable}
            maxLength={props.maxLength}
            multiline={props.multiline}
            numberOfLines={numberOfLines}
            onChangeText={handleChangeText}
            defaultValue={props.defaultValue}
            autoCapitalize={props.autoCapitalize}
            placeholderTextColor={'grey'}
            returnKeyType={props.returnKeyType || 'next'}
            style={[
              Style.textInput,
              props.textInputStyle,
              {
                height: props.multiline
                  ? props.isCountEnable
                    ? '85%'
                    : '90%'
                  : '100%',
              },
            ]}
            onFocus={() => {
              setFocus(true);
              props.onIconPress && props.onIconPress();
            }}
            onBlur={() => {
              setFocus(false);
              props.onBlur && props.onBlur();
            }}
            keyboardType={props.keyboardType}
            onSubmitEditing={handleOnSubmitEditing}
            secureTextEntry={secureTextEntry}
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
          />
          {props.isCountEnable && (
            <Text
              style={
                Style.alignTop
              }>{`${props?.value?.length}/${props?.maxLength}`}</Text>
          )}
        </View>
        {props.renderExtra && props.renderExtra()}

        {!props.hidePasswordToggle &&
          props.secureTextEntry &&
          renderPasswordToggle()}
      </TouchableOpacity>
      {/* {!props.isError && <Text style={Style.errorText}>{props.hasError}</Text>} */}
    </View>
  );
});

CustomTextInput.defaultProps = {
  icon: '',
  iconPrefix: '',
  label: '',
  hasError: '',
  isError: false,
  maxLength: 200,
  container: {},
  editable: false,
  placeholder: '',
  multiline: false,
  testButtonID: '',
  onBlur: () => {},
  mainContainer: {},
  textInputStyle: {},
  starStatus: false,
  returnKeyType: 'next',
  autoCapitalize: 'none',
  renderExtra: () => {},
  secureTextEntry: false,
  onIconPress: () => {},
  // @ts-ignore
  keyboardType: 'default',
  showSecureTextEntry: false,
  hidePasswordToggle: false,
  onSubmitEditing: () => {},
  isCountEnable: false,
  numberOfLines: 1,
  labelStyle: {},
};

export default CustomTextInput;
