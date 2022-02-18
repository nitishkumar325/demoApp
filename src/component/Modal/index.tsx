import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  renderView?(): JSX.Element;
  onBackDropPress: Function;
  isVisible: Boolean | undefined;
}

export default function EmployeeSuccessModel(Props: Props) {
  const noop = () => {};

  const {renderView = noop} = Props;
  return (
    <Modal
      style={{alignSelf: 'center'}}
      isVisible={Props.isVisible}
      onBackdropPress={Props.onBackDropPress}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}>
      {renderView()}
    </Modal>
  );
}
