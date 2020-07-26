import React, {useState} from 'react';
import {
  View,
  UIManager,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {ScannerViewProps} from './interface';
import styles from './styles';
// import Scanner, {
//   Filters,
//   RectangleOverlay,
// } from 'react-native-rectangle-scanner';
import {useFocusEffect} from '@react-navigation/native';
import Ad from '../../components/ad';

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

  if (screenStatus === 'blurred') {
    return (
      <View style={styles.blurred}>
        <ActivityIndicator size={40} color={'black'} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.scannerContainer}>
        {/* <Scanner
          onPictureTaken={onPictureTaken}
          onPictureProcessed={handleOnPictureProcessed}
          ref={cameraRef}
          style={styles.scanner}
          // onRectangleDetected={({detectedRectangle}) =>
          //   onRectangleDetected(detectedRectangle)
          // }
          capturedQuality={0.1}
          // enableTorch={true}
        /> */}
      </View>

      {/* <RectangleOverlay
        detectedRectangle={detectedRectangle}
        previewRatio={previewSize}
        backgroundColor="rgba(255,181,6, 0.2)"
        borderColor="rgb(255,181,6)"
        borderWidth={4}
        // == These let you auto capture and change the overlay style on detection ==
        // detectedBackgroundColor="rgba(255,181,6, 0.3)"
        // detectedBorderWidth={6}
        // detectedBorderColor="rgb(255,218,124)"
        // onDetectedCapture={this.capture}
        // allowDetection
      /> */}

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
