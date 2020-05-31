
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import SplashScreen from '../screens/splash';

const { Navigator, Screen } = createStackNavigator();

function Routes() {
  return (
        <Navigator
            initialRouteName="Splash"
            screenOptions={{ gestureEnabled: false }}>
            <Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Image to PDF' }}
            />
        </Navigator>
    );
}



export default Routes;