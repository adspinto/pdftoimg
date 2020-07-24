import React, {useState, useEffect} from 'react';
import {View, Text, Animated, Dimensions, StyleSheet} from 'react-native';
import {Bar} from 'react-native-progress';
import {
  BANNER_KEY_HOME,
  BANNER_KEY_LOADING,
  BANNER_KEY_FAIL_MODAL,
  BANNER_KEY_SUCCESS_MODAL,
  BANNER_KEY_SPLASH,
  BANNER_HOME_BOTTOM,
  SCANNER_SCREEN,
  SCANNER_SUCCESS,
  SCANNER_FAILURE,
  SCANNER_LOADING,
} from '../../config';
import {BannerAd, TestIds} from '@react-native-firebase/admob';
import {AdProps} from './interface';

const Ad = (props: AdProps) => {
  const {size, screen} = props;
  let keys: any = {
    home: BANNER_HOME_BOTTOM,
    imgtopdfscreen: BANNER_KEY_HOME,
    imgtopdfscreenloading: BANNER_KEY_LOADING,
    imgtopdfscreenfailModal: BANNER_KEY_FAIL_MODAL,
    imgtopdfscreensuccessModal: BANNER_KEY_SUCCESS_MODAL,
    splash: BANNER_KEY_SPLASH,
    scannerscreen: SCANNER_SCREEN,
    scannersuccess: SCANNER_SUCCESS,
    scannerfail: SCANNER_FAILURE,
    scannerloading: SCANNER_LOADING,
  };
  let adUnitId = keys[screen];
  // let adUnitId = __DEV__ ? TestIds.BANNER : keys[screen];

  const onAdFailedToLoad = (err) => {
    console.log('add failed to load', err);
  };

  return (
    <View>
      <BannerAd
        onAdFailedToLoad={onAdFailedToLoad}
        size={size}
        unitId={adUnitId}
      />
    </View>
  );
};

export default Ad;
