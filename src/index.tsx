import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';

const AppContainer = () => (
  <NavigationContainer>
    <OverflowMenuProvider>
      <Routes />
    </OverflowMenuProvider>
  </NavigationContainer>
);

export default AppContainer;
