import React, {useState, useCallback} from 'react';
import {View, Text, Platform, UIManager} from 'react-native';
import {HomeViewProps} from './interface';
import styles from './styles';
import SimpleButton from '../../components/simpleButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Ad from '../../components/ad';

const HomeView = (props: HomeViewProps) => {
  const {onPressSubmit} = props;

  const submitConversor = useCallback(() => {
    onPressSubmit('conversor');
  }, [onPressSubmit]);
  const submitScanner = useCallback(() => {
    onPressSubmit('scanner');
  }, [onPressSubmit]);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.iconAndButtonContainer}>
          <Icon size={100} color={'gray'} name={'file'} />
          <SimpleButton
            onPress={submitConversor}
            color={'white'}
            title={'Conversor'}
            containerStyle={styles.simpleButtonContainer}
          />
        </View>
        <View style={styles.iconAndButtonContainer}>
          <IonIcon size={100} color={'gray'} name={'scan-outline'} />
          <SimpleButton
            onPress={submitScanner}
            color={'white'}
            title={'Scanner'}
            containerStyle={styles.simpleButtonContainer}
          />
        </View>
      </View>
      <View style={styles.bottomAdContainer}>
        <Ad screen={'home'} size={'BANNER'} type={'bannerBottom'} />
      </View>
    </View>
  );
};

export default HomeView;
