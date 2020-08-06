import React, {useState} from 'react';
import {
  View,
  UIManager,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  ActivityIndicator,
  Text,
} from 'react-native';
import {ScannerViewProps} from './interface';
import styles from './styles';
// import Scanner, {
//   Filters,
//   RectangleOverlay,
// } from 'react-native-rectangle-scanner';
import {useFocusEffect} from '@react-navigation/native';
import Ad from '../../components/ad';
import {RNCamera} from 'react-native-camera';

// import Animated from 'react-native-reanimated';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ScannerView = (props: ScannerViewProps) => {
  const {
    cameraRef,
    handleOnPictureProcessed,
    takePicture,
    detectedRectangle,
    getPreviewSize,
    onRectangleDetected,
    onPictureTaken,
    screenStatus,
  } = props;

  const previewSize = getPreviewSize();

  // if (screenStatus === 'blurred') {
  //   return (
  //     <View style={styles.blurred}>
  //       <ActivityIndicator size={40} color={'black'} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.root}>
      <RNCamera
        ref={cameraRef}
        style={styles.scannerContainer}
        captureAudio={false}
        
      />

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={takePicture}>
          <View style={styles.cameraButton}>
            <View style={[styles.cameraSubButton]} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScannerView;
