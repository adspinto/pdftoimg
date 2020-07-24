import React, {useCallback} from 'react';
import {View} from 'react-native';
import {HomeScreenProps} from './interface';
import styles from './styles';
import HomeView from './view';

const HomeScreen = (props: HomeScreenProps) => {
  const {navigation} = props;
  const onPressSubmit = useCallback(
    (route) => {
      console.log(route);
      if (route === 'conversor') {
        navigation.navigate('ImageToPdf');
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
