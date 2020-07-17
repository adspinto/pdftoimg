import React from 'react'
import { View, Text } from 'react-native'
import AppContainer from './src'
import codePush from "react-native-code-push";

const App = () => <AppContainer />
export default  codePush(App);
      