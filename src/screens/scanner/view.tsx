import React, {useState} from 'react';
import {
  View,
  UIManager,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import {ScannerViewProps} from './interface';
import styles from './styles';
import Scanner, {
  Filters,
  RectangleOverlay,
  FlashAnimation,
} from 'react-native-rectangle-scanner';

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
    overlayFlashOpacity,
  } = props;

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.scannerContainer}>
        <Scanner
          onPictureProcessed={handleOnPictureProcessed}
          ref={cameraRef}
          style={styles.scanner}
          // enableTorch={true}
        />
      </View>

      <Animated.View
        style={{
          ...styles.overlay,
          ...overlayFlashOpacity,
        }}
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
