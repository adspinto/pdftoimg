import React from 'react'
import { View, Text } from 'react-native'
import AppContainer from './src'
import codePush from "react-native-code-push";

const App = () => <AppContainer />

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART
  }


export default  codePush(codePushOptions)(App);
      