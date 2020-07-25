import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Platform, UIManager, Animated} from 'react-native';

import {ScannerProps} from './interface';
import ScannerView from './view';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Scanner = (props: ScannerProps) => {
  const cameraRef = useRef();
  const [overlayFlashOpacity, setOverlayFlashOpacity] = useState({
    opacity: new Animated.Value(0),
  });

  const handleOnPictureProcessed = ({
    croppedImage,
    initialImage,
  }: {
    croppedImage: any;
    initialImage: any;
  }) => {
    console.log(croppedImage, initialImage);
  };

  const takePicture = () => {
    console.log('takePicture');
    triggerSnapAnimation();
  };

  const triggerSnapAnimation = () => {
    console.log('triggerSnapAnimation');

    Animated.sequence([
      Animated.timing(overlayFlashOpacity.opacity, {
        toValue: 0.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(overlayFlashOpacity.opacity, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(overlayFlashOpacity.opacity, {
        toValue: 0.6,
        delay: 100,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(overlayFlashOpacity.opacity, {
        toValue: 0,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    console.log(overlayFlashOpacity);
  }, [overlayFlashOpacity]);

  return (
    <ScannerView
      cameraRef={cameraRef}
      overlayFlashOpacity={overlayFlashOpacity}
      handleOnPictureProcessed={handleOnPictureProcessed}
      triggerSnapAnimation={triggerSnapAnimation}
      takePicture={takePicture}
    />
  );
};

export default Scanner;
