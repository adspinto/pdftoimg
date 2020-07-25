import React, {useCallback} from 'react';
import {View} from 'react-native';
import {HomeScreenProps} from './interface';
import HomeView from './view';

const HomeScreen = (props: HomeScreenProps) => {
  const {navigation} = props;
  const onPressSubmit = useCallback(
    (route) => {
      if (route === 'conversor') {
        navigation.navigate('ImageToPdf');
      }
      if (route === 'scanner') {
        navigation.navigate('Scanner');
      }
    },
    [navigation],
  );
  return (
    <View>
      <HomeView onPressSubmit={onPressSubmit} />
    </View>
  );
};

export default HomeScreen;
