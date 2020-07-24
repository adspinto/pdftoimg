import React from 'react';
import AppContainer from './src';
import codePush from 'react-native-code-push';

const App = () => <AppContainer />;

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

// export default App;
export default codePush(codePushOptions)(App);
