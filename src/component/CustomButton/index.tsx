import React from 'react';
import {Text, TouchableOpacity, Image, Platform} from 'react-native';

/**
 * custom imports
 */
import styles from './style';
import Contants from '../../constants';
type Props = {
  iconLeft?: any;
  textStyle?: any;
  iconRight?: any;
  customStyle?: any;
  buttonText: string;
  isDisabled?: boolean;
  handleAction: Function;
  isModalVisible?: boolean;
};

const ButtonComponent = (props: Props) => {
  const {isDisabled, iconLeft, iconRight, buttonText} = props;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={() => props.handleAction()}
      activeOpacity={0.6}
      style={[
        styles.container,
        {
          backgroundColor:
            isDisabled || (!isDisabled && buttonText == 'Cancel')
              ? Contants.Colors.backgroundTextInputColor
              : Contants.Colors.blue,
          borderColor:
            isDisabled || (!isDisabled && buttonText == 'Cancel')
              ? Contants.Colors.grey51
              : Contants.Colors.border,
          borderWidth:
            isDisabled || (!isDisabled && buttonText == 'Cancel') ? 1 : 0,
          elevation: Platform.OS === 'ios' ? 9 : 0,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        },
        props.customStyle,
      ]}>
      {iconLeft && (
        <Image
          source={iconLeft}
          style={[
            styles.iconLeft,
            {
              tintColor: isDisabled
                ? Contants.Colors.primary
                : Contants.Colors.white,
            },
          ]}
          resizeMode="contain"
        />
      )}
      <Text
        style={[
          styles.buttonText,
          {
            color:
              isDisabled || (!isDisabled && buttonText == 'Cancel')
                ? Contants.Colors.grey51
                : Contants.Colors.white,
            alignSelf: 'center',
          },
          props.textStyle,
        ]}>
        {props.buttonText}
      </Text>
      {iconRight && (
        <Image
          source={iconRight}
          style={styles.iconRight}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

ButtonComponent.defaultProps = {
  textStyle: {},
  customStyle: {},
  isDisabled: false,
  iconLeft: undefined,
  iconRight: undefined,
};

export default React.memo<Props>(ButtonComponent);
