import React from 'react';
import {View, Text, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Ad from '../ad';
import styles from './styles';
import {ConvertModalProps} from './interface';
const ConvertModal = (props: ConvertModalProps) => {
  const {convertStatus, convertMessage, onRequestClose, adScreen} = props;

  return (
    <Modal
      visible={convertStatus === 'rejected' || convertStatus === 'resolved'}
      onRequestClose={onRequestClose}
      animationType={'slide'}
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View>
            <Icon
              color={convertStatus === 'rejected' ? '#FF7069' : '#4DE89D'}
              name={
                convertStatus === 'rejected' ? 'times-circle' : 'check-circle'
              }
              size={148}
            />
          </View>
          <View>
            <Ad screen={adScreen} size={'MEDIUM_RECTANGLE'} type={'banner'} />
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.buttonTextTitle}>{convertMessage}</Text>
            <View style={styles.button}>
              <Button color={'#B0B0B0'} title={'Ok'} onPress={onRequestClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConvertModal;
