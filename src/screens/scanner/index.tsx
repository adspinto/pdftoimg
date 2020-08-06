import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Platform, UIManager, Animated, Dimensions} from 'react-native';
import OpenCV from '../../../OpenCV';
import {ScannerProps} from './interface';
import ScannerView from './view';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Scanner = (props: ScannerProps) => {
  const {navigation} = props;
  const cameraRef = useRef();
  const [device, setDevice] = useState({
    initialized: false,
    hasCamera: false,
    permissionToUseCamera: false,
    flashIsAvailable: false,
    previewHeightPercent: 1,
    previewWidthPercent: 1,
  });

  const [detectedRectangle, setDetectedRectangle] = useState(false);
  const [enableAutoDetect, setEnableAutoDetect] = useState(false);
  const [screenStatus, setScreenStatus] = useState('blurred');

  const handleOnPictureProcessed = ({
    croppedImage,
    initialImage,
  }: {
    croppedImage: any;
    initialImage: any;
  }) => {
    console.log({croppedImage, initialImage}, 'testezin');
  };

  const errorCallback = (error) => {
    console.log('error', error);
  };
  const successCallback = (success, m, x) => {
    console.log('success', success, m, x);
  };
  const takePicture = () => {
    console.log('takePicture', cameraRef.current);
    const options = {quality: 0.5, base64: true};
    cameraRef.current
      .takePictureAsync()
      .then((pic) => {
        console.log(pic);

        // OpenCV.checkForBlurryImage(pic.base64, errorCallback, successCallback);
        OpenCV.detectCorners(pic.uri, errorCallback, successCallback);
        // navigation.navigate('Cropper', {uri: pic.uri});
      })
      .catch((err) => console.log(err));
  };

  const getPreviewSize = () => {
    const dimensions = Dimensions.get('window');
    // We use set margin amounts because for some reasons the percentage values don't align the camera preview in the center correctly.
    const heightMargin =
      ((1 - device.previewHeightPercent) * dimensions.height) / 2;
    const widthMargin =
      ((1 - device.previewWidthPercent) * dimensions.width) / 2;
    if (dimensions.height > dimensions.width) {
      // Portrait
      return {
        height: device.previewHeightPercent,
        width: device.previewWidthPercent,
        marginTop: heightMargin,
        marginLeft: widthMargin,
      };
    }

    // Landscape
    return {
      width: device.previewHeightPercent,
      height: device.previewWidthPercent,
      marginTop: widthMargin,
      marginLeft: heightMargin,
    };
  };

  const onRectangleDetected = useCallback(
    (detected: any) => {
      if (enableAutoDetect) {
        setDetectedRectangle(detected);
      }
    },
    [enableAutoDetect],
  );

  const onPictureTaken = ({
    croppedImage,
    initialImage,
  }: {
    croppedImage: string;
    initialImage: string;
  }) => {
    navigation.navigate('Cropper', {croppedImage, initialImage});
    console.log('picture taken');
  };

  useEffect(() => {
    const onFocus = navigation.addListener('focus', () => {
      setScreenStatus('blurred');
      setTimeout(() => {
        setScreenStatus('focused');
      }, 500);
    });
    // const onBlur = navigation.addListener('blur', () => {
    //   setScreenStatus('blurred');
    // });

    return () => {
      navigation.removeListener('focus', onFocus);
      // navigation.removeListener('blur', onBlur);
    };
  }, [navigation]);

  console.log(OpenCV);
  return (
    <ScannerView
      cameraRef={cameraRef}
      handleOnPictureProcessed={handleOnPictureProcessed}
      takePicture={takePicture}
      onPictureTaken={onPictureTaken}
      getPreviewSize={getPreviewSize}
      detectedRectangle={detectedRectangle}
      onRectangleDetected={onRectangleDetected}
      // screenStatus={'blurred'}
      screenStatus={screenStatus}
    />
  );
};

export default Scanner;
