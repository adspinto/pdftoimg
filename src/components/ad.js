import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native'
import { Bar } from 'react-native-progress';
import {
    BANNER_KEY_HOME,
    BANNER_KEY_LOADING,
    BANNER_KEY_FAIL_MODAL,
    BANNER_KEY_SUCCESS_MODAL,
    BANNER_KEY_SPLASH
} from 'react-native-dotenv'
import { InterstitialAd, RewardedAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';


const Ad = ({ size, type = "banner", screen }) => {
    let keys = {
        home: BANNER_KEY_HOME,
        loading: BANNER_KEY_LOADING,
        failModal: BANNER_KEY_FAIL_MODAL,
        successModal: BANNER_KEY_SUCCESS_MODAL,
        splash: BANNER_KEY_SPLASH
    }
    let adUnitId = keys[screen];
    // let adUnitId = __DEV__ ? TestIds.BANNER : keys[screen];
    const onAdFailedToLoad = (err) => {
        console.log('add failed to load', err)
    }

    if (type === "banner") {
        return (
            <View >
                <BannerAd onAdFailedToLoad={onAdFailedToLoad} size={size} unitId={adUnitId} />
            </View>
        )
    }
    if (type === "interstitial") {
        return (
            <View>
                <InterstitialAd size={size} unitId={adUnitId} />
            </View>
        )

    }
    if (type === "reward") {
        return (
            <View>
                <RewardedAd size={size} unitId={adUnitId} />
            </View>
        )

    }

    return null
}


export default Ad