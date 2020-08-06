import React, {useState} from 'react';
import {
  View,
  UIManager,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  Text,
  Image,
} from 'react-native';
import {CropperViewProps} from './interface';
import styles from './styles';

import Ad from '../../components/ad';

// import Animated from 'react-native-reanimated';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CropperView = (props: CropperViewProps) => {
  const {source} = props;
  // const
  return (
    <View style={styles.root}>
      <Text>Cropper</Text>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'red',
          width: 414,
          height: 800,
        }}>
        <Image style={{width: '100%', height: '100%'}} source={{uri: source}} />
      </View>
    </View>
  );
};

export default CropperView;
