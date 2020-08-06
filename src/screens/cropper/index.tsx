import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Platform, UIManager, Animated, Dimensions} from 'react-native';

import {CropperProps} from './interface';
import CropperView from './view';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Cropper = (props: CropperProps) => {
  const {navigation, route} = props;

  console.log(navigation, route);

  return <CropperView source={route.params.uri} />;
};

export default Cropper;
